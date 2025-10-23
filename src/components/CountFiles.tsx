"use client";
import { useUploads } from "@/hooks/useUploads";
import { File } from "lucide-react";

const CountFiles = () => {
  const { count } = useUploads();
  return (
    <div className="flex items-center gap-4 mb-4">
      <File className="w-6 h-6 text-yellow-300" />
      <p className="text-sm sm:text-base text-white">
        فایل‌های آپلودشده: <span className="font-bold">{count}</span>
      </p>
    </div>
  );
};

export default CountFiles;
