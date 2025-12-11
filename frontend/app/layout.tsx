import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"], // حذفنا 600 لأنه غير متوفر
});

export const metadata: Metadata = {
  title: "NEOMIND Sovereign Platform",
  description:
    "منصة سيادية للاستبصارات الوطنية والتنبؤ بالمخاطر قبل حدوثها – نسخة تجريبية لعرض قدرات NEOMIND.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
