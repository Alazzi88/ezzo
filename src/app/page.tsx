import type { Metadata } from "next";
import Welcome from "@/components/welcome";

const SITE = "https://3zzo.com";

export const metadata: Metadata = {
  title: { absolute: "Ezzo | استراتيجية ايزو وبوت EZZO SPX BOT للفيوتشر والخيارات" },
  alternates: { canonical: "/" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "Ezzo Trading",
      alternateName: ["Ezzo", "ايزو", "3zzo"],
      url: SITE,
      logo: `${SITE}/img/logo.webp`,
      sameAs: ["https://t.me/ezzo_trading", "https://www.snapchat.com/add/ezzo.com"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Ezzo",
      inLanguage: "ar",
      publisher: { "@id": `${SITE}/#org` },
    },
    {
      "@type": "ItemList",
      name: "خدمات Ezzo",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Product",
            name: "استراتيجية ايزو",
            url: `${SITE}/Indicator`,
            image: `${SITE}/img/ezzoind.webp`,
            description: "استراتيجية فنية لأسواق الفيوتشر والحسابات الممولة بنقاط دخول وخروج محسوبة وتنبيهات لحظية على TradingView.",
            brand: { "@type": "Brand", name: "Ezzo" },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Product",
            name: "بوت خيارات EZZO SPX BOT",
            url: `${SITE}/Options`,
            image: `${SITE}/img/bot.webp`,
            description: "بوت تيليجرام يرسل إشارات CALL وPUT لعقود خيارات SPX مع سعر الدخول وهدف الربح.",
            brand: { "@type": "Brand", name: "Ezzo" },
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Welcome />
    </>
  );
}
