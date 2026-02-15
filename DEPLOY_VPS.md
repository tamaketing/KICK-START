# Deploy ขึ้น VPS (Nginx + SSL)

เอกสารนี้สำหรับ deploy ฟอร์ม `index.html` ขึ้น VPS Linux (Ubuntu) ให้ลูกค้าเปิดกรอกได้ทันที

## 1) เตรียมไฟล์จากเครื่องคุณ

ไฟล์ที่ต้องใช้:
- `index.html`

ถ้าใช้ WinSCP ก็อัปโหลดไฟล์ `index.html` ไป VPS ได้เลย  
หรือใช้ SCP จาก PowerShell:

```powershell
scp D:\arcademy\index.html root@YOUR_VPS_IP:/var/www/kickstart-form/index.html
```

## 2) ติดตั้ง Nginx บน VPS

SSH เข้า VPS:

```bash
ssh root@YOUR_VPS_IP
```

ติดตั้ง:

```bash
apt update
apt install -y nginx
```

สร้างโฟลเดอร์เว็บ:

```bash
mkdir -p /var/www/kickstart-form
chown -R www-data:www-data /var/www/kickstart-form
chmod -R 755 /var/www/kickstart-form
```

## 3) ตั้งค่า Nginx

สร้างไฟล์ config:

```bash
cat >/etc/nginx/sites-available/kickstart-form <<'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    root /var/www/kickstart-form;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
```

เปิดใช้งาน config:

```bash
ln -s /etc/nginx/sites-available/kickstart-form /etc/nginx/sites-enabled/kickstart-form
nginx -t
systemctl reload nginx
```

## 4) ชี้โดเมน

ที่ DNS provider ให้ตั้ง:
- A record: `@` -> `YOUR_VPS_IP`
- A record: `www` -> `YOUR_VPS_IP`

รอ DNS กระจายตัว 5-30 นาที (บางเจ้าอาจนานกว่า)

## 5) ใส่ HTTPS (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com -d www.your-domain.com
```

เช็ก auto-renew:

```bash
systemctl status certbot.timer
```

## 6) อัปเดตเว็บรอบถัดไป

ทุกครั้งที่แก้ `index.html`:

```powershell
scp D:\arcademy\index.html root@YOUR_VPS_IP:/var/www/kickstart-form/index.html
```

จากนั้น (ถ้าต้องการ) reload nginx:

```bash
systemctl reload nginx
```

## 7) เช็กการทำงาน

1. เปิด `https://your-domain.com`  
2. กรอกฟอร์ม แล้วกด `ส่งข้อมูลเข้า Google Sheets`  
3. ไปดูในชีตว่าแถวใหม่เข้าหรือไม่

## ปัญหาที่เจอบ่อย

- ส่งฟอร์มไม่เข้า Sheets: ตรวจ `SCRIPT_URL` ใน `index.html` ว่าเป็น Web App URL ล่าสุด
- ได้ 403 จาก Apps Script: Deploy ไม่ใช่ Web App หรือ Access ไม่ใช่ `Anyone`
- เว็บเข้าไม่ได้: firewall ยังไม่เปิดพอร์ต 80/443

เปิด firewall (ถ้าใช้ UFW):

```bash
ufw allow 80
ufw allow 443
ufw enable
```
