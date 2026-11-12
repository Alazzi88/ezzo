'use client';

import { AnimatePresence, m } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  // no filter here: filter/transform on this wrapper would break position:fixed inside pages.
  // exits leave fast on an easeIn curve (~half an entrance)
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.6, 0, 0.9, 0.35] as const } },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
