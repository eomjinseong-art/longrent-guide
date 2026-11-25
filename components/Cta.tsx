import { CTA_LABEL, CTA_NEWCAR_LABEL, CTA_URL, CTA_URL_NEWCAR } from "@/lib/config";

/** 신차 장기렌트·리스 견적 상담 버튼. 링크는 lib/config.ts의 CTA_URL 한 곳에서 관리합니다. */
export function Cta({ context }: { context?: string }) {
  const primary = CTA_URL.trim();
  const secondary = CTA_URL_NEWCAR.trim();
  return (
    <section className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6" aria-label="견적 상담">
      <div className="flex items-center gap-2">
        <span className="rounded border border-slate-400 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">광고</span>
        <h2 className="text-base font-bold text-slate-900">{context ? `${context} 신차 장기렌트·리스 견적이 궁금하다면` : "내 조건으로 신차 장기렌트·리스 견적 받아 보기"}</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        같은 차라도 기간·주행거리·선수금·보증금 조건에 따라 월 비용이 달라집니다. 원하는 조건을 정리해 상담을 받아 보세요. 상담 대상은 신차 장기렌트(2년 이상)·리스이며, 심사 결과에 따라 계약 조건이 달라지거나 계약이 어려울 수 있습니다.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {primary ? (
          <a href={primary} target="_blank" rel="sponsored noopener" className="inline-flex items-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800" data-cta="primary">
            {CTA_LABEL} →
          </a>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center rounded-xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500" aria-disabled="true" data-cta="pending">
            상담 연결 준비 중
          </span>
        )}
        {primary && secondary ? (
          <a href={secondary} target="_blank" rel="sponsored noopener" className="inline-flex items-center rounded-xl border border-blue-700 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" data-cta="secondary">
            {CTA_NEWCAR_LABEL} →
          </a>
        ) : null}
      </div>
      <p className="mt-3 text-[11px] leading-5 text-slate-500">「광고」 버튼을 누르면 제휴 상담 신청 페이지로 이동합니다. 상담 신청 시 운영자가 수수료를 받을 수 있습니다. 이 사이트는 상담 신청서를 받거나 개인정보를 저장하지 않습니다.</p>
    </section>
  );
}
