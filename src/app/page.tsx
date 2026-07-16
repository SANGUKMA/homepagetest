export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <span className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
          온라인 대학 · Phase 1
        </span>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          AI융합 학위과정,
          <br />
          지금 문의하세요
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          대학 소개와 입학·과정 문의 접수를 위한 홈페이지입니다. 현재는 개발 초기
          스캐폴딩 상태이며, 소개·과정·입학 안내와 문의 폼을 순차적으로 구축합니다.
        </p>
        <ul className="flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
          <li className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            대학·학위과정 소개
          </li>
          <li className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            입학 안내 및 자주 묻는 질문
          </li>
          <li className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            입학·과정 문의 접수
          </li>
        </ul>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          설계 문서는{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
            docs/prd.md
          </code>{" "}
          ·{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
            docs/phase1-design.md
          </code>{" "}
          참고
        </p>
      </div>
    </main>
  );
}
