"use client";

import type { IUploadedFile } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useUploads = () => {
  const [data, setData] = useState<IUploadedFile[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUploads = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/uploads", { cache: "no-store" });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error("در دریافت اطلاعات خطایی رخ داد");
      }
      console.log(result.data);
      setData(result.data ?? []);
    } catch (err) {
      console.error("❌ Error fetching uploads:", err);
      setError("خطا در بارگذاری فایل‌ها.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  return {
    data,
    loading,
    error,
    refetch: fetchUploads,
  };
};
