'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ScriptLoader() {
    const [loadScripts, setLoadScripts] = useState(false);
    const [loadAds, setLoadAds] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('ezzo-cookie-consent');

        if (consent !== 'accepted') {
            // Wait for user to accept cookies
            const onAccept = () => setLoadScripts(true);
            window.addEventListener('ezzo-consent-accepted', onAccept, { once: true });
            return () => window.removeEventListener('ezzo-consent-accepted', onAccept);
        }

        // Already accepted — load on first interaction to avoid blocking initial paint
        const onInteract = () => setLoadScripts(true);
        window.addEventListener('scroll', onInteract, { passive: true, once: true });
        window.addEventListener('mousemove', onInteract, { passive: true, once: true });
        window.addEventListener('touchstart', onInteract, { passive: true, once: true });
        window.addEventListener('click', onInteract, { passive: true, once: true });

        return () => {
            window.removeEventListener('scroll', onInteract);
            window.removeEventListener('mousemove', onInteract);
            window.removeEventListener('touchstart', onInteract);
            window.removeEventListener('click', onInteract);
        };
    }, []);

    // AdSense loads 3s after GTM — avoid competing for bandwidth
    useEffect(() => {
        if (loadScripts) {
            const t = setTimeout(() => setLoadAds(true), 3000);
            return () => clearTimeout(t);
        }
    }, [loadScripts]);

    if (!loadScripts) return null;

    return (
        <>
            {/* Google Tag Manager — only after consent + interaction */}
            <Script
                id="gtm"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MQRDBB3V');`,
                }}
            />
            <Script src="https://www.googletagmanager.com/gtag/js?id=AW-10851552359" strategy="lazyOnload" />
            <Script
                id="gtag-init"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-10851552359');`,
                }}
            />
            {/* AdSense — loads 3s after GTM, only with consent */}
            {loadAds && (
                <Script
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9870463298829321"
                    strategy="lazyOnload"
                    crossOrigin="anonymous"
                />
            )}
        </>
    );
}
