import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;

    // Ensure container is empty and has the required child
    currentContainer.innerHTML = '<div class="tradingview-widget-container__widget" style="height:100%;width:100%"></div>';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "CAPITALCOM:US100",
        "interval": "1",
        "timezone": "America/New_York",
        "theme": "dark",
        "style": "1",
        "locale": "ar_AE",
        "enable_publishing": false,
        "backgroundColor": "rgba(0, 0, 0, 1)",
        "gridColor": "rgba(242, 242, 242, 0)",
        "hide_top_toolbar": true,
        "hide_legend": false,
        "save_image": true,
        "calendar": false,
        "hide_volume": true,
        "support_host": "https://www.tradingview.com",
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
        ]
      }`;
    currentContainer.appendChild(script);

    // Cleanup function
    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={container}
      className="tradingview-widget-container relative mx-auto flex w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/80 px-2 py-4 backdrop-blur-md lg:px-6 h-[420px] md:h-[520px] lg:h-[620px] xl:h-[720px] 2xl:h-[760px]"
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
