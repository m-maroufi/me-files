"use client";

import { motion, Variants } from "framer-motion";
import { FileText, Heart, Users } from "lucide-react";
import Link from "next/link";

// تعریف Variants برای هدر
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// تعریف Variants برای هیرو سکشن
const heroVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

// تعریف Variants برای کارت‌ها
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

// تعریف Variants برای فوتر
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// انیمیشن پالس برای کلمه می فایل
const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.1, 1],
    transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
  },
};

// انیمیشن برای دکمه شروع کنید
const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.6, ease: "easeOut" },
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
};

export default function HomeComponents() {
  return (
    <>
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 bg-blue-600/30 backdrop-blur-md text-white shadow-md z-50"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 tracking-wider"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            می فایل 🌟
          </motion.div>
          <Link
            href="/sign-in"
            className="bg-white text-blue-600 px-3 py-1.5 rounded-md font-bold text-sm sm:text-base hover:bg-blue-100 transition duration-300"
          >
            ورود
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white pt-16 pb-8 sm:pt-20 sm:pb-10"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            به{" "}
            <motion.span
              className="text-yellow-300"
              variants={pulseVariants}
              animate="pulse"
            >
              می فایل 🚀
            </motion.span>{" "}
            خوش آمدید!
          </motion.h1>
          <motion.p
            className="text-base sm:text-xl mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            اپلیکیشن قدرتمند برای مدیریت فایل‌های شما با سرعت و امنیت بالا
          </motion.p>
          <motion.div
            className="mb-6 sm:mb-8"
            initial="hidden"
            animate={["visible", "pulse"]}
            variants={buttonVariants}
            whileHover={{
              scale: 1.1,
              rotate: 3,
              transition: { duration: 0.3 },
            }}
          >
            <Link
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-yellow-300 to-orange-400 text-white px-6 py-3 rounded-xl font-bold text-sm sm:text-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              شروع کنید
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
            {[
              {
                icon: (
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-blue-200" />
                ),
                stat: "+۱۰۰,۰۰۰",
                text: "کاربر فعال",
              },
              {
                icon: (
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-blue-200" />
                ),
                stat: "+۱ میلیون",
                text: "فایل مدیریت‌شده",
              },
              {
                icon: (
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-blue-200" />
                ),
                stat: "۹۹.۹٪",
                text: "رضایت کاربران",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center bg-white/20 p-4 sm:p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                {item.icon}
                <h3 className="text-lg sm:text-2xl font-bold">{item.stat}</h3>
                <p className="text-sm sm:text-base">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-blue-100 text-center py-3 sm:py-4"
        initial="hidden"
        animate="visible"
        variants={footerVariants}
      >
        <p className="text-sm sm:text-base">
          توسعه داده شده با{" "}
          <Heart className="inline-block text-red-400 mx-1 w-4 h-4 sm:w-5 sm:h-5" />{" "}
          توسط{" "}
          <Link
            href="https://github.com/mehdi-maroufi"
            className="underline hover:text-blue-300"
          >
            مهدی معروفی
          </Link>
        </p>
        <p className="text-xs sm:text-sm">
          © {new Date().getFullYear()} می فایل. همه حقوق محفوظ است.
        </p>
      </motion.footer>
    </>
  );
}
