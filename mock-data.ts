import { ChecklistGroup, Suspect } from "./types";

import { investigationChecklistTemplate } from "./investigation-checklist";

const makeChecklist = (doneCount: number): ChecklistGroup[] => {
  let cursor = 0;
  return investigationChecklistTemplate.map((group) => {
    const items = group.items.map((label, index) => ({
      id: `${group.id}-${index + 1}`,
      label,
      done: cursor + index < doneCount,
    }));
    cursor += group.items.length;
    return { id: group.id, title: group.title, items };
  });
};

export const suspects: Suspect[] = [
  {
    id: "s-001",
    code: "WR-0001",
    name: "ผู้ต้องหาตัวอย่าง A",
    alias: "A",
    province: "กรุงเทพมหานคร",
    owner: "ชป.5",
    priority: "HIGH",
    status: "ACTIVE",
    lastUpdate: "17 ส.ค. 2569",
    warrants: [
      { id: "w-1", warrantNo: "001/2569", court: "ศาลตัวอย่าง", charge: "คดีตัวอย่างสำหรับทดสอบระบบ", status: "ACTIVE" },
      { id: "w-2", warrantNo: "002/2569", court: "ศาลตัวอย่าง", charge: "คดีตัวอย่างหมายที่ 2", status: "ACTIVE" },
    ],
    checklist: makeChecklist(36),
    timeline: [
      { id: "t1", date: "17 ส.ค. 2569 14:30", title: "อัปเดตเบาะแส", detail: "ข้อมูลจำลองสำหรับสาธิต Timeline", officer: "เจ้าหน้าที่ตัวอย่าง" },
      { id: "t2", date: "16 ส.ค. 2569 10:15", title: "ตรวจสอบหมายจับ", detail: "ยืนยันสถานะหมายในระบบตัวอย่าง", officer: "เจ้าหน้าที่ตัวอย่าง" },
    ],
  },
  {
    id: "s-002",
    code: "WR-0002",
    name: "ผู้ต้องหาตัวอย่าง B",
    alias: "B",
    province: "ชลบุรี",
    owner: "ชป.3",
    priority: "MEDIUM",
    status: "WATCH",
    lastUpdate: "16 ส.ค. 2569",
    warrants: [
      { id: "w-3", warrantNo: "003/2569", court: "ศาลตัวอย่าง", charge: "คดีตัวอย่าง", status: "WATCH" },
    ],
    checklist: makeChecklist(18),
    timeline: [
      { id: "t3", date: "16 ส.ค. 2569 08:40", title: "ตรวจสอบพื้นที่", detail: "ข้อมูลจำลอง", officer: "เจ้าหน้าที่ตัวอย่าง" },
    ],
  },
  {
    id: "s-003",
    code: "WR-0003",
    name: "ผู้ต้องหาตัวอย่าง C",
    alias: "C",
    province: "ระยอง",
    owner: "ชป.2",
    priority: "LOW",
    status: "ARRESTED",
    lastUpdate: "15 ส.ค. 2569",
    warrants: [
      { id: "w-4", warrantNo: "004/2569", court: "ศาลตัวอย่าง", charge: "คดีตัวอย่าง", status: "ARRESTED" },
    ],
    checklist: makeChecklist(92),
    timeline: [
      { id: "t4", date: "15 ส.ค. 2569 18:00", title: "ปิดงาน", detail: "ข้อมูลจำลองสำหรับสาธิตสถานะจับกุมแล้ว", officer: "เจ้าหน้าที่ตัวอย่าง" },
    ],
  },
];

export function getSuspect(id: string) {
  return suspects.find((s) => s.id === id);
}

export function checklistStats(groups: ChecklistGroup[]) {
  const items = groups.flatMap((group) => group.items);
  const done = items.filter((item) => item.done).length;
  return {
    done,
    total: items.length,
    percent: items.length ? Math.round((done / items.length) * 100) : 0,
  };
}

export function progressOf(s: Suspect) {
  return checklistStats(s.checklist).percent;
}
