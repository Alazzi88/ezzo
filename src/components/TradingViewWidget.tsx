import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = '';
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
        "autosize": true
      }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container flex justify-center items-center" ref={container} style={{ width: '100%', maxWidth: 1200, minWidth: 260, minHeight: 610, margin: '0 auto', direction: 'ltr', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="tradingview-widget-container__widget w-full"
        style={{ maxWidth: '90vw', width: '97vw' }}
      ></div>
      <div className="tradingview-widget-copyright">
        <a href="https://ar.tradingview.com/symbols/CAPITALCOM-US100/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
