"""
lstm_forecast.py

هيكل مبسّط لنموذج يشبه LSTM للتنبؤ بالسلاسل الزمنية (time-series forecasting)
بدون الاعتماد على مكتبات تعلم عميق.

الفكرة هنا:
- الاحتفاظ بنافذة انزلاقية من آخر القيم (window_size)
- "التنبؤ" يكون عبارة عن متوسط مرجّح (weighted moving average)
- نُرجع سلسلة من التنبؤات (horizon خطوات للأمام)

الهدف من هذا الملف:
- توفير واجهة واضحة يمكن استبدال منطق التنبؤ لاحقاً بـ LSTM حقيقي
- الحفاظ على نفس أسلوب الاستخدام (fit + forecast)
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Sequence, Optional


@dataclass
class LstmLikeForecastModel:
    """
    نموذج مبسط للتنبؤ بالسلاسل الزمنية.

    attributes:
    - window_size: حجم النافذة الانزلاقية لتغذية "الموديل"
    - horizon: عدد الخطوات المستقبلية التي نريد التنبؤ بها
    - last_window: آخر نافذة بيانات شاهدها النموذج بعد التدريب
    - weights: أوزان بسيطة للمتوسط المرجّح
    """

    window_size: int = 8
    horizon: int = 4
    last_window: Optional[List[float]] = field(default=None)
    weights: Optional[List[float]] = field(default=None)

    def fit(self, series: Sequence[float]) -> None:
        """
        "تدريب" الموديل على سلسلة زمنية واحدة (univariate time series).

        :param series: قائمة قيم [y1, y2, y3, ...]
        """
        if not series:
            raise ValueError("Cannot fit LstmLikeForecastModel with empty series.")

        if len(series) < self.window_size:
            raise ValueError(
                f"Series length ({len(series)}) is smaller than window_size ({self.window_size})."
            )

        # نأخذ آخر نافذة من السلسلة ونخزنها
        self.last_window = list(series[-self.window_size :])

        # نُنشئ أوزان بسيطة: الأحدث يحصل على وزن أكبر
        # مثال: لو window_size = 4 → weights = [0.1, 0.2, 0.3, 0.4]
        total_positions = float(self.window_size * (self.window_size + 1) / 2)
        self.weights = [
            (i + 1) / total_positions for i in range(self.window_size)
        ]

    def _forecast_next_step(self, window: List[float]) -> float:
        """
        حساب خطوة واحدة للأمام بناءً على النافذة الحالية.
        """
        if self.weights is None:
            raise RuntimeError("Model is not fitted. Call fit() first.")

        if len(window) != self.window_size:
            raise ValueError("Window size does not match model.window_size.")

        # متوسط مرجّح باستخدام self.weights
        forecast = 0.0
        for w, v in zip(self.weights, window):
            forecast += w * v
        return forecast

    def forecast(self, horizon: Optional[int] = None) -> List[float]:
        """
        التنبؤ بعدد من الخطوات المستقبلية.

        :param horizon: عدد الخطوات المراد التنبؤ بها
                        إذا لم يتم تحديده → نستخدم القيمة الافتراضية self.horizon
        :return: قائمة من القيم المتنبأ بها [y_t+1, y_t+2, ...]
        """
        if self.last_window is None or self.weights is None:
            raise RuntimeError("Model is not fitted. Call fit() first.")

        h = horizon if horizon is not None else self.horizon
        if h <= 0:
            return []

        window = list(self.last_window)
        predictions: List[float] = []

        for _ in range(h):
            next_value = self._forecast_next_step(window)
            predictions.append(next_value)

            # تحديث النافذة: نحذف الأقدم ونضيف التنبؤ الجديد
            window = window[1:] + [next_value]

        return predictions


# مثال للتجربة المحلية
if __name__ == "__main__":
    # سلسلة زمنية بسيطة تمثل مثلاً عدد البلاغات اليومية في منطقة واحدة
    series = [
        10, 12, 11, 13, 14, 15, 16, 18,
        19, 20, 21, 22, 23, 24,
    ]

    model = LstmLikeForecastModel(window_size=5, horizon=3)
    model.fit(series)

    preds = model.forecast()
    print("Last window:", model.last_window)
    print("Forecast (next steps):", preds)
