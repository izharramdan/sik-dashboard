// // // components/dashboard/chart-transactions-30.tsx
// // "use client";

// // import {
// //   Area,
// //   AreaChart,
// //   CartesianGrid,
// //   ResponsiveContainer,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// // } from "recharts";
// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // type TxPoint = {
// //   date: string; // ISO string dari backend
// //   count: number;
// // };

// // export function ChartTransactions30({ data }: { data: TxPoint[] }) {
// //   // Transform date → label singkat (dd MMM)
// //   const mapped = data.map((d) => ({
// //     ...d,
// //     label: new Date(d.date).toLocaleDateString("id-ID", {
// //       day: "2-digit",
// //       month: "short",
// //     }),
// //   }));

// //   return (
// //     <Card className="border-none bg-card/80 backdrop-blur">
// //       <CardHeader className="pb-2">
// //         <CardTitle className="text-sm font-semibold">
// //           Volume Transaksi (30 Hari)
// //         </CardTitle>
// //         <p className="text-[11px] text-muted-foreground">
// //           Jumlah transaksi per hari untuk lokasi ini.
// //         </p>
// //       </CardHeader>
// //       <CardContent className="h-64">
// //         <ResponsiveContainer width="100%" height="100%">
// //           <AreaChart data={mapped}>
// //             <defs>
// //               <linearGradient id="txArea" x1="0" y1="0" x2="0" y2="1">
// //                 <stop
// //                   offset="0%"
// //                   stopColor="hsl(var(--primary))"
// //                   stopOpacity={0.35}
// //                 />
// //                 <stop
// //                   offset="100%"
// //                   stopColor="hsl(var(--primary))"
// //                   stopOpacity={0.02}
// //                 />
// //               </linearGradient>
// //             </defs>
// //             <CartesianGrid
// //               stroke="hsl(var(--border))"
// //               strokeDasharray="3 3"
// //               vertical={false}
// //             />
// //             <XAxis
// //               dataKey="label"
// //               tickLine={false}
// //               axisLine={false}
// //               tickMargin={8}
// //               tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
// //             />
// //             <YAxis
// //               tickLine={false}
// //               axisLine={false}
// //               tickMargin={8}
// //               width={32}
// //               tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
// //             />
// //             <Tooltip
// //               cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 0.5 }}
// //               contentStyle={{
// //                 background: "hsl(var(--popover))",
// //                 borderRadius: 10,
// //                 border: "1px solid hsl(var(--border))",
// //                 fontSize: 11,
// //               }}
// //               labelStyle={{ color: "hsl(var(--muted-foreground))" }}
// //               formatter={(value: any) => [`${value} tx`, "Jumlah Transaksi"]}
// //             />
// //             <Area
// //               type="monotone"
// //               dataKey="count"
// //               stroke="hsl(var(--primary))"
// //               strokeWidth={2}
// //               fill="url(#txArea)"
// //             />
// //           </AreaChart>
// //         </ResponsiveContainer>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // components/dashboard/chart-transactions-30.tsx
// "use client";

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { ChartTooltip } from "./chart-tooltip";

// type TimePoint = { date: string; count: number };

// export function ChartTransactions30({ data }: { data?: TimePoint[] }) {
//   const safeData = data ?? [];

//   return (
//     <Card className="h-[280px] md:h-[320px] border border-border/60 bg-card/90 backdrop-blur">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-sm font-semibold">
//           Volume Transaksi (30 Hari)
//         </CardTitle>
//         <CardDescription className="text-[11px]">
//           Jumlah transaksi per hari untuk lokasi ini.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="h-[210px] md:h-[250px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart
//             data={safeData}
//             margin={{ left: -20, right: 0, top: 10, bottom: 0 }}
//           >
//             <defs>
//               <linearGradient id="txGradient" x1="0" y1="0" x2="0" y2="1">
//                 {/* pakai chart-1 supaya kelihatan di dark & light */}
//                 <stop
//                   offset="0%"
//                   stopColor="hsl(var(--chart-1))"
//                   stopOpacity={0.35}
//                 />
//                 <stop
//                   offset="100%"
//                   stopColor="hsl(var(--chart-1))"
//                   stopOpacity={0.04}
//                 />
//               </linearGradient>
//             </defs>

//             <CartesianGrid
//               stroke="rgba(148,163,184,0.18)" // slate-400 transparan
//               strokeDasharray="4 4"
//               vertical={false}
//             />

//             <XAxis
//               dataKey="date"
//               tickMargin={8}
//               tick={{
//                 fill: "hsl(var(--muted-foreground))",
//                 fontSize: 11,
//               }}
//               axisLine={false}
//               tickLine={false}
//             />
//             <YAxis
//               tickMargin={8}
//               tick={{
//                 fill: "hsl(var(--muted-foreground))",
//                 fontSize: 11,
//               }}
//               axisLine={false}
//               tickLine={false}
//             />

//             <Tooltip
//               content={
//                 <ChartTooltip
//                   labelFormatter={(label) => `Tanggal: ${label}`}
//                   valueFormatter={(value) => `${value} tx`}
//                 />
//               }
//             />

//             <Area
//               type="monotone"
//               dataKey="count"
//               stroke="hsl(var(--chart-1))"
//               strokeWidth={2.4}
//               fill="url(#txGradient)"
//               dot={false}
//               activeDot={{
//                 r: 4,
//                 strokeWidth: 0,
//               }}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useChartTheme } from "@/lib/chart-theme";
import { ChartTooltip } from "./chart-tooltip";

type TimePoint = { date: string; count: number };

export function ChartTransactions30({ data }: { data: TimePoint[] }) {
  const theme = useChartTheme();

  // format label tanggal jadi "04 Nov"
  const formatDate = (value: string) => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <Card className="border-none bg-card shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Volume Transaksi (30 Hari)
        </CardTitle>
        <CardDescription className="text-xs">
          Jumlah transaksi per hari untuk lokasi ini.
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[260px] md:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="txArea" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={theme.primary}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={theme.primary}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke={theme.grid}
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: theme.axisMuted, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: theme.axis, strokeWidth: 0.5 }}
              minTickGap={20}
            />

            <YAxis
              tick={{ fill: theme.axisMuted, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              content={
                <ChartTooltip
                  labelFormatter={(label) => `Tanggal ${formatDate(label)}`}
                />
              }
            />

            <Area
              type="monotone"
              dataKey="count"
              name="Transaksi"
              stroke={theme.primary}
              strokeWidth={2}
              fill="url(#txArea)"
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
