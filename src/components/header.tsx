'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image';

const navigation = [
  { name: 'الرئيسية', href: '/' },
  { name: 'الأوبشن الأمريكي', href: '/Optiontrading' },
  { name: 'المؤشرات الفنية', href: '/Indicator' },
  { name: 'الدعم', href: '/Support' },
  { name: 'من نحن', href: '/About' },
  { name: 'سياسة الخصوصية', href: '/PrivacyPolicy' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <header
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 font-sans transition-transform duration-300 ${
        showHeader ? 'bg-gradient-to-b from-black via-transparent to-transparent' : 'bg-black bg-opacity-80'
      }`}
    >
      <nav
        className="w-full flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={"img/logo.webp"}
              alt={"logo"}
              width={60}
              height={60}
              loading="lazy"
              className="rounded-full mx-2"
            />
            <span className="text-3xl font-bold text-orange-500 font-sans">
              <span className="text-white font-extrabold p-0 m-0">3</span>zzo
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:gap-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-medium text-orange-400 transition hover:bg-orange-500 hover:text-black px-4 py-2 rounded-md font-sans"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-orange-500 hover:text-orange-500 focus:outline-none"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            className="lg:hidden"
          >
            {/* خلفية شفافة بتأثير Fade In/Out */}
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* استخدام motion.div لتطبيق الانتقال على القائمة */}
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-4/5 max-w-sm bg-gray-800 p-4"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Dialog.Panel>
                <div className="flex items-center justify-between border-b border-gray-600 pb-4">
                  <Link href="/" className="flex items-center">
                    <Image
                      src={"img/logo.webp"}
                      alt={"logo"}
                      width={60}
                      height={60}
                      loading="lazy"
                      className="rounded-full mx-2"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md p-2 text-orange-500 hover:text-orange-500 focus:outline-none"
                  >
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-lg font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-black px-3 py-2 rounded-md font-sans"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Dialog.Panel>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  )
}
