// "use client";

// import type { ReactNode } from "react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Sidebar } from "@/components/layout/sidebar";
// import { Topbar } from "@/components/layout/topbar";
// import { cn } from "@/lib/utils";

// type DashboardLayoutProps = {
//   children: ReactNode;
// };

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//   const router = useRouter();
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [collapsed, setCollapsed] = useState(false);

//   // ===== Auth Guard =====
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const token = localStorage.getItem("token");
//     const tokenExpiry = localStorage.getItem("tokenExpiry");
//     const exp = tokenExpiry ? Number(tokenExpiry) : 0;

//     if (!token || !tokenExpiry || Number.isNaN(exp) || Date.now() > exp) {
//       localStorage.clear();
//       router.replace("/login");
//       return;
//     }

//     // restore sidebar state
//     const storedCollapsed = localStorage.getItem("sidebar_collapsed");
//     if (storedCollapsed === "true") {
//       setCollapsed(true);
//     }

//     setCheckingAuth(false);
//   }, [router]);

//   const handleToggleSidebar = () => {
//     setCollapsed((prev) => {
//       const next = !prev;
//       if (typeof window !== "undefined") {
//         localStorage.setItem("sidebar_collapsed", next ? "true" : "false");
//       }
//       return next;
//     });
//   };

//   if (checkingAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background text-xs text-muted-foreground">
//         Checking session...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex bg-background text-foreground">
//       {/* Sidebar desktop */}
//       <div className="hidden md:flex">
//         <Sidebar
//           className="fixed left-0 top-0 h-screen z-30"
//           collapsed={collapsed}
//           onToggle={handleToggleSidebar}
//         />
//       </div>

//       {/* Main content area */}
//       <div
//         className={cn(
//           "flex-1 flex flex-col transition-all duration-300",
//           collapsed ? "md:ml-[80px]" : "md:ml-[260px]"
//         )}
//       >
//         <Topbar onToggleSidebar={handleToggleSidebar} />
//         <main className="flex-1 p-4 md:p-6 bg-muted/40">
//           <div className="mx-auto max-w-6xl space-y-6">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // ===== Auth Guard =====
  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    const exp = tokenExpiry ? Number(tokenExpiry) : 0;

    if (!token || !tokenExpiry || Number.isNaN(exp) || Date.now() > exp) {
      localStorage.clear();
      router.replace("/login");
      return;
    }

    // restore sidebar state
    const storedCollapsed = localStorage.getItem("sidebar_collapsed");
    if (storedCollapsed === "true") {
      setCollapsed(true);
    }

    setCheckingAuth(false);
  }, [router]);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar_collapsed", next ? "true" : "false");
      }
      return next;
    });
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-xs text-muted-foreground">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground overflow-hidden">
      {/* Sidebar Desktop Wrapper */}
      <div
        className={cn(
          "hidden md:flex flex-col h-screen fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out border-r border-border",
          collapsed ? "w-[68px]" : "w-[260px]",
        )}
      >
        <Sidebar
          className="w-full h-full border-r-0"
          collapsed={collapsed}
          onToggle={handleToggleSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
          collapsed ? "md:ml-[68px]" : "md:ml-[260px]",
        )}
      >
        <Topbar
          onToggleSidebar={handleToggleSidebar}
          sidebarCollapsed={collapsed}
        />

        <main className="flex-1 p-4 md:p-6 bg-muted/20 dark:bg-slate-950/20 overflow-y-auto">
          <div className="mx-auto max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
