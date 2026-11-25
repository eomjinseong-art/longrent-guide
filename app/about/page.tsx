import { Breadcrumb, PageTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { AD_DISCLOSURE, ESTIMATE_NOTE, SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "사이트 안내와 광고 고지",
  description: `${SITE_NAME}의 운영 방식, 제휴마케팅 광고 고지, 정보의 한계와 상담 대상 범위를 안내합니다.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "홈" }, { label: "사이트 안내" }]} />
      <PageTitle kicker="안내" title="사이트 안내와 광고 고지" />
      <div className="space-y-4 text-[15px] leading-7 text-slate-700">
        <p>{SITE_NAME}는 운영자가 신차 장기렌트·리스·할부를 비교하는 데 필요한 정보를 정리한 사이트입니다. 렌트사·리스사·금융사·자동차 제조사가 아니며, 계약을 직접 중개하거나 상담 신청서를 받지 않습니다.</p>
        <h2 className="pt-2 text-lg font-bold text-slate-900">광고 고지</h2>
        <p>{AD_DISCLOSURE} 「광고」 표시가 붙은 상담 버튼은 제휴 상담 신청 페이지로 연결됩니다.</p>
        <h2 className="pt-2 text-lg font-bold text-slate-900">정보의 한계</h2>
        <p>{ESTIMATE_NOTE} 차량 가격은 제조사 공식 가격표를, 세금·비용처리는 세무 전문가나 국세청 안내를 확인하세요. 계약 조건과 심사 결과는 렌트사·금융사가 정하며 이 사이트는 승인이나 가격을 약속하지 않습니다.</p>
        <h2 className="pt-2 text-lg font-bold text-slate-900">상담 대상</h2>
        <p>연결되는 상담은 신차 장기렌트(2년 이상)·리스 견적 상담입니다. 중고차, 단기렌트(2년 미만), 일시불 구매, 슈퍼카·스포츠카, 단종·구형 차량은 상담 대상이 아닙니다.</p>
      </div>
    </>
  );
}
