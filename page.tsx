"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

/* ─── Validation schema ──────────────────────────────────── */
const schema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),
  mobileNumber: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  username: yup
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&#]/, "Must contain at least one special character (@$!%*?&#)")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
};

/* ─── Toast ─────────────────────────────────────────────── */
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  const isError = type === "error";

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-start gap-3 rounded-2xl px-5 py-4 text-white shadow-2xl animate-slide-in max-w-sm ${
        isError ? "bg-red-600" : "bg-emerald-600"
      }`}
    >
      {isError ? (
        <ExclamationCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
      ) : (
        <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
      )}
      <p className="text-sm font-medium leading-snug">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto shrink-0 opacity-70 hover:opacity-100 transition"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ─── Field wrapper ──────────────────────────────────────── */
function Field({
  icon: Icon,
  label,
  error,
  showIcon = true,
  children,
}: {
  icon: React.ElementType;
  label: string;
  error?: string;
  showIcon?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        {showIcon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
        {children}
      </div>
      {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
    </div>
  );
}

/* ─── SignUp Page ────────────────────────────────────────── */
export default function SignUpPage() {
  useEffect(() => { document.title = "ProStack - Sign Up"; }, []);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition focus:ring-2 ${
      hasError
        ? "border-red-500 focus:ring-red-500/40"
        : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/30"
    }`;

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          mobileNumber: data.mobileNumber,
          username: data.username,
          password: data.password,
        }),
      });

      const body = await res.json() as { message?: string };

      if (res.status === 409) {
        // Duplicate — user already registered
        setToast({ message: body.message ?? "User is already registered.", type: "error" });
      } else if (res.ok) {
        setToast({ message: "Account created successfully! Redirecting to login…", type: "success" });
        setTimeout(() => router.replace("/login"), 2000);
      } else {
        setToast({ message: body.message ?? "Something went wrong. Please try again.", type: "error" });
      }
    } catch {
      setToast({ message: "Unable to reach server. Please try again later.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Full-screen background */}
      <div className="relative min-h-screen w-full overflow-hidden bg-[#060C1A] flex items-center justify-center p-4 py-10">

        {/* Grid pattern */}
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
        <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl p-8">

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
                Create your account
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Register a new admin account for ProStack
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

            {/* Row: First Name + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <Field icon={UserIcon} label="First Name" error={errors.firstName?.message}>
                <input
                  {...register("firstName")}
                  type="text"
                  autoComplete="given-name"
                  placeholder="John"
                  className={inputClass(!!errors.firstName)}
                />
              </Field>
              <Field icon={UserIcon} label="Last Name" error={errors.lastName?.message}>
                <input
                  {...register("lastName")}
                  type="text"
                  autoComplete="family-name"
                  placeholder="Doe"
                  className={inputClass(!!errors.lastName)}
                />
              </Field>
            </div>

            {/* Email */}
            <Field icon={EnvelopeIcon} label="Email Address" error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder="john.doe@example.com"
                className={inputClass(!!errors.email)}
              />
            </Field>

            {/* Mobile Number */}
            <Field icon={PhoneIcon} label="Mobile Number" error={errors.mobileNumber?.message} showIcon={false}>
              <div className="flex items-center rounded-xl border border-white/10 bg-white/5 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/40 focus-within:border-indigo-500/50">
                <span className="flex items-center gap-1.5 flex-shrink-0 px-3 py-3 text-sm font-medium text-gray-400 bg-white/5 border-r border-white/10">
                  <PhoneIcon className="h-3.5 w-3.5 text-emerald-400 drop-shadow" />
                  +91
                </span>
                <input
                  {...register("mobileNumber")}
                  type="tel"
                  autoComplete="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder-gray-500 outline-none"
                />
              </div>
            </Field>

            {/* Username */}
            <Field icon={UserIcon} label="Username" error={errors.username?.message}>
              <input
                {...register("username")}
                type="text"
                autoComplete="username"
                placeholder="john_admin"
                className={inputClass(!!errors.username)}
              />
            </Field>

            {/* Password */}
            <Field icon={LockClosedIcon} label="Password" error={errors.password?.message}>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min 8 chars, uppercase, number, symbol"
                className={`${inputClass(!!errors.password)} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </Field>

            {/* Confirm Password */}
            <Field icon={LockClosedIcon} label="Confirm Password" error={errors.confirmPassword?.message}>
              <input
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                className={`${inputClass(!!errors.confirmPassword)} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
                tabIndex={-1}
              >
                {showConfirm ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-[#023430] py-3 text-sm font-semibold text-white shadow-lg shadow-[#023430]/30 hover:bg-[#012825] hover:shadow-[#023430]/40 active:scale-[0.98] cursor-pointer transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 100 24v-4l-3 3 3 3v4A12 12 0 014 12z" />
                  </svg>
                  Creating account…
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Already have an account */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
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
