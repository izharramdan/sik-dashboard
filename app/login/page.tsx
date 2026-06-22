// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, ShieldAlert, Activity } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface LoginResponse {
//   status: boolean;
//   message?: string;
//   token: string;
//   result: {
//     id: number;
//     noreg: string;
//     fullname: string;
//     email: string;
//     jabatanId: number | string;
//     authority_level: number | string;
//     isactive: boolean;
//     isotor: boolean;
//     roles: { role_name: string }[];
//   };
//   validation?: {
//     errors: { msg: string }[];
//   };
// }

// export default function LoginPage() {
//   const router = useRouter();
//   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const [noreg, setNoreg] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const token = localStorage.getItem("token");
//     const tokenExpiry = localStorage.getItem("tokenExpiry");
//     if (token && tokenExpiry) {
//       const exp = Number(tokenExpiry);
//       if (!Number.isNaN(exp) && Date.now() < exp) {
//         router.replace("/dashboard");
//       }
//     }
//   }, [router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage("");

//     if (!baseUrl) {
//       setErrorMessage("NEXT_PUBLIC_API_BASE_URL belum diset di .env.local");
//       return;
//     }

//     if (!noreg || !password) {
//       setErrorMessage("Noreg dan kata sandi wajib diisi.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 🌟 Mengarah ke endpoint asli backend: /api/auth/login-for-dashboard
//       const res = await fetch(`${baseUrl}/api/auth/dashboard-login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ noreg, password }),
//       });

//       const data: LoginResponse = await res.json();

//       if (!res.ok || !data.status) {
//         if (data.validation && Array.isArray(data.validation.errors)) {
//           const msg = data.validation.errors.map((e) => e.msg).join(", ");
//           setErrorMessage(msg || "Validation error.");
//         } else {
//           // Menangkap pesan spesifik (misal: "Wrong Password" atau status isotor false)
//           setErrorMessage(
//             data.message ||
//               "Otentikasi gagal, silakan periksa kembali kredensial Anda.",
//           );
//         }
//         setLoading(false);
//         return;
//       }

//       // Destructuring dari data.result (tbl_user object)
//       const { fullname, jabatanId, authority_level, roles } = data.result;
//       const token = data.token;
//       const tokenExpiry = Date.now() + 8 * 60 * 60 * 1000; // 8 Jam masa aktif

//       if (typeof window !== "undefined") {
//         localStorage.setItem("token", token);
//         localStorage.setItem("tokenExpiry", tokenExpiry.toString());
//         localStorage.setItem("username", fullname);
//         localStorage.setItem("jabatanId", String(jabatanId || ""));
//         localStorage.setItem("authority_level", String(authority_level || ""));

//         // Memetakan array object [{ role_name: "ROLE_ADMIN" }] menjadi ["ROLE_ADMIN"]
//         const roleNames = Array.isArray(roles)
//           ? roles.map((r) => r.role_name)
//           : [];
//         localStorage.setItem("user_roles", JSON.stringify(roleNames));
//       }

//       router.push("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setErrorMessage(
//         "Terjadi kesalahan jaringan internal. Silakan hubungi Administrator K3.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
//       {/* Background Layer: Cyber Dark Mesh & Subtle Radial Glow */}
//       <div className="pointer-events-none absolute inset-0 z-0">
//         <div className="absolute left-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
//         <div className="absolute right-[5%] bottom-[-5%] h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
//         <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
//       </div>

//       {/* LEFT SIDE: Authorized Briefing & Status Panel (60% Width) */}
//       <div className="relative hidden w-[60%] flex-col justify-between border-r border-slate-900 bg-slate-950/40 p-16 xl:p-24 lg:flex z-10">
//         {/* Header: Logo Placeholder & Title */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center gap-4"
//         >
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 shadow-md">
//             <span className="text-xs font-black tracking-tighter text-amber-500">
//               TMMIN
//             </span>
//           </div>

//           <div className="h-7 w-px bg-slate-800" />

//           <div className="flex flex-col">
//             <h1 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
//               SIK INTEGRATED SYSTEM
//             </h1>
//             <p className="text-[10px] text-slate-500 font-medium">
//               E-Permit & Denwacho Execution Control
//             </p>
//           </div>
//         </motion.div>

//         {/* Central Content: Operational Goal & Counter */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="max-w-2xl my-auto space-y-10"
//         >
//           <div className="space-y-4">
//             <div className="inline-flex items-center gap-2 rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-[11px] font-semibold text-amber-400 shadow-inner">
//               <ShieldAlert className="h-3.5 w-3.5" />
//               RESTRICTED AREA: AUTHORIZED PERSONNEL ONLY
//             </div>
//             <h2 className="text-4xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
//               Sistem Pengawasan <br />
//               Izin Kerja & Kelayakan{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-slate-200">
//                 K3 Manufaktur
//               </span>
//             </h2>
//             <p className="text-sm leading-relaxed text-slate-400">
//               Gerbang otentikasi digital untuk memvalidasi kelayakan kontraktor,
//               registrasi Surat Izin Kerja (SIK), dan monitoring pos penjagaan
//               gerbang (Denwacho Gate Control) secara real-time demi mewujudkan
//               target{" "}
//               <strong className="text-slate-200 font-semibold">
//                 TMMIN Zero Accident
//               </strong>
//               .
//             </p>
//           </div>

//           {/* Live System Metric Cards */}
//           <div className="grid grid-cols-2 gap-4 pt-4">
//             <div className="rounded-xl border border-slate-900 bg-slate-950/60 p-4 shadow-sm backdrop-blur-sm">
//               <div className="text-2xl font-bold text-amber-400 tracking-tight">
//                 E-Gatekeeper
//               </div>
//               <div className="text-[11px] text-slate-500 font-medium mt-1">
//                 Sertifikasi & Induction Check Otomatis
//               </div>
//             </div>
//             <div className="rounded-xl border border-slate-900 bg-slate-950/60 p-4 shadow-sm backdrop-blur-sm">
//               <div className="text-2xl font-bold text-indigo-400 tracking-tight">
//                 Real-Time
//               </div>
//               <div className="text-[11px] text-slate-500 font-medium mt-1">
//                 Sinkronisasi Pos Security & Safety Officer
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Footer Nodes */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="flex items-center justify-between text-[11px] font-medium text-slate-600 border-t border-slate-900/60 pt-6"
//         >
//           <div className="flex items-center gap-2">
//             <Activity className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
//             <span>
//               Operational Node:{" "}
//               <strong className="text-slate-400 font-semibold">
//                 TM-CENTRAL-GATEWAY
//               </strong>
//             </span>
//           </div>
//           <span>© {new Date().getFullYear()} PT Pionir Inovasi Digital</span>
//         </motion.div>
//       </div>

//       {/* RIGHT SIDE: Dedicated Minimalist Login Card (40% Width) */}
//       <div className="relative flex w-full items-center justify-center px-6 py-12 lg:w-[40%] xl:px-16 z-10 bg-slate-950">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.45 }}
//           className="w-full max-w-sm space-y-8"
//         >
//           {/* Title Area */}
//           <div className="space-y-2">
//             <h3 className="text-2xl font-bold tracking-tight text-slate-100">
//               Sign In Kredensial
//             </h3>
//             <p className="text-xs text-slate-400 font-medium">
//               Masukkan Nomor Registrasi (Noreg) dan Kata Sandi internal Anda
//               untuk memproses akses.
//             </p>
//           </div>

//           {errorMessage && (
//             <div className="rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-3 text-xs font-medium text-red-400">
//               {errorMessage}
//             </div>
//           )}

//           {/* Form Area */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Input Noreg */}
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-400 tracking-wide">
//                 Nomor Registrasi (Noreg)
//               </label>
//               <Input
//                 type="text"
//                 value={noreg}
//                 onChange={(e) => setNoreg(e.target.value)}
//                 placeholder="Contoh: REG-10924X"
//                 autoComplete="username"
//                 className="h-11 rounded-lg border-slate-800 bg-slate-900/30 px-3.5 text-sm text-slate-100 placeholder:text-slate-600 transition focus:border-amber-500/50 focus:bg-slate-900/60 focus:ring-0 focus:outline-none"
//               />
//             </div>

//             {/* Input Password */}
//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-400 tracking-wide">
//                 Kata Sandi
//               </label>
//               <div className="relative">
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   autoComplete="current-password"
//                   className="h-11 w-full rounded-lg border-slate-800 bg-slate-900/30 px-3.5 pr-10 text-sm text-slate-100 placeholder:text-slate-700 transition focus:border-amber-500/50 focus:bg-slate-900/60"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               disabled={loading}
//               className="h-11 w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-xs font-bold text-slate-950 transition hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] disabled:opacity-50"
//             >
//               {loading ? "Memvalidasi Otoritas..." : "MASUK KE CONTROL CENTER"}
//             </Button>
//           </form>

//           <p className="text-center text-[11px] leading-relaxed text-slate-500 font-medium">
//             Setiap aktivitas masuk dicatat dalam log audit keamanan data TMMIN.{" "}
//             <br />
//             Penyalahgunaan hak akses akan ditindak tegas.
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

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

  const [noreg, setNoreg] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    setLoading(true);

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

  return (
    <div className="relative flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* BACKGROUND LAYER: Efek Ambient Glow Dinamis Bergerak Lambat */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 30, -10, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute left-[5%] top-[-20%] h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[150px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 40, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute right-[-5%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[130px]"
        />
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-slate-950/50" />
      </div>

      {/* LEFT SIDE: Briefing Panel (60% Width) */}
      <div className="relative hidden w-[60%] flex-col justify-between border-r border-slate-900 bg-slate-950/20 p-16 xl:p-24 lg:flex z-10 backdrop-blur-[2px]">
        {/* Header Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="relative group flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-xs font-black tracking-tighter text-amber-500 relative z-10">
              TMMIN
            </span>
          </div>
          <div className="h-7 w-px bg-slate-800" />
          <div className="flex flex-col">
            <h1 className="text-xs font-bold tracking-[0.25em] text-slate-300 uppercase">
              SIK INTEGRATED SYSTEM
            </h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide">
              E-Permit & Denwacho Execution Control
            </p>
          </div>
        </motion.div>

        {/* Central Content */}
        <div className="max-w-2xl my-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3.5 py-1 text-[11px] font-medium text-amber-400 shadow-inner backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
              SECURE SEC-LEVEL // AUTHORIZED PERSONNEL ONLY
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-100 leading-[1.2] xl:text-5xl">
              Sistem Pengawasan <br />
              Izin Kerja & Kelayakan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-200">
                K3 Manufaktur
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 font-normal max-w-lg">
              Gerbang otentikasi digital untuk memvalidasi kelayakan kontraktor,
              registrasi Surat Izin Kerja (SIK), dan monitoring pos penjagaan
              gerbang secara real-time demi mewujudkan target{" "}
              <span className="text-amber-400 font-semibold underline decoration-amber-500/30 underline-offset-4">
                TMMIN Zero Accident
              </span>
              .
            </p>
          </motion.div>

          {/* Metric Cards Grid dengan Efek Hover Scale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 pt-4"
          >
            <div className="group rounded-xl border border-slate-900 bg-slate-900/20 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-amber-500/30 hover:bg-slate-900/40">
              <div className="text-xl font-bold text-amber-400 tracking-tight flex items-center gap-2">
                E-Gatekeeper
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1.5 leading-relaxed">
                Sertifikasi & Induction Check Otomatis Berbasis Sistem Terpusat.
              </div>
            </div>
            <div className="group rounded-xl border border-slate-900 bg-slate-900/20 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-900/40">
              <div className="text-xl font-bold text-indigo-400 tracking-tight">
                Real-Time Sync
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1.5 leading-relaxed">
                Sinkronisasi Instan Pos Security & Safety Officer Lapangan.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Nodes */}
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 border-t border-slate-900/60 pt-6">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
            <span>
              Operational Node:{" "}
              <span className="text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                TM-CENTRAL-GATEWAY
              </span>
            </span>
          </div>
          <span className="font-mono">© 2026 PT Pionir Inovasi Digital</span>
        </div>
      </div>

      {/* RIGHT SIDE: Cyber Glassmorphism Login Card (40% Width) */}
      <div className="relative flex w-full items-center justify-center px-6 py-12 lg:w-[40%] xl:px-20 z-10 bg-slate-950/80 backdrop-blur-lg">
        {/* Light Glow dibelakang Form */}
        <div className="absolute right-1/2 top-1/3 -translate-y-1/2 translate-x-1/2 w-72 h-72 rounded-full bg-amber-500/[0.02] blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm space-y-8"
        >
          {/* Header Form */}
          <div className="space-y-2.5">
            <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full" />
            <h3 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-amber-500" /> Sign In Kredensial
            </h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Masukkan Nomor Registrasi (Noreg) dan Kata Sandi internal Anda
              untuk memproses otorisasi enkripsi data.
            </p>
          </div>

          {/* Error Message dengan AnimatePresence agar transisinya smooth */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="rounded-lg border border-red-500/20 bg-red-500/5 p-3.5 text-xs font-medium text-red-400 flex items-start gap-2"
              >
                <ShieldAlert className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Noreg */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 tracking-wide block">
                Nomor Registrasi (Noreg)
              </label>
              <div className="relative group">
                <Input
                  type="text"
                  value={noreg}
                  onChange={(e) => setNoreg(e.target.value)}
                  placeholder="Contoh: REG-10924X"
                  autoComplete="username"
                  className="h-11 rounded-lg border-slate-800 bg-slate-900/20 px-3.5 text-sm text-slate-100 placeholder:text-slate-700 transition duration-200 focus:border-amber-500/50 focus:bg-slate-900/40 focus:ring-1 focus:ring-amber-500/20 focus:outline-none"
                />
                <div className="absolute inset-0 rounded-lg border border-amber-500/0 group-focus-within:border-amber-500/20 pointer-events-none transition-colors duration-300" />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 tracking-wide block">
                Kata Sandi
              </label>
              <div className="relative group">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg border-slate-800 bg-slate-900/20 px-3.5 pr-10 text-sm text-slate-100 placeholder:text-slate-800 transition duration-200 focus:border-amber-500/50 focus:bg-slate-900/40 focus:ring-1 focus:ring-amber-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center text-slate-500 hover:text-slate-300 transition-colors duration-200 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Upgrade Submit Button dengan Loading State Berputar */}
            <Button
              type="submit"
              disabled={loading}
              className="relative h-11 w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-xs font-bold text-slate-950 transition-all duration-300 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/10 active:scale-[0.98] disabled:opacity-60 overflow-hidden"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                    <span>MEMVALIDASI OTORITAS...</span>
                  </>
                ) : (
                  "MASUK KE CONTROL CENTER"
                )}
              </span>
            </Button>
          </form>

          {/* Footer Security Note */}
          <div className="rounded-lg border border-slate-900 bg-slate-950 p-3 text-center text-[10px] leading-relaxed text-slate-500 font-medium">
            Setiap aktivitas masuk dicatat dalam log audit keamanan data TMMIN.
            Penyalahgunaan hak akses akan ditindak tegas secara hukum.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
