'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LIST_SELECTOR = 'main ul, main ol, footer ul, footer ol';

const registerListItems = (
  elements: Iterable<Element>,
  observer: IntersectionObserver,
  tracked: WeakSet<Element>
) => {
  const items: HTMLElement[] = [];

  Array.from(elements).forEach((list) => {
    if (!(list instanceof HTMLElement)) return;

    const listItems = list.querySelectorAll<HTMLElement>(':scope > li');

    listItems.forEach((item, index) => {
      if (tracked.has(item)) return;
      tracked.add(item);
      item.classList.add('animate-on-scroll');
      item.style.setProperty('--scroll-delay', `${Math.min(index * 70, 350)}ms`);
      observer.observe(item);
      items.push(item);
    });
  });

  return items;
};

const ScrollAnimator = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const trackedItems = new WeakSet<Element>();
    const registeredItems: HTMLElement[] = [];

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return;
          entry.target.classList.add('animate-on-scroll-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    const scan = () => {
      const lists = document.querySelectorAll(LIST_SELECTOR);
      const newItems = registerListItems(lists, revealObserver, trackedItems);
      registeredItems.push(...newItems);
    };

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches && node.matches('ul, ol')) {
            registerListItems([node], revealObserver, trackedItems);
          }
          const nestedLists = node.querySelectorAll?.('ul, ol');
          if (nestedLists?.length) {
            registerListItems(nestedLists, revealObserver, trackedItems);
          }
        });
      });
    });

    const init = () => {
      scan();
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    if (document.readyState === 'loading') {
      const handleReady = () => {
        document.removeEventListener('DOMContentLoaded', handleReady);
        init();
      };
      document.addEventListener('DOMContentLoaded', handleReady);
    } else {
      init();
    }

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      registeredItems.forEach((item) => {
        item.classList.remove('animate-on-scroll', 'animate-on-scroll-visible');
        item.style.removeProperty('--scroll-delay');
      });
    };
  }, [pathname]);

  return null;
};

export default ScrollAnimator;
