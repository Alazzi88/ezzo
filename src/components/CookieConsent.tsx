'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ezzo-cookie-consent');
    if (!consent) {
      // Small delay so it doesn't compete with loading screen
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('ezzo-cookie-consent', 'accepted');
    window.dispatchEvent(new Event('ezzo-consent-accepted'));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('ezzo-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      dir="rtl"
      className="fixed bottom-0 inset-x-0 z-[9998] p-4 sm:p-6 flex justify-center"
      role="dialog"
      aria-label="إشعار ملفات تعريف الارتباط"
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl px-5 py-4 shadow-[0_-10px_60px_-20px_rgba(249,115,22,0.2)]"
        style={{ boxShadow: '0 -2px 40px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.03)' }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Text */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-xl">🍪</span>
            <div>
              <p className="text-sm font-semibold text-white">نستخدم ملفات تعريف الارتباط</p>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
                نستخدم ملفات الكوكيز لتحسين تجربتك وتحليل استخدام الموقع.{' '}
                <Link href="/PrivacyPolicy" className="text-orange-400 underline underline-offset-2 hover:text-orange-300 transition-colors">
                  سياسة الخصوصية
                </Link>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={decline}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-400 transition-all duration-200 hover:border-white/20 hover:text-gray-200"
            >
              رفض
            </button>
            <button
              onClick={accept}
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 text-xs font-bold text-black shadow-[0_0_15px_-3px_rgba(249,115,22,0.5)] transition-all duration-200 hover:shadow-[0_0_20px_-3px_rgba(249,115,22,0.7)] hover:-translate-y-0.5"
            >
              قبول الكل
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
