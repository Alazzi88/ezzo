'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'الرئيسية', href: '/' },
  { name: 'الفيوتشر والحسابات الممولة', href: '/FuturesAndFundedAccounts' },
  { name: 'استراتيجتنا بالتداول', href: '/Indicator' },
  { name: 'بوت الخيارات', href: '/Options', highlight: true },
  { name: 'الدورات التدريبية', href: '/Coursies' },
  { name: 'روابطنا', href: '/links' },
  { name: 'الدعم', href: '/Support' },
  { name: 'سياسة الخصوصية', href: '/PrivacyPolicy' },
]

export default function Header() {
  const pathname = usePathname()
  if (pathname === '/links' || pathname === '/link') return null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
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
        setIsScrolled(currentScrollY > 20)
        lastScrollYRef.current = currentScrollY
        tickingRef.current = false
      })
    }
    lastScrollYRef.current = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <header
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'pt-3 sm:pt-4' : 'pt-0'}`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? 'max-w-5xl rounded-full backdrop-blur-2xl py-3 px-6'
            : 'max-w-7xl backdrop-blur-lg py-4 px-5 sm:px-8 lg:px-12'
        }`}
        style={isScrolled ? {
          border: '1px solid rgba(212, 132, 90, 0.12)',
          background: 'rgba(13, 11, 9, 0.82)',
          boxShadow: '0 20px 50px -15px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,132,90,0.04), 0 4px 20px rgba(212,132,90,0.05)',
        } : {
          borderBottom: '1px solid rgba(212, 132, 90, 0.06)',
          background: 'rgba(13, 11, 9, 0.3)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/logo.webp" alt="Ezzo" width={isScrolled ? 46 : 54} height={isScrolled ? 46 : 54} loading="lazy" className="rounded-full border border-white/10 transition-all duration-500" />
          <span className="text-2xl font-extrabold" style={{ color: '#d4845a' }}>
            <span style={{ color: '#f0ebe4' }}>3</span>zzo
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {navigation.map((item) => (
            <div key={item.href}>
              {item.highlight ? (
                <Link href={item.href} prefetch={false}
                  className="relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #d4845a 0%, #c9a84c 100%)',
                    color: '#0d0b09',
                    boxShadow: '0 4px 15px -3px rgba(212,132,90,0.35)',
                  }}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0d0b09]/60" />
                  {item.name}
                </Link>
              ) : (
                <Link href={item.href} prefetch={false}
                  className="relative rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-300 group overflow-hidden block"
                  style={{ color: '#b8a89a' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f0ebe4' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#b8a89a' }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full" style={{ background: 'rgba(212,132,90,0.06)' }} />
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-4" style={{ background: '#d4845a' }} />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-full p-2.5 transition-all duration-300"
            style={{ border: '1px solid rgba(212,132,90,0.18)', background: 'rgba(212,132,90,0.04)', color: '#d4845a' }}
            aria-label="فتح القائمة"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>
          <Transition.Child as={Fragment} enter="transform transition ease-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in duration-200" leaveFrom="translate-x-0" leaveTo="translate-x-full">
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-4/5 max-w-sm overflow-y-auto px-6 py-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)]" dir="rtl" style={{ background: 'rgba(13, 11, 9, 0.95)', borderLeft: '1px solid rgba(212,132,90,0.1)' }}>
              <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(212,132,90,0.1)' }}>
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <Image src="/img/logo.webp" alt="Ezzo" width={48} height={48} loading="lazy" className="rounded-full border border-white/10" />
                  <span className="text-lg font-bold" style={{ color: '#d4845a' }}><span style={{ color: '#f0ebe4' }}>3</span>zzo</span>
                </Link>
                <button type="button" onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full p-2 transition-colors"
                  style={{ border: '1px solid rgba(212,132,90,0.12)', background: 'rgba(212,132,90,0.04)', color: '#9a8a7e' }}
                  aria-label="إغلاق القائمة"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="5" x2="19" y2="19" strokeLinecap="round" />
                    <line x1="19" y1="5" x2="5" y2="19" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 space-y-2.5">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300"
                    style={item.highlight ? {
                      background: 'linear-gradient(135deg, #d4845a 0%, #c9a84c 100%)',
                      color: '#0d0b09',
                      fontWeight: 700,
                      boxShadow: '0 4px 15px rgba(212,132,90,0.25)',
                    } : {
                      border: '1px solid rgba(212,132,90,0.07)',
                      background: 'rgba(212,132,90,0.02)',
                      color: '#b8a89a',
                    }}
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
