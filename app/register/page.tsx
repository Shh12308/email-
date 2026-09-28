"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const passwordStrength = useMemo(() => {
    if (!password) return { label: "", width: "0%" };

    let score = 0;

    if (password.length >= 10) score++;
    if (password.length >= 14) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", width: "30%" };
    if (score <= 4) return { label: "Good", width: "65%" };

    return { label: "Strong", width: "100%" };
  }, [password]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accepted) {
      alert("Please accept the terms.");
      return;
    }

    alert("Registration API coming next.");
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
            Create your private mailbox.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#e8eaed] bg-white p-7 shadow-[0_2px_8px_rgba(60,64,67,0.12)] sm:p-8">
          <div className="mb-7">
            <h1 className="text-xl font-semibold text-[#202124]">
              Create your account
            </h1>

            <p className="mt-1 text-sm text-[#5f6368]">
              Get your private YourMail address.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium text-[#5f6368]"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="John Doe"
                className="h-11 w-full rounded-lg border border-[#dadce0] bg-white px-3.5 text-sm text-[#202124] outline-none transition placeholder:text-[#9aa0a6] hover:border-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-xs font-medium text-[#5f6368]"
              >
                Email address
              </label>

              <div className="flex">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="john"
                  className="h-11 min-w-0 flex-1 rounded-l-lg border border-r-0 border-[#dadce0] bg-white px-3.5 text-sm text-[#202124] outline-none placeholder:text-[#9aa0a6] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
                />

                <div className="flex h-11 items-center rounded-r-lg border border-[#dadce0] bg-[#f8f9fa] px-3 text-xs text-[#5f6368]">
                  @yourmail.com
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium text-[#5f6368]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={10}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a strong password"
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

              {password && (
                <div className="mt-2">
                  <div className="h-1 overflow-hidden rounded-full bg-[#e8eaed]">
                    <div
                      className="h-full rounded-full bg-[#1a73e8] transition-all duration-300"
                      style={{ width: passwordStrength.width }}
                    />
                  </div>

                  <div className="mt-1 text-[11px] text-[#5f6368]">
                    Password strength: {passwordStrength.label}
                  </div>
                </div>
              )}

              <p className="mt-2 text-[11px] leading-5 text-[#80868b]">
                Use at least 10 characters. A longer passphrase is recommended.
              </p>
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer gap-3">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#dadce0] text-[#1a73e8] focus:ring-[#1a73e8]"
              />

              <span className="text-xs leading-5 text-[#5f6368]">
                I agree to the YourMail terms and privacy policy.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-[#1a73e8] text-sm font-semibold text-white shadow-sm transition hover:bg-[#1765cc] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 active:scale-[0.99]"
            >
              Create account
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#5f6368]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#1a73e8] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#80868b]">
          <span>🔐</span>
          <span>Your private mailbox starts here</span>
        </div>
      </div>
    </main>
  );
}
