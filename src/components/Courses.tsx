import Image from "next/image";
import Link from "next/link";

const coursies = [
  {
    id: 1,
    name: 'دورة الشموع اليابانية',
    category: 'تحليل فني',
    href: '/courses/candle',
    price: '',
    imageSrc: '/img/candle.webp',
    imageAlt: 'دورة الشموع اليابانية',
    comingSoon: true,
  },
  {
    id: 2,
    name: 'دورة البرايس أكشن',
    category: 'تحليل فني',
    href: '/courses/priceaction',
    price: '',
    imageSrc: '/img/priceaction.webp',
    imageAlt: 'دورة البرايس أكشن',
    comingSoon: true,
  },
  {
    id: 3,
    name: 'الدورة الرقمية',
    category: 'تحليل رقمي',
    href: '/courses/number',
    price: '',
    imageSrc: '/img/number.webp',
    imageAlt: 'الدورة الرقمية',
    comingSoon: true,
  },
];

export default function CourseList() {
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-8 text-center">
          دورات التحليل الفني
        </h2>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coursies.map((course) => (
            <div key={course.id} className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="relative">
                <Image
                  loading="lazy"
                  alt={course.imageAlt}
                  src={course.imageSrc}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover"
                />
                {course.comingSoon && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-orange-400 text-lg font-semibold">قريبًا</span>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-900">
                <h3 className="text-orange text-lg font-medium">
                  <Link href={course.href}>
                    {course.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-400 mt-1">{course.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
