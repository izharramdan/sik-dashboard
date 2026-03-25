
"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthToken } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload, X, Clock, CalendarDays, Megaphone, Settings2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function AnnouncementFormDialog({ open, onOpenChange, onSuccess, initialData }: any) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setIsActive(initialData.is_active);
        setPreview(initialData.image_url || "");
        setSelectedDays(initialData.active_days ? initialData.active_days.split(",") : []);
      } else {
        setIsActive(true);
        setPreview("");
        setSelectedDays([]);
      }
    }
  }, [open, initialData]);

  const toggleDay = (day: string) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getAuthToken();
    const formData = new FormData(e.currentTarget);
    if (imageFile) formData.append("image", imageFile);
    formData.set("is_active", String(isActive));
    formData.set("active_days", selectedDays.join(","));

    setLoading(true);
    try {
      const url = initialData ? `${API_BASE_URL}/announcements/${initialData.id}` : `${API_BASE_URL}/announcements/add`;
      const res = await fetch(url, {
        method: initialData ? "PATCH" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) { onSuccess(); onOpenChange(false); }
    } catch (err) { alert("Terjadi kesalahan koneksi"); } finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-y-auto max-h-[95vh] rounded-[2.5rem] p-0 border-none">
        <form onSubmit={handleSubmit} className="flex flex-col">
          
          {/* HEADER */}
          <div className="p-8 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-sky-500/10 rounded-2xl flex items-center justify-center border border-sky-500/20">
                <Megaphone className="h-6 w-6 text-sky-400" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  {initialData ? "Update Announcement" : "Create Announcement"}
                </DialogTitle>
                <p className="text-slate-500 text-sm mt-0.5">Define your banner content and display rules.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <div className={cn("h-2 w-2 rounded-full animate-pulse", isActive ? "bg-emerald-500" : "bg-slate-600")} />
                <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">{isActive ? "Status: Live" : "Status: Draft"}</span>
            </div>
          </div>

          <div className="p-8 space-y-10">
            {/* SECTION 1: CONTENT */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-400">
                <Sparkles className="h-4 w-4 text-sky-400" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Main Content</h4>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="relative group aspect-[21/9] rounded-[2rem] border-2 border-dashed border-slate-800 bg-slate-900/30 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-sky-500/40 hover:bg-slate-900/50">
                  {preview ? (
                    <>
                      <img src={preview} className="h-full w-full object-cover" />
                      <button type="button" onClick={() => { setPreview(""); setImageFile(null); }} className="absolute top-4 right-4 p-2 bg-red-500 rounded-full hover:bg-red-600 shadow-xl transition-all">
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-10 w-10 text-slate-700 mx-auto mb-3" />
                      <p className="text-sm text-slate-500">Drop banner image here (Max 5MB)</p>
                    </div>
                  )}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) { setImageFile(file); setPreview(URL.createObjectURL(file)); }
                  }} />
                </div>

                <div className="space-y-4">
                  <Input name="title" defaultValue={initialData?.title} placeholder="Announcement Title (e.g. Ramadhan Big Sale)" className="bg-slate-900/50 border-slate-800 h-14 px-6 rounded-2xl text-lg font-medium focus:ring-sky-500/20" />
                  <Textarea name="message" defaultValue={initialData?.message} placeholder="Write your message details here..." className="bg-slate-900/50 border-slate-800 min-h-[120px] rounded-[2rem] p-6 resize-none focus:ring-sky-500/20" />
                </div>
              </div>
            </div>

            {/* SECTION 2: VISIBILITY LOGIC (SEKARANG LEGA KE BAWAH) */}
            <div className="space-y-6 p-8 rounded-[2.5rem] bg-slate-900/30 border border-slate-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Settings2 className="h-4 w-4 text-sky-400" />
                  <h4 className="text-sm font-bold uppercase tracking-widest">Visibility Logic</h4>
                </div>
                <div className="flex items-center gap-3 bg-slate-950 p-2 px-4 rounded-xl border border-slate-800">
                   <Checkbox id="is_active" checked={isActive} onCheckedChange={(checked) => setIsActive(!!checked)} className="data-[state=checked]:bg-sky-500 border-slate-700" />
                   <label htmlFor="is_active" className="text-xs font-bold text-slate-400 cursor-pointer">Set as Active</label>
                </div>
              </div>

              <div className="flex flex-col gap-10">
  {/* Row 1: Campaign Duration (Full Width) */}
  <div className="space-y-4">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
      <CalendarDays className="h-4 w-4 text-sky-500/50" /> Campaign Duration
    </label>
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="flex-1 w-full space-y-2">
        <span className="text-[10px] text-slate-600 font-bold uppercase ml-1">Starts From</span>
        <Input 
          name="start_date" 
          type="date" 
          defaultValue={initialData?.start_date?.split('T')[0]} 
          className="bg-slate-950 border-slate-800 h-14 rounded-2xl px-6 w-full focus:ring-sky-500/20 [color-scheme:dark]" 
        />
      </div>
      <div className="hidden sm:block pb-4">
        <div className="h-0.5 w-6 bg-slate-800 rounded-full" />
      </div>
      <div className="flex-1 w-full space-y-2">
        <span className="text-[10px] text-slate-600 font-bold uppercase ml-1">Ends At</span>
        <Input 
          name="end_date" 
          type="date" 
          defaultValue={initialData?.end_date?.split('T')[0]} 
          className="bg-slate-950 border-slate-800 h-14 rounded-2xl px-6 w-full focus:ring-sky-500/20 [color-scheme:dark]" 
        />
      </div>
    </div>
  </div>

      {/* Row 2: Operational Hours (Full Width) */}
      <div className="space-y-4">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
          <Clock className="h-4 w-4 text-sky-500/50" /> Operational Hours
        </label>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
            <span className="text-[10px] text-slate-600 font-bold uppercase ml-1">Show Time</span>
            <Input 
              name="start_time" 
              type="time" 
              step="1" 
              defaultValue={initialData?.start_time} 
              className="bg-slate-950 border-slate-800 h-14 rounded-2xl px-6 w-full focus:ring-sky-500/20 [color-scheme:dark]" 
            />
          </div>
          <div className="hidden sm:block pb-4">
            <div className="h-0.5 w-6 bg-slate-800 rounded-full" />
          </div>
          <div className="flex-1 w-full space-y-2">
            <span className="text-[10px] text-slate-600 font-bold uppercase ml-1">Hide Time</span>
            <Input 
              name="end_time" 
              type="time" 
              step="1" 
              defaultValue={initialData?.end_time} 
              className="bg-slate-950 border-slate-800 h-14 rounded-2xl px-6 w-full focus:ring-sky-500/20 [color-scheme:dark]" 
            />
          </div>
        </div>
      </div>
    </div>

              {/* Hari */}
              <div className="space-y-4 pt-4 border-t border-slate-800/40">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Active Days (Routine Repeat)</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map(day => (
                    <Badge
                      key={day}
                      variant="outline"
                      className={cn(
                        "cursor-pointer px-5 py-3 text-xs rounded-2xl transition-all duration-300 border-slate-800",
                        selectedDays.includes(day) 
                          ? "bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-900/40" 
                          : "bg-slate-950 text-slate-500 hover:border-slate-700"
                      )}
                      onClick={() => toggleDay(day)}
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
                <p className="text-[10px] text-slate-600 italic">* Leave unselected to show every day.</p>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-8 border-t border-slate-800/50 bg-slate-900/20 flex gap-4">
            <Button type="button" variant="ghost" className="h-14 px-8 rounded-2xl text-slate-500 hover:bg-slate-800" onClick={() => onOpenChange(false)}>
              Discard Changes
            </Button>
            <Button type="submit" className="h-14 flex-grow rounded-2xl bg-sky-600 hover:bg-sky-500 font-bold text-lg shadow-xl shadow-sky-900/20" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : (initialData ? "Update Announcement" : "Publish Announcement")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { API_BASE_URL, getAuthToken } from "@/lib/api";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// import { 
//   Loader2, 
//   Upload, 
//   X, 
//   Clock, 
//   CalendarDays, 
//   Megaphone, 
//   Settings2, 
//   Sparkles 
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// export function AnnouncementFormDialog({ open, onOpenChange, onSuccess, initialData }: any) {
//   const [loading, setLoading] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState("");
//   const [isActive, setIsActive] = useState(true);
//   const [selectedDays, setSelectedDays] = useState<string[]>([]);

//   useEffect(() => {
//     if (open) {
//       if (initialData) {
//         setIsActive(initialData.is_active);
//         setPreview(initialData.image_url || "");
//         setSelectedDays(initialData.active_days ? initialData.active_days.split(",") : []);
//       } else {
//         setIsActive(true);
//         setPreview("");
//         setSelectedDays([]);
//       }
//     }
//   }, [open, initialData]);

//   const toggleDay = (day: string) => {
//     setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const token = getAuthToken();
//     const formData = new FormData(e.currentTarget);
//     if (imageFile) formData.append("image", imageFile);
//     formData.set("is_active", String(isActive));
//     formData.set("active_days", selectedDays.join(","));

//     setLoading(true);
//     try {
//       const url = initialData ? `${API_BASE_URL}/announcements/${initialData.id}` : `${API_BASE_URL}/announcements/add`;
//       const res = await fetch(url, {
//         method: initialData ? "PATCH" : "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });
//       if (res.ok) { onSuccess(); onOpenChange(false); }
//     } catch (err) { 
//       alert("Terjadi kesalahan koneksi"); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       {/* Lebar ditingkatkan ke 4xl agar lebih lega */}
//       <DialogContent className="max-w-4xl border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-y-auto max-h-[92vh] rounded-[3rem] p-0 border-none">
//         <form onSubmit={handleSubmit} className="flex flex-col">
          
//           {/* HEADER SECTION */}
//           <div className="p-10 border-b border-slate-800/50 flex items-center justify-between bg-gradient-to-r from-slate-900/40 to-transparent">
//             <div className="flex items-center gap-5">
//               <div className="h-14 w-14 bg-sky-500/10 rounded-2xl flex items-center justify-center border border-sky-500/20 shadow-inner">
//                 <Megaphone className="h-7 w-7 text-sky-400" />
//               </div>
//               <div>
//                 <DialogTitle className="text-2xl font-bold tracking-tight">
//                   {initialData ? "Modify Announcement" : "Create New Popup"}
//                 </DialogTitle>
//                 <p className="text-slate-500 text-sm mt-1">Configure your banner visuals and visibility rules.</p>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl">
//                 <div className={cn("h-2.5 w-2.5 rounded-full", isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-600")} />
//                 <span className={cn("text-[10px] font-black tracking-[0.2em] uppercase", isActive ? "text-emerald-400" : "text-slate-500")}>
//                     {isActive ? "Status: Live" : "Status: Draft"}
//                 </span>
//             </div>
//           </div>

//           <div className="p-10 space-y-12">
//             {/* SECTION 1: CONTENT ASSETS */}
//             <div className="space-y-8">
//               <div className="flex items-center gap-3 text-slate-400">
//                 <Sparkles className="h-5 w-5 text-sky-400" />
//                 <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Visual & Messaging</h4>
//               </div>

//               <div className="grid grid-cols-1 gap-8">
//                 {/* Image Upload Area - Dibuat lebih lebar (21/9) */}
//                 <div className="relative group aspect-[21/9] rounded-[2.5rem] border-2 border-dashed border-slate-800 bg-slate-900/30 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-sky-500/40 hover:bg-slate-900/50">
//                   {preview ? (
//                     <>
//                       <img src={preview} className="h-full w-full object-cover" />
//                       <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                         <button type="button" onClick={() => { setPreview(""); setImageFile(null); }} className="p-4 bg-red-500 rounded-full hover:bg-red-600 shadow-2xl transition-transform active:scale-90">
//                           <X className="h-6 w-6 text-white" />
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="text-center">
//                       <div className="h-16 w-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//                         <Upload className="h-7 w-7 text-slate-500" />
//                       </div>
//                       <p className="text-sm text-slate-400 font-medium">Click to upload banner image</p>
//                       <p className="text-[10px] text-slate-600 mt-2 font-mono">Recommended: 1200 x 500 px (Max 5MB)</p>
//                     </div>
//                   )}
//                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) { setImageFile(file); setPreview(URL.createObjectURL(file)); }
//                   }} />
//                 </div>

//                 <div className="space-y-6">
//                   <div className="space-y-2">
//                     <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Announcement Title</label>
//                     <Input name="title" defaultValue={initialData?.title} placeholder="Enter a catchy title..." className="bg-slate-900/50 border-slate-800 h-14 px-6 rounded-2xl text-lg focus:ring-sky-500/20" />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Main Message</label>
//                     <Textarea name="message" defaultValue={initialData?.message} placeholder="Describe the details of your announcement..." className="bg-slate-900/50 border-slate-800 min-h-[140px] rounded-[2rem] p-6 resize-none focus:ring-sky-500/20 leading-relaxed" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* SECTION 2: VISIBILITY LOGIC */}
//             <div className="space-y-10 p-10 rounded-[3rem] bg-slate-900/20 border border-slate-800/60 shadow-inner">
//               <div className="flex items-center justify-between border-b border-slate-800/50 pb-8">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 bg-sky-500/10 rounded-2xl">
//                     <Settings2 className="h-6 w-6 text-sky-400" />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200">Visibility Logic</h4>
//                     <p className="text-[10px] text-slate-500 mt-1">Determine exactly when this popup is shown to users.</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 bg-slate-950 p-3 px-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer" onClick={() => setIsActive(!isActive)}>
//                    <Checkbox id="is_active" checked={isActive} onCheckedChange={(checked) => setIsActive(!!checked)} className="h-5 w-5 data-[state=checked]:bg-sky-500 border-slate-700" />
//                    <label htmlFor="is_active" className="text-xs font-bold text-slate-400 cursor-pointer">Live Visibility</label>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-12">
//                 {/* Duration Row */}
//                 <div className="space-y-5">
//                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
//                     <CalendarDays className="h-4 w-4 text-sky-500/50" /> Campaign Period
//                   </label>
//                   <div className="flex flex-col md:flex-row gap-6 items-end">
//                     <div className="flex-1 w-full space-y-2">
//                       <span className="text-[10px] text-slate-600 font-bold uppercase ml-1">Starts From</span>
//                       <Input name="start_date" type="date" defaultValue={initialData?.start_date?.split('T')[0]} className="bg-slate-950 border-slate-800 h-14 rounded-2xl px-6 w-full focus:ring-sky-500/20 [color-scheme:dark]" />
//                     </div>
//                     <div className="hidden md:block pb-5 text-slate-800">—</div>
//                     <div className="flex-1 w-full space-y-2">
//                       <span className="text-[10px] text-slate-600 font-bold uppercase ml-1">Ends At</span>
//                       <Input name="end_date" type="date" defaultValue={initialData?.end_date?.split('T')[0]} className="bg-slate-950 border-slate-800 h-14 rounded-2xl px-6 w-full focus:ring-sky-500/20 [color-scheme:dark]" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Hours Row */}
//                 <div className="space-y-5">
//                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
//                     <Clock className="h-4 w-4 text-sky-500/50" /> Operational Schedule
//                   </label>
//                   <div className="flex flex-col md:flex-row gap-6 items-end">
//                     <div className="flex-1 w-full space-y-2">
//                       <span className="text-[10px] text-slate-600 font-bold uppercase ml-1">Active Time</span>
//                       <Input name="start_time" type="time" step="1" defaultValue={initialData?.start_time} className="bg-slate-950 border-slate-800 h-14 rounded-2xl px-6 w-full focus:ring-sky-500/20 [color-scheme:dark]" />
//                     </div>
//                     <div className="hidden md:block pb-5 text-slate-800">—</div>
//                     <div className="flex-1 w-full space-y-2">
//                       <span className="text-[10px] text-slate-600 font-bold uppercase ml-1">Inactive Time</span>
//                       <Input name="end_time" type="time" step="1" defaultValue={initialData?.end_time} className="bg-slate-950 border-slate-800 h-14 rounded-2xl px-6 w-full focus:ring-sky-500/20 [color-scheme:dark]" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Days Selection */}
//                 <div className="space-y-6 pt-8 border-t border-slate-800/40">
//                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Recurring Active Days</label>
//                   <div className="flex flex-wrap gap-3">
//                     {DAYS.map(day => (
//                       <Badge
//                         key={day}
//                         variant="outline"
//                         className={cn(
//                           "cursor-pointer px-8 py-4 text-xs rounded-2xl transition-all duration-300 border-slate-800 font-bold tracking-tight",
//                           selectedDays.includes(day) 
//                             ? "bg-sky-600 text-white border-sky-500 shadow-xl shadow-sky-900/40" 
//                             : "bg-slate-950 text-slate-500 hover:border-slate-600 hover:text-slate-300"
//                         )}
//                         onClick={() => toggleDay(day)}
//                       >
//                         {day}
//                       </Badge>
//                     ))}
//                   </div>
//                   <p className="text-[10px] text-slate-600 italic ml-1">* If no days are selected, it will show every day during the campaign period.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FOOTER SECTION */}
//           <div className="p-10 border-t border-slate-800/50 bg-slate-900/20 flex gap-5">
//             <Button type="button" variant="ghost" className="h-16 px-10 rounded-[1.5rem] text-slate-500 hover:bg-slate-800 hover:text-white transition-all font-bold" onClick={() => onOpenChange(false)}>
//               Discard Changes
//             </Button>
//             <Button type="submit" className="h-16 flex-grow rounded-[1.5rem] bg-sky-600 hover:bg-sky-500 font-bold text-xl shadow-2xl shadow-sky-900/40 transition-all active:scale-[0.98]" disabled={loading}>
//               {loading ? (
//                 <div className="flex items-center gap-3">
//                   <Loader2 className="h-6 w-6 animate-spin" />
//                   <span>Saving...</span>
//                 </div>
//               ) : (
//                 initialData ? "Update Announcement" : "Publish to Mobile"
//               )}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }