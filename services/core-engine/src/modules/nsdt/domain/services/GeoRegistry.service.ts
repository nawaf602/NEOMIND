import { Injectable } from '@nestjs/common';

/**
 * خدمة مبسطة لتسجيل المناطق.
 * لاحقاً ستُستبدل بقراءة من قاعدة بيانات / ملف حدود مكانية.
 */
@Injectable()
export class GeoRegistryService {
  getZonesForCountry(countryCode: string): string[] {
    // الآن نعيد بيانات ثابتة لأجل الهيكل فقط
    if (countryCode === 'SA') {
      return ['RIYADH', 'MAKKAH', 'EASTERN_PROVINCE'];
    }
    return ['ZONE_A', 'ZONE_B', 'ZONE_C'];
  }
}
