"use client";

import React, { useEffect, useRef } from "react";

/**
 * مكوّن لأداة TradingView لعرض أهم الأخبار الاقتصادية
 * تم استخدام نهج التحميل الديناميكي للسكربت داخل المتصفح،
 * وإضافة الإعدادات على هيئة JSON في script.innerHTML
 */
const TradingViewEventsWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // إنشاء عنصر السكربت
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.async = true;

    // الإعدادات الخاصة بأداة TradingView على هيئة JSON
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      isTransparent: false,
      width: "300",
      height: "400",
      locale: "ar",
      importanceFilter: "0,1",
      countryFilter: "us",
    });

    // إضافة عنصر السكربت داخل الحاوية
    containerRef.current.appendChild(script);
  }, []);

  return (
    /* 
      - mt-10 و mb-10 لإضافة مسافة علوية وسفلية
      - px-4: مسافة أفقية (يمين ويسار) على الشاشات الأصغر من 640px
      - sm:px-0: إزالة المسافة الأفقية عند الشاشات الأكبر من 640px
    */
    <div className="mt-10 mb-10 px-4 sm:px-0">
      {/* عنوان لأهم الأخبار الاقتصادية */}
      <h1 className="text-2xl font-bold text-orange-500 mb-5 text-center">
        أهم الأخبار الاقتصادية
      </h1>

      <div className="tradingview-widget-container flex flex-col items-center">
        {/* الحاوية التي سيتم دمج أداة TradingView داخلها */}
        <div ref={containerRef} className="tradingview-widget-container__widget" />
      </div>
    </div>
  );
};

export default TradingViewEventsWidget;
