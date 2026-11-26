import Link from "next/link";
import { CreditCta } from "@/components/CreditCta";
import { Breadcrumb, JsonLd, PageTitle, Table } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "장기렌트·리스·할부 심사 전 신용점수 확인",
  description:
    "장기렌트·리스·할부 심사에서 신용점수가 어떻게 쓰이는지, 본인 조회가 점수에 영향을 주는지, 점수를 관리하는 일반적인 방법을 금융감독원과 신용평가회사 공시를 기준으로 정리했습니다.",
  path: "/credit",
  keywords: ["장기렌트 신용점수", "리스 심사 신용점수", "할부 신용조회", "올크레딧", "NICE지키미", "신용점수 조회 영향"],
});

const SOURCES: { name: string; href?: string }[] = [
  { name: "금융감독원, 무료신용조회 안내", href: "https://www.fss.or.kr/fss/main/contents.do?menuNo=200890" },
  { name: "금융감독원, 신용정보조회 안내", href: "https://fss.or.kr/main/prc/lo/sub/lo007.jsp?menuNo=900291" },
  { name: "금융감독원 보도자료, 개인신용평가관리 관련 유의사항 (2023.11.3.)" },
  { name: "NICE지키미, 개인신용평점체계 공시", href: "https://www.credit.co.kr/ib20/mnu/BZWCACCCS11" },
  { name: "NICE평가정보, 개인신용평점 평가요소 공시", href: "https://www.niceinfo.co.kr/creditrating/cb_score_1_4_1.nice" },
];

export default function CreditPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "장기렌트·리스·할부 심사 전 신용점수 확인",
          description:
            "장기렌트·리스·할부 심사에서 신용점수가 어떻게 쓰이는지와 본인 조회, 일반적인 관리 방법을 정리한 안내문입니다.",
          inLanguage: "ko-KR",
          author: { "@type": "Organization", name: "운영자" },
        }}
      />
      <Breadcrumb items={[{ href: "/", label: "홈" }, { label: "신용점수 확인" }]} />
      <PageTitle
        kicker="심사 전 확인"
        title="장기렌트·리스·할부 심사 전, 신용점수 확인"
        sub="렌트사·금융사는 계약 전에 신용 상태를 봅니다. 점수가 몇 점이어야 통과되는지는 회사마다 다르고, 이 사이트는 승인이나 점수 상승을 약속하지 않습니다. 아래는 공개된 공식 안내를 바탕으로 한 일반 정보입니다."
      />

      <section className="space-y-3 text-[15px] leading-7 text-slate-700">
        <h2 className="text-lg font-bold text-slate-900">심사에서 신용점수는 어떻게 쓰이나요?</h2>
        <p>
          개인신용평점은 나이스평가정보(NICE지키미)와 코리아크레딧뷰로(올크레딧, KCB) 같은 개인신용평가회사(CB사)가 수집한 신용정보를 통계적으로 분석해, 앞으로 1년 안에 90일 이상 장기연체 같은 신용위험이 생길 가능성을 1점부터 1000점 사이 숫자로 나타낸 지표입니다. 금융감독원은 이 평점을 높을수록 성실 상환 가능성이 높은 것으로 해석한다고 안내합니다.
        </p>
        <p>
          장기렌트·리스·할부는 모두 일정 기간 돈을 나눠 내는 계약이라, 렌트사·리스사·금융회사가 계약 전에 상환 여력을 봅니다. 이때 CB사 신용평점을 참고하는 경우가 많고, 금융감독원에 따르면 금융회사는 CB사 평점 외에 자체 신용평가 모형과 소득·재직·기존 대출 같은 정보도 함께 봅니다. 그래서 같은 점수라도 회사·상품·차량 가격에 따라 한도, 보증금 비율, 금리, 승인 여부가 달라질 수 있습니다.
        </p>
        <p>
          두 CB사의 점수는 활용하는 정보 범위와 반영 비중이 달라 값이 다를 수 있습니다. 심사 전에 한곳만 보지 말고 둘 다 확인해 두는 편이 안전합니다. 자세한 심사 서류는{" "}
          <Link href="/guide/credit-screening" className="text-blue-700 underline">
            장기렌트 심사 조건과 준비 서류
          </Link>
          를 참고하세요.
        </p>
      </section>

      <section className="mt-10 space-y-3 text-[15px] leading-7 text-slate-700">
        <h2 className="text-lg font-bold text-slate-900">본인이 신용점수를 조회하면 점수가 떨어지나요?</h2>
        <p>
          금융감독원은 본인이 신용점수를 확인(조회)하더라도 신용점수에는 영향을 미치지 않는다고 안내합니다. 과거에는 조회 사실이 평가에 반영된 적이 있으나, 2011년 10월 이후에는 신용점수 조회 사실을 신용평가에 반영하지 않도록 바뀌었습니다. NICE 평점체계 공시에도 조회정보는 신용평가에 활용되지 않는다고 나와 있습니다.
        </p>
        <p>
          금융감독원 안내에 따르면, NICE와 KCB에서 신용평점을 1년에 3회, 4개월마다 무료로 조회할 수 있습니다. 회원·유료 서비스의 조회 횟수와 조건은 각 회사 사이트에서 확인하세요. 자신의 점수에 이의가 있으면 해당 신용조회회사 고객센터에서 산출 근거를 확인할 수 있고, 그래도 이의가 있으면 금융감독원 민원센터를 통해 이의를 제기할 수 있습니다.
        </p>
      </section>

      <CreditCta context="심사 전에" />

      <section className="mt-10 space-y-3 text-[15px] leading-7 text-slate-700">
        <h2 className="text-lg font-bold text-slate-900">점수를 관리하는 일반적인 방법</h2>
        <p>
          아래는 NICE 평점체계 공시와 금융감독원 안내에 나온 일반적인 요인입니다. 사람마다 거래 상태가 달라 같은 행동을 해도 점수 변동 폭이 다르고, 특정 점수를 보장하지 않습니다.
        </p>
        <Table
          head={["구분", "일반적으로 알려진 내용", "출처"]}
          rows={[
            ["연체", "단기연체는 보통 10만 원 이상·5영업일 이상을 기준으로 평가에 반영됩니다. 일시적 소액 연체는 활용되지 않는다고 공시되어 있습니다. 연체 기간이 길고 금액이 클수록, 횟수가 많을수록 불리합니다.", "NICE 평점체계 공시"],
            ["연체 상환", "연체를 갚으면(해제) 긍정적으로 반영되지만, 바로 이전 점수로 돌아가지 않을 수 있습니다. 장기연체는 상환 후에도 최장 5년까지 영향을 줄 수 있다고 공시되어 있습니다.", "NICE 평점체계 공시"],
            ["대출·부채", "최근에 대출을 많이 받으면 점수가 낮아질 수 있습니다. 담보대출도 영향을 줄 수 있으나 신용대출보다는 작은 편으로 안내됩니다. 대출을 갚으면 긍정적으로 반영됩니다. 저축은행·대부업 등 고금리 대출 이용은 부정적으로 평가될 수 있습니다.", "금융감독원 유의사항, NICE 공시"],
            ["카드 사용", "신용카드·체크카드를 연체 없이 꾸준히 쓰는 실적은 긍정적으로, 습관적인 할부나 현금서비스(단기카드대출)의 잦은 사용은 부정적으로 반영될 수 있습니다. 신용거래 정보가 거의 없어도 점수가 낮게 나올 수 있습니다.", "금융감독원 유의사항, NICE 공시"],
            ["거래 기간", "신용거래를 시작한 지 오래될수록 긍정적인 요인으로 분류된다고 공시되어 있습니다.", "NICE 평점체계 공시"],
            ["성실 납부 정보", "국민연금, 건강보험, 통신요금, 아파트 관리비 같은 비금융 성실 납부 내역을 제출하면 가점으로 반영될 수 있습니다. 다만 현재 연체 중인 경우 등은 제외될 수 있고, 반영 기간은 제한적입니다.", "금융감독원 유의사항, NICE"],
          ]}
        />
        <p>
          금융감독원은 단순한 신용정보 조회는 신용평가에 쓰이지 않는다고 재확인하면서도, 점수 하락의 실제 원인은 신규 대출, 단기카드대출, 성실 납부 가점 기간 종료, 거래 정보 부족처럼 다른 데 있는 경우가 많다고 안내합니다. 대출 비교만으로 점수가 바뀌지는 않지만, 실제로 고금리 대출로 갈아타면 하락할 수 있습니다.
        </p>
      </section>

      <section className="mt-10 space-y-3 text-[15px] leading-7 text-slate-700">
        <h2 className="text-lg font-bold text-slate-900">이 페이지에서 하지 않는 일</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>특정 점수로 장기렌트·리스·할부가 승인된다고 단정하지 않습니다.</li>
          <li>점수가 얼마만큼 오를지 약속하지 않습니다.</li>
          <li>개인 신용정보나 상담 신청서를 받지 않습니다. 조회는 각 신용조회회사 사이트에서 이루어집니다.</li>
        </ul>
        <p>
          계약 조건을 비교하려면{" "}
          <Link href="/compare" className="text-blue-700 underline">
            장기렌트·리스·할부 차이
          </Link>
          와{" "}
          <Link href="/calculator" className="text-blue-700 underline">
            월 비용 계산기
          </Link>
          를 함께 보세요.
        </p>
      </section>

      <CreditCta />

      <section className="mt-10 space-y-2 text-[13px] leading-6 text-slate-600">
        <h2 className="text-base font-bold text-slate-900">출처</h2>
        <ul className="list-disc space-y-1 pl-5">
          {SOURCES.map((s) => (
            <li key={s.name}>
              {s.href ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  {s.name}
                </a>
              ) : (
                <span>{s.name}</span>
              )}
            </li>
          ))}
        </ul>
        <p>
          {SITE_NAME}는 렌트사·금융사·신용조회회사가 아니며, 위 안내는 공개된 자료를 바탕으로 한 일반 정보입니다. 최신 기준은 각 기관 안내를 확인하세요.
        </p>
      </section>
    </>
  );
}
