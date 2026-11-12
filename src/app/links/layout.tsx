import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'روابط Ezzo | تيليجرام وسناب شات والمتجر',
  description: 'كل روابط Ezzo في مكان واحد: قناة تيليجرام، سناب شات، بوت EZZO SPX BOT، واستراتيجية ايزو.',
  alternates: { canonical: '/links' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
