// // "use client";

// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";
// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// // const COLORS = [
// //   "#0ea5e9",
// //   "#22c55e",
// //   "#6366f1",
// //   "#f97316",
// //   "#ec4899",
// //   "#14b8a6",
// //   "#a855f7",
// //   "#facc15",
// //   "#6b7280",
// //   "#475569",
// // ];

// // // Dummy – nanti dari API (top 10 by cost periode)
// // const top10Materials = [
// //   { code: "MAT001", name: "Ballpoint Black", totalCost: 50_000_000 },
// //   { code: "MAT002", name: "Catridge 93A", totalCost: 42_000_000 },
// //   { code: "MAT003", name: "Marker Paint Orange", totalCost: 35_000_000 },
// //   { code: "MAT004", name: "Sarung Tangan 6 Benang", totalCost: 30_000_000 },
// //   { code: "MAT005", name: "Arm Protector", totalCost: 25_000_000 },
// //   { code: "MAT006", name: "Sarung Tangan 5 Benang", totalCost: 20_000_000 },
// //   { code: "MAT007", name: "Masker Dust", totalCost: 18_000_000 },
// //   { code: "MAT008", name: "Face Shield", totalCost: 16_000_000 },
// //   { code: "MAT009", name: "Safety Helmet", totalCost: 15_000_000 },
// //   { code: "MAT010", name: "Safety Shoes", totalCost: 12_000_000 },
// // ];

// // function formatRupiah(v: number) {
// //   return `Rp ${v.toLocaleString("id-ID")}`;
// // }

// // type Props = {
// //   // opsional: kalau mau klik slice, kirim ke parent
// //   onSelectMaterial?: (code: string) => void;
// // };

// // export function TopMaterialPieChart({ onSelectMaterial }: Props) {
// //   const total = top10Materials.reduce(
// //     (sum, m) => sum + m.totalCost,
// //     0
// //   );

// //   return (
// //     <Card className="h-[360px]">
// //       <CardHeader className="pb-2 flex justify-between items-start">
// //         <div>
// //           <CardTitle className="text-sm font-semibold">
// //             Top 10 Material by Cost
// //           </CardTitle>
// //           <p className="text-[11px] text-muted-foreground">
// //             Share per material – periode aktif.
// //           </p>
// //         </div>
// //         {/* nanti bisa diganti dengan period selector */}
// //         <span className="text-[11px] text-muted-foreground">
// //           Period: this year
// //         </span>
// //       </CardHeader>

// //       <CardContent className="h-[280px] flex">
// //         <div className="w-2/3 h-full">
// //           <ResponsiveContainer width="100%" height="100%">
// //             <PieChart>
// //               <Pie
// //                 data={top10Materials}
// //                 dataKey="totalCost"
// //                 nameKey="name"
// //                 cx="50%"
// //                 cy="50%"
// //                 outerRadius={90}
// //                 innerRadius={45}
// //                 paddingAngle={2}
// //                 onClick={(data: any) =>
// //                   onSelectMaterial && onSelectMaterial(data.code)
// //                 }
// //               >
// //                 {top10Materials.map((entry, index) => (
// //                   <Cell
// //                     key={entry.code}
// //                     fill={COLORS[index % COLORS.length]}
// //                     cursor={onSelectMaterial ? "pointer" : "default"}
// //                   />
// //                 ))}
// //               </Pie>

// //               <Tooltip
// //                 contentStyle={{
// //                   borderRadius: 8,
// //                   borderColor: "#e5e7eb",
// //                   fontSize: 11,
// //                 }}
// //                 formatter={(value: any, _name: any, props: any) => {
// //                   const cost = Number(value);
// //                   const share = (cost / total) * 100;
// //                   return [
// //                     `${formatRupiah(cost)} (${share.toFixed(1)}%)`,
// //                     props.payload.name,
// //                   ];
// //                 }}
// //               />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>

// //         {/* Legend custom di kanan */}
// //         <div className="w-1/3 h-full pl-2 flex flex-col gap-1 overflow-auto">
// //           <div className="text-[11px] font-semibold text-slate-700 mb-1">
// //             Top 10 List
// //           </div>
// //           {top10Materials.map((m, i) => {
// //             const share = (m.totalCost / total) * 100;
// //             return (
// //               <button
// //                 key={m.code}
// //                 type="button"
// //                 onClick={() => onSelectMaterial?.(m.code)}
// //                 className="flex items-center gap-2 text-left text-[11px] hover:bg-slate-50 rounded px-1 py-0.5"
// //               >
// //                 <span
// //                   className="inline-block h-2.5 w-2.5 rounded-sm"
// //                   style={{ backgroundColor: COLORS[i % COLORS.length] }}
// //                 />
// //                 <div className="flex-1">
// //                   <div className="truncate">{m.name}</div>
// //                   <div className="text-[10px] text-slate-500">
// //                     {share.toFixed(1)}% · {Math.round(m.totalCost / 1_000_000)}M
// //                   </div>
// //                 </div>
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// "use client";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// const COLORS = [
//   "#0ea5e9",
//   "#22c55e",
//   "#6366f1",
//   "#f97316",
//   "#ec4899",
//   "#14b8a6",
//   "#a855f7",
//   "#facc15",
//   "#6b7280",
//   "#475569",
// ];

// const top10Materials = [
//   { code: "MAT001", name: "Ballpoint Black", totalCost: 50_000_000 },
//   { code: "MAT002", name: "Catridge 93A", totalCost: 42_000_000 },
//   { code: "MAT003", name: "Marker Paint Orange", totalCost: 35_000_000 },
//   { code: "MAT004", name: "Sarung Tangan 6 Benang", totalCost: 30_000_000 },
//   { code: "MAT005", name: "Arm Protector", totalCost: 25_000_000 },
//   { code: "MAT006", name: "Sarung Tangan 5 Benang", totalCost: 20_000_000 },
//   { code: "MAT007", name: "Masker Dust", totalCost: 18_000_000 },
//   { code: "MAT008", name: "Face Shield", totalCost: 16_000_000 },
//   { code: "MAT009", name: "Safety Helmet", totalCost: 15_000_000 },
//   { code: "MAT010", name: "Safety Shoes", totalCost: 12_000_000 },
// ];

// function formatRupiah(v: number) {
//   return `Rp ${v.toLocaleString("id-ID")}`;
// }

// type TopMaterialPieProps = {
//   onSelectMaterial?: (code: string) => void;
// };

// export function TopMaterialPieChart({ onSelectMaterial }: TopMaterialPieProps) {
//   const total = top10Materials.reduce(
//     (sum, m) => sum + m.totalCost,
//     0
//   );

//   return (
//     <Card className="h-[360px]">
//       <CardHeader className="pb-2 flex justify-between items-start">
//         <div>
//           <CardTitle className="text-sm font-semibold text-foreground">
//             Top 10 Material by Cost
//           </CardTitle>
//           <p className="text-[11px] text-muted-foreground">
//             Share per material – periode aktif.
//           </p>
//         </div>
//         <span className="text-[11px] text-muted-foreground">
//           Period: this year
//         </span>
//       </CardHeader>

//       <CardContent className="h-[280px] flex">
//         <div className="w-2/3 h-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={top10Materials}
//                 dataKey="totalCost"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={90}
//                 innerRadius={45}
//                 paddingAngle={2}
//                 onClick={(data: any) =>
//                   onSelectMaterial && onSelectMaterial(data.code)
//                 }
//               >
//                 {top10Materials.map((entry, index) => (
//                   <Cell
//                     key={entry.code}
//                     fill={COLORS[index % COLORS.length]}
//                     cursor={onSelectMaterial ? "pointer" : "default"}
//                   />
//                 ))}
//               </Pie>

//               <Tooltip
//                 contentStyle={{
//                   borderRadius: 8,
//                   borderColor: "hsl(var(--border))",
//                   fontSize: 11,
//                   backgroundColor: "hsl(var(--card))",
//                 }}
//                 formatter={(value: any, _name: any, props: any) => {
//                   const cost = Number(value);
//                   const share = (cost / total) * 100;
//                   return [
//                     `${formatRupiah(cost)} (${share.toFixed(1)}%)`,
//                     props.payload.name,
//                   ];
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Legend custom di kanan */}
//         <div className="w-1/3 h-full pl-2 flex flex-col gap-1 overflow-auto">
//           <div className="text-[11px] font-semibold text-foreground mb-1">
//             Top 10 List
//           </div>
//           {top10Materials.map((m, i) => {
//             const share = (m.totalCost / total) * 100;
//             return (
//               <button
//                 key={m.code}
//                 type="button"
//                 onClick={() => onSelectMaterial?.(m.code)}
//                 className="flex items-center gap-2 text-left text-[11px] hover:bg-accent/60 rounded px-1 py-0.5"
//               >
//                 <span
//                   className="inline-block h-2.5 w-2.5 rounded-sm"
//                   style={{ backgroundColor: COLORS[i % COLORS.length] }}
//                 />
//                 <div className="flex-1">
//                   <div className="truncate text-foreground">{m.name}</div>
//                   <div className="text-[10px] text-muted-foreground">
//                     {share.toFixed(1)}% · {Math.round(m.totalCost / 1_000_000)}M
//                   </div>
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = [
  "#0ea5e9",
  "#22c55e",
  "#6366f1",
  "#f97316",
  "#ec4899",
  "#14b8a6",
  "#a855f7",
  "#facc15",
  "#6b7280",
  "#475569",
];


              const isDark = typeof window !== "undefined" &&
                document.documentElement.classList.contains("dark");

const top10Materials = [
  { code: "MAT001", name: "Ballpoint Black", totalCost: 50_000_000 },
  { code: "MAT002", name: "Catridge 93A", totalCost: 42_000_000 },
  { code: "MAT003", name: "Marker Paint Orange", totalCost: 35_000_000 },
  { code: "MAT004", name: "Sarung Tangan 6 Benang", totalCost: 30_000_000 },
  { code: "MAT005", name: "Arm Protector", totalCost: 25_000_000 },
  { code: "MAT006", name: "Sarung Tangan 5 Benang", totalCost: 20_000_000 },
  { code: "MAT007", name: "Masker Dust", totalCost: 18_000_000 },
  { code: "MAT008", name: "Face Shield", totalCost: 16_000_000 },
  { code: "MAT009", name: "Safety Helmet", totalCost: 15_000_000 },
  { code: "MAT010", name: "Safety Shoes", totalCost: 12_000_000 },
];

function formatRupiah(v: number) {
  return `Rp ${v.toLocaleString("id-ID")}`;
}

type TopMaterialPieProps = {
  onSelectMaterial?: (code: string) => void;
};

export function TopMaterialPieChart({ onSelectMaterial }: TopMaterialPieProps) {
  const total = top10Materials.reduce(
    (sum, m) => sum + m.totalCost,
    0
  );

  return (
    <Card className="h-[360px]">
      <CardHeader className="pb-2 flex justify-between items-start">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground">
            Top 10 Material by Cost
          </CardTitle>
          <p className="text-[11px] text-muted-foreground">
            Share per material – periode aktif.
          </p>
        </div>
        <span className="text-[11px] text-muted-foreground">
          Period: this year
        </span>
      </CardHeader>

      <CardContent className="h-[280px] flex">
        <div className="w-2/3 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={top10Materials}
                dataKey="totalCost"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={45}
                paddingAngle={2}
                onClick={(data: any) =>
                  onSelectMaterial && onSelectMaterial(data.code)
                }
              >
                {top10Materials.map((entry, index) => (
                  <Cell
                    key={entry.code}
                    fill={COLORS[index % COLORS.length]}
                    cursor={onSelectMaterial ? "pointer" : "default"}
                  />
                ))}
              </Pie>


              <Tooltip
  contentStyle={{
    borderRadius: 8,
    border: "1px solid " + (isDark ? "#1f2933" : "#e5e7eb"),
    backgroundColor: isDark ? "#020617" : "#ffffff",
    boxShadow: "0 10px 20px rgba(0,0,0,0.45)",
  }}
  itemStyle={{
    color: isDark ? "#e5e7eb" : "#111827",
    fontSize: 11,
  }}
  labelStyle={{
    color: isDark ? "#f9fafb" : "#111827",
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 2,
  }}
                formatter={(value: any, _name: any, props: any) => {
                  const cost = Number(value);
                  const share = (cost / total) * 100;
                  return [
                    `${formatRupiah(cost)} (${share.toFixed(1)}%)`,
                    props.payload.name,
                  ];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend custom di kanan */}
        <div className="w-1/3 h-full pl-2 flex flex-col gap-1 overflow-auto">
          <div className="text-[11px] font-semibold text-foreground mb-1">
            Top 10 List
          </div>
          {top10Materials.map((m, i) => {
            const share = (m.totalCost / total) * 100;
            return (
              <button
                key={m.code}
                type="button"
                onClick={() => onSelectMaterial?.(m.code)}
                className="flex items-center gap-2 text-left text-[11px] hover:bg-accent/60 rounded px-1 py-0.5"
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <div className="flex-1">
                  <div className="truncate text-foreground">{m.name}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {share.toFixed(1)}% · {Math.round(m.totalCost / 1_000_000)}M
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
