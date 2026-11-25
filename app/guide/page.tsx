import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Breadcrumb, PageTitle } from "@/components/ui";
import { guides } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "장기렌트·리스 계약 가이드 모음",
  description: "장기렌트와 리스 차이, 선수금과 보증금 차이, 개인사업자 비용처리, 보험·세금 포함 여부, 계약 기간·주행거리 약정, 중도해지 위약금, 심사 조건, 반납과 인수까지 계약 전에 알아둘 내용을 정리했습니다.",
  path: "/guide",
  keywords: ["장기렌트 가이드", "장기렌트 주의사항", "장기렌트 계약 전 확인", "리스 계약 주의"],
});

export default function GuideIndex() {
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "홈" }, { label: "가이드" }]} />
      <PageTitle kicker="가이드" title="장기렌트·리스 계약 전에 알아둘 것" sub="견적을 받기 전에 개념부터 잡아 두면 같은 조건으로 비교하기 쉬워집니다." />
      <div className="grid gap-3 sm:grid-cols-2">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guide/${g.slug}`} className="rounded-2xl border border-slate-200 p-5 hover:border-blue-600">
            <span className="font-semibold text-slate-900">{g.title}</span>
            <span className="mt-1 block text-sm text-slate-600">{g.short}</span>
          </Link>
        ))}
      </div>
      <Cta />
    </>
  );
}
