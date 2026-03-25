"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, getAuthToken } from "@/lib/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

type Line = { id: number; drop_point: string; cost_center: string };
type Division = { id: number; division_name: string };
type Department = { id: number; dept_name: string };
type Section = { id: number; section_name: string };
type Location = { id: number; location_name: string };
type Jabatan = { id: number; code: string; description: string };
type Role = { id: number; role_name: string };

type UserRow = {
  id: number;
  noreg: string;
  fullname: string;
  email: string;
  shift: string | null;
  isactive: boolean;
  lines?: Line[];
  divisions?: Division | null;
  departments?: Department | null;
  sections?: Section | null;
  userLocation?: Location | null;
  jabatan?: Jabatan | null;
  approval1?: string | null;
  approval2?: string | null;
};

type UserFormDialogProps = {
  mode: "create" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserRow | null;
  onSuccess: () => void;
};

type OptionUser = { noreg: string; fullname: string };

export function UserFormDialog({
  mode,
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserFormDialogProps) {
  const isEdit = mode === "edit";

  const [loadingMasters, setLoadingMasters] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [roles, setRoles] = useState<Role[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [jabatans, setJabatans] = useState<Jabatan[]>([]);
  const [lineHeads, setLineHeads] = useState<OptionUser[]>([]);
  const [sectionHeads, setSectionHeads] = useState<OptionUser[]>([]);

  // Form state
  const [noreg, setNoreg] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [roleId, setRoleId] = useState<string>("");
  const [jabatanId, setJabatanId] = useState<string>("");

  const [divId, setDivId] = useState<string>("");
  const [deptId, setDeptId] = useState<string>("");
  const [sectionId, setSectionId] = useState<string>("");
  const [lineId, setLineId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [shift, setShift] = useState<string>("");

  const [approval1, setApproval1] = useState<string>("");
  const [approval2, setApproval2] = useState<string>("");

  // ===== LOAD MASTERS =====
  const loadMasters = async () => {
    const token = getAuthToken();
    if (!token) return;
    setLoadingMasters(true);

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [
        rolesRes,
        linesRes,
        divsRes,
        deptsRes,
        sectionsRes,
        locsRes,
        jabatansRes,
        lineHeadsRes,
        sectionHeadsRes,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/role`, { headers }),
        fetch(`${API_BASE_URL}/line/get-all`, { headers }),
        fetch(`${API_BASE_URL}/division/all`, { headers }),
        fetch(`${API_BASE_URL}/department/all`, { headers }),
        fetch(`${API_BASE_URL}/section/all`, { headers }),
        fetch(`${API_BASE_URL}/location/all`, { headers }),
        fetch(`${API_BASE_URL}/jabatan`, { headers }),
        fetch(`${API_BASE_URL}/user/approval1/line-heads`, { headers }),
        fetch(`${API_BASE_URL}/user/approval2/section-heads`, { headers }),
      ]);

      const [
        rolesJson,
        linesJson,
        divsJson,
        deptsJson,
        sectionsJson,
        locsJson,
        jabatansJson,
        lineHeadsJson,
        sectionHeadsJson,
      ] = await Promise.all([
        rolesRes.json(),
        linesRes.json(),
        divsRes.json(),
        deptsRes.json(),
        sectionsRes.json(),
        locsRes.json(),
        jabatansRes.json(),
        lineHeadsRes.json(),
        sectionHeadsRes.json(),
      ]);

      setRoles(rolesJson.result ?? rolesJson.data ?? rolesJson);
      setLines(linesJson.lines ?? linesJson.result ?? []);
      setDivisions(divsJson.result ?? []);
      setDepartments(deptsJson.result ?? []);
      setSections(sectionsJson.result ?? []);
      setLocations(locsJson.result ?? []);
      setJabatans(jabatansJson.result ?? []);

      setLineHeads(lineHeadsJson.result ?? []);
      setSectionHeads(sectionHeadsJson.result ?? []);
    } catch (err) {
      console.error("Failed to load masters", err);
      toast.error("Failed to load dropdown master data.");
    } finally {
      setLoadingMasters(false);
    }
  };

  // Reset form tiap open / user berubah
  useEffect(() => {
    if (!open) return;

    loadMasters();

    if (isEdit && user) {
      setNoreg(user.noreg);
      setFullname(user.fullname);
      setEmail(user.email);

      setPassword("");
      setConfirmPassword("");

      // pastikan roleId diisi, kalau multi-role di backend pakai role pertama
      setRoleId(""); // kalau mau ambil dari relasi, bisa update nanti

      setJabatanId(user.jabatan?.id ? String(user.jabatan.id) : "");

      setDivId(user.divisions?.id ? String(user.divisions.id) : "");
      setDeptId(user.departments?.id ? String(user.departments.id) : "");
      setSectionId(user.sections?.id ? String(user.sections.id) : "");
      setLineId(user.lines?.[0]?.id ? String(user.lines[0].id) : "");
      setLocationId(
        user.userLocation?.id ? String(user.userLocation.id) : ""
      );
      setShift(user.shift ?? "");

      setApproval1(user.approval1 ?? "");
      setApproval2(user.approval2 ?? "");
    } else {
      // create mode
      setNoreg("");
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setRoleId("");
      setJabatanId("");
      setDivId("");
      setDeptId("");
      setSectionId("");
      setLineId("");
      setLocationId("");
      setShift("");
      setApproval1("");
      setApproval2("");
    }
  }, [open, isEdit, user]);

  const handleSubmit = async () => {
    const token = getAuthToken();
    if (!token) return;

    // validation quick
    if (!noreg || noreg.length !== 7) {
      toast.error("No.Reg harus 7 karakter.");
      return;
    }
    if (!fullname) {
      toast.error("Fullname wajib diisi.");
      return;
    }
    if (!email) {
      toast.error("Email wajib diisi.");
      return;
    }
    if (!roleId) {
      toast.error("Role wajib dipilih.");
      return;
    }
    if (!divId || !deptId || !sectionId) {
      toast.error("Division, Department, dan Section wajib diisi.");
      return;
    }
    if (!lineId) {
      toast.error("Line wajib diisi.");
      return;
    }
    if (!shift) {
      toast.error("Shift wajib diisi.");
      return;
    }
    if (!locationId && isEdit) {
      // kalau backend wajib location di edit
      toast.error("Location wajib diisi.");
      return;
    }

    if (!isEdit) {
      // create: cek password
      if (!password || password.length < 6) {
        toast.error("Password minimal 6 karakter.");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Konfirmasi password tidak sama.");
        return;
      }
    }

    const payload: any = {
      noreg,
      fullname,
      email,
      line_id: lineId ? Number(lineId) : null,
      div_id: divId ? Number(divId) : null,
      dept_id: deptId ? Number(deptId) : null,
      section_id: sectionId ? Number(sectionId) : null,
      location_id: locationId ? Number(locationId) : null,
      shift: shift || null,
      jabatanId: jabatanId ? Number(jabatanId) : null,
      approval1: approval1 || null,
      approval2: approval2 || null,
      roleIds: [Number(roleId)], // backend tetap dapat array roleIds
    };

    if (!isEdit) {
      payload.password = password;
      payload.confirmPassword = confirmPassword;
    }

    setSubmitting(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let res: Response;
      if (isEdit && user) {
        res = await fetch(`${API_BASE_URL}/user/update/${user.id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/auth/add-user`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.message || "Failed to save user.");
      }

      toast.success(
        isEdit ? "User updated successfully." : "User created successfully."
      );
      onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to save user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-sm">
            {isEdit ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogDescription className="text-[11px]">
            {isEdit
              ? "Update user mapping line, division, department, section, and location."
              : "Create a new user with roles and mapping configuration."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-6 pb-4 pt-3 max-h-[70vh]">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Left column */}
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-[11px]">No.Reg</Label>
                <Input
                  value={noreg}
                  onChange={(e) => setNoreg(e.target.value)}
                  disabled={isEdit}
                  className="h-8 text-xs"
                  placeholder="7 characters"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">Fullname</Label>
                <Input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>

              {!isEdit && (
                <>
                  <div className="space-y-1">
                    <Label className="text-[11px]">Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px]">
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                  </div>
                </>
              )}

              <div className="space-y-1">
                <Label className="text-[11px]">
                  Approval 1 (Line Head, optional)
                </Label>
                <Select
                  value={approval1 || ""}
                  onValueChange={(val) => setApproval1(val || "")}
                  disabled={loadingMasters}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Line Head" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">- None -</SelectItem>
                    {lineHeads.map((lh) => (
                      <SelectItem key={lh.noreg} value={lh.noreg}>
                        {lh.noreg} - {lh.fullname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">
                  Approval 2 (Section Head, optional)
                </Label>
                <Select
                  value={approval2 || ""}
                  onValueChange={(val) => setApproval2(val || "")}
                  disabled={loadingMasters}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Section Head" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">- None -</SelectItem>
                    {sectionHeads.map((sh) => (
                      <SelectItem key={sh.noreg} value={sh.noreg}>
                        {sh.noreg} - {sh.fullname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-[11px]">Role</Label>
                <Select
                  value={roleId}
                  onValueChange={(val) => setRoleId(val)}
                  disabled={loadingMasters}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.id} value={String(r.id)}>
                        {r.role_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">
                  Jabatan (optional)
                </Label>
                <Select
                  value={jabatanId}
                  onValueChange={(val) => setJabatanId(val)}
                  disabled={loadingMasters}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">- None -</SelectItem>
                    {jabatans.map((j) => (
                      <SelectItem key={j.id} value={String(j.id)}>
                        {j.code} - {j.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">Division</Label>
                <Select
                  value={divId}
                  onValueChange={(val) => setDivId(val)}
                  disabled={loadingMasters}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((d) => (
                      <SelectItem key={d.id} value={String(d.id)}>
                        {d.division_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">Department</Label>
                <Select
                  value={deptId}
                  onValueChange={(val) => setDeptId(val)}
                  disabled={loadingMasters}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d.id} value={String(d.id)}>
                        {d.dept_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">Section</Label>
                <Select
                  value={sectionId}
                  onValueChange={(val) => setSectionId(val)}
                  disabled={loadingMasters}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.section_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">Line</Label>
                <Select
                  value={lineId}
                  onValueChange={(val) => setLineId(val)}
                  disabled={loadingMasters}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Line" />
                  </SelectTrigger>
                  <SelectContent>
                    {lines.map((l) => (
                      <SelectItem key={l.id} value={String(l.id)}>
                        {l.drop_point} - {l.cost_center}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]">Location</Label>
                <Select
                  value={locationId}
                  onValueChange={(val) => setLocationId(val)}
                  disabled={loadingMasters}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={String(loc.id)}>
                        {loc.location_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px]>">Shift</Label>
                <Select
                  value={shift}
                  onValueChange={(val) => setShift(val)}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select Shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RED">RED</SelectItem>
                    <SelectItem value="WHITE">WHITE</SelectItem>
                    <SelectItem value="NON-SHIFT">
                      NON-SHIFT
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 border-t px-6 py-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={submitting || loadingMasters}
          >
            {submitting ? (
              <span className="inline-flex items-center gap-1 text-xs">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
