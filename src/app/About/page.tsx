import products, { Product } from '@/app/products';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  return (
    <div className="relative isolate pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-[-18%] h-80 w-80 rounded-full bg-orange-500/20 blur-[160px]" />
        <div className="absolute bottom-[-25%] right-[12%] h-[420px] w-[420px] rounded-full bg-rose-500/18 blur-[200px]" />
      </div>

      <section className="page-shell text-center">
        <Image
          src="/img/logo.webp"
          alt="شعار Ezzo"
          width={72}
          height={72}
          className="mx-auto h-16 w-16 rounded-full border border-white/10"
          loading="lazy"
        />
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">حلول برمجية واستثمارية لصناعة التداول</h1>
        <p className="section-subheading mx-auto max-w-3xl">
          Ezzo يجمع بين الخبرة البرمجية ومهارات التداول لتقديم أدوات متقدمة، استراتيجيات ذكية، ومحتوى تدريبي يواكب متطلبات المتداولين في الفيوتشر والحسابات الممولة.
        </p>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="section-heading text-center">أعمال برمجية مختارة</h2>
          <p className="section-subheading mx-auto max-w-3xl text-center">
            مكتبة المشاريع البرمجية تعكس قدراتنا على تصميم أنظمة احترافية تدعم المتداولين بالأدوات المناسبة في كل مرحلة.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product: Product) => (
              <div key={product.id} className="gradient-card overflow-hidden">
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    src={product.imageLink}
                    title={product.title}
                    className="absolute inset-0 h-full w-full rounded-3xl border border-white/10"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6 text-right">
                  <h3 className="text-lg font-semibold text-orange-300">{product.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    تجربة رقمية مصممة بدقة لرفع كفاءة إدارة الأعمال أو التداول.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
