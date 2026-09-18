"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Authentication will be connected to the Rust API later.
    alert("Login API coming next.");
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080b12] px-4 py-10 text-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-black text-[#080b12]">
              Y
            </div>
            <span className="text-xl font-semibold tracking-tight">
              YourMail
            </span>
          </Link>
          <p className="mt-3 text-sm text-slate-600">
            Private email. Designed for privacy.
          </p>
        </div>
        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl sm:p-8">
          <div className="mb-7">
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-600">
              Sign in to your YourMail account.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-slate-400"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@yourmail.com"
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 text-sm outline-none transition placeholder:text-slate-700 focus:border-white/20 focus:bg-white/[0.04]"
              />
            </div>
            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-slate-400"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-slate-500 hover:text-white"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 pr-12 text-sm outline-none transition placeholder:text-slate-700 focus:border-white/20 focus:bg-white/[0.04]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-slate-600 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {/* Remember */}
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-transparent"
              />
              <span className="text-xs text-slate-500">
                Keep me signed in
              </span>
            </label>
            {/* Login */}
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-white text-sm font-semibold text-[#080b12] transition hover:bg-slate-200"
            >
              Sign in
            </button>
          </form>
          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-[10px] uppercase tracking-wider text-slate-700">
              or
            </span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>
          {/* Passkey */}
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
          >
            <span>◈</span>
            Sign in with passkey
          </button>
          {/* Register */}
          <p className="mt-7 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-slate-300 hover:text-white"
            >
              Create one
            </Link>
          </p>
        </div>
        {/* Security */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-700">
          <span>✓</span>
          <span>YourMail is built with privacy in mind</span>
        </div>
      </div>
    </main>
  );
}
