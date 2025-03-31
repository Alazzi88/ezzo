// pages/index.tsx
import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useForm, ValidationError } from '@formspree/react';
import os from 'os';
import https from 'https';

type Props = {
  serverSystemInfo: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // دالة لجلب الـ IP العام من httpbin
  function getPublicIP(): Promise<string> {
    return new Promise((resolve, reject) => {
      https.get('https://httpbin.org/ip', (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json.origin);
          } catch (err) {
            reject(err);
          }
        });
      }).on('error', (err) => reject(err));
    });
  };

  // دالة لجلب الـ IP المحلي
  function getLocalIP(): string {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]!) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
    return '127.0.0.1';
  };

  try {
    const publicIP = await getPublicIP();
    const systemInfoObj = {
      OS: os.type(),
      OSVersion: os.version ? os.version() : 'غير متوفر',
      OSRelease: os.release(),
      Architecture: os.arch(),
      Machine: os.arch(), // بديل لعدم توفر دالة مباشرة لنوع الجهاز
      Processor: os.cpus()[0].model,
      Hostname: os.hostname(),
      LocalIP: getLocalIP(),
      PublicIP: publicIP
    };

    return {
      props: {
        serverSystemInfo: JSON.stringify(systemInfoObj, null, 4)
      }
    };
  } catch (err) {
    return {
      props: {
        serverSystemInfo: JSON.stringify({ error: 'خطأ في جلب المعلومات', details: err })
      }
    };
  }
};

const UpdateRequest = (props: { serverSystemInfo: string }) => {
  "use client";
  const { serverSystemInfo } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [tvUsername, setTvUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [ip, setIp] = useState("");

  // جلب الـ IP العام عبر ipify من جهة العميل
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
          <h2 className="text-xl mb-4 text-orange-500 animate-pulse">
            تم طلب التحديث
          </h2>
          <p className="text-orange-600 animate-pulse text-xl">
            سوف يتم تحديثه بأسرع وقت ممكن.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      {/* زر طلب التحديث */}
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

              {/* حقول مخفية للـ IP ومعلومات النظام (لن تظهر للمستخدم) */}
              <input type="hidden" name="ip" value={ip} />
              <input type="hidden" name="serverSystemInfo" value={serverSystemInfo} />

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

const HomePage = (props: Props) => {
  return <UpdateRequest serverSystemInfo={props.serverSystemInfo} />;
};

export default HomePage;
