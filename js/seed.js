/**
 * seed.js - Seed data for Portal Kelas Digital
 * Matches the original screens perfectly for offline demo, initial state, and fallback.
 */

const SEED_DATA = {
  user: {
    id: "USR-001",
    name: "Wijaya",
    email: "yudiwijaya2720@gmail.com",
    whatsapp: "085841109887",
    role: "member",
    verified: true,
    avatar_initial: "W",
    pin: "123456"
  },
  announcement: {
    title: "PANDUAN MEMBER BARU MENGGUNAKAN KELAS (PORTAL BELAJAR)",
    link: "#/guides"
  },
  stats: {
    totalOwned: 8,
    activeBootcampCount: 1,
    pendingOrders: 0
  },
  products: [
    {
      id: "PRD-001",
      title: "METODE 3 | LANJUTAN - Integrasi GAS ke VERCEL / GITHUB",
      slug: "gas-ke-vercel",
      type: "kelas",
      subtitle: "dari cara Paling Sederhana menjadi Profesional",
      thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      total_episodes: 6,
      total_materials: 27,
      owned: true
    },
    {
      id: "PRD-002",
      title: "Cara Integrasi API Pihak Ketiga",
      slug: "integrasi-api-pihak-ketiga",
      type: "kelas",
      subtitle: "API WhatsApp, API Gemini, dan lain-lain",
      thumbnail_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
      total_episodes: 2,
      total_materials: 8,
      owned: true
    },
    {
      id: "PRD-003",
      title: "Kumpulan PRD (GRATIS)",
      slug: "kumpulan-prd-gratis",
      type: "dokumen",
      subtitle: "Silahkan Download PRD yang dibutuhkan sebagai Referensi",
      thumbnail_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
      total_episodes: 1,
      total_materials: 12,
      owned: true
    },
    {
      id: "PRD-004",
      title: "Kumpulan Video Cara Revisi & Upgrade",
      slug: "revisi-upgrade-appweb",
      type: "kelas",
      subtitle: "Kumpulan Video Cara Revisi & Upgrade biar Aman dan Tidak Error",
      thumbnail_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
      total_episodes: 2,
      total_materials: 6,
      owned: true
    },
    {
      id: "PRD-005",
      title: "METODE 1 | BASIC - Belajar FUNDAMENTAL PENTING",
      slug: "metode-1-basic-gas",
      type: "kelas",
      subtitle: "Belajar Dasar Apps Script dan Logika Pemrograman",
      thumbnail_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
      total_episodes: 3,
      total_materials: 10,
      owned: true
    },
    {
      id: "PRD-006",
      title: "Sudah Install Frontend ke Github dan Backend ke Google Apps Script",
      slug: "install-frontend-backend",
      type: "kelas",
      subtitle: "Panduan Deploy Terstruktur",
      thumbnail_url: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?w=600&auto=format&fit=crop&q=80",
      total_episodes: 1,
      total_materials: 4,
      owned: true
    },
    {
      id: "PRD-007",
      title: "KELAS APPWEB dengan AI Gemini + Google Apps Script PAKE GEMINI AI!",
      slug: "appweb-ai-gemini",
      type: "kelas",
      subtitle: "Membangun Aplikasi Cepat dengan AI",
      thumbnail_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80",
      total_episodes: 4,
      total_materials: 15,
      owned: true
    },
    {
      id: "PRD-008",
      title: "MIGRASI ke DB SUPABASE",
      slug: "migrasi-db-supabase",
      type: "kelas",
      subtitle: "Upgrade Kapasitas Database Tanpa Batas",
      thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
      total_episodes: 2,
      total_materials: 8,
      owned: true
    }
  ],
  bootcamp: {
    id: "BTC-001",
    title: "BootCamp Batch 1 (NOVEMBER)",
    batch_name: "BATCH 1",
    theme: "Dari Ide di Kepala, Jadi AppWeb Nyata",
    banner_image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    total_sessions: 4,
    status: "Berjalan",
    next_session_title: "Pertemuan 2",
    next_session_time: "Minggu, 15 Nov 2026 • 19.30 WIB",
    meeting_url: "https://meet.google.com/xyz-sample",
    enrollment: {
      attended_sessions: 1,
      total_sessions: 4,
      progress_percent: 25,
      materials_unlocked: 5,
      tasks_completed: 1,
      certificate_available: false
    },
    room: {
      verified_student: true,
      graduation_progress: 48,
      requirements_met: "1 dari 4 syarat",
      next_session: {
        date_text: "MINGGU, 15 NOV 2026 • 19.30 WIB",
        session_title: "Sesi 2: Pertemuan 2"
      },
      sessions: [
        {
          id: 1,
          number: 1,
          title: "Pertemuan 1",
          schedule: "Rabu, 11 Nov 2026 • 19.30 WIB - 22.30 WIB",
          completed: true,
          materials_progress: "5/6"
        },
        {
          id: 2,
          number: 2,
          title: "Pertemuan 2",
          schedule: "Minggu, 15 Nov 2026 • 19.30 WIB - 22.30 WIB",
          completed: false,
          active: true,
          presence_window: "Jendela absen 19.30 - 22.30 WIB",
          presence_status: "Absen dibuka 15 Nov 2026 • 19.30 WIB",
          notes: "Materi pertemuan ini akan ditambahkan Admin."
        },
        {
          id: 3,
          number: 3,
          title: "Pertemuan 3",
          schedule: "Minggu, 22 Nov 2026 • 19.30 WIB - 22.30 WIB",
          completed: false,
          active: false
        },
        {
          id: 4,
          number: 4,
          title: "Pertemuan 4",
          schedule: "Minggu, 29 Nov 2026 • 19.30 WIB - 22.30 WIB",
          completed: false,
          active: false
        }
      ],
      certificate_criteria: [
        { label: "Presensi pertemuan", sub: "1 dari 4 pertemuan • minimal 4", status: "pending", icon: "clock" },
        { label: "Semua materi wajib dicentang", sub: "2 dari 3 materi", status: "pending", icon: "circle" },
        { label: "Kuesioner evaluasi", sub: "Tidak ada kuesioner", status: "passed", icon: "check-circle" },
        { label: "Portofolio akhir & kesan-pesan", sub: "Belum diunggah", status: "pending", icon: "upload-cloud" }
      ],
      related_classes: [
        { id: "PRD-001", title: "METODE 3 | LANJUTAN - Integrasi GAS ke VERCEL / GITHUB", sub: "Akses aktif — buka kelas" },
        { id: "PRD-003", title: "Kumpulan PRD (GRATIS)", sub: "Akses aktif — buka kelas" },
        { id: "PRD-004", title: "Kumpulan Video Cara Revisi & Upgrade", sub: "Akses aktif — buka kelas" },
        { id: "PRD-005", title: "METODE 1 | BASIC - Belajar GAS sangat Dasar", sub: "Akses aktif — buka kelas" },
        { id: "PRD-002", title: "METODE 2 | MENENGAH - Integrasi Spreadsheet ke Web", sub: "Akses aktif — buka kelas" },
        { id: "PRD-006", title: "METODE 3 | LANJUTAN - Integrasi GAS ke VERCEL / GITHUB", sub: "Akses aktif — buka kelas" },
        { id: "PRD-008", title: "MIGRASI ke SUPABASE", sub: "Akses aktif — buka kelas" }
      ]
    }
  },
  availableBootcamps: [
    {
      id: "BTC-BATCH-02",
      batch_name: "BATCH 2",
      title: "BootCamp Batch 2 (DESEMBER)",
      theme: "Dari Ide di Kepala, Jadi AppWeb Nyata",
      schedule_text: "Mulai Minggu, 6 Des 2026 • 19.45 WIB",
      sessions_count: 4,
      materials_count: 1,
      price_text: "Rp. 350.000",
      buy_url: "https://lynk.id",
      banner_image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
      curriculum: [
        "Pertemuan 1: Perencanaan & Penyusunan PRD Full-Stack (Claude AI + GAS)",
        "Pertemuan 2: Desain AppWeb Interaktif dengan Google Stitch AI",
        "Pertemuan 3: Integrasi Frontend GitHub + Vercel ke Backend Google Apps Script",
        "Pertemuan 4: Konfigurasi API Eksternal & Release Aplikasi ke Publik"
      ]
    }
  ],
  learningTracks: [
    {
      id: "TRK-01",
      name: "[ FAST TRACK ] Panduan Terstruktur dan Tertib",
      description: "Panduan ini cocok untuk kalian yang sudah pernah belajar Apps Script atau kalian yang belum pernah belajar App Script namun memiliki kelebihan Belajar Otodidak yang Cepat dan Inovatif.",
      ownedCount: 3,
      totalSteps: 3,
      steps: [
        {
          step: 1,
          stage: "[ TAHAP 1 ] PRD",
          subtag: "Install Skill dan Buat PRD",
          product_title: "METODE 1 | BASIC - Belajar GAS sangat...",
          product_id: "PRD-005",
          owned: true
        },
        {
          step: 2,
          stage: "[ TAHAP 2 ] KODING",
          subtag: "Setup GITHUB, VERCEL dan GIT",
          product_title: "METODE 3 | LANJUTAN - Integrasi GAS ke VERCEL...",
          product_id: "PRD-001",
          owned: true
        },
        {
          step: 3,
          stage: "[ TAHAP 3 ] UPGRADE / REVISI",
          subtag: "Kumpulan Video Cara Revisi & Upgrade",
          product_title: "Kumpulan Video Cara Revisi & Upgrade",
          product_id: "PRD-004",
          owned: true
        }
      ]
    },
    {
      id: "TRK-02",
      name: "[ NEW BIE ] Panduan Terstruktur dan Tertib",
      description: "Panduan langkah demi langkah dari nol untuk pemula mutlak tanpa latar belakang koding.",
      ownedCount: 2,
      totalSteps: 2,
      steps: [
        {
          step: 1,
          stage: "[ TAHAP 1 ] FUNDAMENTAL",
          subtag: "Mengenal Google Apps Script",
          product_title: "METODE 1 | BASIC - Belajar FUNDAMENTAL PENTING",
          product_id: "PRD-005",
          owned: true
        },
        {
          step: 2,
          stage: "[ TAHAP 2 ] INTEGRASI",
          subtag: "Deploy Frontend ke GitHub / Vercel",
          product_title: "Sudah Install Frontend ke Github dan Backend ke GAS",
          product_id: "PRD-006",
          owned: true
        }
      ]
    },
    {
      id: "TRK-03",
      name: "[ METODE 3 ANTIGRAVITY ] Panduan Terstruktur dan Tertib",
      description: "Membangun aplikasi tingkat lanjut dengan otomatisasi agentic AI Google Antigravity.",
      ownedCount: 2,
      totalSteps: 2,
      steps: [
        {
          step: 1,
          stage: "[ TAHAP 1 ] AI AGENT",
          subtag: "Prompt Engineering & Skill Bank",
          product_title: "KELAS APPWEB dengan AI Gemini + Google Apps Script",
          product_id: "PRD-007",
          owned: true
        },
        {
          step: 2,
          stage: "[ TAHAP 2 ] PRODUCTION",
          subtag: "Optimalisasi Skala & Deploy",
          product_title: "METODE 3 | LANJUTAN - Integrasi GAS ke VERCEL",
          product_id: "PRD-001",
          owned: true
        }
      ]
    }
  ],
  skills: [
    {
      id: "SKL-001",
      title: "Panduan Instalasi [Artifact]",
      category: "skill",
      tags: ["Umum", "Semua member"],
      file_name: "panduan-instalasi-artifact.skill",
      file_size: "22.3 KB",
      download_url: "#"
    },
    {
      id: "SKL-002",
      title: "GAS Pro API Generator",
      category: "skill",
      tags: ["Umum", "Semua member"],
      file_name: "gas-pro-api.skill",
      file_size: "18.7 KB",
      download_url: "#"
    },
    {
      id: "SKL-003",
      title: "Instant UX Pro Turbo",
      category: "skill",
      tags: ["Khusus", "Pemilik Bootcamp"],
      file_name: "instant-ux-turbo.skill",
      file_size: "34.1 KB",
      download_url: "#"
    }
  ],
  apps: [
    {
      id: "APP-001",
      title: "JuraganKOS v1.0",
      description: "Aplikasi Manajemen Kos-kosan modern berbasis Google Sheets & PWA",
      tag: "Saas",
      status_badge: "Akses Anda aktif",
      file_name: "24 - JURAGAN KOS.zip",
      file_size: "1.95 MB",
      thumbnail_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop&q=80",
      demo_url: "https://juragankos-demo.vercel.app"
    },
    {
      id: "APP-002",
      title: "KasirOnline POS v2.1",
      description: "Point of Sales kasir retail dengan cetak struk thermal Bluetooth",
      tag: "POS",
      status_badge: "Akses Anda aktif",
      file_name: "18 - KASIR THERMAL.zip",
      file_size: "2.40 MB",
      thumbnail_url: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=600&auto=format&fit=crop&q=80",
      demo_url: "https://kasironline-demo.vercel.app"
    }
  ],
  showcase: {
    submission_open: false,
    notice: "Pengajuan karya sedang DITUTUP. Admin menutup pengajuan sementara. Anda tetap bisa melihat karya member lain.",
    my_submission: {
      title: "SIM-DONOR-DARAH",
      submitted_at: "Diajukan 18 Okt 2026 14.16",
      status_badge: "Tampil di Pameran"
    },
    gallery: [
      {
        id: "GAL-001",
        title: "SIM LAWFIRM",
        description: "Jawab disini 3 pertanyaan tersebut",
        author: "Fajar",
        role: "Operator • Alumni METODE 2 | ...",
        avatar_initial: "F",
        image_count: 5,
        thumbnail_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "GAL-002",
        title: "Website Tour and Travel",
        description: "kelas ini sangat bagus buat aku yang pemula ini dan tidak paham...",
        author: "abdi",
        role: "Karyawan Swasta • Alumni MET...",
        avatar_initial: "A",
        image_count: 4,
        thumbnail_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "GAL-003",
        title: "Portal Belajar",
        description: "Baru Paham kalok github itu bisa dibuat seperti Hosting, ya taunya...",
        author: "Fajri Fadhili",
        role: "Dosen • Alumni METODE 2 | ME...",
        avatar_initial: "F",
        image_count: 6,
        thumbnail_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "GAL-004",
        title: "Buku Induk Digital",
        description: "sebelumnya saya mengikuti kelas secara otodidak membuat aplikasi... web berbasis google apps karena...",
        author: "irwan",
        role: "Operator Sekolah • Alumni MET...",
        avatar_initial: "I",
        image_count: 6,
        thumbnail_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "GAL-005",
        title: "Aplikasi Pembayaran Pesantren Musholla",
        description: "Kelas ini sangat membantu saya dalam menyelesaikan Masalah dar...",
        author: "Mahrus Ali",
        role: "Guru • Alumni METODE 2 | MEN...",
        avatar_initial: "M",
        image_count: 5,
        thumbnail_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "GAL-006",
        title: "SIPINJAM KAMPUS",
        description: "1.Pilih kelas ini soalnya tertarik banget pas tahu bakal bikin platfor... kayak Sipinjam Kampus. Di kelas ini...",
        author: "Rizki",
        role: "Mahasiswa • Alumni Otodidak Me...",
        avatar_initial: "R",
        image_count: 4,
        thumbnail_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80"
      }
    ]
  },
  community: {
    title: "Grup Komunitas Member",
    description: "Diskusi, info kelas terbaru, dan saling bantu sesama member.",
    link: "https://chat.whatsapp.com/sample-community-group"
  },
  testimonials: [
    {
      name: "Fajar",
      role: "Operator • Alumni METODE 2",
      quote: "Dari nol tidak paham Google Apps Script sampai bisa bikin SIM Lawfirm sendiri!",
      avatar: "F"
    },
    {
      name: "Fajri Fadhili",
      role: "Dosen • Alumni METODE 2",
      quote: "Baru paham kalau GitHub + GAS bisa dijadikan web app profesional tanpa server berbayar.",
      avatar: "F"
    },
    {
      name: "Mahrus Ali",
      role: "Guru • Alumni METODE 2",
      quote: "Sistem pembayaran pesantren sangat terbantu dengan materi integrasi ini.",
      avatar: "M"
    }
  ],
  guides: [
    {
      id: "GD-001",
      title: "PANDUAN PENGGUNAAN PORTAL KELAS",
      type: "video",
      thumbnail_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "GD-002",
      title: "CARA REEDEM TOKEN BOOTCAMP",
      type: "video",
      thumbnail_url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "GD-003",
      title: "PANDUAN AKSES MASUK KELAS (PORTAL)",
      type: "video",
      thumbnail_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
    }
  ],
  helpdesk: {
    totalArticles: 15,
    totalTopics: 6,
    categories: [
      { id: "all", name: "Semua Artikel", count: 15, icon: "layers" },
      { id: "keamanan", name: "KEAMANAN", count: 1, icon: "shield" },
      { id: "github", name: "GITHUB", count: 2, icon: "git-branch" },
      { id: "vercel", name: "VERCEL", count: 1, icon: "triangle" },
      { id: "kendala_umum", name: "KENDALA UMUM", count: 2, icon: "alert-circle" },
      { id: "prompt", name: "PROMPT", count: 3, icon: "terminal" },
      { id: "metode_1", name: "METODE 1", count: 6, icon: "book" }
    ],
    articles: [
      {
        id: "ART-01",
        category: "PROMPT",
        categoryId: "prompt",
        title: "PROMPT KODING - METODE 1",
        solution: "Gunakan prompt koding terstandar untuk Google Apps Script dengan spesifikasi schema spreadsheet, nama tab, indeks kolom, dan fungsi doPost/doGet yang mengembalikan JSON murni (ContentService.MimeType.JSON). Pastikan menyertakan penanganan CORS dan validasi parameter."
      },
      {
        id: "ART-02",
        category: "PROMPT",
        categoryId: "prompt",
        title: "PROMPT KODING - METODE 3",
        solution: "Prompt arsitektur decoupled: pisahkan logika UI sepenuhnya di Vercel/GitHub Pages dan gunakan Apps Script sebagai REST API JSON backend murni tanpa iframe dan tanpa google.script.run."
      },
      {
        id: "ART-03",
        category: "PROMPT",
        categoryId: "prompt",
        title: "PROMPT ke GOOGLE STITCH (UI UX)",
        solution: "Format prompt Stitch: Deskripsikan nama aplikasi, peran pengguna, 3-4 layar kunci (Dashboard, Form Input, Detail, Status), tema warna HEX, dan komponen Tailwind CSS agar menghasilkan prototipe visual high-fidelity."
      },
      {
        id: "ART-04",
        category: "KENDALA UMUM",
        categoryId: "kendala_umum",
        title: "CARA REVISI APPWEB di METODE 3",
        solution: "Lakukan revisi secara modular: 1) Jika revisi tampilan, cukup edit file HTML/CSS/JS frontend lalu push ke GitHub (Vercel auto redeploy); 2) Jika revisi database/fungsi API, edit Kode.gs di Apps Script lalu klik Deploy > Manage deployments > Edit > New version > Deploy."
      },
      {
        id: "ART-05",
        category: "KENDALA UMUM",
        categoryId: "kendala_umum",
        title: "Bagaimana caranya kita mengupdate script nya di akun lain? Case-nya Saya bikin app di Email A ,dan berhasil. Cuma saya ingin nambah update sedikit dan ingin pakai Email B ?",
        solution: "Solusinya: 1) Buka Google Spreadsheet & Script di Email A, klik tombol Bagikan (Share) ke Email B dengan akses 'Editor'. 2) Buka dari Email B, lakukan update koding. 3) Atau buat salinan spreadsheet (Make a Copy) di Google Drive Email B, deploy Web App baru, dan perbarui URL endpoint di file frontend Anda."
      },
      {
        id: "ART-06",
        category: "VERCEL",
        categoryId: "vercel",
        title: "Cara Hapus Project Deploy di Vercel Bagaimana ?",
        solution: "Buka dashboard Vercel (vercel.com) > pilih project yang ingin dihapus > buka tab 'Settings' > gulir ke bagian paling bawah sampai menemukan bagian 'Delete Project' berwarna merah > klik Delete dan ketik nama project Anda untuk konfirmasi penghapusan permanen."
      },
      {
        id: "ART-07",
        category: "GITHUB",
        categoryId: "github",
        title: "cara Pindah Remote Repo berbeda di GITHUB",
        solution: "Buka terminal di folder proyek lokal Anda, jalankan perintah: `git remote set-url origin https://github.com/username-baru/repo-baru.git`. Setelah itu verifikasi dengan `git remote -v` dan lakukan `git push -u origin main`."
      },
      {
        id: "ART-08",
        category: "GITHUB",
        categoryId: "github",
        title: "Cara Hapus Repository Tidak Terpakai di Github",
        solution: "Buka halaman repository di GitHub.com > klik tab 'Settings' di navigasi atas repository > gulir ke bagian paling bawah pada 'Danger Zone' > klik tombol 'Delete this repository' > masukkan nama repository untuk konfirmasi hapus."
      },
      {
        id: "ART-09",
        category: "KEAMANAN",
        categoryId: "keamanan",
        title: "Cara Mengamankan Script Properties & Endpoint GAS",
        solution: "Jangan pernah menaruh API key, token WhatsApp, atau credential database di dalam kode (hardcoded). Simpan di menu Project Settings > Script Properties. Di file Kode.gs, panggil dengan `PropertiesService.getScriptProperties().getProperty('KEY')`."
      },
      {
        id: "ART-10",
        category: "METODE 1",
        categoryId: "metode_1",
        title: "Error \"Exceeded maximum execution time\" di Google Apps Script",
        solution: "Apps Script membatasi eksekusi maksimal 6 menit per run. Untuk data besar, gunakan teknik batch processing (baca data sekali dengan getValues() bukan per cell), dan gunakan Utilities.sleep() atau Trigger bertahap jika diperlukan."
      },
      {
        id: "ART-11",
        category: "METODE 1",
        categoryId: "metode_1",
        title: "Spreadsheet Tidak Update saat Web App Dijalankan",
        solution: "Pastikan saat deployment Web App, pilihan 'Execute as' diatur ke 'Me (email Anda)' dan 'Who has access' diatur ke 'Anyone'. Jika diatur ke 'User accessing', pengguna luar tidak memiliki hak tulis ke spreadsheet Anda."
      },
      {
        id: "ART-12",
        category: "METODE 1",
        categoryId: "metode_1",
        title: "CORS Error saat memanggil Web App URL dari Browser",
        solution: "Google Apps Script Web App selalu melakukan redirect 302 saat merespons request. Di sisi frontend pastikan fetch tidak menggunakan mode 'no-cors' jika ingin membaca response JSON, dan gunakan redirect follow (default fetch browser). Di backend kembalikan `ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON)`."
      },
      {
        id: "ART-13",
        category: "METODE 1",
        categoryId: "metode_1",
        title: "Formula Spreadsheet Hilang saat Ditulis dari Apps Script",
        solution: "Jika range berisi formula, membaca dengan getValues() lalu menulis ulang dengan setValues() akan menimpa formula menjadi teks nilai statis. Gunakan getFormulas() atau tulis hanya kolom target yang memang berupa data input."
      },
      {
        id: "ART-14",
        category: "METODE 1",
        categoryId: "metode_1",
        title: "Panduan Setup Clasp CLI untuk Koding Lokal",
        solution: "Install Clasp secara global dengan `npm install -g @google/clasp`, aktifkan Apps Script API di user settings Google, lalu jalankan `clasp login` dan `clasp clone <scriptId>` untuk mengembangkan kode di editor lokal seperti VS Code."
      },
      {
        id: "ART-15",
        category: "METODE 1",
        categoryId: "metode_1",
        title: "Mengatur Trigger Otomatis Berdasarkan Waktu / Event",
        solution: "Klik ikon Jam (Triggers) di sebelah kiri editor Apps Script > klik 'Add Trigger' di kanan bawah > pilih fungsi yang ingin dijalankan > tentukan event source (Time-driven untuk interval waktu harian/menit, atau From spreadsheet untuk onEdit/onChange)."
      }
    ]
  }
};
