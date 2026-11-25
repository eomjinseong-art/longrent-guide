import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Breadcrumb, PageTitle } from "@/components/ui";
import { cars } from "@/data/cars";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "차종별 장기렌트·리스·할부 비교 목록",
  description: "아반떼, 쏘나타, 그랜저, K5, 쏘렌토, 스포티지, 카니발, 팰리세이드, GV70, BMW 5시리즈, 벤츠 E클래스, 테슬라 모델 Y 등 인기 신차의 장기렌트·리스·할부 비교 포인트를 모았습니다.",
  path: "/cars",
  keywords: ["차종별 장기렌트", "인기 장기렌트 차종", "수입차 리스", "국산차 장기렌트", "SUV 장기렌트"],
});

export default function CarsPage() {
  const groups = Array.from(new Set(cars.map((c) => c.segment)));
  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "홈" }, { label: "차종별 비교" }]} />
      <PageTitle kicker="차종별 비교" title="인기 신차 장기렌트·리스·할부 비교" sub="차급과 파워트레인에 따라 따져볼 포인트가 다릅니다. 차종을 골라 장기렌트·리스·할부 중 어떤 방식이 맞는지 확인해 보세요. 가격은 제조사 공식 가격표를 기준으로 확인하세요." />
      <div className="space-y-6">
        {groups.map((seg) => (
          <section key={seg}>
            <h2 className="text-sm font-semibold text-slate-500">{seg}</h2>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {cars.filter((c) => c.segment === seg).map((c) => (
                <Link key={c.slug} href={`/cars/${c.slug}`} className="rounded-xl border border-slate-200 p-4 hover:border-blue-600">
                  <span className="block text-[11px] text-slate-500">{c.brand} · {c.origin} · {c.fuels.join("·")}</span>
                  <span className="font-semibold text-slate-900">{c.name} 장기렌트 vs 리스 vs 할부</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Cta />
    </>
  );
}
