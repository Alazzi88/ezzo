"use client";

import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/header";
import { Providers } from "@/app/providers";
import dynamic from "next/dynamic";
import ScriptLoader from "@/components/ScriptLoader";
import LoadingScreen from "@/components/LoadingScreen";
import CookieConsent from "@/components/CookieConsent";
import PageTransition from "@/components/animations/PageTransition";
import ScrollProgress from "@/components/animations/ScrollProgress";
import SiteScene from "@/components/animations/SiteScene";
import { LazyMotion, domMax, MotionConfig } from "framer-motion";

// Lazy load below-fold components
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScriptLoader />
        <LoadingScreen />

        <LazyMotion features={domMax}>
          <MotionConfig reducedMotion="user">
            <div className="relative flex min-h-screen flex-col overflow-hidden text-gray-100">

              {/* Background decorations (CSS only, zero JS cost) */}
              <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-orange-500/20 blur-[80px] sm:blur-[140px]" />
                <div className="absolute bottom-[-10%] right-1/3 h-80 w-80 rounded-full bg-orange-400/15 blur-[80px] sm:blur-[160px]" />
                <div className="absolute inset-0 grid-overlay grid-drift opacity-40" />
                <div className="ambient-orb" />
                <div className="absolute inset-0 vignette" />
                <div className="absolute inset-0 grain" />
              </div>
              <SiteScene />
              <ScrollProgress />
              {/*  */}
              <Providers>
                <Header />
                <main className="relative z-10 flex-grow pt-24 sm:pt-28 pb-24">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </Providers>

              <ScrollToTop />
              <CookieConsent />
            </div>
          </MotionConfig>
        </LazyMotion>
    </>
  );
}
