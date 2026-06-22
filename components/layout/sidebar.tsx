"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LinkComponent from "next/link";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  Monitor,
  ShieldCheck,
  QrCode,
  FileSpreadsheet,
  Building2,
  AlertTriangle,
  Wrench,
  UserCheck,
  Award,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SidebarProps = {
  className?: string;
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ className, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    const roles = JSON.parse(localStorage.getItem("user_roles") || "[]");
    setUserRoles(roles);
  }, []);

  const getNavGroups = () => {
    const isSecurity =
      userRoles.includes("SECURITY") || userRoles.includes("ROLE_SECURITY");

    if (isSecurity) {
      return [
        {
          groupTitle: "Security Navigation",
          items: [
            {
              title: "Scan Gate Pos",
              href: "/dashboard/security/gate",
              icon: QrCode,
            },
            {
              title: "Live Monitoring Hari Ini",
              href: "/dashboard/security/monitoring",
              icon: Monitor,
            },
          ],
        },
      ];
    }

    return [
      {
        groupTitle: "Core Safety & Permits",
        items: [
          {
            title: "Dashboard Analitik K3",
            href: "/dashboard/safety/analytics",
            icon: BarChart3,
          },
          {
            title: "Manajemen SIK",
            href: "/dashboard/safety/sik",
            icon: FileText,
          },
          {
            title: "Eksekusi Denwacho",
            href: "/dashboard/safety/denwacho",
            icon: ShieldCheck,
          },
          {
            title: "Temuan Safety (Findings)",
            href: "/dashboard/safety/findings",
            icon: AlertTriangle,
          },
        ],
      },
      {
        groupTitle: "Resource & Qualifications",
        items: [
          {
            title: "Manage Users & Otoritas",
            href: "/dashboard/safety/users",
            icon: Users,
          },
          {
            title: "Master Tools & APD",
            href: "/dashboard/safety/tools-apd",
            icon: Wrench,
          },
          {
            title: "Anzen Leader Data",
            href: "/dashboard/safety/anzen-leaders",
            icon: UserCheck,
          },
          {
            title: "Special Skill Certs",
            href: "/dashboard/safety/special-skills",
            icon: Award,
          },
        ],
      },
      {
        groupTitle: "Reporting",
        items: [
          {
            title: "Laporan K3 (Excel/PDF)",
            href: "/dashboard/safety/reports",
            icon: FileSpreadsheet,
          },
        ],
      },
    ];
  };

  const navGroups = getNavGroups();

  const renderNavItem = (item: { title: string; href: string; icon: any }) => {
    const active =
      pathname === item.href ||
      (pathname.startsWith(item.href) && item.href !== "/dashboard");
    const Icon = item.icon;

    const content = (
      <LinkComponent
        key={item.title}
        href={item.href}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-medium transition-all duration-200 outline-none",
          active
            ? "bg-indigo-600/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20"
            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent",
        )}
      >
        {active && (
          <span className="absolute left-0 top-1/4 h-1/2 w-[3px] rounded-r-full bg-indigo-500" />
        )}

        <Icon
          className={cn(
            "h-4 w-4 shrink-0 transition-colors",
            active
              ? "text-indigo-500 dark:text-indigo-400"
              : "text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-200",
          )}
        />
        {!collapsed && <span className="truncate">{item.title}</span>}
      </LinkComponent>
    );

    if (collapsed) {
      return (
        <TooltipProvider key={item.title}>
          <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent
              side="right"
              className="text-xs bg-popover border border-border text-popover-foreground shadow-xl px-3 py-1.5 font-medium"
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  };

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r border-border bg-background dark:bg-slate-950 text-foreground transition-all duration-300 ease-in-out select-none w-full",
        className,
      )}
    >
      {/* 🌟 HEADER AREA: Tombol Toggle Sekarang Selalu Ada di Sini */}
      <div
        className={cn(
          "flex h-16 items-center px-4 justify-between border-b border-border/60 bg-background/40 backdrop-blur-sm",
          collapsed && "flex-col justify-center py-2 h-24 gap-2 px-0",
        )}
      >
        {/* Area Logo / Icon Brand */}
        <div
          className={cn(
            "flex items-center gap-2.5 min-w-0",
            collapsed && "justify-center",
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
            <Building2 className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent truncate tracking-wide">
                PIONIR INOVASI
              </span>
              <span className="text-[10px] text-muted-foreground font-medium truncate tracking-tight">
                Safety Portal K3
              </span>
            </div>
          )}
        </div>

        {/* 🌟 TOMBOL TOGGLE YANG KONSISTEN: Selalu Terlihat Jelas di Atas Sidebar */}
        <button
          onClick={onToggle}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background hover:bg-muted text-muted-foreground transition-all active:scale-95 shadow-sm",
            collapsed &&
              "h-7 w-7 border-indigo-500/30 bg-indigo-500/5 text-indigo-500 hover:bg-indigo-500/10", // Kasih highlight pas kecil biar jelas bisa diklik
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 animate-pulse" /> // Panah Kanan (>) untuk Expand
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" /> // Panah Kiri (<) untuk Hide
          )}
        </button>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto custom-scrollbar">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            {!collapsed && (
              <p className="px-3 pb-1 text-[9px] font-bold tracking-[0.18em] text-slate-400 dark:text-slate-500 uppercase">
                {group.groupTitle}
              </p>
            )}
            {group.items.map((item) => renderNavItem(item))}
          </div>
        ))}
      </nav>

      {/* Footer Area */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-border/60 text-[10px] text-muted-foreground flex items-center justify-between font-medium">
          <span>v1.6.0</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      )}
    </div>
  );
}
