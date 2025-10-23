"use client";

import { authClient } from "@/lib/auth-client";
import { motion, Variants } from "framer-motion";
import { Github, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// تعریف Variants برای صفحه ورود
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// تعریف Variants برای لوگو
const logoVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
};

// انیمیشن برای دکمه‌ها
const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
  }),
};

// انیمیشن برای الرت
const alertVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeOut" } },
};

// آیکون SVG گوگل
const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.33 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.36 7.47 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.47 1 4.01 3.64 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default function SignInClient() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (provider: "google" | "github") => {
    // if (provider === "google") {
    //   toast.info("این سرویس در حال حاضر در دسترس نیست.", {
    //     position: "top-right",
    //   });
    //   return;
    // }
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error: any) {
      // مدیریت خطا طبق داکیومنت Better Auth
      const errorMessage =
        error?.message || "خطایی در ورود رخ داد. لطفاً دوباره تلاش کنید.";
      setError(errorMessage);
      // الرت بعد از 5 ثانیه محو می‌شه
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 text-center animate-bg-shift"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* لوگو */}
      <motion.div
        className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 tracking-wider mb-6"
        animate="pulse"
        variants={logoVariants}
      >
        می فایل 🌟
      </motion.div>

      {/* عنوان و توضیحات */}
      <motion.h1
        className="text-3xl sm:text-5xl font-extrabold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        به می فایل خوش آمدید!{" "}
        <Sparkles className="inline-block w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
      </motion.h1>
      <motion.p
        className="text-base sm:text-xl text-blue-100 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        با حساب گوگل یا گیت‌هاب خود وارد شوید و مدیریت فایل‌های خود را شروع
        کنید!
      </motion.p>

      {/* الرت خطا */}
      {error && (
        <motion.div
          className="mb-6 bg-red-500/90 text-white px-4 py-2 rounded-xl shadow-lg max-w-md mx-auto"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={alertVariants}
        >
          {error}
        </motion.div>
      )}

      {/* دکمه‌های ورود */}
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
        >
          <button
            onClick={() => signIn("google")}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-white text-blue-800 px-6 py-3 rounded-xl font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl hover:bg-blue-50 transition duration-300 w-full max-w-xs sm:max-w-sm"
          >
            <GoogleIcon />
            ورود با گوگل
          </button>
        </motion.div>
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
        >
          <button
            onClick={() => signIn("github")}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl hover:bg-gray-700 transition duration-300 w-full max-w-xs sm:max-w-sm"
          >
            <Github className="w-6 h-6" />
            ورود با گیت‌هاب
          </button>
        </motion.div>
      </div>

      {/* لینک بازگشت به صفحه اصلی */}
      <motion.p
        className="mt-6 text-sm sm:text-base text-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <Link href="/" className="underline hover:text-blue-300">
          بازگشت به صفحه اصلی
        </Link>
      </motion.p>
    </motion.div>
  );
}
