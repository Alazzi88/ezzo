'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTelegramPlane, FaTiktok, FaSnapchatGhost } from 'react-icons/fa';
import Advertisement from './Advertisement';
import TradingViewWidget from './TradingViewWidget';
/**
 * Inline ProductCard component to avoid a missing-module error for './ProductCard'
 * Props: img, title, description, link, linkText
 */
type ProductCardProps = {
  img: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ img, title, description, link, linkText }) => {
  const isExternal = link ? /^https?:\/\//.test(link) : false;

  const cardContent = (
    <div className="flex flex-col items-center text-center bg-gradient-to-b from-orange-900/90 to-black/90 rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300 animate-fade-in">
      <Image
        src={img}
        alt={title}
        width={180}
        height={120}
        loading="lazy"
        className="rounded-lg shadow mb-4 border-0 animate-float"
      />
      <h3 className="mt-2 text-2xl font-bold text-orange-400 drop-shadow mb-2 animate-gradient-text">
        {title.replace('الأوبشن', 'الفيوتشر والحسابات الممولة')}
      </h3>
      <p className="mt-2 text-gray-200 text-base leading-relaxed animate-fade-in">
        {description.replace('تداول', 'تداول الفيوتشر والحسابات الممولة')}
      </p>
      {link && linkText && (
        <div className="mt-6">
          <Link
            href={link}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-block px-5 py-2 mt-4 text-sm font-semibold text-black bg-orange-500 rounded-md hover:bg-orange-600 hover:text-white transition"
          >
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );

  return cardContent;
};

const AnimatedCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 700; // نهاية العد
    const duration = 2000; // مدة التحريك بالملّي ثانية (مثلاً 2 ثانية)
    const intervalTime = duration / target; // زمن كل زيادة
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < target) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-black rounded-xl shadow-lg p-8 flex flex-col items-center justify-center">
      <p className="text-3xl font-bold text-white">أكثر من</p>
      <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
        {count}
      </p>
      <p className="text-2xl font-medium text-gray-200 mt-2">عميل يثق فينا</p>
    </div>
  );
};

const Welcome: React.FC = () => {
  const features = [
    {
      img: '/img/trading-analysis.webp',
      title: 'مزايا تداول الفيوتشر',
      description: 'تداول الفيوتشر يتيح لك الاستفادة من تقلبات الأسواق المالية، إمكانية تحقيق أرباح في الصعود والهبوط، رافعة مالية عالية، سيولة مرتفعة، وشفافية في الأسعار. يمكنك إدارة المخاطر بمرونة وتنفيذ استراتيجيات متنوعة لتحقيق أهدافك الاستثمارية.'
    },
    {
      img: '/img/ezzoind.webp',
      title: 'مزايا الحسابات الممولة',
      description: 'الحسابات الممولة تمنحك فرصة التداول برأس مال أكبر دون مخاطرة أموالك الخاصة، مع إمكانية الحصول على أرباح مجزية، دعم تعليمي واحترافي، اختبارات تقييم شفافة، وسحب أرباح مرن. مثالية للمتداولين الطموحين الباحثين عن تطوير مهاراتهم وزيادة دخلهم.'
    },
    {
      img: '/img/stop.webp',
      title: 'إدارة المخاطر الذكية',
      description: 'سواء في الفيوتشر أو الحسابات الممولة، يمكنك تطبيق خطط إدارة مخاطر متقدمة، تحديد وقف الخسارة وجني الأرباح، التحكم في حجم العقود، والالتزام بقواعد رأس المال للحفاظ على استمرارية النجاح وتقليل الخسائر.'
    },
  ];

  return (
    <div className="relative bg-cover bg-center">
      <Advertisement />

      {/* قسم الثقة مع العداد المتحرك */}
      <div className="relative z-10 mx-auto mt-10 max-w-7xl px-6 lg:px-8">
        <AnimatedCounter />
      </div>

      {/* كروت المنتجات الرئيسية */}
      <div className="relative z-10 mx-auto mt-8 max-w-4xl px-6 flex flex-col gap-6 md:flex-row md:justify-center animate-fade-in">
        {/* كارد المؤشر */}
        <ProductCard
          img="/img/ezzoind.webp"
          title="مؤشر التداول اللحظي"
          description="احصل على إشارات تداول دقيقة لحظياً مع مؤشر إيزو المطور خصيصاً للفيوتشر والحسابات الممولة."
          link="/Indicator"
          linkText="تفاصيل المؤشر"
        />
        {/* كارد الدورة */}
        <ProductCard
          img="/img/trading-analysis.webp"
          title="دورة التحليل الفني والفيوتشر"
          description="تعلم التحليل الفني واحتراف تداول الفيوتشر مع دورة شاملة من الصفر للاحتراف."
          link="https://3zzo.aryaf.sa/rsp/6c0a72cd-af62-4d03-a50d-1638f163cd26"
          linkText="تفاصيل الدورة"
        />
      </div>

      <main className="relative isolate">
        {/* خلفية التدرج */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-orange-900" />

        {/* قسم العنوان */}
        <div className="relative z-10 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center pt-10">
            <h1 className="text-2xl mt-10 sm:text-5xl font-extrabold tracking-tight text-orange-500">
              تداول الفيوتشر و الحسابات الممولة باحترافية
            </h1>
            <p className="mt-8 text-lg sm:text-xl font-medium text-gray-300">
              اكتشف فرصًا غير محدودة لتحقيق النجاح المالي. مع الفيوتشر والحسابات الممولة، تستطيع استخدام استراتيجيات مرنة لتحقيق أهدافك بذكاء.
            </p>
          </div>
        </div>

        {/* قسم المحتوى */}
        <section className="relative z-10 mx-auto mt-20 max-w-5xl px-4 sm:px-6 lg:px-12">
          <div className="mb-12 flex flex-col items-center justify-center">
            {/* TradingViewWidget: شارت متقدم ناسداك */}
            <div className="w-full rounded-3xl shadow-2xl bg-black/80 p-0 mb-10 mx-auto animate-fade-in" style={{height: 700, maxWidth: '90vw'}}>
              <TradingViewWidget />
            </div>
          </div>
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-orange-400 drop-shadow-lg mb-4 animate-gradient-text">
              لماذا تختار الفيوتشر والحسابات الممولة؟
            </h2>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              يوفر التداول بالفيوتشر والحسابات الممولة مرونة وابتكارًا يسمح لك بالاستفادة من تقلبات السوق مع إدارة مخاطر محسوبة لتحقيق عوائد مميزة.
            </p>
          </div>

          {/* قسم الميزات */}
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ img, title, description }, idx) => (
              <div key={idx} className="flex flex-col items-center text-center bg-gradient-to-b from-orange-900/90 to-black/90 rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300 animate-fade-in">
                <Image
                  src={img}
                  alt={title}
                  width={180}
                  height={120}
                  loading="lazy"
                  className="rounded-lg shadow mb-4 border-0 animate-float"
                />
                <h3 className="mt-2 text-2xl font-bold text-orange-400 drop-shadow mb-2 animate-gradient-text">{title.replace('الأوبشن', 'الفيوتشر والحسابات الممولة')}</h3>
                <p className="mt-2 text-gray-200 text-base leading-relaxed animate-fade-in">{description.replace('تداول', 'تداول الفيوتشر والحسابات الممولة')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* قسم الدعوة لاتخاذ إجراء */}
        <div className="relative isolate mt-32 sm:mt-40">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto flex flex-col gap-16 bg-gradient-to-r from-orange-600 to-black px-6 py-16 ring-1 ring-orange-500 sm:rounded-3xl sm:p-8 lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
              <Image
                alt="ابدأ الآن"
                src="/img/money.webp"
                width={400}
                height={300}
                loading="lazy"
                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:max-w-sm"
              />
              <div className="w-full">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  ابدأ الآن رحلتك في عالم الفيوتشر والحسابات الممولة
                </h2>
                <p className="mt-6 text-lg text-gray-300">
                  انضم إلى محترفي الفيوتشر والحسابات الممولة اليوم وابدأ بتحقيق أهدافك المالية بخطوات مدروسة وآمنة.
                </p>
                <div className="mt-10">
                  <Link
                    href="https://t.me/ezzo_options"
                    target="_blank"
                    className="inline-block px-6 py-3 text-lg font-bold text-black bg-orange-500 rounded-md hover:bg-orange-600 hover:text-white transition"
                  >
                    انضم الآن
                  </Link>
                </div>

                {/* بوت التداول تلجرام */}
                <div className="mt-10 text-center">
                  <h3 className="text-2xl font-semibold text-orange-400 mb-4">
                  🤖بوت مؤشر إيزو اللحظية⚡
                  </h3>
                  <div className="flex justify-center">
                    <Link href="https://t.me/Ezzochartbot" target="_blank">
                      <div className="p-3 bg-blue-500 rounded-full hover:scale-110 transition-transform">
                        <FaTelegramPlane size={32} className="text-white" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
