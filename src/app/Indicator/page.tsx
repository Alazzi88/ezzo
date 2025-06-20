"use client";

import React, { useState, MouseEvent } from "react";
import Header from "@/components/header";
import Image from "next/image";
import FAQs from "@/components/FAQs";

// -----------------------------------------------------------------------------
// بيانات الفيديوهات
// -----------------------------------------------------------------------------

type Video = {
  url: string;
  title: string;
  thumbnail: string;
};

// فيديوهات الشروحات الأساسية
const videos: Video[] = [
  
  {
    url: "https://www.youtube.com/embed/QBeCPM-kwFY?si=2BE5Z_2nOqF0lR3l",
    title: "المؤشر البرو",
    thumbnail: "/img/thumb-pro.webp",
  },
  {
    url: "https://www.youtube.com/embed/DMXkOIfdTtI?si=88GAZv7-jJDpSCNT",
    title: "استراتيجية سباكس",
    thumbnail: "/img/thumb-spx.webp",
  },
];

// فيديو مخصّص لكل قسم
const sectionVideos: Record<
   "pro" | "spx",
  { url: string; title: string; thumbnail: string }
> = {

  pro: {
    url: "https://www.youtube.com/embed/QBeCPM-kwFY?si=2BE5Z_2nOqF0lR3l",
    title: "شرح المؤشر البرو",
    thumbnail: "/img/ezzoind.webp",
  },
  spx: {
    url: "https://www.youtube.com/embed/DMXkOIfdTtI?si=88GAZv7-jJDpSCNT",
    title: "شرح استراتيجية سباكس وناسداك",
    thumbnail: "/img/spx.webp",
  },
};

// -----------------------------------------------------------------------------
// util: تحويل رابط /embed إلى رابط watch?v لليوتيوب
// -----------------------------------------------------------------------------
const toYoutubeWatch = (embedUrl: string) => {
  const id = embedUrl.split("/embed/")[1]?.split("?")[0] ?? "";
  return `https://www.youtube.com/watch?v=${id}`;
};

// -----------------------------------------------------------------------------
// مكوّن بطاقة الفيديو
// -----------------------------------------------------------------------------
type VideoCardProps = {
  url: string;
  title: string;
  thumbnail: string;
};

const VideoCard: React.FC<VideoCardProps> = ({ url, title, thumbnail }) => {
  const [play, setPlay] = useState(false);

  // منع تحوّل البطاقة إلى وضع التشغيل عند الضغط على زر يوتيوب
  const openOnYoutube = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
      onClick={() => setPlay(true)}
    >
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        {/* الفيديو أو الغلاف */}
        <div className="relative w-full h-0 pb-[56.25%]">
          {play ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              src={url}
              title={title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover rounded-xl"
              />
              {/* أيقونة تشغيل */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-16 h-16 text-white/90"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </>
          )}

          {/* زر يفتح المقطع على يوتيوب */}
          <a
            href={toYoutubeWatch(url)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openOnYoutube}
            className="absolute bottom-3 right-3 bg-white/80 backdrop-blur px-3 py-1 rounded-md text-xs font-semibold text-black hover:bg-white transition-colors"
          >
            مشاهدة على يوتيوب
          </a>
        </div>

        {/* العنوان */}
        <div className="p-4">
          <p className="text-orange-500 font-bold text-lg text-center">{title}</p>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// الصفحة الرئيسية للمؤشر (باقي الكود كما هو دون تغيير)
// -----------------------------------------------------------------------------
const Indicator: React.FC = () => (
  <>
    <Header />
    <FAQs />

    {/* الخلفية المتدرجة */}
    <div className="bg-gradient-to-b from-black to-gray-900 py-4 mt-1">
      <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-orange-500 sm:text-5xl transition-transform duration-500 hover:scale-105">
            تعرف على كيفية عمل مؤشراتنا واستراتيجياتنا
          </h1>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* القسم: المؤشر الأساسي (مجاني) */}
        {/* ------------------------------------------------------------------- */}
    
        {/* ------------------------------------------------------------------- */}
        {/* القسم: المؤشر البرو */}
        {/* ------------------------------------------------------------------- */}
        <section className="bg-gray-800 shadow-lg rounded-lg p-8 mb-16 hover:scale-[1.01] hover:shadow-2xl transition-transform duration-500">
          <h2 className="text-2xl font-bold text-orange-400 mb-4 text-center">
            المؤشر <span className="text-orange-500">البرو</span>
          </h2>

          <p className="text-gray-300 mb-6">
            المؤشر البرو مبني على مفاهيم الـ ICT ويجمع بين رصد الفجوات السعرية
            وكتل الأوامر بمختلف أنواعها، بالإضافة إلى اهداف واضحة ووقف خسارة.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
            <VideoCard
              url={sectionVideos.pro.url}
              title={sectionVideos.pro.title}
              thumbnail={sectionVideos.pro.thumbnail}
            />

            <ul className="list-disc pl-6 space-y-3 text-gray-300 leading-relaxed mb-6">
              <li>
                <strong>نقاط الدخول المثالية</strong>
              </li>
              <li>
                <strong>تحديد الأهداف بدقة</strong>
              </li>
              <li>
                <strong>إدارة وقف الخسارة تلقائيًا</strong>
              </li>
              <li>
                <strong>رصد الفجوات السعرية (Fair Value Gaps)</strong>
              </li>
              <li>
                <strong>كشف كتل الأوامر الشرائية والبيعية (Order Blocks)</strong>
              </li>
              <li>
                <strong>
                  كشف كتل الأوامر الشرائية أو البيعية (Breaker Blocks)
                </strong>
              </li>
              <li>
                <strong>الساعات الذهبية</strong>
              </li>
              <li>
                <strong>كشف مناطق السيولة</strong>
              </li>
            </ul>
          </div>

          <div className="flex justify-center mb-8">
            <Image
              src="/img/ezzoind.webp"
              alt="EZZO Pro Indicator Preview"
              width={800}
              height={450}
              className="rounded-lg w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>

        {/* ------------------------------------------------------------------- */}
        {/* القسم: استراتيجية سباكس وناسداك */}
        {/* ------------------------------------------------------------------- */}
        <section className="bg-gray-800 shadow-lg rounded-lg p-8 mb-16 hover:scale-[1.01] hover:shadow-2xl transition-transform duration-500">
          <h3 className="text-xl font-semibold text-orange-500 mb-4 text-center">
            استراتيجية <span className="text-orange-500">سباكس وناسداك</span>
          </h3>

          <p className="text-gray-300 leading-relaxed mb-6">
            تعتمد استراتيجية سباكس وناسداك على مستويات الدعم والمقاومة اليومية
            لتحديد حركة السوق، مع التركيز على مناطق دخول الـ <strong>كول</strong>{" "}
            والـ <strong>بوت</strong> باستخدام مؤشرات ديناميكية، وتحديد الأهداف
            بناءً على نقاط التصحيح واستهداف مستويات السيولة.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <VideoCard
              url={sectionVideos.spx.url}
              title={sectionVideos.spx.title}
              thumbnail={sectionVideos.spx.thumbnail}
            />

            <div className="flex justify-center">
              <Image
                src="/img/spx.webp"
                alt="SPX & NASDAQ Strategy Preview"
                width={800}
                height={450}
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------- */}
        {/* قسم الاشتراكات */}
        {/* ------------------------------------------------------------------- */}
        <section className="container mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold text-orange-500 mb-8 text-center">
            للإشتراك
          </h3>

          <p className="text-gray-300 text-center mb-6">
            يشمل الاشتراك: المؤشر{" "}
            <strong className="text-orange-500">البرو</strong> واستراتيجية{" "}
            <strong className="text-orange-500">سباكس</strong>.
          </p>

          <div className="flex justify-center items-center py-8">
            <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl text-center transition-transform duration-300 hover:-translate-y-1 max-w-md">
              <h4 className="text-3xl font-bold text-orange-400 mb-4">
                عرض لفترة محدودة
              </h4>

              <p className="text-gray-300 text-lg mb-6">
                اشتراك شهري - شهر واحد
              </p>

              <div className="flex flex-col items-center space-y-2 mb-8">
                <p className="text-gray-400 text-sm">السعر السابق</p>
                <p className="text-gray-400 text-2xl line-through">249﷼</p>
                <p className="text-orange-400 text-3xl font-extrabold">199﷼</p>
              </div>

              <a
                href="https://3zzo.aryaf.sa/product/%D9%85%D8%A4%D8%B4%D8%B1-%D9%84%D9%84%D8%AA%D8%AF%D8%A7%D9%88%D9%84"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-orange-500 text-black rounded-full shadow-md hover:bg-orange-400 transition-colors duration-300"
              >
                اشترك الآن
              </a>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg shadow-lg text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <a
              href="https://3zzo.aryaf.sa/"
              className="inline-block px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg shadow hover:bg-gray-100 transition-colors duration-300"
            >
              اكتشف المزيد
            </a>
          </div>
        </section>
      </div>
    </div>
  </>
);

export default Indicator;
