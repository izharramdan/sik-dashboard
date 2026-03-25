// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { API_BASE_URL, getAuthToken } from "@/lib/api";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// type DetailRow = {
//   material_name: string;
//   material_id: string;
//   transaction_date: string;
//   qty: number;
//   uom: string;
//   status: string;
//   no_gic_or_wbs: string | null;
//   shopping_by: string | null;
//   name_shopping_by: string | null;
//   approval1: string | null;
//   name_approval1: string | null;
//   approval2: string | null;
//   name_approval2: string | null;
//   handover_or_delivery_by: string | null;
//   name_handover_or_delivery_by: string | null;
// };

// export default function TransactionDetailPage() {
//   const params = useParams<{ transactionNumber: string }>();
//   const router = useRouter();
//   const transactionNumber = params.transactionNumber;

//   const [details, setDetails] = useState<DetailRow[]>([]);
//   const [loading, setLoading] = useState(false);

//   const formatDateTime = (dateString: string) => {
//     const d = new Date(dateString);
//     if (Number.isNaN(d.getTime())) return "-";
//     const date = d.toLocaleDateString("id-ID", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//     const time = d.toLocaleTimeString("id-ID", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     return `${date} ${time}`;
//   };

//   useEffect(() => {
//     const fetchDetail = async () => {
//       if (!transactionNumber) return;
//       try {
//         setLoading(true);
//         const token = getAuthToken();
//         if (!token) return;

//         const res = await fetch(
//           `${API_BASE_URL}/transaction/details-transaction-dashboard/${transactionNumber}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const json = await res.json().catch(() => ({}));

//         if (!res.ok) {
//           console.error("Error fetching detail:", json);
//           return;
//         }

//         const rows: DetailRow[] = json.detail ?? [];
//         setDetails(rows);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetail();
//   }, [transactionNumber]);

//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between gap-2">
//         <div>
//           <h1 className="text-base font-semibold tracking-tight">
//             Detail Transaction
//           </h1>
//           <p className="text-xs text-muted-foreground">
//             #{transactionNumber}
//           </p>
//         </div>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => router.push("/dashboard/transaction")}
//           className="text-xs"
//         >
//           Back to Transactions
//         </Button>
//       </div>

//       {loading && (
//         <p className="text-xs text-muted-foreground">
//           Memuat detail transaksi…
//         </p>
//       )}

//       {!loading && details.length === 0 && (
//         <p className="text-xs text-muted-foreground">
//           Tidak ada detail untuk transaksi ini.
//         </p>
//       )}

//       <div className="grid gap-3">
//         {details.map((row, idx) => (
//           <Card
//             key={row.material_id || idx}
//             className="border-none bg-card shadow-sm"
//           >
//             <div className="flex flex-col gap-3 p-3 text-xs md:flex-row md:justify-between">
//               <div className="space-y-1">
//                 <h2 className="text-sm font-semibold">
//                   {row.material_name}
//                 </h2>
//                 <p className="text-[11px] text-muted-foreground">
//                   Material ID:{" "}
//                   <span className="font-mono text-foreground">
//                     {row.material_id}
//                   </span>
//                 </p>
//                 <p className="text-[11px] text-muted-foreground">
//                   Tx Date:{" "}
//                   <span className="text-foreground">
//                     {formatDateTime(row.transaction_date)}
//                   </span>
//                 </p>
//                 <p className="text-[11px] text-muted-foreground">
//                   Quantity:{" "}
//                   <span className="text-foreground">
//                     {row.qty} {row.uom}
//                   </span>
//                 </p>
//                 <p className="text-[11px] text-muted-foreground">
//                   Status:{" "}
//                   <span className="text-foreground">{row.status}</span>
//                 </p>
//                 <p className="text-[11px] text-muted-foreground">
//                   No GIC / WBS:{" "}
//                   <span className="text-foreground">
//                     {row.no_gic_or_wbs || "-"}
//                   </span>
//                 </p>
//               </div>

//               <div className="space-y-1 md:min-w-[260px]">
//                 <p className="text-[11px] text-muted-foreground">
//                   Shopping By:{" "}
//                   <span className="text-foreground">
//                     {row.shopping_by && row.name_shopping_by
//                       ? `${row.shopping_by} - ${row.name_shopping_by}`
//                       : "-"}
//                   </span>
//                 </p>
//                 <p className="text-[11px] text-muted-foreground">
//                   Approval 1:{" "}
//                   <span className="text-foreground">
//                     {row.approval1 && row.name_approval1
//                       ? `${row.approval1} - ${row.name_approval1}`
//                       : "-"}
//                   </span>
//                 </p>
//                 <p className="text-[11px] text-muted-foreground">
//                   Approval 2:{" "}
//                   <span className="text-foreground">
//                     {row.approval2 && row.name_approval2
//                       ? `${row.approval2} - ${row.name_approval2}`
//                       : "-"}
//                   </span>
//                 </p>
//                 <p className="text-[11px] text-muted-foreground">
//                   Handover / Delivery By:{" "}
//                   <span className="text-foreground">
//                     {row.handover_or_delivery_by &&
//                     row.name_handover_or_delivery_by
//                       ? `${row.handover_or_delivery_by} - ${row.name_handover_or_delivery_by}`
//                       : "-"}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }


// app/dashboard/transaction/[transactionNumber]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL, getAuthToken } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pencil } from "lucide-react";
import {
  EditDetailDialog,
  type TransactionDetail,
} from "@/components/gi/edit-detail-dialog";

export default function TransactionDetailPage() {
  const router = useRouter();
  const params = useParams<{ transactionNumber: string }>();
  const transactionNumber = params.transactionNumber;

  const [details, setDetails] = useState<TransactionDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] =
    useState<TransactionDetail | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!transactionNumber) return;
      setLoading(true);
      try {
        const token = getAuthToken();
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(
          `${API_BASE_URL}/transaction/details-transaction-dashboard/${transactionNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();

        if (!res.ok) {
          console.error("Error fetch detail:", json);
          // bisa pakai toast/shadcn kalau mau
          return;
        }

        setDetails(json.detail || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [transactionNumber, router]);

  const handleOpenEdit = (detail: TransactionDetail) => {
    setSelectedDetail(detail);
    setEditOpen(true);
  };

  const handleSaveDetail = (updated: TransactionDetail) => {
    // ⬇️ ini mirip versi React Router lama: update by material_id
    setDetails((prev) =>
      prev.map((d) =>
        d.material_id === updated.material_id ? updated : d
      )
    );

    // 🔧 Kalau nanti mau simpan ke backend juga, tambahkan PATCH di sini.
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">
            Detail Transaction
          </h1>
          <p className="text-xs text-muted-foreground">
            Tx. Number:{" "}
            <span className="font-mono">
              {transactionNumber}
            </span>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-[11px]"
          onClick={() => router.push("/dashboard/transaction")}
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Transactions
        </Button>
      </div>

      {/* Konten */}
      {loading ? (
        <div className="text-xs text-muted-foreground">
          Loading details...
        </div>
      ) : details.length === 0 ? (
        <div className="text-xs text-muted-foreground">
          Tidak ada detail transaksi.
        </div>
      ) : (
        <div className="grid gap-3">
          {details.map((row, idx) => (
            <Card
              key={row.material_id ?? idx}
              className="border-border/60 bg-card/80 p-3 text-xs sm:p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                {/* Kiri */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold">
                      {row.material_name}
                    </h2>
                    <Badge variant="outline" className="text-[10px]">
                      {row.material_id}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Tx. Date:{" "}
                    <span className="font-mono">
                      {formatDateTime(row.transaction_date)}
                    </span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Quantity:{" "}
                    <span className="font-semibold">
                      {row.qty} {row.uom}
                    </span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Status:{" "}
                    <span className="font-semibold">
                      {row.status}
                    </span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    No GIC / WBS:{" "}
                    <span className="font-mono">
                      {row.no_gic_or_wbs || "-"}
                    </span>
                  </p>
                </div>

                {/* Tengah */}
                <div className="space-y-1.5 text-[11px] text-muted-foreground">
                  <p>
                    <span className="font-semibold">
                      Shopping By:
                    </span>{" "}
                    {row.shopping_by && row.name_shopping_by
                      ? `${row.shopping_by} - ${row.name_shopping_by}`
                      : "-"}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Approval 1:
                    </span>{" "}
                    {row.approval1 && row.name_approval1
                      ? `${row.approval1} - ${row.name_approval1}`
                      : "-"}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Approval 2:
                    </span>{" "}
                    {row.approval2 && row.name_approval2
                      ? `${row.approval2} - ${row.name_approval2}`
                      : "-"}
                  </p>
                  <p>
                    <span className="font-semibold">
                      Handover / Delivery By:
                    </span>{" "}
                    {row.handover_or_delivery_by &&
                    row.name_handover_or_delivery_by
                      ? `${row.handover_or_delivery_by} - ${row.name_handover_or_delivery_by}`
                      : "-"}
                  </p>
                  <p>
                    <span className="font-semibold">
                      GI Number:
                    </span>{" "}
                    {["REJECTED", "CANCELLED", "ERROR"].includes(row.status?.toUpperCase() || "") ||
                    !row.gi_number ||
                    row.is_posted === null
                      ? "-"
                      : row.gi_number}
                  </p>
                </div>

                {/* Kanan (button Edit) */}
                <div className="flex items-end justify-end">
                  <Button
                    size="sm"
                    className="h-8 gap-1 text-[11px]"
                    onClick={() => handleOpenEdit(row)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit No GIC / WBS
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog Edit */}
      <EditDetailDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        detail={selectedDetail}
        onSave={handleSaveDetail}
      />
    </div>
  );
}
