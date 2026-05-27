'use client';

import Link from 'next/link';
import { InstagramIcon, TikTokIcon, SnapchatIcon, TelegramIcon } from './SocialIcons';
import { FadeIn, StaggerContainer } from './animations/MotionComponents';
import { usePathname } from 'next/navigation';

const socialLinks = [
  { icon: <InstagramIcon size={22} />, url: 'https://www.instagram.com/3zzoezzo/', color: 'from-pink-500/80 via-orange-400/80 to-amber-400/80' },
  { icon: <TikTokIcon size={22} />, url: 'https://www.tiktok.com/@3zzo.com', color: 'from-gray-900/80 via-slate-800/80 to-gray-700/80' },
  { icon: <SnapchatIcon size={22} />, url: 'https://www.snapchat.com/add/ezzo.com', color: 'from-yellow-400/80 via-amber-300/80 to-yellow-200/80' },
  { icon: <TelegramIcon size={22} />, url: 'https://t.me/ezzo3zzo3', color: 'from-sky-500/80 via-blue-500/80 to-cyan-400/80' },
];

const navigationLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الفيوتشر والحسابات الممولة', href: '/FuturesAndFundedAccounts' },
  { label: 'استراتيجتنا بالتداول', href: '/Indicator' },
  { label: 'الدعم الفني', href: '/Support' },
  { label: 'سياسة الخصوصية', href: '/PrivacyPolicy' },
];

const resourceLinks = [
  { label: 'الدورات التدريبية', href: '/Coursies' },
  { label: 'استراتيجية ايزو', href: '/Indicator' },
  { label: 'بوت الخيارات', href: '/Options' },
];

const contactDetails = [
  { label: 'البريد الإلكتروني', value: '3zzoezzo@gmail.com', href: 'mailto:3zzoezzo@gmail.com' },
  { label: 'واتساب الدعم', value: '+966503405496', href: 'https://wa.me/966503405496' },
  { label: 'تيليجرام', value: '@ezzo3zzo3', href: 'https://t.me/ezzo3zzo3' },
  { label: 'ساعات العمل', value: 'من 9 صباحاً حتى 5 مساءً - توقيت السعودية' },
];

const Footer = () => {
  const pathname = usePathname();
  if (pathname === '/links' || pathname === '/link') return null;

  return (
    <footer className="relative z-10 mt-32 px-4 sm:px-6 lg:px-10">
      <div className="page-shell">
        <div className="glass-panel overflow-hidden px-6 py-14 sm:px-12 sm:py-20">
          <StaggerContainer className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]" staggerChildren={0.08}>
            <FadeIn direction="up" className="space-y-6">
              <div>
                <p className="text-3xl font-extrabold">
                  <span className="ezzo-text">Ezzo</span>
                </p>
                <p className="mt-4 text-sm text-gray-400 font-medium" style={{ lineHeight: 1.9 }}>
                  حلول تداول احترافية تربط بين الأدوات التقنية المتقدمة والخبرة العملية في الأسواق المالية، لنمنحك رؤية أوضح واتخاذ قرار أسرع.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon, url }, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
                    style={{ border: '1px solid rgba(212,132,90,0.08)', background: 'rgba(212,132,90,0.025)', color: '#9a8a7e' }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = '#d4845a'; el.style.borderColor = 'rgba(212,132,90,0.28)'; el.style.background = 'rgba(212,132,90,0.06)'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = '#9a8a7e'; el.style.borderColor = 'rgba(212,132,90,0.08)'; el.style.background = 'rgba(212,132,90,0.025)'; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="up" className="delay-100">
              <p className="mb-5 text-lg font-bold" style={{ color: '#d4845a' }}>روابط سريعة</p>
              <ul className="space-y-3.5 text-sm font-medium" style={{ color: '#9a8a7e' }}>
                {navigationLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="transition-all duration-300 hover:-translate-x-1.5 inline-block" style={{ color: 'inherit' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#d4845a' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#9a8a7e' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="up" className="delay-200">
              <p className="mb-5 text-lg font-bold" style={{ color: '#d4845a' }}>خدماتنا</p>
              <ul className="space-y-3.5 text-sm font-medium" style={{ color: '#9a8a7e' }}>
                {resourceLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="transition-all duration-300 hover:-translate-x-1.5 inline-block" style={{ color: 'inherit' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#d4845a' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#9a8a7e' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="up" className="space-y-5 delay-300">
              <p className="text-lg font-bold" style={{ color: '#d4845a' }}>تواصل معنا</p>
              <ul className="space-y-4 text-sm font-medium" style={{ color: '#9a8a7e' }}>
                {contactDetails.map(({ label, value, href }) => (
                  <li key={label} className="leading-6">
                    <span className="block text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(212,132,90,0.75)' }}>
                      {label}
                    </span>
                    {href ? (
                      <a href={href} className="transition-colors text-[14px]" style={{ color: 'inherit' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#d4845a' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#9a8a7e' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-[14px]" style={{ color: '#b8a89a' }}>{value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </StaggerContainer>

          <div className="card-divider my-10" />

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between font-medium" style={{ color: '#6a5a52' }}>
              <p>© 2026 <span className="ezzo-text">Ezzo</span>. جميع الحقوق محفوظة.</p>
              <p>صُمم بعناية لدعم المتداولين الطموحين في أسواق الفيوتشر والحسابات الممولة.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
