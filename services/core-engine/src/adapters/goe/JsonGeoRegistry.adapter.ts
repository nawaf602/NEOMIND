// src/adapters/geo/JsonGeoRegistry.adapter.ts

import { promises as fs } from "fs";
import * as path from "path";

/**
 * نقطة جغرافية بسيطة (سكليتون)
 */
export interface GeoPoint {
  lat: number;
  lon: number;
}

/**
 * تعريف منطقة/زون في المنصة
 * هذا سكليتون قابل للتوسع لاحقاً
 */
export interface ZoneDefinition {
  zoneId: string; // مثال: ZONE-RIYADH-001
  name: string; // مثال: "Riyadh – Central District"
  type: "CITY" | "DISTRICT" | "CRITICAL_INFRA" | "OTHER";

  /**
   * مضلع حدود المنطقة (اختياري)
   * يمكن لاحقاً ربطه مع خرائط حقيقية
   */
  polygon?: GeoPoint[];

  /**
   * مركز المنطقة (اختياري)
   */
  centroid?: GeoPoint;

  /**
   * بيانات إضافية عامة (سكليتون)
   * مثال:
   *   - population
   *   - riskCategory
   *   - strategicImportance
   */
  metadata?: Record<string, unknown>;
}

/**
 * الشكل العام لملف JSON على القرص
 */
interface GeoRegistryFile {
  zones: ZoneDefinition[];
}

/**
 * Adapter لتخزين/قراءة سجل المناطق (Zones) في ملف JSON بسيط.
 *
 * الهدف منه:
 *  - يكون في عندنا مصدر واحد ثابت لتعريف المناطق
 *  - سهل نبدله لاحقاً بقاعدة بيانات أو GeoService حقيقي
 */
export class JsonGeoRegistry {
  private readonly filePath: string;

  constructor(filePath?: string) {
    // المسار الافتراضي داخل مجلد data/geo
    this.filePath =
      filePath ??
      path.join(process.cwd(), "data", "geo", "geo-registry.json");
  }

  /**
   * التأكد من وجود المجلد قبل الكتابة
   */
  private async ensureDirectoryExists(): Promise<void> {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });
  }

  /**
   * قراءة السجل من الملف
   * إذا لم يوجد الملف، يرجع سجل فارغ.
   */
  private async loadRegistry(): Promise<GeoRegistryFile> {
    try {
      const content = await fs.readFile(this.filePath, "utf8");
      const parsed = JSON.parse(content) as GeoRegistryFile;

      // ضمان وجود مصفوفة zones حتى لو الملف ناقص
      if (!parsed.zones || !Array.isArray(parsed.zones)) {
        return { zones: [] };
      }

      return parsed;
    } catch (err: any) {
      if (err && (err as NodeJS.ErrnoException).code === "ENOENT") {
        // الملف غير موجود – نبدأ بسجل جديد
        return { zones: [] };
      }
      throw err;
    }
  }

  /**
   * حفظ السجل في الملف (بصيغة جميلة)
   */
  private async saveRegistry(registry: GeoRegistryFile): Promise<void> {
    await this.ensureDirectoryExists();
    const json = JSON.stringify(registry, null, 2);
    await fs.writeFile(this.filePath, json, "utf8");
  }

  /**
   * إرجاع جميع المناطق المعرفة في السجل
   */
  async listZones(): Promise<ZoneDefinition[]> {
    const registry = await this.loadRegistry();
    return registry.zones;
  }

  /**
   * البحث عن منطقة محددة بالـ zoneId
   */
  async getZoneById(zoneId: string): Promise<ZoneDefinition | undefined> {
    const registry = await this.loadRegistry();
    return registry.zones.find((z) => z.zoneId === zoneId);
  }

  /**
   * إرجاع كل المناطق من نوع معين (CITY, DISTRICT, ...)
   */
  async findZonesByType(
    type: ZoneDefinition["type"],
  ): Promise<ZoneDefinition[]> {
    const registry = await this.loadRegistry();
    return registry.zones.filter((z) => z.type === type);
  }

  /**
   * إضافة أو تحديث منطقة (upsert)
   * - لو الـ zoneId موجود: يتم التحديث
   * - لو غير موجود: تتم الإضافة
   */
  async upsertZone(zone: ZoneDefinition): Promise<void> {
    const registry = await this.loadRegistry();
    const index = registry.zones.findIndex((z) => z.zoneId === zone.zoneId);

    if (index >= 0) {
      registry.zones[index] = zone;
    } else {
      registry.zones.push(zone);
    }

    await saveWithSafeDefaults(this, registry);
  }

  /**
   * حذف منطقة من السجل
   * يرجع true لو تم الحذف، false لو لم تكن موجودة
   */
  async deleteZone(zoneId: string): Promise<boolean> {
    const registry = await this.loadRegistry();
    const beforeCount = registry.zones.length;
    registry.zones = registry.zones.filter((z) => z.zoneId !== zoneId);
    const afterCount = registry.zones.length;

    if (afterCount === beforeCount) {
      // لم يحدث حذف
      return false;
    }

    await this.saveRegistry(registry);
    return true;
  }
}

/**
 * دالة مساعدة بسيطة لعمل upsert آمن:
 * - لو registry.zones غير معرفة، يتم تهيئتها.
 */
async function saveWithSafeDefaults(
  registryAdapter: JsonGeoRegistry,
  registry: GeoRegistryFile,
): Promise<void> {
  if (!registry.zones) {
    registry.zones = [];
  }
  await (registryAdapter as any).saveRegistry(registry);
}

export default JsonGeoRegistry;
