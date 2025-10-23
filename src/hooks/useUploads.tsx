"use client";

import type { IUploadedFile } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useUploads = () => {
  const [data, setData] = useState<IUploadedFile[] | null>(null);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUploads = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/uploads", { cache: "no-store" });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "در دریافت اطلاعات خطایی رخ داد");
      }

      const files = result.data ?? [];
      setData(files);
      setCount(files.length); // اینجا تعداد آیتم‌ها رو آپدیت می‌کنیم
    } catch (err: any) {
      console.error("Error fetching uploads:", err);
      setError(err.message || "خطا در بارگذاری فایل‌ها.");
      setData(null);
      setCount(0); // در صورت خطا، count رو صفر می‌کنیم
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  return {
    data,
    count, // حالا count همیشه برابر تعداد فایل‌هاست
    loading,
    error,
    refetch: fetchUploads,
  };
};
