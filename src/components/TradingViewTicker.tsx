'use client';

import { memo, useEffect, useRef } from 'react';

const TradingViewTicker = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scriptLoaded = useRef(false); // Keep this ref to prevent multiple script loads if observer triggers multiple times before disconnect

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;
    let loadTimer: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !scriptLoaded.current) {
          loadTimer = window.setTimeout(() => {
            if (scriptLoaded.current) return;

            // Create the widget div that TradingView expects
            const widgetDiv = document.createElement('div');
            widgetDiv.className = 'tradingview-widget-container__widget';
            currentContainer.innerHTML = '';
            currentContainer.appendChild(widgetDiv);

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
              symbols: [
                { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
                { proName: 'FOREXCOM:NSXUSD', title: 'US 100' },
                { proName: 'FX_IDC:EURUSD', title: 'EUR/USD' },
                { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
                { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
              ],
              showSymbolLogo: true,
              colorTheme: 'dark',
              isTransparent: true,
              displayMode: 'adaptive',
              locale: 'ar_AE',
            });

            currentContainer.appendChild(script);
            scriptLoaded.current = true;
          }, 700);
          observer.disconnect();
        }
      },
      { rootMargin: '120px' }
    );

    observer.observe(currentContainer);

    return () => {
      observer.disconnect();
      if (loadTimer) window.clearTimeout(loadTimer);
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
