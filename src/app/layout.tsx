import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";

import { SITE, getSiteUrl } from "@/lib/content/site";
import "./globals.css";

/**
 * 참고 디자인의 서체 대비(세리프 제목 + 산세리프 본문)를 한글로 옮긴 것이다.
 * Roboto Serif·DM Sans 는 한글 글리프가 없어 그대로 쓰면 제목이 전부 대체 폰트로
 * 떨어진다. 두 Noto 서체는 라틴도 함께 담고 있어 `4x`·`AI` 같은 영문·숫자가
 * 한글과 같은 서체로 이어진다.
 *
 * 한글 폰트는 용량이 커서 `preload: false` 로 둔다. 브라우저가 unicode-range 를
 * 보고 실제로 쓰는 구간만 내려받는다.
 */
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  weight: ["600", "700"],
  display: "swap",
  preload: false,
});

/**
 * 페이지별 메타는 각 page.tsx 가 `title` 만 지정하면 아래 template 이 붙는다
 * (PRD §9 SEO).
 */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
