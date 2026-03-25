// "use client";

// import {
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   LabelList,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import type { DashboardFilters } from "./FilterBar";

// type Props = {
//   filters: DashboardFilters;
// };

// // Dummy – nanti dari API
// const dummyOverview = {
//   totalBudget: 1000, // Mio IDR
//   cummPlan: 583.3,
//   cummActual: 552.0,
//   remaining: 448.0,
//   realizationPct: 95,
// };

// // Satu bar per metric (premium & jelas)
// const barData = [
//   {
//     label: "Plan",
//     value: dummyOverview.cummPlan,
//     color: "url(#planGradient)",
//   },
//   {
//     label: "Actual",
//     value: dummyOverview.cummActual,
//     color: "url(#actualGradient)",
//   },
//   {
//     label: "Remain",
//     value: dummyOverview.remaining,
//     color: "url(#remainingGradient)",
//   },
//   {
//     label: "Budget",
//     value: dummyOverview.totalBudget,
//     color: "url(#budgetGradient)",
//   },
// ];

// // Tooltip premium (opsional)
// function CustomTooltip({ active, payload }: any) {
//   if (!active || !payload || payload.length === 0) return null;
//   const data = payload[0].payload;

//   return (
//     <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm text-xs">
//       <div className="font-semibold mb-2">{data.label}</div>

//       <div className="flex justify-between">
//         <span>Value</span>
//         <span className="font-semibold">{data.value.toFixed(1)}</span>
//       </div>
//     </div>
//   );
// }

// export function OverviewRealizationCard({ filters }: Props) {
//   return (
//     <Card className="rounded-xl border border-slate-200 shadow-sm">
//       <CardHeader className="pb-1 flex flex-row items-start justify-between">
//         <CardTitle className="text-sm font-semibold text-slate-900">
//           Overview Realization
//         </CardTitle>
//         <span className="text-[11px] text-muted-foreground">(Mio IDR)</span>
//       </CardHeader>

//       <CardContent>

//         {/* Badge */}
//         <div className="flex flex-col items-center mb-3">
//           <span className="text-[11px] font-semibold text-slate-900">% Realization</span>
//           <div className="mt-1 px-4 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
//             <span className="text-xs font-semibold text-emerald-700">
//               {dummyOverview.realizationPct}%
//             </span>
//           </div>
//         </div>

//         {/* Chart area */}
//         <div className="h-44 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={barData}
//               margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
//             >
//               {/* Premium gradients */}
//               <defs>
//                 <linearGradient id="planGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.9} />
//                   <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0.7} />
//                 </linearGradient>

//                 <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
//                   <stop offset="100%" stopColor="#86efac" stopOpacity={0.7} />
//                 </linearGradient>

//                 <linearGradient id="remainingGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.9} />
//                   <stop offset="100%" stopColor="#bfdbfe" stopOpacity={0.7} />
//                 </linearGradient>

//                 <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#475569" stopOpacity={0.9} />
//                   <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.7} />
//                 </linearGradient>
//               </defs>

//               <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

//               {/* Labels */}
//               <XAxis
//                 dataKey="label"
//                 tick={{ fontSize: 11, fill: "#475569", fontWeight: 600 }}
//                 axisLine={false}
//                 tickLine={false}
//               />

//               {/* Y axis disembunyikan supaya clean */}
//               <YAxis hide />

//               <Tooltip content={<CustomTooltip />} cursor={false} />

//               <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
//                 {/* Label above bar */}
//                 <LabelList
//                   dataKey="value"
//                   position="top"
//                   formatter={(v: any) => v.toFixed(1)}
//                   className="text-[11px] fill-slate-800"
//                 />

//                 {/* Bar gradient per item */}
//                 {barData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
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
  LabelList,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { DashboardFilters } from "./FilterBar";

type Props = {
  filters: DashboardFilters;
};

const dummyOverview = {
  totalBudget: 1000,
  cummPlan: 583.3,
  cummActual: 552.0,
  remaining: 448.0,
  realizationPct: 95,
};

const barData = [
  {
    label: "Plan",
    value: dummyOverview.cummPlan,
    color: "url(#planGradient)",
  },
  {
    label: "Actual",
    value: dummyOverview.cummActual,
    color: "url(#actualGradient)",
  },
  {
    label: "Remain",
    value: dummyOverview.remaining,
    color: "url(#remainingGradient)",
  },
  {
    label: "Budget",
    value: dummyOverview.totalBudget,
    color: "url(#budgetGradient)",
  },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;

  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-sm text-xs">
      <div className="font-semibold mb-2 text-foreground">
        {data.label}
      </div>

      <div className="flex justify-between text-foreground">
        <span>Value</span>
        <span className="font-semibold">
          {data.value.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export function OverviewRealizationCard({ filters }: Props) {
  return (
    <Card className="rounded-xl border border-border shadow-sm bg-card">
      <CardHeader className="pb-1 flex flex-row items-start justify-between">
        <CardTitle className="text-sm font-semibold text-foreground">
          Overview Realization
        </CardTitle>
        <span className="text-[11px] text-muted-foreground">(Mio IDR)</span>
      </CardHeader>

      <CardContent>
        {/* Badge */}
        <div className="flex flex-col items-center mb-3">
          <span className="text-[11px] font-semibold text-foreground">
            % Realization
          </span>
          <div className="mt-1 px-4 py-0.5 rounded-full bg-emerald-600/10 border border-emerald-600/30">
            <span className="text-xs font-semibold text-emerald-500">
              {dummyOverview.realizationPct}%
            </span>
          </div>
        </div>

        {/* Chart area */}
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="planGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0.7} />
                </linearGradient>

                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#86efac" stopOpacity={0.7} />
                </linearGradient>

                <linearGradient id="remainingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#bfdbfe" stopOpacity={0.7} />
                </linearGradient>

                <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#475569" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.7} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis hide />

              <Tooltip content={<CustomTooltip />} cursor={false} />

              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(v: any) => v.toFixed(1)}
                  className="text-[11px] fill-slate-800 dark:fill-slate-100"
                />

                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
