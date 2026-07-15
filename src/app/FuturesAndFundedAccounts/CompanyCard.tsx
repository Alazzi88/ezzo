'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Plan = {
  name: string;
  price: string;
  profit: string;
  maxLoss?: string;
  contracts?: string;
};

type Rules = {
  profitSplit?: string;
  drawdownType: string;
  consistencyRule: string;
  minTradingDays: string;
  payoutTime: string;
  activationFee?: string;
  maxWithdrawal?: string;
  nextStep?: string;
};

type Monogram = {
  text: string;
  from: string;
  to: string;
};

export type Company = {
  name: string;
  logo?: string;
  monogram?: Monogram;
  url: string;
  country: string;
  countryFlag: string;
  yearsInOperation?: string;
  maxAllocation: string;
  keyStats: string[];
  plans: Plan[];
  summary: string;
  rules: Rules;
};

const RULE_ITEMS: { key: keyof Rules; label: string; icon: string }[] = [
  { key: 'profitSplit', label: 'تقاسم الأرباح', icon: '💰' },
  { key: 'drawdownType', label: 'وقف الخسارة', icon: '📉' },
  { key: 'consistencyRule', label: 'شرط الاتساق', icon: '⚖️' },
  { key: 'minTradingDays', label: 'أيام التداول الدنيا', icon: '📅' },
  { key: 'payoutTime', label: 'مدة/وتيرة السحب', icon: '💸' },
  { key: 'activationFee', label: 'رسوم التفعيل', icon: '🔓' },
  { key: 'maxWithdrawal', label: 'أقصى سحب', icon: '🏦' },
  { key: 'nextStep', label: 'الخطوة التالية بعد الاجتياز', icon: '🚀' },
];

function LogoBadge({ company, size }: { company: Company; size: number }) {
  if (company.logo) {
    return (
      <div
        className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-inner"
        style={{ width: size, height: size }}
      >
        <Image
          src={company.logo}
          alt={`شعار ${company.name}`}
          width={size - 16}
          height={size - 16}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }
  return (
    <div
      className="flex flex-shrink-0 items-center justify-center rounded-2xl font-extrabold text-white shadow-lg ring-1 ring-white/15"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.28,
        background: `linear-gradient(135deg, ${company.monogram?.from}, ${company.monogram?.to})`,
      }}
    >
      {company.monogram?.text}
    </div>
  );
}

export function CompanyCard({ company }: { company: Company }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[26px] border transition-all duration-300 ${
        open
          ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/[0.08] via-white/[0.02] to-transparent shadow-[0_0_0_1px_rgba(249,115,22,0.12),0_25px_60px_-30px_rgba(249,115,22,0.45)]'
          : 'border-white/8 bg-white/[0.025] hover:-translate-y-0.5 hover:border-orange-500/25 hover:bg-white/[0.04] hover:shadow-[0_20px_45px_-30px_rgba(249,115,22,0.35)]'
      }`}
    >
      {/* Glow accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-start gap-3.5 px-5 pt-5">
        <LogoBadge company={company} size={56} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[15px] font-extrabold text-white">{company.name}</p>
          </div>
          <p className="mt-0.5 text-[11px] text-gray-500">
            {company.countryFlag} {company.country}
            {company.yearsInOperation ? ` · ${company.yearsInOperation} سنة خبرة` : ''}
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end">
          <span className="text-[15px] font-extrabold leading-none text-orange-300">{company.maxAllocation}</span>
          <span className="mt-1 text-[9.5px] text-gray-500">أقصى تمويل</span>
        </div>
      </div>

      {/* Key stat chips */}
      <div className="mt-3.5 flex flex-wrap gap-1.5 px-5">
        {company.keyStats.map((stat) => (
          <span
            key={stat}
            className="rounded-full border border-orange-500/20 bg-orange-500/[0.08] px-2.5 py-1 text-[10.5px] font-medium leading-none text-orange-300"
          >
            {stat}
          </span>
        ))}
      </div>

      <p className="mt-3.5 px-5 text-[12.5px] leading-6 text-gray-500">{company.summary}</p>

      {/* Quick-glance strip: always visible, no need to expand */}
      <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 mx-5 w-[calc(100%-2.5rem)]">
        <div className="bg-[#0c0c0e] px-2.5 py-2.5 text-center">
          <p className="text-[9.5px] text-gray-500">تقاسم الأرباح</p>
          <p className="mt-0.5 truncate text-[11.5px] font-bold text-white">{company.rules.profitSplit ?? '—'}</p>
        </div>
        <div className="bg-[#0c0c0e] px-2.5 py-2.5 text-center">
          <p className="text-[9.5px] text-gray-500">رسوم التفعيل</p>
          <p className="mt-0.5 truncate text-[11.5px] font-bold text-white">{company.rules.activationFee ?? 'لا توجد'}</p>
        </div>
        <div className="bg-[#0c0c0e] px-2.5 py-2.5 text-center">
          <p className="text-[9.5px] text-gray-500">مدة السحب</p>
          <p className="mt-0.5 truncate text-[11.5px] font-bold text-white">{company.rules.payoutTime.split('،')[0].split('—')[0].slice(0, 18)}</p>
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mx-5 mb-5 mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-[12px] font-semibold text-gray-300 transition-colors hover:border-orange-500/30 hover:bg-orange-500/[0.06] hover:text-orange-200"
      >
        {open ? 'إخفاء التفاصيل الكاملة' : 'عرض كل قواعد الحساب والخطط'}
        <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="border-t border-white/8 bg-black/20 px-5 pb-6 pt-5 text-right">
          {/* Rules grid */}
          <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-wider text-gray-500">قواعد الحساب كاملة</p>
          <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {RULE_ITEMS.map(({ key, label, icon }) => {
              const value = company.rules[key];
              if (!value) return null;
              return (
                <div
                  key={key}
                  className={`rounded-xl border px-3 py-3 transition-colors hover:border-orange-500/20 ${
                    key === 'nextStep'
                      ? 'col-span-2 border-orange-500/15 bg-orange-500/[0.05] sm:col-span-3'
                      : 'border-white/8 bg-black/30'
                  }`}
                >
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <span className="text-sm leading-none">{icon}</span>
                    <span className="text-[9.5px] font-semibold uppercase tracking-wide text-gray-500">{label}</span>
                  </div>
                  <p className="text-[11px] leading-5 text-gray-200">{value}</p>
                </div>
              );
            })}
          </div>

          {/* Plans table */}
          <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-wider text-gray-500">الخطط المتاحة</p>
          <div className="mb-6 -mx-1 overflow-x-auto">
            <table className="w-full min-w-[520px] border-separate border-spacing-y-2 px-1 text-right">
              <thead>
                <tr className="text-[9.5px] font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-3 py-1 font-semibold">الخطة</th>
                  <th className="px-3 py-1 font-semibold">السعر</th>
                  <th className="px-3 py-1 font-semibold">هدف الربح</th>
                  <th className="px-3 py-1 font-semibold">وقف الخسارة</th>
                  <th className="px-3 py-1 font-semibold">العقود</th>
                </tr>
              </thead>
              <tbody>
                {company.plans.map((plan) => (
                  <tr key={plan.name} className="rounded-xl bg-black/30">
                    <td className="whitespace-nowrap rounded-r-xl border-y border-r border-white/8 px-3 py-2.5 text-[11px] font-bold text-orange-300">
                      {plan.name}
                    </td>
                    <td className="whitespace-nowrap border-y border-white/8 px-3 py-2.5 text-[11px] font-semibold text-white">
                      {plan.price}
                    </td>
                    <td className="whitespace-nowrap border-y border-white/8 px-3 py-2.5 text-[11px] text-gray-300">
                      {plan.profit}
                    </td>
                    <td className="whitespace-nowrap border-y border-white/8 px-3 py-2.5 text-[11px] text-gray-300">
                      {plan.maxLoss ?? '—'}
                    </td>
                    <td className="whitespace-nowrap rounded-l-xl border-y border-l border-white/8 px-3 py-2.5 text-[11px] text-gray-300">
                      {plan.contracts ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/5 px-5 py-2.5 text-sm font-semibold text-orange-200 transition-all duration-200 hover:border-orange-300 hover:bg-orange-500/10 hover:text-orange-100"
          >
            الموقع الرسمي
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
