"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

type FormValues = { username: string; password: string };

/* ─── Toast ─────────────────────────────────────────────── */
function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-start gap-3 rounded-2xl bg-red-600 px-5 py-4 text-white shadow-2xl animate-slide-in max-w-sm">
      <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="text-sm font-medium leading-snug">{message}</p>
      <button onClick={onClose} className="ml-auto shrink-0 opacity-70 hover:opacity-100 transition cursor-pointer">
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ─── Login Page ─────────────────────────────────────────── */
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { document.title = "ProStack - Login"; }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    const result = await login(data.username, data.password);

    if (result === "ok") {
      router.replace("/");
    } else if (result === "invalid") {
      setError("username", { message: " " });
      setError("password", { message: " " });
      setToast("Invalid username or password. Please try again.");
    } else {
      setToast("Unable to reach server. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Full-screen background */}
      <div className="relative min-h-screen w-full overflow-y-auto bg-[#060C1A] flex flex-col items-center justify-center p-4 py-10">

        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

        {/* Card */}
        <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl p-8">

          {/* Logo + Brand */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 overflow-hidden">
              <Image
                src="/proStacklogo.png"
                alt="ProStack Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Sign in to your ProStack account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  {...register("username")}
                  type="text"
                  autoComplete="username"
                  placeholder="Enter User Name"
                  className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition focus:ring-2
                    ${errors.username
                      ? "border-red-500 focus:ring-red-500/40"
                      : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/30"
                    }`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-11 text-sm text-white placeholder-gray-500 outline-none transition focus:ring-2
                    ${errors.password
                      ? "border-red-500 focus:ring-red-500/40"
                      : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/30"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-[#023430] py-3 text-sm font-semibold text-white shadow-lg shadow-[#023430]/30 hover:bg-[#012825] hover:shadow-[#023430]/40 active:scale-[0.98] cursor-pointer transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 100 24v-4l-3 3 3 3v4A12 12 0 014 12z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Bottom bar — MFA + Create account */}
          <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
            {/* <div className="flex items-center gap-2 min-w-0">
              <ShieldCheckIcon className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
              <p className="text-xs text-gray-500 truncate">
                Multi-factor authentication will be available soon.
              </p>
            </div> */}
            <Link
              href="/signup"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition hover:opacity-80 active:scale-[0.97]"
              style={{ color: "#f7b205" }}
            >
              <UserPlusIcon className="h-3.5 w-3.5 shrink-0" style={{ color: "#f7b205" }} />
              <span>New to ProStack? Register your admin account here</span>
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="absolute bottom-4 text-xs text-gray-600">
          © {new Date().getFullYear()} ProStack. All rights reserved.
        </p>
      </div>

      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </>
  );
}
