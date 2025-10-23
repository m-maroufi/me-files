import HomeComponents from "@/components/HomeComponents";
import type { Metadata } from "next";

// متاتگ‌ها برای SEO
export const metadata: Metadata = {
  title: "می فایل - اپلیکیشن مدیریت فایل",
  description:
    "می فایل، اپلیکیشن قدرتمند برای مدیریت فایل‌های شما با سرعت و امنیت بالا",
  keywords: ["می فایل", "مدیریت فایل", "اپلیکیشن", "فارسی"],
  openGraph: {
    title: "می فایل",
    description:
      "اپلیکیشن قدرتمند برای مدیریت فایل‌های شما با سرعت و امنیت بالا",
    url: "https://myfile.com",
    siteName: "می فایل",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "می فایل",
    description:
      "اپلیکیشن قدرتمند برای مدیریت فایل‌های شما با سرعت و امنیت بالا",
  },
};

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex flex-col justify-between overflow-hidden">
      <HomeComponents />
    </div>
  );
}
