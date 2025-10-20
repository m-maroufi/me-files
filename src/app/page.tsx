import Uploader from "@/components/uploader";

export default function Home() {
  return (
    <div className="container mx-auto px-7">
      <section className="header pt-20 space-y-4">
        <h1 className="text-center font-changa font-bold text-3xl md:text-4xl text-primary-800">
          می فایل
        </h1>
        <p className="text-xl text-primary-900/60 text-center">
          جایی برای ویدیوها و تصاویر تو! ساده آپلود کن، سریع به اشتراک بگذار،
          همیشه در دسترس!
        </p>
      </section>
      <Uploader />
    </div>
  );
}
