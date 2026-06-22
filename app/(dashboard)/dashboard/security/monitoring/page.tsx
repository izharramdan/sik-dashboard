"use client";

import React, { useEffect, useState } from "react";
import {
  Monitor,
  Users,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  Activity,
} from "lucide-react";

interface LiveActivity {
  id: string;
  time: string;
  workerName: string;
  vendor: string;
  gate: string;
  type: "IN" | "OUT";
  status: "APPROVED" | "REJECTED";
}

export default function SecurityMonitoringPage() {
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [stats, setStats] = useState({
    totalInside: 42,
    todayApproved: 128,
    todayRejected: 3,
  });

  // Simulasi Efek Live Monitoring: Menerima data stream (Nantinya diganti SSE / WebSockets)
  useEffect(() => {
    // Data bawaan awal saat halaman dimuat
    setActivities([
      {
        id: "1",
        time: "21:32",
        workerName: "Sultan Ramadhan",
        vendor: "PT Delta Pratama",
        gate: "POS 1 - Main Gate",
        type: "IN",
        status: "APPROVED",
      },
      {
        id: "2",
        time: "21:25",
        workerName: "Ahmad Rizky",
        vendor: "PT Jaya Mandiri",
        gate: "POS 2 - Vendor Gate",
        type: "OUT",
        status: "APPROVED",
      },
      {
        id: "3",
        time: "21:10",
        workerName: "Supriadi",
        vendor: "CV Teknik Bersama",
        gate: "POS 1 - Main Gate",
        type: "IN",
        status: "REJECTED",
      },
    ]);

    // Simulasi jika ada orang konfirmasi scan di gerbang, data bertambah otomatis tiap 8 detik
    const interval = setInterval(() => {
      const mockNames = [
        "Rian Hidayat",
        "Budi Santoso",
        "Dani Wijaya",
        "Aris Munandar",
      ];
      const mockVendors = [
        "PT Toyota Vendor A",
        "CV Karya Abadi",
        "PT Nusa Perkasa",
      ];

      const randomName =
        mockNames[Math.floor(Math.random() * mockNames.length)];
      const randomVendor =
        mockVendors[Math.floor(Math.random() * mockVendors.length)];
      const isApproved = Math.random() > 0.15 ? "APPROVED" : "REJECTED";

      const newLog: LiveActivity = {
        id: Math.random().toString(),
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        workerName: randomName,
        vendor: randomVendor,
        gate: "POS 1 - Main Gate",
        type: "IN",
        status: isApproved,
      };

      setActivities((prev) => [newLog, ...prev.slice(0, 9)]); // Batasi hanya 10 log terbaru di screen

      if (isApproved === "APPROVED") {
        setStats((prev) => ({
          ...prev,
          totalInside: prev.totalInside + 1,
          todayApproved: prev.todayApproved + 1,
        }));
      } else {
        setStats((prev) => ({
          ...prev,
          todayRejected: prev.todayRejected + 1,
        }));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Monitor className="h-5 w-5 text-indigo-500 animate-pulse" />
            Live Monitoring Aliran Gerbang
          </h1>
          <p className="text-xs text-muted-foreground">
            Pemantauan sirkulasi masuk-keluar pekerja dan kontraktor TMMIN
            secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-md px-3 py-1.5 w-fit">
          <Activity className="h-3.5 w-3.5 animate-spin" />
          <span>LIVE STREAMING CONNECTION</span>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Pekerja Di Dalam Pabrik
            </span>
            <Users className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {stats.totalInside}
            </span>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" /> Person
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Total Check-In Sukses
            </span>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {stats.todayApproved}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              Hari ini
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Total Denwacho Ditolak
            </span>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-red-500">
              {stats.todayRejected}
            </span>
            <span className="text-[10px] font-bold text-red-400">
              Pelanggaran SIK
            </span>
          </div>
        </div>
      </div>

      {/* Live Stream Table */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Log Aktivitas Pemindaian Terkini (Gerbang Otomatis)
        </h3>

        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border/80 text-muted-foreground font-semibold">
                <th className="p-3">Waktu</th>
                <th className="p-3">Nama Kontraktor</th>
                <th className="p-3">Perusahaan/Vendor</th>
                <th className="p-3">Lokasi Pos Gerbang</th>
                <th className="p-3">Aksi</th>
                <th className="p-3 text-right">Status Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-medium">
              {activities.map((act) => (
                <tr
                  key={act.id}
                  className="hover:bg-muted/20 transition-colors animate-fadeIn"
                >
                  <td className="p-3 text-slate-400 font-mono">{act.time}</td>
                  <td className="p-3 text-foreground font-semibold">
                    {act.workerName}
                  </td>
                  <td className="p-3 text-muted-foreground">{act.vendor}</td>
                  <td className="p-3 text-slate-400">{act.gate}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold ${
                        act.type === "IN"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {act.type === "IN" ? "Masuk" : "Keluar"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        act.status === "APPROVED"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {act.status === "APPROVED"
                        ? "Verified & Allowed"
                        : "Access Denied"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Monitor,
//   Users,
//   ShieldCheck,
//   ShieldAlert,
//   ArrowUpRight,
//   Activity,
// } from "lucide-react";

// // Interface disesuaikan dengan struktur data asli hasil format dari backend Express Mas
// interface BackendDenwachoRow {
//   id: string;
//   status: string;
//   check_in_time: string | null;
//   check_out_time: string | null;
//   work_permit?: {
//     project_name: string;
//     vendor_name: string;
//     location: string;
//   };
// }

// interface LiveActivity {
//   id: string;
//   time: string;
//   workerName: string;
//   vendor: string;
//   gate: string;
//   type: "IN" | "OUT" | "-";
//   status: string;
// }

// export default function SecurityMonitoringPage() {
//   const [activities, setActivities] = useState<LiveActivity[]>([]);
//   const [stats, setStats] = useState({
//     totalInside: 0,
//     todayApproved: 0,
//     todayRejected: 0,
//   });
//   const [streamingActive, setStreamingActive] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     // 🌟 CONNECT TO REAL BACKEND SSE
//     const sseUrl = `http://localhost:2009/api/denwacho-monitoring/today?token=${token}`;
//     const eventSource = new EventSource(sseUrl);

//     eventSource.onopen = () => {
//       setStreamingActive(true);
//     };

//     eventSource.onmessage = (event) => {
//       try {
//         const resData = JSON.parse(event.data);

//         if (resData.data && resData.summary) {
//           // 1. Petakan data real backend ke format tabel yang Mas Hadi sukai
//           const mappedRows = resData.data.map((item: BackendDenwachoRow) => {
//             const hasCheckedIn = !!item.check_in_time;
//             const hasCheckedOut = !!item.check_out_time;

//             // Tentukan format waktu tampil (prioritas waktu keluar, lalu waktu masuk)
//             let displayTime = "-";
//             if (hasCheckedOut && item.check_out_time) {
//               displayTime = new Date(item.check_out_time).toLocaleTimeString(
//                 "id-ID",
//                 { hour: "2-digit", minute: "2-digit" },
//               );
//             } else if (hasCheckedIn && item.check_in_time) {
//               displayTime = new Date(item.check_in_time).toLocaleTimeString(
//                 "id-ID",
//                 { hour: "2-digit", minute: "2-digit" },
//               );
//             }

//             return {
//               id: item.id,
//               time: displayTime,
//               workerName: item.work_permit?.project_name || "No Project Name", // Di level denwacho header tampil nama project/pekerjaannya
//               vendor: item.work_permit?.vendor_name || "-",
//               gate: item.work_permit?.location || "Main Gate",
//               type: hasCheckedOut ? "OUT" : hasCheckedIn ? "IN" : "-",
//               status: item.status, // DRAFT, APPROVED, CHECKED_IN, CHECKED_OUT
//             };
//           });

//           setActivities(mappedRows);

//           // 2. Petakan counter widget atas dari object summary backend Mas
//           setStats({
//             totalInside: resData.summary.inside_area || 0,
//             todayApproved: resData.summary.completed || 0,
//             todayRejected: resData.summary.overtime_alert || 0, // Kita mapping slot reject/alert untuk overtime harian
//           });
//         }
//       } catch (err) {
//         console.error("Gagal parse data stream monitoring:", err);
//       }
//     };

//     eventSource.onerror = () => {
//       setStreamingActive(false);
//       eventSource.close();
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* Top Header Card */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-4">
//         <div>
//           <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
//             <Monitor className="h-5 w-5 text-indigo-500 animate-pulse" />
//             Live Monitoring Aliran Gerbang
//           </h1>
//           <p className="text-xs text-muted-foreground">
//             Pemantauan sirkulasi masuk-keluar pekerja dan kontraktor TMMIN
//             secara real-time.
//           </p>
//         </div>
//         <div
//           className={`flex items-center gap-2 text-xs font-semibold rounded-md px-3 py-1.5 w-fit ${
//             streamingActive
//               ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
//               : "bg-slate-800 text-slate-500"
//           }`}
//         >
//           <Activity
//             className={`h-3.5 w-3.5 ${streamingActive && "animate-spin"}`}
//           />
//           <span>
//             {streamingActive
//               ? "LIVE STREAMING CONNECTION"
//               : "OFFLINE / CONNECTING"}
//           </span>
//         </div>
//       </div>

//       {/* Stats Counter Row */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
//               Pekerja Di Dalam Pabrik
//             </span>
//             <Users className="h-4 w-4 text-indigo-500" />
//           </div>
//           <div className="mt-2 flex items-baseline gap-2">
//             <span className="text-3xl font-extrabold tracking-tight text-foreground">
//               {stats.totalInside}
//             </span>
//             <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
//               <ArrowUpRight className="h-3 w-3" /> Person
//             </span>
//           </div>
//         </div>

//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
//               Total Selesai Shift (Out)
//             </span>
//             <ShieldCheck className="h-4 w-4 text-emerald-500" />
//           </div>
//           <div className="mt-2 flex items-baseline gap-2">
//             <span className="text-3xl font-extrabold tracking-tight text-foreground">
//               {stats.todayApproved}
//             </span>
//             <span className="text-[10px] text-muted-foreground font-medium">
//               Hari ini
//             </span>
//           </div>
//         </div>

//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
//               Overtime Alert (&gt;14j)
//             </span>
//             <ShieldAlert className="h-4 w-4 text-red-500" />
//           </div>
//           <div className="mt-2 flex items-baseline gap-2">
//             <span className="text-3xl font-extrabold tracking-tight text-red-500">
//               {stats.todayRejected}
//             </span>
//             <span className="text-[10px] font-bold text-red-400">
//               Kasus Aktif
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Live Stream Table */}
//       <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
//         <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
//           Log Aktivitas Pemindaian Terkini (Gerbang Otomatis)
//         </h3>

//         <div className="overflow-x-auto rounded-lg border border-border/60">
//           <table className="w-full text-left text-xs border-collapse">
//             <thead>
//               <tr className="bg-muted/50 border-b border-border/80 text-muted-foreground font-semibold">
//                 <th className="p-3">Waktu</th>
//                 <th className="p-3">Nama Kontraktor / Proyek</th>
//                 <th className="p-3">Perusahaan/Vendor</th>
//                 <th className="p-3">Lokasi Pos Gerbang</th>
//                 <th className="p-3">Aksi</th>
//                 <th className="p-3 text-right">Status Lapangan</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-border/40 font-medium">
//               {activities.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="p-8 text-center text-muted-foreground"
//                   >
//                     Tidak ada aktivitas sirkulasi gerbang atau jadwal kerja hari
//                     ini.
//                   </td>
//                 </tr>
//               ) : (
//                 activities.map((act) => (
//                   <tr
//                     key={act.id}
//                     className="hover:bg-muted/20 transition-colors animate-fadeIn"
//                   >
//                     <td className="p-3 text-slate-400 font-mono">{act.time}</td>
//                     <td className="p-3 text-foreground font-semibold">
//                       {act.workerName}
//                     </td>
//                     <td className="p-3 text-muted-foreground">{act.vendor}</td>
//                     <td className="p-3 text-slate-400">{act.gate}</td>
//                     <td className="p-3">
//                       <span
//                         className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold ${
//                           act.type === "IN"
//                             ? "bg-blue-500/10 text-blue-400"
//                             : act.type === "OUT"
//                               ? "bg-amber-500/10 text-amber-400"
//                               : "bg-slate-800 text-slate-400"
//                         }`}
//                       >
//                         {act.type === "IN"
//                           ? "Masuk"
//                           : act.type === "OUT"
//                             ? "Keluar"
//                             : "Standby"}
//                       </span>
//                     </td>
//                     <td className="p-3 text-right">
//                       <span
//                         className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
//                           act.status === "CHECKED_IN"
//                             ? "bg-blue-500/10 text-blue-400 animate-pulse"
//                             : act.status === "CHECKED_OUT"
//                               ? "bg-emerald-500/10 text-emerald-400"
//                               : act.status === "APPROVED"
//                                 ? "bg-amber-500/10 text-amber-400"
//                                 : "bg-slate-800 text-slate-400"
//                         }`}
//                       >
//                         {act.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
