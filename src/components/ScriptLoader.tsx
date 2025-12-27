'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ScriptLoader() {
    const [loadGTM, setLoadGTM] = useState(false);
    const [loadAds, setLoadAds] = useState(false);

    useEffect(() => {
        const handleInteraction = () => {
            setLoadGTM(true);
        };

        // REMOVED: Auto-timer to prevent main thread blocking during initial load
        // Scripts will ONLY load on user interaction (scroll, click, etc.)

        // Or load on user interaction
        window.addEventListener('scroll', handleInteraction, { once: true });
        window.addEventListener('mousemove', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
        window.addEventListener('click', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('click', handleInteraction);
        };
    }, []);

    // Load Ads 2 seconds after GTM
    useEffect(() => {
        if (loadGTM) {
            const adsTimer = setTimeout(() => {
                setLoadAds(true);
            }, 2000);
            return () => clearTimeout(adsTimer);
        }
    }, [loadGTM]);

    return (
        <>
            {loadGTM && (
                <>
                    {/* Google Tag Manager */}
                    <Script
                        id="google-tag-manager"
                        strategy="lazyOnload"
                        dangerouslySetInnerHTML={{
                            __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MQRDBB3V');
          `,
                        }}
                    />

                    {/* Google Ads Tag (gtag.js) */}
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=AW-10851552359"
                        strategy="lazyOnload"
                    />
                    <Script
                        id="gtag-init"
                        strategy="lazyOnload"
                        dangerouslySetInnerHTML={{
                            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10851552359');
          `,
                        }}
                    />
                </>
            )}

            {loadAds && (
                <>
                    {/* AdSense */}
                    <meta name="google-adsense-account" content="ca-pub-9870463298829321" />
                    <Script
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9870463298829321"
                        strategy="lazyOnload"
                        crossOrigin="anonymous"
                    />
                </>
            )}
        </>
    );
}
