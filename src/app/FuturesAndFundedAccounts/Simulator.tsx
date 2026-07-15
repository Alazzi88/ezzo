'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Defined list of companies with simulator-specific data matching page.tsx
interface SimPlan {
  name: string;
  price: string;
  profit: string;
  maxLoss: string;
  contracts: string;
  sizeValue: number; // numeric value of size e.g. 50000
  dailyStop: 'yes' | 'no'; // هل يوجد حد خسارة يومي منفصل لهذه الخطة
  accountType: 'evaluation' | 'instant'; // نوع الحساب: تحدي/تدرّج أو فوري
  hasActivationFee?: boolean; // اختياري: يتجاوز رسوم التفعيل على مستوى الشركة (لخطط مثل مسارات Topstep المتعددة)
}

interface SimCompany {
  name: string;
  monogram?: { text: string; from: string; to: string };
  logo?: string;
  activationFee: string;
  activationFeeValue: number; // numeric for calculations
  profitSplitRule: string;
  payoutRule: string;
  drawdownRule: string;
  consistencyRule: string;
  minTradingDays: string;
  nextStepRule: string;
  plans: SimPlan[];
  calcSplit: (profit: number) => { trader: number; company: number; note?: string };
}

const SIM_COMPANIES: SimCompany[] = [
  {
    name: 'Alpha Futures',
    monogram: { text: 'AF', from: '#7c3aed', to: '#a78bfa' },
    activationFee: 'رسوم صغيرة لتفعيل Qualified (0$ لحسابات Zero)',
    activationFeeValue: 0,
    profitSplitRule: 'نسبة أرباح تصل إلى 90% للمتداول و10% للشركة',
    payoutRule: '5 أيام تداول رابحة بـ200$+ قبل السحب الأول',
    drawdownRule: 'حد خسارة أقصى (MLL) يُحسب نهاية اليوم، ويبقى ثابتاً بعد أول سحب',
    consistencyRule: '40% كحد أقصى لربح اليوم الواحد من إجمالي الربح المستهدف',
    minTradingDays: 'يوم واحد لحساب Zero و3 أيام لPremium/Advanced',
    nextStepRule: 'تتحول لحساب Qualified ممول محاكاة، وبدء السحب بعد تلبية الشروط',
    plans: [
      { name: 'Zero 25K', price: '$79/شهر', profit: '$1,500', maxLoss: '$1,500', contracts: '1 عقد قياسي', sizeValue: 25000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: 'Zero 50K', price: '$119/شهر', profit: '$3,000', maxLoss: '$3,000', contracts: '3 عقود قياسية', sizeValue: 50000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: 'Zero 100K', price: '$239/شهر', profit: '$6,000', maxLoss: '$6,000', contracts: '6 عقود قياسية', sizeValue: 100000, dailyStop: 'yes', accountType: 'evaluation' },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.9, company: profit * 0.1 }),
  },
  {
    name: 'Topstep',
    logo: '/img/topstep.webp',
    activationFee: '$149 رسوم تفعيل لمرة واحدة (Express Funded)',
    activationFeeValue: 149,
    profitSplitRule: '90% للمتداول و10% للشركة',
    payoutRule: '5 أيام رابحة بـ150$+ (للمسار القياسي) أو 3 أيام + شرط اتساق',
    drawdownRule: 'حد خسارة متحرك (Trailing) يُحتسب نهاية اليوم ويتوقف عند الرصيد الابتدائي',
    consistencyRule: '40% كحد أقصى لربح اليوم الواحد لتجنب خرق الاتساق',
    minTradingDays: 'لا يوجد حد أدنى لعدد الأيام لاجتياز التقييم',
    nextStepRule: 'الانتقال لحساب Express Funded (محاكى) ثم الترقية لحساب Live حقيقي بدفعات غير محدودة',
    plans: [
      { name: '50K — Standard Path (برسوم تفعيل)', price: '$49/شهر', profit: '$3,000', maxLoss: '$2,000', contracts: '5 عقود / 50 مصغر', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation', hasActivationFee: true },
      { name: '50K — No Activation Fee', price: '$95/شهر', profit: '$3,000', maxLoss: '$2,000', contracts: '5 عقود / 50 مصغر', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation', hasActivationFee: false },
      { name: '50K — No Activation Fee + وقف يومي (خصم 10$)', price: '$85/شهر', profit: '$3,000', maxLoss: '$2,000', contracts: '5 عقود / 50 مصغر', sizeValue: 50000, dailyStop: 'yes', accountType: 'evaluation', hasActivationFee: false },
      { name: '100K — Standard Path (برسوم تفعيل)', price: '$99/شهر', profit: '$6,000', maxLoss: '$3,000', contracts: '10 عقود / 100 مصغر', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation', hasActivationFee: true },
      { name: '100K — No Activation Fee', price: '$149/شهر', profit: '$6,000', maxLoss: '$3,000', contracts: '10 عقود / 100 مصغر', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation', hasActivationFee: false },
      { name: '100K — No Activation Fee + وقف يومي (خصم 20$)', price: '$129/شهر', profit: '$6,000', maxLoss: '$3,000', contracts: '10 عقود / 100 مصغر', sizeValue: 100000, dailyStop: 'yes', accountType: 'evaluation', hasActivationFee: false },
      { name: '150K — Standard Path (برسوم تفعيل)', price: '$199/شهر', profit: '$9,000', maxLoss: '$4,500', contracts: '15 عقد / 150 مصغر', sizeValue: 150000, dailyStop: 'no', accountType: 'evaluation', hasActivationFee: true },
      { name: '150K — No Activation Fee', price: '$229/شهر', profit: '$9,000', maxLoss: '$4,500', contracts: '15 عقد / 150 مصغر', sizeValue: 150000, dailyStop: 'no', accountType: 'evaluation', hasActivationFee: false },
      { name: '150K — No Activation Fee + وقف يومي (خصم 30$)', price: '$199/شهر', profit: '$9,000', maxLoss: '$4,500', contracts: '15 عقد / 150 مصغر', sizeValue: 150000, dailyStop: 'yes', accountType: 'evaluation', hasActivationFee: false },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.9, company: profit * 0.1 }),
  },
  {
    name: 'Tradeify',
    monogram: { text: 'TF', from: '#0284c7', to: '#38bdf8' },
    activationFee: 'لا توجد رسوم تفعيل (مجاني بالكامل)',
    activationFeeValue: 0,
    profitSplitRule: 'تصل إلى 90% للمتداول و10% للشركة',
    payoutRule: 'دورة سحب Flex أو Daily حسب اختيارك بدون قيود أيام معقدة',
    drawdownRule: 'حد خسارة نهاية اليوم يتوقف عند الرصيد الابتدائي، ويُقفل بعد تجاوزه بـ100$',
    consistencyRule: '40% أثناء التقييم فقط ويُلغى تماماً بعد التمويل',
    minTradingDays: '3 أيام تداول كحد أدنى لاجتياز الاختبار',
    nextStepRule: 'تفعيل حساب ممول محاكاة فوراً بنفس نسبة الربح وسحب مرن',
    plans: [
      { name: 'Select Challenge 25K', price: '$109 (مرة واحدة)', profit: '$1,500', maxLoss: '$1,000', contracts: '1 قياسي / 10 مصغر', sizeValue: 25000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Select Challenge 50K', price: '$165 (مرة واحدة)', profit: '$3,000', maxLoss: '$2,000', contracts: '4 قياسي / 40 مصغر', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Select Challenge 100K', price: '$265 (مرة واحدة)', profit: '$6,000', maxLoss: '$3,000', contracts: '8 قياسي / 80 مصغر', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Growth 25K (بوقف يومي)', price: '$99 (مرة واحدة)', profit: '$1,500', maxLoss: '$1,000', contracts: '1 قياسي / 10 مصغر', sizeValue: 25000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: 'Growth 50K (بوقف يومي)', price: '$150 (مرة واحدة)', profit: '$3,000', maxLoss: '$2,000', contracts: '4 قياسي / 40 مصغر', sizeValue: 50000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: 'Lightning 50K (فوري)', price: '$185 (مرة واحدة)', profit: '—', maxLoss: '$2,000', contracts: '4 قياسي / 40 مصغر', sizeValue: 50000, dailyStop: 'yes', accountType: 'instant' },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.9, company: profit * 0.1 }),
  },
  {
    name: 'AquaFuture',
    logo: '/img/aqua.webp',
    activationFee: 'لا توجد رسوم تفعيل (0$ تفعيل)',
    activationFeeValue: 0,
    profitSplitRule: '100% من أول $15,000 أرباح ثم 90% للمتداول',
    payoutRule: 'أول سحب بعد 14 يوماً، وسحب أسبوعي لحسابات Beginner',
    drawdownRule: 'حد خسارة نهاية اليوم لحسابات Beginner وStandard',
    consistencyRule: '40% لحسابات Beginner (تقييم وتمويل) ولا يوجد أثناء تقييم Standard',
    minTradingDays: 'يوم تداول واحد كحد أدنى لاجتياز التقييم',
    nextStepRule: 'مراجعة الهوية KYC وتنشيط الحساب الممول خلال 24 إلى 72 ساعة دون رسوم تفعيل',
    plans: [
      { name: 'Beginner 25K', price: '$50 (مرة واحدة)', profit: '$1,500', maxLoss: '$1,500', contracts: '1 عقد قياسي', sizeValue: 25000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: 'Beginner 50K', price: '$65 (مرة واحدة)', profit: '$3,000', maxLoss: '$2,000', contracts: '3 عقود قياسية', sizeValue: 50000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: 'Standard 100K', price: '$125 (مرة واحدة)', profit: '$6,000', maxLoss: '$3,000', contracts: '6 عقود قياسية', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Standard 150K', price: '$185 (مرة واحدة)', profit: '$9,000', maxLoss: '$4,500', contracts: '10 عقود قياسية', sizeValue: 150000, dailyStop: 'no', accountType: 'evaluation' },
    ],
    calcSplit: (profit) => {
      if (profit <= 15000) {
        return { trader: profit, company: 0, note: '100% حصتك لأن الأرباح أقل من 15K$' };
      }
      const extra = profit - 15000;
      return { trader: 15000 + extra * 0.9, company: extra * 0.1, note: 'أول 15K$ كاملة لك، و90% مما فوقها' };
    },
  },
  {
    name: 'My Funded Futures',
    monogram: { text: 'MFF', from: '#16a34a', to: '#4ade80' },
    activationFee: 'لا توجد رسوم تفعيل (0$)',
    activationFeeValue: 0,
    profitSplitRule: 'تصل إلى 90% على خطط Rapid و80% للخطط العادية',
    payoutRule: 'توزيع وسحب أرباح دوري ومرن حسب نوع الخطة',
    drawdownRule: '3% نهاية اليوم (Core/Pro) أو 4% لحظي (Rapid) أو 4% ثابت نهاية اليوم (Flex)',
    consistencyRule: 'تتراوح بين 40% إلى 50% حسب الخطة المختارة',
    minTradingDays: 'يومان لخطة Core ويوم واحد لخطة Builder',
    nextStepRule: 'تفعيل حساب ممول محاكاة فوراً بنفس الخطة دون مرحلة انتظار معقدة',
    plans: [
      { name: 'Core 25K', price: '$77/شهر', profit: '$1,500', maxLoss: '$1,500', contracts: '2 عقود قياسية', sizeValue: 25000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Core 50K', price: '$157/شهر', profit: '$3,000', maxLoss: '$2,000', contracts: '4 عقود قياسية', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Rapid 100K (فوري)', price: '$267/شهر', profit: '—', maxLoss: '$3,000', contracts: '8 عقود قياسية', sizeValue: 100000, dailyStop: 'yes', accountType: 'instant' },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.9, company: profit * 0.1 }),
  },
  {
    name: 'Earn2Trade',
    logo: '/img/earn2trade.webp',
    activationFee: '$139 تُخصم من أول سحب فقط لتفعيل بيانات البورصة، ومجانية للحسابات الحقيقية',
    activationFeeValue: 139,
    profitSplitRule: '80% للمتداول و20% للشركة ثابتاً',
    payoutRule: 'دفع وسحب أسبوعي (كل أربعاء) بحد أدنى 100$ للسحب',
    drawdownRule: 'حد خسارة متحرك (Trailing) يرتفع عند إغلاق اليوم مع مراقبة لحظية للخرق',
    consistencyRule: '30% كحد أقصى لربح اليوم الواحد لضمان ثبات الأداء',
    minTradingDays: 'لا يوجد حد أدنى من الأيام حالياً في برنامج TCP',
    nextStepRule: 'تمويل مضمون والحصول على حساب LiveSim محاكى أو حساب حي مباشرة مع خطة تدرج حجم العقود',
    plans: [
      { name: 'TCP25', price: '$60/شهر', profit: '$1,750', maxLoss: '$1,500', contracts: '3 عقود قياسية', sizeValue: 25000, dailyStop: 'yes', accountType: 'evaluation', hasActivationFee: true },
      { name: 'TCP50', price: '$76/شهر', profit: '$3,000', maxLoss: '$2,000', contracts: '6 عقود قياسية', sizeValue: 50000, dailyStop: 'yes', accountType: 'evaluation', hasActivationFee: true },
      { name: 'TCP100', price: '$140/شهر', profit: '$6,000', maxLoss: '$3,500', contracts: '12 عقد قياسي', sizeValue: 100000, dailyStop: 'yes', accountType: 'evaluation', hasActivationFee: true },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.8, company: profit * 0.2 }),
  },
  {
    name: 'Blue Guardian Futures',
    monogram: { text: 'BG', from: '#1d4ed8', to: '#60a5fa' },
    activationFee: 'لا توجد رسوم تفعيل',
    activationFeeValue: 0,
    profitSplitRule: '100% من أول $15,000 أرباح ثم 90% للمتداول',
    payoutRule: 'أول سحب بعد 14 يوماً من أول صفقة، ثم كل 14 يوماً بشكل دوري',
    drawdownRule: 'حد خسارة نهاية اليوم لجميع الخطط ويتوقف عند الرصيد الابتدائي',
    consistencyRule: '40% أثناء التقييم، وتتراوح بين 20% إلى 40% بعد التمويل حسب الخطة',
    minTradingDays: '5 أيام تداول رابحة كل 7 أيام للحفاظ على نشاط الحساب الممول',
    nextStepRule: 'تفعيل حساب ممول محاكى بنفس قواعد التحدي فوراً بعد الاجتياز وتأكيد المستندات',
    plans: [
      { name: 'Standard One-Step 50K', price: '$85 (تقريبي)', profit: '$3,000', maxLoss: '$2,000', contracts: '3 عقود قياسية', sizeValue: 50000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: 'Reverse One-Step 50K', price: '$110 (تقريبي)', profit: '$3,000', maxLoss: 'لا يوجد خسارة يومي', contracts: '6 عقود قياسية', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Direct 50K (فوري)', price: '$135 (تقريبي)', profit: '—', maxLoss: 'لا يوجد خسارة يومي', contracts: '4 عقود قياسية', sizeValue: 50000, dailyStop: 'no', accountType: 'instant' },
    ],
    calcSplit: (profit) => {
      if (profit <= 15000) {
        return { trader: profit, company: 0, note: '100% حصتك لأن الأرباح أقل من 15K$' };
      }
      const extra = profit - 15000;
      return { trader: 15000 + extra * 0.9, company: extra * 0.1, note: 'أول 15K$ كاملة لك، و90% مما فوقها' };
    },
  },
  {
    name: 'FundedNext',
    logo: '/img/fundednext.webp',
    activationFee: 'لا توجد رسوم تفعيل (0$ تفعيل)',
    activationFeeValue: 0,
    profitSplitRule: 'نسبة أرباح 80% وتصل حتى 95% في خطط Flex',
    payoutRule: 'سحب الأرباح متاح كل 3 أيام وبسرعة تامة',
    drawdownRule: 'حد خسارة تراكمي نهاية اليوم يتوقف عند وصوله للرصيد الابتدائي (بدون حد يومي منفصل في Rapid)',
    consistencyRule: '40% بعد التمويل فقط، ولا توجد شروط اتساق أثناء التحدي',
    minTradingDays: 'يمكن اجتياز التحدي في يوم واحد فقط (بدون حد أدنى)',
    nextStepRule: 'حساب ممول محاكاة بربح 80% وسحب كل 3 أيام، وعند تحقيق $100K أرباح تُرقّى لحساب حي حقيقي',
    plans: [
      { name: 'Rapid 25K', price: '$99.99 (مرة واحدة)', profit: '$1,500', maxLoss: '$1,000', contracts: '2 قياسي / 10 مصغر', sizeValue: 25000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Rapid 50K', price: '$199.99 (مرة واحدة)', profit: '$3,000', maxLoss: '$2,000', contracts: '3 قياسي / 15 مصغر', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Legacy 100K', price: '$279.99 (مرة واحدة)', profit: '$5,000', maxLoss: '$2,500', contracts: '5 قياسي / 25 مصغر', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Bolt 50K (فوري)', price: '$220 (مرة واحدة)', profit: '—', maxLoss: '$2,000', contracts: '3 قياسي / 15 مصغر', sizeValue: 50000, dailyStop: 'yes', accountType: 'instant' },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.8, company: profit * 0.2 }),
  },
  {
    name: 'Futures Elite',
    monogram: { text: 'FE', from: '#b45309', to: '#facc15' },
    activationFee: 'لا توجد رسوم تفعيل (0$)',
    activationFeeValue: 0,
    profitSplitRule: 'تصل إلى 90% للمتداول و10% للشركة',
    payoutRule: 'دورة سحب كل 5 أيام تداول رابحة بحد أدنى يومي 150$-350$',
    drawdownRule: 'حد خسارة نهاية اليوم لمسار Elite، ومتحرك لحظي لمسار Prime',
    consistencyRule: '50% أثناء تحدي Elite و40% بعد التمويل لمسار Prime',
    minTradingDays: '5 أيام تداول رابحة قبل كل دورة سحب لتفعيل الدفعة',
    nextStepRule: 'تفعيل حساب ممول تلقائي وفوري فور تخطي التقييم وإرسال العقد الرقمي',
    plans: [
      { name: 'Prime 50K', price: '$99 (مرة واحدة)', profit: '$3,000', maxLoss: '$2,000', contracts: '3 عقود قياسية', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Prime 100K', price: '$189 (مرة واحدة)', profit: '$6,000', maxLoss: '$3,000', contracts: '8 عقود قياسية', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Prime 150K', price: '$279 (مرة واحدة)', profit: '$9,000', maxLoss: '$4,500', contracts: '12 عقد قياسي', sizeValue: 150000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Instant 50K (فوري)', price: '$310 (مرة واحدة)', profit: '—', maxLoss: '$2,000', contracts: '4 عقود قياسية', sizeValue: 50000, dailyStop: 'no', accountType: 'instant' },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.9, company: profit * 0.1 }),
  },
  {
    name: 'E8 Markets',
    logo: '/img/e8.webp',
    activationFee: 'تم إلغاء رسوم التفعيل (0$)',
    activationFeeValue: 0,
    profitSplitRule: '80% للمتداول و20% للشركة',
    payoutRule: 'سحب أسبوعي بشرط اجتياز 5 أيام رابحة بين السحوبات',
    drawdownRule: 'حد خسارة ديناميكي نهاية اليوم يتوقف عند وصوله للحد المخصص',
    consistencyRule: '35% (قاعدة أفضل يوم) لضمان اتساق الصفقات وعدم الاعتماد على صفقة واحدة',
    minTradingDays: '5 أيام تداول رابحة لتفعيل السحب الأسبوعي',
    nextStepRule: 'الترقية المباشرة لحساب Signature الممول وبدء التداول الفوري وسحب أسبوعي بعد 5 أيام رابحة',
    plans: [
      { name: 'Signature 50K', price: '$88 (مرة واحدة)', profit: '$3,000 (6%)', maxLoss: '$2,000', contracts: '4 عقود قياسية', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Signature 100K', price: '$149 (مرة واحدة)', profit: '$6,000 (6%)', maxLoss: '$3,000', contracts: '8 عقود قياسية', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Signature 150K', price: '$198 (مرة واحدة)', profit: '$9,000 (6%)', maxLoss: '$4,500', contracts: '12 عقد قياسي', sizeValue: 150000, dailyStop: 'no', accountType: 'evaluation' },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.8, company: profit * 0.2 }),
  },
  {
    name: 'Funded Futures Family',
    monogram: { text: 'FFF', from: '#be185d', to: '#f472b6' },
    activationFee: 'لا توجد رسوم تفعيل إضافية',
    activationFeeValue: 0,
    profitSplitRule: '100% من أول $10,000 ربح ثم 90% للمتداول و10% للشركة',
    payoutRule: 'من 3 إلى 7 أيام تداول رابحة لتفعيل السحب الأول حسب نوع الخطة',
    drawdownRule: 'نهاية اليوم لخطط Prime/Premier Plus، ومتحرك لحظي لVelocity/S2F',
    consistencyRule: '40% في معظم الخطط و25% في خطة الحساب الواحد منخفض التكلفة',
    minTradingDays: 'يوم واحد للتقييم، ومن 3-7 أيام رابحة قبل تفعيل السحب الممول',
    nextStepRule: 'تنشيط حساب ممول محاكى بنفس قواعد وعائلة الخطة المحددة فور النجاح',
    plans: [
      { name: 'Premier Plus 50K', price: '$89/شهر', profit: '$1,500', maxLoss: '$2,000', contracts: '3 عقود قياسية', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Premier Plus 100K', price: '$149/شهر', profit: '$3,000', maxLoss: '$3,000', contracts: '6 عقود قياسية', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Premier Plus 150K', price: '$229/شهر', profit: '$6,000', maxLoss: '$4,500', contracts: '15 عقد قياسي', sizeValue: 150000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'S2F 50K (فوري)', price: '$260 (مرة واحدة)', profit: '—', maxLoss: '$2,000', contracts: '5 عقود قياسية', sizeValue: 50000, dailyStop: 'no', accountType: 'instant' },
    ],
    calcSplit: (profit) => {
      if (profit <= 10000) {
        return { trader: profit, company: 0, note: '100% حصتك لأن الأرباح أقل من 10K$' };
      }
      const extra = profit - 10000;
      return { trader: 10000 + extra * 0.9, company: extra * 0.1, note: 'أول 10K$ كاملة لك، و90% مما فوقها' };
    },
  },
  {
    name: 'The Trading Pit Futures',
    monogram: { text: 'TTP', from: '#c2410c', to: '#fb923c' },
    activationFee: '$129 لمرة واحدة (تتوفر عروض ترويجية مجانية بقيمة 0$)',
    activationFeeValue: 0,
    profitSplitRule: '80% للمتداول و20% للشركة',
    payoutRule: 'أول سحب بعد 5 أيام رابحة بـ200$+ بحد أقصى 50% من الأرباح المحققة أو $5,000 كحد أقصى أول سحبين',
    drawdownRule: 'تريلينغ نهاية اليوم يتوقف عند الرصيد الابتدائي، مع آلية Daily Pause للإيقاف المؤقت بدلاً من إغلاق الحساب',
    consistencyRule: '5 أيام رابحة بـ200$+ كبديل لشرط الاتساق التقليدي المئوي',
    minTradingDays: '3 أيام تداول كحد أدنى وفترة تحدي قصوى 30 يوماً',
    nextStepRule: 'تفعيل حساب Earning Phase ممول مباشرة، مع تدرج عدد العقود تلقائياً بناءً على الربح المحقق',
    plans: [
      { name: '50K', price: '$99 (مرة واحدة)', profit: '$3,000', maxLoss: '$2,000', contracts: '5 عقود / 50 مصغر', sizeValue: 50000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: '100K', price: '$189 (مرة واحدة)', profit: '$6,000', maxLoss: '$3,000', contracts: '10 عقود / 100 مصغر', sizeValue: 100000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: '150K', price: '$289 (مرة واحدة)', profit: '$9,000', maxLoss: '$4,500', contracts: '15 عقد / 150 مصغر', sizeValue: 150000, dailyStop: 'yes', accountType: 'evaluation' },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.8, company: profit * 0.2 }),
  },
  {
    name: 'Hola Prime Futures',
    monogram: { text: 'HP', from: '#0f766e', to: '#2dd4bf' },
    activationFee: '0$ رسوم تفعيل مع استرداد كامل لرسوم التحدي',
    activationFeeValue: 0,
    profitSplitRule: '90% للمتداول و10% للشركة مع استرداد رسوم التقييم',
    payoutRule: 'سحب أسبوعي كل 7 أيام تقويمية دون شروط أيام رابحة معقدة',
    drawdownRule: 'تريلينغ 3% إلى 4% حسب حجم الحساب المختار',
    consistencyRule: '40% في تحدي خطوة واحدة، 35% في الحساب الممول، و20% في الحساب المباشر',
    minTradingDays: 'لا يوجد حد أدنى لعدد أيام التداول لاجتياز التقييم',
    nextStepRule: 'تنشيط حساب ممول محاكى بربح 90% بعد إثبات الهوية KYC',
    plans: [
      { name: '1-Step Prime 50K', price: '$99 (مرة واحدة)', profit: '$3,000 (6%)', maxLoss: '$2,000 (4%)', contracts: '5 عقود قياسية', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation' },
      { name: '1-Step Prime 100K', price: '$179 (مرة واحدة)', profit: '$6,000 (6%)', maxLoss: '$3,000 (3%)', contracts: '10 عقود قياسية', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'Instant Direct 50K (فوري)', price: '$210 (مرة واحدة)', profit: '—', maxLoss: '$2,000 (4%)', contracts: '3 عقود قياسية', sizeValue: 50000, dailyStop: 'yes', accountType: 'instant' },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.9, company: profit * 0.1 }),
  },
  {
    name: 'TradeDay',
    monogram: { text: 'TD', from: '#a21caf', to: '#e879f9' },
    activationFee: '$139 رسوم تفعيل لمرة واحدة لكل حساب Funded Sim جديد',
    activationFeeValue: 139,
    profitSplitRule: '50% من أول $4,000 ثم 80% للمتداول، وتصل لـ 90% في الحساب الحي',
    payoutRule: 'Quick Pay: سحب من اليوم الأول — Fast Pass: بعد 5 أيام تداول و5 أيام رابحة',
    drawdownRule: 'تريلينغ حسب اختيارك (لحظي أو نهاية اليوم في Quick Pay، ونهاية اليوم فقط في Fast Pass)',
    consistencyRule: '30% في مسار Quick Pay و45% في مسار Fast Pass',
    minTradingDays: '5 أيام في تقييم Quick Pay و3 أيام في Fast Pass',
    nextStepRule: 'حساب ممول محاكى (Funded Sim)، والترقية لحساب Live حقيقي بنسبة ربح 90% بعد إثبات الالتزام',
    plans: [
      { name: 'QuickPay 50K Intraday', price: '$125/شهر', profit: '$3,000', maxLoss: '$2,000', contracts: '5 عقود / 50 مصغر', sizeValue: 50000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'QuickPay 100K Intraday', price: '$230/شهر', profit: '$6,000', maxLoss: '$3,000', contracts: '10 عقود / 50 مصغر', sizeValue: 100000, dailyStop: 'no', accountType: 'evaluation' },
      { name: 'FastPass 150K EOD', price: '$350/شهر', profit: '$9,000', maxLoss: '$4,500', contracts: '15 عقد / 50 مصغر', sizeValue: 150000, dailyStop: 'no', accountType: 'evaluation' },
    ],
    calcSplit: (profit) => {
      if (profit <= 4000) {
        return { trader: profit * 0.5, company: profit * 0.5, note: '50% حصتك لأول 4,000$ ربح' };
      }
      const extra = profit - 4000;
      return { trader: 2000 + extra * 0.8, company: 2000 + extra * 0.2, note: '50% لأول 4K$ ثم 80% للباقي' };
    },
  },
  {
    name: 'FunderPro Futures',
    monogram: { text: 'FP', from: '#0e7490', to: '#22d3ee' },
    activationFee: '$129 لمرة واحدة تُخصم من أول عملية سحب ناجحة',
    activationFeeValue: 129,
    profitSplitRule: 'تصاعدي يبدأ من 60% ثم 70% ثم 80% مع كل عملية سحب ناجحة',
    payoutRule: 'أول سحب بعد 5 أيام رابحة بـ200$+، ثم سحب يومي بعد 15 يوم تداول نشط',
    drawdownRule: 'تريلينغ نهاية اليوم يتحول لثابت عند الوصول للرصيد الابتدائي، وحد خسارة يومي 2%',
    consistencyRule: '45% كحد أقصى لربح يوم واحد ويُلغى تماماً بعد أول 3 سحوبات ناجحة',
    minTradingDays: '5 أيام تداول رابحة لتفعيل السحب الأول و15 يوماً للسحب اليومي',
    nextStepRule: 'تفعيل حساب ممول مباشرة مع نسبة ربح متصاعدة تلقائياً مع كل سحب ناجح',
    plans: [
      { name: '50K', price: '$79/شهر', profit: '$3,000 (6%)', maxLoss: '$2,000 (4%)', contracts: '5 عقود / 50 مصغر', sizeValue: 50000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: '100K', price: '$149/شهر', profit: '$6,000 (6%)', maxLoss: '$3,000 (3%)', contracts: '10 عقود / 100 مصغر', sizeValue: 100000, dailyStop: 'yes', accountType: 'evaluation' },
      { name: '150K', price: '$219/شهر', profit: '$9,000 (6%)', maxLoss: '$4,500 (3%)', contracts: '15 عقد / 150 مصغر', sizeValue: 150000, dailyStop: 'yes', accountType: 'evaluation' },
    ],
    calcSplit: (profit) => ({ trader: profit * 0.8, company: profit * 0.2, note: 'بافتراض الوصول للمرحلة القصوى (80%) بعد التدرج' }),
  },
];

type ActivationFilter = 'all' | 'yes' | 'no';
type DailyStopFilter = 'all' | 'yes' | 'no';
type AccountTypeFilter = 'all' | 'evaluation' | 'instant';

export function Simulator() {
  const [selectedCompIndex, setSelectedCompIndex] = useState(0);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [customProfit, setCustomProfit] = useState(5000);

  // Phase 1 specific simulation states
  const [demoProfit, setDemoProfit] = useState(0);

  // Phase 2 (activation) — كان فيها محاكاة KYC وتوقيع عقد، تم استبدالها بملخص غير تفاعلي
  const [activationAcknowledged, setActivationAcknowledged] = useState(false);

  // فلاتر خطط الحساب: رسوم التفعيل / الوقف اليومي / نوع الحساب
  const [activationFilter, setActivationFilter] = useState<ActivationFilter>('all');
  const [dailyStopFilter, setDailyStopFilter] = useState<DailyStopFilter>('all');
  const [typeFilter, setTypeFilter] = useState<AccountTypeFilter>('all');

  const company = SIM_COMPANIES[selectedCompIndex];

  const filteredPlans = useMemo(() => {
    return company.plans.filter((pl) => {
      const planHasActivation = pl.hasActivationFee ?? company.activationFeeValue > 0;
      if (activationFilter === 'yes' && !planHasActivation) return false;
      if (activationFilter === 'no' && planHasActivation) return false;
      if (dailyStopFilter !== 'all' && pl.dailyStop !== dailyStopFilter) return false;
      if (typeFilter !== 'all' && pl.accountType !== typeFilter) return false;
      return true;
    });
  }, [company, activationFilter, dailyStopFilter, typeFilter]);

  const plan = filteredPlans[selectedPlanIndex] || filteredPlans[0] || company.plans[0];

  // Reset steps and sub-simulations when changing company or plan
  const handleCompanyChange = (index: number) => {
    setSelectedCompIndex(index);
    setSelectedPlanIndex(0);
    setActiveStep(0);
    setDemoProfit(0);
    setActivationAcknowledged(false);
    setActivationFilter('all');
    setDailyStopFilter('all');
    setTypeFilter('all');
  };

  const handlePlanChange = (index: number) => {
    setSelectedPlanIndex(index);
    setActiveStep(0);
    setDemoProfit(0);
    setActivationAcknowledged(false);
  };

  // Parse target profit for Phase 1 simulation dynamically
  const targetProfitValue = useMemo(() => {
    const clean = plan.profit.replace(/[^0-9]/g, '');
    return parseInt(clean, 10) || 3000;
  }, [plan]);

  const splitResult = useMemo(() => {
    return company.calcSplit(customProfit);
  }, [company, customProfit]);

  // Grid background style representing blueprint grid paper
  const blueprintGridStyle = {
    backgroundImage: `
      radial-gradient(circle at 1px 1px, rgba(212, 132, 90, 0.08) 1px, transparent 0),
      linear-gradient(rgba(212, 132, 90, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212, 132, 90, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: '16px 16px, 32px 32px, 32px 32px',
    backgroundColor: '#0c0a08',
  };

  // Visual Stepper Data
  const steps = [
    {
      phase: 'PHASE-01',
      title: 'التقييم والاختبار',
      subtitle: 'إثبات مهارات التداول والمخاطر',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      desc: 'في هذه المرحلة تقوم بشراء الحساب وتتداول على حساب تجريبي لتحقيق هدف الأرباح المطلوب مع الالتزام بقواعد الخسارة والاتساق.',
    },
    {
      phase: 'PHASE-02',
      title: 'التنشيط والتوثيق',
      subtitle: 'تجاوز الاختبار والتوقيع الرقمي',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      desc: 'عند اجتياز التحدي بنجاح، يتم إنهاء الحساب التجريبي وبدء مراجعة وتوثيق الهوية KYC وتوقيع اتفاقية المتداول الممول وتفعيل الحساب.',
    },
    {
      phase: 'PHASE-03',
      title: 'التمويل وسحب الأرباح',
      subtitle: 'التداول الحقيقي وجني ثمار عملك',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      desc: 'تداول بحساب ممول واسحب أرباحك الحقيقية بشكل دوري مع إمكانية زيادة سقف التمويل والترقية للحساب المباشر بالبورصة عند استمرار التزامك.',
    },
  ];

  return (
    <div
      style={blueprintGridStyle}
      className="relative glass-panel mb-14 overflow-hidden p-6 sm:p-9 border border-[#d4845a]/20 shadow-[0_30px_90px_rgba(0,0,0,0.85)] rounded-3xl"
    >
      {/* ── Geometric blueprint style grid lines and tech notes ── */}
      <div className="absolute top-3 left-4 text-[9px] font-mono text-orange-500/30 select-none tracking-widest hidden sm:block font-sans">
        SYS.LOC: FUTURES_SIM // SCALE: 1.00 // REF_GRID: 32PX
      </div>
      <div className="absolute top-3 right-4 text-[9px] font-mono text-orange-500/30 select-none tracking-widest hidden sm:block font-sans">
        EZZO PROTOCOL v2.4 // STATUS: ACTIVE
      </div>
      <div className="absolute bottom-3 left-4 text-[9px] font-mono text-orange-500/20 select-none hidden sm:block font-sans">
        [X: 142.92, Y: 802.11] ACC: QUALIFIED_SIM
      </div>
      
      {/* Corner Technical Crosshairs */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-orange-500/30" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-orange-500/30" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-orange-500/30" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-orange-500/30" />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-4.5 py-1.5 text-[11px] font-mono tracking-wider text-orange-400 uppercase font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          مخطط رحلة التمويل والتمثيل الهندسي
        </div>
        <h2 className="section-heading mb-3 text-3xl sm:text-4xl font-extrabold text-[#f0ebe4]">
          محاكي خارطة طريق الحساب الممول
        </h2>
        <p className="section-subheading mx-auto max-w-2xl text-xs sm:text-sm text-gray-400 leading-relaxed font-almarai">
          انقر فوق خطوات المسار الهندسي لرؤية الخيارات، القواعد الفنية، وعش تجربة الانتقال من مرحلة التقييم وصولاً للتمويل الفعلي وصرف الأرباح.
        </p>
      </div>

      {/* ── Control Deck: Selector controls ───────────────────── */}
      <div className="grid gap-6 lg:grid-cols-12 mb-9 relative z-10">
        {/* Company Control board */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400/70 font-bold font-sans">01 / تحديد شركة التمويل</span>
            <span className="text-[9px] font-mono text-gray-600 font-sans">PRO-FIRM_SELECTION</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[190px] overflow-y-auto pr-1 border border-white/5 bg-black/45 rounded-2xl p-2.5 custom-scrollbar">
            {SIM_COMPANIES.map((comp, idx) => {
              const isSelected = selectedCompIndex === idx;
              return (
                <button
                  key={comp.name}
                  onClick={() => handleCompanyChange(idx)}
                  className={`relative flex items-center gap-2.5 rounded-xl border p-2.5 text-right transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? 'border-orange-500/40 bg-orange-500/10 text-white shadow-[0_0_20px_rgba(212,132,90,0.12)]'
                      : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {/* Status Indicator Dot */}
                  <span className={`absolute top-1.5 left-1.5 w-1 h-1 rounded-full ${isSelected ? 'bg-orange-500 shadow-[0_0_6px_#d4845a]' : 'bg-white/10'}`} />

                  {/* Monogram or Logo */}
                  {comp.logo ? (
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg overflow-hidden bg-white p-0.5">
                      <img src={comp.logo} alt={comp.name} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[9px] text-white"
                      style={{
                        background: `linear-gradient(135deg, ${comp.monogram?.from}, ${comp.monogram?.to})`,
                      }}
                    >
                      {comp.monogram?.text}
                    </div>
                  )}
                  <span className="text-[11px] font-bold truncate leading-tight">{comp.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Plan & Value Control board */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400/70 font-bold font-sans">02 / خيارات الحساب والهدف</span>
            <span className="text-[9px] font-mono text-gray-600 font-sans">CAPITAL_PLAN_SELECTION</span>
          </div>

          {/* Filter chips */}
          <div className="mb-2 flex flex-col gap-1.5 rounded-2xl border border-white/5 bg-black/45 p-2.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono text-gray-500 shrink-0">رسوم التفعيل:</span>
              {([
                { v: 'all', label: 'الكل' },
                { v: 'yes', label: 'يوجد' },
                { v: 'no', label: 'بدون' },
              ] as { v: ActivationFilter; label: string }[]).map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => setActivationFilter(opt.v)}
                  className={`rounded-full px-2.5 py-1 text-[9.5px] font-bold transition-all ${
                    activationFilter === opt.v
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : 'bg-white/[0.02] text-gray-500 border border-white/5 hover:text-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono text-gray-500 shrink-0">وقف يومي:</span>
              {([
                { v: 'all', label: 'الكل' },
                { v: 'yes', label: 'يوجد' },
                { v: 'no', label: 'بدون' },
              ] as { v: DailyStopFilter; label: string }[]).map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => setDailyStopFilter(opt.v)}
                  className={`rounded-full px-2.5 py-1 text-[9.5px] font-bold transition-all ${
                    dailyStopFilter === opt.v
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : 'bg-white/[0.02] text-gray-500 border border-white/5 hover:text-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono text-gray-500 shrink-0">نوع الحساب:</span>
              {([
                { v: 'all', label: 'الكل' },
                { v: 'evaluation', label: 'تحدي/تقييم' },
                { v: 'instant', label: 'فوري' },
              ] as { v: AccountTypeFilter; label: string }[]).map((opt) => (
                <button
                  key={opt.v}
                  onClick={() => setTypeFilter(opt.v)}
                  className={`rounded-full px-2.5 py-1 text-[9.5px] font-bold transition-all ${
                    typeFilter === opt.v
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : 'bg-white/[0.02] text-gray-500 border border-white/5 hover:text-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-2 border border-white/5 bg-black/45 rounded-2xl p-3 max-h-[260px] overflow-y-auto custom-scrollbar">
            {filteredPlans.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                <span className="text-2xl">🔍</span>
                <span className="text-xs text-gray-400 font-sans">لا توجد حسابات مطابقة لهذه الفلاتر لدى {company.name}</span>
                <button
                  onClick={() => { setActivationFilter('all'); setDailyStopFilter('all'); setTypeFilter('all'); }}
                  className="mt-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold text-orange-300"
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            ) : (
              filteredPlans.map((pl) => {
                const idx = company.plans.indexOf(pl);
                const isSelected = selectedPlanIndex === idx;
                return (
                  <button
                    key={pl.name}
                    onClick={() => handlePlanChange(idx)}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-3 text-right transition-all duration-200 ${
                      isSelected
                        ? 'border-orange-500/40 bg-orange-500/10 text-white shadow-[0_0_15px_rgba(212,132,90,0.08)]'
                        : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-gray-400'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold block text-white font-mono">{pl.name}</span>
                      <span className="text-[9.5px] text-gray-500 block mt-1 font-sans">
                        الهدف: <span className="text-gray-300 font-mono">{pl.profit}</span> | التراجع الأقصى: <span className="text-gray-300 font-mono">{pl.maxLoss}</span>
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-orange-300 font-mono bg-orange-500/5 px-2 py-1 rounded-md border border-orange-500/10">{pl.price}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ── Dynamic Roadmap Diagram Canvas (SVG flow) ─────────── */}
      <div className="relative mb-9 mt-4 px-2 select-none z-10">
        {/* Desktop View Horizontal Layout */}
        <div className="relative hidden md:block h-32 w-full bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
          {/* Technical Blueprint SVG Path */}
          <svg className="absolute inset-0 w-full h-full" style={{ direction: 'ltr' }}>
            {/* Base flow track */}
            <path
              d="M 190 64 L 380 64 Q 480 64 480 64"
              className="stroke-white/5 fill-none"
              strokeWidth="3"
            />
            <path
              d="M 180 64 L 780 64"
              className="stroke-orange-500/10 fill-none"
              strokeWidth="2.5"
              strokeDasharray="4 6"
            />

            {/* Glowing flowing lines between active stages */}
            {activeStep >= 0 && (
              <motion.path
                d="M 180 64 L 780 64"
                className="stroke-orange-500/35 fill-none"
                strokeWidth="2"
                strokeDasharray="8 12"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
              />
            )}
            
            {/* Flow to active step highlighted in green if completed */}
            {activeStep >= 1 && (
              <motion.path
                d="M 600 64 L 180 64"
                className="stroke-green-500/40 fill-none"
                strokeWidth="2"
                strokeDasharray="6 8"
                animate={{ strokeDashoffset: [0, -32] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
              />
            )}
          </svg>

          {/* Coordinates grid decoration */}
          <div className="absolute inset-0 flex justify-between px-16 items-end pb-2 pointer-events-none opacity-40 font-mono text-[7.5px] text-orange-500/40 font-sans">
            <span>NODE_ADDR: 0x82A</span>
            <span>CONN_PORT: 5120</span>
            <span>STAGE_GATE: EN_CORE</span>
          </div>

          {/* Node buttons */}
          <div className="absolute inset-0 flex justify-around items-center px-12">
            {steps.map((st, idx) => {
              const isActive = activeStep === idx;
              const isCompleted = activeStep > idx;
              return (
                <button
                  key={st.phase}
                  onClick={() => setActiveStep(idx)}
                  className="relative group flex flex-col items-center focus:outline-none font-sans"
                  style={{ width: '180px' }}
                >
                  {/* Glowing Node Backdrop */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute -top-3 w-16 h-16 rounded-full bg-orange-500/15 blur-md"
                    />
                  )}

                  {/* Rotating technical indicator ring */}
                  {isActive && (
                    <motion.svg
                      className="absolute -top-2 w-14 h-14 text-orange-400"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
                    >
                      <circle
                        cx="28"
                        cy="28"
                        r="25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    </motion.svg>
                  )}

                  {/* Node Circle */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-orange-500 bg-[#16120e] text-orange-400 scale-110 shadow-[0_0_20px_rgba(212,132,90,0.25)]'
                        : isCompleted
                        ? 'border-green-500 bg-[#0e1610] text-green-400'
                        : 'border-white/10 bg-[#12100e] text-gray-500 group-hover:border-white/20'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      st.icon
                    )}
                  </div>

                  <span className="mt-2 text-[9px] font-mono text-orange-500/50 font-bold block font-sans">{st.phase}</span>
                  <span
                    className={`text-[11px] font-bold block leading-tight mt-0.5 transition-colors duration-200 font-sans ${
                      isActive ? 'text-orange-400' : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  >
                    {st.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile View Vertical Layout */}
        <div className="md:hidden flex flex-col gap-3.5 relative bg-black/25 border border-white/5 rounded-2xl p-4.5 overflow-hidden">
          {/* Background Technical Grid lines for Mobile */}
          <div className="absolute top-0 right-7 bottom-0 w-0.5 bg-orange-500/10 border-r border-dashed border-orange-500/5" />
          
          {steps.map((st, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;
            return (
              <button
                key={st.phase}
                onClick={() => setActiveStep(idx)}
                className={`relative flex items-center gap-4.5 text-right w-full p-3.5 rounded-xl border transition-all duration-200 z-10 ${
                  isActive
                    ? 'border-orange-500/30 bg-orange-500/10 shadow-[0_0_15px_rgba(212,132,90,0.06)]'
                    : isCompleted
                    ? 'border-green-500/20 bg-green-500/5'
                    : 'border-white/5 bg-transparent'
                }`}
              >
                {/* Checkpoint Status Indicator */}
                <div
                  className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-orange-500 bg-[#16120e] text-orange-400'
                      : isCompleted
                      ? 'border-green-500 bg-[#0e1610] text-green-400'
                      : 'border-white/10 bg-[#100e0c] text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    st.icon
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-mono text-orange-500/40 font-bold font-sans">{st.phase}</span>
                    {isCompleted && <span className="text-[8px] text-green-500 font-mono font-bold font-sans">[COMPLETED]</span>}
                    {isActive && <span className="text-[8px] text-orange-400 font-mono font-bold animate-pulse font-sans">[PROCESSING]</span>}
                  </div>
                  <h4 className={`text-xs font-bold ${isActive ? 'text-orange-400' : 'text-gray-300'}`}>{st.title}</h4>
                  <p className="text-[9px] text-gray-500 truncate font-almarai mt-0.5">{st.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Active Step Interactive Details Card ─────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="border border-white/5 bg-black/35 rounded-2xl p-5 sm:p-7 mb-7 text-right relative z-10 overflow-hidden"
        >
          {/* Engineering backdrop watermark */}
          <div className="absolute top-2 left-3 font-mono text-[9px] text-white/5 select-none font-bold font-sans">
            STAGE_SCHEMATIC_DRAWING_{activeStep + 1}
          </div>

          <div className="flex items-start justify-between mb-5 border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${activeStep === 0 ? 'bg-orange-500/10 text-orange-400' : activeStep === 1 ? 'bg-amber-500/10 text-amber-400' : 'bg-green-500/10 text-green-400'}`}>
                {steps[activeStep].icon}
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#f0ebe4] flex items-center gap-2">
                  <span className="text-[9.5px] font-mono text-orange-500 bg-orange-500/5 border border-orange-500/10 px-1.5 py-0.5 rounded font-sans">
                    {steps[activeStep].phase}
                  </span>
                  {steps[activeStep].title}
                </h3>
                <p className="text-[10px] text-gray-500 font-semibold mt-1 font-almarai">{steps[activeStep].subtitle}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-600 tracking-wider font-sans">REF_ID: 10{activeStep}A</span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-almarai mb-6">
            {steps[activeStep].desc}
          </p>

          <div className="grid gap-6 md:grid-cols-12">
            {/* Technical Parameters specs */}
            <div className="md:col-span-6 space-y-3">
              <span className="text-[10px] font-mono tracking-wider text-orange-400/60 uppercase block mb-1 font-sans">Technical parameters / المواصفات الفنية</span>
              
              {activeStep === 0 && (
                <div className="space-y-2.5 font-sans">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">قيمة الاشتراك المالي:</span>
                    <span className="font-mono font-bold text-orange-300">{plan.price}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">الربح المستهدف للاجتياز:</span>
                    <span className="font-mono font-bold text-green-400">{plan.profit}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">الحد الأقصى للتراجع والوقف:</span>
                    <span className="font-mono font-bold text-red-400">{plan.maxLoss}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">الحد الأقصى لحجم العقود:</span>
                    <span className="font-mono font-bold text-gray-300">{plan.contracts}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">أيام التداول الدنيا للاجتياز:</span>
                    <span className="font-bold text-gray-300 font-almarai">{company.minTradingDays}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">شرط الاتساق (Consistency):</span>
                    <span className="font-bold text-gray-300 font-almarai">{company.consistencyRule}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">آلية التراجع والخسارة:</span>
                    <span className="font-bold text-gray-300 font-almarai leading-relaxed text-left text-[11px] max-w-[200px]">{company.drawdownRule}</span>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-2.5 font-sans">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">رسوم التنشيط (مرة واحدة):</span>
                    <span className="font-mono font-bold text-orange-300">{company.activationFee}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">نوع الحساب عند الاجتياز:</span>
                    <span className="font-bold text-gray-300 font-almarai leading-relaxed text-left text-[11px] max-w-[200px]">{company.nextStepRule}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">مدة التفعيل المتوقعة:</span>
                    <span className="font-bold text-gray-300 font-almarai">خلال 24-72 ساعة عمل</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">التدقيق والـ KYC:</span>
                    <span className="font-bold text-gray-300 font-almarai font-sans">إثبات هوية رسمي + إثبات إقامة</span>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-2.5 font-sans">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">نسبة تقاسم الأرباح الأساسية:</span>
                    <span className="font-bold text-green-400 font-almarai">{company.profitSplitRule}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">سياسة وجدول السحب:</span>
                    <span className="font-bold text-gray-300 font-almarai leading-relaxed text-left text-[11px] max-w-[200px]">{company.payoutRule}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">الحد الأدنى للسحب الفردي:</span>
                    <span className="font-mono font-bold text-gray-300">$100 - $250</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/5 text-xs">
                    <span className="text-gray-400 font-almarai font-sans">الترقية والمستقبل المباشر:</span>
                    <span className="font-bold text-orange-400 font-almarai leading-relaxed text-[10.5px] text-left max-w-[200px] font-sans">الترقية إلى حساب تداول حي بالبورصة بتمويلات ضخمة وسقوف غير محدودة</span>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Simulator Side */}
            <div className="md:col-span-6 bg-black/45 rounded-xl p-4 sm:p-5 border border-white/5 relative flex flex-col justify-between">
              {/* INTERACTIVE WORKSPACE 1 */}
              {activeStep === 0 && (
                <div className="flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[10px] font-mono tracking-wider text-orange-400 font-bold font-sans">Trading Simulator / محاكي التداول التجريبي</span>
                      <span className="text-[8px] font-mono text-gray-600 font-sans">[DATA_FEED: ON]</span>
                    </div>

                    {/* Geometric SVG Chart drawing */}
                    <div className="relative w-full h-24 bg-black/40 rounded-xl border border-white/5 mb-3.5 overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 300 90" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(212, 132, 90, 0.08)" strokeDasharray="2 2" />
                        <line x1="0" y1="45" x2="300" y2="45" stroke="rgba(212, 132, 90, 0.08)" strokeDasharray="2 2" />
                        <line x1="0" y1="70" x2="300" y2="70" stroke="rgba(212, 132, 90, 0.08)" strokeDasharray="2 2" />
                        
                        <text x="5" y="15" fill="#10b981" fontSize="6.5" fontFamily="monospace" opacity="0.6">TARGET: +{plan.profit}</text>
                        <text x="5" y="41" fill="#9a8a7e" fontSize="6.5" fontFamily="monospace" opacity="0.6">START: $0</text>
                        <text x="5" y="66" fill="#ef4444" fontSize="6.5" fontFamily="monospace" opacity="0.6">MAX_LOSS: -{plan.maxLoss}</text>

                        {/* Draw geometric equity path */}
                        <path
                          d={`M 0 45 L 60 55 L 120 35 L 180 50 L 240 ${45 - (demoProfit / targetProfitValue) * 20} L 290 ${45 - (demoProfit / targetProfitValue) * 25}`}
                          fill="none"
                          stroke={demoProfit >= targetProfitValue ? '#10b981' : '#d4845a'}
                          strokeWidth="1.8"
                          className="transition-all duration-300"
                        />
                        {/* Pulses on the chart endpoints */}
                        <circle cx="290" cy={45 - (demoProfit / targetProfitValue) * 25} r="2.5" fill={demoProfit >= targetProfitValue ? '#10b981' : '#d4845a'} className="animate-pulse" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-400 font-almarai font-bold">حرك الشريط لمحاكاة تحقيق الأرباح في الاختبار:</span>
                      <span className="text-[12px] font-mono text-green-400 font-bold">${demoProfit.toLocaleString()}</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max={targetProfitValue}
                      step={Math.round(targetProfitValue / 20)}
                      value={demoProfit}
                      onChange={(e) => setDemoProfit(Number(e.target.value))}
                      className="w-full accent-orange-500 bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer mt-1"
                    />

                    <div className="flex justify-between text-[8px] font-mono text-gray-600 mt-1.5 font-sans">
                      <span>$0</span>
                      <span>الهدف: ${targetProfitValue.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Pass/Fail message trigger */}
                  <div className="min-h-[50px] flex items-center justify-center text-center">
                    {demoProfit >= targetProfitValue ? (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-green-500/10 border border-green-500/20 rounded-xl p-2.5 w-full"
                      >
                        <span className="text-[11px] font-bold text-green-400 block font-almarai">
                          🎉 تم تحقيق هدف الربح بنجاح!
                        </span>
                        <button
                          onClick={() => setActiveStep(1)}
                          className="mt-1.5 text-[9.5px] font-bold text-[#0c0a08] bg-green-400 hover:bg-green-300 transition-colors px-3 py-1 rounded-lg flex items-center gap-1 mx-auto"
                        >
                          انتقل إلى المرحلة الثانية (التفعيل) 
                          <svg className="w-3.5 h-3.5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </motion.div>
                    ) : (
                      <span className="text-[10px] text-gray-500 font-almarai italic">
                        يرجى تحقيق الربح المستهدف (${targetProfitValue.toLocaleString()}) للمحاكاة وتجاوز التقييم.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* INTERACTIVE WORKSPACE 2 */}
              {activeStep === 1 && (
                <div className="flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono tracking-wider text-orange-400 font-bold font-sans">ملخص التفعيل / ACTIVATION SUMMARY</span>
                      <span className="text-[8px] font-mono text-gray-600 font-sans">STAGE_02</span>
                    </div>

                    <div className="space-y-3">
                      {/* Activation fee summary */}
                      <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs">🔓</span>
                            <span className="text-[10.5px] text-gray-300 font-bold font-almarai">رسوم التفعيل لهذه الخطة</span>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-orange-300 font-mono">
                          {(plan.hasActivationFee ?? company.activationFeeValue > 0) ? company.activationFee : 'بدون رسوم تفعيل'}
                        </span>
                      </div>

                      {/* Next step rule summary */}
                      <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs">📄</span>
                            <span className="text-[10.5px] text-gray-300 font-bold font-almarai">خطوات ما بعد اجتياز التقييم</span>
                          </div>
                        </div>
                        <span className="text-[10.5px] text-gray-400 font-almarai leading-relaxed block">
                          {company.nextStepRule || 'يقوم فريق الشركة بمراجعة الحساب والتحقق من الهوية (KYC) وتوقيع اتفاقية التداول مباشرة عبر منصتها الرسمية قبل تفعيل مرحلة التمويل.'}
                        </span>
                        <span className="text-[9px] text-amber-500/70 font-almarai block mt-1.5">
                          * التحقق من الهوية وتوقيع العقد يتمّان مباشرة مع الشركة عبر موقعها الرسمي، وليسا جزءًا من هذا المحاكي.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Continue button */}
                  <div className="min-h-[50px] flex items-center justify-center text-center">
                    {activationAcknowledged ? (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-green-500/10 border border-green-500/20 rounded-xl p-2.5 w-full"
                      >
                        <span className="text-[11px] font-bold text-green-400 block font-almarai">
                          ✅ جاهز للانتقال لمرحلة التداول الممول!
                        </span>
                        <button
                          onClick={() => setActiveStep(2)}
                          className="mt-1.5 text-[9.5px] font-bold text-[#0c0a08] bg-green-400 hover:bg-green-300 transition-colors px-3 py-1 rounded-lg flex items-center gap-1 mx-auto"
                        >
                          بدء التداول الممول وجني الأرباح 🚀
                        </button>
                      </motion.div>
                    ) : (
                      <button
                        onClick={() => setActivationAcknowledged(true)}
                        className="w-full py-2 text-[10px] font-bold text-orange-300 bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/20 rounded-lg transition-colors font-almarai"
                      >
                        اطلعت على تفاصيل التفعيل، متابعة →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* INTERACTIVE WORKSPACE 3 */}
              {activeStep === 2 && (
                <div className="flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[10px] font-mono tracking-wider text-orange-400 font-bold font-sans">Funded account simulation / محاكاة الحساب الممول والتدفق المالي</span>
                      <span className="text-[8px] font-mono text-gray-600 font-sans">[GATEWAY: ONLINE]</span>
                    </div>

                    {/* Cash flow Pipeline Layout */}
                    <div className="relative w-full h-14 bg-black/40 rounded-xl border border-white/5 mb-3 flex items-center justify-between px-5 overflow-hidden">
                      {/* Company Vault */}
                      <div className="flex flex-col items-center z-10">
                        <span className="text-lg">🏦</span>
                        <span className="text-[8.5px] text-gray-500 font-bold font-almarai mt-0.5">خزنة {company.name}</span>
                      </div>

                      {/* Moving Cash pulses pipeline */}
                      <div className="flex-1 h-3 mx-2 bg-black/55 rounded-full border border-white/5 relative overflow-hidden">
                        {/* Glowing dash line */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(212,132,90,0.2)_1px,transparent_1px)] bg-[size:10px_100%] animate-pulse" />
                        
                        {/* Flowing green cash dots */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"
                            initial={{ right: '0%' }}
                            animate={{ right: '100%' }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                              delay: i * 0.33,
                            }}
                          />
                        ))}
                      </div>

                      {/* Trader Wallet */}
                      <div className="flex flex-col items-center z-10">
                        <span className="text-lg">💰</span>
                        <span className="text-[8.5px] text-orange-400 font-bold font-almarai mt-0.5">محفظتك (المتداول)</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center leading-relaxed font-almarai mb-2">
                      تم تنشيط حسابك الممول بنجاح! يتم ترحيل الأرباح ونبضات التدفق المالي إلى محفظتك بنسبة تقاسم أرباح <span className="text-green-400 font-bold">{company.profitSplitRule.split(' ')[0]}</span>.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        // Highlight simulator page sections if any
                        const calcEl = document.getElementById('profit-calculator-deck');
                        if (calcEl) {
                          calcEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full py-2 text-[10px] font-bold text-center text-[#0c0a08] bg-orange-400 hover:bg-orange-300 rounded-lg transition-colors font-almarai"
                    >
                      استخدم حاسبة توزيع الأرباح التفاعلية بالأسفل 📊
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Profit Calculator Deck ─────────────────────────── */}
      <div id="profit-calculator-deck" className="border border-orange-500/10 bg-gradient-to-br from-orange-500/[0.02] to-transparent rounded-2xl p-5 sm:p-7 text-right relative z-10">
        <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-3">
          <span className="text-xl">📊</span>
          <div>
            <h3 className="text-sm font-extrabold text-[#f0ebe4] font-almarai">حاسبة توزيع أرباح {company.name}</h3>
            <p className="text-[10px] text-gray-500 font-semibold mt-1 font-almarai">احسب حصتك الصافية من الأرباح بناءً على شروط وقواعد الشركة ونسب التوزيع</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-12 items-center">
          {/* Slider Controls */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] text-gray-400 font-almarai font-bold">الأرباح التقديرية المحققة في الحساب الممول:</span>
                <span className="text-sm font-extrabold text-orange-400 font-mono">
                  ${customProfit.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="30000"
                step="500"
                value={customProfit}
                onChange={(e) => setCustomProfit(Number(e.target.value))}
                className="w-full accent-orange-500 bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-gray-600 mt-1 font-sans">
                <span>$500</span>
                <span>$10,000</span>
                <span>$20,000</span>
                <span>$30,000</span>
              </div>
            </div>

            <div className="bg-black/35 rounded-xl p-3 border border-white/5">
              <span className="text-[9px] text-orange-500/50 block font-bold mb-1 font-mono uppercase font-sans">RULE_APPLIED: قواعد التوزيع للشركة</span>
              <p className="text-[11px] text-gray-300 leading-relaxed font-almarai">
                {company.profitSplitRule} {splitResult.note && `(${splitResult.note})`}
              </p>
            </div>
          </div>

          {/* Calculator Output */}
          <div className="md:col-span-5 grid grid-cols-2 gap-2 text-center">
            <div className="bg-[#0c0a08]/90 rounded-xl border border-green-500/20 p-3.5 shadow-lg shadow-green-500/[0.03]">
              <span className="text-[10px] text-gray-500 block font-almarai">حصتك كمتداول</span>
              <span className="text-lg font-black text-green-400 block mt-1.5 font-mono">
                ${splitResult.trader.toLocaleString()}
              </span>
              <span className="text-[9px] text-green-500/70 mt-1 block">{(splitResult.trader / customProfit * 100).toFixed(0)}% من الأرباح</span>
            </div>

            <div className="bg-[#0c0a08]/90 rounded-xl border border-white/5 p-3.5">
              <span className="text-[10px] text-gray-500 block font-almarai">حصة شركة التمويل</span>
              <span className="text-lg font-black text-gray-300 block mt-1.5 font-mono">
                ${splitResult.company.toLocaleString()}
              </span>
              <span className="text-[9px] text-gray-500 mt-1 block">{(splitResult.company / customProfit * 100).toFixed(0)}% للشركة</span>
            </div>

            <div className="col-span-2 bg-[#0c0a08]/50 rounded-xl border border-orange-500/10 p-2.5 flex justify-between items-center px-4 mt-1">
              <span className="text-[10px] text-gray-400 font-almarai font-bold">تكلفة التحدي الأولية (تدفع لمرة واحدة عند التسجيل):</span>
              <span className="text-xs font-bold text-orange-300 font-mono">{plan.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
