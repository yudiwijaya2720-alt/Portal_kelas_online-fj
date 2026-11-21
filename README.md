# Portal Kelas Digital (Replica)

Aplikasi Web Pembelajaran Member, Bootcamp, dan Distribusi Aset Digital berbasis Single Page Application (SPA) decoupled dengan Google Sheets sebagai Database dan Google Apps Script (GAS) sebagai REST API backend.

Direplikasi secara bersih (*clean-room*) dari `portalkelas-khoirulfajar.vercel.app`.

---

## 🚀 Fitur Utama

- **Layar Lengkap:**
  - `S01 Beranda`: Banner pengumuman, widget sambutan profil terverifikasi, 3 KPI card ringkasan belajar, filter kategori (Semua/Kelas/Dokumen), pencarian real-time.
  - `S02 Kelas Saya`: Katalog inventaris kelas & dokumen yang dimiliki member beserta jumlah episode/materi.
  - `S03 Jalur Belajar`: Navigasi kurikulum 3 jalur (*Fast Track*, *Newbie*, *Metode Antigravity*) dengan progress tahapan visual.
  - `S04 Bootcamp`: Monitoring kelas intensif, jam WIB real-time, radial gauge kehadiran (25%), jadwal pertemuan berikutnya, dan tombol masuk ruang belajar.
  - `S05 Bank Skill AI`: Repositori berkas `.skill` AI dengan badge akses dan tombol unduh.
  - `S06 Library Aplikasi`: Source code template aplikasi web (.zip) dan link demo langsung.
  - `S07 Pameran Karya`: Galeri karya alumni multi-foto & status approval pengajuan member.
  - `S08 Panduan`: Pusat tutorial video dan dokumentasi pemakaian portal.
  - `S10 PIN & Keamanan`: Manajemen profil nama & nomor WhatsApp member.
  - `S11 Modal Redeem Kode`: Dialog penukaran voucher untuk aktivasi kelas/bootcamp seketika.

- **Dual Data Mode:**
  1. **Demo DB Mode (Default):** Langsung berjalan tanpa setup apa pun menggunakan data demo realistis & sinkronisasi `localStorage`.
  2. **Google Sheets Live Mode:** Cukup tempel URL Web App Apps Script di tombol menu navbar **"Sheets Live"** untuk sinkronisasi live dengan database Google Sheets Anda!

---

## 📂 Struktur Proyek

```
Aplikasi_replica_portal-khoirul/
├── index.html                   # Entry point aplikasi web SPA
├── css/
│   └── style.css                # Styling kustom & token desain WCAG 2.2 AA
├── js/
│   ├── seed.js                  # Seed data awal (Profil Wijaya, 8 kelas, bootcamp, dll.)
│   ├── api.js                   # Unified data access layer (Offline/Online toggle)
│   ├── components.js            # Renderer komponen UI modular
│   └── app.js                   # Hash router & event orchestrator
├── backend/
│   ├── SetupSheets.gs           # Skrip otomatis membuat 9 tabel di Google Sheets
│   └── Kode.gs                  # REST API Backend Google Apps Script (doGet & doPost)
└── replica/                     # Artefak analisa Replica Pack
    ├── recon.md                 # Recon map lengkap
    ├── features.csv             # Matriks fitur & pelacakan progress
    ├── architecture.md          # Arsitektur & spesifikasi endpoint
    ├── build-log.md             # Log pembangunan layar demi layar
    ├── screens/                 # 8 screenshot referensi asli
    └── design/                  # Token warna, typography, dan Tailwind config
```

---

## 🛠️ Cara Menjalankan Frontend

### 1. Buka Langsung di Browser
Buka berkas `index.html` langsung di browser Anda (klik ganda atau via Live Server VS Code).

Atau jalankan server lokal sederhana lewat terminal:
```bash
python -m http.server 3000
```
Lalu buka di browser: `http://localhost:3000`

---

## 📊 Cara Menghubungkan ke Google Sheets (Opsional / Live Mode)

1. Buka [Google Sheets](https://sheets.new) untuk membuat spreadsheet baru.
2. Buka menu **Extensions > Apps Script** (Ekstensi > Apps Script).
3. Buat file baru bernama `SetupSheets.gs`, salin isi dari file `backend/SetupSheets.gs`, lalu pilih fungsi `setupDatabase` dan klik **Run** (Jalankan). 9 sheet database akan dibuat otomatis!
4. Buat file baru bernama `Kode.gs`, salin isi dari file `backend/Kode.gs`.
5. Klik **Deploy > New Deployment** (Terapkan > Penerapan Baru):
   - Pilih jenis: **Web App** (Aplikasi Web).
   - Description: `v1`.
   - Execute as: **Me** (Saya).
   - Who has access: **Anyone** (Siapa saja).
6. Salin **Web App URL** yang berakhiran `/exec`.
7. Buka portal di browser Anda, klik tombol pill **"Demo DB"** di navbar atas kanan, lalu tempel URL tersebut. Status akan otomatis berubah menjadi **"Sheets Live"**!

---

## 🧪 Demo Voucher Code untuk Tes Redeem
- `REDEEM-NOV2026`: Mengaktifkan akses Bootcamp Batch 1.
- `BONUS-GAS`: Menambahkan kelas baru ("Cara Integrasi API Pihak Ketiga") langsung ke dashboard.
