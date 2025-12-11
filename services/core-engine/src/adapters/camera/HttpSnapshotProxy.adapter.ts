// src/adapters/camera/HttpSnapshotProxy.adapter.ts

/**
 * ملاحظة مهمة:
 * نحن نعتمد هنا على وجود fetch كـ global في Node.js (مدعوم في الإصدارات الحديثة).
 * ولو TypeScript اشتكى على fetch، سنعامله كـ any حتى لا نضيف مكتبات خارجية.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare const fetch: any;

/**
 * خيارات الاتصال بمصدر الكاميرات عبر HTTP
 */
export interface HttpSnapshotProxyOptions {
  /**
   * العنوان الأساسي لخدمة الكاميرات
   * مثال:
   *  - http://localhost:9000
   *  - https://cameras.neomind.gov
   */
  baseUrl: string;

  /**
   * مهلة الطلب بالمللي ثانية (اختياري – افتراضي 5000ms)
   */
  timeoutMs?: number;

  /**
   * مسار افتراضي لالتقاط الصورة حسب الـ cameraId (سكليتون)
   * مثال: /cameras/{cameraId}/snapshot
   *
   * يمكن لاحقاً استبداله بمنظومة أكثر تعقيداً.
   */
  snapshotPathTemplate?: string;
}

/**
 * تمثيل صورة ملتقطة من الكاميرا (سكليتون مبسط)
 */
export interface CameraSnapshot {
  cameraId: string;
  capturedAt: string; // ISO date
  mimeType: string;
  /**
   * البيانات نفسها بصيغة Base64 – يمكن لاحقاً استبدالها بملف فعلي أو Stream
   */
  dataBase64: string;
}

/**
 * محول HTTP لالتقاط الصور من الكاميرات
 * -------------------------------------
 * هذا adapter سكليتون فقط:
 * - يبني URL للكاميرا
 * - ينفذ طلب HTTP GET
 * - يرجع النتيجة كـ Base64 + metadata بسيطة
 *
 * لاحقاً يمكن:
 * - إضافة توثيق (Auth)
 * - دمج مع VMS حقيقي
 * - ربطه بخرائط وقاعات القيادة
 */
export class HttpSnapshotProxy {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly snapshotPathTemplate: string;

  constructor(options: HttpSnapshotProxyOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, ""); // إزالة / الزائدة في النهاية
    this.timeoutMs = options.timeoutMs ?? 5000;
    this.snapshotPathTemplate =
      options.snapshotPathTemplate ?? "/cameras/{cameraId}/snapshot";
  }

  /**
   * بناء الرابط الكامل للكاميرا حسب الـ cameraId
   */
  private buildSnapshotUrl(cameraId: string): string {
    const path = this.snapshotPathTemplate.replace("{cameraId}", cameraId);
    return `${this.baseUrl}${path}`;
  }

  /**
   * تنفيذ طلب HTTP فعلي للحصول على الصورة كـ ArrayBuffer
   */
  private async fetchWithTimeout(url: string): Promise<ArrayBuffer> {
    // نستخدم سباق بسيط بين fetch و timeout بدون تعقيد AbortController
    return new Promise<ArrayBuffer>(async (resolve, reject) => {
      const timeoutHandle = setTimeout(() => {
        reject(new Error(`Snapshot request timed out after ${this.timeoutMs}ms`));
      }, this.timeoutMs);

      try {
        const response = await fetch(url);
        if (!response || !response.ok) {
          clearTimeout(timeoutHandle);
          reject(
            new Error(
              `Failed to fetch snapshot. HTTP status: ${
                response?.status ?? "UNKNOWN"
              }`,
            ),
          );
          return;
        }

        const buffer: ArrayBuffer = await response.arrayBuffer();
        clearTimeout(timeoutHandle);
        resolve(buffer);
      } catch (err) {
        clearTimeout(timeoutHandle);
        reject(err);
      }
    });
  }

  /**
   * التقاط Snapshot من كاميرا معينة عبر الـ cameraId
   * وإرجاعها ككائن CameraSnapshot (Base64 + metadata).
   */
  async getSnapshot(cameraId: string): Promise<CameraSnapshot> {
    const url = this.buildSnapshotUrl(cameraId);
    const arrayBuffer = await this.fetchWithTimeout(url);

    // تحويل ArrayBuffer إلى Base64
    const buffer = Buffer.from(arrayBuffer as ArrayBuffer);
    const dataBase64 = buffer.toString("base64");

    // في السكليتون، نفترض نوع الصورة "image/jpeg"
    const mimeType = "image/jpeg";

    return {
      cameraId,
      capturedAt: new Date().toISOString(),
      mimeType,
      dataBase64,
    };
  }
}

export default HttpSnapshotProxy;
