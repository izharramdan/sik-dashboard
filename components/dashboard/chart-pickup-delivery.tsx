// // // components/dashboard/chart-pickup-delivery.tsx
// // "use client";

// // import {
// //   Pie,
// //   PieChart,
// //   ResponsiveContainer,
// //   Tooltip,
// //   Cell,
// //   Legend,
// // } from "recharts";
// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // type MethodDist = {
// //   method: string; // "Pick Up" | "Delivery" | "Lainnya"
// //   count: number;
// // };

// // const COLORS = [
// //   "hsl(var(--chart-1, var(--primary)))",
// //   "hsl(var(--chart-2, 160_84%_39%))",
// //   "hsl(var(--chart-3, 199_89%_48%))",
// // ];

// // export function ChartPickupDelivery({ data }: { data: MethodDist[] }) {
// //   const total = data.reduce((sum, d) => sum + (d.count || 0), 0);

// //   const withLabel = data.map((d) => ({
// //     ...d,
// //     label: d.method,
// //   }));

// //   return (
// //     <Card className="border-none bg-card/80 backdrop-blur">
// //       <CardHeader className="pb-2">
// //         <CardTitle className="text-sm font-semibold">
// //           Metode Pengambilan
// //         </CardTitle>
// //         <p className="text-[11px] text-muted-foreground">
// //           Distribusi Pick Up vs Delivery untuk transaksi APPROVED.
// //         </p>
// //       </CardHeader>
// //       <CardContent className="h-64">
// //         <ResponsiveContainer width="100%" height="100%">
// //           <PieChart>
// //             <Tooltip
// //               contentStyle={{
// //                 background: "hsl(var(--popover))",
// //                 borderRadius: 10,
// //                 border: "1px solid hsl(var(--border))",
// //                 fontSize: 11,
// //               }}
// //               formatter={(value: any, _name, item: any) => [
// //                 `${value} tx`,
// //                 item?.payload?.method,
// //               ]}
// //             />
// //             <Legend
// //               verticalAlign="bottom"
// //               align="center"
// //               iconType="circle"
// //               wrapperStyle={{ fontSize: 11 }}
// //               formatter={(value: any) => (
// //                 <span className="text-[11px] text-muted-foreground">
// //                   {value}
// //                 </span>
// //               )}
// //             />
// //             <Pie
// //               data={withLabel}
// //               dataKey="count"
// //               nameKey="label"
// //               innerRadius="55%"
// //               outerRadius="80%"
// //               paddingAngle={2}
// //             >
// //               {withLabel.map((entry, index) => (
// //                 <Cell key={entry.method} fill={COLORS[index % COLORS.length]} />
// //               ))}
// //             </Pie>

// //             {/* Label total di tengah donut */}
// //             <foreignObject x="40%" y="40%" width="20%" height="20%">
// //               <div className="flex h-full w-full flex-col items-center justify-center text-[11px]">
// //                 <span className="text-muted-foreground">Total</span>
// //                 <span className="text-sm font-semibold tabular-nums">
// //                   {total.toLocaleString("id-ID")}
// //                 </span>
// //               </div>
// //             </foreignObject>
// //           </PieChart>
// //         </ResponsiveContainer>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // components/dashboard/chart-delivery-method.tsx
// "use client";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
// } from "recharts";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { ChartTooltip } from "./chart-tooltip";

// type MethodDist = { method: string; count: number };

// const COLORS = [
//   "hsl(var(--chart-1))",
//   "hsl(var(--chart-2))",
//   "hsl(var(--chart-3))",
// ];

// export function DeliveryMethodDonut({ data }: { data?: MethodDist[] }) {
//   const safeData = data ?? [];
//   const total = safeData.reduce((sum, d) => sum + (d.count || 0), 0);

//   return (
//     <Card className="h-[280px] md:h-[320px] border border-border/60 bg-card/90 backdrop-blur">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-sm font-semibold">
//           Metode Pengambilan
//         </CardTitle>
//         <CardDescription className="text-[11px]">
//           Distribusi Pick Up vs Delivery untuk transaksi APPROVED.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="h-[210px] md:h-[250px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Tooltip
//               content={
//                 <ChartTooltip
//                   labelFormatter={(label) => `Metode: ${label}`}
//                   valueFormatter={(v) => `${v} tx`}
//                 />
//               }
//             />
//             <Legend
//               verticalAlign="bottom"
//               align="center"
//               iconType="circle"
//               formatter={(value) => (
//                 <span className="text-[11px] text-muted-foreground">
//                   {value}
//                 </span>
//               )}
//             />

//             <Pie
//               data={safeData}
//               dataKey="count"
//               nameKey="method"
//               innerRadius="60%"
//               outerRadius="80%"
//               paddingAngle={2}
//             >
//               {safeData.map((entry, index) => (
//                 <Cell
//                   key={entry.method}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>

//             {/* Total di tengah */}
//             <foreignObject x="40%" y="40%" width="20%" height="20%">
//               <div className="flex h-full w-full flex-col items-center justify-center text-[11px]">
//                 <span className="text-muted-foreground">Total</span>
//                 <span className="text-sm font-semibold tabular-nums">
//                   {total.toLocaleString("id-ID")}
//                 </span>
//               </div>
//             </foreignObject>
//           </PieChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }
// components/dashboard/chart-pickup-delivery.tsx
"use client";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
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

type MethodDist = { method: string; count: number | string };

export function ChartPickupDelivery({ data }: { data: MethodDist[] }) {
  const theme = useChartTheme();

  // Normalisasi ke number & mapping pickup / delivery
  const pickup = Number(
    data.find((d) => d.method.toLowerCase().includes("pick"))?.count ?? 0
  );
  const delivery = Number(
    data.find((d) => d.method.toLowerCase().includes("deliver"))?.count ?? 0
  );

  const total = pickup + delivery;

  // Handling tidak ada data
  if (!data || data.length === 0 || total === 0) {
    return (
      <Card className="border-none bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Pickup vs Delivery
          </CardTitle>
          <CardDescription className="text-xs">
            Distribusi metode pengambilan untuk transaksi APPROVED.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[260px] flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            Belum ada data transaksi untuk periode ini.
          </p>
        </CardContent>
      </Card>
    );
  }

  const radialData = [
    {
      name: "Pickup",
      value: pickup,
      fill: theme.primary,
    },
    {
      name: "Delivery",
      value: delivery,
      fill: theme.secondary,
    },
  ];

  return (
    <Card className="border-none bg-card shadow-xl">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-semibold">
            Pickup vs Delivery
          </CardTitle>
          <CardDescription className="text-xs">
            Perbandingan metode pengambilan untuk transaksi APPROVED.
          </CardDescription>
        </div>

        {/* Mini legend */}
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
            <span>Pickup</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: theme.secondary }}
            />
            <span>Delivery</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[260px] md:h-[280px] flex items-center">
        <div className="w-full h-full flex">
          <div className="w-2/3 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={radialData}
                innerRadius="40%"
                outerRadius="85%"
                startAngle={225}
                endAngle={-45}
              >
                <PolarAngleAxis type="number" domain={[0, total]} tick={false} />
                <Tooltip
                  content={
                    <ChartTooltip
                      labelFormatter={(name) => {
                        if (name === 0 || name === "0") return "Pickup";
                        if (name === 1 || name === "1") return "Otodoke / Delivery";
                        return `Metode: ${name}`;
                      }}
                    />
                  }
                />

                <RadialBar
                  dataKey="value"
                  background
                  cornerRadius={9999}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary di kanan */}
          <div className="w-1/3 flex flex-col justify-center gap-3 text-[11px]">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Total transaksi
              </p>
              <p className="text-2xl font-semibold tabular-nums">
                {total.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between rounded-lg bg-muted/60 px-2 py-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span className="text-xs text-muted-foreground">
                    Pickup
                  </span>
                </div>
                <span className="text-xs font-semibold tabular-nums">
                  {pickup.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted/60 px-2 py-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <span className="text-xs text-muted-foreground">
                    Delivery
                  </span>
                </div>
                <span className="text-xs font-semibold tabular-nums">
                  {delivery.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Persentase */}
            <div className="mt-1 text-[10px] text-muted-foreground">
              <p>
                Pickup:{" "}
                <span className="font-semibold">
                  {((pickup / total) * 100).toFixed(1)}%
                </span>
              </p>
              <p>
                Delivery:{" "}
                <span className="font-semibold">
                  {((delivery / total) * 100).toFixed(1)}%
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
