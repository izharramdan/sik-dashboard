// components/gi/edit-detail-dialog.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type TransactionDetail = {
  material_id: string;
  material_name?: string;
  no_gic_or_wbs: string | null;
  // property lain tetap ikut, biar gak hilang saat di-spread
  [key: string]: any;
};

type EditDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: TransactionDetail | null;
  onSave: (updated: TransactionDetail) => void;
};

export function EditDetailDialog({
  open,
  onOpenChange,
  detail,
  onSave,
}: EditDetailDialogProps) {
  const [noGicOrWbs, setNoGicOrWbs] = useState("");

  useEffect(() => {
    if (detail) {
      setNoGicOrWbs(detail.no_gic_or_wbs ?? "");
    } else {
      setNoGicOrWbs("");
    }
  }, [detail]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!detail) return;

    const updated: TransactionDetail = {
      ...detail,
      no_gic_or_wbs: noGicOrWbs || null,
    };

    onSave(updated);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm gap-4">
        <DialogHeader>
          <DialogTitle className="text-sm">
            Edit No GIC / WBS
          </DialogTitle>
          {detail && (
            <DialogDescription className="text-xs">
              {detail.material_name && (
                <>
                  Material:{" "}
                  <span className="font-semibold text-foreground">
                    {detail.material_name}
                  </span>
                  <br />
                </>
              )}
              ID:{" "}
              <span className="font-mono text-foreground">
                {detail.material_id}
              </span>
            </DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <Label htmlFor="no-gic-wbs" className="text-[11px]">
              No GIC / WBS
            </Label>
            <Input
              id="no-gic-wbs"
              className="h-8 text-xs"
              placeholder="Masukkan No GIC atau WBS"
              value={noGicOrWbs}
              onChange={(e) => setNoGicOrWbs(e.target.value)}
            />
            {/* <p className="text-[10px] text-muted-foreground">
              Boleh dikosongkan jika tidak menggunakan GIC / WBS.
            </p> */}
          </div>

          <DialogFooter className="mt-2 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-[11px]"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-8 text-[11px]"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
