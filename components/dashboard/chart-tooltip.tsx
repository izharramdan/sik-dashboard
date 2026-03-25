// // // components/dashboard/chart-tooltip.tsx
// // "use client";

// // import type { ReactNode } from "react";
// // import { cn } from "@/lib/utils";

// // type ChartTooltipProps = {
// //   /** dipakai Recharts */
// //   active?: boolean;
// //   payload?: Array<{
// //     value: number;
// //     name: string;
// //     color?: string;
// //   }>;
// //   label?: string | number;

// //   /** formatter custom dari chart */
// //   labelFormatter?: (label: string | number) => string;
// //   valueFormatter?: (value: number, name?: string) => string | ReactNode;
// // };

// // export function ChartTooltip(props: ChartTooltipProps) {
// //   const { active, payload, label, labelFormatter, valueFormatter } = props;

// //   if (!active || !payload || payload.length === 0) return null;

// //   const displayLabel = labelFormatter ? labelFormatter(label ?? "") : String(label);

// //   return (
// //     <div
// //       className={cn(
// //         "rounded-md border bg-popover px-3 py-2 text-xs shadow-lg",
// //         "border-border/60"
// //       )}
// //     >
// //       <div className="mb-1 font-medium text-foreground">{displayLabel}</div>
// //       <div className="space-y-0.5">
// //         {payload.map((entry, idx) => {
// //           const color = entry.color ?? "hsl(var(--foreground))";
// //           const value =
// //             typeof valueFormatter === "function"
// //               ? valueFormatter(entry.value as number, entry.name)
// //               : entry.value;

// //           return (
// //             <div key={idx} className="flex items-center gap-2">
// //               <span
// //                 className="h-2 w-2 rounded-full"
// //                 style={{ backgroundColor: color }}
// //               />
// //               <span className="text-muted-foreground">{entry.name}</span>
// //               <span className="ml-auto font-medium text-foreground tabular-nums">
// //                 {value}
// //               </span>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import type { ReactNode } from "react";
// import type { TooltipProps } from "recharts";
// import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// export function ChartTooltip({
//   active,
//   payload,
//   label,
//   labelFormatter,
//   className,
// }: TooltipProps<number, string> & {
//   labelFormatter?: (label: any) => ReactNode;
//   className?: string;
// }) {
//   if (!active || !payload || payload.length === 0) return null;

//   const item = payload[0];

//   return (
//     <Card
//       className={cn(
//         "border-none bg-background/95 backdrop-blur px-3 py-2 shadow-xl",
//         "text-xs space-y-1",
//         className
//       )}
//     >
//       <div className="font-medium text-foreground">
//         {labelFormatter ? labelFormatter(label) : label}
//       </div>
//       <div className="flex items-center gap-2">
//         <span
//           className="inline-block h-2 w-2 rounded-full"
//           style={{ backgroundColor: item.color }}
//         />
//         <span className="text-muted-foreground">
//           {item.name ?? "Value"}:
//         </span>
//         <span className="font-semibold tabular-nums">
//           {item.value?.toLocaleString("id-ID")}
//         </span>
//       </div>
//     </Card>
//   );
// }

// components/dashboard/chart-tooltip.tsx
"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Kita define sendiri supaya simpel & aman
type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
    color?: string;
    [key: string]: any;
  }>;
  label?: any;
  labelFormatter?: (label: any) => ReactNode;
  className?: string;
};

export function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
  className,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0];

  return (
    <Card
      className={cn(
        "border-none bg-background/95 backdrop-blur px-3 py-2 shadow-xl",
        "text-xs space-y-1",
        className
      )}
    >
      <div className="font-medium text-foreground">
        {labelFormatter ? labelFormatter(label) : label}
      </div>
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: item.color ?? "#3b82f6" }}
        />
        <span className="text-muted-foreground">
          {item.name ?? "Value"}:
        </span>
        <span className="font-semibold tabular-nums">
          {typeof item.value === "number"
            ? item.value.toLocaleString("id-ID")
            : item.value}
        </span>
      </div>
    </Card>
  );
}
