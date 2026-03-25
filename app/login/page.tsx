// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Eye, EyeOff, ShieldCheck } from "lucide-react";

// // interface LoginResponse {
// //   status: boolean;
// //   message?: string;
// //   token: string;
// //   result: {
// //     fullname: string;
// //     jabatanId: number | string;
// //     authority_level: number | string;
// //   };
// //   validation?: {
// //     errors: { msg: string }[];
// //   };
// // }

// // export default function LoginPage() {
// //   const router = useRouter();
// //   const baseUrl = process.env.NEXT_PUBLIC_DEV_URL;

// //   const [noreg, setNoreg] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   // Kalau sudah login dan token masih valid, langsung lempar ke dashboard
// //   useEffect(() => {
// //     if (typeof window === "undefined") return;

// //     const token = localStorage.getItem("token");
// //     const tokenExpiry = localStorage.getItem("tokenExpiry");
// //     if (token && tokenExpiry) {
// //       const exp = Number(tokenExpiry);
// //       if (!Number.isNaN(exp) && Date.now() < exp) {
// //         router.replace("/dashboard");
// //       }
// //     }
// //   }, [router]);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setErrorMessage("");

// //     if (!baseUrl) {
// //       setErrorMessage("NEXT_PUBLIC_DEV_URL belum diset di .env.local");
// //       return;
// //     }

// //     if (!noreg || !password) {
// //       setErrorMessage("Noreg dan password wajib diisi.");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await fetch(`${baseUrl}/auth/dashboard-login`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ noreg, password }),
// //       });

// //       const data: LoginResponse = await res.json();

// //       if (!res.ok || !data.status) {
// //         if (data.validation && Array.isArray(data.validation.errors)) {
// //           const msg = data.validation.errors.map((e) => e.msg).join(", ");
// //           setErrorMessage(msg || "Validation error.");
// //         } else {
// //           setErrorMessage(data.message || "Login gagal, silakan coba lagi.");
// //         }
// //         setLoading(false);
// //         return;
// //       }

// //       const { fullname, jabatanId, authority_level } = data.result;
// //       const token = data.token;
// //       const tokenExpiry = Date.now() + 8 * 60 * 60 * 1000; // 8 jam

// //       if (typeof window !== "undefined") {
// //         localStorage.setItem("token", token);
// //         localStorage.setItem("tokenExpiry", tokenExpiry.toString());
// //         localStorage.setItem("username", fullname);
// //         localStorage.setItem("jabatanId", String(jabatanId));
// //         localStorage.setItem("authority_level", String(authority_level));
// //       }

// //       router.push("/dashboard");
// //     } catch (err) {
// //       console.error(err);
// //       setErrorMessage("Terjadi kesalahan jaringan. Silakan coba lagi.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-background">
// //       {/* Panel branding kiri (hidden di mobile) */}
// //       <div className="relative hidden w-1/2 flex-col justify-between border-r border-border bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 px-10 py-8 text-slate-50 lg:flex">
// //         <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
// //           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
// //             <ShieldCheck className="h-5 w-5" />
// //           </div>
// //           <div className="flex flex-col leading-tight">
// //             <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
// //               1-SAPs
// //             </span>
// //             <span>Smart Warehouse Control</span>
// //           </div>
// //         </div>

// //         <div className="space-y-4">
// //           <h1 className="text-2xl font-semibold tracking-tight">
// //             Warehouse Realtime Dashboard
// //           </h1>
// //           <p className="max-w-md text-sm text-slate-300">
// //             Monitor outstanding, shopping, pickup, dan delivery per lokasi,
// //             dengan update realtime berbasis SSE. Dirancang untuk operasi
// //             TMMIN yang presisi dan minim error.
// //           </p>
// //           <div className="mt-6 grid gap-3 text-xs text-slate-300">
// //             <div className="flex items-center gap-2">
// //               <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
// //               <span>Single sign-on untuk admin warehouse & approver.</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
// //               <span>Insight transaksi 30 hari terakhir, top material, dan delivery cycle.</span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="text-[11px] text-slate-500">
// //           © {new Date().getFullYear()} PT. Pionir Inovasi Digital. All rights
// //           reserved.
// //         </div>
// //       </div>

// //       {/* Panel kanan (form login) */}
// //       <div className="flex flex-1 items-center justify-center px-4 py-8 lg:px-10">
// //         <Card className="w-full max-w-md border border-border/60 bg-card/95 shadow-lg backdrop-blur">
// //           <CardHeader className="space-y-1 pb-4">
// //             <CardTitle className="text-lg font-semibold tracking-tight">
// //               Sign in to Warehouse Console
// //             </CardTitle>
// //             <p className="text-xs text-muted-foreground">
// //               Gunakan akun internal Anda untuk mengakses dashboard warehouse.
// //             </p>
// //           </CardHeader>
// //           <CardContent>
// //             <form className="space-y-4" onSubmit={handleSubmit}>
// //               <div className="space-y-1.5">
// //                 <label className="text-xs font-medium text-foreground">
// //                   Noreg
// //                 </label>
// //                 <Input
// //                   value={noreg}
// //                   onChange={(e) => setNoreg(e.target.value)}
// //                   placeholder="Masukkan noreg"
// //                   autoComplete="username"
// //                   className="text-sm"
// //                 />
// //               </div>

// //               <div className="space-y-1.5">
// //                 <label className="text-xs font-medium text-foreground">
// //                   Password
// //                 </label>
// //                 <div className="relative">
// //                   <Input
// //                     type={showPassword ? "text" : "password"}
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     placeholder="••••••••"
// //                     autoComplete="current-password"
// //                     className="pr-10 text-sm"
// //                   />
// //                   <button
// //                     type="button"
// //                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
// //                     onClick={() => setShowPassword((prev) => !prev)}
// //                   >
// //                     {showPassword ? (
// //                       <EyeOff className="h-4 w-4" />
// //                     ) : (
// //                       <Eye className="h-4 w-4" />
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>

// //               {errorMessage && (
// //                 <div className="rounded-md border border-red-500/40 bg-red-500/5 px-3 py-2 text-[11px] text-red-500">
// //                   {errorMessage}
// //                 </div>
// //               )}

// //               <Button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="mt-1 w-full text-sm"
// //               >
// //                 {loading ? "Signing in..." : "Sign in"}
// //               </Button>

// //               <p className="pt-2 text-[11px] text-muted-foreground">
// //                 Login ini hanya untuk admin yang memiliki akses ke
// //                 1-SAPs Console.
// //               </p>
// //             </form>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useFormik } from "formik";
// import { useState } from "react";
// import axios from "axios";
// import { Eye, EyeOff, ShieldCheck } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const url = process.env.NEXT_PUBLIC_API_URL;

//   const formik = useFormik({
//     initialValues: { noreg: "", password: "" },
//     onSubmit: async (values) => {
//       try {
//         const res = await axios.post(`${url}/auth/dashboard-login`, values);
//         localStorage.setItem("token", res.data.token);
//         window.location.href = "/dashboard";
//       } catch (err: any) {
//         setErrorMessage(err.response?.data?.message ?? "Login failed");
//       }
//     },
//   });

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">

//       {/* LEFT SIDE INFO */}
//       <div className="hidden lg:flex flex-col justify-center w-1/2 px-20 gap-6">
//         <div className="flex items-center gap-3 text-blue-400">
//           <ShieldCheck className="h-7 w-7" />
//           <span className="font-semibold text-lg tracking-wide">1-SAPs</span>
//         </div>

//         <h1 className="text-3xl font-semibold leading-tight">
//           Smart Warehouse Control <br />
//           <span className="text-slate-400 text-lg font-normal">
//             Precision • Real-time • Reliable
//           </span>
//         </h1>

//         <p className="text-slate-400 text-sm leading-relaxed max-w-md">
//           Monitor outstanding, shopping, pickup, dan delivery per lokasi dengan update realtime berbasis SSE. 
//           Dirancang untuk operasi warehouse TMMIN yang presisi dan minim error.
//         </p>

//         <ul className="text-sm text-slate-400 space-y-2">
//           <li>• Single sign-on untuk admin warehouse & approver</li>
//           <li>• Insight transaksi 30 hari terakhir, top material, & delivery cycle</li>
//         </ul>

//         <p className="text-xs text-slate-600 pt-10">© 2025 PT. Pionir Inovasi Digital</p>
//       </div>

//       {/* RIGHT SIDE LOGIN */}
//       <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6">

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl"
//         >
//           <h2 className="text-xl font-semibold mb-1">Sign in to Warehouse Console</h2>
//           <p className="text-sm text-slate-400 mb-6">
//             Gunakan akun internal untuk mengakses dashboard warehouse.
//           </p>

//           {errorMessage && (
//             <div className="text-red-400 text-sm mb-3">{errorMessage}</div>
//           )}

//           <form onSubmit={formik.handleSubmit} className="space-y-4">

//             <div>
//               <label className="text-sm">Noreg</label>
//               <Input
//                 name="noreg"
//                 onChange={formik.handleChange}
//                 className="bg-white/5 border-white/10 text-white"
//                 placeholder="Masukkan noreg"
//               />
//             </div>

//             <div className="relative">
//               <label className="text-sm">Password</label>
//               <Input
//                 type={showPassword ? "text" : "password"}
//                   name="password"
//                 onChange={formik.handleChange}
//                 className="bg-white/5 border-white/10 text-white pr-10"
//                 placeholder="••••••••"
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-8 text-slate-400 hover:text-white"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 rounded-lg"
//             >
//               Sign in
//             </Button>

//             <p className="text-xs text-slate-500 text-center pt-2">
//               Login ini hanya untuk admin yang memiliki akses 1-SAPs Console.
//             </p>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Wifi } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginResponse {
  status: boolean;
  message?: string;
  token: string;
  result: {
    fullname: string;
    jabatanId: number | string;
    authority_level: number | string;
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

  // auto redirect kalau sudah login & token masih valid
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
      setErrorMessage("NEXT_PUBLIC_DEV_URL belum diset di .env.local");
      return;
    }

    if (!noreg || !password) {
      setErrorMessage("Noreg dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/auth/dashboard-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noreg, password }),
      });

      const data: LoginResponse = await res.json();

      if (!res.ok || !data.status) {
        if (data.validation && Array.isArray(data.validation.errors)) {
          const msg = data.validation.errors.map((e) => e.msg).join(", ");
          setErrorMessage(msg || "Validation error.");
        } else {
          setErrorMessage(data.message || "Login gagal, silakan coba lagi.");
        }
        setLoading(false);
        return;
      }

      const { fullname, jabatanId, authority_level } = data.result;
      const token = data.token;
      const tokenExpiry = Date.now() + 8 * 60 * 60 * 1000; // 8 jam

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiry", tokenExpiry.toString());
        localStorage.setItem("username", fullname);
        localStorage.setItem("jabatanId", String(jabatanId));
        localStorage.setItem("authority_level", String(authority_level));
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMessage("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
      {/* Glow + grid background global */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0ea5e91f_0,_transparent_55%),radial-gradient(circle_at_bottom,_#22c55e12_0,_transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-soft-light [background-image:linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      {/* LEFT SIDE – cinematic info panel */}
      <div className="relative hidden w-1/2 flex-col justify-between px-14 py-10 xl:px-20 lg:flex">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/15 ring-1 ring-cyan-400/40">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium tracking-[0.25em] text-slate-400 uppercase">
              SIK
            </span>
            <span className="text-sm font-semibold text-slate-100">
              Sistem Informasi
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              SIK Dashboard
            </h1>
            <p className="max-w-xl text-sm text-slate-300">
              Monitor data dan transaksi pada Sistem Informasi ini. Dirancang
              untuk operasional yang lebih baik dan terintegrasi.
              TMMIN yang presisi dan minim error.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              <span>Single sign-on untuk admin warehouse.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
              <span>
                Insight transaksi 30 hari terakhir, top material, dan delivery
                cycle per lokasi.
              </span>
            </div>
          </div>

          {/* SSE / network pulse visual */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1.5 text-[11px] text-slate-300">
              <div className="relative flex h-6 w-6 items-center justify-center">
                <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-emerald-400/40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.9)]" />
              </div>
              SSE Connected
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Wifi className="h-3.5 w-3.5 text-cyan-400" />
              <span>Live node: TMWH-SUNTER</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] text-slate-500"
        >
          © {new Date().getFullYear()} PT. Pionir Inovasi Digital. All rights
          reserved.
        </motion.div>
      </div>

      {/* RIGHT SIDE – glass login card */}
      <div className="relative flex w-full items-center justify-center px-4 py-10 lg:w-1/2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="w-full max-w-md rounded-2xl border border-slate-700/70 bg-slate-950/70 p-7 shadow-[0_0_60px_rgba(15,23,42,0.85)] backdrop-blur-xl"
        >
          <div className="mb-6 space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">
              Sign in to SIK Dashboard
            </h2>
            <p className="text-xs text-slate-400">
              Gunakan akun Anda untuk mengakses dashboard SIK.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-300">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Noreg with floating label */}
            <div className="space-y-1">
              <div className="relative">
                <Input
                  value={noreg}
                  onChange={(e) => setNoreg(e.target.value)}
                  placeholder=" "
                  autoComplete="username"
                  className="peer h-11 rounded-lg border-slate-700/70 bg-slate-900/70 px-3 pt-4 text-sm text-slate-100 placeholder-transparent shadow-inner ring-0 transition focus:border-cyan-400/80 focus:bg-slate-900 focus:outline-none"
                />
                <label
                  className="
                    pointer-events-none absolute left-3 top-2.5 z-10 
                    origin-left text-[11px] text-slate-400 
                    transition-all 
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-slate-500
                    peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-cyan-300
                  "
                >
                  Noreg
                </label>
              </div>
            </div>

            {/* Password with floating label + toggle */}
            <div className="space-y-1">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  autoComplete="current-password"
                  className="peer h-11 rounded-lg border-slate-700/70 bg-slate-900/70 px-3 pt-4 pr-10 text-sm text-slate-100 placeholder-transparent shadow-inner focus:border-cyan-400/80 focus:bg-slate-900"
                />
                <label
                  className="
                    pointer-events-none absolute left-3 top-2.5 z-10 
                    origin-left text-[11px] text-slate-400 
                    transition-all 
                    peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[12px] peer-placeholder-shown:text-slate-500
                    peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-cyan-300
                  "
                >
                  Password
                </label>
                <button
                  type="button"
                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center text-slate-400 hover:text-slate-100"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full rounded-lg bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-400 text-sm font-medium text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.65)] transition hover:shadow-[0_0_38px_rgba(45,212,191,0.85)] disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <p className="pt-2 text-center text-[11px] text-slate-500">
              Login ini hanya untuk admin yang memiliki akses ke
              Aplikasi SIK.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
