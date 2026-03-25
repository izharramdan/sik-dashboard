"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, getAuthToken } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, FileText} from "lucide-react";

export type MaterialDetail = {
  id: string;
  material_name: string;
  category_id: string;
  price: number;
  stock_type: string;
  source_type: string;
  uom: string;
  min_order?: number | null;
  max_order?: number | null;
  rack_address?: string | null;
  material_type_descr?: string | null;
  material_image?: string | null;
  msds_file?: string | null;
  locations?: { id: number; location_name: string }[];
};

type Category = {
  id: string;
  material_type: string;
};

type Uom = {
  id: number;
  uom_code: string;
  uom_name: string;
};

type Location = {
  id: number;
  location_name: string;
};

type Props = {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  uoms: Uom[];
  locations: Location[];
  material?: MaterialDetail;
  loading?: boolean;
  onSuccess?: () => void;
};

export function MaterialFormDialog({
  mode,
  open,
  onOpenChange,
  categories,
  uoms,
  locations,
  material,
  loading,
  onSuccess,
}: Props) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    id: "",
    material_name: "",
    category_id: "",
    price: "",
    stock_type: "",
    source_type: "LOCAL",
    uom: "",
    min_order: "",
    max_order: "",
    rack_address: "",
    material_type_descr: "",
    locationIds: [] as number[],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [msdsFile, setMsdsFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (isEdit && material) {
      setForm({
        id: material.id,
        material_name: material.material_name ?? "",
        category_id: material.category_id ?? "",
        price: material.price != null ? String(material.price) : "",
        stock_type: material.stock_type ?? "",
        source_type: material.source_type ?? "LOCAL",
        uom: material.uom ?? "",
        min_order:
          material.min_order != null ? String(material.min_order) : "",
        max_order:
          material.max_order != null ? String(material.max_order) : "",
        rack_address: material.rack_address ?? "",
        material_type_descr: material.material_type_descr ?? "",
        locationIds: material.locations?.map((l) => l.id) ?? [],
      });
      setImagePreview(material.material_image ?? null);
      setImageFile(null);
      setMsdsFile(null);
    }

    if (!isEdit) {
      setForm({
        id: "",
        material_name: "",
        category_id: "",
        price: "",
        stock_type: "",
        source_type: "LOCAL",
        uom: "",
        min_order: "",
        max_order: "",
        rack_address: "",
        material_type_descr: "",
        locationIds: [],
      });
      setImageFile(null);
      setImagePreview(null);
      setMsdsFile(null);
    }
  }, [open, isEdit, material]);

  const updateField = (
    key: keyof typeof form,
    value: string | number | number[],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleLocation = (id: number) => {
    setForm((prev) => {
      const exists = prev.locationIds.includes(id);
      return {
        ...prev,
        locationIds: exists
          ? prev.locationIds.filter((x) => x !== id)
          : [...prev.locationIds, id],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    if (!isEdit && !form.id) {
      alert("Nomor material wajib diisi");
      return;
    }
    if (!form.material_name || !form.category_id || !form.stock_type || !form.uom) {
      alert("Nama, kategori, tipe stok, dan UoM wajib diisi");
      return;
    }
    if (form.locationIds.length === 0) {
      alert("Pilih minimal satu lokasi");
      return;
    }

    try {
      setSaving(true);
      const token = getAuthToken();
      if (!token) {
        alert("Session habis, silakan login ulang.");
        return;
      }

      const fd = new FormData();

      const appendIf = (key: string, val: string | null) => {
        if (val !== null && val !== undefined) fd.append(key, val);
      };

      if (!isEdit) {
        appendIf("id", form.id);
      }

      appendIf("material_name", form.material_name);
      appendIf("category_id", form.category_id);
      appendIf("price", form.price);
      appendIf("stock_type", form.stock_type);
      appendIf("source_type", form.source_type || "LOCAL");
      appendIf("uom", form.uom);
      appendIf("min_order", form.min_order || "0");
      appendIf("max_order", form.max_order || "0");
      appendIf("rack_address", form.rack_address || "");
      appendIf("material_type_descr", form.material_type_descr || "");

      fd.append("locationIds", JSON.stringify(form.locationIds));

      if (imageFile) {
        fd.append("material_image", imageFile);
      }
      if (msdsFile) {
        fd.append("msds_file", msdsFile);
      }

      const url = isEdit
        ? `${API_BASE_URL}/materials/${material?.id}`
        : `${API_BASE_URL}/materials/add`;
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.status === false) {
        console.error("Save material error:", json);
        alert(json?.message || "Gagal menyimpan material.");
        return;
      }

      alert(
        isEdit
          ? "Material berhasil diperbarui."
          : "Material baru berhasil ditambahkan.",
      );

      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan material.");
    } finally {
      setSaving(false);
    }
  };

  const title = isEdit ? "Edit Material" : "New Material";
  const isBusy = saving || (isEdit && loading && !material);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[90vh] max-w-5xl overflow-hidden border border-border/60 bg-background/95 p-0 shadow-2xl",
        )}
      >
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-sm font-semibold tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {isEdit
              ? `Update detail material ${material?.id ?? ""}.`
              : "Registrasi material baru ke warehouse."}
          </DialogDescription>
        </DialogHeader>

        {isBusy ? (
          <div className="flex items-center justify-center py-10 text-xs text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading data…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <ScrollArea className="max-h-[70vh] px-6 py-4">
              {/* section: info material */}
              <div className="mb-4 rounded-lg border bg-muted/40 px-3 py-2 text-[11px] font-medium text-muted-foreground">
                Info Material
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.3fr,1.1fr]">
                {/* LEFT */}
                <div className="space-y-3">
                  {!isEdit && (
                    <div className="space-y-1">
                      <label className="text-xs font-medium">
                        Nomor Material
                      </label>
                      <Input
                        className="h-9 text-xs"
                        value={form.id}
                        onChange={(e) => updateField("id", e.target.value)}
                        placeholder="Contoh: B821000001"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-medium">Nama Material</label>
                    <Input
                      className="h-9 text-xs"
                      value={form.material_name}
                      onChange={(e) =>
                        updateField("material_name", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Kategori</label>
                      <Select
                        value={form.category_id}
                        onValueChange={(val) =>
                          updateField("category_id", val)
                        }
                      >
                        <SelectTrigger className="h-9 text-xs">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.id} – {c.material_type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium">Satuan (UoM)</label>
                      <Select
                        value={form.uom}
                        onValueChange={(val) => updateField("uom", val)}
                      >
                        <SelectTrigger className="h-9 text-xs">
                          <SelectValue placeholder="Pilih UoM" />
                        </SelectTrigger>
                        <SelectContent>
                          {uoms.map((u) => (
                            <SelectItem key={u.id} value={u.uom_code}>
                              {u.uom_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Harga (Rp)</label>
                      <Input
                        type="number"
                        className="h-9 text-xs"
                        value={form.price}
                        onChange={(e) =>
                          updateField("price", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Tipe Stok</label>
                      <Select
                        value={form.stock_type}
                        onValueChange={(val) =>
                          updateField("stock_type", val)
                        }
                      >
                        <SelectTrigger className="h-9 text-xs">
                          <SelectValue placeholder="Pilih tipe stok" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="STOCK">STOCK</SelectItem>
                          <SelectItem value="NON-STOCK">NON-STOCK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium">
                      Deskripsi (opsional)
                    </label>
                    <Textarea
                      className="min-h-[80px] text-xs"
                      value={form.material_type_descr}
                      onChange={(e) =>
                        updateField("material_type_descr", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Lokasi</label>
                    <div className="rounded-md border bg-muted/40">
                      <ScrollArea className="max-h-40 px-3 py-2">
                        {locations.map((loc) => (
                          <label
                            key={loc.id}
                            className="flex items-center gap-2 py-1 text-[11px]"
                          >
                            <Checkbox
                              className="h-3.5 w-3.5"
                              checked={form.locationIds.includes(loc.id)}
                              onCheckedChange={() => toggleLocation(loc.id)}
                            />
                            <span>{loc.location_name}</span>
                          </label>
                        ))}
                      </ScrollArea>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">
                        Minimum Order
                      </label>
                      <Input
                        type="number"
                        className="h-9 text-xs"
                        value={form.min_order}
                        onChange={(e) =>
                          updateField("min_order", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">
                        Maximum Order
                      </label>
                      <Input
                        type="number"
                        className="h-9 text-xs"
                        value={form.max_order}
                        onChange={(e) =>
                          updateField("max_order", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium">
                      Alamat Rak (opsional)
                    </label>
                    <Input
                      className="h-9 text-xs"
                      value={form.rack_address}
                      onChange={(e) =>
                        updateField("rack_address", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">
                        Gambar Material (opsional)
                      </label>
                      <Input
                        type="file"
                        accept="image/*"
                        className="h-8 text-xs"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setImageFile(file);
                          if (file) {
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                      {(imagePreview || material?.material_image) && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="text-[11px] text-muted-foreground">
                            Preview:
                          </div>
                          <img
                            src={imagePreview || material?.material_image || ""}
                            className="h-16 w-16 rounded-md object-cover ring-1 ring-border/60"
                            alt="preview"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium">
                        File MSDS (PDF, opsional)
                      </label>
                      <Input
                        type="file"
                        accept=".pdf"
                        className="h-8 text-xs"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setMsdsFile(file);
                        }}
                      />
                      {/* {isEdit && material?.msds_file && !msdsFile && (
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          File MSDS sudah tersimpan di sistem.
                        </p>
                      )} */}
                      {isEdit && material?.msds_file && !msdsFile && (
                        <div className="mt-2">
                          <a
                            href={material.msds_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded bg-blue-50 px-2 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10 hover:text-primary hover:underline"
                          >
                            <FileText className="h-3 w-3" />
                            Lihat File MSDS Tersimpan
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="flex items-center justify-end gap-2 border-t px-6 py-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => onOpenChange(false)}
                disabled={saving}
              >
                Batal
              </Button>
              <Button
                type="submit"
                size="sm"
                className="text-xs"
                disabled={saving}
              >
                {saving && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                {isEdit ? "Simpan perubahan" : "Simpan"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
