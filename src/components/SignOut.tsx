"use client";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
const SignOut = () => {
  return (
    <button
      onClick={async () => {
        await authClient.signOut();
        window.location.href = "/";
      }}
      className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:bg-gray-700 hover:shadow-xl transition duration-300 w-full"
    >
      <LogOut className="w-5 h-5" />
      خروج
    </button>
  );
};

export default SignOut;
