"use client";

import { useUploads } from "@/hooks/useUploads";
import { useUploadThing } from "@/utils/uploadthing";
import { Dialog, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Download, File, Loader2, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Uploader = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: uploadedFiles, loading, refetch, count } = useUploads();

  const { startUpload, isUploading } = useUploadThing("mediaUploader", {
    onClientUploadComplete: async () => {
      setFile(null);
      setPreview(null);
      await refetch();
    },
    onUploadProgress: setUploadProgress,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (f) {
      setPreview(URL.createObjectURL(f));
      setFile(f);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: { "video/*": [], "image/*": [] },
    onDrop,
  });

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      setIsDeleteDialogOpen(false);
      const response = await fetch(`/api/uploads/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "خطایی در حذف فایل رخ داد.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        return;
      }
      await refetch();
      toast.success(data.message || "فایل با موفقیت حذف شد!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      console.error("خطا در ارسال درخواست حذف:", error);
      toast.error("خطایی در ارتباط با سرور رخ داد.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("لینک با موفقیت کپی شد!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      console.error("خطا در کپی کردن لینک:", error);
      toast.error("خطایی در کپی کردن لینک رخ داد.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("خطا در دریافت فایل");
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("فایل با موفقیت دانلود شد!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      console.error("خطا در دانلود فایل:", error);
      toast.error("خطایی در دانلود فایل رخ داد.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    }
  };

  const openDeleteDialog = (id: string) => {
    setFileIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (fileIdToDelete) {
      await handleDelete(fileIdToDelete);
      setFileIdToDelete(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-blue-900/10 backdrop-blur-md rounded-2xl shadow-lg">
      {/* Toast Container for Notifications */}

      {/* Dropzone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          {...getRootProps()}
          className={`relative w-full border-2 border-dashed rounded-xl p-6 sm:p-8 transition-all duration-300 ${
            isDragActive
              ? "border-yellow-300 bg-blue-100/20"
              : "border-blue-300 bg-blue-50/10"
          } hover:bg-blue-100/30 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[250px]`}
        >
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 text-yellow-300 mb-4" />
          <AnimatePresence>
            {preview ? (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {file?.type.startsWith("image/") ? (
                  <Image
                    width={200}
                    height={200}
                    src={preview}
                    alt="Preview"
                    className="max-h-48 rounded-lg shadow-md object-cover border-2 border-blue-200"
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    className="max-h-48 rounded-lg shadow-md border-2 border-blue-200"
                  />
                )}
                <p className="text-sm text-white font-medium truncate max-w-full">
                  {file?.name}
                </p>
              </motion.div>
            ) : (
              <p className="text-sm sm:text-base text-blue-100 text-center font-vazir">
                تصویر یا ویدیو خود را بکشید و رها کنید یا کلیک کنید
                <br />
                <span className="text-yellow-300 font-light text-sm">
                  تصاویر حداکثر 4 مگابایت و ویدئو حداکثر 1 گیگابایت
                </span>
              </p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Upload Button */}
      {file && (
        <motion.div
          className="mt-4 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => startUpload([file])}
            disabled={isUploading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium font-vazir transition-all duration-300 transform hover:scale-105 ${
              isUploading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 text-blue-800"
            }`}
          >
            <Upload className="w-5 h-5" />
            آپلود فایل
          </button>

          {isUploading && (
            <div className="w-full max-w-md">
              <div className="bg-blue-200/50 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-2.5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400"
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-blue-100 mt-2 text-center font-vazir">
                {uploadProgress}%
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Delete Confirmation Dialog */}
      <Transition appear show={isDeleteDialogOpen} as="div">
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-900/90 backdrop-blur-md p-6 text-right shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-white font-vazir"
                  >
                    حذف فایل
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-blue-200 font-vazir">
                      آیا مطمئن هستید که می‌خواهید این فایل را حذف کنید؟ این
                      عملیات قابل بازگشت نیست.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-blue-300 bg-blue-800/50 px-4 py-2 text-sm font-medium text-blue-100 hover:bg-blue-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 font-vazir"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      لغو
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 font-vazir"
                      onClick={confirmDelete}
                    >
                      حذف
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Uploaded Files List */}
      {loading ? (
        <p className="mt-8 text-blue-100 text-center font-vazir">
          در حال بارگذاری فایل‌ها...
        </p>
      ) : (
        uploadedFiles &&
        uploadedFiles.length > 0 && (
          <motion.div
            className="mt-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Overlay لودینگ هنگام حذف */}
            <AnimatePresence>
              {isDeleting && (
                <motion.div
                  className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-8 h-8 text-yellow-300" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2 font-vazir">
              <File className="w-6 h-6 text-yellow-300" />
              فایل‌های آپلودشده ( {count} )
            </h3>

            <ul className="border border-blue-300/50 rounded-lg overflow-hidden">
              {/* هدر جدول */}
              <li className="grid grid-cols-12 gap-4 bg-blue-800/50 p-3 text-sm sm:text-base text-blue-100 font-medium font-vazir">
                <span className="col-span-5 sm:col-span-4">نام فایل</span>
                <span className="col-span-3 sm:col-span-3 text-center">
                  نوع فایل
                </span>
                <span className="col-span-2 sm:col-span-2 text-center">
                  اندازه
                </span>
                <span className="col-span-2 sm:col-span-3 text-center">
                  عملیات
                </span>
              </li>
              {/* ردیف‌های فایل‌ها */}
              {uploadedFiles.map((f) => (
                <li
                  key={f.id}
                  className="grid grid-cols-12 gap-4 p-3 bg-blue-900/30 hover:bg-blue-900/50 transition-colors duration-200 text-white text-sm sm:text-base font-vazir border-t border-blue-300/20"
                >
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
                    {f.fileType.startsWith("image/") ? (
                      <Image
                        width={40}
                        height={40}
                        src={f.url}
                        alt={f.name}
                        unoptimized
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <video
                        src={f.url}
                        className="w-10 h-10 rounded-md"
                        muted
                      />
                    )}
                    <span className="truncate">{f.name}</span>
                  </div>
                  <span className="col-span-3 sm:col-span-3 text-center">
                    {f.fileType.split("/")[1].toUpperCase()}
                  </span>
                  <span className="col-span-2 sm:col-span-2 text-center">
                    {(f.fileSize / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <div className="col-span-2 sm:col-span-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleCopy(f.url)}
                      className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                      title="کپی لینک"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(f.url, f.name)}
                      className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                      title="دانلود فایل"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteDialog(f.id)}
                      className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                      title="حذف فایل"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )
      )}
    </div>
  );
};

export default Uploader;
