import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الأوبشن الأمريكي | Ezzo - تعرف على الخيارات الأمريكية والفرق عن الأوروبي',
  description: 'شرح الأوبشن الأمريكي، الفرق بينه وبين الخيار الأوروبي، وكيفية استخدام الخيارات في التحوط والمضاربة مع استراتيجيات Ezzo.',
};

export default function AmericanOptionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
