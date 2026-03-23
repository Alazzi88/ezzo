'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';

type FadeInProps = {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    className?: string;
    fullWidth?: boolean;
    once?: boolean;
};

export const FadeIn = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.45,
    className = '',
    fullWidth = false,
    once = true,
}: FadeInProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-30px' });

    const distance = 24;
    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
    const sign = direction === 'up' || direction === 'left' ? 1 : -1;

    return (
        <m.div
            ref={ref}
            initial={{ opacity: 0, [axis]: distance * sign }}
            animate={isInView ? { opacity: 1, [axis]: 0 } : { opacity: 0, [axis]: distance * sign }}
            transition={{ duration, delay, ease: 'easeOut' }}
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
    duration = 0.45,
    className = '',
    once = true,
}: ScaleInProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-30px' });

    return (
        <m.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ duration, delay, ease: 'easeOut' }}
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
    staggerChildren = 0.08,
    once = true,
}: StaggerContainerProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-30px' });

    return (
        <m.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: { opacity: 0 },
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
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
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
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className={className}
        >
            {children}
        </m.div>
    );
};
