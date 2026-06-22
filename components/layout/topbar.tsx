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
  sidebarCollapsed?: boolean;
};

export function Topbar({
  onToggleSidebar,
  sidebarCollapsed = false,
}: TopbarProps) {
  const router = useRouter();
  const [username, setUsername] = useState<string>("User");
  const [roleLabel, setRoleLabel] = useState<string>("Authorized Account");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const name = localStorage.getItem("username");
    const roles: string[] = JSON.parse(
      localStorage.getItem("user_roles") || "[]",
    );

    if (name) setUsername(name);

    if (roles.length > 0) {
      if (roles.includes("SECURITY") || roles.includes("ROLE_SECURITY")) {
        setRoleLabel("Security Gate Pos");
      } else {
        setRoleLabel("Safety Staff K3");
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    router.replace("/login");
  };

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border bg-background/90 backdrop-blur z-20">
      {/* LEFT AREA */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[260px]">
              <Sidebar collapsed={false} onToggle={() => {}} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Collapse Trigger Button */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                sidebarCollapsed && "rotate-180 text-indigo-500",
              )}
            />
          </button>
        )}

        {/* Title */}
        <div className="flex flex-col">
          <span className="font-semibold text-sm md:text-base text-foreground tracking-tight">
            SIK & K3 Control Room
          </span>
        </div>
      </div>

      {/* RIGHT AREA */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1 text-xs hover:bg-accent transition">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-[10px] font-bold bg-indigo-500/10 text-indigo-500">
                  {username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start text-left leading-tight">
                <span className="font-semibold text-[11px] text-foreground">
                  {username}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {roleLabel}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:inline" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Akun Operasional</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil Saya</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 font-semibold"
              onClick={handleLogout}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
