"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, getAuthToken } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Trash2, Upload } from "lucide-react";

type GalleryItem = {
  id: number;
  image: string; // S3 key / filename
  url: string; // pre-signed URL
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  materialId: string;
};

export function MaterialGalleryDialog({
  open,
  onOpenChange,
  materialId,
}: Props) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [deleted, setDeleted] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadGallery = async () => {
    const token = getAuthToken();
    if (!token || !materialId) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/materials/${materialId}/gallery`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setItems(json.result ?? []);
    } catch (err) {
      console.error("Failed to load gallery", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setNewFiles([]);
      setDeleted([]);
      loadGallery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, materialId]);

  const toggleDelete = (imageName: string) => {
    setDeleted((prev) =>
      prev.includes(imageName)
        ? prev.filter((i) => i !== imageName)
        : [...prev, imageName],
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleRemoveNew = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const token = getAuthToken();
    if (!token || !materialId) return;

    if (newFiles.length === 0 && deleted.length === 0) {
      onOpenChange(false);
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    newFiles.forEach((file) => {
      formData.append("images", file);
    });
    if (deleted.length > 0) {
      formData.append("deleted_images", JSON.stringify(deleted));
    }

    const res = await fetch(
      `${API_BASE_URL}/materials/${materialId}/gallery`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );

    if (!res.ok) {
      const msg = await res.text();
      console.error("Failed to save gallery", msg);
      alert(msg || "Gagal menyimpan galeri");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b px-5 py-3">
          <DialogTitle className="text-sm font-semibold">
            Material Gallery – {materialId}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] px-5 py-4">
          {/* Existing images */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-foreground">
              Current images
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-6 text-xs text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading gallery…
              </div>
            ) : items.length === 0 ? (
              <p className="text-[11px] text-muted-foreground">
                No images in gallery.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {items.map((img) => {
                  const marked = deleted.includes(img.image);
                  return (
                    <div
                      key={img.id}
                      className="group relative overflow-hidden rounded-xl border bg-muted/40"
                    >
                      <img
                        src={img.url}
                        alt={img.image}
                        className="h-32 w-full object-cover transition group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => toggleDelete(img.image)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-red-500 shadow-sm"
                        title="Mark for delete"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                      {marked && (
                        <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* New files */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-foreground">
                Add new images
              </div>
              <label className="inline-flex cursor-pointer items-center gap-1 rounded-md border bg-background px-2 py-1 text-[11px] text-foreground">
                <Upload className="h-3 w-3" />
                <span>Choose files</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {newFiles.length === 0 ? (
              <p className="text-[11px] text-muted-foreground">
                No new files selected.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {newFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-xl border bg-muted/40"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-32 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNew(idx)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-red-500 shadow-sm"
                      title="Remove"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1 text-[10px] text-white line-clamp-1">
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 border-t px-5 py-3">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting && (
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            )}
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
