import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { Breadcrumb, Faq, faqLd, JsonLd, PageTitle, Sections } from "@/components/ui";
import { cars } from "@/data/cars";
import { guideBySlug, guides } from "@/data/guides";
import { canonicalUrl, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return pageMetadata({ title: g.title, description: g.description, path: `/guide/${g.slug}`, keywords: g.keywords });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const others = guides.filter((x) => x.slug !== g.slug);
  return (
    <>
      {g.faq ? <JsonLd data={faqLd(g.faq)} /> : null}
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, inLanguage: "ko-KR", mainEntityOfPage: canonicalUrl(`/guide/${g.slug}`), author: { "@type": "Organization", name: "운영자" } }} />
      <Breadcrumb items={[{ href: "/", label: "홈" }, { href: "/guide", label: "가이드" }, { label: g.title }]} />
      <PageTitle kicker="가이드" title={g.title} sub={g.description} />
      <Sections sections={g.sections} />
      {g.faq ? <Faq items={g.faq} /> : null}

      {g.slug === "credit-screening" ? (
        <section className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="text-base font-bold text-slate-900">심사 전 신용점수 확인 안내</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">본인 조회가 점수에 영향을 주는지, 점수를 관리하는 일반적인 방법, 올크레딧과 NICE지키미에서 확인하는 길을 따로 정리해 두었습니다.</p>
          <Link href="/credit" className="mt-3 inline-block rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">신용점수 확인 안내 →</Link>
        </section>
      ) : null}

      <section className="mt-10 rounded-2xl bg-slate-50 p-5">
        <h2 className="text-base font-bold">직접 계산해 보기</h2>
        <p className="mt-1 text-sm text-slate-600">기간·선수금·보증금을 바꿔 가며 장기렌트·리스·할부의 월 비용을 예시로 비교해 보세요.</p>
        <Link href="/calculator" className="mt-3 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">월 비용 계산기 →</Link>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold">다른 가이드</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/guide/${o.slug}`} className="block rounded-xl border border-slate-200 p-3 text-sm hover:border-blue-600">{o.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold">차종별 비교</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {cars.map((c) => (
            <Link key={c.slug} href={`/cars/${c.slug}`} className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:border-blue-600 hover:text-blue-700">{c.name}</Link>
          ))}
        </div>
      </section>

      {g.cta === false ? null : <Cta />}
    </>
  );
}
