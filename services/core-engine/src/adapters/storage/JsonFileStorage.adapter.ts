// src/adapters/storage/JsonFileStorage.adapter.ts

import { promises as fs } from "fs";
import * as path from "path";

/**
 * خيارات تهيئة مخزن الملفات JSON
 */
export interface JsonFileStorageOptions {
  /**
   * المجلد الأساسي الذي سيتم حفظ الملفات داخله.
   * يمكن أن يكون مساراً مطلقاً أو نسبياً من جذر الخدمة.
   */
  baseDir: string;
}

/**
 * JsonFileStorage
 * ----------------
 * Adapter بسيط للتعامل مع ملفات JSON على القرص.
 *
 * الاستخدام الحالي:
 *  - تخزين بيانات تجريبية / Snapshots / Logs خفيفة في ملفات.
 *  - Skeleton يمكن استبداله مستقبلاً بمخزن حقيقي (DB / Object Storage).
 */
export class JsonFileStorage {
  private readonly baseDir: string;

  constructor(options: JsonFileStorageOptions) {
    this.baseDir = options.baseDir;
  }

  /**
   * بناء المسار الكامل للملف اعتماداً على baseDir
   */
  private resolveFullPath(relativePath: string): string {
    if (path.isAbsolute(relativePath)) {
      return relativePath;
    }
    return path.join(this.baseDir, relativePath);
  }

  /**
   * التأكد من وجود المجلد قبل الكتابة
   */
  private async ensureDirectoryExists(fullPath: string): Promise<void> {
    const dir = path.dirname(fullPath);
    await fs.mkdir(dir, { recursive: true });
  }

  /**
   * قراءة JSON من ملف، وإرجاع قيمة افتراضية في حال عدم وجود الملف.
   *
   * @param relativePath المسار النسبي داخل baseDir
   * @param defaultValue القيمة الافتراضية إذا لم يوجد الملف
   */
  async readJson<T>(relativePath: string, defaultValue: T): Promise<T> {
    const fullPath = this.resolveFullPath(relativePath);

    try {
      const content = await fs.readFile(fullPath, "utf-8");
      return JSON.parse(content) as T;
    } catch (err: any) {
      if (err && (err.code === "ENOENT" || err.code === "ENOTDIR")) {
        // الملف غير موجود – نرجّع القيمة الافتراضية بدون رمي خطأ
        return defaultValue;
      }

      // في هذه المرحلة نعيد رمي الخطأ ليظهر في اللوجات (Skeleton)
      throw err;
    }
  }

  /**
   * كتابة قيمة إلى ملف JSON (مع تنسيق جميل).
   *
   * @param relativePath المسار النسبي داخل baseDir
   * @param value الكائن الذي سيتم حفظه كـ JSON
   */
  async writeJson(relativePath: string, value: unknown): Promise<void> {
    const fullPath = this.resolveFullPath(relativePath);
    await this.ensureDirectoryExists(fullPath);

    const serialized = JSON.stringify(value, null, 2);
    await fs.writeFile(fullPath, serialized, "utf-8");
  }

  /**
   * إضافة عنصر إلى مصفوفة داخل ملف JSON.
   * إذا لم يوجد الملف، يتم إنشاؤه بمصفوفة جديدة تحتوي على العنصر.
   *
   * @param relativePath المسار النسبي داخل baseDir
   * @param item العنصر المراد إضافته
   */
  async appendToArray<T>(relativePath: string, item: T): Promise<void> {
    const current = await this.readJson<T[]>(relativePath, []);
    current.push(item);
    await this.writeJson(relativePath, current);
  }

  /**
   * مسح ملف JSON (إن وجد).
   * لا ترمي خطأ إذا لم يوجد الملف.
   */
  async deleteFile(relativePath: string): Promise<void> {
    const fullPath = this.resolveFullPath(relativePath);
    try {
      await fs.unlink(fullPath);
    } catch (err: any) {
      if (err && err.code === "ENOENT") {
        // الملف غير موجود – لا مشكلة
        return;
      }
      throw err;
    }
  }
}

/**
 * التصدير الافتراضي لتسهيل الاستيراد في بعض الأماكن.
 */
export default JsonFileStorage;
