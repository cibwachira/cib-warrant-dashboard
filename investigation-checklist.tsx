"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Circle, RotateCcw, ShieldAlert } from "lucide-react";
import { ChecklistGroup } from "@/lib/types";

function count(groups: ChecklistGroup[]) {
  const items = groups.flatMap((group) => group.items);
  const done = items.filter((item) => item.done).length;
  return { done, total: items.length, percent: items.length ? Math.round((done / items.length) * 100) : 0 };
}

export function InvestigationChecklist({ suspectId, initialGroups }: { suspectId: string; initialGroups: ChecklistGroup[] }) {
  const storageKey = `warrant-v2-checklist:${suspectId}`;
  const [groups, setGroups] = useState<ChecklistGroup[]>(initialGroups);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as ChecklistGroup[];
      if (Array.isArray(parsed)) setGroups(parsed);
    } catch {
      // Ignore invalid local demo data.
    }
  }, [storageKey]);

  const stats = useMemo(() => count(groups), [groups]);

  function toggle(groupId: string, itemId: string) {
    const next = groups.map((group) =>
      group.id === groupId
        ? { ...group, items: group.items.map((item) => item.id === itemId ? { ...item, done: !item.done } : item) }
        : group,
    );
    setGroups(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function resetDemo() {
    setGroups(initialGroups);
    window.localStorage.removeItem(storageKey);
  }

  return (
    <section className="rounded-2xl border border-[#263650] bg-[#101b2e]/90 p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm text-slate-400">Investigation Checklist</div>
          <div className="mt-1 text-3xl font-black">{stats.percent}%</div>
          <div className="mt-1 text-xs text-slate-500">{stats.done}/{stats.total} รายการ · 15 หมวดข้อมูล</div>
        </div>
        <button onClick={resetDemo} className="inline-flex items-center gap-2 rounded-xl border border-[#31435f] bg-[#0b1526] px-3 py-2 text-xs text-slate-300 hover:bg-white/5">
          <RotateCcw size={14}/> รีเซ็ตข้อมูล Demo
        </button>
      </div>

      <div className="mb-5 h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${stats.percent}%` }} />
      </div>

      <div className="mb-5 flex gap-3 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs leading-5 text-amber-100/80">
        <ShieldAlert className="mt-0.5 shrink-0" size={17}/>
        <p>ข้อมูลด้านโทรคมนาคม การเงิน การรักษาพยาบาล การเดินทาง และข้อมูลส่วนบุคคล ให้ตรวจสอบหรือร้องขอเฉพาะกรณีที่มีอำนาจตามกฎหมาย คำสั่ง หรือระเบียบที่เกี่ยวข้อง และตามสิทธิ์ผู้ใช้งานของระบบ</p>
      </div>

      <div className="space-y-3">
        {groups.map((group, index) => {
          const g = count([group]);
          return (
            <details key={group.id} className="group overflow-hidden rounded-2xl border border-[#263650] bg-[#0b1526]" open={index < 2}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 hover:bg-white/[.025]">
                <div className="min-w-0">
                  <div className="font-bold text-slate-100">{group.title}</div>
                  <div className="mt-1 text-xs text-slate-500">ตรวจแล้ว {g.done}/{g.total} รายการ</div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-xs font-bold text-sky-200">{g.percent}%</span>
                  <ChevronDown size={17} className="text-slate-500 transition-transform group-open:rotate-180" />
                </div>
              </summary>

              <div className="grid gap-2 border-t border-[#263650] p-3 md:grid-cols-2">
                {group.items.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => toggle(group.id, item.id)}
                    className={`flex min-h-12 items-start gap-3 rounded-xl border p-3 text-left text-sm transition ${item.done ? "border-emerald-500/20 bg-emerald-500/[.06] text-slate-100" : "border-[#263650] bg-[#101b2e] text-slate-400 hover:border-sky-500/30"}`}
                  >
                    {item.done ? <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" size={18}/> : <Circle className="mt-0.5 shrink-0 text-slate-600" size={18}/>} 
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
