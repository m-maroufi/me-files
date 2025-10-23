import NotAuthenticated from "@/components/NotAuthenticated";
import SignOut from "@/components/SignOut";
import Uploader from "@/components/uploader";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <NotAuthenticated />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 sm:px-7 pt-16 pb-8 grow">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* کارت اطلاعات کاربر */}

          <div className="md:col-span-1 bg-blue-900/50 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg h-96 sticky top-8 space-y-10">
            <div className="mb-10 border-b border-yellow-300 pb-2 ">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 tracking-wider text-center">
                می فایل 🌟
              </h1>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="تصویر پروفایل"
                width={64}
                height={64}
                className="rounded-full border-2 border-yellow-300"
              />
              <div className="text-right">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {session.user.name || "کاربر عزیز"}
                </h2>
                <p className="text-sm sm:text-base text-blue-200">
                  {session.user.email}
                </p>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-50 to-orange-400 tracking-wider text-center">
              خوش آمدید
            </h3>
            <SignOut />
          </div>

          {/* بخش اصلی داشبورد */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              داشبورد شما
            </h2>

            <Uploader />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              theme="light"
              toastClassName="rounded-lg bg-white shadow-md text-gray-800 font-vazir"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
