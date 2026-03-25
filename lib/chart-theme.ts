// lib/chart-theme.ts
"use client";

import { useTheme } from "next-themes";

export function useChartTheme() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    isDark,
    // warna utama garis / bar
    primary: isDark ? "#38bdf8" : "#2563eb",
    secondary: isDark ? "#22c55e" : "#16a34a",

    // axis, label, grid
    axis: isDark ? "#94a3b8" : "#64748b",
    axisMuted: isDark ? "#64748b" : "#9ca3af",
    grid: isDark
      ? "rgba(148,163,184,0.25)"
      : "rgba(148,163,184,0.35)",

    // background dalam card chart
    surface: isDark ? "#020617" : "#ffffff",

    // text
    label: isDark ? "#e2e8f0" : "#0f172a",
    subLabel: isDark ? "#9ca3af" : "#6b7280",
  };
}
