'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { dur, ease, stagger as staggerTokens } from '@/lib/motion';

type FadeInProps = {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    className?: string;
    fullWidth?: boolean;
    once?: boolean;
};

// Entrance: slide + soft blur-to-focus on an easeOut curve.
export const FadeIn = ({
    children,
    direction = 'up',
    delay = 0,
    duration = dur.enter,
    className = '',
    fullWidth = false,
    once = true,
}: FadeInProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-40px' });

    const distance = 36;
    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
    const sign = direction === 'up' || direction === 'left' ? 1 : -1;
    const tiltFrom = direction === 'up' ? { rotateX: 16 } : direction === 'down' ? { rotateX: -16 } : { rotateY: direction === 'left' ? -14 : 14 };
    const from = { opacity: 0, [axis]: distance * sign, ...tiltFrom };
    const to = { opacity: 1, [axis]: 0, rotateX: 0, rotateY: 0 };

    return (
        <m.div
            ref={ref}
            initial={from}
            animate={isInView ? to : from}
            transition={{ duration, delay, ease: ease.out }}
            style={{ transformPerspective: 1100 }}
            className={`${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {children}
        </m.div>
    );
};

type ScaleInProps = {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
};

export const ScaleIn = ({
    children,
    delay = 0,
    duration = dur.enter,
    className = '',
    once = true,
}: ScaleInProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-40px' });
    const from = { opacity: 0, scale: 0.9, y: 28, rotateX: 18 };
    const to = { opacity: 1, scale: 1, y: 0, rotateX: 0 };

    return (
        <m.div
            ref={ref}
            initial={from}
            animate={isInView ? to : from}
            transition={{ duration, delay, ease: ease.out }}
            style={{ transformPerspective: 1100 }}
            className={className}
        >
            {children}
        </m.div>
    );
};

type StaggerContainerProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    staggerChildren?: number;
    once?: boolean;
};

export const StaggerContainer = ({
    children,
    className = '',
    delay = 0,
    staggerChildren = staggerTokens.item,
    once = true,
}: StaggerContainerProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-40px' });

    return (
        <m.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: { opacity: 1 },
                visible: {
                    opacity: 1,
                    transition: { delayChildren: delay, staggerChildren },
                },
            }}
            className={className}
        >
            {children}
        </m.div>
    );
};

type StaggerItemProps = {
    children: React.ReactNode;
    className?: string;
};

export const StaggerItem = ({ children, className = '' }: StaggerItemProps) => {
    return (
        <m.div
            variants={{
                hidden: { opacity: 0, y: 28, rotateX: 14 },
                visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.75, ease: ease.out },
                },
            }}
            style={{ transformPerspective: 1100 }}
            className={className}
        >
            {children}
        </m.div>
    );
};

type HoverCardProps = {
    children: React.ReactNode;
    className?: string;
};

export const HoverCard = ({ children, className = '' }: HoverCardProps) => {
    return (
        <m.div
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: 'spring', damping: 16, stiffness: 260, mass: 0.7 }}
            className={className}
        >
            {children}
        </m.div>
    );
};

type WordRevealProps = {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
    gap?: number;
    /** Applied to each word itself (needed for gradient text: background-clip:text breaks on nested inline-blocks). */
    wordClassName?: string;
    wordStyle?: React.CSSProperties;
};

// Masked word reveal: each word slides up out of a clip with a slight tilt.
// Splits by words (never letters) so Arabic letter joining stays intact.
export const WordReveal = ({ text, className = '', style, delay = 0, gap = staggerTokens.word, wordClassName = '', wordStyle }: WordRevealProps) => {
    const words = text.split(' ');
    return (
        <span className={className} style={style}>
            {words.map((word, i) => (
                <span
                    key={`${word}-${i}`}
                    className="inline-block overflow-hidden align-bottom"
                    style={{ paddingBottom: '0.14em', marginBottom: '-0.14em' }}
                >
                    <m.span
                        className={`inline-block will-change-transform ${wordClassName}`}
                        style={wordStyle}
                        initial={{ y: '110%', rotate: 3, opacity: 0 }}
                        animate={{ y: '0%', rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.85, delay: delay + i * gap, ease: ease.out }}
                    >
                        {word}
                        {i < words.length - 1 ? ' ' : ''}
                    </m.span>
                </span>
            ))}
        </span>
    );
};
