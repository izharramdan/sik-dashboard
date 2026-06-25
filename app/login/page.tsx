"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ShieldAlert,
  Activity,
  Loader2,
  KeyRound,
  ShieldCheck,
  Building,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginResponse {
  status: boolean;
  message?: string;
  token: string;
  result: {
    id: number;
    noreg: string;
    fullname: string;
    email: string;
    jabatanId: number | string;
    authority_level: number | string;
    isactive: boolean;
    isotor: boolean;
    roles: { role_name: string }[];
  };
  validation?: {
    errors: { msg: string }[];
  };
}

export default function LoginPage() {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [isMounted, setIsMounted] = useState(false);
  const [noreg, setNoreg] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (token && tokenExpiry) {
      const exp = Number(tokenExpiry);
      if (!Number.isNaN(exp) && Date.now() < exp) {
        router.replace("/dashboard");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!baseUrl) {
      setErrorMessage("NEXT_PUBLIC_API_BASE_URL belum diset di .env.local");
      return;
    }

    if (!noreg || !password) {
      setErrorMessage("Noreg dan kata sandi wajib diisi.");
      return;
    }

    loading || setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/api/auth/dashboard-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noreg, password }),
      });

      const data: LoginResponse = await res.json();

      if (!res.ok || !data.status) {
        if (data.validation && Array.isArray(data.validation.errors)) {
          const msg = data.validation.errors.map((e) => e.msg).join(", ");
          setErrorMessage(msg || "Validation error.");
        } else {
          setErrorMessage(
            data.message ||
              "Otentikasi gagal, silakan periksa kembali kredensial Anda.",
          );
        }
        setLoading(false);
        return;
      }

      const { fullname, jabatanId, authority_level, roles } = data.result;
      const token = data.token;
      const tokenExpiry = Date.now() + 8 * 60 * 60 * 1000;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiry", tokenExpiry.toString());
        localStorage.setItem("username", fullname);
        localStorage.setItem("jabatanId", String(jabatanId || ""));
        localStorage.setItem("authority_level", String(authority_level || ""));

        const roleNames = Array.isArray(roles)
          ? roles.map((r) => r.role_name)
          : [];
        localStorage.setItem("user_roles", JSON.stringify(roleNames));
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Terjadi kesalahan jaringan internal. Silakan hubungi Administrator K3.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-slate-550 dark:bg-slate-950" />;
  }

  return (
    <div className="relative flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-100 overflow-hidden font-sans selection:bg-blue-500/20 selection:text-blue-800 dark:selection:text-blue-200 transition-colors duration-350">
      
      {/* BACKGROUND LAYER: Adaptive Ambient Glow & Cyber Grid */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -30, 15, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute left-[5%] top-[-20%] h-[600px] w-[600px] rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -15, 25, 0],
            y: [0, 25, -20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute right-[-5%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/5 blur-[120px]"
        />
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 via-transparent to-slate-100/10 dark:from-slate-950 dark:via-transparent dark:to-slate-950/40" />
      </div>

      {/* LEFT SIDE: Briefing Panel (60% Width) */}
      <div className="relative hidden w-[60%] flex-col justify-between border-r border-slate-200 dark:border-slate-900 bg-white/20 dark:bg-slate-950/10 p-16 xl:p-24 lg:flex z-10 backdrop-blur-[1px]">
        {/* Header Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="relative group flex h-11 w-11 items-center justify-center rounded-xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-xs font-black tracking-tighter text-red-600 dark:text-red-500 relative z-10">
              TMMIN
            </span>
          </div>
          <div className="h-7 w-px bg-slate-250 dark:bg-slate-800" />
          <div className="flex flex-col">
            <h1 className="text-xs font-bold tracking-[0.25em] text-slate-850 dark:text-slate-300 uppercase">
              SIK INTEGRATED SYSTEM
            </h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">
              E-Permit & Denwacho Execution Control
            </p>
          </div>
        </motion.div>

        {/* Central Content */}
        <div className="max-w-2xl my-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/10 dark:border-blue-500/20 bg-blue-500/5 px-3.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 shadow-inner backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
              SECURE ACCESS SEC-LEVEL // AUTHORIZED ONLY
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15] xl:text-5xl">
              Sistem Pengawasan <br />
              Izin Kerja & Kelayakan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-550 to-indigo-400 dark:from-blue-400 dark:via-indigo-300 dark:to-slate-200">
                K3 Manufaktur
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-normal max-w-lg">
              Gerbang otentikasi digital terintegrasi untuk memvalidasi kelayakan kontraktor,
              registrasi Surat Izin Kerja (SIK), dan monitoring pos penjagaan
              gerbang secara real-time demi mewujudkan target{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold underline decoration-blue-500/30 underline-offset-4">
                TMMIN Zero Accident
              </span>
              .
            </p>
          </motion.div>

          {/* Metric Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 pt-4"
          >
            <div className="group rounded-xl border border-slate-200 dark:border-slate-900 bg-white/40 dark:bg-slate-900/10 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-blue-500/20 hover:bg-white/60 dark:hover:bg-slate-900/20">
              <div className="text-lg font-bold text-blue-650 dark:text-blue-400 tracking-tight">
                E-Gatekeeper
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-550 font-medium mt-1.5 leading-relaxed">
                Verifikasi Sertifikasi & Induction Check Otomatis Berbasis Sistem Terpusat.
              </div>
            </div>
            <div className="group rounded-xl border border-slate-200 dark:border-slate-900 bg-white/40 dark:bg-slate-900/10 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-indigo-500/20 hover:bg-white/60 dark:hover:bg-slate-900/20">
              <div className="text-lg font-bold text-indigo-650 dark:text-indigo-400 tracking-tight">
                Real-Time Sync
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-550 font-medium mt-1.5 leading-relaxed">
                Sinkronisasi Instan Pos Keamanan Gerbang & Safety Officer Lapangan.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Nodes */}
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-900/60 pt-6">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
            <span>
              Operational Node:{" "}
              <span className="text-slate-600 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                TM-CENTRAL-GATEWAY
              </span>
            </span>
          </div>
          <span className="font-mono">© 2026 PT Pionir Inovasi Digital</span>
        </div>
      </div>

      {/* RIGHT SIDE: Cyber Glassmorphism Login Card (40% Width) */}
      <div className="relative flex w-full items-center justify-center px-6 py-12 lg:w-[40%] xl:px-20 z-10 bg-white/90 dark:bg-slate-950/80 backdrop-blur-lg border-l border-slate-200/50 dark:border-slate-900">
        
        {/* Subtle background glow */}
        <div className="absolute right-1/2 top-1/3 -translate-y-1/2 translate-x-1/2 w-72 h-72 rounded-full bg-blue-500/[0.02] blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm space-y-8"
        >
          {/* Header Form */}
          <div className="space-y-2.5">
            <div className="h-1.5 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
            <h3 className="text-2xl font-bold tracking-tight text-slate-850 dark:text-slate-100 flex items-center gap-2">
              <KeyRound className="h-5.5 w-5.5 text-blue-600 dark:text-blue-400" /> Sign In Kredensial
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 font-medium leading-relaxed">
              Masukkan Nomor Registrasi (Noreg) dan Kata Sandi internal Anda untuk memproses verifikasi otoritas kontrol.
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="rounded-lg border border-red-200 bg-red-500/5 px-3.5 py-3 text-xs font-semibold text-red-600 dark:text-red-400 flex items-start gap-2"
              >
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Noreg */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide block">
                Nomor Registrasi (Noreg)
              </label>
              <div className="relative group">
                <Input
                  type="text"
                  value={noreg}
                  onChange={(e) => setNoreg(e.target.value)}
                  placeholder="Contoh: REG-10924X"
                  autoComplete="username"
                  className="h-11 rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20 px-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-700 transition duration-200 focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900/40 focus:ring-1 focus:ring-blue-500/20 focus:outline-none"
                />
                <div className="absolute inset-0 rounded-lg border border-blue-500/0 group-focus-within:border-blue-500/20 pointer-events-none transition-colors duration-300" />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide block">
                Kata Sandi
              </label>
              <div className="relative group">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20 px-3.5 pr-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-700 transition duration-200 focus:border-blue-500/50 focus:bg-white dark:focus:bg-slate-900/40 focus:ring-1 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="relative h-11 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-bold text-white transition-all duration-305 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/10 active:scale-[0.98] disabled:opacity-60 overflow-hidden"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>MEMVALIDASI OTORITAS...</span>
                  </>
                ) : (
                  "MASUK KE CONTROL CENTER"
                )}
              </span>
            </Button>
          </form>

          {/* Footer Security Note */}
          <div className="rounded-xl border border-slate-200/60 dark:border-slate-900 bg-slate-50 dark:bg-slate-950 p-4 text-center text-[10px] leading-relaxed text-slate-450 dark:text-slate-500 font-medium">
            Setiap aktivitas masuk dicatat dalam log audit keamanan data TMMIN.
            Penyalahgunaan hak akses akan ditindak tegas sesuai regulasi K3 manufaktur.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
