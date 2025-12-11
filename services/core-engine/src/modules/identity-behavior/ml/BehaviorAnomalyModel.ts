import { Injectable } from '@nestjs/common';

/**
 * نموذج بسيط مبدئي للكشف عن السلوك الشاذ.
 * لاحقاً سيتم استبداله بنداء حقيقي لـ ML Engine (Python).
 */
@Injectable()
export class BehaviorAnomalyModel {
  /**
   * يستقبل مجموعة خصائص رقمية، ويرجع درجة خطر من 0 إلى 1
   */
  score(features: Record<string, number>): number {
    const values = Object.values(features);
    if (!values.length) {
      return 0.0;
    }

    const avg =
      values.reduce((sum, v) => sum + (isFinite(v) ? v : 0), 0) / values.length;

    // نضغط النتيجة بين 0 و 1 (بشكل مبسط)
    const normalized = Math.max(0, Math.min(1, avg / 100));
    return normalized;
  }
}
