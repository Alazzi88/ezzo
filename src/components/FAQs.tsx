// components/FAQs.tsx
"use client"

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: React.ReactNode; // يتيح استخدام JSX بدلاً من النص فقط
}

const FAQs: React.FC = () => {
  // مصفوفة الأسئلة والأجوبة
  const faqData: FAQItem[] = [
    {
      question: "كيفية الإشتراك باستراتيجية ايزو؟",
      answer: (
        <>
          يمكنك الاشتراك من خلال متجرنا{" "}
          <a
            href="https://3zzo.aryaf.sa/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 underline"
          >
            3zzo.aryaf.sa
          </a>{" "}
          أو التواصل مع الدعم الفني في حال واجهت أي مشكلة أثناء الاشتراك.
        </>
      ),
    },
    {
      question: "هل يوجد شرح لاستراتيجية ايزو من الصفر؟",
      answer:
        'نعم، نوفر شروحات مفصلة للمبتدئين بخطوات واضحة من البداية حتى الاحتراف، ويمكنك الاطلاع عليها عبر مكتبة الفيديوهات في الموقع أو طلب توجيه من فريق الدعم.',
    },
    {
      question: "هل استراتيجية ايزو تحقق نجاحًا بنسبة 100%؟",
      answer:
        "لا توجد استراتيجية تحقق نتائج مضمونة 100%، فجميع الأدوات التحليلية معرضة للأخطاء والتقلبات السوقية. استراتيجية ايزو ترفع من احتمالية النجاح لكنها لا تضمنه بشكل مطلق.",
    },
    {
      question: "هل استراتيجية ايزو تعمل على الهاتف والكمبيوتر؟",
      answer:
        "نعم، تعمل الاستراتيجية على أجهزة الهاتف والكمبيوتر بسلاسة، ويمكنك استخدامها عبر متصفحات الويب أو تطبيقات التداول الداعمة.",
    },
    {
      question: "هل هي مناسبة لجميع الأسواق؟",
      answer: "نعم",
    },
    {
      question: "ما الفريم الزمني الأنسب لاستخدام الاستراتيجية؟",
      answer:
        "تعمل استراتيجية ايزو على مختلف الفريمات الزمنية (مثل الدقيقة، 5 دقائق، 15 دقيقة...). اختيار الفريم المناسب يعتمد على أسلوبك في التداول، فإذا كنت مضاربًا قصير الأجل قد يناسبك فريم الدقيقة أو الـ 5 دقائق، بينما يُفضّل فريم الـ 15 دقيقة للمتداولين متوسطي الأجل.",
    },
    {
      question: "هل توفر الاستراتيجية إشارات بيع وشراء مباشرة؟",
      answer:
        "الاستراتيجية تقدم مناطق دخول وخروج محتملة بناءً على معطيات تحليلية، لكنها ليست روبوتًا للتداول التلقائي. تبقى قرارات الشراء والبيع مسؤوليتك بناءً على استراتيجيتك الخاصة.",
    },
    {
      question: "هل يتوفر دعم فني أو تحديثات مستقبلية للاستراتيجية؟",
      answer:
        "نعم، يتوفر دعم فني للمشتركين في الاستراتيجية، كما نقدم تحديثات دورية للتحسين وإضافة مزايا جديدة بشكل مجاني للمشتركين الحاليين.",
    },
  ];

  // الحالة لتتبع السؤال المفتوح حاليًا
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // دالة التبديل لفتح/إغلاق الأسئلة
  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div dir="rtl" className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-16">
      <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">
        الأسئلة المتكررة
      </h2>

      {faqData.map((faq, index) => (
        <div key={index} className="border-b border-gray-700 py-4">
          {/* رأس السؤال */}
          <button
            onClick={() => toggleFAQ(index)}
            className="faq-question flex justify-between items-center w-full text-left focus:outline-none"
          >
            <h3 className="text-lg font-medium text-gray-200 hover:text-orange-400 transition-colors duration-300">
              {faq.question}
            </h3>
            {/* أيقونة السهم مع الدوران */}
            <svg
              className={`w-5 h-5 text-orange-500 transform transition-transform duration-700 ${openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* نص الإجابة مع أنيميشن التوسّع والانكماش */}
          <div
            className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${openIndex === index ? "max-h-96" : "max-h-0"
              }`}
          >
            <p className="mt-3 text-gray-400 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
