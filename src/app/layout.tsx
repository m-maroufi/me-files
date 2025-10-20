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
  title: "آپلودر فایل",
  description: "آپلودر فایل میفایل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${changa.variable} ${vazir.variable}  ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
