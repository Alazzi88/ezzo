"use client";

import React, { useEffect, useRef, useState } from "react";

const TradingViewTechnicalWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // الرمز المعروض حاليًا
  const [symbol, setSymbol] = useState<string>("NASDAQ:AAPL");
  // محتوى خانة الإدخال
  const [inputSymbol, setInputSymbol] = useState<string>(symbol);

  /** حقن سكربت TradingView للرمز المطلوب */
  const loadWidget = (sym: string) => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = ""; // نفرّغ الحاوية

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      interval: "1m",
      width: "100%",
      height: "450",
      symbol: sym,
      showIntervalTabs: true,
      displayMode: "single",
      locale: "ar",
      colorTheme: "dark",
      isTransparent: false,
    });

    containerRef.current.appendChild(script);
  };

  // تحميل الويدچِت أول مرة وكل ما يتغير الرمز
  useEffect(() => {
    loadWidget(symbol);
  }, [symbol]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSymbol.trim()) return;
    setSymbol(inputSymbol.trim().toUpperCase()); // يحدّث الرمز
  };

  return (
    <section className="mt-10 mb-16 px-4 sm:px-0">
      <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
        أداة التحليل الفني
      </h2>

      {/* خانة البحث */}
      <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-6">
        <input
          value={inputSymbol}
          onChange={(e) => setInputSymbol(e.target.value)}
          placeholder="اكتب الرمز: NASDAQ:AAPL أو TADAWUL:2222"
          className="w-72 bg-gray-800 text-white placeholder-gray-400 border border-orange-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg px-4 py-2"
        >
          بحث
        </button>
      </form>

      {/* حاوية TradingView */}
      <div
        ref={containerRef}
        className="tradingview-widget-container mx-auto max-w-[425px]"
      />
    </section>
  );
};

export default TradingViewTechnicalWidget;
