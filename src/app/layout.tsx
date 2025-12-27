"use client";

import { Almarai } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/header";
import Script from "next/script";
import { Providers } from "@/app/providers";
import dynamic from "next/dynamic";
import ScriptLoader from "@/components/ScriptLoader";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy load Footer (below the fold)
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

const almarai = Almarai({
  subsets: ["latin", "arabic"],
  variable: "--font-almarai",
  weight: ["400", "700", "800"],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={almarai.variable}>
      <head>
        <title>Ezzo | مؤشر تداول احترافي - إشارات فنية متقدمة للفيوتشر والحسابات الممولة</title>
        <meta
          name="description"
          content="مؤشر Ezzo للتداول - أفضل مؤشر تداول لحظي للفيوتشر والحسابات الممولة. احصل على إشارات فنية دقيقة، تحليل SPX500، تنبيهات TradingView، ودورات تعليمية احترافية. ابدأ رحلتك في عالم التداول مع Ezzo."
        />
        <meta
          name="keywords"
          content="مؤشر تداول, مؤشر Ezzo, تداول الفيوتشر, Futures Trading, مؤشر فني, تحليل فني, إشارات تداول, SPX500, الحسابات الممولة, Funded Accounts, سكالبينج, Scalping, TradingView, بوت تداول, Trading Bot, دورة تداول, تعلم التداول, Ezzo Trading, مؤشر لحظي, تداول العملات, فوركس, Forex, أفضل مؤشر تداول, مؤشر تداول مجاني, استراتيجية تداول, تداول احترافي"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Ezzo Trading" />
        <link rel="canonical" href="https://3zzo.com" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Ezzo | مؤشر تداول احترافي - إشارات فنية للفيوتشر" />
        <meta
          property="og:description"
          content="أفضل مؤشر تداول لحظي للفيوتشر والحسابات الممولة. إشارات دقيقة، تحليل فني متقدم، ودورات تعليمية."
        />
        <meta property="og:url" content="https://3zzo.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ezzo Trading" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:image" content="https://3zzo.com/img/logo.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ezzo | مؤشر تداول احترافي" />
        <meta name="twitter:description" content="أفضل مؤشر تداول لحظي للفيوتشر والحسابات الممولة" />
        <meta name="twitter:image" content="https://3zzo.com/img/logo.webp" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" as="image" href="/img/trading1.webp" />
        <link rel="preconnect" href="https://s3.tradingview.com" />
        <link rel="preconnect" href="https://www.tradingview-widget.com" />
        <link rel="dns-prefetch" href="https://s3.tradingview.com" />
        <link rel="dns-prefetch" href="https://www.tradingview-widget.com" />

        {/* Structured Data (JSON-LD) */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
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
          `,
          }}
        />
        <Script
          id="structured-data-course"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "دورة التحليل الفني للفيوتشر",
              "description": "برنامج تدريبي متكامل لتعلم التحليل الفني وخطط التداول في أسواق الفيوتشر والحسابات الممولة مع دعم من فريق Ezzo.",
              "provider": {
                "@type": "Organization",
                "name": "Ezzo",
                "url": "https://3zzo.com"
              },
              "inLanguage": "ar",
              "offers": {
                "@type": "Offer",
                "url": "https://3zzo.com/Coursies",
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock"
              }
            }
          `,
          }}
        />
        <Script
          id="structured-data-indicator"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "مؤشر Ezzo اللحظي",
              "operatingSystem": "Web",
              "applicationCategory": "BusinessApplication",
              "description": "مؤشر تداول لحظي يوفّر قراءات السيولة وتنبيهات فورية لمتداولي الفيوتشر والحسابات الممولة.",
              "creator": {
                "@type": "Organization",
                "name": "Ezzo",
                "url": "https://3zzo.com"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://3zzo.com/Indicator",
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock"
              }
            }
          `,
          }}
        />

        <ScriptLoader />
      </head>

      <body className="font-sans antialiased">
        {/* Loading Screen Animation */}
        <LoadingScreen />
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
