import { Noto_Sans_KR } from "next/font/google";
import type { Metadata } from "next";
import { Disclosure } from "@/components/Disclosure";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GOOGLE_SITE_VERIFICATION, NAVER_SITE_VERIFICATION } from "@/lib/config";
import { SITE_NAME, SITE_SUB, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-noto-sans", weight: ["400", "500", "700"] });

const description = `${SITE_TAGLINE}. ${SITE_SUB}`;

const verification: Metadata["verification"] = {};
if (GOOGLE_SITE_VERIFICATION) verification.google = GOOGLE_SITE_VERIFICATION;
if (NAVER_SITE_VERIFICATION) verification.other = { "naver-site-verification": NAVER_SITE_VERIFICATION };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description,
  keywords: ["장기렌트", "장기렌트 비교", "리스", "장기렌트 리스 차이", "신차 장기렌트", "장기렌트 할부 비교", "선수금 보증금 차이", "개인사업자 장기렌트", "장기렌트 계산기"],
  openGraph: { type: "website", locale: "ko_KR", url: SITE_URL, siteName: SITE_NAME, title: SITE_NAME, description },
  twitter: { card: "summary", title: SITE_NAME, description },
  verification,
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${sans.variable} min-h-screen bg-white font-sans text-slate-900 antialiased`}>
        <Disclosure />
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
