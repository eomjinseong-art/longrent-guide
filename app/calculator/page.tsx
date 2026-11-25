import { Calculator } from "@/components/Calculator";
import { Cta } from "@/components/Cta";
import { Breadcrumb, PageTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { ESTIMATE_NOTE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "장기렌트·리스·할부 월 비용 계산기 (예시 추정)",
  description: "차량가, 계약 기간, 선수금, 보증금, 잔존가치, 금리를 넣으면 장기렌트·리스·할부의 월 비용과 기간 총부담을 예시로 추정해 비교합니다. 선수금과 보증금이 월 납입금에 주는 차이도 확인할 수 있습니다.",
  path: "/calculator",
  keywords: ["장기렌트 계산기", "리스 계산기", "장기렌트 월 렌트료 계산", "자동차 할부 계산기", "선수금 보증금 계산"],
});

export default function CalculatorPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "홈" }, { label: "월 비용 계산기" }]} />
      <PageTitle kicker="계산기" title="장기렌트·리스·할부 월 비용 계산기" sub={`${ESTIMATE_NOTE} 아래 값은 모두 바꿀 수 있는 가정값입니다.`} />
      <Calculator />
      <section className="mt-10 space-y-3 text-[15px] leading-7 text-slate-700">
        <h2 className="text-lg font-bold text-slate-900">이렇게 써 보세요</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>같은 금액을 선수금 칸과 보증금 칸에 번갈아 넣어 보세요. 선수금은 월 비용을 더 많이 낮추지만 돌려받지 못하고, 보증금은 덜 낮추는 대신 계약이 끝나면 돌려받습니다.</li>
          <li>계약 기간을 36·48·60개월로 바꿔 월 비용과 총부담이 어떻게 달라지는지 확인하세요.</li>
          <li>개인 보험료가 비싼 운전자라면 보험료 칸을 실제 견적으로 바꿔 장기렌트와 리스·할부를 비교하세요.</li>
        </ul>
      </section>
      <Cta />
    </>
  );
}
