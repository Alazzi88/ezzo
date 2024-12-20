"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Image from "next/image";

export default function LoginPage() {
  const validEmail = "yalazzi88@gmail.com";
  const validPassword = "12345";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // التحقق من البيانات المخزنة في localStorage
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("isAuthenticated") === "true";
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (storedAuth && storedEmail === validEmail && storedPassword === validPassword) {
        router.push("/videos");
      } else if (email === validEmail && password === validPassword) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("email", email);
        router.push("/videos");
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-9">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="/img/logo.webp"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto mb-4 rounded-full"
          />
          <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-orange-500">
            تسجيل الدخول إلى الشروحات
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-orange-500">
                البريد الإلكتروني
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-orange-500">
                كلمة المرور
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                disabled={isLoading}
              >
                {isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
