import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderWidget = () => {
      if (!container.current) return;
      container.current.innerHTML = '';
      const width = window.innerWidth;
      const chartHeight = width < 480 ? 480 : width < 768 ? 560 : width < 1024 ? 640 : 720;
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "allow_symbol_change": false,
        "calendar": false,
        "details": false,
        "hide_side_toolbar": false,
        "hide_top_toolbar": false,
        "hide_legend": false,
        "hide_volume": true,
        "hotlist": false,
        "interval": "1",
        "locale": "ar_AE",
        "save_image": true,
        "style": "1",
        "symbol": "CAPITALCOM:US100",
        "theme": "dark",
        "timezone": "America/New_York",
        "backgroundColor": "rgba(0, 0, 0, 1)",
        "gridColor": "rgba(242, 242, 242, 0)",
        "watchlist": [],
        "withdateranges": false,
        "compareSymbols": [],
        "studies": [],
        "autosize": false,
        "width": "100%",
        "height": "${chartHeight}"
      }`;
      container.current.appendChild(script);
    };

    renderWidget();

    const handleResize = () => {
      renderWidget();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={container}
      className="tradingview-widget-container relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/80 px-2 py-4 backdrop-blur-md"
      style={{ direction: 'ltr' }}
    >
      <div className="tradingview-widget-container__widget h-full w-full" />
      <div className="mt-3 text-xs text-gray-400">
        <a
          href="https://ar.tradingview.com/symbols/CAPITALCOM-US100/"
          rel="noopener nofollow"
          target="_blank"
          className="transition-colors hover:text-orange-300"
        >
          Track all markets on TradingView
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
