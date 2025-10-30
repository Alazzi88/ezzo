import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const renderWidget = () => {
      if (!container.current) return;
      container.current.innerHTML = '';
      const width = window.innerWidth;
      const chartHeight =
        width < 440 ? 420 :
        width < 768 ? 520 :
        width < 1200 ? 620 :
        width < 1600 ? 720 : 760;
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "allow_symbol_change": false,
        "calendar": false,
        "details": false,
        "hide_side_toolbar": true,
        "hide_top_toolbar": true,
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
        "height": "${chartHeight}",
        "disabled_features": [
          "header_symbol_search",
          "header_compare",
          "use_localstorage_for_settings",
          "header_chart_type",
          "header_undo_redo",
          "left_toolbar",
          "header_saveload",
          "header_fullscreen_button",
          "header_settings",
          "header_interval_dialog_button",
          "header_toggle_fullscreen_button"
        ],
        "enabled_features": []
      }`;
      container.current.appendChild(script);
    };

    renderWidget();

    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(() => {
        renderWidget();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  return (
    <div
      ref={container}
      className="tradingview-widget-container relative mx-auto flex w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/80 px-2 py-4 backdrop-blur-md lg:px-6"
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
