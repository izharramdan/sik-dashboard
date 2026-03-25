// "use client";

// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import type { DashboardFilters } from "./FilterBar";

// type Props = {
//   filters: DashboardFilters;
// };

// // 12 bulan dummy, nanti ganti dari API
// const baseData = [
//   { month: "Jan", plan: 100, actual: 95 },
//   { month: "Feb", plan: 110, actual: 120 },
//   { month: "Mar", plan: 105, actual: 90 },
//   { month: "Apr", plan: 115, actual: 130 },
//   { month: "May", plan: 120, actual: 140 },
//   { month: "Jun", plan: 130, actual: 135 },
//   { month: "Jul", plan: 125, actual: 150 },
//   { month: "Aug", plan: 140, actual: 145 },
//   { month: "Sep", plan: 135, actual: 120 },
//   { month: "Oct", plan: 150, actual: 160 },
//   { month: "Nov", plan: 145, actual: 155 },
//   { month: "Dec", plan: 160, actual: 170 },
// ];

// // Tambah kolom % realization (actual / plan * 100)
// const dummyData = baseData.map((row) => {
//   const realization =
//     row.plan > 0 ? (row.actual / row.plan) * 100 : null;
//   return { ...row, realization };
// });

// function formatNumber(value: number) {
//   return value.toLocaleString("id-ID");
// }

// // Untuk highlight bulan sekarang
// const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// const currentMonthLabel = monthNames[new Date().getMonth()];

// // Custom tooltip premium
// type CustomTooltipProps = {
//   active?: boolean;
//   payload?: any[];
//   label?: string;
// };

// function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
//   if (!active || !payload || payload.length === 0) return null;

//   const data = payload[0].payload;
//   const realization = data.realization as number | null;

//   return (
//     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm text-xs">
//       <div className="font-semibold mb-1">Month: {label}</div>

//       <div className="flex justify-between gap-4">
//         <span>Plan</span>
//         <span className="font-semibold">
//           {formatNumber(data.plan)}
//         </span>
//       </div>

//       <div className="flex justify-between gap-4">
//         <span>Actual</span>
//         <span className="font-semibold text-emerald-700">
//           {formatNumber(data.actual)}
//         </span>
//       </div>

//       {realization !== null && (
//         <div className="mt-1 flex justify-between gap-4">
//           <span>% Realization</span>
//           <span
//             className={
//               "font-semibold " +
//               (realization >= 100
//                 ? "text-emerald-600"
//                 : realization >= 90
//                 ? "text-amber-600"
//                 : "text-red-500")
//             }
//           >
//             {realization.toFixed(1)}%
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export function MonthlyRealizationChart({ filters }: Props) {
//   return (
//     <Card className="h-[360px]">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-sm font-semibold">
//           Monthly Realization (Plan vs Actual)
//         </CardTitle>
//         <p className="text-[11px] text-muted-foreground">
//           Dummy data – akan diganti data dari API berdasarkan filter.
//         </p>
//       </CardHeader>

//       <CardContent className="h-[280px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={dummyData}
//             margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
//           >
//             {/* Grid halus */}
//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

//             {/* Axis X: bulan */}
//             <XAxis
//               dataKey="month"
//               tick={{ fontSize: 11, fill: "#6b7280" }}
//               axisLine={{ stroke: "#e5e7eb" }}
//               tickLine={{ stroke: "#e5e7eb" }}
//             />

//             {/* Axis Y: angka diformat */}
//             <YAxis
//               tick={{ fontSize: 11, fill: "#6b7280" }}
//               axisLine={{ stroke: "#e5e7eb" }}
//               tickLine={{ stroke: "#e5e7eb" }}
//               tickFormatter={(value) => formatNumber(Number(value))}
//             />

//             {/* Tooltip custom */}
//             <Tooltip content={<CustomTooltip />} />

//             {/* Legend */}
//             <Legend
//               verticalAlign="top"
//               height={24}
//               formatter={(value) => (
//                 <span className="text-[12px] font-medium">{value}</span>
//               )}
//             />

//             {/* Garis Plan – abu kebiruan, dashed */}
//             <Line
//               type="monotone"
//               dataKey="plan"
//               name="Plan"
//               stroke="#94a3b8"        // slate-ish
//               strokeWidth={2}
//               strokeDasharray="5 5"
//               dot={(props: any) => {
//                 const isCurrent =
//                   props.payload.month === currentMonthLabel;
//                 return (
//                   <circle
//                     cx={props.cx}
//                     cy={props.cy}
//                     r={isCurrent ? 4 : 3}
//                     fill="#ffffff"
//                     stroke="#94a3b8"
//                     strokeWidth={isCurrent ? 2 : 1.5}
//                   />
//                 );
//               }}
//               activeDot={{ r: 6 }}
//             />

//             {/* Garis Actual – hijau lebih tebal */}
//             <Line
//               type="monotone"
//               dataKey="actual"
//               name="Actual"
//               stroke="#22c55e"
//               strokeWidth={3}
//               dot={(props: any) => {
//                 const isCurrent =
//                   props.payload.month === currentMonthLabel;
//                 return (
//                   <circle
//                     cx={props.cx}
//                     cy={props.cy}
//                     r={isCurrent ? 5 : 4}
//                     fill={isCurrent ? "#22c55e" : "#bbf7d0"}
//                     stroke="#16a34a"
//                     strokeWidth={isCurrent ? 2 : 1.5}
//                   />
//                 );
//               }}
//               activeDot={{ r: 7 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { DashboardFilters } from "./FilterBar";

type Props = {
  filters: DashboardFilters;
};

// 12 bulan dummy, nanti ganti dari API
const baseData = [
  { month: "Jan", plan: 100, actual: 95 },
  { month: "Feb", plan: 110, actual: 120 },
  { month: "Mar", plan: 105, actual: 90 },
  { month: "Apr", plan: 115, actual: 130 },
  { month: "May", plan: 120, actual: 140 },
  { month: "Jun", plan: 130, actual: 135 },
  { month: "Jul", plan: 125, actual: 150 },
  { month: "Aug", plan: 140, actual: 145 },
  { month: "Sep", plan: 135, actual: 120 },
  { month: "Oct", plan: 150, actual: 160 },
  { month: "Nov", plan: 145, actual: 155 },
  { month: "Dec", plan: 160, actual: 170 },
];

const dummyData = baseData.map((row) => {
  const realization = row.plan > 0 ? (row.actual / row.plan) * 100 : null;
  return { ...row, realization };
});

function formatNumber(value: number) {
  return value.toLocaleString("id-ID");
}

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const currentMonthLabel = monthNames[new Date().getMonth()];

type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const realization = data.realization as number | null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-sm text-xs">
      <div className="font-semibold mb-1 text-foreground">Month: {label}</div>

      <div className="flex justify-between gap-4 text-foreground">
        <span>Plan</span>
        <span className="font-semibold">
          {formatNumber(data.plan)}
        </span>
      </div>

      <div className="flex justify-between gap-4">
        <span>Actual</span>
        <span className="font-semibold text-emerald-500">
          {formatNumber(data.actual)}
        </span>
      </div>

      {realization !== null && (
        <div className="mt-1 flex justify-between gap-4">
          <span>% Realization</span>
          <span
            className={
              "font-semibold " +
              (realization >= 100
                ? "text-emerald-500"
                : realization >= 90
                ? "text-amber-500"
                : "text-red-500")
            }
          >
            {realization.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}

export function MonthlyRealizationChart({ filters }: Props) {
  return (
    <Card className="h-[360px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground">
          Monthly Realization (Plan vs Actual)
        </CardTitle>
        <p className="text-[11px] text-muted-foreground">
          Dummy data – akan diganti data dari API berdasarkan filter.
        </p>
      </CardHeader>

      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dummyData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
            />

            <YAxis
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) => formatNumber(Number(value))}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              height={24}
              formatter={(value) => (
                <span className="text-[12px] font-medium text-foreground">
                  {value}
                </span>
              )}
            />

            <Line
              type="monotone"
              dataKey="plan"
              name="Plan"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={(props: any) => {
                const isCurrent =
                  props.payload.month === currentMonthLabel;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={isCurrent ? 4 : 3}
                    fill="var(--background)"
                    stroke="#94a3b8"
                    strokeWidth={isCurrent ? 2 : 1.5}
                  />
                );
              }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#22c55e"
              strokeWidth={3}
              dot={(props: any) => {
                const isCurrent =
                  props.payload.month === currentMonthLabel;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={isCurrent ? 5 : 4}
                    fill={isCurrent ? "#22c55e" : "#bbf7d0"}
                    stroke="#16a34a"
                    strokeWidth={isCurrent ? 2 : 1.5}
                  />
                );
              }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
