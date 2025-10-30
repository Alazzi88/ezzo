'use client';
import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // تحديد اتجاه التمرير
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');

      // إظهار الزر عند التمرير لمسافة معينة
      setIsVisible(currentScrollY > 300);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // التمرير إلى الأعلى عند النقر على الزر
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="pointer-events-none">
      {/* زر التمرير إلى الأعلى */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`group fixed bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 text-black shadow-[0_20px_45px_-25px_rgba(251,146,60,0.95)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(251,146,60,0.95)] ${
            scrollDirection === 'down' ? 'opacity-90' : 'opacity-100'
          } pointer-events-auto z-50`}
        >
          <FaArrowUp className="text-xl transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      )}

      {/* زر واتساب */}
      <a
        href="https://api.whatsapp.com/send/?phone=966503405496&text&type=phone_number&app_absent=0" // استبدل بالرقم الخاص بك
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default ScrollToTop;
