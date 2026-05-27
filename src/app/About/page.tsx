import products, { Product } from '@/app/products';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionComponents';

const AboutPage: React.FC = () => {
  return (
    <div className="relative isolate pb-24 pt-12">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-[-10%] h-96 w-96 rounded-full blur-[150px]" style={{ background: 'rgba(212,132,90,0.08)' }} />
        <div className="absolute bottom-[-10%] right-[12%] h-[420px] w-[420px] rounded-full blur-[170px]" style={{ background: 'rgba(201,168,76,0.05)' }} />
      </div>

      <section className="page-shell text-center">
        <FadeIn direction="up">
          <div className="relative mx-auto h-20 w-20 rounded-full p-1" style={{ border: '1px solid rgba(212,132,90,0.28)', background: 'rgba(13,11,9,0.5)', boxShadow: '0 0 30px rgba(212,132,90,0.15)' }}>
            <Image
              src="/img/logo.webp"
              alt="شعار Ezzo"
              width={80}
              height={80}
              className="h-full w-full rounded-full object-cover"
              loading="lazy"
            />
          </div>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl" style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            حلول برمجية واستثمارية لصناعة التداول
          </h1>
          <p className="section-subheading mx-auto max-w-3xl text-gray-400 mt-5">
            Ezzo يجمع بين الخبرة البرمجية ومهارات التداول لتقديم أدوات متقدمة، استراتيجيات ذكية، ومحتوى تدريبي يواكب متطلبات المتداولين في الفيوتشر والحسابات الممولة.
          </p>
        </FadeIn>
      </section>

      <section className="page-shell mt-16">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <FadeIn direction="up">
            <h2 className="section-heading text-center">أعمال برمجية مختارة</h2>
            <p className="section-subheading mx-auto max-w-3xl text-center text-gray-400 mt-2">
              مكتبة المشاريع البرمجية تعكس قدراتنا على تصميم أنظمة احترافية تدعم المتداولين بالأدوات المناسبة في كل مرحلة.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
            {products.map((product: Product) => (
              <StaggerItem key={product.id}>
                <div className="gradient-card overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{ '--tw-shadow': '0 20px 45px rgba(212,132,90,0.12)' } as React.CSSProperties}>
                  {/* macOS style Window Title Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#ff5f56] opacity-80" />
                      <span className="h-2 w-2 rounded-full bg-[#ffbd2e] opacity-80" />
                      <span className="h-2 w-2 rounded-full bg-[#27c93f] opacity-80" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">Project #{product.id}</span>
                    <div className="w-8" />
                  </div>

                  <div className="relative w-full pt-[56.25%] bg-black/80">
                    <iframe
                      src={product.imageLink}
                      title={product.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="p-5 text-right border-t border-white/[0.04]">
                    <h3 className="text-base font-bold" style={{ color: '#d4845a' }}>{product.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-gray-400">
                      تجربة رقمية مصممة بدقة لرفع كفاءة إدارة الأعمال أو التداول.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
