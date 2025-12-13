// global.d.ts

// نجعل الملف Module بإضافة export فارغ
export {};

declare global {
  // هنا تعريف Window.adsbygoogle (اختياري إذا كنت تستخدمه)
  interface Window {
    // يمكن جعل adsbygoogle اختيارية بإضافة علامة السؤال ? 
    // كما يمكن تحديد نوع المصفوفة بشكل أكثر دقة من any[]
    // لكن غالبًا enough إما any[] أو unknown[].
    adsbygoogle?: any[];
  }

  // واجهة مخصّصة للخصائص الإضافية لعنصر amp-auto-ads
  interface AmpAutoAdsProps extends React.HTMLAttributes<HTMLElement> {
    type?: string;
    "data-ad-client"?: string;
  }

  // تحديث تعريف JSX بحيث يتعرّف على amp-auto-ads مع الخصائص المخصّصة
  namespace JSX {
    interface IntrinsicElements {
      // نحدّد العنصر amp-auto-ads ونربطه بالخصائص AmpAutoAdsProps
      "amp-auto-ads": React.DetailedHTMLProps<AmpAutoAdsProps, HTMLElement>;
    }
  }
}
