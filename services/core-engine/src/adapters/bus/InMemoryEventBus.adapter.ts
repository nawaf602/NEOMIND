// src/adapters/bus/InMemoryEventBus.adapter.ts

/**
 * DomainEvent
 * -------------
 * نموذج بسيط لحدث داخلي داخل منصة NEOMIND.
 * هذا الهيكل عام (generic) وقابل للتوسعة لاحقاً حسب احتياج كل طبقة.
 */
export interface DomainEvent {
  /** نوع الحدث (مثلاً: PSIC_EVENT_INGESTED, NSDT_SNAPSHOT_UPDATED, C4S_DECISION_ISSUED, ...) */
  type: string;

  /** توقيت حدوث الحدث بصيغة ISO */
  timestamp: string;

  /** المصدر الذي أصدر الحدث (اختياري) */
  source?: string;

  /** لتتبع السلاسل (Trace / Correlation) بين الأحداث */
  correlationId?: string;

  /** الحمولة (Payload) – أي بيانات إضافية يرسلها الحدث */
  payload?: Record<string, unknown>;
}

/**
 * دالة معالجة الحدث
 */
export type DomainEventHandler = (event: DomainEvent) => Promise<void> | void;

/**
 * InMemoryEventBus
 * -----------------
 * ناقل أحداث (Event Bus) بسيط في الذاكرة فقط.
 * الهدف الحالي: Skeleton نظيف يمكن توسيعه لاحقاً لربط الطبقات داخلياً.
 *
 * المزايا:
 *  - publish / publishMany لإرسال حدث أو أكثر
 *  - subscribe للاشتراك في نوع حدث معيّن (وترجع دالة لإلغاء الاشتراك)
 *  - clearAll لمسح جميع الـ handlers (مفيد للاختبارات)
 */
export class InMemoryEventBus {
  /** خريطة من eventType إلى مجموعة من الـ handlers */
  private readonly handlers: Map<string, Set<DomainEventHandler>> = new Map();

  /**
   * الاشتراك في نوع حدث معيّن
   * @param eventType نوع الحدث
   * @param handler الدالة التي ستُستدعى عند ورود الحدث
   * @returns دالة لإلغاء الاشتراك
   */
  subscribe(eventType: string, handler: DomainEventHandler): () => void {
    const existing = this.handlers.get(eventType);

    if (existing) {
      existing.add(handler);
    } else {
      this.handlers.set(eventType, new Set<DomainEventHandler>([handler]));
    }

    // نرجّع دالة صغيرة تلغي الاشتراك عند الحاجة
    return () => {
      const set = this.handlers.get(eventType);
      if (!set) return;
      set.delete(handler);
      if (set.size === 0) {
        this.handlers.delete(eventType);
      }
    };
  }

  /**
   * إرسال حدث واحد لكل الـ handlers المشتركين في نوعه
   */
  async publish(event: DomainEvent): Promise<void> {
    const set = this.handlers.get(event.type);
    if (!set || set.size === 0) {
      // لا يوجد مستمعون – نخرج بهدوء بدون خطأ
      return;
    }

    // ننفّذ جميع الـ handlers بالتوازي مع التقاط الأخطاء
    const tasks = Array.from(set).map(async (handler) => {
      try {
        await handler(event);
      } catch {
        // في مرحلة الـ skeleton لا نرمي الاستثناء للخارج
        // (لاحقاً ممكن نوصلها لـ JsonAuditSink أو Logger)
      }
    });

    await Promise.all(tasks);
  }

  /**
   * إرسال مجموعة أحداث متتابعة
   */
  async publishMany(events: DomainEvent[]): Promise<void> {
    for (const evt of events) {
      // ننفّذ publish لكل حدث على حدة للحفاظ على الترتيب المنطقي
      // (مع إن التنفيذ داخل كل حدث موازٍ)
      // eslint-disable-next-line no-await-in-loop
      await this.publish(evt);
    }
  }

  /**
   * مسح جميع الاشتراكات – مفيدة للاختبارات أو إعادة التهيئة
   */
  clearAll(): void {
    this.handlers.clear();
  }
}

/**
 * التصدير الافتراضي، احتياطاً لو تم استيراد الـ Adapter كـ default.
 */
export default InMemoryEventBus;
