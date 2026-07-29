'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef } from 'react'

/**
 * Cloudflare Turnstile 위젯 (PRD FR-12).
 *
 * M2 승인 사항에 따라 추가 패키지 없이 Cloudflare 스크립트를 직접 쓴다.
 * 위젯이 통과하면 폼 안에 `cf-turnstile-response` 히든 입력이 생기고,
 * 서버 액션이 그 토큰을 `src/lib/spam/turnstile.ts` 로 검증한다.
 *
 * 명시적 렌더링(`render=explicit`)을 쓰는 이유 — 자동 렌더링은 스크립트가
 * 처음 로드될 때 한 번만 DOM 을 훑는다. 클라이언트 내비게이션으로 문의 페이지에
 * 다시 들어오면 위젯이 그려지지 않아 토큰 없이 제출되는 문제가 생긴다.
 */

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, string>) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

export function TurnstileWidget({ siteKey }: { siteKey: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const renderWidget = useCallback(() => {
    if (!containerRef.current || widgetIdRef.current !== null) {
      return
    }

    const api = window.turnstile
    if (!api) {
      return
    }

    widgetIdRef.current = api.render(containerRef.current, {
      sitekey: siteKey,
      // 사이트가 라이트 고정이므로 위젯도 맞춘다. 'auto' 로 두면 OS 가 다크일 때
      // 위젯만 검게 떠서 폼 안에서 튄다.
      theme: 'light',
      language: 'ko',
    })
  }, [siteKey])

  useEffect(() => {
    // 스크립트가 이미 로드된 상태(클라이언트 내비게이션)면 여기서 바로 그린다.
    renderWidget()

    return () => {
      if (widgetIdRef.current !== null) {
        window.turnstile?.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget])

  return (
    <div>
      {/* onReady 는 스크립트가 이미 로드돼 있어도 마운트마다 호출된다. */}
      <Script src={SCRIPT_SRC} strategy="afterInteractive" onReady={renderWidget} />
      <div ref={containerRef} className="min-h-[70px]" />
    </div>
  )
}
