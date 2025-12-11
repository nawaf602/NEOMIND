export function nowUtc(): Date {
  return new Date();
}

export function toIsoString(date: Date): string {
  return date.toISOString();
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

export function diffInMinutes(a: Date, b: Date): number {
  const diffMs = a.getTime() - b.getTime();
  return diffMs / 60_000;
}

export function isBefore(a: Date, b: Date): boolean {
  return a.getTime() < b.getTime();
}

export function isAfter(a: Date, b: Date): boolean {
  return a.getTime() > b.getTime();
}
