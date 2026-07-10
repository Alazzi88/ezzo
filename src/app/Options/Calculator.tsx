'use client';

import { useMemo, useState } from 'react';
import { FadeIn } from '@/components/animations/MotionComponents';

type OptionSide = 'call' | 'put';

function parseNum(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

export default function OptionsCalculator() {
  const [side, setSide] = useState<OptionSide>('call');
  const [premium, setPremium] = useState('0');
  const [underlyingPrice, setUnderlyingPrice] = useState('0');
  const [targetPrice, setTargetPrice] = useState('0');
  const [delta, setDelta] = useState('0');
  const [theta, setTheta] = useState('0');
  const [minutesAhead, setMinutesAhead] = useState('0');

  const result = useMemo(() => {
    const p0 = parseNum(premium);
    const s0 = parseNum(underlyingPrice);
    const s1 = parseNum(targetPrice);
    const d = parseNum(delta);
    const t = parseNum(theta);
    const mins = parseNum(minutesAhead);

    const priceMove = s1 - s0;
    // PUT deltas are typically entered as negative; if user enters positive for a put, flip sign.
    const signedDelta = side === 'put' ? -Math.abs(d) : Math.abs(d);

    const deltaEffect = signedDelta * priceMove;
    const timeFraction = Math.min(Math.max(mins, 0), 24 * 60) / (24 * 60);
    const thetaEffect = -Math.abs(t) * timeFraction;

    const rawTarget = p0 + deltaEffect + thetaEffect;
    const projected = Math.max(rawTarget, 0);

    const changeAbs = projected - p0;
    const changePct = p0 !== 0 ? (changeAbs / p0) * 100 : 0;

    return {
      priceMove,
      deltaEffect,
      thetaEffect,
      projected,
      changeAbs,
      changePct,
      timeFraction,
    };
  }, [premium, underlyingPrice, targetPrice, delta, theta, minutesAhead, side]);

  const isUp = result.changeAbs >= 0;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* ── Inputs ─────────────────────────────────────────── */}
      <div className="gradient-card lg:col-span-2 px-6 py-7 sm:px-7">
        <h3 className="mb-5 text-lg font-bold text-orange-300">بيانات العقد</h3>

        {/* Side toggle */}
        <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1">
          <button
            type="button"
            onClick={() => setSide('call')}
            className={`rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
              side === 'call'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/40'
                : 'border border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            ▲ CALL
          </button>
          <button
            type="button"
            onClick={() => setSide('put')}
            className={`rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
              side === 'put'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/40'
                : 'border border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            ▼ PUT
          </button>
        </div>

        <div className="space-y-4">
          <Field
            label="سعر العقد الحالي (Premium)"
            value={premium}
            onChange={setPremium}
            suffix="$"
          />
          <Field
            label="سعر السهم/المؤشر الحالي"
            value={underlyingPrice}
            onChange={setUnderlyingPrice}
          />
          <Field
            label="السعر المستهدف المتوقع"
            value={targetPrice}
            onChange={setTargetPrice}
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="الدلتا (Delta)"
              value={delta}
              onChange={setDelta}
              step="0.01"
            />
            <Field
              label="الثيتا اليومية (Theta)"
              value={theta}
              onChange={setTheta}
              step="0.01"
              suffix="$/يوم"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-400">
              الوقت حتى الهدف (بالدقائق)
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={minutesAhead}
              onChange={(e) => setMinutesAhead(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-orange-400/50"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { label: 'الآن', v: '0' },
                { label: '15 د', v: '15' },
                { label: '30 د', v: '30' },
                { label: 'ساعة', v: '60' },
                { label: '2 ساعة', v: '120' },
                { label: 'نهاية اليوم', v: '390' },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => setMinutesAhead(btn.v)}
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-gray-400 transition-colors hover:border-orange-400/40 hover:text-orange-300"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Result ─────────────────────────────────────────── */}
      <div className="lg:col-span-3">
        <FadeIn direction="up">
          <div className="gradient-card h-full px-6 py-8 sm:px-8">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              القيمة المتوقعة للعقد
            </p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-5xl font-black text-white sm:text-6xl">
                ${result.projected.toFixed(2)}
              </span>
              <span
                className={`text-sm font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}
              >
                {isUp ? '+' : ''}
                {result.changeAbs.toFixed(2)}$ ({isUp ? '+' : ''}
                {result.changePct.toFixed(1)}%)
              </span>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <StatBox
                label="تأثير حركة السعر (Delta)"
                value={`${result.deltaEffect >= 0 ? '+' : ''}${result.deltaEffect.toFixed(2)}$`}
                positive={result.deltaEffect >= 0}
              />
              <StatBox
                label="تآكل الوقت (Theta)"
                value={`${result.thetaEffect.toFixed(2)}$`}
                positive={false}
              />
              <StatBox
                label="حركة السهم المفترضة"
                value={`${result.priceMove >= 0 ? '+' : ''}${result.priceMove.toFixed(2)}`}
                positive={result.priceMove >= 0}
              />
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 text-xs leading-6 text-gray-400">
              <p>
                <span className="font-bold text-gray-300">طريقة الحساب: </span>
                القيمة المتوقعة = سعر العقد الحالي + (الدلتا × حركة السعر) − (الثيتا × نسبة الوقت المنقضي من يوم كامل).
                تم افتراض تناسب خطي للثيتا على مدار 24 ساعة ({(result.timeFraction * 100).toFixed(1)}% من يوم كامل).
              </p>
              <p className="mt-2">
                ⚠️ هذا تقدير تقريبي (Delta + Theta فقط، بدون Gamma أو تغيّر التقلب الضمني) لأغراض تعليمية، وليس نصيحة مالية.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  suffix,
  step = '0.01',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-400">{label}</label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-orange-400/50"
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[11px] font-semibold text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">{label}</p>
      <p className={`mt-1.5 text-lg font-black ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
        {value}
      </p>
    </div>
  );
}
