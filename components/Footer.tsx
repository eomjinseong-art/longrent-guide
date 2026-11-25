import Link from "next/link";
import { ESTIMATE_NOTE, SISTER_SITES, SITE_NAME, sisterUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 pt-8">
        <h2 className="text-xs font-semibold tracking-wider text-slate-500">함께 보면 좋은 사이트</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {SISTER_SITES.map((site) => (
            <a key={site.url} href={sisterUrl(site.url)} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600 hover:border-blue-600 hover:text-blue-700">
              {site.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-5xl space-y-3 px-4 py-8 text-xs leading-6 text-slate-500">
        <p className="font-semibold text-slate-700">{SITE_NAME}</p>
        <p>{ESTIMATE_NOTE}</p>
        <p>차량 가격은 각 제조사 공식 홈페이지 가격표를 기준으로 확인하세요. 세금·비용처리 내용은 일반적인 안내이며, 실제 적용은 세무 전문가와 확인하시기 바랍니다.</p>
        <p>이 사이트는 운영자가 만든 정보 사이트로, 렌트사·리스사·금융사·제조사가 아닙니다. 상담 버튼은 제휴 상담 페이지로 연결되며 상담 신청 시 운영자가 수수료를 받을 수 있습니다.</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/about" className="hover:text-blue-700">사이트 안내·광고 고지</Link>
          <Link href="/cars" className="hover:text-blue-700">차종별 비교</Link>
          <Link href="/guide" className="hover:text-blue-700">가이드</Link>
          <Link href="/calculator" className="hover:text-blue-700">월 비용 계산기</Link>
        </nav>
      </div>
    </footer>
  );
}
