import Image from 'next/image';

export default function HeroImage() {
    return (
        <div className="relative h-full w-full">
            <Image
                src="/img/trading1.webp"
                alt="ابدأ ببناء استراتيجيتك بثقة"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
                loading="eager"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
            <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">ابدأ ببناء استراتيجيتك بثقة</h3>
            </div>
        </div>
    );
}
