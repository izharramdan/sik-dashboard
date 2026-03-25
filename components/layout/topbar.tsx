// // // // // "use client";

// // // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// // // // // export function Topbar() {
// // // // //   return (
// // // // //     <header className="flex items-center justify-between h-14 px-4 border-b bg-card">
// // // // //       <div className="font-semibold text-sm">
// // // // //         Real-Time Material Consumption
// // // // //       </div>
// // // // //       <div className="flex items-center gap-3">
// // // // //         <span className="text-xs text-muted-foreground">
// // // // //           PT. Pionir Inovasi Digital
// // // // //         </span>
// // // // //         <Avatar className="h-8 w-8">
// // // // //           <AvatarFallback>HD</AvatarFallback>
// // // // //         </Avatar>
// // // // //       </div>
// // // // //     </header>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import { Menu, ChevronDown } from "lucide-react";
// // // // import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// // // // import { Sidebar } from "@/components/layout/sidebar";
// // // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // // import { Button } from "@/components/ui/button";
// // // // import {
// // // //   DropdownMenu,
// // // //   DropdownMenuTrigger,
// // // //   DropdownMenuContent,
// // // //   DropdownMenuLabel,
// // // //   DropdownMenuItem,
// // // //   DropdownMenuSeparator,
// // // // } from "@/components/ui/dropdown-menu";
// // // // import { cn } from "@/lib/utils";

// // // // export function Topbar() {
// // // //   return (
// // // //     <header className="flex items-center justify-between h-14 px-4 border-b bg-background/90 backdrop-blur">
// // // //       {/* LEFT: Mobile menu + Title */}
// // // //       <div className="flex items-center gap-3">
// // // //         {/* Mobile menu */}
// // // //         <div className="md:hidden">
// // // //           <Sheet>
// // // //             <SheetTrigger asChild>
// // // //               <Button
// // // //                 variant="outline"
// // // //                 size="icon"
// // // //                 className="h-8 w-8"
// // // //               >
// // // //                 <Menu className="h-4 w-4" />
// // // //               </Button>
// // // //             </SheetTrigger>
// // // //             <SheetContent side="left" className="p-0 w-64">
// // // //               <Sidebar />
// // // //             </SheetContent>
// // // //           </Sheet>
// // // //         </div>

// // // //         {/* Title + subtitle */}
// // // //         <div className="flex flex-col">
// // // //           <span className="font-semibold text-sm md:text-base">
// // // //             Cost Management &amp; Material Analytics
// // // //           </span>
// // // //           <span className="text-[11px] text-muted-foreground hidden sm:inline">
// // // //             Real-time view of budget, consumption, and idea realization
// // // //           </span>
// // // //         </div>
// // // //       </div>

// // // //       {/* RIGHT: Period selector + user */}
// // // //       <div className="flex items-center gap-3">
// // // //         {/* Period selector (dummy) */}
// // // //         <Button
// // // //           variant="outline"
// // // //           size="sm"
// // // //           className="hidden sm:inline-flex h-8 border-dashed text-xs"
// // // //         >
// // // //           Period: FY 2025 <ChevronDown className="ml-1 h-3 w-3" />
// // // //         </Button>

// // // //         {/* Env badge */}
// // // //         <span className="hidden md:inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200">
// // // //           Environment: DEV
// // // //         </span>

// // // //         {/* User dropdown */}
// // // //         <DropdownMenu>
// // // //           <DropdownMenuTrigger asChild>
// // // //             <button
// // // //               className={cn(
// // // //                 "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs",
// // // //                 "hover:bg-accent hover:text-accent-foreground"
// // // //               )}
// // // //             >
// // // //               <Avatar className="h-7 w-7">
// // // //                 <AvatarFallback>HD</AvatarFallback>
// // // //               </Avatar>
// // // //               <div className="hidden sm:flex flex-col items-start leading-tight">
// // // //                 <span className="font-medium text-[11px]">
// // // //                   Ahmad Hadi
// // // //                 </span>
// // // //                 <span className="text-[10px] text-muted-foreground">
// // // //                   PID – Director
// // // //                 </span>
// // // //               </div>
// // // //               <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:inline" />
// // // //             </button>
// // // //           </DropdownMenuTrigger>
// // // //           <DropdownMenuContent align="end" className="w-44">
// // // //             <DropdownMenuLabel>Account</DropdownMenuLabel>
// // // //             <DropdownMenuSeparator />
// // // //             <DropdownMenuItem>Profile</DropdownMenuItem>
// // // //             <DropdownMenuItem>Switch Company</DropdownMenuItem>
// // // //             <DropdownMenuSeparator />
// // // //             <DropdownMenuItem className="text-red-500">
// // // //               Logout
// // // //             </DropdownMenuItem>
// // // //           </DropdownMenuContent>
// // // //         </DropdownMenu>
// // // //       </div>
// // // //     </header>
// // // //   );
// // // // }


// // // "use client";

// // // import { Menu, ChevronDown } from "lucide-react";
// // // import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// // // import { Sidebar } from "@/components/layout/sidebar";
// // // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   DropdownMenu,
// // //   DropdownMenuTrigger,
// // //   DropdownMenuContent,
// // //   DropdownMenuLabel,
// // //   DropdownMenuItem,
// // //   DropdownMenuSeparator,
// // // } from "@/components/ui/dropdown-menu";
// // // import { cn } from "@/lib/utils";
// // // import { ThemeToggle } from "@/components/layout/theme-toggle"; // ⬅️ tambah ini

// // // export function Topbar() {
// // //   return (
// // //     <header className="flex items-center justify-between h-14 px-4 border-b bg-background/90 backdrop-blur">
// // //       {/* LEFT: Mobile menu + Title */}
// // //       <div className="flex items-center gap-3">
// // //         {/* ... (code sebelumnya tetap) ... */}
// // //       </div>

// // //       {/* RIGHT: Period selector + theme + user */}
// // //       <div className="flex items-center gap-3">
// // //         {/* Period selector (dummy) */}
// // //         <Button
// // //           variant="outline"
// // //           size="sm"
// // //           className="hidden sm:inline-flex h-8 border-dashed text-xs"
// // //         >
// // //           Period: FY 2025 <ChevronDown className="ml-1 h-3 w-3" />
// // //         </Button>

// // //         {/* Dark mode switch */}
// // //         <ThemeToggle />

// // //         {/* Env badge */}
// // //         <span className="hidden md:inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200">
// // //           Environment: DEV
// // //         </span>

// // //         {/* User dropdown */}
// // //         {/* ... lanjutan code kamu ... */}
// // //       </div>
// // //     </header>
// // //   );
// // // }

// // "use client";

// // import { Menu, ChevronDown } from "lucide-react";
// // import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// // import { Sidebar } from "@/components/layout/sidebar";
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // import { Button } from "@/components/ui/button";
// // import {
// //   DropdownMenu,
// //   DropdownMenuTrigger,
// //   DropdownMenuContent,
// //   DropdownMenuLabel,
// //   DropdownMenuItem,
// //   DropdownMenuSeparator,
// // } from "@/components/ui/dropdown-menu";
// // import { cn } from "@/lib/utils";
// // import { ThemeToggle } from "@/components/layout/theme-toggle";

// // export function Topbar() {
// //   return (
// //     <header className="flex items-center justify-between h-14 px-4 border-b bg-background/90 backdrop-blur">
// //       {/* LEFT: Mobile menu + Title */}
// //       <div className="flex items-center gap-3">
// //         {/* Mobile menu */}
// //         <div className="md:hidden">
// //           <Sheet>
// //             <SheetTrigger asChild>
// //               <Button
// //                 variant="outline"
// //                 size="icon"
// //                 className="h-8 w-8"
// //               >
// //                 <Menu className="h-4 w-4" />
// //               </Button>
// //             </SheetTrigger>
// //             <SheetContent side="left" className="p-0 w-64">
// //               <Sidebar />
// //             </SheetContent>
// //           </Sheet>
// //         </div>

// //         {/* Title + subtitle */}
// //         <div className="flex flex-col">
// //           <span className="font-semibold text-sm md:text-base text-foreground">
// //             Cost Management &amp; Material Analytics
// //           </span>
// //           <span className="text-[11px] text-muted-foreground hidden sm:inline">
// //             Real-time view of budget, consumption, and idea realization
// //           </span>
// //         </div>
// //       </div>

// //       {/* RIGHT: Period selector + theme + user */}
// //       <div className="flex items-center gap-3">
// //         {/* Period selector (dummy) */}
// //         <Button
// //           variant="outline"
// //           size="sm"
// //           className="hidden sm:inline-flex h-8 border-dashed text-xs"
// //         >
// //           Period: FY 2025 <ChevronDown className="ml-1 h-3 w-3" />
// //         </Button>

// //         {/* Dark mode switch */}
// //         <ThemeToggle />

// //         {/* Env badge */}
// //         <span className="hidden md:inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
// //           Environment: DEV
// //         </span>

// //         {/* User dropdown */}
// //         <DropdownMenu>
// //           <DropdownMenuTrigger asChild>
// //             <button
// //               className={cn(
// //                 "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs",
// //                 "hover:bg-accent hover:text-accent-foreground"
// //               )}
// //             >
// //               <Avatar className="h-7 w-7">
// //                 <AvatarFallback>HD</AvatarFallback>
// //               </Avatar>
// //               <div className="hidden sm:flex flex-col items-start leading-tight">
// //                 <span className="font-medium text-[11px] text-foreground">
// //                   Ahmad Hadi
// //                 </span>
// //                 <span className="text-[10px] text-muted-foreground">
// //                   PID – Director
// //                 </span>
// //               </div>
// //               <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:inline" />
// //             </button>
// //           </DropdownMenuTrigger>
// //           <DropdownMenuContent align="end" className="w-44">
// //             <DropdownMenuLabel>Account</DropdownMenuLabel>
// //             <DropdownMenuSeparator />
// //             <DropdownMenuItem>Profile</DropdownMenuItem>
// //             <DropdownMenuItem>Switch Company</DropdownMenuItem>
// //             <DropdownMenuSeparator />
// //             <DropdownMenuItem className="text-red-500">
// //               Logout
// //             </DropdownMenuItem>
// //           </DropdownMenuContent>
// //         </DropdownMenu>
// //       </div>
// //     </header>
// //   );
// // }

// "use client";

// import { Menu, ChevronDown } from "lucide-react";
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// import { Sidebar } from "@/components/layout/sidebar";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { cn } from "@/lib/utils";
// import { ThemeToggle } from "@/components/layout/theme-toggle";

// export function Topbar() {
//   return (
//     <header className="flex items-center justify-between h-14 px-4 border-b bg-background/90 backdrop-blur">
//       {/* LEFT: Mobile menu + Title */}
//       <div className="flex items-center gap-3">
//         {/* Mobile menu */}
//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="h-8 w-8">
//                 <Menu className="h-4 w-4" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="p-0 w-64">
//               {/* Sidebar versi non-collapsed untuk mobile drawer */}
//               <Sidebar collapsed={false} />
//             </SheetContent>
//           </Sheet>
//         </div>

//         {/* Title + subtitle */}
//         <div className="flex flex-col">
//           <span className="font-semibold text-sm md:text-base text-foreground">
//             Cost Management &amp; Material Analytics
//           </span>
//           <span className="text-[11px] text-muted-foreground hidden sm:inline">
//             Real-time view of budget, consumption, and idea realization
//           </span>
//         </div>
//       </div>

//       {/* RIGHT: Period selector + theme + user */}
//       <div className="flex items-center gap-3">
//         {/* Period selector (dummy) */}
//         <Button
//           variant="outline"
//           size="sm"
//           className="hidden sm:inline-flex h-8 border-dashed text-xs"
//         >
//           Period: FY 2025 <ChevronDown className="ml-1 h-3 w-3" />
//         </Button>

//         {/* Dark mode switch */}
//         <ThemeToggle />

//         {/* Env badge */}
//         <span className="hidden md:inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
//           Environment: DEV
//         </span>

//         {/* User dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button
//               className={cn(
//                 "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs",
//                 "hover:bg-accent hover:text-accent-foreground"
//               )}
//             >
//               <Avatar className="h-7 w-7">
//                 <AvatarFallback>HD</AvatarFallback>
//               </Avatar>
//               <div className="hidden sm:flex flex-col items-start leading-tight">
//                 <span className="font-medium text-[11px] text-foreground">
//                   Ahmad Hadi
//                 </span>
//                 <span className="text-[10px] text-muted-foreground">
//                   PID – Director
//                 </span>
//               </div>
//               <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:inline" />
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-44">
//             <DropdownMenuLabel>Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Profile</DropdownMenuItem>
//             <DropdownMenuItem>Switch Company</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem className="text-red-500">
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type TopbarProps = {
  onToggleSidebar?: () => void;
};

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const router = useRouter();
  const [username, setUsername] = useState<string>("User");
  const [roleLabel, setRoleLabel] = useState<string>("Warehouse Admin");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const name = localStorage.getItem("username");
    const authority = localStorage.getItem("authority_level");

    if (name) setUsername(name);

    if (authority) {
      if (authority === "1") setRoleLabel("Warehouse Admin");
      else if (authority === "2") setRoleLabel("Warehouse Approver");
      else setRoleLabel("Warehouse User");
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    router.replace("/login");
  };

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b bg-background/90 backdrop-blur z-20">
      {/* LEFT: Mobile menu + Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              {/* Sidebar di mobile: selalu expanded */}
              <Sidebar collapsed={false} onToggle={() => {}} />
            </SheetContent>
          </Sheet>
        </div>

        {/* OPTIONAL: desktop toggle kecil di kiri title */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="hidden md:inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-muted/60 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Title + subtitle */}
        <div className="flex flex-col">
          <span className="font-semibold text-sm md:text-base text-foreground">
            Warehouse Realtime Dashboard
          </span>
          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            Live shopping, pickup, dan delivery per lokasi (SSE).
          </span>
        </div>
      </div>

      {/* RIGHT: period (dummy) + theme + user */}
      <div className="flex items-center gap-3">
        {/* <Button
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex h-8 border-dashed text-xs"
        >
          Period: FY 2025 <ChevronDown className="ml-1 h-3 w-3" />
        </Button> */}

        <ThemeToggle />

        {/* <span className="hidden md:inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
          Environment: DEV
        </span> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs",
                "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback>
                  {username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="font-medium text-[11px] text-foreground">
                  {username}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {roleLabel}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:inline" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
