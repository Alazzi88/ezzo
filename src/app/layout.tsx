"use client";

import { Almarai } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import Script from "next/script";
import { Providers } from "@/app/providers";
import ScrollAnimator from "@/components/ScrollAnimator";

const almarai = Almarai({
  subsets: ["latin", "arabic"],
  variable: "--font-almarai",
  weight: ["400", "700", "800"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={almarai.variable}>
      <head>
        <title>Ezzo – مؤشر تداول متكامل وإشارات فنية متقدمة</title>
        <meta
          name="description"
          content="اكتشف مؤشر Ezzo للتداول: إشارات فنية متقدمة، مؤشرات سكالبينج، تداول الخيارات (SPX500)، بوت تداول آلي، وتنبيهات TradingView فورية."
        />
        <meta
          name="keywords"
          content="مؤشر Ezzo, مؤشر للتداول, مؤشر تداول, تحليل فني, مؤشرات سكالبينج, تداول الخيارات, Options Trading, خيارات SPX, SPX500, بوت تداول آلي, Trading Bot, تنبيهات TradingView, لوحة تحكم للتداول, محتوى تعليمي للتداول"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Ezzo - اكتشف التحليل الفني للتداول" />
        <meta
          property="og:description"
          content="دليل شامل لأفضل المؤشرات وأدوات التحليل الفني للمتداولين."
        />
        <meta property="og:url" content="https://3zzo.com" />
        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.ico" />

        {/* Structured Data (JSON-LD) */}
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Ezzo",
              "url": "https://3zzo.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://example.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MQRDBB3V');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google Ads Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10851552359"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10851552359');
          `}
        </Script>
        {/* End Google Ads Tag */}

        {/* حساب AdSense: سكربت العادي (بدون AMP) */}
        <meta name="google-adsense-account" content="ca-pub-9870463298829321" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9870463298829321"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>

      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MQRDBB3V"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <div className="relative flex min-h-screen flex-col overflow-hidden text-gray-100">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-orange-500/20 blur-[140px] animate-pulse-glow" />
            <div className="absolute bottom-[-10%] right-1/3 h-80 w-80 rounded-full bg-orange-400/15 blur-[160px] animate-pulse-glow" />
            <div className="absolute inset-0 grid-overlay opacity-40" />
          </div>

          <Header />
          <Providers>
            <ScrollAnimator />
            <main className="relative z-10 flex-grow pt-28 pb-24">
              {children}
            </main>
          </Providers>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
