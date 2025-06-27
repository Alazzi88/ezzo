"use client";

import { Almarai } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import Script from "next/script";

const almarai = Almarai({
  subsets: ["latin", "arabic"],
  variable: "--font-almarai",
  weight: ["400", "700", "800"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={almarai.variable}>
      <head>
        <title>Ezzo</title>
        <title>Ezzo – مؤشر تداول متكامل وإشارات فنية متقدمة</title>
        <meta
          name="description"
          content="اكتشف مؤشر Ezzo للتداول: إشارات فنية متقدمة، مؤشرات سكالبينج، تداول الخيارات (SPX500)، بوت تداول آلي، وتنبيهات TradingView فورية."
        />
        <meta
          name="keywords"
          content="
            مؤشر Ezzo, مؤشر للتداول, مؤشر تداول, تحليل فني,
            إشارات فنية متقدمة, مؤشرات سكالبينج, Scalping Indicators,
            تداول الخيارات, Options Trading, خيارات SPX, SPX500,
            بوت تداول آلي, Trading Bot, تنبيهات TradingView فورية,
            لوحة تحكم Dashboard للتداول, دليل المؤشرات, مقارنة المؤشرات,
            دعم ومقاومة ديناميكي, مراجعات المؤشرات, محتوى تعليمي للتداول,
            استراتيجيات فريمات متعددة
          "
        />

        <meta
          name="description"
          content="اكتشف أفضل المؤشرات للتحليل الفني للتداول..."
        />
        <meta
          name="keywords"
          content="مؤشر تداول, تحليلات فنية, أدوات تداول..."
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

      <body className="font-sans text-orange-300 antialiased bg-black min-h-screen flex flex-col">
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

        {/* بداية محتوى الصفحة */}
        <Header />
        <main className="flex-grow bg-black mt-2 px-0 py-8">
          <div className="max-w-full mx-auto bg-black p-0 rounded-lg shadow-md">
            {children}
          </div>
        </main>

        <Footer />
        <ScrollToTop />
        {/* نهاية محتوى الصفحة */}

        {/* يمكنك هنا (أو في أي مكان تريده بالـ Body) إضافة كود عرض الإعلانات أو مربعات AdSense 
            مثال: 
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-9870463298829321"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <Script id="ads-init" strategy="afterInteractive">{`
              (adsbygoogle = window.adsbygoogle || []).push({});
            `}</Script>
        */}
      </body>
    </html>
  );
}
