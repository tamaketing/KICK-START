# Setup: ส่งข้อมูลจากฟอร์มเข้า Google Sheets

1) สร้าง Google Sheet ใหม่ แล้วตั้งชื่อไฟล์ตามต้องการ  
2) ไปที่ `Extensions` -> `Apps Script`  
3) วางโค้ดจากไฟล์ `google-apps-script.gs` ลงใน Apps Script  
4) ถ้าเป็น Apps Script แบบ standalone ให้ใส่ `SPREADSHEET_ID` ในโค้ด
   - เอา ID จาก URL ชีต: `https://docs.google.com/spreadsheets/d/<ID>/edit`
5) กด `Deploy` -> `New deployment`  
6) Type เลือก `Web app`  
7) ตั้งค่า:
   - Execute as: `Me`
   - Who has access: `Anyone`
8) กด Deploy และอนุญาตสิทธิ์  
9) คัดลอก `Web app URL` ที่ได้
10) เปิดไฟล์ `index.html` แล้วแทนค่า:

```js
const SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

ให้เป็น URL จริงจากข้อ 8

11) เปิดฟอร์มในเบราว์เซอร์ แล้วลองกด `ส่งข้อมูล`

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
- ถ้า error ขึ้นว่า `No active spreadsheet found` ให้ตั้งค่า `SPREADSHEET_ID` ใน Apps Script