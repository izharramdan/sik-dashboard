"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Database,
  ArrowRightLeft,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Monitor
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

  const mainItems = [
    { title: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { title: "Data Master", href: "/dashboard/master", icon: Database },
    { title: "Transaksi", href: "/dashboard/transaction", icon: ArrowRightLeft },
    { title: "Laporan", href: "/dashboard/report", icon: FileText },
    { title: "Pengaturan", href: "/dashboard/setting", icon: Settings },
  ];

  const renderNavItem = (
    item: {
      title: string;
      href: string;
      icon: any;
    },
    key?: string
  ) => {
    const active = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
    const Icon = item.icon;

    const content = (
      <Link
        key={key ?? item.href}
        href={item.href}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          "hover:bg-slate-800/75 hover:shadow-[0_0_0_1px_rgba(148,163,184,0.35)]",
          active
            ? "bg-slate-900 text-slate-50 shadow-[0_18px_45px_rgba(0,0,0,0.9)]"
            : "text-slate-300/80"
        )}
      >
        {active && (
          <span className="absolute -left-1 top-1 bottom-1 w-1 rounded-full bg-gradient-to-b from-sky-400 via-blue-500 to-cyan-300 shadow-[0_0_18px_rgba(56,189,248,0.9)]" />
        )}
        <Icon
          className={cn(
            "h-5 w-5 flex-none transition-all",
            active
              ? "text-sky-300"
              : "text-slate-400 group-hover:text-slate-100 group-hover:scale-[1.02]"
          )}
        />
        {!collapsed && (
          <span
            className={cn(
              "truncate transition-colors",
              active ? "text-slate-50" : "group-hover:text-slate-100"
            )}
          >
            {item.title}
          </span>
        )}
      </Link>
    );

    if (!collapsed) return content;

    return (
      <Tooltip key={key ?? item.href}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          {item.title}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider delayDuration={80}>
      <aside
        className={cn(
          "relative flex flex-col border-r border-slate-800/80",
          "bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18)_0,_transparent_55%),_linear-gradient(to_bottom,_#020617,_#020617)]/95",
          "backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.9)]",
          "transition-[width] duration-300",
          collapsed ? "w-[80px]" : "w-[260px]",
          className
        )}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)]">
              <Monitor className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                  Aplikasi SIK
                </span>
                <span className="text-[10px] text-slate-400">
                  Sistem Informasi
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggle}
            className={cn(
              "hidden md:inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-600/60",
              "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-slate-50 transition-all",
              collapsed && "mx-auto"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </button>
        </div>

        <div className="mx-3 mb-2 h-px bg-gradient-to-r from-transparent via-slate-600/60 to-transparent" />

        <nav className="flex-1 px-2 pb-4 space-y-4 overflow-y-auto">
          <div className="space-y-1">
            {!collapsed && (
              <p className="px-2 pb-1 text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                Menu Utama
              </p>
            )}
            {mainItems.map((item) => renderNavItem(item))}
          </div>
        </nav>

        <div className="px-4 py-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
          {!collapsed && (
            <span className="truncate">
              © {new Date().getFullYear()}
            </span>
          )}
          {collapsed && (
            <span className="mx-auto text-[9px] tracking-wide">
              © {new Date().getFullYear()}
            </span>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
