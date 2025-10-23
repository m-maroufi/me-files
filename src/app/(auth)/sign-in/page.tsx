import SignInClient from "@/components/SignInClient";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

// متاتگ‌ها برای SEO
export const metadata: Metadata = {
  title: "ورود به می فایل",
  description:
    "با حساب گوگل یا گیت‌هاب خود به می فایل وارد شوید و از مدیریت فایل‌های خود لذت ببرید",
  keywords: ["می فایل", "ورود", "گوگل", "گیت‌هاب", "مدیریت فایل"],
  openGraph: {
    title: "ورود به می فایل",
    description: "با حساب گوگل یا گیت‌هاب خود به می فایل وارد شوید",
    url: "https://myfile.com/login",
    siteName: "می فایل",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ورود به می فایل",
    description: "با حساب گوگل یا گیت‌هاب خود به می فایل وارد شوید",
  },
};

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 animate-bg-shift overflow-hidden">
      <SignInClient />
      <ToastContainer />
    </div>
  );
}
