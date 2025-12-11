import Link from "next/link";

export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.5rem",
        direction: "rtl",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          padding: "1.8rem 2rem",
          borderRadius: "1.5rem",
          background:
            "radial-gradient(circle at top, rgba(22,163,74,0.22), rgba(15,23,42,0.98))",
          border: "1px solid rgba(148,163,184,0.4)",
          boxShadow: "0 24px 60px rgba(15,23,42,0.95)",
        }}
      >
        <h1 style={{ margin: 0, marginBottom: "0.5rem", fontSize: "1.4rem" }}>
          NEOMIND – دخول المنصة السيادية التجريبية
        </h1>
        <p
          style={{
            margin: 0,
            marginBottom: "1.2rem",
            fontSize: "0.9rem",
            opacity: 0.9,
            lineHeight: 1.8,
          }}
        >
          هذه النسخة مخصّصة للعرض أمام لجنة هاكاثون أبشر طويق 2025م، وتقدّم
          رحلة مبسّطة من صفحة الدخول إلى لوحة تشغيل محلّل القيادة السيادية
          (Operator).
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
            marginTop: "0.6rem",
          }}
        >
          <Link
            href="/auth/login"
            style={{
              padding: "0.7rem 1rem",
              borderRadius: "999px",
              border: "1px solid rgba(34,197,94,0.9)",
              background:
                "radial-gradient(circle at top, rgba(34,197,94,0.45), rgba(15,23,42,1))",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "#f9fafb",
              fontWeight: 600,
              display: "block",
            }}
          >
            دخول تشغيلي تجريبي كمحلّل قيادة (Operator)
          </Link>

          <div
            style={{
              padding: "0.55rem 0.9rem",
              borderRadius: "999px",
              border: "1px dashed rgba(148,163,184,0.5)",
              fontSize: "0.78rem",
              opacity: 0.85,
            }}
          >
            سيتم لاحقاً ربط أدوار إضافية (الوزير، غرف القيادة، الميدان) حسب
            شجرة المشروع في الكراسة، لكن هذا المسار يغطّي سيناريو
            الـ Operator بالكامل.
          </div>
        </div>
      </div>
    </main>
  );
}
