// // // components/dashboard/overview-cards.tsx
// // "use client";

// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { ShoppingCart, PackageCheck, Truck } from "lucide-react";

// // type Delivery = {
// //   cycle1: number;
// //   cycle2: number;
// //   cycle3: number;
// //   cycle4: number;
// // };

// // export function OverviewCards({
// //   shopping,
// //   pickup,
// //   delivery,
// // }: {
// //   shopping: number;
// //   pickup: number;
// //   delivery: Delivery;
// // }) {
// //   const totalDelivery =
// //     (delivery?.cycle1 ?? 0) +
// //     (delivery?.cycle2 ?? 0) +
// //     (delivery?.cycle3 ?? 0) +
// //     (delivery?.cycle4 ?? 0);

// //   return (
// //     <div className="grid gap-4 md:grid-cols-3">
// //       {/* Shopping */}
// //       <Card className="border-none bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/40 text-slate-50 shadow-xl">
// //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
// //           <CardTitle className="text-xs font-medium text-slate-300 uppercase tracking-[0.18em]">
// //             Shopping Transactions
// //           </CardTitle>
// //           <div className="h-9 w-9 rounded-xl bg-sky-500/15 flex items-center justify-center border border-sky-500/40">
// //             <ShoppingCart className="h-4 w-4 text-sky-400" />
// //           </div>
// //         </CardHeader>
// //         <CardContent className="space-y-1">
// //           <div className="flex items-baseline gap-2">
// //             <span className="text-3xl font-semibold tracking-tight tabular-nums">
// //               {shopping}
// //             </span>
// //             <span className="text-xs text-slate-400">tx</span>
// //           </div>
// //           <p className="text-[11px] text-slate-400">
// //             Approved &amp; waiting for next process.
// //           </p>
// //         </CardContent>
// //       </Card>

// //       {/* Pickup */}
// //       <Card className="border-none bg-gradient-to-br from-emerald-900/90 via-emerald-900/60 to-slate-900/40 text-emerald-50 shadow-xl">
// //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
// //           <CardTitle className="text-xs font-medium text-emerald-100/80 uppercase tracking-[0.18em]">
// //             Ready to Pick Up
// //           </CardTitle>
// //           <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/40">
// //             <PackageCheck className="h-4 w-4 text-emerald-300" />
// //           </div>
// //         </CardHeader>
// //         <CardContent className="space-y-1">
// //           <div className="flex items-baseline gap-2">
// //             <span className="text-3xl font-semibold tracking-tight tabular-nums">
// //               {pickup}
// //             </span>
// //             <span className="text-xs text-emerald-100/80">tx</span>
// //           </div>
// //           <p className="text-[11px] text-emerald-100/70">
// //             Finished GI, waiting at counter.
// //           </p>
// //         </CardContent>
// //       </Card>

// //       {/* Delivery + breakdown */}
// //       <Card className="border-none bg-gradient-to-br from-indigo-900/90 via-slate-900/70 to-slate-900/40 text-slate-50 shadow-xl">
// //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
// //           <CardTitle className="text-xs font-medium text-slate-200 uppercase tracking-[0.18em]">
// //             Ready to Delivery
// //           </CardTitle>
// //           <div className="h-9 w-9 rounded-xl bg-indigo-500/15 flex items-center justify-center border border-indigo-500/40">
// //             <Truck className="h-4 w-4 text-indigo-300" />
// //           </div>
// //         </CardHeader>
// //         <CardContent className="space-y-3">
// //           <div className="flex items-baseline gap-2">
// //             <span className="text-3xl font-semibold tracking-tight tabular-nums">
// //               {totalDelivery}
// //             </span>
// //             <span className="text-xs text-slate-400">tx</span>
// //           </div>

// //           <div className="grid grid-cols-2 gap-2 text-[11px]">
// //             <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-sky-500/20">
// //               <span className="text-slate-300">Day 1</span>
// //               <span className="font-semibold text-sky-300 tabular-nums">
// //                 {delivery?.cycle1 ?? 0}
// //               </span>
// //             </div>
// //             <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-emerald-500/20">
// //               <span className="text-slate-300">Day 2</span>
// //               <span className="font-semibold text-emerald-300 tabular-nums">
// //                 {delivery?.cycle2 ?? 0}
// //               </span>
// //             </div>
// //             <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-fuchsia-500/25">
// //               <span className="text-slate-300">Night 1</span>
// //               <span className="font-semibold text-fuchsia-300 tabular-nums">
// //                 {delivery?.cycle3 ?? 0}
// //               </span>
// //             </div>
// //             <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-amber-400/25">
// //               <span className="text-slate-300">Night 2</span>
// //               <span className="font-semibold text-amber-300 tabular-nums">
// //                 {delivery?.cycle4 ?? 0}
// //               </span>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

// // components/dashboard/overview-cards.tsx
// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ShoppingCart, PackageCheck, Truck } from "lucide-react";
// import type { DashboardSseData } from "@/hooks/useDashboardSse";

// type OverviewCardsProps = {
//   data: DashboardSseData | null;
// };

// export function OverviewCards({ data }: OverviewCardsProps) {
//   const shopping = data?.shopping ?? 0;
//   const pickup = data?.pickup ?? 0;
//   const delivery = data?.delivery ?? {
//     cycle1: 0,
//     cycle2: 0,
//     cycle3: 0,
//     cycle4: 0,
//   };

//   const totalDelivery =
//     (delivery?.cycle1 ?? 0) +
//     (delivery?.cycle2 ?? 0) +
//     (delivery?.cycle3 ?? 0) +
//     (delivery?.cycle4 ?? 0);

//   return (
//     <div className="grid gap-4 md:grid-cols-3">
//       {/* Shopping */}
//       <Card className="border-none bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/40 text-slate-50 shadow-xl dark:bg-gradient-to-br">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
//           <CardTitle className="text-xs font-medium text-slate-300 uppercase tracking-[0.18em]">
//             Shopping Transactions
//           </CardTitle>
//           <div className="h-9 w-9 rounded-xl bg-sky-500/15 flex items-center justify-center border border-sky-500/40">
//             <ShoppingCart className="h-4 w-4 text-sky-400" />
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-1">
//           <div className="flex items-baseline gap-2">
//             <span className="text-3xl font-semibold tracking-tight tabular-nums">
//               {shopping}
//             </span>
//             <span className="text-xs text-slate-400">tx</span>
//           </div>
//           <p className="text-[11px] text-slate-400">
//             Approved &amp; waiting for next process.
//           </p>
//         </CardContent>
//       </Card>

//       {/* Pickup */}
//       <Card className="border-none bg-gradient-to-br from-emerald-900/90 via-emerald-900/60 to-slate-900/40 text-emerald-50 shadow-xl dark:bg-gradient-to-br">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
//           <CardTitle className="text-xs font-medium text-emerald-100/80 uppercase tracking-[0.18em]">
//             Ready to Pick Up
//           </CardTitle>
//           <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/40">
//             <PackageCheck className="h-4 w-4 text-emerald-300" />
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-1">
//           <div className="flex items-baseline gap-2">
//             <span className="text-3xl font-semibold tracking-tight tabular-nums">
//               {pickup}
//             </span>
//             <span className="text-xs text-emerald-100/80">tx</span>
//           </div>
//           <p className="text-[11px] text-emerald-100/70">
//             Finished GI, waiting at counter.
//           </p>
//         </CardContent>
//       </Card>

//       {/* Delivery + breakdown */}
//       <Card className="border-none bg-gradient-to-br from-indigo-900/90 via-slate-900/70 to-slate-900/40 text-slate-50 shadow-xl dark:bg-gradient-to-br">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
//           <CardTitle className="text-xs font-medium text-slate-200 uppercase tracking-[0.18em]">
//             Ready to Delivery
//           </CardTitle>
//           <div className="h-9 w-9 rounded-xl bg-indigo-500/15 flex items-center justify-center border border-indigo-500/40">
//             <Truck className="h-4 w-4 text-indigo-300" />
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="flex items-baseline gap-2">
//             <span className="text-3xl font-semibold tracking-tight tabular-nums">
//               {totalDelivery}
//             </span>
//             <span className="text-xs text-slate-400">tx</span>
//           </div>

//           <div className="grid grid-cols-2 gap-2 text-[11px]">
//             <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-sky-500/20">
//               <span className="text-slate-300">Day 1</span>
//               <span className="font-semibold text-sky-300 tabular-nums">
//                 {delivery?.cycle1 ?? 0}
//               </span>
//             </div>
//             <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-emerald-500/20">
//               <span className="text-slate-300">Day 2</span>
//               <span className="font-semibold text-emerald-300 tabular-nums">
//                 {delivery?.cycle2 ?? 0}
//               </span>
//             </div>
//             <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-fuchsia-500/25">
//               <span className="text-slate-300">Night 1</span>
//               <span className="font-semibold text-fuchsia-300 tabular-nums">
//                 {delivery?.cycle3 ?? 0}
//               </span>
//             </div>
//             <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-amber-400/25">
//               <span className="text-slate-300">Night 2</span>
//               <span className="font-semibold text-amber-300 tabular-nums">
//                 {delivery?.cycle4 ?? 0}
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// components/dashboard/overview-cards.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, PackageCheck, Truck } from "lucide-react";

type Delivery = {
  cycle1: number;
  cycle2: number;
  cycle3: number;
  cycle4: number;
};

export type OverviewCardsProps = {
  shopping: number;
  pickup: number;
  delivery: Delivery;
};

export function OverviewCards({
  shopping,
  pickup,
  delivery,
}: OverviewCardsProps) {
  const totalDelivery =
    (delivery?.cycle1 ?? 0) +
    (delivery?.cycle2 ?? 0) +
    (delivery?.cycle3 ?? 0) +
    (delivery?.cycle4 ?? 0);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Shopping */}
      <Card className="border-none bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/40 text-slate-50 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-xs font-medium text-slate-300 uppercase tracking-[0.18em]">
            Shopping Transactions
          </CardTitle>
          <div className="h-9 w-9 rounded-xl bg-sky-500/15 flex items-center justify-center border border-sky-500/40">
            <ShoppingCart className="h-4 w-4 text-sky-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              {shopping}
            </span>
            <span className="text-xs text-slate-400">tx</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Approved &amp; waiting for next process.
          </p>
        </CardContent>
      </Card>

      {/* Pickup */}
      <Card className="border-none bg-gradient-to-br from-emerald-900/90 via-emerald-900/60 to-slate-900/40 text-emerald-50 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-xs font-medium text-emerald-100/80 uppercase tracking-[0.18em]">
            Ready to Pick Up
          </CardTitle>
          <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/40">
            <PackageCheck className="h-4 w-4 text-emerald-300" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              {pickup}
            </span>
            <span className="text-xs text-emerald-100/80">tx</span>
          </div>
          <p className="text-[11px] text-emerald-100/70">
            Finished GI, waiting at counter.
          </p>
        </CardContent>
      </Card>

      {/* Delivery + breakdown */}
      {/* <Card className="border-none bg-gradient-to-br from-indigo-900/90 via-slate-900/70 to-slate-900/40 text-slate-50 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-xs font-medium text-slate-200 uppercase tracking-[0.18em]">
            Ready to Delivery
          </CardTitle>
          <div className="h-9 w-9 rounded-xl bg-indigo-500/15 flex items-center justify-center border border-indigo-500/40">
            <Truck className="h-4 w-4 text-indigo-300" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              {totalDelivery}
            </span>
            <span className="text-xs text-slate-400">tx</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-sky-500/20">
              <span className="text-slate-300">Day 1</span>
              <span className="font-semibold text-sky-300 tabular-nums">
                {delivery?.cycle1 ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-emerald-500/20">
              <span className="text-slate-300">Day 2</span>
              <span className="font-semibold text-emerald-300 tabular-nums">
                {delivery?.cycle2 ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-fuchsia-500/25">
              <span className="text-slate-300">Night 1</span>
              <span className="font-semibold text-fuchsia-300 tabular-nums">
                {delivery?.cycle3 ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-2 py-1.5 border border-amber-400/25">
              <span className="text-slate-300">Night 2</span>
              <span className="font-semibold text-amber-300 tabular-nums">
                {delivery?.cycle4 ?? 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card> */}
      <Card className="border-none bg-gradient-to-br from-indigo-900/90 via-slate-900/70 to-slate-900/40 text-slate-50 shadow-xl">
  {/* Mengurangi pb-3 menjadi pb-2 agar konten di bawahnya naik sedikit */}
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-xs font-medium text-slate-200 uppercase tracking-[0.18em]">
      Ready to Delivery
    </CardTitle>
    <div className="h-9 w-9 rounded-xl bg-indigo-500/15 flex items-center justify-center border border-indigo-500/40">
      <Truck className="h-4 w-4 text-indigo-300" />
    </div>
  </CardHeader>

  {/* Menambah space-y-4 agar jarak antara Total dan Grid seimbang */}
  <CardContent className="space-y-4">
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-semibold tracking-tight tabular-nums">
        {totalDelivery}
      </span>
      <span className="text-xs text-slate-400">tx</span>
    </div>

    {/* Grid text dihapus dari parent, dipindah ke individual item agar bisa custom size */}
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-3 py-2 border border-sky-500/20">
        <span className="text-xs font-medium text-slate-300">Day 1</span>
        <span className="text-sm font-bold text-sky-300 tabular-nums">
          {delivery?.cycle1 ?? 0}
        </span>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-3 py-2 border border-emerald-500/20">
        <span className="text-xs font-medium text-slate-300">Day 2</span>
        <span className="text-sm font-bold text-emerald-300 tabular-nums">
          {delivery?.cycle2 ?? 0}
        </span>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-3 py-2 border border-fuchsia-500/25">
        <span className="text-xs font-medium text-slate-300">Night 1</span>
        <span className="text-sm font-bold text-fuchsia-300 tabular-nums">
          {delivery?.cycle3 ?? 0}
        </span>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-3 py-2 border border-amber-400/25">
        <span className="text-xs font-medium text-slate-300">Night 2</span>
        <span className="text-sm font-bold text-amber-300 tabular-nums">
          {delivery?.cycle4 ?? 0}
        </span>
      </div>
    </div>
  </CardContent>
</Card>
    </div>
  );
}
