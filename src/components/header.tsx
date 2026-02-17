'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'

const navigation = [
  { name: 'الرئيسية', href: '/' },
  { name: 'الفيوتشر والحسابات الممولة', href: '/FuturesAndFundedAccounts' },
  { name: 'استراتيجتنا بالتداول', href: '/Indicator' },
  { name: 'الدورات التدريبية', href: '/Coursies' },
  { name: 'الدعم', href: '/Support' },
  { name: 'سياسة الخصوصية', href: '/PrivacyPolicy' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const lastScrollYRef = useRef(0)
  const tickingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const nextShowHeader = !(currentScrollY > lastScrollYRef.current && currentScrollY > 80)

        setShowHeader((prev) => (prev === nextShowHeader ? prev : nextShowHeader))
        lastScrollYRef.current = currentScrollY
        tickingRef.current = false
      })
    }

    lastScrollYRef.current = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 backdrop-blur-md transition-transform transition-colors transition-shadow duration-300 ${showHeader ? 'translate-y-0 bg-black/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' : '-translate-y-full bg-black/80 shadow-lg'
        }`}
    >
      <div className="page-shell flex items-center justify-between py-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/img/logo.webp"
              alt="شعار الموقع"
              width={54}
              height={54}
              loading="lazy"
              className="rounded-full border border-white/10"
            />
            <span className="text-2xl font-extrabold text-orange-400">
              <span className="text-white">3</span>zzo
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {navigation.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                prefetch={false}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-gray-200 transition-all duration-300 hover:text-white group overflow-hidden block"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full" />
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-orange-400 transition-all duration-300 group-hover:w-1/2" />
              </Link>
            </div>
          ))}
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-orange-400/50 bg-black/40 p-2 text-orange-300 transition-all duration-300 hover:border-orange-300 hover:text-orange-200"
            aria-label="فتح القائمة"
          >
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-40 bg-black/70" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-4/5 max-w-sm overflow-y-auto bg-black px-6 py-6 backdrop-blur-xl ring-1 ring-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="/img/logo.webp"
                    alt="شعار الموقع"
                    width={48}
                    height={48}
                    loading="lazy"
                    className="rounded-full border border-white/10"
                  />
                  <span className="text-lg font-bold text-orange-300">
                    <span className="text-white">3</span>zzo
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full border border-orange-400/30 p-2 text-orange-200 transition-colors hover:border-orange-200 hover:text-white"
                  aria-label="إغلاق القائمة"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="5" x2="19" y2="19" strokeLinecap="round" />
                    <line x1="19" y1="5" x2="5" y2="19" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-full border border-white/5 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-100 transition-all duration-300 hover:bg-orange-500 hover:text-black"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </header>
  )
}
