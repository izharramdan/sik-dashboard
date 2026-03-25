// "use client";

// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import {
//   UserPlus,
//   Pencil,
//   Search,
//   Upload,
//   Download,
//   ToggleLeft,
//   ToggleRight,
// } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectItem,
//   SelectContent,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useToast } from "@/components/ui/use-toast";

// const API_URL =
//   process.env.NEXT_PUBLIC_DEV_URL || process.env.NEXT_PUBLIC_API_URL;

// // ========= Types =========

// type LineOption = { value: number; label: string };
// type SimpleOption = { value: number | string; label: string };

// type UserRow = {
//   id: number;
//   noreg: string;
//   fullname: string;
//   email: string;
//   shift: string | null;
//   isactive: boolean;
//   approval1?: string | null;
//   approval2?: string | null;
//   NameApproval1?: string | null;
//   NameApproval2?: string | null;
//   // Relations (optional, keep flexible)
//   lines?: { id: number; drop_point: string; cost_center: string }[];
//   divisions?: { id: number; division_name: string };
//   departments?: { id: number; dept_name: string };
//   sections?: { id: number; section_name: string };
//   userLocation?: { id: number; location_name: string };
//   jabatan?: { id: number; code: string; description: string };
// };

// // Edit payload sesuai controller update
// type EditUserPayload = {
//   noreg: string;
//   fullname: string;
//   email: string;
//   line_id: number | null;
//   div_id: number | null;
//   dept_id: number | null;
//   section_id: number | null;
//   location_id: number | null;
//   shift: string | null;
//   approval1: string | null;
//   approval2: string | null;
//   jabatanId: number | null;
//   role_id: number | null;
// };

// // Add payload sesuai controller add-user
// type AddUserPayload = {
//   noreg: string;
//   fullname: string;
//   email: string;
//   password: string;
//   line_id: number | null;
//   shift: string | null;
//   section_id: number | null;
//   section: string;
//   dept_id: number | null;
//   dept: string;
//   div_id: number | null;
//   div: string;
//   jabatanId: number | null;
//   location: string;
//   roleIds: number[];
//   approval1: string | null;
//   approval2: string | null;
// };

// type OptionsState = {
//   roles: SimpleOption[];
//   lines: LineOption[];
//   departments: SimpleOption[];
//   divisions: SimpleOption[];
//   sections: SimpleOption[];
//   jabatans: SimpleOption[];
//   lineHeads: SimpleOption[];
//   sectionHeads: SimpleOption[];
//   locations: SimpleOption[];
// };

// const defaultOptions: OptionsState = {
//   roles: [],
//   lines: [],
//   departments: [],
//   divisions: [],
//   sections: [],
//   jabatans: [],
//   lineHeads: [],
//   sectionHeads: [],
//   locations: [],
// };

// // helper untuk berbagai bentuk response { result: [] } / { data: [] } / [...]
// const extractApiData = (response: any): any[] => {
//   const data = response?.data;
//   if (Array.isArray(data)) return data;
//   if (data && typeof data === "object") {
//     if (Array.isArray(data.result)) return data.result;
//     const key = Object.keys(data).find((k) => Array.isArray((data as any)[k]));
//     if (key) return (data as any)[key];
//   }
//   return [];
// };

// // ========= Main Page =========

// export function UserManagementPage() {
//   const { toast } = useToast();

//   const [users, setUsers] = useState<UserRow[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [options, setOptions] = useState<OptionsState>(defaultOptions);

//   const [authorityLevel, setAuthorityLevel] = useState<number | null>(null);

//   // Add dialog
//   const [addOpen, setAddOpen] = useState(false);

//   // Edit dialog
//   const [editOpen, setEditOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState<UserRow | null>(null);

//   // Activation AlertDialog
//   const [toggleOpen, setToggleOpen] = useState(false);
//   const [toggleTarget, setToggleTarget] = useState<UserRow | null>(null);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const authStr = window.localStorage.getItem("authority_level");
//     setAuthorityLevel(authStr ? parseInt(authStr, 10) : null);
//   }, []);

//   const token =
//     typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

//   // Fetch users
//   const fetchUsers = async () => {
//     if (!token || !API_URL) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/user/all-user`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = extractApiData(res) as UserRow[];
//       setUsers(data || []);
//     } catch (err: any) {
//       console.error("Error fetching users:", err?.response || err);
//       toast({
//         variant: "destructive",
//         title: "Failed to load users",
//         description:
//           err?.response?.data?.message || "Please try again in a moment.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch dropdown options
//   const fetchOptions = async () => {
//     if (!token || !API_URL) return;
//     try {
//       const headers = { Authorization: `Bearer ${token}` };
//       const endpoints = {
//         roles: `${API_URL}/role`,
//         lines: `${API_URL}/line/get-all`,
//         departments: `${API_URL}/department/all`,
//         divisions: `${API_URL}/division/all`,
//         sections: `${API_URL}/section/all`,
//         jabatans: `${API_URL}/jabatan`,
//         lineHeads: `${API_URL}/user/approval1/line-heads`,
//         sectionHeads: `${API_URL}/user/approval2/section-heads`,
//         locations: `${API_URL}/location/all`,
//       };

//       const [
//         rolesRes,
//         linesRes,
//         deptsRes,
//         divsRes,
//         sectionsRes,
//         jabatansRes,
//         lineHeadsRes,
//         sectionHeadsRes,
//         locationsRes,
//       ] = await Promise.all(
//         Object.values(endpoints).map((ep) => axios.get(ep, { headers }))
//       );

//       setOptions({
//         roles: extractApiData(rolesRes).map((i: any) => ({
//           value: i.id,
//           label: i.role_name,
//         })),
//         lines: extractApiData(linesRes).map((i: any) => ({
//           value: i.id,
//           label: `${i.drop_point} - ${i.cost_center}`,
//         })),
//         departments: extractApiData(deptsRes).map((i: any) => ({
//           value: i.id,
//           label: i.dept_name,
//         })),
//         divisions: extractApiData(divsRes).map((i: any) => ({
//           value: i.id,
//           label: i.division_name,
//         })),
//         sections: extractApiData(sectionsRes).map((i: any) => ({
//           value: i.id,
//           label: i.section_name,
//         })),
//         jabatans: extractApiData(jabatansRes).map((i: any) => ({
//           value: i.id,
//           label: `${i.code} - ${i.description}`,
//         })),
//         lineHeads: extractApiData(lineHeadsRes).map((i: any) => ({
//           value: i.noreg,
//           label: `${i.noreg} - ${i.fullname}`,
//         })),
//         sectionHeads: extractApiData(sectionHeadsRes).map((i: any) => ({
//           value: i.noreg,
//           label: `${i.noreg} - ${i.fullname}`,
//         })),
//         locations: extractApiData(locationsRes).map((i: any) => ({
//           value: i.id,
//           label: i.location_name,
//         })),
//       });
//     } catch (err) {
//       console.error("Failed to load dropdown options:", err);
//       toast({
//         variant: "destructive",
//         title: "Failed to load dropdowns",
//         description: "Please refresh the page.",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchOptions();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [API_URL, token]);

//   const filteredUsers = useMemo(() => {
//     if (!search) return users;
//     const s = search.toLowerCase();
//     return users.filter((u) => {
//       const line = u.lines?.[0];
//       return (
//         u.noreg?.toLowerCase().includes(s) ||
//         u.fullname?.toLowerCase().includes(s) ||
//         u.email?.toLowerCase().includes(s) ||
//         line?.drop_point?.toLowerCase().includes(s) ||
//         line?.cost_center?.toLowerCase().includes(s) ||
//         u.shift?.toLowerCase().includes(s) ||
//         u.sections?.section_name?.toLowerCase().includes(s) ||
//         u.departments?.dept_name?.toLowerCase().includes(s) ||
//         u.divisions?.division_name?.toLowerCase().includes(s) ||
//         u.userLocation?.location_name?.toLowerCase().includes(s)
//       );
//     });
//   }, [search, users]);

//   // Toggle activation (open dialog)
//   const openToggleActivation = (user: UserRow) => {
//     setToggleTarget(user);
//     setToggleOpen(true);
//   };

//   const handleToggleActivation = async () => {
//     if (!toggleTarget || !API_URL || !token) return;
//     try {
//       const newStatus = !toggleTarget.isactive;
//       await axios.patch(
//         `${API_URL}/user/user-activation/${toggleTarget.id}`,
//         { isactive: newStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast({
//         title: "Status updated",
//         description: `User ${
//           toggleTarget.fullname
//         } is now ${newStatus ? "active" : "inactive"}.`,
//       });

//       setUsers((prev) =>
//         prev.map((u) =>
//           u.id === toggleTarget.id ? { ...u, isactive: newStatus } : u
//         )
//       );
//     } catch (err: any) {
//       console.error("Error updating user status:", err?.response || err);
//       toast({
//         variant: "destructive",
//         title: "Failed to update status",
//         description:
//           err?.response?.data?.message || "Please try again in a moment.",
//       });
//     } finally {
//       setToggleOpen(false);
//       setToggleTarget(null);
//     }
//   };

//   // Open edit dialog
//   const openEdit = (user: UserRow) => {
//     setEditingUser(user);
//     setEditOpen(true);
//   };

//   const canManage = authorityLevel === 1 || authorityLevel === 2;

//   return (
//     <>
//       <div className="flex flex-col gap-4">
//         {/* Header */}
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-xl font-semibold text-slate-50">
//               User Management
//             </h1>
//             <p className="text-sm text-slate-400">
//               Manage warehouse console users, roles, and approvals.
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               className="gap-2 text-xs"
//               type="button"
//               onClick={() => {
//                 // TODO: sambungkan API upload excel user kalau sudah ready
//                 toast({
//                   title: "Coming soon",
//                   description:
//                     "Upload Data User via Excel belum dihubungkan ke API.",
//                 });
//               }}
//             >
//               <Upload className="h-3 w-3" />
//               Upload Data User
//             </Button>

//             <Button
//               variant="outline"
//               size="sm"
//               className="gap-2 text-xs"
//               type="button"
//               onClick={() => {
//                 // TODO: sambungkan API download template user kalau sudah ready
//                 toast({
//                   title: "Coming soon",
//                   description:
//                     "Download Template User belum dihubungkan ke API.",
//                 });
//               }}
//             >
//               <Download className="h-3 w-3" />
//               Download Template
//             </Button>

//             {canManage && (
//               <Button
//                 size="sm"
//                 className="gap-2 text-xs"
//                 onClick={() => setAddOpen(true)}
//                 type="button"
//               >
//                 <UserPlus className="h-3 w-3" />
//                 Add User
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Search */}
//         <div className="relative max-w-xs">
//           <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
//           <Input
//             placeholder="Search by Noreg, Name, Email, Cost Center, Line..."
//             className="pl-8 bg-slate-900/60 border-slate-700 text-sm"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Table */}
//         <div className="overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/60 shadow-xl">
//           <ScrollArea className="max-h-[520px]">
//             <table className="min-w-full text-sm">
//               <thead className="bg-slate-900/70 border-b border-slate-800">
//                 <tr className="text-xs uppercase text-slate-400">
//                   <th className="px-3 py-2 text-center">No</th>
//                   <th className="px-3 py-2 text-left">Noreg</th>
//                   <th className="px-3 py-2 text-left">Name</th>
//                   <th className="px-3 py-2 text-left">Email</th>
//                   <th className="px-3 py-2 text-left">Line</th>
//                   <th className="px-3 py-2 text-center">Cost Center</th>
//                   <th className="px-3 py-2 text-center">Shift</th>
//                   <th className="px-3 py-2 text-center">Division</th>
//                   <th className="px-3 py-2 text-center">Dept</th>
//                   <th className="px-3 py-2 text-center">Section</th>
//                   <th className="px-3 py-2 text-center">Location</th>
//                   <th className="px-3 py-2 text-center">Status</th>
//                   {canManage && (
//                     <th className="px-3 py-2 text-center">Actions</th>
//                   )}
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading && (
//                   <tr>
//                     <td
//                       colSpan={canManage ? 13 : 12}
//                       className="px-3 py-6 text-center text-slate-400 text-xs"
//                     >
//                       Loading users...
//                     </td>
//                   </tr>
//                 )}

//                 {!loading && filteredUsers.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={canManage ? 13 : 12}
//                       className="px-3 py-6 text-center text-slate-500 text-xs"
//                     >
//                       No user found.
//                     </td>
//                   </tr>
//                 )}

//                 {!loading &&
//                   filteredUsers.map((user, idx) => {
//                     const line = user.lines?.[0];
//                     return (
//                       <tr
//                         key={user.id}
//                         className="border-b border-slate-900/70 hover:bg-slate-900/60"
//                       >
//                         <td className="px-3 py-2 text-center text-xs text-slate-400">
//                           {idx + 1}
//                         </td>
//                         <td className="px-3 py-2 text-xs font-mono text-slate-100">
//                           {user.noreg}
//                         </td>
//                         <td className="px-3 py-2 text-xs text-slate-100">
//                           <div className="max-w-[180px] truncate">
//                             {user.fullname}
//                           </div>
//                         </td>
//                         <td className="px-3 py-2 text-xs text-slate-300">
//                           <div className="max-w-[220px] truncate">
//                             {user.email}
//                           </div>
//                         </td>
//                         <td className="px-3 py-2 text-xs text-slate-200">
//                           <div className="max-w-[160px] truncate">
//                             {line?.drop_point || "-"}
//                           </div>
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs text-slate-200">
//                           {line?.cost_center || "-"}
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs text-slate-200">
//                           {user.shift || "-"}
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs text-slate-200">
//                           {user.divisions?.division_name || "-"}
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs text-slate-200">
//                           {user.departments?.dept_name || "-"}
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs text-slate-200">
//                           {user.sections?.section_name || "-"}
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs text-slate-200">
//                           {user.userLocation?.location_name || "-"}
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs">
//                           <div className="flex items-center justify-center gap-2">
//                             <Badge
//                               variant={user.isactive ? "secondary" : "outline"}
//                               className={cn(
//                                 "px-2 py-0.5 text-[10px] border",
//                                 user.isactive
//                                   ? "bg-emerald-500/90 hover:bg-emerald-500 text-white border-emerald-600"
//                                   : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/70"
//                               )}
//                             >
//                               {user.isactive ? "Active" : "Inactive"}
//                             </Badge>

//                             {canManage && (
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="h-7 w-7 p-0"
//                                 type="button"
//                                 onClick={() => openToggleActivation(user)}
//                               >
//                                 {user.isactive ? (
//                                   <ToggleRight className="h-4 w-4 text-emerald-400" />
//                                 ) : (
//                                   <ToggleLeft className="h-4 w-4 text-rose-400" />
//                                 )}
//                               </Button>
//                             )}
//                           </div>
//                         </td>

//                         {canManage && (
//                           <td className="px-3 py-2 text-center">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="h-7 px-2 text-[11px] gap-1"
//                               type="button"
//                               onClick={() => openEdit(user)}
//                             >
//                               <Pencil className="h-3 w-3" />
//                               Edit
//                             </Button>
//                           </td>
//                         )}
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </ScrollArea>
//         </div>
//       </div>

//       {/* Add User Dialog */}
//       <AddUserDialog
//         open={addOpen}
//         onOpenChange={setAddOpen}
//         options={options}
//         onCreated={fetchUsers}
//       />

//       {/* Edit User Dialog */}
//       {editingUser && (
//         <EditUserDialog
//           open={editOpen}
//           onOpenChange={setEditOpen}
//           user={editingUser}
//           options={options}
//           onUpdated={fetchUsers}
//         />
//       )}

//       {/* Activation AlertDialog */}
//       <AlertDialog open={toggleOpen} onOpenChange={setToggleOpen}>
//         <AlertDialogContent className="border border-slate-700 bg-slate-950">
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-sm text-slate-50">
//               {toggleTarget?.isactive
//                 ? "Deactivate this user?"
//                 : "Activate this user?"}
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-xs text-slate-400">
//               {toggleTarget
//                 ? `User: ${toggleTarget.fullname} (${toggleTarget.noreg})`
//                 : ""}
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel className="text-xs">
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               className="text-xs bg-emerald-600 hover:bg-emerald-500"
//               onClick={handleToggleActivation}
//             >
//               Yes, Continue
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }

// // ========= Add User Dialog =========

// type AddUserDialogProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   options: OptionsState;
//   onCreated: () => void;
// };

// function AddUserDialog({
//   open,
//   onOpenChange,
//   options,
//   onCreated,
// }: AddUserDialogProps) {
//   const { toast } = useToast();
//   const [submitting, setSubmitting] = useState(false);

//   const [form, setForm] = useState<AddUserPayload>({
//     noreg: "",
//     fullname: "",
//     email: "",
//     password: "",
//     line_id: null,
//     shift: null,
//     section_id: null,
//     section: "",
//     dept_id: null,
//     dept: "",
//     div_id: null,
//     div: "",
//     jabatanId: null,
//     location: "",
//     roleIds: [],
//     approval1: null,
//     approval2: null,
//   });

//   const [confirmPassword, setConfirmPassword] = useState("");

//   useEffect(() => {
//     if (!open) {
//       setForm({
//         noreg: "",
//         fullname: "",
//         email: "",
//         password: "",
//         line_id: null,
//         shift: null,
//         section_id: null,
//         section: "",
//         dept_id: null,
//         dept: "",
//         div_id: null,
//         div: "",
//         jabatanId: null,
//         location: "",
//         roleIds: [],
//         approval1: null,
//         approval2: null,
//       });
//       setConfirmPassword("");
//     }
//   }, [open]);

//   const token =
//     typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

//   const handleChange = (field: keyof AddUserPayload, value: any) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const toggleRole = (roleId: number) => {
//     setForm((prev) => {
//       const exists = prev.roleIds.includes(roleId);
//       return {
//         ...prev,
//         roleIds: exists
//           ? prev.roleIds.filter((id) => id !== roleId)
//           : [...prev.roleIds, roleId],
//       };
//     });
//   };

//   const handleSubmit = async () => {
//     if (!API_URL || !token) return;
//     // simple validation
//     if (!form.noreg || form.noreg.length !== 7) {
//       toast({
//         variant: "destructive",
//         title: "No. Reg invalid",
//         description: "No. Reg harus 7 karakter.",
//       });
//       return;
//     }
//     if (!form.fullname || !form.email || !form.password) {
//       toast({
//         variant: "destructive",
//         title: "Required fields",
//         description: "Nama, Email, dan Password wajib diisi.",
//       });
//       return;
//     }
//     if (form.password.length < 6) {
//       toast({
//         variant: "destructive",
//         title: "Password too short",
//         description: "Password minimal 6 karakter.",
//       });
//       return;
//     }
//     if (form.password !== confirmPassword) {
//       toast({
//         variant: "destructive",
//         title: "Password mismatch",
//         description: "Password dan konfirmasi tidak sama.",
//       });
//       return;
//     }
//     if (!form.roleIds.length) {
//       toast({
//         variant: "destructive",
//         title: "Role required",
//         description: "Pilih minimal satu role.",
//       });
//       return;
//     }
//     if (!form.line_id || !form.div_id || !form.dept_id || !form.section_id) {
//       toast({
//         variant: "destructive",
//         title: "Organizational fields required",
//         description: "Divisi, Departemen, Section, dan Line wajib diisi.",
//       });
//       return;
//     }
//     if (!form.shift) {
//       toast({
//         variant: "destructive",
//         title: "Shift required",
//         description: "Pilih shift user.",
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);
//       await axios.post(`${API_URL}/auth/add-user`, form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast({
//         title: "User created",
//         description: "User baru berhasil ditambahkan.",
//       });
//       onCreated();
//       onOpenChange(false);
//     } catch (err: any) {
//       console.error("Error add user:", err?.response || err);
//       toast({
//         variant: "destructive",
//         title: "Failed to create user",
//         description:
//           err?.response?.data?.message || "Please check the server log.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl border border-slate-700 bg-slate-950">
//         <DialogHeader>
//           <DialogTitle className="text-sm text-slate-50">
//             Add New User
//           </DialogTitle>
//           <DialogDescription className="text-xs text-slate-400">
//             Create new access for 1-SAPs Console. Fields marked * are required.
//           </DialogDescription>
//         </DialogHeader>

//         <ScrollArea className="max-h-[480px] pr-2">
//           <div className="grid gap-4 md:grid-cols-2">
//             {/* Left column */}
//             <div className="space-y-3">
//               <div className="space-y-1">
//                 <Label className="text-xs" htmlFor="noreg">
//                   No. Reg *
//                 </Label>
//                 <Input
//                   id="noreg"
//                   placeholder="e.g. 1234567"
//                   className="h-8 text-xs"
//                   value={form.noreg}
//                   onChange={(e) => handleChange("noreg", e.target.value)}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs" htmlFor="fullname">
//                   Full Name *
//                 </Label>
//                 <Input
//                   id="fullname"
//                   className="h-8 text-xs"
//                   value={form.fullname}
//                   onChange={(e) => handleChange("fullname", e.target.value)}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs" htmlFor="email">
//                   Email *
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   className="h-8 text-xs"
//                   value={form.email}
//                   onChange={(e) => handleChange("email", e.target.value)}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs" htmlFor="password">
//                   Password *
//                 </Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   className="h-8 text-xs"
//                   value={form.password}
//                   onChange={(e) => handleChange("password", e.target.value)}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs" htmlFor="confirmPassword">
//                   Confirm Password *
//                 </Label>
//                 <Input
//                   id="confirmPassword"
//                   type="password"
//                   className="h-8 text-xs"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs" htmlFor="location">
//                   Location (text, opsional / sementara){" "}
//                 </Label>
//                 <Input
//                   id="location"
//                   className="h-8 text-xs"
//                   placeholder="Free text, disesuaikan dengan backend"
//                   value={form.location}
//                   onChange={(e) => handleChange("location", e.target.value)}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Approval 1 (Line Head, optional)</Label>
//                 <Select
//                   value={form.approval1 || ""}
//                   onValueChange={(v) =>
//                     handleChange("approval1", v ? v : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Line Head" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     <SelectItem value="">None</SelectItem>
//                     {options.lineHeads.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">
//                   Approval 2 (Section Head, optional)
//                 </Label>
//                 <Select
//                   value={form.approval2 || ""}
//                   onValueChange={(v) =>
//                     handleChange("approval2", v ? v : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Section Head" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     <SelectItem value="">None</SelectItem>
//                     {options.sectionHeads.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Right column */}
//             <div className="space-y-3">
//               <div className="space-y-1">
//                 <Label className="text-xs">Roles *</Label>
//                 <div className="rounded-md border border-slate-800 bg-slate-950/60 px-3 py-2 max-h-[140px] overflow-y-auto space-y-1.5">
//                   {options.roles.map((role) => {
//                     const checked = form.roleIds.includes(role.value as number);
//                     return (
//                       <label
//                         key={role.value}
//                         className="flex items-center gap-2 text-[11px] text-slate-100"
//                       >
//                         <Checkbox
//                           checked={checked}
//                           onCheckedChange={() =>
//                             toggleRole(role.value as number)
//                           }
//                           className="h-3 w-3"
//                         />
//                         <span>{role.label}</span>
//                       </label>
//                     );
//                   })}
//                   {options.roles.length === 0 && (
//                     <p className="text-[11px] text-slate-500">
//                       No roles loaded.
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Jabatan (optional)</Label>
//                 <Select
//                   value={form.jabatanId ? String(form.jabatanId) : ""}
//                   onValueChange={(v) =>
//                     handleChange("jabatanId", v ? Number(v) : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Jabatan" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     <SelectItem value="">None</SelectItem>
//                     {options.jabatans.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Division *</Label>
//                 <Select
//                   value={form.div_id ? String(form.div_id) : ""}
//                   onValueChange={(v) => {
//                     const id = v ? Number(v) : null;
//                     const opt = options.divisions.find(
//                       (o) => String(o.value) === v
//                     );
//                     handleChange("div_id", id);
//                     handleChange("div", opt?.label || "");
//                   }}
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Division" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     {options.divisions.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Department *</Label>
//                 <Select
//                   value={form.dept_id ? String(form.dept_id) : ""}
//                   onValueChange={(v) => {
//                     const id = v ? Number(v) : null;
//                     const opt = options.departments.find(
//                       (o) => String(o.value) === v
//                     );
//                     handleChange("dept_id", id);
//                     handleChange("dept", opt?.label || "");
//                   }}
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Department" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     {options.departments.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Section *</Label>
//                 <Select
//                   value={form.section_id ? String(form.section_id) : ""}
//                   onValueChange={(v) => {
//                     const id = v ? Number(v) : null;
//                     const opt = options.sections.find(
//                       (o) => String(o.value) === v
//                     );
//                     handleChange("section_id", id);
//                     handleChange("section", opt?.label || "");
//                   }}
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Section" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     {options.sections.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Line *</Label>
//                 <Select
//                   value={form.line_id ? String(form.line_id) : ""}
//                   onValueChange={(v) =>
//                     handleChange("line_id", v ? Number(v) : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Line" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     {options.lines.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Shift *</Label>
//                 <Select
//                   value={form.shift || ""}
//                   onValueChange={(v) => handleChange("shift", v || null)}
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Shift" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     <SelectItem value="RED">RED</SelectItem>
//                     <SelectItem value="WHITE">WHITE</SelectItem>
//                     <SelectItem value="NON-SHIFT">NON-SHIFT</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>
//         </ScrollArea>

//         <DialogFooter className="mt-4">
//           <Button
//             variant="outline"
//             size="sm"
//             type="button"
//             className="text-xs"
//             onClick={() => onOpenChange(false)}
//           >
//             Cancel
//           </Button>
//           <Button
//             size="sm"
//             className="text-xs"
//             disabled={submitting}
//             type="button"
//             onClick={handleSubmit}
//           >
//             {submitting ? "Saving..." : "Save User"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// // ========= Edit User Dialog =========

// type EditUserDialogProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   user: UserRow;
//   options: OptionsState;
//   onUpdated: () => void;
// };

// function EditUserDialog({
//   open,
//   onOpenChange,
//   user,
//   options,
//   onUpdated,
// }: EditUserDialogProps) {
//   const { toast } = useToast();
//   const [submitting, setSubmitting] = useState(false);

//   const initialLineId = user.lines?.[0]?.id ?? null;

//   // untuk role_id, di /user/all-user mungkin belum lengkap,
//   // jadi default null (silakan lengkapi jika backend sudah kirim role-id)
//   const [form, setForm] = useState<EditUserPayload>({
//     noreg: user.noreg,
//     fullname: user.fullname,
//     email: user.email,
//     line_id: initialLineId,
//     div_id: user.divisions?.id ?? null,
//     dept_id: user.departments?.id ?? null,
//     section_id: user.sections?.id ?? null,
//     location_id: user.userLocation?.id ?? null,
//     shift: user.shift ?? null,
//     approval1: user.approval1 ?? null,
//     approval2: user.approval2 ?? null,
//     jabatanId: user.jabatan?.id ?? null,
//     role_id: null,
//   });

//   useEffect(() => {
//     if (!open) return;
//     setForm({
//       noreg: user.noreg,
//       fullname: user.fullname,
//       email: user.email,
//       line_id: user.lines?.[0]?.id ?? null,
//       div_id: user.divisions?.id ?? null,
//       dept_id: user.departments?.id ?? null,
//       section_id: user.sections?.id ?? null,
//       location_id: user.userLocation?.id ?? null,
//       shift: user.shift ?? null,
//       approval1: user.approval1 ?? null,
//       approval2: user.approval2 ?? null,
//       jabatanId: user.jabatan?.id ?? null,
//       role_id: null,
//     });
//   }, [open, user]);

//   const token =
//     typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

//   const handleChange = (field: keyof EditUserPayload, value: any) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!API_URL || !token) return;
//     if (!form.fullname || !form.email) {
//       toast({
//         variant: "destructive",
//         title: "Required fields",
//         description: "Nama dan email wajib diisi.",
//       });
//       return;
//     }
//     if (!form.line_id || !form.div_id || !form.dept_id || !form.section_id) {
//       toast({
//         variant: "destructive",
//         title: "Organizational fields required",
//         description: "Divisi, Departemen, Section, dan Line wajib diisi.",
//       });
//       return;
//     }
//     if (!form.shift) {
//       toast({
//         variant: "destructive",
//         title: "Shift required",
//         description: "Pilih shift user.",
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);
//       await axios.patch(`${API_URL}/user/update/${user.id}`, form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast({
//         title: "User updated",
//         description: "Data user berhasil diperbarui.",
//       });
//       onUpdated();
//       onOpenChange(false);
//     } catch (err: any) {
//       console.error("Error updating user:", err?.response || err);
//       toast({
//         variant: "destructive",
//         title: "Failed to update user",
//         description:
//           err?.response?.data?.message || "Please check the server log.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl border border-slate-700 bg-slate-950">
//         <DialogHeader>
//           <DialogTitle className="text-sm text-slate-50">
//             Edit User – {user.fullname}
//           </DialogTitle>
//           <DialogDescription className="text-xs text-slate-400">
//             Adjust user profile, organization, and approvals.
//           </DialogDescription>
//         </DialogHeader>

//         <ScrollArea className="max-h-[460px] pr-2">
//           <div className="grid gap-4 md:grid-cols-2">
//             {/* Left */}
//             <div className="space-y-3">
//               <div className="space-y-1">
//                 <Label className="text-xs">No. Reg</Label>
//                 <Input
//                   disabled
//                   className="h-8 text-xs bg-slate-900/60 border-slate-700"
//                   value={form.noreg}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Full Name</Label>
//                 <Input
//                   className="h-8 text-xs"
//                   value={form.fullname}
//                   onChange={(e) => handleChange("fullname", e.target.value)}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Email</Label>
//                 <Input
//                   type="email"
//                   className="h-8 text-xs"
//                   value={form.email}
//                   onChange={(e) => handleChange("email", e.target.value)}
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Role (single)</Label>
//                 <Select
//                   value={form.role_id ? String(form.role_id) : ""}
//                   onValueChange={(v) =>
//                     handleChange("role_id", v ? Number(v) : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Role" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     <SelectItem value="">None</SelectItem>
//                     {options.roles.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Approval 1 (Line Head)</Label>
//                 <Select
//                   value={form.approval1 || ""}
//                   onValueChange={(v) =>
//                     handleChange("approval1", v ? v : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Line Head" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     <SelectItem value="">None</SelectItem>
//                     {options.lineHeads.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">
//                   Approval 2 (Section Head)
//                 </Label>
//                 <Select
//                   value={form.approval2 || ""}
//                   onValueChange={(v) =>
//                     handleChange("approval2", v ? v : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Section Head" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     <SelectItem value="">None</SelectItem>
//                     {options.sectionHeads.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Right */}
//             <div className="space-y-3">
//               <div className="space-y-1">
//                 <Label className="text-xs">Jabatan</Label>
//                 <Select
//                   value={form.jabatanId ? String(form.jabatanId) : ""}
//                   onValueChange={(v) =>
//                     handleChange("jabatanId", v ? Number(v) : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Jabatan" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     <SelectItem value="">None</SelectItem>
//                     {options.jabatans.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Division</Label>
//                 <Select
//                   value={form.div_id ? String(form.div_id) : ""}
//                   onValueChange={(v) =>
//                     handleChange("div_id", v ? Number(v) : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Division" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     {options.divisions.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Department</Label>
//                 <Select
//                   value={form.dept_id ? String(form.dept_id) : ""}
//                   onValueChange={(v) =>
//                     handleChange("dept_id", v ? Number(v) : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Department" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     {options.departments.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Section</Label>
//                 <Select
//                   value={form.section_id ? String(form.section_id) : ""}
//                   onValueChange={(v) =>
//                     handleChange("section_id", v ? Number(v) : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Section" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     {options.sections.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Line</Label>
//                 <Select
//                   value={form.line_id ? String(form.line_id) : ""}
//                   onValueChange={(v) =>
//                     handleChange("line_id", v ? Number(v) : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Line" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     {options.lines.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Location</Label>
//                 <Select
//                   value={form.location_id ? String(form.location_id) : ""}
//                   onValueChange={(v) =>
//                     handleChange("location_id", v ? Number(v) : null)
//                   }
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Location" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     {options.locations.map((o) => (
//                       <SelectItem key={o.value} value={String(o.value)}>
//                         {o.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-1">
//                 <Label className="text-xs">Shift</Label>
//                 <Select
//                   value={form.shift || ""}
//                   onValueChange={(v) => handleChange("shift", v || null)}
//                 >
//                   <SelectTrigger className="h-8 text-xs bg-slate-900 border-slate-700">
//                     <SelectValue placeholder="Select Shift" />
//                   </SelectTrigger>
//                   <SelectContent className="text-xs bg-slate-950 border-slate-800">
//                     <SelectItem value="RED">RED</SelectItem>
//                     <SelectItem value="WHITE">WHITE</SelectItem>
//                     <SelectItem value="NON-SHIFT">NON-SHIFT</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>
//         </ScrollArea>

//         <DialogFooter className="mt-4">
//           <Button
//             variant="outline"
//             size="sm"
//             type="button"
//             className="text-xs"
//             onClick={() => onOpenChange(false)}
//           >
//             Cancel
//           </Button>
//           <Button
//             size="sm"
//             className="text-xs"
//             disabled={submitting}
//             type="button"
//             onClick={handleSubmit}
//           >
//             {submitting ? "Saving..." : "Save Changes"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
