"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// helper token
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

type DeficitSummary = {
  wbs_defisit_items: number;
  defisit_item_items: number;
  total_items: number;
};

export default function DeficitCards({
  className,
  locationId, // optional kalau dashboard kamu multi-location
}: {
  className?: string;
  locationId?: string | number;
}) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<DeficitSummary>({
    wbs_defisit_items: 0,
    defisit_item_items: 0,
    total_items: 0,
  });
  const [error, setError] = useState<string | null>(null);

  // NOTE:
  // - Kalau kamu sudah punya SSE dashboard data yang mengandung "deficit",
  //   lebih bagus: summary diambil dari SSE store dan gak fetch lagi.
  // - Untuk implement awal, ini fetch endpoint summary dulu (simple & jelas).
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = getToken();
        const qs = new URLSearchParams();
        // optional: kalau backend kamu support location_id query
        if (locationId !== undefined && locationId !== null && `${locationId}` !== "") {
          qs.set("location_id", String(locationId));
        }

        const res = await fetch(`${API_BASE_URL}/api/dashboard/deficit/summary?${qs.toString()}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          cache: "no-store",
        });

        const json = await res.json();
        if (!res.ok || !json?.status) {
          throw new Error(json?.message || "Failed to fetch deficit summary");
        }

        setSummary({
          wbs_defisit_items: Number(json.summary?.wbs_defisit_items || 0),
          defisit_item_items: Number(json.summary?.defisit_item_items || 0),
          total_items: Number(json.summary?.total_items || 0),
        });
      } catch (e: any) {
        setError(e?.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [locationId]);

  const cards = useMemo(
    () => [
      {
        title: "WBS Defisit",
        value: summary.wbs_defisit_items,
        href: "/dashboard/reports/outstanding?type=WBS_DEFISIT",
        badge: "Items",
      },
      {
        title: "Defisit Item",
        value: summary.defisit_item_items,
        href: "/dashboard/reports/outstanding?type=DEFISIT_ITEM",
        badge: "Items",
      },
      {
        title: "Total Outstanding",
        value: summary.total_items,
        href: "/dashboard/reports/outstanding?type=ALL",
        badge: "Items",
      },
    ],
    [summary]
  );

  return (
    <div className={cn("grid gap-3 md:grid-cols-3", className)}>
      {cards.map((c) => (
        <Link key={c.title} href={c.href} className="block">
          <Card className="p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-muted-foreground">{c.title}</div>
                <div className="mt-1 text-2xl font-semibold">
                  {loading ? "…" : c.value.toLocaleString("id-ID")}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary">{c.badge}</Badge>
                {!loading && c.value > 0 ? (
                  <Badge>Action</Badge>
                ) : (
                  <Badge variant="outline">OK</Badge>
                )}
              </div>
            </div>

            {error ? (
              <div className="mt-2 text-xs text-destructive">{error}</div>
            ) : (
              <div className="mt-2 text-xs text-muted-foreground">
                Klik untuk lihat daftar item outstanding
              </div>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}
