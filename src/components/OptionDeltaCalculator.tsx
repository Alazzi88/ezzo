"use client";

import { useMemo, useState } from "react";

type OptionType = "call" | "put";

const TargetOptionPriceCalculator: React.FC = () => {
  const [contractPrice, setContractPrice] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [delta, setDelta] = useState("");
  const [optionType, setOptionType] = useState<OptionType>("call");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isFormReady = useMemo(
    () =>
      [contractPrice, stockPrice, expectedPrice, delta]
        .every((value) => value.trim().length > 0),
    [contractPrice, stockPrice, expectedPrice, delta]
  );

  const resetError = () => {
    if (error) {
      setError(null);
    }
  };

  const computeTarget = (type: OptionType): number | null => {
    const contract = parseFloat(contractPrice);
    const stock = parseFloat(stockPrice);
    const expected = parseFloat(expectedPrice);
    const deltaValue = parseFloat(delta);

    if ([contract, stock, expected, deltaValue].some((value) => Number.isNaN(value))) {
      return null;
    }

    const difference = type === "call" ? expected - stock : stock - expected;
    return contract + difference * deltaValue;
  };

  const calculatePrice = (type: OptionType = optionType) => {
    if (!isFormReady) {
      setError("يرجى تعبئة جميع الحقول قبل الحساب.");
      setResult(null);
      return;
    }

    const targetPrice = computeTarget(type);

    if (targetPrice === null) {
      setError("تأكد من إدخال أرقام صحيحة في جميع الحقول.");
      setResult(null);
      return;
    }

    setResult(targetPrice);
    setError(null);
  };

  const inputs = [
    {
      label: "سعر العقد",
      placeholder: "أدخل سعر العقد الحالي",
      value: contractPrice,
      onChange: setContractPrice,
    },
    {
      label: "سعر السهم",
      placeholder: "أدخل سعر السهم وقت الشراء",
      value: stockPrice,
      onChange: setStockPrice,
    },
    {
      label: "السعر المتوقع الوصول إليه",
      placeholder: "أدخل السعر المستهدف للسهم",
      value: expectedPrice,
      onChange: setExpectedPrice,
    },
    {
      label: "قيمة الدلتا",
      placeholder: "أدخل قيمة الدلتا من المنصة",
      value: delta,
      onChange: setDelta,
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="space-y-5 text-right">
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          حاسبة سعر العقد المستهدف
        </h3>
        <p className="text-sm leading-7 text-gray-300">
          تساعدك هذه الأداة على تقدير القيمة المتوقعة لعقد الأوبشن بالاعتماد على حركة السهم وقيمة الدلتا. أدخل بيانات الصفقة وحدد نوع العقد (كول أو بوت) لتحصل على قراءة تقريبية للسعر المتوقع. تذكّر أنها أداة توجيهية وليست ضماناً للنتائج.
        </p>
        <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-gray-100 backdrop-blur-sm">
          <p>
            <span className="font-semibold text-orange-300">تنبيه:</span> الدلتا تتغير بتغير السعر والوقت، لذا قم بتحديث القيم باستمرار وتأكد من مقارنة النتائج بخطتك لإدارة المخاطر.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/65 px-6 py-8 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)] backdrop-blur-md">
        <div className="flex justify-end gap-3">
          {(["call", "put"] as OptionType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setOptionType(type);
                resetError();
                if (isFormReady) {
                  const targetPrice = computeTarget(type);
                  if (targetPrice !== null) {
                    setResult(targetPrice);
                  }
                }
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                optionType === type
                  ? "bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 text-black shadow-[0_10px_30px_-15px_rgba(251,146,60,0.85)]"
                  : "border border-orange-300/40 text-orange-200 hover:border-orange-200 hover:text-white"
              }`}
            >
              {type === "call" ? "كول (Call)" : "بوت (Put)"}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-5">
          {inputs.map(({ label, placeholder, value, onChange }) => (
            <div key={label} className="text-right">
              <label className="mb-2 block text-sm font-semibold text-orange-200">
                {label}
              </label>
              <input
                type="number"
                value={value}
                onChange={(event) => {
                  onChange(event.target.value);
                  resetError();
                }}
                className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4 text-center">
          <button
            onClick={() => calculatePrice()}
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_20px_45px_-25px_rgba(251,146,60,0.95)] transition-transform duration-300 hover:-translate-y-1"
          >
            احسب السعر المستهدف
          </button>

          {error && (
            <p className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          {result !== null && !error && (
            <div className="rounded-2xl border border-orange-400/40 bg-orange-500/10 px-4 py-4 text-sm text-orange-100">
              <p className="font-semibold text-orange-200">سعر العقد المستهدف</p>
              <p className="mt-1 text-3xl font-extrabold text-orange-300">
                {result.toFixed(2)}
              </p>
              <p className="mt-2 text-xs text-gray-300">
                احرص على مقارنة النتيجة مع إدارة المخاطر اليومية الخاصة بك قبل تنفيذ أي صفقة.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetOptionPriceCalculator;
