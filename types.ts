export type Priority = "HIGH" | "MEDIUM" | "LOW";
export type WarrantStatus = "ACTIVE" | "WATCH" | "ARRESTED" | "CLOSED";

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type ChecklistGroup = {
  id: string;
  title: string;
  items: ChecklistItem[];
};

export type Warrant = {
  id: string;
  warrantNo: string;
  court: string;
  charge: string;
  status: WarrantStatus;
};

export type TimelineItem = {
  id: string;
  date: string;
  title: string;
  detail: string;
  officer: string;
};

export type Suspect = {
  id: string;
  code: string;
  name: string;
  alias?: string;
  province: string;
  owner: string;
  priority: Priority;
  status: WarrantStatus;
  lastUpdate: string;
  warrants: Warrant[];
  checklist: ChecklistGroup[];
  timeline: TimelineItem[];
};
