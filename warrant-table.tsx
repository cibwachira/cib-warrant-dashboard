"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { suspects, progressOf } from "@/lib/mock-data";
import { PriorityBadge, StatusBadge } from "./badges";
import { Search } from "lucide-react";

export function WarrantTable() {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("ALL");

  const rows = useMemo(() => suspects.filter((s) => {
    const hay = [s.name, s.alias, s.province, s.owner, ...s.warrants.map(w => w.warrantNo)].join(" ").toLowerCase();
    return hay.includes(query.toLowerCase()) && (priority === "ALL" || s.priority === priority);
  }), [query, priority]);

  return (
    <div className="rounded-2xl border border-[#263650] bg-[#101b2e]/90">
      <div className="grid gap-3 border-b border-[#263650] p-4 md:grid-cols-[1fr_180px]">
        <label className="flex items-center gap-2 rounded-xl border border-[#31435f] bg-[#0b1526] px-3">
          <Search size={17} className="text-slate-500"/>
          <input value={query} onChange={(e)=>setQuery(e.target.value)} className="w-full bg-transparent py-3 outline-none" placeholder="ค้นหาชื่อ / หมายจับ / จังหวัด / ผู้รับผิดชอบ"/>
        </label>
        <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="rounded-xl border border-[#31435f] bg-[#0b1526] px-3">
          <option value="ALL">ทุก Priority</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-slate-500">
            <tr><th className="p-4">ผู้ต้องหา</th><th>หมายจับ</th><th>พื้นที่</th><th>Priority</th><th>Status</th><th>Checklist</th><th>อัปเดต</th></tr>
          </thead>
          <tbody>
            {rows.map((s) => {
              const p = progressOf(s);
              return (
                <tr key={s.id} className="border-t border-[#21314b] hover:bg-white/[.025]">
                  <td className="p-4"><Link className="font-bold text-sky-200 hover:underline" href={`/suspects/${s.id}`}>{s.name}</Link><div className="text-xs text-slate-500">{s.code} · {s.owner}</div></td>
                  <td>{s.warrants.length} หมาย<div className="text-xs text-slate-500">{s.warrants.map(w=>w.warrantNo).join(", ")}</div></td>
                  <td>{s.province}</td><td><PriorityBadge value={s.priority}/></td><td><StatusBadge value={s.status}/></td>
                  <td className="pr-5"><div className="flex justify-between text-xs"><span>{p}%</span><span className="text-slate-500">{s.checklist.filter(x=>x.done).length}/{s.checklist.length}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-sky-500" style={{width:`${p}%`}}/></div></td>
                  <td className="text-slate-400">{s.lastUpdate}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {rows.length === 0 && <div className="p-10 text-center text-slate-500">ไม่พบข้อมูล</div>}
      </div>
    </div>
  );
}
