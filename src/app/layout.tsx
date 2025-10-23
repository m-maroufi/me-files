import type { Metadata } from "next";
import { Changa, Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import React from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const vazir = Vazirmatn({
  variable: "--vazir-font",
  subsets: ["arabic", "latin-ext"],
  weight: ["100", "300", "400", "500", "900"],
});
const changa = Changa({
  variable: "--changa-font",
  subsets: ["arabic"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "می فایل - اپلیکیشن مدیریت فایل",
  description:
    "می فایل، اپلیکیشن قدرتمند برای مدیریت فایل‌های شما با سرعت و امنیت بالا",
  keywords: ["می فایل", "مدیریت فایل", "اپلیکیشن", "فارسی"],
  openGraph: {
    title: "می فایل - اپلیکیشن مدیریت فایل",
    description:
      "می فایل، اپلیکیشن قدرتمند برای مدیریت فایل‌های شما با سرعت و امنیت بالا",
    url: "https://me-files-chi.vercel.app/",
    siteName: "می فایل",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "https://me-files-chi.vercel.app/og-image.png", // 👈 مسیر عکس OG
        width: 1200,
        height: 630,
        alt: "لوگوی می‌فایل",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "می فایل - اپلیکیشن مدیریت فایل",
    description:
      "می فایل، اپلیکیشن قدرتمند برای مدیریت فایل‌های شما با سرعت و امنیت بالا",
    images: ["https://me-files-chi.vercel.app/og-image.png"], // 👈 همان عکس بالا
  },
  icons: {
    icon: "/logo-me-file.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/favicon-me-file.ico"
          type="image/svg+xml"
        />
      </head>
      <body
        className={`${geistSans.variable} ${changa.variable} ${vazir.variable}  ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
