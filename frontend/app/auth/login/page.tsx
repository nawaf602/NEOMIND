"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const DEMO_USER = "ADMIN";
const DEMO_PASS = "123";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("ADMIN");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const normalizedUser = username.trim().toUpperCase();

    if (normalizedUser === DEMO_USER && password === DEMO_PASS) {
      setLoading(true);
      // في الديمو نكتفي بالتوجيه – لا حاجة لتوكنات حقيقية
      router.push("/minister/dashboard");
      return;
    }

    setError("بيانات الدخول غير صحيحة. جرِّب ADMIN / 123.");
  };

  return (
    <div
      className="nm-shell"
      style={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <main
        style={{
          maxWidth: 480,
          width: "100%",
          borderRadius: "1.5rem",
          padding: "2.2rem 2.4rem 2.4rem",
          background:
            "radial-gradient(circle at top, rgba(56,189,248,0.35), rgba(15,23,42,0.96))",
          boxShadow: "0 32px 80px rgba(0,0,0,0.75)",
          border: "1px solid rgba(148,163,184,0.35)",
        }}
      >
        {/* الشعار العلوي */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.4rem",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "999px",
              border: "1px solid rgba(209,213,219,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(circle at top, rgba(52,211,153,0.45), #020617 80%)",
              boxShadow:
                "0 0 0 1px rgba(15,23,42,0.9), 0 22px 50px rgba(15,23,42,0.95)",
              fontWeight: 800,
              fontSize: "1.5rem",
              letterSpacing: "0.18em",
            }}
          >
            N
          </div>
        </div>

        {/* العنوان والنص التعريفي */}
        <div style={{ textAlign: "center", marginBottom: "1.6rem" }}>
          <h1
            style={{
              fontSize: "1.35rem",
              margin: 0,
              marginBottom: "0.4rem",
            }}
          >
            المنظومة السيادية لاستخبارات الوطنية – NEOMIND
          </h1>
          <p
            style={{
              fontSize: "0.82rem",
              lineHeight: 1.8,
              opacity: 0.9,
              margin: 0,
            }}
          >
            هذه البوابة مخصصة للدخول إلى نسخة تجريبية من منصة NEOMIND
            لعرض حالة المنظومة أمام لجنة هاكاثون أبشر طويق 2025. الدخول هنا
            لأغراض المحاكاة فقط.
          </p>
        </div>

        {/* نموذج الدخول */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          <div style={{ textAlign: "right" }}>
            <label
              htmlFor="username"
              style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: 4 }}
            >
              اسم المستخدم السيادي
            </label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.65)",
                padding: "0.65rem 1rem",
                fontSize: "0.9rem",
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.8))",
                outline: "none",
              }}
            />
            <div style={{ fontSize: "0.72rem", opacity: 0.75, marginTop: 2 }}>
              (للديمو: ADMIN)
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <label
              htmlFor="password"
              style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: 4 }}
            >
              كلمة المرور السيادية
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.65)",
                padding: "0.65rem 1rem",
                fontSize: "0.9rem",
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.8))",
                outline: "none",
                letterSpacing: "0.2em",
              }}
            />
            <div style={{ fontSize: "0.72rem", opacity: 0.75, marginTop: 2 }}>
              (للديمو: 123)
            </div>
          </div>

          {error && (
            <div
              style={{
                marginTop: "0.3rem",
                borderRadius: "0.75rem",
                padding: "0.55rem 0.8rem",
                fontSize: "0.78rem",
                background:
                  "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(127,29,29,0.8))",
                border: "1px solid rgba(248,113,113,0.8)",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              borderRadius: "999px",
              border: "none",
              outline: "none",
              padding: "0.75rem 1rem",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: "pointer",
              background:
                "radial-gradient(circle at top, rgba(74,222,128,0.95), rgba(22,163,74,0.95))",
              boxShadow:
                "0 18px 45px rgba(22,163,74,0.65), 0 0 0 1px rgba(21,128,61,0.7)",
              color: "#0b1120",
            }}
          >
            {loading ? "جارٍ تحويلك إلى لوحة القيادة..." : "دخول إلى لوحة القيادة السيادية"}
          </button>
        </form>

        {/* فوتر بسيط */}
        <div
          style={{
            marginTop: "1.4rem",
            fontSize: "0.72rem",
            lineHeight: 1.7,
            opacity: 0.8,
            textAlign: "center",
          }}
        >
          هذه النسخة مخصصة للاختبار والعرض فقط، ولا تمثل أنظمة تشغيلية حقيقية.
          جميع الحقوق محفوظة لفريق NEOMIND – نسخة هاكاثون أبشر طويق 2025.
        </div>
      </main>
    </div>
  );
}
