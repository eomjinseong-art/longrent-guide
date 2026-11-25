/**
 * 월 비용 예시 추정 — 단순화한 교육용 공식입니다. 실제 견적과 다릅니다.
 */
export type CalcInput = {
  price: number; // 차량가(원)
  months: number; // 계약 기간
  prepayPct: number; // 선수금 %
  depositPct: number; // 보증금 %
  residualPct: number; // 잔존가치 %
  rentRate: number; // 렌트·리스 연 금리 가정 %
  loanRate: number; // 할부 연 금리 가정 %
  loanDownPct: number; // 할부 선납금 %
  insuranceYear: number; // 개인 보험료(연, 원)
  carTaxYear: number; // 자동차세(연, 원)
  rentExtraPct: number; // 장기렌트 보험·관리비 가산 가정(차량가 대비 연 %)
};

export const DEFAULT_INPUT: CalcInput = {
  price: 30_000_000,
  months: 48,
  prepayPct: 0,
  depositPct: 0,
  residualPct: 45,
  rentRate: 6.5,
  loanRate: 5.5,
  loanDownPct: 10,
  insuranceYear: 1_200_000,
  carTaxYear: 400_000,
  rentExtraPct: 4,
};

export function leaseMonthly(i: CalcInput) {
  const r = i.rentRate / 100 / 12;
  const prepay = (i.price * i.prepayPct) / 100;
  const deposit = (i.price * i.depositPct) / 100;
  const residual = (i.price * i.residualPct) / 100;
  const cap = i.price - prepay;
  const depreciation = Math.max(cap - residual, 0) / i.months;
  // 이자: 평균 잔액 기준. 보증금은 원금을 줄이지 않고 이자 부담만 줄임.
  const interest = Math.max((cap + residual) / 2 - deposit, 0) * r;
  return { monthly: depreciation + interest, prepay, deposit, residual };
}

export function compute(i: CalcInput) {
  const lease = leaseMonthly(i);
  const leaseAll = lease.monthly + (i.insuranceYear + i.carTaxYear) / 12; // 리스 + 개인 보험·세금
  const rent = lease.monthly + (i.price * i.rentExtraPct) / 100 / 12; // 렌트: 보험·세금·관리 포함 가정

  const down = (i.price * i.loanDownPct) / 100;
  const principal = i.price - down;
  const lr = i.loanRate / 100 / 12;
  const loanPay = lr === 0 ? principal / i.months : (principal * lr) / (1 - Math.pow(1 + lr, -i.months));
  const acqTax = i.price * 0.07;
  const loanAll = loanPay + (i.insuranceYear + i.carTaxYear) / 12;
  const loanUpfront = down + acqTax;

  const totals = {
    rent: lease.prepay + rent * i.months,
    lease: lease.prepay + leaseAll * i.months,
    // 할부: 낸 돈 전체 - 계약 종료 시 남는 차 가치(잔존가치 가정)
    loan: loanUpfront + loanAll * i.months - lease.residual,
  };

  return {
    rent: { monthly: rent, upfront: lease.prepay + lease.deposit },
    lease: { monthly: leaseAll, upfront: lease.prepay + lease.deposit },
    loan: { monthly: loanAll, upfront: loanUpfront, payment: loanPay },
    residual: lease.residual,
    totals,
  };
}

export function won(n: number) {
  if (!Number.isFinite(n)) return "-";
  const man = Math.round(n / 10_000);
  return `약 ${man.toLocaleString("ko-KR")}만 원`;
}
