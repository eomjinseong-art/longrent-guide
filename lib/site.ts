export const SITE_NAME = "장기렌트 비교노트";
export const SITE_TAGLINE = "장기렌트·리스·할부, 내 조건에 맞는 방법 고르기";
export const SITE_SUB =
  "인기 신차를 장기렌트, 리스, 할부로 탈 때 무엇이 다른지 차종별로 정리했습니다. 선수금과 보증금, 보험·세금 포함 여부, 주행거리 약정, 중도해지 위약금, 개인사업자 비용처리까지 한곳에서 확인하세요.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://longrent-guide.vercel.app";

/** Abacus visitor counter. One hit per browser per local day; test traffic is excluded. */
export const ABACUS_NAMESPACE = "longrent-guide";
export const ABACUS_KEY = "visits";
export const ABACUS_STORAGE_KEY = "longrent-guide:visits:day";
export const PROD_HOSTS = ["longrent-guide.vercel.app"];

export const AD_DISCLOSURE =
  "이 페이지에는 제휴마케팅 링크가 포함되어 있으며, 상담 신청 시 운영자가 수수료를 받을 수 있습니다.";

export const ESTIMATE_NOTE =
  "이 사이트의 월 비용은 모두 이해를 돕기 위한 예시 추정치입니다. 실제 금액은 차량 트림·옵션, 계약 기간, 선수금·보증금, 주행거리 약정, 신용도, 금융사·렌트사 조건에 따라 크게 달라집니다.";

export const NAV = [
  { href: "/", label: "홈" },
  { href: "/cars", label: "차종별 비교" },
  { href: "/guide", label: "가이드" },
  { href: "/calculator", label: "월 비용 계산기" },
  { href: "/compare", label: "렌트·리스·할부" },
] as const;

function utm(base: string, medium = "footer") {
  const url = new URL("/", base);
  url.searchParams.set("utm_source", "longrent-guide");
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", "car-network");
  return url.toString();
}

export const SISTER_SITES = [
  { label: "브리티시 모터스", url: "https://british-motors.vercel.app" },
  { label: "이탈리안 모터스", url: "https://italian-motors.vercel.app" },
  { label: "미국차 컬렉션 아카이브", url: "https://usa-motors.vercel.app" },
  { label: "오토픽스 자동차용품", url: "https://car-parts-cpang.vercel.app" },
  { label: "나두 허브", url: "https://tinalinkeom.vercel.app" },
] as const;

export function sisterUrl(url: string, medium = "footer") {
  return utm(url, medium);
}
