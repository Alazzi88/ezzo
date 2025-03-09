"use client";

import React from "react";
import Header from "@/components/header";
import Image from "next/image";
import FAQs from "@/components/FAQs";

// فيديوهات الشروحات الأساسية
const videos = [
  {
    url: "https://www.youtube.com/embed/bVdBpeHcF80?si=-PhaLr0T1lgf_uY-",
    title: "الشرح الاول",
  },
  {
    url: "https://www.youtube.com/embed/DMXkOIfdTtI?si=JgH4vC4QzNCDEM1r",
    title: "الشرح الثاني",
  },
  {
    url: "https://www.youtube.com/embed/IWymWx4kYs0?si=2zHXkwnIpjbt172G",
    title: "الشرح الثالث",
  },
];

const Indicator: React.FC = () => {
  return (
    <>
      {/* هيدر الموقع */}
      <Header />

      {/* قسم الأسئلة الشائعة */}
      <FAQs />

      <div className="bg-gradient-to-b from-black to-gray-900 py-12 mt-12">
        <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* قسم العنوان والوصف */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-orange-500 sm:text-5xl transition-transform duration-500 hover:scale-105">
              تعرف على كيفية عمل مؤشرنا
            </h1>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              مؤشرنا يعتمد على تقنيات حديثة لتقديم حلول متقدمة لتحليل الأسواق.
              يوفر أدوات قوية لمساعدتك على اتخاذ قرارات استثمارية دقيقة.
            </p>
          </div>

          {/* قسم الفيديوهات الأساسية */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
              شروحات أساسية حول المؤشر
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                    <div className="relative w-full h-0 pb-[56.25%]">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                        src={video.url}
                        title={video.title}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    {/* تعديل bottom-0 إلى bottom-12 */}
                    <div className="absolute bottom-12 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-orange-500 font-bold text-lg">
                        {video.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* قسم الفيديوهات المتقدمة - (مُعطل في الوقت الحالي) */}
          {/*
            <div className="mb-16">
              ... أي كود للفيديوهات المتقدمة إن رغبت بتفعيله لاحقًا ...
            </div>
          */}

          {/* قسم المميزات */}
          <div className="bg-gray-800 shadow-lg rounded-lg p-8 mb-16 transition-transform duration-500 hover:scale-[1.01] hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              أبرز مميزات مؤشرنا
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="list-disc pl-6 space-y-4 text-gray-300 leading-relaxed">
                <li>
                  <strong className="text-orange-400">الدعوم والمقاومات:</strong>{" "}
                  تحديد مستويات الدعم والمقاومة الرئيسية لمساعدتك في اتخاذ قرارات
                  البيع والشراء.
                </li>
                <li>
                  <strong className="text-orange-400">تحديد الاتجاهات:</strong>{" "}
                  معرفة الاتجاه العام للسوق بناءً على بيانات دقيقة.
                </li>
                <li>
                  <strong className="text-orange-400">مناطق الشراء والبيع:</strong>{" "}
                  إظهار أفضل المناطق لدخول وخروج الصفقات.
                </li>
              </ul>
              <ul className="list-disc pl-6 space-y-4 text-gray-300 leading-relaxed">
                <li>
                  <strong className="text-orange-400">مناطق العرض والطلب:</strong>{" "}
                  الكشف عن المناطق الحرجة للنشاط السعري.
                </li>
                <li>
                  <strong className="text-orange-400">الساعات الذهبية:</strong>{" "}
                  إشعارات حول أفضل الأوقات لدخول السوق.
                </li>
              </ul>
            </div>
            <p className="mt-6 text-gray-400">
              هذه المميزات تجعل المؤشر أداة لا غنى عنها لدعم تحليلاتك الفنية
              واتخاذ قرارات استثمارية مدروسة.
            </p>
          </div>

          {/* قسم عرض صورة المؤشر الرئيسي */}
          <div className="flex justify-center mb-16">
            <div className="relative overflow-hidden rounded-lg transition-transform duration-500 hover:scale-105 hover:shadow-2xl max-w-full">
              <Image
                src="/img/indic.webp"
                alt="Indicator Preview"
                width={800}
                height={450}
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* قسم الاشتراكات */}
          <div className="container mx-auto px-4 py-8">
            <h3 className="text-2xl font-bold text-orange-500 mb-8 text-center">
              اختر خطتك المناسبة
            </h3>

            <div className="flex justify-center items-center py-8">
  <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl text-center transition-transform duration-300 hover:-translate-y-1 max-w-md">
    <h4 className="text-3xl font-bold text-orange-400 mb-4">عرض رمضان</h4>
    <p className="text-gray-300 text-lg mb-6">اشترك الشهري - شهر واحد</p>
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
                className="mt-6 inline-block px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg shadow hover:bg-gray-100 transition-colors duration-300"
              >
                اكتشف المزيد
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Indicator;
