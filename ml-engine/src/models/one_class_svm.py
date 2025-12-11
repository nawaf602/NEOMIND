"""
one_class_svm.py

هيكل مبسط لنموذج يشبه One-Class SVM لاكتشاف الشذوذ (anomaly detection)
بدون الاعتماد على مكتبات خارجية (sklearn، إلخ).

الفكرة:
- نستقبل عينات "طبيعية" في fit() ونحسب:
  - متوسط كل بُعد (feature-wise mean)
  - متوسط المسافة عن هذا المتوسط (average radius)
- في score():
  - نحسب المسافة بين العينة والمتوسط
  - إذا كانت أبعد بكثير من "المجال الطبيعي" => نعطي درجة خطورة أعلى (أقرب لـ 1)
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Sequence, Optional
import math


Vector = List[float]


def _euclidean_distance(a: Sequence[float], b: Sequence[float]) -> float:
    """حساب المسافة الإقليدية بين متجهين a و b."""
    if len(a) != len(b):
        raise ValueError("Vectors must have the same dimension.")
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))


@dataclass
class OneClassSvmModel:
    """
    نموذج شبيه بـ One-Class SVM لاكتشاف الشذوذ.

    - center: مركز الكتلة (متوسط جميع العينات الطبيعية)
    - avg_radius: متوسط المسافة عن المركز
    - radius_factor: عامل لتكبير/تصغير مجال "الطبيعي"
    """

    radius_factor: float = 2.5  # كلما كبر، صار النموذج أكثر تساهلاً مع القيم البعيدة
    center: Optional[Vector] = field(default=None)
    avg_radius: Optional[float] = field(default=None)

    def fit(self, samples: List[Vector]) -> None:
        """
        تدريب النموذج على عينات يُفترض أنها طبيعية (غير شاذة).

        :param samples: قائمة من المتجهات [ [x1, x2, ...], [x1, x2, ...], ... ]
        """
        if not samples:
            raise ValueError("Cannot fit OneClassSvmModel with empty samples.")

        dim = len(samples[0])
        for s in samples:
            if len(s) != dim:
                raise ValueError("All samples must have the same dimension.")

        # حساب المتوسط لكل بُعد
        sums = [0.0] * dim
        for s in samples:
            for i, v in enumerate(s):
                sums[i] += v

        n = float(len(samples))
        self.center = [s / n for s in sums]

        # حساب متوسط المسافة عن المركز
        distances = [
            _euclidean_distance(s, self.center)  # type: ignore[arg-type]
            for s in samples
        ]
        self.avg_radius = sum(distances) / n if distances else 0.0

    def score(self, sample: Vector) -> float:
        """
        إرجاع درجة الشذوذ (anomaly score) بين 0 و 1.

        - 0 => طبيعي جداً
        - 1 => شاذ جداً
        """
        if self.center is None or self.avg_radius is None:
            raise RuntimeError("Model is not fitted. Call fit() first.")

        if len(sample) != len(self.center):
            raise ValueError("Sample dimension does not match model center.")

        dist = _euclidean_distance(sample, self.center)

        # لو avg_radius = 0 (كل العينات متطابقة مثلاً) نتعامل بحالة خاصة
        if self.avg_radius == 0:
            return 1.0 if dist > 0 else 0.0

        # نعتبر أن أي مسافة <= (radius_factor * avg_radius) ضمن المجال الطبيعي
        threshold = self.radius_factor * self.avg_radius

        if dist <= threshold:
            # نعيد قيمة بين 0 و 0.8 تقريباً حسب قرب العينة من المركز
            normalized = dist / threshold
            return max(0.0, min(0.8 * normalized, 0.8))

        # إذا تعدّت العينة الحد، نرفع درجة الشذوذ حتى 1
        excess = dist - threshold
        # مقياس بسيط لتكبير الشذوذ
        penalty = min(excess / (threshold + 1e-6), 1.0)
        return max(0.8, min(0.8 + 0.2 * penalty, 1.0))


# مثال استخدام بسيط عند التشغيل المباشر (اختياري للتجربة المحلية):
if __name__ == "__main__":
    model = OneClassSvmModel(radius_factor=2.0)

    # عينات طبيعية حول (0,0)
    normal_samples = [
        [0.1, -0.2],
        [0.0, 0.3],
        [-0.2, 0.1],
        [0.05, -0.1],
    ]

    model.fit(normal_samples)

    test_normal = [0.0, 0.0]
    test_anomaly = [3.0, 3.0]

    print("Score (normal-ish):", model.score(test_normal))
    print("Score (anomalous):", model.score(test_anomaly))
