import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
	{
		img: '/img/trading-analysis.webp',
		title: 'مزايا تداول الفيوتشر',
		description:
			'تداول الفيوتشر يتيح لك الاستفادة من تقلبات الأسواق المالية، إمكانية تحقيق أرباح في الصعود والهبوط، رافعة مالية عالية، سيولة مرتفعة، وشفافية في الأسعار. يمكنك إدارة المخاطر بمرونة وتنفيذ استراتيجيات متنوعة لتحقيق أهدافك الاستثمارية.',
	},
	{
		img: '/img/ezzoind.webp',
		title: 'مزايا الحسابات الممولة',
		description:
			'الحسابات الممولة تمنحك فرصة التداول برأس مال أكبر دون مخاطرة أموالك الخاصة، مع إمكانية الحصول على أرباح مجزية، دعم تعليمي واحترافي، اختبارات تقييم شفافة، وسحب أرباح مرن. مثالية للمتداولين الطموحين الباحثين عن تطوير مهاراتهم وزيادة دخلهم.',
	},
	{
		img: '/img/stop.webp',
		title: 'إدارة المخاطر الذكية',
		description:
			'سواء في الفيوتشر أو الحسابات الممولة، يمكنك تطبيق خطط إدارة مخاطر متقدمة، تحديد وقف الخسارة وجني الأرباح، التحكم في حجم العقود، والالتزام بقواعد رأس المال للحفاظ على استمرارية النجاح وتقليل الخسائر.',
	},
];

const FuturesAndFundedAccounts = () => {
	return (
		<div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-orange-900 py-16 px-4 sm:px-8 overflow-x-hidden">
			<div className="absolute inset-0 pointer-events-none animate-gradient-move z-0" style={{background: 'radial-gradient(ellipse at 20% 30%, rgba(251,146,60,0.15) 0%, rgba(251,146,60,0) 60%), radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.10) 0%, rgba(251,191,36,0) 70%), radial-gradient(ellipse at 50% 80%, rgba(255,115,179,0.10) 0%, rgba(255,115,179,0) 65%)'}} />
			<div className="max-w-3xl mx-auto text-center mb-16 relative z-10 animate-fade-in">
				<h1 className="text-4xl sm:text-5xl font-extrabold text-orange-500 mb-6 animate-gradient-text drop-shadow-lg">
					كل ما تحتاج معرفته عن الفيوتشر والحسابات الممولة
				</h1>
				<p className="text-lg text-gray-200 leading-relaxed mb-6 animate-fade-in">
					عقود الفيوتشر (Futures) هي أدوات مالية مشتقة تتيح لك شراء أو بيع أصل معين في تاريخ مستقبلي بسعر متفق عليه مسبقاً. تُستخدم الفيوتشر للتحوط أو المضاربة على حركة الأسعار، وتتميز بسيولة عالية ورافعة مالية قوية. أما الحسابات الممولة فهي برامج تمنح المتداولين رأس مال للتداول مقابل اجتياز اختبارات تقييم، مع إمكانية مشاركة الأرباح دون المخاطرة برأس مالهم الخاص.
				</p>
				<p className="text-lg text-orange-300 leading-relaxed mb-6 animate-fade-in">
					في هذه الصفحة ستتعرف على مزايا وخصائص الفيوتشر، عيوبه، مقارنة بينه وبين الأسواق الأخرى، وأهم النصائح للنجاح في هذا المجال.
				</p>
			</div>
			<section className="max-w-5xl mx-auto mb-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
				{features.map(({ img, title, description }, idx) => (
					<div key={idx} className="flex flex-col items-center text-center bg-gradient-to-b from-orange-900/90 to-black/90 rounded-2xl shadow-2xl p-8 border-0 hover:scale-105 transition-transform duration-300 animate-fade-in group">
						<div className="relative w-44 h-28 mb-4 animate-float">
							<Image src={img} alt={title} fill className="rounded-lg shadow-lg object-cover group-hover:scale-110 transition-transform duration-500" />
						</div>
						<h3 className="mt-2 text-2xl font-bold text-orange-400 drop-shadow mb-2 animate-gradient-text">{title}</h3>
						<p className="mt-2 text-gray-200 text-base leading-relaxed animate-fade-in">{description}</p>
					</div>
				))}
			</section>
			<section className="max-w-5xl mx-auto mb-20 relative z-10 animate-fade-in">
				<h2 className="text-3xl font-bold text-orange-400 mb-8 text-center animate-gradient-text">عيوب الفيوتشر</h2>
				<ul className="list-disc text-lg text-gray-200 leading-loose px-6 mb-10 animate-fade-in" style={{ direction: 'rtl' }}>
					<li>مخاطر عالية بسبب الرافعة المالية.</li>
					<li>احتمالية خسارة رأس المال بسرعة إذا لم يتم الالتزام بإدارة المخاطر.</li>
					<li>تعقيد بعض العقود وصعوبة فهمها للمبتدئين.</li>
					<li>الحاجة لمتابعة الأسواق بشكل مستمر.</li>
					<li>تأثير الأخبار والأحداث الاقتصادية بشكل كبير على الأسعار.</li>
				</ul>
			</section>
			<section className="max-w-5xl mx-auto mb-20 relative z-10 animate-fade-in">
				<h2 className="text-3xl font-bold text-orange-400 mb-8 text-center animate-gradient-text">ما هي الحسابات الممولة؟</h2>
				<p className="text-lg text-gray-200 leading-relaxed mb-10 animate-fade-in">
					الحسابات الممولة هي برامج تقدمها شركات متخصصة تتيح للمتداولين فرصة التداول برأس مال كبير بعد اجتياز اختبار تقييم. يحصل المتداول على نسبة من الأرباح دون أن يخاطر بأمواله الخاصة. هذه الحسابات مناسبة لمن يمتلك المهارة ويبحث عن تمويل حقيقي لتحقيق دخل إضافي.
				</p>
			</section>
			<section className="max-w-5xl mx-auto mb-20 relative z-10 animate-fade-in">
				<h2 className="text-3xl font-bold text-orange-400 mb-8 text-center animate-gradient-text">كيف تعمل الحسابات الممولة في الفيوتشر؟</h2>
				<p className="text-lg text-gray-200 leading-relaxed mb-10 animate-fade-in">
					عند التقديم على الحسابات الممولة في الفيوتشر، تبدأ أولاً باجتياز اختبار تقييم (Challenge) تضعه الشركة الممولة. إذا نجحت في تحقيق الشروط المطلوبة (مثل تحقيق أرباح معينة دون تجاوز حد الخسارة)، تحصل على حساب محاكي (Demo) وليس حساباً حقيقياً في البداية. هذا الحساب المحاكي يتيح لك التداول في بيئة مشابهة للحساب الحقيقي، ويجب عليك الحفاظ على أدائك وعدم تجاوز حدود الخسارة لفترة محددة. ومن المهم أن تعلم أن جميع الشركات الممولة تقريباً تتيح لك سحب الأرباح التي تحققها في حساب الديمو بعد اجتياز الاختبار مباشرة، حيث يتم احتساب الأرباح بشكل افتراضي ثم تحويلها لك فعلياً حسب سياسة الشركة. بعض الشركات تتيح لك السحب بشكل يومي أو أسبوعي حتى وأنت في الحساب الديمو، بينما شركات أخرى تشترط تحقيق عدة سحوبات أو أرباح متتالية قبل أن يتم تحويل حسابك إلى حساب لايف (حقيقي) وتبدأ التداول بأموال حقيقية. لذلك من المهم قراءة شروط كل شركة ممولة بعناية قبل الاشتراك.
				</p>
			</section>
			<section className="max-w-5xl mx-auto mb-20 relative z-10 animate-fade-in">
				<h2 className="text-3xl font-bold text-orange-400 mb-8 text-center animate-gradient-text">نصائح للنجاح في الفيوتشر والحسابات الممولة</h2>
				<ul className="list-disc text-lg text-gray-200 leading-loose px-6 mb-10 animate-fade-in" style={{ direction: 'rtl' }}>
					<li>تعلم التحليل الفني والأساسي بشكل جيد.</li>
					<li>ضع خطة تداول واضحة والتزم بها.</li>
					<li>لا تخاطر بأكثر من 1-2% من رأس المال في الصفقة الواحدة.</li>
					<li>استخدم وقف الخسارة دائماً.</li>
					<li>تجنب التداول العاطفي أو الانتقام من السوق.</li>
					<li>تابع الأخبار الاقتصادية المؤثرة.</li>
					<li>استفد من الحسابات التجريبية قبل التداول الحقيقي.</li>
					<li>طور مهاراتك باستمرار واطلع على أحدث الاستراتيجيات.</li>
				</ul>
			</section>
			{/* مقارنة تفصيلية أسفل الصفحة */}
			<section className="max-w-6xl mx-auto mb-20 mt-24 relative z-10 animate-fade-in">
				<h2 className="text-3xl font-bold text-orange-400 mb-8 text-center animate-gradient-text">
					مقارنة تفصيلية بين الفيوتشر، الأسهم، الفوركس، والأوبشن الأمريكي
				</h2>
				<div className="overflow-x-auto mb-10 animate-fade-in">
					<table className="min-w-full text-center text-gray-200 border border-orange-700 rounded-xl overflow-hidden shadow-xl">
						<thead className="bg-orange-900/80">
							<tr>
								<th className="px-4 py-2">الميزة</th>
								<th className="px-4 py-2">الفيوتشر</th>
								<th className="px-4 py-2">الأسهم</th>
								<th className="px-4 py-2">الفوركس</th>
								<th className="px-4 py-2">الأوبشن الأمريكي</th>
							</tr>
						</thead>
						<tbody className="bg-black/70">
							<tr>
								<td className="px-4 py-2">الرافعة المالية</td>
								<td>حتى 1:100 (حسب العقد)</td>
								<td>1:2 غالباً</td>
								<td>حتى 1:500</td>
								<td>1:10 إلى 1:20 تقريباً</td>
							</tr>
							<tr>
								<td className="px-4 py-2">السيولة</td>
								<td>مرتفعة جداً</td>
								<td>مرتفعة</td>
								<td>مرتفعة جداً</td>
								<td>مرتفعة (خاصة العقود الرئيسية)</td>
							</tr>
							<tr>
								<td className="px-4 py-2">التكلفة/العمولات</td>
								<td>منخفضة (عمولة ثابتة أو متغيرة)</td>
								<td>عمولة أو سبريد</td>
								<td>سبريد فقط غالباً</td>
								<td>عمولة + سبريد + بريميوم</td>
							</tr>
							<tr>
								<td className="px-4 py-2">رأس المال الأدنى</td>
								<td>من 500$ إلى 5000$ (حسب الوسيط)</td>
								<td>من 100$ إلى آلاف الدولارات</td>
								<td>من 10$ إلى 100$ غالباً</td>
								<td>من 500$ إلى 2000$ (حسب الاستراتيجية)</td>
							</tr>
							<tr>
								<td className="px-4 py-2">إمكانية البيع على المكشوف</td>
								<td>نعم</td>
								<td>أحياناً</td>
								<td>نعم</td>
								<td>نعم (عبر عقود البيع)</td>
							</tr>
							<tr>
								<td className="px-4 py-2">الأرباح المحتملة</td>
								<td>مرتفعة جداً مع المخاطرة</td>
								<td>متوسطة إلى مرتفعة</td>
								<td>متوسطة إلى مرتفعة</td>
								<td>مرتفعة جداً (حسب الاستراتيجية)</td>
							</tr>
							<tr>
								<td className="px-4 py-2">الخسارة المحتملة</td>
								<td>قد تتجاوز رأس المال (في بعض الحالات)</td>
								<td>محدودة برأس المال</td>
								<td>قد تتجاوز رأس المال (رافعة عالية)</td>
								<td>محدودة بالقسط المدفوع (البريميوم)</td>
							</tr>
							<tr>
								<td className="px-4 py-2">المخاطرة</td>
								<td>مرتفعة جداً</td>
								<td>متوسطة</td>
								<td>مرتفعة جداً</td>
								<td>مرتفعة (إذا لم يتم إدارة العقود بشكل صحيح)</td>
							</tr>
							<tr>
								<td className="px-4 py-2">ساعات التداول</td>
								<td>23 ساعة تقريباً</td>
								<td>7-8 ساعات</td>
								<td>24 ساعة</td>
								<td>6.5 ساعة (جلسة السوق الأمريكي)</td>
							</tr>
							<tr>
								<td className="px-4 py-2">التعقيد</td>
								<td>متوسط إلى مرتفع</td>
								<td>منخفض</td>
								<td>متوسط</td>
								<td>مرتفع (يتطلب فهم استراتيجيات متعددة)</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
			<div className="text-center mt-16 relative z-10 animate-fade-in">
				<Link
					href="/"
					className="inline-block px-8 py-3 text-lg font-bold text-black bg-orange-500 rounded-md hover:bg-orange-600 hover:text-white transition shadow-lg animate-float"
				>
					العودة للرئيسية
				</Link>
			</div>
		</div>
	);
};

export default FuturesAndFundedAccounts;

// أنيميشن Tailwind CSS مخصص
// أضف هذه الأنيميشن إلى ملف tailwind.config.js أو CSS العام:
/*
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
.animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-gradient-text { background: linear-gradient(90deg,#fbbf24,#fb923c,#f43f5e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.animate-gradient-move { animation: gradient-move 12s ease-in-out infinite alternate; background-size: 200% 200%; }
*/
