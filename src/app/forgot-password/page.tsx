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
    <main className="flex min-h-screen items-center justify-center bg-[#080b12] px-4 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-black text-[#080b12]">
              Y
            </div>
            <span className="text-xl font-semibold">YourMail</span>
          </Link>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl sm:p-8">
          {!submitted ? (
            <>
              <div className="mb-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  ?
                </div>
                <h1 className="text-xl font-semibold">
                  Recover your account
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Enter your email address and we&apos;ll explain the available
                  recovery options.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 text-sm outline-none placeholder:text-slate-700 focus:border-white/20"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-white text-sm font-semibold text-[#080b12] hover:bg-slate-200"
                >
                  Continue
                </button>
              </form>
            </>
          ) : (
            <div className="py-5 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-bold text-[#080b12]">
                ✓
              </div>
              <h1 className="text-xl font-semibold">Check your inbox</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If an account exists for that address, you&apos;ll receive
                instructions for the next step.
              </p>
            </div>
          )}
          <div className="mt-7 border-t border-white/[0.07] pt-5 text-center">
            <Link
              href="/login"
              className="text-sm text-slate-500 hover:text-white"
            >
              ← Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
