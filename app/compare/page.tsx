import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Breadcrumb, PageTitle, Table } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "장기렌트 vs 리스 vs 할부 — 세 가지 방법 비교",
  description: "신차를 장기렌트, 리스, 할부로 탈 때 명의, 번호판, 보험, 세금, 초기 비용, 계약 종료 방식이 어떻게 다른지 표로 비교하고, 상황별로 어떤 방식이 맞는지 정리했습니다.",
  path: "/compare",
  keywords: ["장기렌트 리스 할부 비교", "장기렌트 vs 할부", "리스 vs 할부", "신차 구매 방법 비교", "장기렌트 장단점"],
});

export default function ComparePage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "홈" }, { label: "렌트·리스·할부 비교" }]} />
      <PageTitle kicker="비교" title="장기렌트 vs 리스 vs 할부, 무엇이 다를까?" sub="세 방식 모두 매달 돈을 내고 차를 타지만, 누구 명의인지와 어떤 비용이 포함되는지가 다릅니다." />
      <Table
        head={["항목", "장기렌트", "리스", "할부"]}
        rows={[
          ["차 명의", "렌트사", "리스사", "본인"],
          ["번호판", "영업용(하·허·호)", "일반", "일반"],
          ["보험", "대여료에 포함(일반적)", "본인 별도(일반적)", "본인"],
          ["취득세", "렌트사 부담(대여료 반영)", "리스료 반영(일반적)", "본인(차량가의 7%)"],
          ["자동차세", "대여료에 포함", "상품마다 다름", "본인"],
          ["초기 목돈", "선수금·보증금 선택, 0원 가능", "선수금·보증금 선택", "선납금 + 취득세·등록비"],
          ["주행거리 약정", "있음(초과 시 추가 요금)", "있음", "없음"],
          ["중도 정리", "위약금(승계 가능 여부 확인)", "위약금", "언제든 매각 가능"],
          ["계약 종료", "반납 또는 인수", "반납 또는 인수", "내 차"],
        ]}
      />
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { t: "장기렌트가 맞는 경우", d: ["개인 보험료가 비싼 운전자", "보험·세금·정비를 하나로 관리하고 싶을 때", "초기 목돈 없이 시작하고 싶을 때"] },
          { t: "리스가 맞는 경우", d: ["보험 경력이 길어 보험료가 저렴할 때", "일반 번호판을 원할 때", "수입차 금융 프로모션을 활용할 때"] },
          { t: "할부가 맞는 경우", d: ["한 차를 오래 탈 계획일 때", "주행거리가 매우 많을 때", "튜닝 등 자유롭게 쓰고 싶을 때"] },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-slate-200 p-4">
            <h2 className="font-bold text-slate-900">{c.t}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
              {c.d.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <p className="mt-8 text-[15px] leading-7 text-slate-700">
        어느 쪽이 더 싼지는 조건마다 다릅니다. <Link href="/calculator" className="text-blue-700 underline">월 비용 계산기</Link>로 같은 조건을 넣어 비교하고, <Link href="/guide/quote-checklist" className="text-blue-700 underline">견적서 체크리스트</Link>로 조건을 맞춰 견적을 받아 보세요.
      </p>
      <Cta />
    </>
  );
}
