// "use client";

// import {
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import type { DashboardFilters } from "./FilterBar";

// type Props = {
//   filters: DashboardFilters;
// };

// // ===== 12 MONTHS DUMMY DATA (nanti ganti dari API) =====
// const baseCost = [
//   { month: "Jan", cost: 150_000_000 },
//   { month: "Feb", cost: 180_000_000 },
//   { month: "Mar", cost: 130_000_000 },
//   { month: "Apr", cost: 200_000_000 },
//   { month: "May", cost: 170_000_000 },
//   { month: "Jun", cost: 190_000_000 },
//   { month: "Jul", cost: 210_000_000 },
//   { month: "Aug", cost: 160_000_000 },
//   { month: "Sep", cost: 120_000_000 },
//   { month: "Oct", cost: 230_000_000 },
//   { month: "Nov", cost: 250_000_000 },
//   { month: "Dec", cost: 300_000_000 },
// ];

// // Tambahkan delta & deltaPct vs bulan sebelumnya
// const monthlyCost = baseCost.map((row, idx, arr) => {
//   if (idx === 0) return { ...row, delta: null, deltaPct: null };

//   const prev = arr[idx - 1].cost;
//   const delta = row.cost - prev;
//   const deltaPct = (delta / prev) * 100;

//   return { ...row, delta, deltaPct };
// });

// // Map current month (untuk highlight bar)
// const monthNames = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// const currentMonthLabel = monthNames[new Date().getMonth()];

// function formatRupiah(value: number) {
//   return `Rp ${value.toLocaleString("id-ID")}`;
// }

// // Custom tooltip biar bisa tampilkan delta MoM
// type CustomTooltipProps = {
//   active?: boolean;
//   payload?: any[];
//   label?: string;
// };

// function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
//   if (!active || !payload || payload.length === 0) return null;

//   const data = payload[0].payload;
//   const delta = data.delta as number | null;
//   const deltaPct = data.deltaPct as number | null;

//   const isUp = delta !== null && delta > 0;
//   const isDown = delta !== null && delta < 0;

//   return (
//     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm text-xs">
//       <div className="font-semibold mb-1">Month: {label}</div>
//       <div className="flex justify-between gap-4">
//         <span>Cost</span>
//         <span className="font-semibold">{formatRupiah(data.cost)}</span>
//       </div>

//       {delta !== null && (
//   <span
//     className={
//       "font-semibold " +
//       (delta > 0
//         ? "text-emerald-600"
//         : delta < 0
//         ? "text-red-500"
//         : "text-slate-600")
//     }
//   >
//     {delta > 0 ? "+" : ""}
//     {deltaPct!.toFixed(1)}%
//   </span>
// )}

//     </div>
//   );
// }

// export function MonthlyCostBarChart({ filters }: Props) {
//   return (
//     <Card className="h-[360px]">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-sm font-semibold">
//           Monthly Cost
//         </CardTitle>
//         <p className="text-[11px] text-muted-foreground">
//           Total cost per month (dummy) – nanti disambungkan ke API.
//         </p>
//       </CardHeader>

//       <CardContent className="h-[280px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={monthlyCost}
//             margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
//           >
//             {/* Gradient untuk bar */}
//             <defs>
//               <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.95} />
//                 <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.5} />
//               </linearGradient>
//               <linearGradient
//                 id="currentMonthGradient"
//                 x1="0"
//                 y1="0"
//                 x2="0"
//                 y2="1"
//               >
//                 <stop offset="0%" stopColor="#22c55e" stopOpacity={0.95} />
//                 <stop offset="100%" stopColor="#22c55e" stopOpacity={0.6} />
//               </linearGradient>
//             </defs>

//             {/* Grid */}
//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

//             {/* Axis X: bulan */}
//             <XAxis
//               dataKey="month"
//               tick={{ fontSize: 11, fill: "#6b7280" }}
//               axisLine={{ stroke: "#e5e7eb" }}
//               tickLine={{ stroke: "#e5e7eb" }}
//             />

//             {/* Axis Y: Rp dalam juta (M) */}
//             <YAxis
//               tick={{ fontSize: 11, fill: "#6b7280" }}
//               axisLine={{ stroke: "#e5e7eb" }}
//               tickLine={{ stroke: "#e5e7eb" }}
//               tickFormatter={(value) => {
//                 const inM = Number(value) / 1_000_000;
//                 return `Rp ${inM.toFixed(0)}M`;
//               }}
//             />

//             {/* Tooltip custom */}
//             <Tooltip content={<CustomTooltip />} />

//             {/* Bar dengan gradient & highlight current month */}
//             <Bar
//               dataKey="cost"
//               name="Cost"
//               radius={[6, 6, 0, 0]}
//               maxBarSize={40}
//             >
//               {monthlyCost.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={
//                     entry.month === currentMonthLabel
//                       ? "url(#currentMonthGradient)"
//                       : "url(#costGradient)"
//                   }
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { DashboardFilters } from "./FilterBar";

type Props = {
  filters: DashboardFilters;
};

// ===== 12 MONTHS DUMMY DATA (nanti ganti dari API) =====
const baseCost = [
  { month: "Jan", cost: 150_000_000 },
  { month: "Feb", cost: 180_000_000 },
  { month: "Mar", cost: 130_000_000 },
  { month: "Apr", cost: 200_000_000 },
  { month: "May", cost: 170_000_000 },
  { month: "Jun", cost: 190_000_000 },
  { month: "Jul", cost: 210_000_000 },
  { month: "Aug", cost: 160_000_000 },
  { month: "Sep", cost: 120_000_000 },
  { month: "Oct", cost: 230_000_000 },
  { month: "Nov", cost: 250_000_000 },
  { month: "Dec", cost: 300_000_000 },
];

// Tambahkan delta & deltaPct vs bulan sebelumnya
const monthlyCost = baseCost.map((row, idx, arr) => {
  if (idx === 0) return { ...row, delta: null as number | null, deltaPct: null as number | null };

  const prev = arr[idx - 1].cost;
  const delta = row.cost - prev;
  const deltaPct = (delta / prev) * 100;

  return { ...row, delta, deltaPct };
});

// Map current month (untuk highlight bar)
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const currentMonthLabel = monthNames[new Date().getMonth()];

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

// Custom tooltip biar bisa tampilkan delta MoM
type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const delta = data.delta as number | null;
  const deltaPct = data.deltaPct as number | null;

  const isUp = delta !== null && delta > 0;
  const isDown = delta !== null && delta < 0;

  return (
    <div className="rounded-lg border border-slate-700 bg-[#020617] px-3 py-2 shadow-sm text-xs text-slate-100">
      <div className="font-semibold mb-1">Month: {label}</div>

      <div className="flex justify-between gap-4 mb-1">
        <span>Cost</span>
        <span className="font-semibold">{formatRupiah(data.cost)}</span>
      </div>

      {delta !== null && deltaPct !== null && (
        <div className="flex justify-between gap-4">
          <span>MoM Change</span>
          <span
            className={
              "font-semibold " +
              (isUp
                ? "text-emerald-400"
                : isDown
                ? "text-red-400"
                : "text-slate-200")
            }
          >
            {delta > 0 ? "+" : ""}
            {deltaPct.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}

export function MonthlyCostBarChart({ filters }: Props) {
  return (
    <Card className="h-[360px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Monthly Cost
        </CardTitle>
        <p className="text-[11px] text-muted-foreground">
          Total cost per month (dummy) – nanti disambungkan ke API.
        </p>
      </CardHeader>

      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyCost}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            {/* Gradient untuk bar */}
            <defs>
              <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.5} />
              </linearGradient>
              <linearGradient
                id="currentMonthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />

            {/* Axis X: bulan */}
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#e5e7eb" }}          // terang utk dark mode
              axisLine={{ stroke: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
            />

            {/* Axis Y: Rp dalam juta (M) */}
            <YAxis
              tick={{ fontSize: 11, fill: "#e5e7eb" }}          // angka juga terang
              axisLine={{ stroke: "#6b7280" }}
              tickLine={{ stroke: "#6b7280" }}
              tickFormatter={(value) => {
                const inM = Number(value) / 1_000_000;
                return `Rp ${inM.toFixed(0)}M`;
              }}
            />

            {/* Tooltip custom */}
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.12)" }} />

            {/* Bar dengan gradient & highlight current month */}
            <Bar
              dataKey="cost"
              name="Cost"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            >
              {monthlyCost.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.month === currentMonthLabel
                      ? "url(#currentMonthGradient)"
                      : "url(#costGradient)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
