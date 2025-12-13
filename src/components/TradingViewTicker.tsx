'use client';

import { memo, useEffect, useRef } from 'react';

const TradingViewTicker = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || scriptLoaded.current) return;

    // Create the widget div that TradingView expects
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    container.innerHTML = '';
    container.appendChild(widgetDiv);

    const widgetConfig = {
      symbols: [
        { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
        { proName: 'FOREXCOM:NSXUSD', title: 'NASDAQ 100' },
        { proName: 'CAPITALCOM:US30', title: 'Dow Jones' },
        { proName: 'OANDA:XAUUSD', title: 'Gold' },
        { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
      ],
      colorTheme: 'dark',
      locale: 'ar_AE',
      isTransparent: true,
      displayMode: 'adaptive',
      showSymbolLogo: true,
    };

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify(widgetConfig);
    container.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      // Don't clean up on unmount to prevent the error
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/85 via-black/80 to-black/70 p-[1px] shadow-[0_28px_60px_-35px_rgba(0,0,0,0.85)]">
      <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-r from-orange-500/25 via-orange-400/15 to-amber-300/20 opacity-80 blur-3xl" />
      <div className="relative flex flex-col gap-2 rounded-[24px] border border-white/10 bg-black/95 px-4 py-3 sm:flex-row sm:items-center sm:gap-5 sm:px-6" style={{ direction: 'ltr' }}>
        <div className="tradingview-widget-container flex-1" ref={containerRef} />
      </div>
    </div>
  );
};

export default memo(TradingViewTicker);
