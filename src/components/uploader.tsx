"use client";

import { useUploads } from "@/hooks/useUploads";
import { useUploadThing } from "@/utils/uploadthing";
import { Dialog, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Download, File, Loader2, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Uploader = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: uploadedFiles, loading, refetch } = useUploads();

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
      // دانلود فایل با استفاده از fetch
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("خطا در دریافت فایل");
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName; // استفاده از نام فایل برای دانلود
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Toast Container for Notifications */}
      <ToastContainer />

      {/* Dropzone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          {...getRootProps()}
          className={`relative w-full border-2 border-dashed rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
            isDragActive
              ? "border-indigo-600 bg-indigo-100/50"
              : "border-indigo-300 bg-indigo-50/30"
          } hover:bg-indigo-100/70 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[250px]`}
        >
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 text-indigo-500 mb-4" />
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
                    className="max-h-48 rounded-lg shadow-md object-cover"
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    className="max-h-48 rounded-lg shadow-md"
                  />
                )}
                <p className="text-sm text-gray-700 font-medium">
                  {file?.name}
                </p>
              </motion.div>
            ) : (
              <p className="text-sm sm:text-base text-gray-600 text-center">
                تصویر یا ویدیو خود را بکشید و رها کنید یا کلیک کنید
                <br />
                <span className="text-red-400 font-light text-sm">
                  {" "}
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
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            <Upload className="w-5 h-5" />
            آپلود فایل
          </button>

          {isUploading && (
            <div className="w-full max-w-md">
              <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-2.5 rounded-full"
                  animate={{ width: `${uploadProgress}%` }}
                  style={{
                    backgroundColor:
                      uploadProgress < 50
                        ? "#4f46e5"
                        : uploadProgress < 80
                        ? "#7c3aed"
                        : "#10b981",
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    حذف فایل
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      آیا مطمئن هستید که می‌خواهید این فایل را حذف کنید؟ این
                      عملیات قابل بازگشت نیست.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      لغو
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
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
        <p className="mt-8 text-gray-500 text-center">
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
                  className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg"
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
                    <Loader2 className="w-8 h-8 text-indigo-600" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <File className="w-6 h-6 text-indigo-500" />
              فایل‌های آپلود شده
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((f, index) => (
                <motion.div
                  key={f.id}
                  className="relative bg-white rounded-lg shadow-md p-4 flex flex-col items-center group overflow-hidden transition-all duration-300 hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {f.fileType.startsWith("image/") ? (
                    <Image
                      width={100}
                      height={100}
                      src={f.url}
                      alt={f.name}
                      unoptimized
                      className="max-h-24 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <video
                      src={f.url}
                      className="max-h-24 rounded-md transition-transform duration-300 group-hover:scale-105"
                      controls
                    />
                  )}
                  <p className="text-sm text-gray-600 mt-2 text-center truncate w-full">
                    {f.name}
                  </p>

                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopy(f.url)}
                      className="bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-200"
                      title="کپی لینک"
                    >
                      <Copy className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(f.url, f.name)}
                      className="bg-green-500 text-white p-2 rounded-md shadow-sm hover:bg-green-600 transition-colors duration-200"
                      title="دانلود فایل"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openDeleteDialog(f.id)}
                      className="bg-red-500 text-white p-2 rounded-md shadow-sm hover:bg-red-600 transition-colors duration-200"
                      title="حذف فایل"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      )}
    </div>
  );
};

export default Uploader;
