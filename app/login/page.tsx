"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Login API coming next.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f8fc] px-4 py-10 text-[#202124]">
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div className="mb-7 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a73e8] text-lg font-bold text-white shadow-sm">
              Y
            </div>

            <span className="text-xl font-semibold tracking-tight">
              YourMail
            </span>
          </Link>

          <p className="mt-3 text-sm text-[#5f6368]">
            Private email. Designed for privacy.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#e8eaed] bg-white p-7 shadow-[0_2px_8px_rgba(60,64,67,0.12)] sm:p-8">
          <div className="mb-7">
            <h1 className="text-xl font-semibold text-[#202124]">
              Welcome back
            </h1>

            <p className="mt-1 text-sm text-[#5f6368]">
              Sign in to your YourMail account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-[#5f6368]"
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
                className="h-11 w-full rounded-lg border border-[#dadce0] bg-white px-3.5 text-sm text-[#202124] outline-none transition placeholder:text-[#9aa0a6] hover:border-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-[#5f6368]"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#1a73e8] hover:underline"
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
                  className="h-11 w-full rounded-lg border border-[#dadce0] bg-white px-3.5 pr-16 text-sm text-[#202124] outline-none transition placeholder:text-[#9aa0a6] hover:border-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1.5 text-xs font-medium text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]"
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
                className="h-4 w-4 rounded border-[#dadce0] text-[#1a73e8] focus:ring-[#1a73e8]"
              />

              <span className="text-xs text-[#5f6368]">
                Keep me signed in
              </span>
            </label>

            {/* Login */}
            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-[#1a73e8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#1765cc] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 active:scale-[0.99]"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e8eaed]" />

            <span className="text-[10px] uppercase tracking-wider text-[#9aa0a6]">
              or
            </span>

            <div className="h-px flex-1 bg-[#e8eaed]" />
          </div>

          {/* Passkey */}
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#dadce0] bg-white text-sm font-medium text-[#3c4043] transition hover:bg-[#f8f9fa] hover:border-[#c4c7c5]"
          >
            <span className="text-base">◈</span>
            Sign in with passkey
          </button>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-[#5f6368]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-[#1a73e8] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#80868b]">
          <span>✓</span>
          <span>YourMail is built with privacy in mind</span>
        </div>
      </div>
    </main>
  );
}
