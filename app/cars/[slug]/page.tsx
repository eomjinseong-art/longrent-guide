import Link from "next/link";
import { notFound } from "next/navigation";
import { Calculator } from "@/components/Calculator";
import { Cta } from "@/components/Cta";
import { Breadcrumb, Faq, faqLd, JsonLd, PageTitle, Table } from "@/components/ui";
import { carBySlug, cars, type Car } from "@/data/cars";
import { guides } from "@/data/guides";
import { canonicalUrl, pageMetadata } from "@/lib/seo";
import { ESTIMATE_NOTE } from "@/lib/site";

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = carBySlug(slug);
  if (!car) return {};
  return pageMetadata({
    title: `${car.name} 장기렌트 vs 리스 vs 할부 비교 — 월 비용·조건 체크`,
    description: `${car.brand} ${car.name}를 장기렌트, 리스, 할부로 탈 때 무엇이 다른지 정리했습니다. 선수금·보증금, 보험·세금 포함 여부, 주행거리 약정, 비용처리까지 ${car.name} 기준으로 확인하고 월 비용 계산기로 예시를 따져 보세요.`,
    path: `/cars/${car.slug}`,
    keywords: [`${car.name} 장기렌트`, `${car.name} 리스`, `${car.name} 할부`, `${car.name} 장기렌트 vs 할부`, `${car.name} 월 렌트료`, `${car.name} 장기렌트 견적`, `${car.name} 개인사업자`],
  });
}

function taxNote(car: Car) {
  if (car.ev) return "전기차 자동차세는 배기량과 관계없이 연 10만 원(지방교육세 별도)으로 정해져 있어, 할부로 사도 세금 부담이 작은 편입니다. 대신 구매보조금 반영 방식이 견적마다 다를 수 있으니 확인하세요.";
  return "할부로 사면 비영업용 자동차세(배기량 기준, 연 2회)와 취득세(차량가의 7%)를 직접 냅니다. 장기렌트는 영업용 세율이 적용된 자동차세와 취득세가 월 대여료에 포함되는 것이 일반적입니다.";
}

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = carBySlug(slug);
  if (!car) notFound();
  const related = cars.filter((c) => c.slug !== car.slug && (c.segment === car.segment || c.brand === car.brand)).slice(0, 4);
  const faq = [
    { q: `${car.name} 장기렌트 월 렌트료는 얼마인가요?`, a: `정해진 금액은 없습니다. ${car.name}의 트림·옵션, 계약 기간, 선수금·보증금, 주행거리 약정, 운전자 조건, 렌트사 프로모션에 따라 크게 달라집니다. 아래 계산기로 예시를 따져 본 뒤 같은 조건으로 여러 곳의 견적을 비교하세요.` },
    { q: `${car.name}는 장기렌트와 할부 중 뭐가 나은가요?`, a: `개인 보험료가 비싸고 세금·정비를 따로 챙기기 번거롭다면 장기렌트가, 오래 탈 계획이고 보험 경력이 길다면 할부가 유리할 수 있습니다. 월 납입금만이 아니라 보험료·세금·초기 비용까지 합친 총비용으로 비교하세요.` },
    { q: `${car.name} 리스와 장기렌트는 뭐가 달라요?`, a: `장기렌트는 렌트사 명의로 영업용 번호판이 붙고 보험·세금이 포함되는 경우가 많습니다. 리스는 일반 번호판이고 보험은 보통 본인이 따로 듭니다. 자세한 차이는 '장기렌트와 리스 차이' 가이드를 참고하세요.` },
  ];
  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: `${car.name} 장기렌트 vs 리스 vs 할부 비교`, inLanguage: "ko-KR", mainEntityOfPage: canonicalUrl(`/cars/${car.slug}`), author: { "@type": "Organization", name: "운영자" } }} />
      <Breadcrumb items={[{ href: "/", label: "홈" }, { href: "/cars", label: "차종별 비교" }, { label: car.name }]} />
      <PageTitle kicker={`${car.brand} · ${car.segment}`} title={`${car.name} 장기렌트 vs 리스 vs 할부, 어떻게 탈까?`} sub={car.angle} />

      <Table
        head={["항목", "내용"]}
        rows={[
          ["브랜드 / 구분", `${car.brand} / ${car.origin}차`],
          ["차급", car.segment],
          ["파워트레인", car.fuels.join(", ")],
          ["가격 확인", "제조사 공식 홈페이지 가격표(트림·옵션별)"],
        ]}
      />
      <p className="mt-2 text-xs text-slate-500">
        공식 가격:{" "}
        <a href={car.officialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{car.brand} 공식 홈페이지</a>
        에서 최신 가격표를 확인하세요. 가격과 트림 구성은 연식 변경·프로모션에 따라 바뀝니다.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-bold">{car.name}를 볼 때 알아둘 점</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-slate-700">
          {car.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold">{car.name} 장기렌트 · 리스 · 할부 비교</h2>
        <Table
          head={["", "장기렌트", "리스", "할부"]}
          rows={[
            ["명의·번호판", "렌트사 / 영업용(하·허·호)", "리스사 / 일반", "본인 / 일반"],
            ["보험", "대여료에 포함(일반적)", "본인 별도 가입(일반적)", "본인 가입"],
            ["취득세·자동차세", "대여료에 포함", "상품마다 다름", "본인 부담"],
            ["초기 목돈", "선수금·보증금 선택(0원 가능)", "선수금·보증금 선택", "선납금 + 취득세 등"],
            ["계약 종료", "반납 또는 인수", "반납 또는 인수", "내 차"],
            ["이런 분께", "보험료가 비싼 운전자, 관리 편의 중시", "보험 경력이 긴 운전자, 일반 번호판 선호", "오래 탈 계획, 총비용 최소화"],
          ]}
        />
        <p className="mt-3 text-[15px] leading-7 text-slate-700">{taxNote(car)}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold">{car.name} 월 비용 예시 계산</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          차량가 칸의 3,000만 원은 계산 예시를 위한 입력값이며 {car.name}의 실제 가격이 아닙니다. 공식 가격표에서 원하는 트림 가격을 확인해 바꿔 넣으세요. {ESTIMATE_NOTE}
        </p>
        <div className="mt-4">
          <Calculator />
        </div>
      </section>

      <Faq items={faq} />

      <section className="mt-10">
        <h2 className="text-lg font-bold">함께 읽으면 좋은 가이드</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guide/${g.slug}`} className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:border-blue-600 hover:text-blue-700">{g.title}</Link>
          ))}
        </div>
      </section>

      {related.length ? (
        <section className="mt-8">
          <h2 className="text-lg font-bold">비슷한 차종 비교</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {related.map((c) => (
              <Link key={c.slug} href={`/cars/${c.slug}`} className="rounded-xl border border-slate-200 p-3 text-sm hover:border-blue-600">
                {c.name} 장기렌트 vs 리스 vs 할부
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <Cta context={car.name} />
    </>
  );
}
