import type { NextConfig } from "next";

/**
 * 공개 사이트가 개인정보(문의 내용)를 다루므로 배포 전 기본 보안 헤더를 붙인다
 * (PRD §9 보안). Vercel 은 이 헤더들을 자동으로 넣어 주지 않는다.
 *
 * CSP 는 넣지 않았다 — Turnstile 위젯이 challenges.cloudflare.com 스크립트와
 * 인라인 스타일을 쓰기 때문에, 실제 도메인이 정해진 뒤 위젯 동작을 확인하면서
 * 정책을 세워야 한다. 지금 넣으면 스팸 방지가 조용히 깨진다.
 */
const SECURITY_HEADERS = [
  // 선언된 Content-Type 을 브라우저가 임의로 추론하지 않게 한다.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // 외부 사이트로 나갈 때 경로·쿼리를 넘기지 않는다.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 다른 사이트가 이 페이지를 iframe 으로 감싸는 것을 막는다(클릭재킹).
  // Turnstile 은 우리 페이지 안에 iframe 을 만드는 쪽이라 영향받지 않는다.
  { key: "X-Frame-Options", value: "DENY" },
  // 쓰지 않는 브라우저 기능을 명시적으로 끈다.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // 서버 종류를 굳이 알리지 않는다.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
