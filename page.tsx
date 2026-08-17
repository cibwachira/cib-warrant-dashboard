import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { WarrantTable } from "@/components/warrant-table";
import { suspects, progressOf } from "@/lib/mock-data";

export default function DashboardPage() {
  const totalWarrants = suspects.reduce((sum, s) => sum + s.warrants.length, 0);
  const high = suspects.filter(s => s.priority === "HIGH" && s.status !== "ARRESTED").length;
  const arrested = suspects.filter(s => s.status === "ARRESTED").length;
  const avg = Math.round(suspects.reduce((sum,s)=>sum+progressOf(s),0)/suspects.length);

  return (
    <AppShell>
      <div className="p-4 md:p-8">
        <header className="mb-7">
          <div className="text-sm text-sky-300">Operational Overview</div>
          <h1 className="mt-1 text-3xl font-black">Warrant Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">รวมผู้ต้องหา หมายจับ Priority และความคืบหน้า Checklist ในหน้าเดียว</p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="หมายจับทั้งหมด" value={totalWarrants} note="ข้อมูลตัวอย่าง"/>
          <StatCard label="ผู้ต้องหา HIGH" value={high} note="ยังไม่ปิดงาน"/>
          <StatCard label="จับกุมแล้ว" value={arrested}/>
          <StatCard label="Checklist เฉลี่ย" value={`${avg}%`}/>
        </section>
        <section className="mt-6">
          <WarrantTable/>
        </section>
      </div>
    </AppShell>
  );
}
