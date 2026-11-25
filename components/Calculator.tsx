"use client";

import { useMemo, useState } from "react";
import { compute, DEFAULT_INPUT, won, type CalcInput } from "@/lib/calc";

type Field = { key: keyof CalcInput; label: string; step: number; suffix: string; help?: string };

const FIELDS: Field[] = [
  { key: "price", label: "차량가", step: 1_000_000, suffix: "원", help: "제조사 공식 가격표에서 트림·옵션 가격을 확인해 입력하세요." },
  { key: "months", label: "계약 기간", step: 12, suffix: "개월" },
  { key: "prepayPct", label: "선수금(렌트·리스)", step: 5, suffix: "%", help: "돌려받지 못하는 돈" },
  { key: "depositPct", label: "보증금(렌트·리스)", step: 5, suffix: "%", help: "종료 시 돌려받는 돈" },
  { key: "residualPct", label: "잔존가치", step: 5, suffix: "%" },
  { key: "rentRate", label: "렌트·리스 금리 가정", step: 0.5, suffix: "%" },
  { key: "rentExtraPct", label: "렌트 보험·세금·관리 가정", step: 0.5, suffix: "% / 년", help: "차량가 대비 연간 비율 가정" },
  { key: "loanDownPct", label: "할부 선납금", step: 5, suffix: "%" },
  { key: "loanRate", label: "할부 금리 가정", step: 0.5, suffix: "%" },
  { key: "insuranceYear", label: "개인 자동차보험(연)", step: 100_000, suffix: "원", help: "리스·할부에 더함" },
  { key: "carTaxYear", label: "자동차세(연)", step: 50_000, suffix: "원", help: "리스·할부에 더함" },
];

export function Calculator({ initialPrice }: { initialPrice?: number }) {
  const [input, setInput] = useState<CalcInput>({ ...DEFAULT_INPUT, ...(initialPrice ? { price: initialPrice } : {}) });
  const out = useMemo(() => compute(input), [input]);

  const rows = [
    { name: "장기렌트", monthly: out.rent.monthly, upfront: out.rent.upfront, total: out.totals.rent, note: "보험·자동차세 포함 가정" },
    { name: "리스", monthly: out.lease.monthly, upfront: out.lease.upfront, total: out.totals.lease, note: "개인 보험·세금 더함" },
    { name: "할부", monthly: out.loan.monthly, upfront: out.loan.upfront, total: out.totals.loan, note: "취득세 7%·선납금 초기 부담, 종료 시 차량 가치 차감" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
        예시 추정치입니다. 단순화한 공식으로 계산하며 실제 견적과 다릅니다. 금리·잔존가치·보험료는 모두 가정값이니 본인 조건에 맞게 바꿔 보세요.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FIELDS.map((f) => (
          <label key={f.key} className="block text-sm">
            <span className="font-medium text-slate-700">{f.label}</span>
            <span className="mt-1 flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={f.step}
                value={input[f.key]}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setInput((prev) => ({ ...prev, [f.key]: Number.isFinite(v) ? (f.key === "months" ? Math.max(1, v) : v) : prev[f.key] }));
                }}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-right tabular-nums focus:border-blue-600 focus:outline-none"
              />
              <span className="shrink-0 text-xs text-slate-500">{f.suffix}</span>
            </span>
            {f.help ? <span className="mt-1 block text-[11px] text-slate-500">{f.help}</span> : null}
          </label>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2">방식</th>
              <th className="py-2 text-right">월 비용(추정)</th>
              <th className="py-2 text-right">초기 목돈</th>
              <th className="py-2 text-right">기간 총부담(추정)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b border-slate-100 align-top">
                <td className="py-3">
                  <span className="font-semibold text-slate-900">{r.name}</span>
                  <span className="block text-[11px] text-slate-500">{r.note}</span>
                </td>
                <td className="py-3 text-right font-semibold tabular-nums text-blue-700">{won(r.monthly)}</td>
                <td className="py-3 text-right tabular-nums">{won(r.upfront)}</td>
                <td className="py-3 text-right tabular-nums">{won(r.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-slate-500">
        계산 방식: 렌트·리스 월 비용 = (차량가 − 선수금 − 잔존가치) ÷ 기간 + 평균 잔액(보증금 차감) × 금리. 보증금은 원금을 줄이지 않고 이자 부담만 줄이므로 같은 금액이면 선수금보다 월 비용이 덜 내려갑니다. 할부 총부담은 계약 종료 시 남는 차량 가치(잔존가치 가정)를 뺀 값입니다. 공채·탁송료·정비비·연료비는 넣지 않았습니다.
      </p>
    </div>
  );
}
