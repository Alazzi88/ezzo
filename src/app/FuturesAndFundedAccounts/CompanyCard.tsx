'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Plan = {
  name: string;
  price: string;
  profit: string;
};

export type Company = {
  name: string;
  logo: string;
  url: string;
  keyStats: string[];
  plans: Plan[];
  summary: string;
};

export function CompanyCard({ company }: { company: Company }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${open ? 'border-orange-500/40 bg-orange-500/5' : 'border-white/8 bg-white/3'}`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 px-5 py-4 text-right"
        aria-expanded={open}
      >
        <div className="flex h-12 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2">
          <Image
            src={company.logo}
            alt={`شعار ${company.name}`}
            width={80}
            height={36}
            className="h-full w-auto max-h-8 object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-base">{company.name}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {company.keyStats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 text-[11px] font-medium text-orange-300"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>

        <span
          className={`flex-shrink-0 text-orange-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="border-t border-white/8 px-5 pb-5 pt-4 text-right">
          <p className="mb-4 text-sm leading-7 text-gray-400">{company.summary}</p>

          <div className="mb-4 grid gap-2 sm:grid-cols-3">
            {company.plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-xl border border-white/8 bg-black/40 px-4 py-3"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">{plan.name}</p>
                <p className="mt-1 text-sm font-bold text-white">{plan.price}</p>
                <p className="mt-0.5 text-xs text-gray-400">{plan.profit}</p>
              </div>
            ))}
          </div>

          <Link
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 px-4 py-2 text-sm font-semibold text-orange-200 transition-all duration-200 hover:border-orange-300 hover:text-orange-100"
          >
            الموقع الرسمي
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
