export function StatCard({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="rounded-2xl border border-[#263650] bg-[#101b2e]/90 p-5 shadow-xl shadow-black/10">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-3xl font-black tracking-tight">{value}</div>
      {note && <div className="mt-2 text-xs text-slate-500">{note}</div>}
    </div>
  );
}
