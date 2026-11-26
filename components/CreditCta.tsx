import { ALLCREDIT_URL, LINKPRICE_DISCLOSURE, NICECREDIT_URL } from "@/lib/config";

const NOTE = "버튼을 누르면 각 신용조회 회사 사이트로 이동합니다. 이 사이트는 상담 신청서를 받거나 개인정보를 저장하지 않습니다.";

type Props = { context?: string };

export function CreditCta({ context }: Props) {
  return (
    <section className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6" aria-label="신용점수 조회 안내">
      <p className="text-xs font-semibold tracking-wider text-blue-800">광고 · 제휴 링크</p>
      <h2 className="mt-1 text-base font-bold text-slate-900">
        {context ? `${context} 신용점수를 확인해 보세요` : "올크레딧·NICE지키미에서 신용점수 확인하기"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        두 회사의 점수는 평가 기준이 달라 값이 다를 수 있습니다. 심사 전에 둘 다 확인해 보는 것이 좋습니다. 본인이 점수를 조회해도 신용점수에는 영향을 주지 않는다고 금융감독원이 안내합니다.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={ALLCREDIT_URL}
          target="_blank"
          rel="sponsored noopener"
          className="inline-flex items-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
          data-cta="allcredit"
        >
          <span className="mr-2 rounded border border-white/60 px-1.5 py-0.5 text-[11px] font-semibold">광고</span>
          올크레딧에서 확인 →
        </a>
        <a
          href={NICECREDIT_URL}
          target="_blank"
          rel="sponsored noopener"
          className="inline-flex items-center rounded-xl border border-blue-700 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
          data-cta="nicecredit"
        >
          <span className="mr-2 rounded border border-blue-300 px-1.5 py-0.5 text-[11px] font-semibold">광고</span>
          NICE지키미에서 확인 →
        </a>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-slate-500">
        {LINKPRICE_DISCLOSURE} {NOTE}
      </p>
    </section>
  );
}
