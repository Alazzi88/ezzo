import Link from 'next/link';
import { FaInstagram, FaTiktok, FaSnapchatGhost, FaTelegramPlane } from 'react-icons/fa';

const socialLinks = [
  { icon: <FaInstagram size={22} />, url: 'https://www.instagram.com/3zzoezzo/', color: 'from-pink-500/80 via-orange-400/80 to-amber-400/80' },
  { icon: <FaTiktok size={22} />, url: 'https://www.tiktok.com/@3zzo.com', color: 'from-gray-900/80 via-slate-800/80 to-gray-700/80' },
  { icon: <FaSnapchatGhost size={22} />, url: 'https://www.snapchat.com/add/ezzo.com', color: 'from-yellow-400/80 via-amber-300/80 to-yellow-200/80' },
  { icon: <FaTelegramPlane size={22} />, url: 'https://t.me/ezzo3zzo3', color: 'from-sky-500/80 via-blue-500/80 to-cyan-400/80' },
];

const navigationLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الفيوتشر والحسابات الممولة', href: '/FuturesAndFundedAccounts' },
  { label: 'المؤشرات الفنية', href: '/Indicator' },
  { label: 'الدعم الفني', href: '/Support' },
  { label: 'سياسة الخصوصية', href: '/PrivacyPolicy' },
];

const resourceLinks = [
  { label: 'الدورات التدريبية', href: '/Coursies' },
  { label: 'مؤشر Ezzo', href: '/Indicator' },
];

const contactDetails = [
  { label: 'البريد الإلكتروني', value: '3zzoezzo@gmail.com', href: 'mailto:3zzoezzo@gmail.com' },
  { label: 'واتساب الدعم', value: '+966503405496', href: 'https://wa.me/966503405496' },
  { label: 'تيليجرام', value: '@ezzo3zzo3', href: 'https://t.me/ezzo3zzo3' },
  { label: 'ساعات العمل', value: 'من 9 صباحاً حتى 5 مساءً - توقيت السعودية' },
];

const Footer = () => {
  return (
    <footer className="relative z-10 mt-24 px-4 sm:px-6 lg:px-10">
      <div className="page-shell">
        <div className="glass-panel overflow-hidden px-6 py-10 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
            <div className="space-y-5">
              <div>
                <p className="text-2xl font-extrabold text-orange-400">
                  Ezzo
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  حلول تداول احترافية تربط بين الأدوات التقنية المتقدمة والخبرة العملية في الأسواق المالية، لنمنحك رؤية أوضح واتخاذ قرار أسرع.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon, url, color }, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${color} text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-105`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-lg font-semibold text-orange-300">روابط سريعة</p>
              <ul className="space-y-3 text-sm text-gray-300">
                {navigationLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="transition-colors hover:text-orange-300">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-lg font-semibold text-orange-300">خدماتنا</p>
              <ul className="space-y-3 text-sm text-gray-300">
                {resourceLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="transition-colors hover:text-orange-300">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-lg font-semibold text-orange-300">تواصل معنا</p>
              <ul className="space-y-3 text-sm text-gray-300">
                {contactDetails.map(({ label, value, href }) => (
                  <li key={label} className="leading-6">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-orange-400/80">
                      {label}
                    </span>
                    {href ? (
                      <a href={href} className="transition-colors hover:text-orange-300">
                        {value}
                      </a>
                    ) : (
                      <span>{value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-divider my-8" />

          <div className="flex flex-col gap-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2024 Ezzo. جميع الحقوق محفوظة.</p>
            <p>صُمم بعناية لدعم المتداولين الطموحين في أسواق الفيوتشر والحسابات الممولة.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
