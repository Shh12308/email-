"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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
        </div>

        <div className="rounded-2xl border border-[#e8eaed] bg-white p-7 shadow-[0_2px_8px_rgba(60,64,67,0.12)] sm:p-8">
          {!submitted ? (
            <>
              <div className="mb-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f0fe] text-lg font-semibold text-[#1a73e8]">
                  ?
                </div>

                <h1 className="text-xl font-semibold">
                  Recover your account
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#5f6368]">
                  Enter your email address and we&apos;ll explain the available
                  recovery options.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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

                <button
                  type="submit"
                  className="h-11 w-full rounded-lg bg-[#1a73e8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#1765cc] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30"
                >
                  Continue
                </button>
              </form>
            </>
          ) : (
            <div className="py-5 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f4ea] text-xl font-bold text-[#188038]">
                ✓
              </div>

              <h1 className="text-xl font-semibold">
                Check your inbox
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#5f6368]">
                If an account exists for that address, you&apos;ll receive
                instructions for the next step.
              </p>
            </div>
          )}

          <div className="mt-7 border-t border-[#e8eaed] pt-5 text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-[#1a73e8] hover:underline"
            >
              ← Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
