"""
isolation_forest.py

هيكل مبسط لنموذج يشبه Isolation Forest لاكتشاف الشذوذ (anomaly detection)
بدون الاعتماد على مكتبات خارجية.

الفكرة هنا "تقليد" روح Isolation Forest بشكل خفيف:
- بدلاً من بناء أشجار حقيقية، نحسب:
  - مدى كل بُعد (min/max)
  - مركز تقريبي للبيانات (متوسط أو ميديان مبسط)
- ثم نعتبر أن النقاط التي تقع خارج المدى الطبيعي
  أو بعيدة جدًا عن المركز => نقاط شاذة (anomalies).

الهدف: توفير هيكل يمكن استبداله لاحقاً بنموذج حقيقي من sklearn أو غيره
مع الحفاظ على نفس الواجهة العامة (fit / score).
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Sequence, Optional
import math

Vector = List[float]


def _safe_min(values: Sequence[float]) -> float:
    if not values:
        return 0.0
    return min(values)


def _safe_max(values: Sequence[float]) -> float:
    if not values:
        return 0.0
    return max(values)


@dataclass
class IsolationForestModel:
    """
    نموذج مبسط شبيه Isolation Forest.

    - feature_mins: أقل قيمة لكل بُعد
    - feature_maxs: أعلى قيمة لكل بُعد
    - center: مركز تقريبي للعينات (متوسط بسيط)
    - expansion_factor: عامل توسيع لنطاق الطبيعي حول [min, max]
    """

    expansion_factor: float = 0.1  # توسعة المجال الطبيعي بنسبة 10%
    feature_mins: Optional[Vector] = field(default=None)
    feature_maxs: Optional[Vector] = field(default=None)
    center: Optional[Vector] = field(default=None)

    def fit(self, samples: List[Vector]) -> None:
        """
        تدريب النموذج على عينات يُفترض أنها طبيعية.

        :param samples: قائمة متجهات [ [x1, x2, ...], ... ]
        """
        if not samples:
            raise ValueError("Cannot fit IsolationForestModel with empty samples.")

        dim = len(samples[0])
        for s in samples:
            if len(s) != dim:
                raise ValueError("All samples must have the same dimension.")

        # حساب min/max لكل بُعد
        mins = [float("inf")] * dim
        maxs = [float("-inf")] * dim

        for s in samples:
            for i, v in enumerate(s):
                if v < mins[i]:
                    mins[i] = v
                if v > maxs[i]:
                    maxs[i] = v

        # في حال لم تتغير (عينات غريبة)، نتعامل بحذر
        self.feature_mins = [m if m != float("inf") else 0.0 for m in mins]
        self.feature_maxs = [m if m != float("-inf") else 0.0 for m in maxs]

        # توسيع المجال الطبيعي قليلاً (expansion_factor)
        ranges = [
            maxs[i] - mins[i] if maxs[i] > mins[i] else 1.0
            for i in range(dim)
        ]
        expanded_mins = []
        expanded_maxs = []
        for i in range(dim):
            delta = ranges[i] * self.expansion_factor
            expanded_mins.append(self.feature_mins[i] - delta)
            expanded_maxs.append(self.feature_maxs[i] + delta)

        self.feature_mins = expanded_mins
        self.feature_maxs = expanded_maxs

        # حساب مركز تقريبي (متوسط)
        sums = [0.0] * dim
        n = float(len(samples))
        for s in samples:
            for i, v in enumerate(s):
                sums[i] += v
        self.center = [s / n for s in sums]

    def score(self, sample: Vector) -> float:
        """
        إرجاع درجة الشذوذ (anomaly score) بين 0 و 1.

        - 0 => داخل المجال الطبيعي وبعيد قليلاً عن الأطراف
        - 1 => خارج المجال الطبيعي بشكل واضح (أشد شذوذاً)
        """
        if self.feature_mins is None or self.feature_maxs is None or self.center is None:
            raise RuntimeError("Model is not fitted. Call fit() first.")

        if len(sample) != len(self.feature_mins):
            raise ValueError("Sample dimension does not match model dimension.")

        dim = len(sample)
        out_of_range_penalty = 0.0
        normalized_distance_sum = 0.0

        for i in range(dim):
            v = sample[i]
            mn = self.feature_mins[i]
            mx = self.feature_maxs[i]

            # لو المجال صفر (min == max) نخليه مجال صغير لتفادي القسمة على صفر
            if mx <= mn:
                mx = mn + 1.0

            # التطبيع [0,1] داخل المجال
            normalized = (v - mn) / (mx - mn)
            normalized_distance_sum += abs(normalized - 0.5)  # البُعد عن المركز الوسطي

            # إذا خرجنا من المجال [0,1] بعد التطبيع => شذوذ أقوى
            if normalized < 0.0 or normalized > 1.0:
                out_of_range_penalty += min(abs(normalized - 0.5), 1.0)

        # متوسط البعد عن الوسط في كل الأبعاد
        avg_normalized_distance = normalized_distance_sum / dim

        # نجمع بين:
        # - البعد عن الوسط (داخل المجال)
        # - الخروج عن المجال (penalty)
        raw_score = avg_normalized_distance + out_of_range_penalty

        # نحوله إلى [0,1] بشكل مقروء
        # نفترض أن raw_score نادراً يتجاوز 2 في الحالات الطبيعية
        normalized_score = raw_score / 2.0
        return max(0.0, min(normalized_score, 1.0))


# مثال استخدام بسيط للتجربة المحلية
if __name__ == "__main__":
    model = IsolationForestModel(expansion_factor=0.1)

    # عينات طبيعية تقريباً حول المدى [0,1] لكل بُعد
    normal_samples = [
        [0.1, 0.2],
        [0.4, 0.5],
        [0.3, 0.7],
        [0.6, 0.8],
    ]

    model.fit(normal_samples)

    test_normal = [0.5, 0.6]
    test_borderline = [-0.2, 1.3]
    test_anomaly = [5.0, -4.0]

    print("Score (normal-ish):", model.score(test_normal))
    print("Score (borderline):", model.score(test_borderline))
    print("Score (anomalous):", model.score(test_anomaly))
