import HomeComponents from "@/components/HomeComponents";
import type { Metadata } from "next";

// متاتگ‌ها برای SEO
export const metadata: Metadata = {
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
