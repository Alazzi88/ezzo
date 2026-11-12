import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الدعم والتواصل',
  description: 'تواصل مع فريق Ezzo للاستفسار عن استراتيجية ايزو وبوت EZZO SPX BOT والاشتراك والدعم الفني.',
  alternates: { canonical: '/Support' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
