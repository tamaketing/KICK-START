# Setup: ส่งข้อมูลจากฟอร์มเข้า Google Sheets

1) สร้าง Google Sheet ใหม่ แล้วตั้งชื่อไฟล์ตามต้องการ  
2) ไปที่ `Extensions` -> `Apps Script`  
3) วางโค้ดจากไฟล์ `google-apps-script.gs` ลงใน Apps Script  
4) กด `Deploy` -> `New deployment`  
5) Type เลือก `Web app`  
6) ตั้งค่า:
   - Execute as: `Me`
   - Who has access: `Anyone`
7) กด Deploy และอนุญาตสิทธิ์  
8) คัดลอก `Web app URL` ที่ได้
9) เปิดไฟล์ `index.html` แล้วแทนค่า:

```js
const SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

ให้เป็น URL จริงจากข้อ 8

10) เปิดฟอร์มในเบราว์เซอร์ แล้วลองกด `ส่งข้อมูลเข้า Google Sheets`

## โครงสร้างคอลัมน์ที่จะถูกสร้างอัตโนมัติ

- timestamp
- fbLink
- access
- adAccount
- lineId
- hasAdmin
- inbox
- booking
- signup
- fullReason
- location
- decision
- timeSlot
- budget

## หมายเหตุ

- ถ้าคลิกส่งแล้วขึ้นว่าไม่สำเร็จ ให้เช็กว่า deploy เป็น `Web app` และ access เป็น `Anyone`
- ทุกครั้งที่แก้ Apps Script ต้อง `Deploy new version` แล้วอัปเดต URL ถ้าระบบสร้าง URL ใหม่
