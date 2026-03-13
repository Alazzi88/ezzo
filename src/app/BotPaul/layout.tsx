import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'بوت باول | Ezzo - بوت تداول آلي وإشارات للفيوتشر والحسابات الممولة',
  description: 'بوت باول من Ezzo يرسل إشارات تداول وتنبيهات مبنية على استراتيجيات احترافية للفيوتشر والحسابات الممولة.',
};

export default function BotPaulLayout({ children }: { children: React.ReactNode }) {
  return children;
}
