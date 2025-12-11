// src/adapters/audit/JsonAuditSink.adapter.ts

import { promises as fs } from "fs";
import * as path from "path";

/**
 * مستوى خطورة الحدث التدقيقي
 */
export type AuditSeverity = "INFO" | "WARN" | "ERROR";

/**
 * نوع الفاعل (الذي قام بالفعل)
 */
export type AuditActorType = "USER" | "SERVICE" | "SYSTEM";

/**
 * نوع الفئة/القسم للحدث التدقيقي
 */
export type AuditCategory = "SECURITY" | "SYSTEM" | "ACCESS" | "DATA" | "OTHER";

/**
 * شكل الحدث التدقيقي الذي نخزّنه في ملف JSON (سطر لكل حدث).
 */
export interface AuditEvent {
  /** وقت الحدث بصيغة ISO */
  timestamp: string;

  /** فئة الحدث (أمن، نظام، وصول، ... إلخ) */
  category: AuditCategory;

  /** مستوى الخطورة */
  severity: AuditSeverity;

  /** نوع الفاعل: مستخدم، خدمة، نظام */
  actorType: AuditActorType;

  /** معرّف الفاعل (مثلاً userId أو serviceId) – اختياري */
  actorId?: string;

  /** معرّف التتبع (Correlation ID) لربط عدة أحداث ببعض – اختياري */
  correlationId?: string;

  /** وصف قصير للفعل الذي حصل */
  action: string;

  /** الهدف من الفعل (مثلاً: "PSIC_MODULE", "ZONE-RIYADH-001") – اختياري */
  target?: string;

  /** تفاصيل إضافية (سكليتون مفتوح) */
  details?: Record<string, unknown>;
}

/**
 * خيارات الـ JsonAuditSink
 */
export interface JsonAuditSinkOptions {
  /**
   * المجلد الأساسي الذي يُخزَّن فيه ملف التدقيق.
   * غالباً يكون جذور المشروع أو مجلد فرعي مثل "infra/logs".
   */
  baseDir: string;

  /**
   * اسم ملف التدقيق (داخل baseDir).
   * مثال: "audit/neomind-audit.log"
   */
  fileName: string;

  /**
   * هل نضيف سطراً بصيغة JSON لكل حدث (true) أو نخزن مصفوفة كاملة (غير مدعوم حالياً).
   * حالياً دائماً JSON Lines.
   */
  mode?: "jsonl";
}

/**
 * JsonAuditSink
 * --------------
 * Adapter بسيط جداً يكتب أحداث التدقيق إلى ملف نصي بصيغة JSON Lines:
 * (كل سطر = كائن JSON لحدث واحد)
 *
 * الهدف منه الآن "Skeleton" لعرض فكرة التدقيق في المنصة،
 * ويمكن لاحقاً استبداله بقاعدة بيانات أو منصة SIEM حقيقية.
 */
export class JsonAuditSink {
  private readonly baseDir: string;
  private readonly fileName: string;
  private readonly mode: "jsonl";

  constructor(options: JsonAuditSinkOptions) {
    this.baseDir = options.baseDir;
    this.fileName = options.fileName;
    this.mode = options.mode ?? "jsonl";
  }

  /**
   * إرجاع المسار الكامل لملف التدقيق.
   */
  private getAuditFilePath(): string {
    const full = path.isAbsolute(this.fileName)
      ? this.fileName
      : path.join(this.baseDir, this.fileName);

    return full;
  }

  /**
   * التأكد من وجود المجلد المستهدف قبل الكتابة.
   */
  private async ensureDirectoryExists(filePath: string): Promise<void> {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
  }

  /**
   * تسجيل حدث تدقيقي واحد في الملف.
   * يضيف سطر JSON جديد في نهاية الملف.
   */
  async logEvent(event: AuditEvent): Promise<void> {
    const filePath = this.getAuditFilePath();
    await this.ensureDirectoryExists(filePath);

    const serialized = JSON.stringify(event) + "\n";
    await fs.appendFile(filePath, serialized, "utf-8");
  }

  /**
   * سكليتون لمستقبل المنظومة:
   * تسجيل حدث بسيط بسرعة مع تعبئة بعض الحقول تلقائياً.
   */
  async logSimpleEvent(params: {
    category: AuditCategory;
    severity?: AuditSeverity;
    actorType?: AuditActorType;
    actorId?: string;
    correlationId?: string;
    action: string;
    target?: string;
    details?: Record<string, unknown>;
  }): Promise<void> {
    const event: AuditEvent = {
      timestamp: new Date().toISOString(),
      category: params.category,
      severity: params.severity ?? "INFO",
      actorType: params.actorType ?? "SYSTEM",
      actorId: params.actorId,
      correlationId: params.correlationId,
      action: params.action,
      target: params.target,
      details: params.details,
    };

    await this.logEvent(event);
  }
}

export default JsonAuditSink;
