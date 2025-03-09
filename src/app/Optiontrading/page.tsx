'use client'

import React from 'react';
import Image from 'next/image';
import OptionDeltaCalculator from '@/components/OptionDeltaCalculator';
import TelegramButton from '@/components/TelegramButton';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans mt-20 ">
      <header className="text-center border-b border-orange-600 py-4">
        <h1 className="text-xl md:text-4xl font-extrabold text-orange-500 mb-4 leading-normal">
          دليلك إلى الأوبشن الأمريكي
        </h1>
        <p className="text-xs md:text-base text-gray-300 px-2 md:px-4 max-w-2xl mx-auto leading-loose">
          استكشف الأوبشن الأمريكي، كيفية تداوله، الاستراتيجيات الفعالة، والمخاطر المحتملة لتحقيق أقصى استفادة من استثمارك.
        </p>
      </header>

      <main className="mx-auto px-4 py-4 md:py-8  leading-loose max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl ">
        {/* إضافة الصورة */}
        <section className="my-6 md:my-10 text-center">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/img/trading.webp"
              alt="صورة تعبيرية للتداول بالأوبشن"
              fill
              style={{ objectFit: 'cover' }}
              priority={true}
            />
          </div>
        </section>

        {/* مفهوم الأوبشن */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">ما هو الأوبشن؟</h2>
          <p className="text-gray-300 text-xs md:text-base mb-4">
            الأوبشن هو عقد مالي مشتق يمنح المشتري الحق، ولكن ليس الالتزام، في شراء أو بيع أصل أساسي مثل
            الأسهم أو المؤشرات بسعر محدد (Strike Price) خلال فترة زمنية معينة. ينقسم الأوبشن إلى نوعين رئيسيين:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-xs md:text-base space-y-2 mb-4">
            <li>
              <strong className="text-orange-400">Call Option (خيار الشراء):</strong> يمنح المشتري الحق في شراء
              الأصل الأساسي بسعر محدد قبل أو عند تاريخ الانتهاء.
            </li>
            <li>
              <strong className="text-orange-400">Put Option (خيار البيع):</strong> يمنح المشتري الحق في بيع
              الأصل الأساسي بسعر محدد قبل أو عند تاريخ الانتهاء.
            </li>
          </ul>
          <p className="text-gray-300 text-xs md:text-base">
            الأوبشن أداة مرنة تُستخدم لأغراض متعددة مثل المضاربة، التحوط، وتوليد الدخل من خلال الاستراتيجيات المختلفة.
          </p>
        </section>

        {/* أمثلة الربح والخسارة */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">أمثلة على الربح والخسارة في الأوبشن</h2>

          <div className="p-4 border border-orange-500 rounded mb-6">
            <h3 className="text-base md:text-xl text-orange-400 font-semibold mb-2">مثال على Call Option</h3>
            <p className="text-gray-300 text-xs md:text-base mb-2">
              <strong>سعر السهم الحالي:</strong> 100 دولار<br/>
              <strong>Strike Price:</strong> 105 دولار<br/>
              <strong>Premium (القسط):</strong> 2 دولار
            </p>
            <ul className="list-disc list-inside text-gray-300 text-xs md:text-base space-y-2">
              <li>إذا ارتفع سعر السهم إلى 110 دولار: الربح = (110 - 105) - 2 = 3 دولارات.</li>
              <li>إذا لم يتجاوز سعر السهم 105 دولار: الخسارة = 2 دولار (قيمة القسط).</li>
            </ul>
          </div>

          <div className="p-4 border border-orange-500 rounded">
            <h3 className="text-base md:text-xl text-orange-400 font-semibold mb-2">مثال على Put Option</h3>
            <p className="text-gray-300 text-xs md:text-base mb-2">
              <strong>سعر السهم الحالي:</strong> 100 دولار<br/>
              <strong>Strike Price:</strong> 95 دولار<br/>
              <strong>Premium (القسط):</strong> 1.5 دولار
            </p>
            <ul className="list-disc list-inside text-gray-300 text-xs md:text-base space-y-2">
              <li>إذا انخفض سعر السهم إلى 90 دولار: الربح = (95 - 90) - 1.5 = 3.5 دولارات.</li>
              <li>إذا لم ينخفض سعر السهم تحت 95 دولار: الخسارة = 1.5 دولار (قيمة القسط).</li>
            </ul>
          </div>
        </section>

        {/* Delta */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">Delta (دلتا)</h2>
          <p className="text-gray-300 text-xs md:text-base mb-2">
            <strong>Delta</strong> تقيس التغير في سعر الأوبشن بالنسبة لتغير سعر الأصل الأساسي بمقدار دولار واحد.
          </p>
          <p className="text-gray-400 text-xs md:text-sm">
            <strong>مثال:</strong> إذا كان لديك Call Option مع Delta تساوي 0.6، فهذا يعني أن سعر الأوبشن سيرتفع
            بمقدار 0.6 دولار لكل دولار يزيد في سعر الأصل الأساسي.
          </p>
        </section>

        {/* Theta */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">Theta (ثيتا)</h2>
          <p className="text-gray-300 text-xs md:text-base mb-2">
            <strong>Theta</strong> تقيس مقدار التناقص في قيمة الأوبشن يوميًا بسبب مرور الوقت (Time Decay).
          </p>
          <p className="text-gray-400 text-xs md:text-sm">
            <strong>مثال:</strong> إذا كان Theta يساوي -0.05، فهذا يعني أن قيمة الأوبشن ستنخفض بمقدار 0.05
            دولار يوميًا مع مرور الوقت، إذا بقيت العوامل الأخرى ثابتة.
          </p>
        </section>

        {/* Implied Volatility */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">Implied Volatility (التقلب الضمني)</h2>
          <p className="text-gray-300 text-xs md:text-base mb-4">
            <strong>Implied Volatility (IV)</strong> هو تقدير السوق لمدى تقلب سعر الأصل الأساسي في المستقبل.
            يعكس التقلب الضمني توقعات المستثمرين بشأن حركة السعر المحتملة ويؤثر بشكل مباشر على سعر الأوبشن.
          </p>
          <ul className="list-disc list-inside text-gray-300 text-xs md:text-base space-y-2 mb-4">
            <li><strong className="text-orange-400">تقلب ضمني مرتفع:</strong> توقعات بتقلبات كبيرة، مما يؤدي إلى ارتفاع قسط الأوبشن.</li>
            <li><strong className="text-orange-400">تقلب ضمني منخفض:</strong> توقعات باستقرار السعر، مما يؤدي إلى انخفاض قسط الأوبشن.</li>
          </ul>
          <p className="text-gray-300 text-xs md:text-base">
            فهم <strong>Implied Volatility</strong> يساعدك في تحديد ما إذا كان سعر الأوبشن مبالغًا فيه أو مقيمًا بأقل من قيمته.
          </p>
        </section>

        {/* استراتيجيات التداول */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">استراتيجيات تداول الأوبشن</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-orange-500 rounded bg-black/50">
              <h3 className="text-base md:text-xl text-orange-400 font-semibold mb-2">1. استراتيجية Covered Call</h3>
              <p className="text-gray-300 text-xs md:text-base">
                تعتمد هذه الاستراتيجية على امتلاك أسهم وبيع Call Option لتحصيل قسط إضافي.
              </p>
            </div>

            <div className="p-4 border border-orange-500 rounded bg-black/50">
              <h3 className="text-base md:text-xl text-orange-400 font-semibold mb-2">2. استراتيجية Protective Put</h3>
              <p className="text-gray-300 text-xs md:text-base">
                تُستخدم للتحوّط ضد الخسائر المحتملة في الأسهم.
              </p>
            </div>

            <div className="p-4 border border-orange-500 rounded bg-black/50">
              <h3 className="text-base md:text-xl text-orange-400 font-semibold mb-2">3. استراتيجية Iron Condor</h3>
              <p className="text-gray-300 text-xs md:text-base">
                تجمع بين بيع وشراء Call وPut في وقت واحد لتحقيق ربح عند تذبذب منخفض.
              </p>
            </div>

            <div className="p-4 border border-orange-500 rounded bg-black/50">
              <h3 className="text-base md:text-xl text-orange-400 font-semibold mb-2">4. استراتيجية Straddle</h3>
              <p className="text-gray-300 text-xs md:text-base">
                شراء Call وPut بنفس السعر المستهدف وتاريخ الانتهاء، للمضاربة على حركة سعرية كبيرة.
              </p>
            </div>
          </div>
        </section>

        {/* كيفية تحقيق الربح */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">كيفية تحقيق الربح من عقود الأوبشن</h2>
          <p className="text-gray-300 text-xs md:text-base mb-4">
            لتحقيق الربح، يجب أن تتحرك الأسعار حسب توقعاتك قبل انتهاء صلاحية العقد:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-xs md:text-base space-y-2">
            <li><strong className="text-orange-400">Call Options:</strong> الربح إذا ارتفع سعر الأصل فوق Strike Price + القسط.</li>
            <li><strong className="text-orange-400">Put Options:</strong> الربح إذا انخفض سعر الأصل تحت Strike Price - القسط.</li>
            <li>الاستفادة من التقلبات باستراتيجيات مثل Straddle وStrangle.</li>
          </ul>
        </section>

        {/* إدارة المخاطر واختيار Strike Price */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">إدارة المخاطر واختيار Strike Price المناسب</h2>
          <p className="text-gray-300 text-xs md:text-base mb-4">
            عند اختيار Strike Price:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-xs md:text-base space-y-2">
            <li>At-The-Money (ATM) لحركة سعرية معتدلة.</li>
            <li>In-The-Money (ITM) لتقليل المخاطر وزيادة احتمالية الربح.</li>
            <li>Out-Of-The-Money (OTM) لحركات سعرية كبيرة وبأقل قسط.</li>
            <li>استخدم Protective Put لحماية الاستثمارات.</li>
          </ul>
        </section>

        {/* حاسبة الدلتا */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">حاسبة دلتا الأوبشن</h2>
          <div className="p-4 bg-black/50 rounded border border-orange-500">
            <OptionDeltaCalculator />
          </div>
        </section>

        {/* المنصات المعتمدة */}
        <section className="my-6 md:my-10">
          <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">المنصات المعتمدة في السعودية لتداول الأوبشن الأمريكي</h2>
          <ul className="list-disc list-inside text-gray-300 text-xs md:text-base space-y-2">
            <li><strong className="text-orange-400">دراية جلوبال (Derayah Global):</strong> وصول للأسواق العالمية ودعم بالعربية.</li>
            <li><strong className="text-orange-400">منصة سهم:</strong> منصة معتمدة محليًا لسهولة تداول الأوبشن.</li>
          </ul>
        </section>

        {/* دعوة للمبتدئين + زر التيليجرام */}
        <section className="my-6 md:my-10 text-center">
          <p className="text-xs md:text-base text-gray-300 mb-4">
            إذا كنت مبتدئًا، يمكنك زيارة قناتنا الرسمية على تليجرام
          </p>
          <a
            href="https://t.me/ezzo_options"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-orange-500 font-bold hover:text-orange-400 transition-colors"
          >
            <TelegramButton />
          </a>
        </section>

        {/* شروحات بالفيديو للمبتدئين */}
      {/* شروحات بالفيديو للمبتدئين */}
<section className="my-6 md:my-10">
  <h2 className="text-lg md:text-2xl font-bold text-orange-500 mb-4">شروحات للمبتدئين</h2>
  <p className="text-gray-300 text-xs md:text-base mb-4">
    فيما يلي بعض الفيديوهات التعليمية التي تشرح مبادئ الأوبشن للمبتدئين.
  </p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* الفيديو 1 */}
    <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/C--tTWoqr4I?si=SUM2ssJkjQx441Bq"
            title="كيفية فتح حساب جديد في دراية"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {/* شريط العنوان السفلي مع تعديل bottom */}
        <div className="absolute bottom-12 left-0 w-full p-4 bg-black/80">
          <p className="text-orange-500 font-bold text-lg">
            كيفية فتح حساب جديد في دراية
          </p>
        </div>
      </div>
    </div>

    {/* الفيديو 2 */}
    <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/CRtCKG0WGzg?si=IvtLfk9wsLRnuxG1"
            title="كيفية فتح حساب دراية جلوبال"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute bottom-12 left-0 w-full p-4 bg-black/80">
          <p className="text-orange-500 font-bold text-lg">
            كيفية فتح حساب دراية جلوبال
          </p>
        </div>
      </div>
    </div>

    {/* الفيديو 3 */}
    <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/nYTo6aSIUZ4?si=lv9WGI13TJN-EbT_"
            title="فتح حساب تجريبي في دراية جلوبال"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute bottom-12 left-0 w-full p-4 bg-black/80">
          <p className="text-orange-500 font-bold text-lg">
            فتح حساب تجريبي في دراية جلوبال
          </p>
        </div>
      </div>
    </div>

    {/* الفيديو 4 */}
    <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/ALnlQhRK2x4?si=f68cRbI0WeIduNTi"
            title="ايداع وسحب الاموال"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute bottom-12 left-0 w-full p-4 bg-black/80">
          <p className="text-orange-500 font-bold text-lg">
            ايداع وسحب الاموال
          </p>
        </div>
      </div>
    </div>

    {/* الفيديو 5 */}
    <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/r5oLATw58LY?si=X_qAThf2rFsGd8PU"
            title="طريقة تفعيل الأسعار المباشرة"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute bottom-12 left-0 w-full p-4 bg-black/80">
          <p className="text-orange-500 font-bold text-lg">
            طريقة تفعيل الأسعار المباشرة
          </p>
        </div>
      </div>
    </div>

    {/* الفيديو 6 */}
    <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/6nY_wWcwLbI?si=YVzpld2OvUeXMYV_"
            title="دخول صفقة والخروج منها واوامر دراية"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute bottom-12 left-0 w-full p-4 bg-black/80">
          <p className="text-orange-500 font-bold text-lg">
            دخول صفقة والخروج منها واوامر دراية
          </p>
        </div>
      </div>
    </div>

    {/* الفيديو 7 */}
    <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/MjPDWqQHn-U?si=26JFH6hQJPfiRLLJ"
            title="مفهوم الاوبشن الامريكي"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute bottom-12 left-0 w-full p-4 bg-black/80">
          <p className="text-orange-500 font-bold text-lg">
            مفهوم الاوبشن الامريكي
          </p>
        </div>
      </div>
    </div>

    {/* الفيديو 8 */}
    <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative w-full h-0 pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/nYDU9gTBcJo?si=TwiQhUdgC2vhx7sY"
            title="شرح ودخول صفقات في تطبيق webull والاستفاده منه"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="absolute bottom-12 left-0 w-full p-4 bg-black/80">
          <p className="text-orange-500 font-bold text-lg">
            شرح ودخول صفقات في تطبيق webull والاستفاده منه
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      </main>
    </div>
  );
};

export default HomePage;
