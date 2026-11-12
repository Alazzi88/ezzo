import type { Metadata, Viewport } from "next";
import { Almarai } from "next/font/google";
import ClientShell from "./ClientShell";

const almarai = Almarai({
  subsets: ["latin", "arabic"],
  variable: "--font-almarai",
  weight: ["400", "700", "800"],
  display: "swap",
});

const SITE = "https://3zzo.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0b09",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Ezzo | استراتيجية ايزو وبوت EZZO SPX BOT للفيوتشر والخيارات",
    template: "%s | Ezzo",
  },
  description:
    "استراتيجية ايزو الاحترافية للفيوتشر والحسابات الممولة، وبوت EZZO SPX BOT لإشارات عقود خيارات SPX على تيليجرام. نقاط دخول وخروج محسوبة وتنبيهات لحظية.",
  keywords: [
    "استراتيجية ايزو", "بوت EZZO SPX BOT", "بوت خيارات SPX", "استراتيجية تداول",
    "تداول الفيوتشر", "الحسابات الممولة", "إشارات تداول", "SPX500", "TradingView",
    "Funded Accounts", "Futures Trading", "Ezzo Trading",
  ],
  applicationName: "Ezzo",
  authors: [{ name: "Ezzo Trading" }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: "Ezzo Trading",
    locale: "ar_SA",
    url: SITE,
    title: "Ezzo | استراتيجية ايزو وبوت EZZO SPX BOT",
    description: "استراتيجية ايزو للفيوتشر والحسابات الممولة، وبوت خيارات SPX بإشارات CALL وPUT مباشرة على تيليجرام.",
    images: [{ url: "/img/logo.webp", width: 1200, height: 630, alt: "Ezzo Trading" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezzo | استراتيجية ايزو وبوت EZZO SPX BOT",
    description: "استراتيجية ايزو للفيوتشر والحسابات الممولة وبوت خيارات SPX على تيليجرام.",
    images: ["/img/logo.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={almarai.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://s3.tradingview.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.tradingview-widget.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://s3.tradingview.com" />
        <link rel="dns-prefetch" href="https://www.tradingview-widget.com" />
      </head>
      <body className="font-sans antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
