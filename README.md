# Warrant Management V2

Next.js 16.3 + TypeScript + Tailwind CSS prototype สำหรับ Dashboard ติดตามผู้ต้องหาตามหมายจับ

> **สำคัญ:** Repository รุ่นนี้ใช้ข้อมูลจำลองเท่านั้น ยังไม่ควรเก็บข้อมูลผู้ต้องหาจริงจนกว่าจะเชื่อม Authentication, Database, Row Level Security, Audit Log และมาตรการควบคุมสิทธิ์ที่เหมาะสม

## ฟังก์ชัน V2.0.1
- Demo Login
- Dashboard KPI
- Search / Filter Priority
- รายชื่อผู้ต้องหา
- รองรับหลายหมายจับต่อ 1 คน
- Profile รายบุคคล
- Investigation Checklist 15 หมวด ตามเอกสารที่ผู้ใช้ให้มา
- รายละเอียด Checklist รวมระดับหัวข้อย่อย
- Checklist progress รายหมวดและรวม
- คลิกเช็ก/ยกเลิกได้ใน Demo และจำสถานะผ่าน localStorage
- Timeline
- Responsive UI
- พร้อมนำขึ้น GitHub / Vercel

## 15 หมวด Investigation Checklist
1. ข้อมูลทะเบียนราษฎร์
2. ครอบครัว / เครือญาติ
3. สถานที่ทำงาน
4. การรักษาพยาบาล
5. ทรัพย์สินและอสังหาริมทรัพย์
6. ข้อมูลยานพาหนะ
7. ใบอนุญาตขับขี่
8. การเดินทางผ่านจุดสกัด / License Plate
9. ข้อมูลโทรศัพท์มือถือ
10. บริษัทไฟแนนซ์ / สินเชื่อ
11. การเงิน
12. สื่อสังคมออนไลน์
13. ข้อมูลการสั่งซื้อสินค้า
14. ข้อมูลการรับ-ส่งพัสดุ
15. ข้อมูลการขอใช้ไฟฟ้า / ประปา

## รันในเครื่อง
```bash
npm install
npm run dev
```
เปิด `http://localhost:3000`

## Deploy GitHub -> Vercel
1. สร้าง GitHub repository
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้
3. เข้า Vercel > Add New > Project
4. Import GitHub repository
5. Framework จะตรวจพบเป็น Next.js
6. กด Deploy

## โครง V2.1 ที่ควรทำต่อ
- Supabase Auth
- PostgreSQL tables: profiles, suspects, warrants, checklist_groups, checklist_items, timeline_events, audit_logs
- Role: admin / supervisor / investigator / viewer
- Row Level Security (RLS)
- CRUD จริง
- บันทึก Checklist ลงฐานข้อมูลกลางแทน localStorage
- หมายเหตุ / แหล่งข้อมูล / วันที่ตรวจสอบ / เจ้าหน้าที่ผู้ตรวจสอบต่อรายการ
- File attachment
- Audit log
- Environment variables on Vercel
