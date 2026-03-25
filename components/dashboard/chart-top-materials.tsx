// // // components/dashboard/chart-top-materials.tsx
// // "use client";

// // import {
// //   Bar,
// //   BarChart,
// //   ResponsiveContainer,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// // } from "recharts";
// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // type TopMaterial = {
// //   name: string;
// //   order_count: number;
// // };

// // export function ChartTopMaterials({ data }: { data: TopMaterial[] }) {
// //   const sorted = [...data].sort((a, b) => b.order_count - a.order_count);

// //   return (
// //     <Card className="border-none bg-card/80 backdrop-blur">
// //       <CardHeader className="pb-2">
// //         <CardTitle className="text-sm font-semibold">
// //           Top 5 Materials
// //         </CardTitle>
// //         <p className="text-[11px] text-muted-foreground">
// //           Materials paling sering dipesan pada periode terakhir.
// //         </p>
// //       </CardHeader>
// //       <CardContent className="h-72">
// //         <ResponsiveContainer width="100%" height="100%">
// //           <BarChart data={sorted} layout="vertical" margin={{ left: 80 }}>
// //             <CartesianGrid
// //               stroke="hsl(var(--border))"
// //               strokeDasharray="3 3"
// //               horizontal
// //               vertical={false}
// //             />
// //             <XAxis
// //               type="number"
// //               tickLine={false}
// //               axisLine={false}
// //               tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
// //             />
// //             <YAxis
// //               type="category"
// //               dataKey="name"
// //               tickLine={false}
// //               axisLine={false}
// //               tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }}
// //               width={80}
// //             />
// //             <Tooltip
// //               contentStyle={{
// //                 background: "hsl(var(--popover))",
// //                 borderRadius: 10,
// //                 border: "1px solid hsl(var(--border))",
// //                 fontSize: 11,
// //               }}
// //               labelStyle={{ color: "hsl(var(--muted-foreground))" }}
// //               formatter={(value: any) => [`${value} tx`, "Order Count"]}
// //             />
// //             <Bar
// //               dataKey="order_count"
// //               radius={[4, 4, 4, 4]}
// //               fill="hsl(var(--chart-1, var(--primary)))"
// //             />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // components/dashboard/chart-top-materials.tsx
// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { ChartTooltip } from "./chart-tooltip";

// type TopMaterial = { name: string; order_count: number };

// export function ChartTopMaterials({ data }: { data?: TopMaterial[] }) {
//   const safeData = (data ?? []).slice().reverse(); // biar ranking 1 di atas

//   return (
//     <Card className="h-[280px] md:h-[320px] border border-border/60 bg-card/90 backdrop-blur">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-sm font-semibold">Top 5 Materials</CardTitle>
//         <CardDescription className="text-[11px]">
//           Materials paling sering dipesan pada periode terakhir.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="h-[210px] md:h-[250px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={safeData}
//             layout="vertical"
//             margin={{ left: 40, right: 10, top: 10, bottom: 0 }}
//           >
//             <CartesianGrid
//               stroke="rgba(148,163,184,0.18)"
//               horizontal={true}
//               vertical={false}
//             />
//             <XAxis
//               type="number"
//               tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
//               axisLine={false}
//               tickLine={false}
//             />
//             <YAxis
//               type="category"
//               dataKey="name"
//               tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
//               width={120}
//               axisLine={false}
//               tickLine={false}
//             />
//             <Tooltip
//               content={
//                 <ChartTooltip
//                   labelFormatter={(label) => `${label}`}
//                   valueFormatter={(v) => `${v} tx`}
//                 />
//               }
//             />
//             <Bar
//               dataKey="order_count"
//               radius={[6, 6, 6, 6]}
//               fill="hsl(var(--chart-3))"
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }
// components/dashboard/chart-top-materials.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Package2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type TopMaterial = { name: string; order_count: number };

export function ChartTopMaterials({ data }: { data: TopMaterial[] }) {
  // urutkan dari terbesar
  // const sorted = [...data].sort(
  //   (a, b) => (b.order_count || 0) - (a.order_count || 0)
  // );
  // const max = sorted[0]?.order_count ?? 0;
  // const total = sorted.reduce((sum, m) => sum + (m.order_count || 0), 0);
  const safe = (data || []).map((d) => ({
  name: d.name ?? "Unknown",
  order_count: Number(d.order_count) || 0,
}));

const sorted = [...safe].sort(
  (a, b) => b.order_count - a.order_count
);

const max = sorted[0]?.order_count ?? 0;
const total = sorted.reduce((sum, m) => sum + m.order_count, 0);


  const shortName = (name: string) =>
    name.length > 26 ? name.slice(0, 26) + "…" : name;

  return (
    <Card className="border-none bg-card shadow-xl">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <span>Top 5 Materials</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Materials paling sering dipesan (SSE, last 30 days).
          </CardDescription>
        </div>

        <div className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Package2 className="h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-2">
        {/* Summary kecil di atas list */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Total order</span>
          <span className="tabular-nums font-medium">
            {total.toLocaleString("id-ID")} tx
          </span>
        </div>

        <div className="space-y-2">
          {sorted.map((item, idx) => {
            const value = item.order_count || 0;
            const share = total ? (value / total) * 100 : 0;
            const width = max ? `${(value / max) * 100}%` : "0%";

            const rank = idx + 1;

            const pillClass =
              rank === 1
                ? "bg-primary text-primary-foreground"
                : rank === 2
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : rank === 3
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                : "bg-muted text-muted-foreground";

            return (
              <div
                key={item.name}
                className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-background via-background to-background/60 px-3 py-2.5"
              >
                {/* bar background proportional */}
                <div
                  className="pointer-events-none absolute inset-y-1 left-1 rounded-lg bg-primary/8"
                  style={{ width }}
                />

                <div className="relative flex items-center gap-3">
                  {/* Rank pill */}
                  <div
                    className={cn(
                      "flex h-7 w-7 flex-none items-center justify-center rounded-full text-[11px] font-semibold shadow-sm",
                      pillClass
                    )}
                  >
                    {rank}
                  </div>

                  {/* Name + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="truncate text-xs font-medium">
                        {shortName(item.name)}
                      </p>
                      {rank === 1 && (
                        <ArrowUpRight className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="tabular-nums">
                        {value.toLocaleString("id-ID")} tx
                      </span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span className="tabular-nums">
                        {share.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {sorted.length === 0 && (
            <div className="flex h-32 items-center justify-center text-xs text-muted-foreground">
              Belum ada transaksi untuk ditampilkan.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
