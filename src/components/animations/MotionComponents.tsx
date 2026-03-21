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
    duration = 0.5,
    className = '',
    fullWidth = false,
    once = true,
}: FadeInProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const getVariants = () => {
        const distance = 40;
        const variants = {
            hidden: { opacity: 0, x: 0, y: 0 },
            visible: { opacity: 1, x: 0, y: 0 },
        };

        switch (direction) {
            case 'up':
                variants.hidden.y = distance;
                break;
            case 'down':
                variants.hidden.y = -distance;
                break;
            case 'left':
                variants.hidden.x = distance;
                break;
            case 'right':
                variants.hidden.x = -distance;
                break;
        }

        return variants;
    };

    const variants = getVariants();

    return (
        <m.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={`${fullWidth ? 'w-full' : ''} ${className}`}
            style={{ willChange: 'transform, opacity' }}
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
    duration = 0.5,
    className = '',
    once = true,
}: ScaleInProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    return (
        <m.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
            style={{ willChange: 'transform, opacity' }}
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
    staggerChildren = 0.1,
    once = true,
}: StaggerContainerProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    return (
        <m.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        delayChildren: delay,
                        staggerChildren,
                    },
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
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={className}
            style={{ willChange: 'transform, opacity' }}
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
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={className}
            style={{ willChange: 'transform' }}
        >
            {children}
        </m.div>
    );
};
