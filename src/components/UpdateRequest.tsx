'use client';

import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const UpdateRequest = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tvUsername, setTvUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [ip, setIp] = useState("");

  // جلب الـ IP الخاص بالجهاز عند تحميل المكون
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(err => console.error(err));
  }, []);

  // استبدل "mleyqqlg" بمعرف النموذج الخاص بك في Formspree
  const [state, handleSubmit] = useForm("mleyqqlg");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    setModalOpen(false);
  };

  if (state.succeeded) {
    return (
<div className="flex items-center justify-center py-4 mb-8">
  <div className="text-center">
    <h2 className="text-xl mb-4 text-orange-500 animate-pulse text-xl">تم طلب التحديث</h2>
    <p className="text-orange-600 animate-pulse text-xl">سوف يتم تحديثه بأسرع وقت ممكن.</p>
  </div>
</div>

    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      {/* زر طلب التحديث مع مساحة وبوردر جذاب */}
      <div className="text-center mb-8">
        <button
          onClick={() => setModalOpen(true)}
          className="text-4xl font-extrabold text-orange-500 sm:text-5xl transition-transform duration-500 hover:scale-105 px-6 py-3 border-2 border-orange-500 rounded-lg my-6"
        >
          طلب تحديث
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl mb-4 text-black">أدخل بيانات حسابك</h2>
            <form onSubmit={onSubmit}>
              {/* حقل رقم الطلب */}
              <div className="mb-4">
                <label htmlFor="orderNumber" className="block text-lg font-medium text-black mb-1">
                  رقم الطلب:
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  name="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder="رقم الطلب"
                  required
                />
                <ValidationError prefix="orderNumber" field="orderNumber" errors={state.errors} />
              </div>

              {/* حقل يوزر حساب TradingView */}
              <div className="mb-4">
                <label htmlFor="tvUsername" className="block text-lg font-medium text-black mb-1">
                  يوزر حساب TradingView:
                </label>
                <input
                  type="text"
                  id="tvUsername"
                  name="tvUsername"
                  value={tvUsername}
                  onChange={(e) => setTvUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder="يوزر الحساب"
                  required
                />
                <ValidationError prefix="tvUsername" field="tvUsername" errors={state.errors} />
              </div>

              {/* حقل البريد الإلكتروني */}
              <div className="mb-4">
                <label htmlFor="userEmail" className="block text-lg font-medium text-black mb-1">
                  البريد الإلكتروني:
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder="example@example.com"
                  required
                />
                <ValidationError prefix="userEmail" field="userEmail" errors={state.errors} />
              </div>

              {/* حقل رقم الجوال */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-lg font-medium text-black mb-1">
                  رقم الجوال:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  placeholder="+966..."
                  required
                />
                <ValidationError prefix="phone" field="phone" errors={state.errors} />
              </div>

              {/* حقل مخفي لسحب IP الجهاز */}
              <input type="hidden" name="ip" value={ip} />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded text-black"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  {state.submitting ? "جارٍ الإرسال..." : "إرسال"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateRequest;
