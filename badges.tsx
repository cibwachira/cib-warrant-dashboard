import { Priority, WarrantStatus } from "@/lib/types";

export function PriorityBadge({ value }: { value: Priority }) {
  const c = value === "HIGH" ? "bg-red-500/15 text-red-200 border-red-500/25" :
            value === "MEDIUM" ? "bg-amber-500/15 text-amber-200 border-amber-500/25" :
            "bg-emerald-500/15 text-emerald-200 border-emerald-500/25";
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${c}`}>{value}</span>;
}

export function StatusBadge({ value }: { value: WarrantStatus }) {
  const c = value === "ARRESTED" ? "bg-emerald-500/15 text-emerald-200 border-emerald-500/25" :
            value === "ACTIVE" ? "bg-sky-500/15 text-sky-200 border-sky-500/25" :
            value === "WATCH" ? "bg-amber-500/15 text-amber-200 border-amber-500/25" :
            "bg-slate-500/15 text-slate-300 border-slate-500/25";
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${c}`}>{value}</span>;
}
