"use client";

import { motion, Variants } from "framer-motion";
import { LogIn, Sparkles } from "lucide-react";
import Link from "next/link";

// تعریف Variants برای انیمیشن‌ها
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const logoVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
  },
};

export default function NotAuthenticated() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 animate-bg-shift overflow-hidden">
      <motion.div
        className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 tracking-wider mb-6"
        animate="pulse"
        variants={logoVariants}
      >
        می فایل 🌟
      </motion.div>
      <motion.div
        className="container mx-auto px-4 sm:px-7 text-center space-y-6"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.p
          className="text-base sm:text-xl text-blue-100 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
          لطفاً ابتدا وارد شوید تا بتوانید فایل‌های خود را مدیریت کنید.
        </motion.p>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
        >
          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 bg-white text-blue-800 px-6 py-3 rounded-xl font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl hover:bg-blue-50 transition duration-300 w-full max-w-xs sm:max-w-sm mx-auto"
          >
            <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
            رفتن به صفحه ورود
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
