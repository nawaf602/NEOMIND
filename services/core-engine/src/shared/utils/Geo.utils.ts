export interface Coordinates {
  lat: number;
  lon: number;
}

const EARTH_RADIUS_KM = 6371;

/**
 * حساب المسافة بين نقطتين على الكرة الأرضية باستخدام معادلة هافرساين.
 */
export function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const h =
    sinDLat * sinDLat +
    Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return EARTH_RADIUS_KM * c;
}

/**
 * مسافة تقريبية بالكيلومتر => درجة تقريبية من خط العرض.
 */
export function kmToLatDegrees(km: number): number {
  return km / 111;
}
