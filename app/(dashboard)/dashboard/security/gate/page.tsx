// app/(dashboard)/dashboard/security/gate/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { QrCode, LogIn, LogOut, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecurityGatePage() {
  const [action, setAction] = useState<"CHECK_IN" | "CHECK_OUT">("CHECK_IN");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const bufferRef = useRef("");
  const lastKeyTimeRef = useRef(Date.now());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastKeyTimeRef.current > 50) bufferRef.current = "";
      lastKeyTimeRef.current = now;

      if (e.key === "Enter") {
        if (bufferRef.current.trim()) {
          processGateScan(bufferRef.current.trim());
          bufferRef.current = "";
        }
        return;
      }
      if (e.key.length === 1) bufferRef.current += e.key;
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [action]);

  const processGateScan = async (denwachoId: string) => {
    setLoading(true);
    setLog(null);
    try {
      // Besok tinggal dihubungkan ke endpoint backend kita:
      // POST /api/denwacho/:id/gate-scan
      console.log(
        `Mengirim data ke Gate: ${denwachoId} dengan aksi: ${action}`,
      );

      // Simulasi response sukses
      setLog({
        type: "success",
        text: `Berhasil memproses ${action === "CHECK_IN" ? "Pekerja Masuk" : "Pekerja Keluar"}!`,
      });
    } catch (err) {
      setLog({
        type: "error",
        text: "Gagal memproses data. Denwacho tidak valid atau belum APPROVED.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-bold tracking-tight">
          Pos Security Gate Control
        </h2>
        <p className="text-xs text-slate-400">
          Arahkan kursor standby dan gunakan alat scan hardware pada QR Code
          Denwacho pekerja.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={action === "CHECK_IN" ? "default" : "outline"}
          onClick={() => setAction("CHECK_IN")}
          className="h-12 flex items-center gap-2 font-semibold"
        >
          <LogIn className="h-4 w-4" /> Pintu Masuk (Check-In)
        </Button>
        <Button
          variant={action === "CHECK_OUT" ? "default" : "outline"}
          onClick={() => setAction("CHECK_OUT")}
          className="h-12 flex items-center gap-2 font-semibold"
        >
          <LogOut className="h-4 w-4" /> Pintu Keluar (Check-Out)
        </Button>
      </div>

      {/* Scanner Box Visual Area */}
      <div className="border-2 border-dashed border-slate-800 bg-slate-900/20 rounded-xl p-10 flex flex-col items-center justify-center text-center space-y-3">
        <div
          className={`p-4 rounded-full ${loading ? "bg-amber-500/10 text-amber-500 animate-pulse" : "bg-indigo-500/10 text-indigo-500"}`}
        >
          <QrCode className="h-8 w-8" />
        </div>
        <div>
          <h4 className="text-sm font-semibold">
            {loading ? "Sedang Membaca..." : "STANDBY: SIAP SCAN"}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Sistem otomatis memproses begitu laser mendeteksi kode.
          </p>
        </div>
      </div>

      {/* Result Status Log */}
      {log && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 border ${log.type === "success" ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-red-500/5 border-red-500/20 text-red-400"}`}
        >
          {log.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 mt-0.5" />
          ) : (
            <AlertCircle className="h-4 w-4 mt-0.5" />
          )}
          <span className="text-xs font-medium">{log.text}</span>
        </div>
      )}
    </div>
  );
}
