"use client";

import React, { useState } from "react";

type Mode = "analysis" | "demo";
type View = "national" | "metro" | "borders";
type LayerKey =
  | "intelligence"
  | "prediction"
  | "digitalTwin"
  | "sovereignId"
  | "field"
  | "citizen"
  | "c4isr";

const viewLabels: Record<View, string> = {
  national: "صورة الموقف الوطني – الطبقة السيادية للمملكة العربية السعودية",
  metro: "صورة الموقف في نطاق الرياض الحضري – المشاهد عالية الكثافة",
  borders: "صورة الموقف على نطاق الحدود والمنافذ",
};

const viewSubtitles: Record<View, string> = {
  national:
    "دمج البيانات · التنبؤ · التوأم الرقمي · الهوية السيادية · الميدان المدعوم",
  metro: "متابعة الكثافة السكانية والحركة الميدانية حول الأصول الحساسة",
  borders: "دمج بيانات المنافذ البرية والبحرية والجوية في مشهد واحد",
};

const viewStats = {
  national: {
    active: 19,
    risk: "75%",
    trend: "↑ أكثر من 49% خلال 24 ساعة",
    updated: "قبل 3 دقائق",
    critical: 4,
    high: 6,
  },
  metro: {
    active: 11,
    risk: "62%",
    trend: "↑ أكثر من 23% خلال 12 ساعة",
    updated: "قبل دقيقة واحدة",
    critical: 2,
    high: 3,
  },
  borders: {
    active: 7,
    risk: "54%",
    trend: "→ استقرار خلال 24 ساعة",
    updated: "قبل 5 دقائق",
    critical: 1,
    high: 2,
  },
} as const;

const layerDescriptions: Record<LayerKey, string> = {
  intelligence: "دمج المصادر وتحليلها في محرك سيادي موحّد.",
  prediction: "قياس المخاطر قبل وقوعها باستخدام نماذج الذكاء الاصطناعي.",
  digitalTwin: "إنشاء توأم رقمي ديناميكي للمشهد الوطني.",
  sovereignId: "ربط المعلومة بالهوية السيادية الرقمية.",
  field: "دعم رجل الأمن بالمعلومة اللحظية في الميدان.",
  citizen: "حماية المواطن إلى أقصى مدى ضمن إطار سيادي.",
  c4isr: "صورة سيادية لحالة الدولة في الزمن الحقيقي للقيادة والسيطرة.",
};

function cx(...classes: Array<string | false>): string {
  return classes.filter(Boolean).join(" ");
}

export default function OperatorDashboard() {
  const [mode, setMode] = useState<Mode>("analysis");
  const [view, setView] = useState<View>("national");
  const [selectedLayer, setSelectedLayer] = useState<LayerKey>("intelligence");

  const stats = viewStats[view];

  return (
    <main className="nm-shell nm-shell-dashboard">
      {/* الشريط العلوي */}
      <header className="nm-topbar">
        {/* يمين: البراند */}
        <div className="nm-topbar-right">
          <div className="nm-topbar-brand">
            <div className="nm-topbar-brand-text">
              <span className="nm-topbar-brand-title">
                NEOMIND Cyber Command &amp; Digital Twin Center
              </span>
              <span className="nm-topbar-brand-subtitle">
                PREDICT · PROTECT · COMMAND
              </span>
            </div>
            <div className="nm-logo-circle-lg">N</div>
          </div>
        </div>

        {/* وسط: الوقت + وضع الموقف */}
        <div className="nm-topbar-center">
          <div className="nm-topbar-meta">
            <span>الاثنين · 10 جمادى الآخرة 1447 هـ</span>
            <span>05:38 م</span>
          </div>
          <div className="nm-topbar-badge">
            <span>LIVE</span>
            <span>- National Situation</span>
            <span className="nm-status-dot" />
          </div>
        </div>

        {/* يسار: دور المستخدم + وضع التشغيل */}
        <div className="nm-topbar-left">
          <div className="nm-topbar-role">
            NEOMIND Operator
            <span className="nm-topbar-role-sub">
              Cyber Command Analyst · دخول تشغيلي تجريبي
            </span>
          </div>

          <div className="nm-topbar-toggle-group">
            <button
              className={cx(
                "nm-topbar-toggle",
                mode === "analysis" && "nm-topbar-toggle-active"
              )}
              onClick={() => setMode("analysis")}
            >
              وضع التشغيل التحليلي
            </button>
            <button
              className={cx(
                "nm-topbar-toggle",
                mode === "demo" && "nm-topbar-toggle-active"
              )}
              onClick={() => setMode("demo")}
            >
              وضع العرض التجريبي
            </button>
          </div>

          <div className="nm-topbar-mode-caption">
            {mode === "analysis" ? (
              <span>
                يتم استخدام هذه الواجهة لشرح كيف سيعمل المحرك السيادي في الوضع
                التشغيلي الحقيقي دون عرض بيانات حقيقية.
              </span>
            ) : (
              <span>
                هذا الوضع يعرض سيناريو مبسّط ومتحكم به لشرح قدرات NEOMIND أمام
                اللجنة.
              </span>
            )}
          </div>
        </div>
      </header>

      {/* الشبكة الرئيسية */}
      <section className="nm-grid">
        {/* العمود الأيسر – بطاقات الأحداث */}
        <aside className="nm-column nm-column-left">
          <div className="nm-column-header">
            <span className="nm-column-title">بطاقات الأحداث الحية</span>
            <span className="nm-column-subtitle">
              آخر حوادث الموقف الوطني (بيانات تجريبية)
            </span>
          </div>

          <div className="nm-incident-list">
            {/* بطاقة حرجة */}
            <article className="nm-incident-card nm-incident-critical">
              <div className="nm-incident-header">
                <span className="nm-incident-severity nm-badge-critical">
                  CRITICAL
                </span>
                <span className="nm-incident-id">INC-2391</span>
              </div>
              <div className="nm-incident-main">
                <h3 className="nm-incident-title">
                  نشاط سيبراني غير معتاد على أحد الأصول الحساسة
                </h3>
                <p className="nm-incident-location">الرياض · Gov Network</p>
                <p className="nm-incident-tags">
                  Ransomware · Identity Signals · Critical Asset
                </p>
              </div>
              <div className="nm-incident-footer">
                <span>مصدر التنبيه: طبقة التنبيه السيادي</span>
                <span>آخر تحديث: قبل 6 دقائق</span>
              </div>
            </article>

            {/* بطاقة High */}
            <article className="nm-incident-card nm-incident-high">
              <div className="nm-incident-header">
                <span className="nm-incident-severity nm-badge-high">HIGH</span>
                <span className="nm-incident-id">INC-2387</span>
              </div>
              <div className="nm-incident-main">
                <h3 className="nm-incident-title">
                  تحرك غير اعتيادي قرب منشأة حيوية في نطاق حضري مكتظ
                </h3>
                <p className="nm-incident-location">الدمام · Field Alert</p>
                <p className="nm-incident-tags">
                  Critical Asset · Crowd Pattern · Field Patrol
                </p>
              </div>
              <div className="nm-incident-footer">
                <span>مصدر المعلومة: دوريات ميدانية متصلة بـ NEOMIND</span>
                <span>آخر تحديث: قبل 18 دقيقة</span>
              </div>
            </article>

            {/* بطاقة Medium */}
            <article className="nm-incident-card nm-incident-medium">
              <div className="nm-incident-header">
                <span className="nm-incident-severity nm-badge-medium">
                  MEDIUM
                </span>
                <span className="nm-incident-id">INC-2383</span>
              </div>
              <div className="nm-incident-main">
                <h3 className="nm-incident-title">
                  تقارب هويات رقمية في نفس الموقع الجغرافي بشكل متكرر
                </h3>
                <p className="nm-incident-location">جدة · Citizen Layer</p>
                <p className="nm-incident-tags">
                  ID Conflict · Digital Identity · Behavior Pattern
                </p>
              </div>
              <div className="nm-incident-footer">
                <span>مصدر المعلومة: طبقة الهوية والسيادة الرقمية</span>
                <span>آخر تحديث: قبل 40 دقيقة</span>
              </div>
            </article>

            {/* بطاقة معلومات عامة */}
            <article className="nm-incident-card nm-incident-info">
              <div className="nm-incident-main">
                <h3 className="nm-incident-title">
                  هذه الأحداث تم إنشاؤها تجريبياً انطلاقاً من نموذج NEOMIND
                </h3>
                <p className="nm-incident-tags">
                  لا تمثّل بيانات حقيقية، وإنما نموذجاً لتقاطع التنبيهات
                  السيبرانية والميدانية والسيادية في واجهة واحدة.
                </p>
              </div>
            </article>
          </div>
        </aside>

        {/* العمود الأوسط – الخريطة */}
        <section className="nm-column nm-column-center">
          <div className="nm-column-header nm-column-header-center">
            <div>
              <span className="nm-column-title">{viewLabels[view]}</span>
              <span className="nm-column-subtitle">
                {viewSubtitles[view]}
              </span>
            </div>
            <div className="nm-map-badges">
              <button
                type="button"
                className={cx(
                  "nm-map-badge",
                  view === "national" && "nm-map-badge-active"
                )}
                onClick={() => setView("national")}
              >
                National View · LIVE
              </button>
              <button
                type="button"
                className={cx(
                  "nm-map-badge",
                  view === "borders" && "nm-map-badge-critical"
                )}
                onClick={() => setView("borders")}
              >
                Critical {stats.critical}
              </button>
              <button
                type="button"
                className={cx(
                  "nm-map-badge",
                  view === "metro" && "nm-map-badge-high"
                )}
                onClick={() => setView("metro")}
              >
                High {stats.high}
              </button>
            </div>
          </div>

          <div className="nm-map-wrapper">
            <div
              className={cx(
                "nm-map",
                view === "national" && "nm-map-national",
                view === "metro" && "nm-map-metro",
                view === "borders" && "nm-map-borders"
              )}
            >
              <div className="nm-map-overlay">
                <span className="nm-map-label">
                  {view === "national"
                    ? "Saudi National Picture"
                    : view === "metro"
                    ? "Riyadh Metro View"
                    : "Border & Gateways View"}
                </span>
                <span className="nm-map-sub">
                  هذه الخريطة للاستخدام التجريبي فقط · لا بيانات حقيقية
                </span>
              </div>
            </div>
          </div>

          <div className="nm-center-footer">
            <div className="nm-center-footer-item">
              <span className="nm-meta-label">Active Alerts</span>
              <span className="nm-meta-value">{stats.active}</span>
            </div>
            <div className="nm-center-footer-item">
              <span className="nm-meta-label">National Risk Score</span>
              <span className="nm-meta-value">{stats.risk}</span>
              <span className="nm-meta-sub">{stats.trend}</span>
            </div>
            <div className="nm-center-footer-item">
              <span className="nm-meta-label">آخر تحديث للتنبؤ السيادي</span>
              <span className="nm-meta-value">{stats.updated}</span>
            </div>
          </div>
        </section>

        {/* العمود الأيمن – طبقات المنظومة */}
        <aside className="nm-column nm-column-right">
          <div className="nm-column-header">
            <span className="nm-column-title">طبقات المنظومة</span>
            <span className="nm-column-subtitle">
              عرض مبسّط لتكامل الطبقات التشغيلية
            </span>
          </div>

          <div className="nm-layers-list">
            <button
              className={cx(
                "nm-layer-pill",
                selectedLayer === "intelligence" && "nm-layer-pill-active"
              )}
              onClick={() => setSelectedLayer("intelligence")}
            >
              <span className="nm-layer-pill-title">طبقة الذكاء</span>
              <span className="nm-layer-pill-sub">
                دمج المصادر وتحليلها في محرك موحّد
              </span>
            </button>

            <button
              className={cx(
                "nm-layer-pill",
                selectedLayer === "prediction" && "nm-layer-pill-active"
              )}
              onClick={() => setSelectedLayer("prediction")}
            >
              <span className="nm-layer-pill-title">طبقة التنبؤ</span>
              <span className="nm-layer-pill-sub">
                قياس المخاطر قبل وقوعها
              </span>
            </button>

            <button
              className={cx(
                "nm-layer-pill",
                selectedLayer === "digitalTwin" && "nm-layer-pill-active"
              )}
              onClick={() => setSelectedLayer("digitalTwin")}
            >
              <span className="nm-layer-pill-title">التوأم الرقمي</span>
              <span className="nm-layer-pill-sub">مرآة حيّة للميدان</span>
            </button>

            <button
              className={cx(
                "nm-layer-pill",
                selectedLayer === "sovereignId" && "nm-layer-pill-active"
              )}
              onClick={() => setSelectedLayer("sovereignId")}
            >
              <span className="nm-layer-pill-title">الهوية السيادية</span>
              <span className="nm-layer-pill-sub">
                ربط المعلومة بالهوية الرقمية
              </span>
            </button>

            <button
              className={cx(
                "nm-layer-pill",
                selectedLayer === "field" && "nm-layer-pill-active"
              )}
              onClick={() => setSelectedLayer("field")}
            >
              <span className="nm-layer-pill-title">الميدان المعزَّز</span>
              <span className="nm-layer-pill-sub">
                دعم رجل الأمن بالمعلومة
              </span>
            </button>

            <button
              className={cx(
                "nm-layer-pill",
                selectedLayer === "citizen" && "nm-layer-pill-active"
              )}
              onClick={() => setSelectedLayer("citizen")}
            >
              <span className="nm-layer-pill-title">المواطن المحمي</span>
              <span className="nm-layer-pill-sub">
                حماية المواطن إلى أقصى مدى
              </span>
            </button>

            <button
              className={cx(
                "nm-layer-pill",
                selectedLayer === "c4isr" && "nm-layer-pill-active"
              )}
              onClick={() => setSelectedLayer("c4isr")}
            >
              <span className="nm-layer-pill-title">القيادة والسيطرة C4ISR</span>
              <span className="nm-layer-pill-sub">
                صورة سيادية لحالة الدولة في الزمن الحقيقي
              </span>
            </button>
          </div>

          <div className="nm-right-layer-details">
            <span className="nm-meta-label">وصف الطبقة المحددة</span>
            <p className="nm-right-layer-text">
              {layerDescriptions[selectedLayer]}
            </p>
          </div>

          <div className="nm-right-footer">
            <span className="nm-right-footer-line">
              هذه النسخة للاستخدام التجريبي أمام لجنة هاكاثون أبشر طويق 2025م.
            </span>
            <span className="nm-right-footer-line">
              جميع الحقوق محفوظة لفريق NEOMIND.
            </span>
          </div>
        </aside>
      </section>
    </main>
  );
}
