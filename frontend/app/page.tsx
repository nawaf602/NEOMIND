// D:\neomindco\frontend\app\minister\dashboard\page.tsx

export const dynamic = "force-dynamic";

type CoreHealthResponse = {
  status: string;
  service?: string;
  timestamp?: string;
};

type PsicHealthResponse = {
  status: string;
  module?: string;
  description?: string;
  bufferSize?: number;
  normalizedBufferSize?: number;
  timestamp?: string;
};

type MlHealthResponse = {
  status: string;
  service?: string;
  description?: string;
  timestamp?: string;
};

type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | string;

type PsicHeatmapCell = {
  zoneId: string;
  riskScore: number;
  riskLevel: RiskLevel;
  eventCount: number;
};

type PsicHeatmapResponse = {
  generatedAt: string;
  cells: PsicHeatmapCell[];
};

type RiskSummary = {
  updatedAtLabel: string;
  globalRiskLevel: string;
  totalEvents: number;
  highestZone?: PsicHeatmapCell;
};

type MapPointType = "patrol" | "camera" | "sensor" | "incident";

type MapPoint = {
  id: string;
  type: MapPointType;
  top: number;
  left: number;
};

// توزيع تجريبي لمصادر المراقبة داخل خريطة الرياض
const MAP_POINTS: MapPoint[] = [
  { id: "p1", type: "patrol", top: 38, left: 42 },
  { id: "p2", type: "patrol", top: 45, left: 48 },
  { id: "p3", type: "patrol", top: 52, left: 37 },
  { id: "p4", type: "patrol", top: 60, left: 55 },
  { id: "c1", type: "camera", top: 35, left: 60 },
  { id: "c2", type: "camera", top: 40, left: 72 },
  { id: "c3", type: "camera", top: 48, left: 66 },
  { id: "c4", type: "camera", top: 56, left: 70 },
  { id: "s1", type: "sensor", top: 32, left: 50 },
  { id: "s2", type: "sensor", top: 44, left: 58 },
  { id: "s3", type: "sensor", top: 51, left: 62 },
  { id: "s4", type: "sensor", top: 59, left: 47 },
  { id: "s5", type: "sensor", top: 41, left: 40 },
  { id: "i1", type: "incident", top: 36, left: 46 },
  { id: "i2", type: "incident", top: 43, left: 54 },
  { id: "i3", type: "incident", top: 49, left: 44 },
  { id: "i4", type: "incident", top: 55, left: 60 },
];

const CORE_ENGINE_BASE =
  process.env.NEOMIND_CORE_ENGINE_BASE || "http://localhost:5100";
const ML_ENGINE_BASE =
  process.env.NEOMIND_ML_ENGINE_BASE || "http://localhost:5200";

/**
 * جلب JSON بأمان – بدون كسر الصفحة لو الـ API طاح
 * نستخدم console.warn بدل console.error عشان ما يظهر overlay أحمر مزعج
 */
async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.warn(
        "NEOMIND dashboard: non-OK response",
        url,
        res.status,
        res.statusText,
      );
      return null;
    }
    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    console.warn("NEOMIND dashboard: fetch failed", url, err);
    return null;
  }
}

function translateRisk(level: RiskLevel): string {
  const upper = String(level).toUpperCase();
  switch (upper) {
    case "LOW":
      return "منخفض";
    case "MEDIUM":
      return "متوسط";
    case "HIGH":
      return "مرتفع";
    case "CRITICAL":
      return "حرج";
    default:
      return String(level);
  }
}

function computeRiskSummary(heatmap: PsicHeatmapResponse | null): RiskSummary {
  if (!heatmap || !Array.isArray(heatmap.cells) || heatmap.cells.length === 0) {
    return {
      updatedAtLabel: "غير متوفر",
      globalRiskLevel: "غير متوفر",
      totalEvents: 0,
    };
  }

  const totalEvents = heatmap.cells.reduce(
    (acc: number, cell: PsicHeatmapCell) => acc + (cell.eventCount ?? 0),
    0,
  );

  let highestZone: PsicHeatmapCell = heatmap.cells[0];
  for (const cell of heatmap.cells) {
    if (cell.riskScore > highestZone.riskScore) {
      highestZone = cell;
    }
  }

  let updatedAtLabel = "غير متوفر";
  try {
    const d = new Date(heatmap.generatedAt);
    if (!Number.isNaN(d.getTime())) {
      updatedAtLabel = d.toLocaleString("ar-SA", { hour12: false });
    }
  } catch {
    // نتركها "غير متوفر"
  }

  return {
    updatedAtLabel,
    globalRiskLevel: translateRisk(highestZone.riskLevel),
    totalEvents,
    highestZone,
  };
}

function formatStatusArabic(status: string | undefined | null): string {
  if (!status) return "غير متصل";
  const lower = status.toLowerCase();
  if (lower === "ok" || lower === "online" || lower === "up") return "جاهز";
  return "غير متصل";
}

export default async function MinisterDashboardPage() {
  // نقرأ مباشرة من core-engine و ml-engine (الـ Gateway نركنه مؤقتاً)
  const [coreHealth, psicHealth, heatmap, mlHealth] = await Promise.all([
    fetchJson<CoreHealthResponse>(`${CORE_ENGINE_BASE}/health`),
    fetchJson<PsicHealthResponse>(`${CORE_ENGINE_BASE}/psic/health`),
    fetchJson<PsicHeatmapResponse>(`${CORE_ENGINE_BASE}/psic/heatmap`),
    fetchJson<MlHealthResponse>(`${ML_ENGINE_BASE}/health`),
  ]);

  const riskSummary = computeRiskSummary(heatmap);

  const coreStatus = formatStatusArabic(coreHealth?.status);
  const psicStatus = formatStatusArabic(psicHealth?.status);
  const mlStatus = formatStatusArabic(mlHealth?.status);

  const highestZoneName = riskSummary.highestZone?.zoneId ?? "غير محددة";
  const highestZoneLevel = riskSummary.highestZone
    ? translateRisk(riskSummary.highestZone.riskLevel)
    : "غير متوفر";
  const highestZoneScore = riskSummary.highestZone?.riskScore ?? 0;

  return (
    <div className="nm-shell nm-shell-dashboard">
      {/* الشريط العلوي */}
      <header className="nm-topbar">
        <div className="nm-topbar-left">
          <div className="nm-topbar-role">
            وزير الداخلية / القيادة العليا
            <span className="nm-topbar-role-sub">
              عرض سيادي لحالة المنظومة الوطنية لاستخبارات المخاطر والتوأم الرقمي
              المعتمد على منصة NEOMIND.
            </span>
          </div>
          <p className="nm-topbar-mode-caption">
            هذه النسخة مخصصة للعرض أمام لجنة هاكاثون أبشر طويق 2025، وتعكس قدرات
            المنظومة في التنبؤ بالمخاطر قبل حدوثها ودعم القرار السيادي.
          </p>
        </div>

        <div className="nm-topbar-center">
          <div className="nm-topbar-badge">
            <span>NEOMIND Core Engine</span>
            <span>حالة العمل:</span>
            <span>{coreStatus}</span>
            <span className="nm-status-dot" />
          </div>
          <div className="nm-topbar-meta">
            <span>
              آخر تحديث للبيانات:{" "}
              <strong>{riskSummary.updatedAtLabel}</strong>
            </span>
            <span>
              مستوى المخاطر الوطني:{" "}
              <strong>{riskSummary.globalRiskLevel}</strong>
            </span>
          </div>
        </div>

        <div className="nm-topbar-right">
          <div className="nm-topbar-brand">
            <div className="nm-logo-circle-lg">N</div>
            <div className="nm-topbar-brand-text">
              <span className="nm-topbar-brand-title">
                NEOMIND - Sovereign Intelligence Grid
              </span>
              <span className="nm-topbar-brand-subtitle">
                NATIONAL PREDICTIVE SECURITY &amp; DIGITAL TWIN
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* الشبكة الرئيسية */}
      <main className="nm-grid">
        {/* يمين: مخرجات الطبقات السيادية */}
        <section className="nm-column nm-column-right">
          <div className="nm-column-header">
            <span className="nm-column-title">
              نتائج الطبقات السيادية - مخرجات مختصرة لكل طبقة
            </span>
            <span className="nm-column-subtitle">
              نظرة تنفيذية على ما تفعله كل طبقة الآن وفقاً لحالة المدينة.
            </span>
          </div>

          <div className="nm-layers-list">
            <button className="nm-layer-pill nm-layer-pill-active">
              <span className="nm-layer-pill-title">CORE – المحرك السيادي</span>
              <span className="nm-layer-pill-sub">
                يدمج مخرجات الطبقات جميعاً ويحوّلها إلى قرارات قابلة للتنفيذ عبر
                لوحات القيادة السيادية.
              </span>
            </button>

            <button className="nm-layer-pill">
              <span className="nm-layer-pill-title">
                PSIC – محرك الأنماط وحالة المخاطر
              </span>
              <span className="nm-layer-pill-sub">
                يحوّل الأحداث المتدفقة إلى مؤشرات مخاطر مكانية وزمانية، ويولّد
                خريطة حرارية للمخاطر في الرياض.
              </span>
            </button>

            <button className="nm-layer-pill">
              <span className="nm-layer-pill-title">
                NSDT – التوأم الرقمي الوطني
              </span>
              <span className="nm-layer-pill-sub">
                يعكس الوضع اللحظي للمناطق الحساسة، ويظهر أثر القرارات على حركة
                المدينة وسلوكها.
              </span>
            </button>

            <button className="nm-layer-pill">
              <span className="nm-layer-pill-title">
                CONTEXT – محرك السياق والمحاكاة
              </span>
              <span className="nm-layer-pill-sub">
                يربط بين الوقائع الميدانية، الخلفيات، والسياق الزمني لإنتاج
                سيناريوهات "ماذا لو" للقيادة.
              </span>
            </button>

            <button className="nm-layer-pill">
              <span className="nm-layer-pill-title">
                C4S – منظومة القرار والسيطرة
              </span>
              <span className="nm-layer-pill-sub">
                تحوّل المخرجات التحليلية إلى أوامر تشغيلية قابلة للمتابعة، مع
                تتبع حالة التنفيذ عبر التوأم الرقمي.
              </span>
            </button>

            <button className="nm-layer-pill">
              <span className="nm-layer-pill-title">
                IDENTITY – الهوية والسلوك
              </span>
              <span className="nm-layer-pill-sub">
                تربط بين أنماط السلوك، الكيانات، والمناطق الحساسة لاكتشاف
                الانحرافات السلوكية قبل تحوّلها إلى مخاطرة أمنية.
              </span>
            </button>
          </div>

          <div className="nm-right-footer">
            <span>
              عند تفعيل المحرك السيادي والـ Simulator، يمكن تغذية هذه اللوحة
              بأحداث حية وتغيير مستوى المخاطر لحظياً أمام اللجنة.
            </span>
          </div>
        </section>

        {/* وسط: خريطة الرياض التفاعلية */}
        <section className="nm-column nm-column-center">
          <div className="nm-column-header nm-column-header-center">
            <div>
              <span className="nm-column-title">
                المشهد الوطني - خريطة المخاطر في مدينة الرياض
              </span>
              <span className="nm-column-subtitle">
                توزيع مصادر البيانات (دوريات – كاميرات – حساسات – بلاغات) مع
                خريطة حرارية لمستوى المخاطر حسب المناطق.
              </span>
            </div>
          </div>

          <div className="nm-map-wrapper">
            <div className="nm-map">
              {/* خريطة تفاعلية من OpenStreetMap */}
              <iframe
                className="nm-map-frame"
                src="https://www.openstreetmap.org/export/embed.html?bbox=46.457748413085945%2C24.675097969136303%2C46.899261474609375%2C24.874601087580547&amp;layer=mapnik&amp;marker=24.77457885458621%2C46.678504943847656"
                loading="lazy"
              />

              {/* نقاط المصادر فوق الخريطة */}
              <div className="nm-map-points">
                {MAP_POINTS.map((p) => (
                  <div
                    key={p.id}
                    className={`nm-map-dot nm-map-dot-${p.type}`}
                    style={{ top: `${p.top}%`, left: `${p.left}%` }}
                  />
                ))}
              </div>

              {/* تدرج غامق + النصوص في الأسفل */}
              <div className="nm-map-overlay">
                <div className="nm-map-badges">
                  <span className="nm-map-badge nm-map-badge-active">
                    الرياض – شبكة المراقبة السيادية الحية
                  </span>
                  <span className="nm-map-badge">
                    إجمالي المصادر النشطة على الخريطة: 49 مصدر مراقبة
                  </span>
                </div>
                <div className="nm-map-label">
                  مستوى المخاطر الحالي في العاصمة:{" "}
                  <strong>{riskSummary.globalRiskLevel}</strong>
                </div>
                <div className="nm-map-sub">
                  يتم تحديث هذه الخريطة بناءً على مخرجات PSIC و NSDT، مع تغذية
                  نماذج التنبؤ السيادي بالتغيّر في نمط الأحداث.
                </div>

                <div className="nm-map-badges" style={{ marginTop: "0.4rem" }}>
                  <span className="nm-map-badge nm-map-badge-patrol">
                    الدوريات والفرق الميدانية
                  </span>
                  <span className="nm-map-badge nm-map-badge-camera">
                    الكاميرات الثابتة والمتنقلة
                  </span>
                  <span className="nm-map-badge nm-map-badge-sensor">
                    الحساسات بأنواعها
                  </span>
                  <span className="nm-map-badge nm-map-badge-incident">
                    مواقع البلاغات الواردة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* يسار: التنبؤات والتحليلات */}
        <section className="nm-column nm-column-left">
          <div className="nm-column-header">
            <span className="nm-column-title">
              التنبؤات السيادية - مخرجات محرك الأنماط PSIC
            </span>
            <span className="nm-column-subtitle">
              تلخيص لأهم النقاط الحرجة في مدينة الرياض خلال آخر دفعة بيانات وصلت
              إلى المحرك السيادي.
            </span>
          </div>

          <div className="nm-incident-list">
            <article className="nm-incident-card nm-incident-info">
              <div className="nm-incident-header">
                <span className="nm-incident-severity nm-badge-high">
                  أعلى منطقة خطورة
                </span>
                <span className="nm-incident-id">{highestZoneName}</span>
              </div>
              <h3 className="nm-incident-title">
                مستوى المخاطر: {highestZoneLevel}
              </h3>
              <p className="nm-incident-location">
                مؤشر المخاطر (0–1): {highestZoneScore.toFixed(2)} – يعتمد على
                كثافة الأحداث ونمط السلوك في المنطقة.
              </p>
              <p className="nm-incident-tags">
                تستخدم هذه القراءة لمواءمة قرارات الانتشار الميداني، وتغذية
                التوأم الرقمي بمستوى الضغط الأمني في المدينة.
              </p>
              <div className="nm-incident-footer">
                <span>
                  إجمالي الأحداث المراقبة على الخريطة الحرارية:{" "}
                  {riskSummary.totalEvents}
                </span>
                <span>
                  آخر توليد لخريطة المخاطر: {riskSummary.updatedAtLabel}
                </span>
              </div>
            </article>

            <article className="nm-incident-card">
              <div className="nm-incident-header">
                <span className="nm-incident-severity nm-badge-medium">
                  قراءة تشغيلية
                </span>
                <span className="nm-incident-id">CORE / PSIC / ML</span>
              </div>
              <h3 className="nm-incident-title">
                جاهزية المحركات السيادية الثلاثة المرتبطة بهذه اللوحة
              </h3>
              <p className="nm-incident-location">
                حالة المحرك السيادي المركزي (CORE): <strong>{coreStatus}</strong>
              </p>
              <p className="nm-incident-location">
                حالة محرك الأنماط وحالة المخاطر (PSIC):{" "}
                <strong>{psicStatus}</strong>
              </p>
              <p className="nm-incident-location">
                حالة محرك نماذج التنبؤ السيادي (ML Engine):{" "}
                <strong>{mlStatus}</strong>
              </p>
              <div className="nm-incident-footer">
                <span>
                  تستخدم هذه القراءة لطمأنة القيادة أن سلسلة القرار من البيانات
                  الخام حتى التنبؤ والسياسة التنفيذية تعمل بشكل كامل.
                </span>
              </div>
            </article>
          </div>

          <div className="nm-right-footer">
            <span>
              * جميع البيانات المعروضة تجريبية ومحاكية لأغراض العرض أمام لجنة
              هاكاثون أبشر طويق 2025.
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
