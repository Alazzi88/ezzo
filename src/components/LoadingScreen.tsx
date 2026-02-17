'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isLowPowerDevice = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;

        if (prefersReducedMotion || isLowPowerDevice) {
            setIsLoading(false);
            return;
        }

        let isMounted = true;
        let didStartExit = false;
        let exitTimer: number | undefined;
        let fallbackTimer: number | undefined;

        const startExit = () => {
            if (!isMounted || didStartExit) return;
            didStartExit = true;
            setIsExiting(true);
            exitTimer = window.setTimeout(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            }, 350);
        };

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            startExit();
        } else {
            window.addEventListener('DOMContentLoaded', startExit, { once: true });
        }

        fallbackTimer = window.setTimeout(startExit, 1200);

        return () => {
            isMounted = false;
            window.removeEventListener('DOMContentLoaded', startExit);
            if (exitTimer) window.clearTimeout(exitTimer);
            if (fallbackTimer) window.clearTimeout(fallbackTimer);
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div
            className={`loading-screen ${isExiting ? 'loading-screen-exit' : ''}`}
            aria-hidden="true"
        >
            {/* Animated curved rings around logo */}
            <div className="loading-logo-wrapper">
                {/* Outer rotating ring */}
                <div className="loading-ring loading-ring-outer">
                    <svg viewBox="0 0 200 200" className="loading-ring-svg">
                        <defs>
                            <linearGradient id="ringGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="url(#ringGradient1)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="150 400"
                        />
                    </svg>
                </div>

                {/* Inner rotating ring (opposite direction) */}
                <div className="loading-ring loading-ring-inner">
                    <svg viewBox="0 0 200 200" className="loading-ring-svg">
                        <defs>
                            <linearGradient id="ringGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fb923c" stopOpacity="0" />
                                <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="100"
                            cy="100"
                            r="70"
                            fill="none"
                            stroke="url(#ringGradient2)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="100 350"
                        />
                    </svg>
                </div>

                {/* Pulsing glow */}
                <div className="loading-logo-glow" />

                {/* Logo container */}
                <div className="loading-logo-container">
                    <div className="loading-logo-circle">
                        <Image
                            src="/img/logo.webp"
                            alt="Ezzo Logo"
                            width={80}
                            height={80}
                            priority
                            className="loading-logo"
                        />
                    </div>
                </div>
            </div>

            {/* 3zzo.com text below logo */}
            <div className="loading-text-container" dir="ltr">
                <span className="loading-domain">
                    <span className="loading-number">3zzo</span>
                    <span className="loading-rest">.com</span>
                </span>
            </div>

            {/* Elegant loading bar */}
            <div className="loading-bar-container">
                <div className="loading-bar" />
            </div>
        </div>
    );
};

export default LoadingScreen;
