"use client";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const passwordStrength = useMemo(() => {
    if (!password) {
      return {
        label: "",
        width: "0%",
      };
    }
    let score = 0;
    if (password.length >= 10) score++;
    if (password.length >= 14) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 2) {
      return { label: "Weak", width: "30%" };
    }
    if (score <= 4) {
      return { label: "Good", width: "65%" };
    }
    return { label: "Strong", width: "100%" };
  }, [password]);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accepted) {
      alert("Please accept the terms.");
      return;
    }
    // Registration will be connected to the Rust API later.
    alert("Registration API coming next.");
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
            Create your private mailbox.
          </p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl sm:p-8">
          <div className="mb-7">
            <h1 className="text-xl font-semibold">Create your account</h1>
            <p className="mt-1 text-sm text-slate-600">
              Get your private YourMail address.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium text-slate-400"
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
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 text-sm outline-none transition placeholder:text-slate-700 focus:border-white/20 focus:bg-white/[0.04]"
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-slate-400"
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
                  className="h-12 min-w-0 flex-1 rounded-l-xl border border-r-0 border-white/[0.08] bg-black/20 px-4 text-sm outline-none placeholder:text-slate-700 focus:border-white/20 focus:bg-white/[0.04]"
                />
                <div className="flex h-12 items-center rounded-r-xl border border-white/[0.08] bg-white/[0.025] px-3 text-xs text-slate-600">
                  @yourmail.com
                </div>
              </div>
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium text-slate-400"
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
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 pr-16 text-sm outline-none transition placeholder:text-slate-700 focus:border-white/20 focus:bg-white/[0.04]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-slate-600 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-white transition-all"
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                  <div className="mt-1 text-[10px] text-slate-600">
                    Password strength: {passwordStrength.label}
                  </div>
                </div>
              )}
              <p className="mt-2 text-[10px] leading-5 text-slate-700">
                Use at least 10 characters. A longer passphrase is recommended.
              </p>
            </div>
            {/* Terms */}
            <label className="flex cursor-pointer gap-3">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/10 bg-transparent"
              />
              <span className="text-xs leading-5 text-slate-600">
                I agree to the YourMail terms and privacy policy.
              </span>
            </label>
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-white text-sm font-semibold text-[#080b12] transition hover:bg-slate-200"
            >
              Create account
            </button>
          </form>
          <p className="mt-7 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-slate-300 hover:text-white"
            >
              Sign in
            </Link>
          </p>
        </div>
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-700">
          <span>🔐</span>
          <span>Your private mailbox starts here</span>
        </div>
      </div>
    </main>
  );
}
