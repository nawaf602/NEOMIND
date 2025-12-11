"""
autoencoder_anomaly.py

هيكل مبسط لنموذج يشبه الـ Autoencoder لاكتشاف الشذوذ (Anomaly Detection)
بدون استخدام شبكات عصبية حقيقية.

الفكرة هنا:
- نفترض أن الـ "Autoencoder" تعلم إعادة بناء (reconstruct) البيانات الطبيعية.
- سنقرب هذا المنطق بحساب "المتوسط" لكل ميزة (feature) من بيانات التدريب.
- إعادة البناء = هذا المتوسط.
- كلما كان الفرق بين العينة والمتوسط كبيراً → نرفع درجة الشذوذ.

الهدف:
- توفير واجهة واحدة بسيطة يمكن استبدالها لاحقاً بنموذج Autoencoder حقيقي.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Sequence, Optional


@dataclass
class AutoencoderLikeAnomalyModel:
    """
    نموذج مبسط لاكتشاف الشذوذ باستخدام منطق "إعادة البناء" (reconstruction error).

    attributes:
    - feature_means: متوسط كل عمود (feature) من بيانات التدريب
    - epsilon: ثابت صغير للحماية من القسمة على صفر في التطبيع
    """

    feature_means: Optional[List[float]] = field(default=None)
    epsilon: float = 1e-8

    def fit(self, data: Sequence[Sequence[float]]) -> None:
        """
        "تدريب" الموديل على بيانات طبيعية (بدون شذوذ قدر الإمكان).

        :param data: مصفوفة 2D حجمها (n_samples x n_features)
        """
        # تحويل البيانات لقائمة من القوائم
        rows: List[List[float]] = [list(row) for row in data]
        if not rows:
            raise ValueError("Cannot fit AutoencoderLikeAnomalyModel with empty data.")

        n_samples = len(rows)
        n_features = len(rows[0])

        # التأكد أن كل الصفوف لها نفس عدد الأعمدة
        for r in rows:
            if len(r) != n_features:
                raise ValueError("All rows must have the same number of features.")

        # حساب متوسط كل Feature
        sums = [0.0 for _ in range(n_features)]
        for r in rows:
            for j in range(n_features):
                sums[j] += r[j]

        self.feature_means = [s / float(n_samples) for s in sums]

    def reconstruction_error(self, sample: Sequence[float]) -> float:
        """
        حساب خطأ إعادة البناء (MSE) بين العينة والمتوسط المتعلم.
        """
        if self.feature_means is None:
            raise RuntimeError("Model is not fitted. Call fit() first.")

        x = list(sample)
        if len(x) != len(self.feature_means):
            raise ValueError("Sample feature size does not match model feature_means size.")

        # Mean Squared Error
        mse = 0.0
        for v, m in zip(x, self.feature_means):
            diff = v - m
            mse += diff * diff

        mse /= float(len(self.feature_means))
        return mse

    def score(self, sample: Sequence[float]) -> float:
        """
        تحويل خطأ إعادة البناء إلى درجة شذوذ بين 0 و 1 تقريباً.

        - قيم أعلى ≈ شذوذ أكبر.
        """
        mse = self.reconstruction_error(sample)

        # تحويل خطأ MSE لدرجة بين 0 و 1
        # كلما زاد الـ MSE اقتربت النتيجة من 1
        score = mse / (mse + 1.0 + self.epsilon)
        return float(score)


# تجربة محلية
if __name__ == "__main__":
    # نفترض أن لدينا بيانات "طبيعية" من 3 ميزات:
    # مثلاً [عدد بلاغات، عدد دوريات قريبة، مستوى ازدحام]
    normal_data = [
        [10.0, 5.0, 0.3],
        [11.0, 4.0, 0.25],
        [9.0,  6.0, 0.35],
        [10.5, 5.0, 0.32],
        [10.2, 4.8, 0.29],
    ]

    model = AutoencoderLikeAnomalyModel()
    model.fit(normal_data)

    normal_sample = [10.1, 5.1, 0.31]
    slightly_off_sample = [13.0, 2.0, 0.6]
    anomalous_sample = [25.0, 0.0, 1.5]

    print("Feature means (learned):", model.feature_means)
    print("Score (normal):", model.score(normal_sample))
    print("Score (slightly off):", model.score(slightly_off_sample))
    print("Score (anomalous):", model.score(anomalous_sample))
