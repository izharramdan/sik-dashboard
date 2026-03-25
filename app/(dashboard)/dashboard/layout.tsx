// // // // // import { Sidebar } from "@/components/layout/sidebar";
// // // // // import { Topbar } from "@/components/layout/topbar";

// // // // // export default function DashboardLayout({
// // // // //   children,
// // // // // }: {
// // // // //   children: React.ReactNode;
// // // // // }) {
// // // // //   return (
// // // // //     <div className="flex min-h-screen">
// // // // //       <Sidebar />
// // // // //       <div className="flex-1 flex flex-col">
// // // // //         <Topbar />
// // // // //         <main className="flex-1 bg-muted/20 p-4 md:p-6">{children}</main>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import type { ReactNode } from "react";
// // // // import { Sidebar } from "@/components/layout/sidebar";
// // // // import { Topbar } from "@/components/layout/topbar";

// // // // export default function DashboardLayout({ children }: { children: ReactNode }) {
// // // //   return (
// // // //     <div className="min-h-screen flex bg-muted">
// // // //       {/* Sidebar desktop */}
// // // //       <div className="hidden md:flex">
// // // //         <Sidebar className="fixed left-0 top-0 h-screen" />
// // // //       </div>

// // // //       {/* Main content area */}
// // // //       <div className="flex-1 flex flex-col md:ml-64">
// // // //         <Topbar />
// // // //         <main className="flex-1 p-4 md:p-6">
// // // //           <div className="mx-auto max-w-6xl space-y-6">
// // // //             {children}
// // // //           </div>
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import type { ReactNode } from "react";
// // // import { useEffect, useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { Sidebar } from "@/components/layout/sidebar";
// // // import { Topbar } from "@/components/layout/topbar";

// // // export default function DashboardLayout({ children }: { children: ReactNode }) {
// // //   const router = useRouter();
// // //   const [checkingAuth, setCheckingAuth] = useState(true);

// // //   useEffect(() => {
// // //     if (typeof window === "undefined") return;

// // //     const token = localStorage.getItem("token");
// // //     const tokenExpiry = localStorage.getItem("tokenExpiry");
// // //     const exp = tokenExpiry ? Number(tokenExpiry) : 0;

// // //     // kalau tidak ada token / expired → lempar ke login
// // //     if (!token || !tokenExpiry || Number.isNaN(exp) || Date.now() > exp) {
// // //       localStorage.removeItem("token");
// // //       localStorage.removeItem("tokenExpiry");
// // //       localStorage.removeItem("username");
// // //       localStorage.removeItem("jabatanId");
// // //       localStorage.removeItem("authority_level");
// // //       router.replace("/login");
// // //       return;
// // //     }

// // //     setCheckingAuth(false);
// // //   }, [router]);

// // //   if (checkingAuth) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-background text-xs text-muted-foreground">
// // //         Checking session...
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen flex bg-muted">
// // //       {/* Sidebar desktop */}
// // //       <div className="hidden md:flex">
// // //         <Sidebar className="fixed left-0 top-0 h-screen" />
// // //       </div>

// // //       {/* Main content area */}
// // //       <div className="flex-1 flex flex-col md:ml-64">
// // //         <Topbar />
// // //         <main className="flex-1 p-4 md:p-6">
// // //           <div className="mx-auto max-w-6xl space-y-6">{children}</div>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // "use client";

// // import type { ReactNode } from "react";
// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { Sidebar } from "@/components/layout/sidebar";
// // import { Topbar } from "@/components/layout/topbar";
// // import { cn } from "@/lib/utils";

// // export default function DashboardLayout({ children }: { children: ReactNode }) {
// //   const router = useRouter();
// //   const [checkingAuth, setCheckingAuth] = useState(true);
// //   const [collapsed, setCollapsed] = useState(false);

// //   useEffect(() => {
// //     if (typeof window === "undefined") return;

// //     const token = localStorage.getItem("token");
// //     const tokenExpiry = localStorage.getItem("tokenExpiry");
// //     const exp = tokenExpiry ? Number(tokenExpiry) : 0;

// //     if (!token || !tokenExpiry || Number.isNaN(exp) || Date.now() > exp) {
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("tokenExpiry");
// //       localStorage.removeItem("username");
// //       localStorage.removeItem("jabatanId");
// //       localStorage.removeItem("authority_level");
// //       router.replace("/login");
// //       return;
// //     }

// //     setCheckingAuth(false);
// //   }, [router]);

// //   if (checkingAuth) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-background text-xs text-muted-foreground">
// //         Checking session...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex bg-background">
// //       {/* Sidebar desktop (floating raycast style) */}
// //       <div className="hidden md:block">
// //         <Sidebar
// //           className="fixed left-0 top-0"
// //           collapsed={collapsed}
// //           onToggle={() => setCollapsed((prev) => !prev)}
// //         />
// //       </div>

// //       {/* Main content area – geser halus saat collapse */}
// //       <div
// //         className={cn(
// //           "flex-1 flex flex-col transition-all duration-500 ease-[cubic-bezier(.25,.4,.45,1)]",
// //           collapsed ? "md:ml-20" : "md:ml-72"
// //         )}
// //       >
// //         <Topbar />
// //         <main className="flex-1 p-4 md:p-6">
// //           <div className="mx-auto max-w-6xl space-y-6">{children}</div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

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
//       localStorage.removeItem("token");
//       localStorage.removeItem("tokenExpiry");
//       localStorage.removeItem("username");
//       localStorage.removeItem("jabatanId");
//       localStorage.removeItem("authority_level");
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
//     <div className="min-h-screen flex bg-slate-950 text-slate-50">
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
//         <main className="flex-1 p-4 md:p-6">
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
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar desktop */}
      <div className="hidden md:flex">
        <Sidebar
          className="fixed left-0 top-0 h-screen z-30"
          collapsed={collapsed}
          onToggle={handleToggleSidebar}
        />
      </div>

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          collapsed ? "md:ml-[80px]" : "md:ml-[260px]"
        )}
      >
        <Topbar onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 p-4 md:p-6 bg-muted/40">
          <div className="mx-auto max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
