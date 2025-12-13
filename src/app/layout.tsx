"use client";

import { Almarai } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/header";
import Script from "next/script";
import { Providers } from "@/app/providers";
import dynamic from "next/dynamic";
import ScriptLoader from "@/components/ScriptLoader";

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
        <title>Ezzo – مؤشر تداول متكامل وإشارات فنية متقدمة</title>
        <meta
          name="description"
          content="اكتشف مؤشر Ezzo للتداول: إشارات فنية متقدمة، مؤشرات سكالبينج، تداول الفيوتشر (SPX500)، بوت تداول آلي، وتنبيهات TradingView فورية مع حلول متخصصة للحسابات الممولة."
        />
        <meta
          name="keywords"
          content="مؤشر Ezzo, مؤشر للتداول, مؤشر تداول, تحليل فني, مؤشرات سكالبينج, تداول الفيوتشر, Futures Trading, SPX500, بوت تداول آلي, Trading Bot, تنبيهات TradingView, لوحة تحكم للتداول, محتوى تعليمي للتداول, الحسابات الممولة"
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
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
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
          strategy="afterInteractive"
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
          strategy="afterInteractive"
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
