import Link from "next/link";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/ui";
import { cars } from "@/data/cars";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_SUB, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "장기렌트·리스·할부 차종별 비교",
  description: SITE_SUB,
  path: "/",
  keywords: ["장기렌트 비교", "신차 장기렌트", "장기렌트 리스 할부 비교", "장기렌트 월 렌트료", "장기렌트 계산기"],
});

export default function Home() {
  const domestic = cars.filter((c) => c.origin === "국산");
  const imported = cars.filter((c) => c.origin === "수입");
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, inLanguage: "ko-KR" }} />
      <section className="rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 px-6 py-10 text-white sm:px-10">
        <p className="text-xs font-semibold tracking-wider text-blue-200">신차 장기렌트 · 리스 · 할부 비교 가이드</p>
        <h1 className="mt-3 text-2xl font-bold leading-snug sm:text-4xl">
          장기렌트, 리스, 할부
          <br />내 조건엔 뭐가 맞을까?
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-blue-100">{SITE_SUB}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/calculator" className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-800">월 비용 계산해 보기</Link>
          <Link href="/compare" className="rounded-xl border border-white/60 px-5 py-3 text-sm font-bold text-white">세 방식 차이 보기</Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">처음이라면 이 순서로 보세요</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/compare", t: "1. 세 방식의 차이", d: "장기렌트·리스·할부, 소유와 비용 구조가 어떻게 다른지" },
            { href: "/guide/deposit-vs-prepayment", t: "2. 선수금 vs 보증금", d: "돌려받는 돈과 못 돌려받는 돈, 월 납입금 차이" },
            { href: "/calculator", t: "3. 내 조건으로 계산", d: "기간·선수금·보증금을 바꿔 가며 예시 추정" },
            { href: "/credit", t: "4. 심사 전 신용점수", d: "조회해도 점수는 떨어지지 않습니다. 확인 방법을 정리했습니다" },
          ].map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="block h-full rounded-2xl border border-slate-200 p-4 hover:border-blue-600">
                <span className="font-semibold text-slate-900">{s.t}</span>
                <span className="mt-1 block text-sm text-slate-600">{s.d}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold">차종별 장기렌트 vs 리스 vs 할부</h2>
          <Link href="/cars" className="text-sm text-blue-700">전체 보기 →</Link>
        </div>
        <h3 className="mt-5 text-sm font-semibold text-slate-500">국산차</h3>
        <CarGrid list={domestic} />
        <h3 className="mt-6 text-sm font-semibold text-slate-500">수입차</h3>
        <CarGrid list={imported} />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">계약 전에 꼭 읽을 가이드</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guide/${g.slug}`} className="rounded-2xl border border-slate-200 p-4 hover:border-blue-600">
              <span className="font-semibold text-slate-900">{g.title}</span>
              <span className="mt-1 block text-sm text-slate-600">{g.short}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
        <h2 className="text-xl font-bold text-slate-900">장기렌트·리스·할부 심사 전에 신용점수를 확인해 보세요</h2>
        <p className="mt-2 text-[15px] leading-7 text-slate-700">렌트사·금융사는 계약 전에 신용 상태를 봅니다. 본인이 점수를 조회해도 신용점수에는 영향을 주지 않는다고 금융감독원이 안내합니다. 확인 방법과 일반적인 관리 요령을 정리해 두었습니다.</p>
        <Link href="/credit" className="mt-4 inline-block rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">신용점수 확인 안내 →</Link>
      </section>

      <Cta />
    </>
  );
}

function CarGrid({ list }: { list: typeof cars }) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {list.map((c) => (
        <Link key={c.slug} href={`/cars/${c.slug}`} className="rounded-xl border border-slate-200 px-3 py-3 hover:border-blue-600">
          <span className="block text-[11px] text-slate-500">{c.brand} · {c.segment}</span>
          <span className="font-semibold text-slate-900">{c.name}</span>
        </Link>
      ))}
    </div>
  );
}
