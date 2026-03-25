"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
// Kalau sudah punya toast dari shadcn, boleh pakai ini:
// import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Line = {
  id: number;
  drop_point: string;
  cost_center: string | null;
};

type Mode = "GIC" | "WBS";

const CATEGORY_OPTIONS = [
  { value: "B0", label: "B0 - Operating Supply" },
  { value: "B8", label: "B8 - Chemical" },
  { value: "B9", label: "B9 - Tools" },
  { value: "B7", label: "B7 - Sparepart" },
  { value: "B2", label: "B2 - Operating Supply" },
];

interface GicWbsBulkFormProps {
  // optional: bisa dipakai untuk refetch tabel list setelah sukses
  onSuccess?: () => void;
}

export function GicWbsBulkForm({ onSuccess }: GicWbsBulkFormProps) {
  const [costCenter, setCostCenter] = useState("");
  const [lineId, setLineId] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [lines, setLines] = useState<Line[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("GIC");
  const [value, setValue] = useState("");
  const [loadingLines, setLoadingLines] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );

  // const { toast } = useToast();

  useEffect(() => {
    const fetchLines = async () => {
      if (!API_BASE_URL) return;

      setLoadingLines(true);
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          setMessageType("error");
          setMessage("Token tidak ditemukan. Silakan login kembali.");
          return;
        }

        const res = await fetch(`${API_BASE_URL}/line/by-location`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (!res.ok || !json.status) {
          setMessageType("error");
          setMessage(json.message ?? "Gagal mengambil data line.");
          return;
        }

        setLines(json.data ?? []);
      } catch (err: any) {
        console.error(err);
        setMessageType("error");
        setMessage(
          err?.message ??
            "Terjadi kesalahan saat mengambil data line. Coba lagi nanti.",
        );
      } finally {
        setLoadingLines(false);
      }
    };

    // hanya jalan di client
    if (typeof window !== "undefined") {
      fetchLines();
    }
  }, []);

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const resetForm = () => {
    setCostCenter("");
    setLineId("");
    setShift("");
    setSelectedCategories([]);
    setMode("GIC");
    setValue("");
    setMessage(null);
    setMessageType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setMessageType(null);

    if (!API_BASE_URL) {
      setMessageType("error");
      setMessage("API base URL belum dikonfigurasi (NEXT_PUBLIC_API_URL).");
      return;
    }

    if (selectedCategories.length === 0) {
      setMessageType("error");
      setMessage("Pilih minimal satu kategori material.");
      return;
    }

    setSubmitting(true);

    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        setMessageType("error");
        setMessage("Token tidak ditemukan. Silakan login kembali.");
        setSubmitting(false);
        return;
      }

      const payload = {
        cost_center: costCenter,
        line_id: Number(lineId),
        shift: shift || null,
        categories: selectedCategories,
        gic: mode === "GIC" ? value : null,
        wbs: mode === "WBS" ? value : null,
      };

      const res = await fetch(`${API_BASE_URL}/budget/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.status) {
        setMessageType("error");
        setMessage(json.message ?? "Gagal menyimpan data GIC/WBS (bulk).");
        // toast({ variant: "destructive", title: "Gagal", description: json.message ?? "Gagal menyimpan data." });
        return;
      }

      setMessageType("success");
      setMessage("Berhasil menyimpan data GIC/WBS (bulk).");
      // toast({ title: "Berhasil", description: "Data GIC/WBS berhasil disimpan." });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error(err);
      setMessageType("error");
      setMessage(
        err?.message ??
          "Terjadi kesalahan tak terduga saat menyimpan data GIC/WBS.",
      );
      // toast({ variant: "destructive", title: "Error", description: err?.message ?? "Terjadi kesalahan." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full border border-border/60 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Bulk Set GIC / WBS</CardTitle>
        <CardDescription>
          Set nomor GIC atau WBS untuk beberapa kategori material sekaligus,
          berdasarkan cost center dan line.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {message && (
          <div
            className={`rounded-md border px-3 py-2 text-sm ${
              messageType === "success"
                ? "border-emerald-500/60 bg-emerald-500/5 text-emerald-500"
                : "border-destructive/60 bg-destructive/5 text-destructive"
            }`}
          >
            {message}
          </div>
        )}

        {/* Cost Center + Line */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="costCenter">Cost Center</Label>
            <Input
              id="costCenter"
              placeholder="Misal: A1234"
              value={costCenter}
              onChange={(e) => setCostCenter(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label>Line (Drop Point)</Label>
            <Select
              value={lineId}
              onValueChange={(val) => setLineId(val)}
              disabled={loadingLines}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    loadingLines ? "Memuat line..." : "Pilih line sesuai lokasi"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {lines.map((l) => (
                  <SelectItem key={l.id} value={String(l.id)}>
                    {l.drop_point}
                    {l.cost_center ? ` (${l.cost_center})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Shift */}
        <div className="space-y-1.5">
          <Label>Shift</Label>
          <Select value={shift} onValueChange={(val) => setShift(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih shift (opsional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">(Kosongkan untuk NON-SHIFT)</SelectItem>
              <SelectItem value="RED">RED</SelectItem>
              <SelectItem value="WHITE">WHITE</SelectItem>
              <SelectItem value="NON-SHIFT">NON-SHIFT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Checkboxes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Category (Material Type)</Label>
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedCategories.map((cat) => (
                  <Badge key={cat} variant="secondary">
                    {cat}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_OPTIONS.map((cat) => (
              <label
                key={cat.value}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/50 bg-muted/40 px-3 py-2 text-sm hover:bg-muted/70"
              >
                <Checkbox
                  checked={selectedCategories.includes(cat.value)}
                  onCheckedChange={() => toggleCategory(cat.value)}
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mode GIC/WBS + Value */}
        <div className="grid gap-4 md:grid-cols-[1.3fr,2fr]">
          <div className="space-y-2">
            <Label>Mode</Label>
            <RadioGroup
              value={mode}
              onValueChange={(val) => setMode(val as Mode)}
              className="grid grid-cols-2 gap-2"
            >
              <label
                htmlFor="mode-gic"
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  mode === "GIC"
                    ? "border-primary bg-primary/5"
                    : "border-border/60"
                }`}
              >
                <RadioGroupItem id="mode-gic" value="GIC" />
                <span>GIC</span>
              </label>
              <label
                htmlFor="mode-wbs"
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  mode === "WBS"
                    ? "border-primary bg-primary/5"
                    : "border-border/60"
                }`}
              >
                <RadioGroupItem id="mode-wbs" value="WBS" />
                <span>WBS</span>
              </label>
            </RadioGroup>
            <p className="text-xs text-muted-foreground">
              Hanya salah satu yang digunakan per bulk: GIC atau WBS.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label>Nilai {mode}</Label>
            <Input
              placeholder={`Masukkan nomor ${mode}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={resetForm}
          disabled={submitting}
        >
          Reset
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={
            submitting || selectedCategories.length === 0 || !lineId || !value
          }
        >
          {submitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Simpan Bulk
        </Button>
      </CardFooter>
    </Card>
  );
}
