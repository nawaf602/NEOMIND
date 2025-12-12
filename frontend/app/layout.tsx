import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Tajawal } from "next/font/google";

// هنا نستورد ملفات الستايل الحقيقية من مجلد styles
import "../styles/globals.css";
import "../styles/theme.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "NEOMIND – National Intelligence Grid",
  description:
    "NEOMIND – Sovereign Predictive Platform for national risk intelligence and decision support.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
