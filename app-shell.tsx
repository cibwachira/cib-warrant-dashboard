import Link from "next/link";
import { LayoutDashboard, Search, ShieldCheck, Users, LogOut } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
      <aside className="hidden md:flex flex-col border-r border-[#263650] bg-[#0a1424]/95 p-5">
        <div className="mb-8">
          <div className="text-xs tracking-[.24em] text-sky-300">WARRANT SYSTEM</div>
          <div className="mt-2 text-xl font-bold">Investigation V2</div>
        </div>
        <nav className="space-y-2 text-sm">
          <Link className="flex gap-3 rounded-xl bg-sky-500/15 px-4 py-3 text-sky-200" href="/dashboard"><LayoutDashboard size={18}/> Dashboard</Link>
          <Link className="flex gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5" href="/warrants"><Search size={18}/> ค้นหา/หมายจับ</Link>
          <Link className="flex gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-white/5" href="/warrants"><Users size={18}/> ผู้ต้องหา</Link>
          <div className="flex gap-3 rounded-xl px-4 py-3 text-slate-500"><ShieldCheck size={18}/> Admin (ถัดไป)</div>
        </nav>
        <div className="mt-auto rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-100/80">
          Prototype: ใช้ข้อมูลจำลองเท่านั้น
        </div>
        <Link className="mt-3 flex gap-2 text-sm text-slate-400" href="/login"><LogOut size={16}/> ออกจากระบบ</Link>
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
