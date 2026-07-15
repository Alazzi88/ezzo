'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { futuresCompanies } from '@/data/futuresCompanies';
import type { Company } from './CompanyCard';

/* ────────────────────────────────────────────────────────────────
   Profile lookup — approximate classification per company, built
   from the published rules in futuresCompanies.ts. Used only for
   ranking/filtering in the wizard, not shown as an absolute fact.
   ──────────────────────────────────────────────────────────────── */
type DllLevel = 'none' | 'optional' | 'strict';
type ConsistencyLevel = 'none' | 'light' | 'strict';

const PROFILE: Record<string, { dll: DllLevel; consistency: ConsistencyLevel }> = {
  'Alpha Futures': { dll: 'none', consistency: 'strict' },
  Topstep: { dll: 'optional', consistency: 'light' },
  Tradeify: { dll: 'none', consistency: 'light' },
  AquaFuture: { dll: 'none', consistency: 'light' },
  'My Funded Futures': { dll: 'optional', consistency: 'strict' },
  Earn2Trade: { dll: 'strict', consistency: 'light' },
  'Blue Guardian Futures': { dll: 'none', consistency: 'strict' },
  FundedNext: { dll: 'optional', consistency: 'light' },
  'Futures Elite': { dll: 'none', consistency: 'strict' },
  'E8 Markets': { dll: 'none', consistency: 'light' },
  'Funded Futures Family': { dll: 'none', consistency: 'strict' },
  'The Trading Pit Futures': { dll: 'optional', consistency: 'light' },
  'Hola Prime Futures': { dll: 'none', consistency: 'light' },
  TradeDay: { dll: 'optional', consistency: 'light' },
  'FunderPro Futures': { dll: 'strict', consistency: 'strict' },
};

function parsePrice(price: string): number {
  const match = price.replace(/,/g, '').match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

function parseSize(planName: string): number | null {
  const match = planName.match(/(\d+)\s*K/i);
  return match ? parseInt(match[1], 10) * 1000 : null;
}

type FlatPlan = {
  company: Company;
  planName: string;
  price: number;
  priceDisplay: string;
  size: number | null;
  profit: string;
  maxLoss?: string;
};

const ALL_PLANS: FlatPlan[] = futuresCompanies.flatMap((company) =>
  company.plans.map((plan) => ({
    company,
    planName: plan.name,
    price: parsePrice(plan.price),
    priceDisplay: plan.price,
    size: parseSize(plan.name),
    profit: plan.profit,
    maxLoss: plan.maxLoss,
  }))
);

/* ── Wizard questions ─────────────────────────────────────────── */
type Budget = 'any' | 'low' | 'mid' | 'high';
type SizePref = 'any' | 25000 | 50000 | 100000 | 150000;
type DllPref = 'any' | 'want' | 'avoid';
type ConsistencyPref = 'any' | 'flexible' | 'strict-ok';

const BUDGET_RANGES: Record<Budget, [number, number]> = {
  any: [0, Infinity],
  low: [0, 100],
  mid: [100, 200],
  high: [200, Infinity],
};

function LogoMini({ company, size = 44 }: { company: Company; size?: number }) {
  if (company.logo) {
    return (
      <div
        className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-1.5 shadow-inner"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={company.logo} alt={company.name} className="h-full w-full object-contain" />
      </div>
    );
  }
  return (
    <div
      className="flex flex-shrink-0 items-center justify-center rounded-xl font-extrabold text-white shadow-lg ring-1 ring-white/15"
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

export function RecommendationWizard() {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState<Budget>('any');
  const [sizePref, setSizePref] = useState<SizePref>('any');
  const [dllPref, setDllPref] = useState<DllPref>('any');
  const [consistencyPref, setConsistencyPref] = useState<ConsistencyPref>('any');
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 4;

  const results = useMemo(() => {
    const [min, max] = BUDGET_RANGES[budget];
    const scored = ALL_PLANS.map((p) => {
      let score = 0;
      const profile = PROFILE[p.company.name] ?? { dll: 'none', consistency: 'light' };

      // Budget match
      if (p.price >= min && p.price <= max) score += 3;
      else score -= 1;

      // Size match
      if (sizePref === 'any') score += 1;
      else if (p.size === sizePref) score += 3;

      // DLL preference
      if (dllPref === 'any') score += 1;
      else if (dllPref === 'want' && profile.dll !== 'none') score += 2;
      else if (dllPref === 'avoid' && profile.dll === 'none') score += 2;

      // Consistency preference
      if (consistencyPref === 'any') score += 1;
      else if (consistencyPref === 'flexible' && profile.consistency !== 'strict') score += 2;
      else if (consistencyPref === 'strict-ok') score += 1;

      return { plan: p, score, profile };
    });

    return scored
      .sort((a, b) => b.score - a.score || a.plan.price - b.plan.price)
      .slice(0, 3);
  }, [budget, sizePref, dllPref, consistencyPref]);

  const goNext = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else {
      setShowResults(true);
    }
  };
  const goBack = () => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (step > 0) setStep(step - 1);
  };
  const restart = () => {
    setStep(0);
    setBudget('any');
    setSizePref('any');
    setDllPref('any');
    setConsistencyPref('any');
    setShowResults(false);
  };

  const dllLabel = (level: DllLevel) =>
    level === 'strict' ? 'يوجد وقف خسارة يومي محدد' : level === 'optional' ? 'وقف الخسارة اليومي اختياري' : 'لا يوجد وقف خسارة يومي منفصل';
  const consistencyLabel = (level: ConsistencyLevel) =>
    level === 'strict' ? 'شرط اتساق واضح أثناء التقييم' : level === 'light' ? 'شرط اتساق مرن أو بديل غير نسبي' : 'بدون شرط اتساق';

  return (
    <div className="relative glass-panel mb-14 overflow-hidden rounded-3xl border border-orange-500/20 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.85)] sm:p-9">
      {/* Blueprint corner marks — matches Simulator's visual language */}
      <div className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t border-l border-orange-500/30" />
      <div className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t border-r border-orange-500/30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-orange-500/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-orange-500/30" />

      <div className="relative z-10 mb-8 text-center">
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-4.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-orange-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
          دعنا نختار لك أفضل حساب
        </div>
        <h2 className="section-heading mb-3 text-3xl font-extrabold text-[#f0ebe4] sm:text-4xl">
          معالج اختيار الحساب الممول
        </h2>
        <p className="section-subheading mx-auto max-w-2xl text-xs leading-relaxed text-gray-400 sm:text-sm">
          جاوب على 4 أسئلة سريعة بناءً على ميزانيتك وأسلوب إدارة المخاطر اللي تفضّله، وراح نرشّح لك أفضل 3 خطط حسابات من أصل {futuresCompanies.length} شركة عالمية.
        </p>
      </div>

      {/* Progress dots */}
      {!showResults && (
        <div className="relative z-10 mb-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-orange-500' : i < step ? 'w-4 bg-orange-500/50' : 'w-4 bg-white/10'
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative z-10"
          >
            {step === 0 && (
              <QuestionBlock
                icon="💰"
                title="كم ميزانيتك المتاحة لدفع رسوم التقييم؟"
                subtitle="سواء اشتراك شهري أو دفعة واحدة"
                options={[
                  { value: 'any', label: 'ما يهمني السعر' },
                  { value: 'low', label: 'أقل من $100' },
                  { value: 'mid', label: '$100 – $200' },
                  { value: 'high', label: 'أكثر من $200' },
                ]}
                selected={budget}
                onSelect={(v) => setBudget(v as Budget)}
              />
            )}
            {step === 1 && (
              <QuestionBlock
                icon="📦"
                title="أي حجم حساب تفضّل؟"
                subtitle="رأس المال الابتدائي (Virtual Balance) اللي تبي تتداول فيه"
                options={[
                  { value: 'any', label: 'ما يهمني الحجم' },
                  { value: 25000, label: '$25,000' },
                  { value: 50000, label: '$50,000' },
                  { value: 100000, label: '$100,000' },
                  { value: 150000, label: '$150,000' },
                ]}
                selected={sizePref}
                onSelect={(v) => setSizePref(v as SizePref)}
              />
            )}
            {step === 2 && (
              <QuestionBlock
                icon="📉"
                title="وقف الخسارة اليومي (Daily Loss Limit)؟"
                subtitle="بعض الشركات تفرض حد خسارة يومي منفصل غير حد الخسارة الكلي"
                options={[
                  { value: 'any', label: 'ما يهمني' },
                  { value: 'want', label: 'أبي وقف خسارة يومي واضح (حماية إضافية)' },
                  { value: 'avoid', label: 'أفضّل عدم وجود حد يومي منفصل' },
                ]}
                selected={dllPref}
                onSelect={(v) => setDllPref(v as DllPref)}
              />
            )}
            {step === 3 && (
              <QuestionBlock
                icon="⚖️"
                title="شرط الاتساق (Consistency Rule)؟"
                subtitle="بعض الشركات تشترط ألا يتجاوز أفضل يوم نسبة معينة من إجمالي الربح"
                options={[
                  { value: 'any', label: 'ما يهمني' },
                  { value: 'flexible', label: 'أبي شرط اتساق مرن أو معدوم' },
                  { value: 'strict-ok', label: 'ما عندي مانع من شرط اتساق واضح' },
                ]}
                selected={consistencyPref}
                onSelect={(v) => setConsistencyPref(v as ConsistencyPref)}
              />
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={step === 0}
                className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-gray-400 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                السابق
              </button>
              <button
                onClick={goNext}
                className="rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-8 py-3 text-sm font-bold text-black shadow-[0_15px_40px_-15px_rgba(249,115,22,0.8)] transition-all duration-300 hover:-translate-y-0.5"
              >
                {step === totalSteps - 1 ? '✨ أعطني التوصيات' : 'التالي'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <ResultsTree results={results} dllLabel={dllLabel} consistencyLabel={consistencyLabel} />

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={restart}
                className="rounded-full border border-white/10 px-6 py-2.5 text-xs font-semibold text-gray-400 transition-colors hover:border-orange-400/40 hover:text-orange-200"
              >
                🔄 إعادة الإجابة من جديد
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Question block sub-component ────────────────────────────── */
function QuestionBlock({
  icon,
  title,
  subtitle,
  options,
  selected,
  onSelect,
}: {
  icon: string;
  title: string;
  subtitle: string;
  options: { value: string | number; label: string }[];
  selected: string | number;
  onSelect: (v: string | number) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-1.5 text-3xl">{icon}</div>
      <h3 className="mb-1.5 text-lg font-extrabold text-white sm:text-xl">{title}</h3>
      <p className="mb-6 text-xs text-gray-500 sm:text-sm">{subtitle}</p>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {options.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <button
              key={String(opt.value)}
              onClick={() => onSelect(opt.value)}
              className={`rounded-2xl border px-5 py-3.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'border-orange-500/60 bg-orange-500/12 text-orange-200 shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                  : 'border-white/8 bg-white/[0.02] text-gray-300 hover:border-orange-500/25 hover:bg-white/[0.04]'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Results — animated non-overlapping tree ─────────────────── */
function ResultsTree({
  results,
  dllLabel,
  consistencyLabel,
}: {
  results: { plan: FlatPlan; score: number; profile: { dll: DllLevel; consistency: ConsistencyLevel } }[];
  dllLabel: (l: DllLevel) => string;
  consistencyLabel: (l: ConsistencyLevel) => string;
}) {
  // Fixed anchor positions (percent-based) for up to 3 branches — by
  // construction the branches fan out left/center/right so the
  // connector lines can never cross each other.
  const xPositions = results.length === 1 ? [50] : results.length === 2 ? [28, 72] : [15, 50, 85];

  return (
    <div>
      <div className="mb-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-[11px] font-semibold text-green-300">
          ✅ أفضل 3 توصيات بناءً على إجاباتك
        </span>
      </div>

      {/* Root -> branches connector (SVG, animated draw-in) */}
      <div className="relative mx-auto mt-6 hidden h-16 max-w-3xl sm:block">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 60" preserveAspectRatio="none">
          {xPositions.map((x, i) => (
            <motion.path
              key={i}
              d={`M 50 0 C 50 24, ${x} 30, ${x} 55`}
              fill="none"
              stroke="rgba(249,115,22,0.55)"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: 'easeInOut' }}
            />
          ))}
        </svg>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute right-1/2 top-0 flex translate-x-1/2 items-center gap-1.5 rounded-full border border-orange-500/40 bg-[#16120e] px-3.5 py-1.5 text-[10.5px] font-bold text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        >
          🎯 توصياتك
        </motion.div>
      </div>

      {/* Result cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {results.map(({ plan, profile }, i) => (
          <motion.div
            key={`${plan.company.name}-${plan.planName}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.12, ease: 'easeOut' }}
            className={`relative flex flex-col rounded-2xl border p-4 ${
              i === 0
                ? 'border-amber-400/50 bg-gradient-to-b from-amber-500/[0.08] to-transparent shadow-[0_0_30px_rgba(249,115,22,0.15)]'
                : 'border-white/10 bg-white/[0.02]'
            }`}
          >
            {i === 0 && (
              <span className="absolute -top-3 right-1/2 translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-[9.5px] font-extrabold text-black shadow-lg">
                ⭐ الأنسب لك
              </span>
            )}

            <div className="mb-3 flex items-center gap-2.5">
              <LogoMini company={plan.company} size={40} />
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-white">{plan.company.name}</p>
                <p className="truncate text-[10.5px] text-orange-300">{plan.planName}</p>
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between rounded-xl border border-white/8 bg-black/30 px-3 py-2">
              <span className="text-[10px] text-gray-500">السعر</span>
              <span className="text-xs font-extrabold text-orange-300">{plan.priceDisplay}</span>
            </div>

            <div className="space-y-1.5 text-[11px] text-gray-400">
              <div className="flex justify-between gap-2">
                <span className="text-gray-500">هدف الربح</span>
                <span className="font-semibold text-gray-200">{plan.profit}</span>
              </div>
              {plan.maxLoss && (
                <div className="flex justify-between gap-2">
                  <span className="text-gray-500">وقف الخسارة</span>
                  <span className="font-semibold text-gray-200">{plan.maxLoss}</span>
                </div>
              )}
              <div className="flex justify-between gap-2">
                <span className="text-gray-500">DLL</span>
                <span className="font-semibold text-gray-200">{dllLabel(profile.dll)}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-500">الاتساق</span>
                <span className="font-semibold text-gray-200">{consistencyLabel(profile.consistency)}</span>
              </div>
            </div>

            <Link
              href={plan.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/5 px-4 py-2 text-[11.5px] font-semibold text-orange-200 transition-all duration-200 hover:border-orange-300 hover:bg-orange-500/10"
            >
              الموقع الرسمي ↗
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-[10.5px] leading-6 text-gray-600">
        ⚠️ التصنيف تقريبي بناءً على القواعد المنشورة وقت آخر تحديث (14 يوليو 2026) ولأغراض المقارنة السريعة فقط — تأكد دائماً من الشروط الدقيقة على الموقع الرسمي قبل الشراء.
      </p>
    </div>
  );
}
