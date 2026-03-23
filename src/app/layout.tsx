"use client";

import { Almarai } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/header";
import { Providers } from "@/app/providers";
import dynamic from "next/dynamic";
import ScriptLoader from "@/components/ScriptLoader";
import LoadingScreen from "@/components/LoadingScreen";
import CookieConsent from "@/components/CookieConsent";
import { LazyMotion, domAnimation } from "framer-motion";

// Lazy load below-fold components
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

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
        <title>Ezzo | استراتيجية ايزو احترافية - إشارات فنية متقدمة للفيوتشر والحسابات الممولة</title>
        <meta
          name="description"
          content="استراتيجية ايزو للتداول - أفضل استراتيجية ايزو لحظية للفيوتشر والحسابات الممولة. احصل على إشارات فنية دقيقة، تحليل SPX500، تنبيهات TradingView، ودورات تعليمية احترافية."
        />
        <meta
          name="keywords"
          content="استراتيجية تداول, استراتيجية ايزو, تداول الفيوتشر, Futures Trading, مؤشر فني, تحليل فني, إشارات تداول, SPX500, الحسابات الممولة, Funded Accounts, TradingView, بوت تداول, Trading Bot, دورة تداول, Ezzo Trading"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Ezzo Trading" />
        <link rel="canonical" href="https://3zzo.com" />

        {/* Open Graph */}
        <meta property="og:title" content="Ezzo | استراتيجية ايزو احترافية - إشارات فنية للفيوتشر" />
        <meta property="og:description" content="أفضل استراتيجية ايزو لحظية للفيوتشر والحسابات الممولة. إشارات دقيقة، تحليل فني متقدم، ودورات تعليمية." />
        <meta property="og:url" content="https://3zzo.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ezzo Trading" />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:image" content="https://3zzo.com/img/logo.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ezzo | استراتيجية ايزو احترافية" />
        <meta name="twitter:description" content="أفضل استراتيجية ايزو لحظية للفيوتشر والحسابات الممولة" />
        <meta name="twitter:image" content="https://3zzo.com/img/logo.webp" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" as="image" href="/img/logo.webp" />
        <link rel="preconnect" href="https://s3.tradingview.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.tradingview-widget.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://s3.tradingview.com" />
        <link rel="dns-prefetch" href="https://www.tradingview-widget.com" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebSite","name":"Ezzo","url":"https://3zzo.com"}` }} />

      </head>

      <body className="font-sans antialiased">
        <ScriptLoader />
        <LoadingScreen />

        <LazyMotion features={domAnimation}>
          <div className="relative flex min-h-screen flex-col overflow-hidden text-gray-100">

            {/* Background decorations (CSS only, zero JS cost) */}
            <div className="pointer-events-none fixed inset-0 -z-10">
              <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-orange-500/20 blur-[80px] sm:blur-[140px]" />
              <div className="absolute bottom-[-10%] right-1/3 h-80 w-80 rounded-full bg-orange-400/15 blur-[80px] sm:blur-[160px]" />
              <div className="absolute inset-0 grid-overlay opacity-40" />
            </div>

            <Providers>
              <Header />
              <main className="relative z-10 flex-grow pt-24 sm:pt-28 pb-24">
                {children}
              </main>
              <Footer />
            </Providers>

            <ScrollToTop />
            <CookieConsent />
          </div>
        </LazyMotion>
      </body>
    </html>
  );
}
