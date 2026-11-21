/**
 * components.js - UI Component Renderers for Portal Kelas Digital
 * Clean room implementation of all components from replica/design/components.md
 */

const components = {
  /** Top Navbar */
  topNavbar(title, user) {
    return `
      <header class="sticky top-0 z-30 h-16 bg-[#0a1124]/90 backdrop-blur-md border-b border-[#20335e] px-4 md:px-8 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button id="btn-sidebar-toggle" class="md:hidden p-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#111d38] rounded-lg transition-colors" aria-label="Toggle Menu">
            <i data-lucide="menu" class="w-5 h-5"></i>
          </button>
          <h1 id="page-title" class="text-lg md:text-xl font-bold text-[#f8fafc] tracking-tight">${title}</h1>
        </div>

        <div class="flex items-center gap-3">
          <!-- Redeem Voucher Button -->
          <button id="btn-open-redeem" class="btn-gold-glow px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold flex items-center gap-2 cursor-pointer">
            <i data-lucide="key" class="w-4 h-4 text-amber-400"></i>
            <span>Redeem Kode</span>
          </button>

          <!-- Backend Setup / Live Sync Pill -->
          <button id="btn-open-api-config" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[#20335e] bg-[#111d38] text-[#94a3b8] hover:text-[#f8fafc] transition-colors" title="Hubungkan Google Sheets">
            <span class="w-2 h-2 rounded-full ${api.isLive() ? 'bg-emerald-400' : 'bg-amber-400'}"></span>
            <span>${api.isLive() ? 'Sheets Live' : 'Demo DB'}</span>
          </button>

          <!-- Theme Toggle -->
          <button id="btn-theme-toggle" class="p-2 text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#111d38] rounded-lg transition-colors cursor-pointer" aria-label="Toggle Theme" title="Mode Tampilan (Terang / Gelap)">
            <i id="theme-toggle-icon" data-lucide="moon" class="w-4 h-4"></i>
          </button>

          <!-- Logout -->
          <button id="btn-navbar-logout" class="p-2 text-[#94a3b8] hover:text-red-400 hover:bg-[#111d38] rounded-lg transition-colors cursor-pointer" aria-label="Logout" title="Keluar">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </button>

          <!-- User Avatar -->
          <button id="btn-navbar-profile" class="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 border border-blue-400/30 flex items-center justify-center font-bold text-[#f8fafc] text-sm shadow-sm select-none cursor-pointer hover:ring-2 hover:ring-blue-400/50 transition-all" title="Profil Akun Member">
            ${user.avatar_initial || 'W'}
          </button>
        </div>
      </header>
    `;
  },

  /** Sidebar Navigation */
  sidebar(activeRoute, user) {
    const navItems = [
      {
        section: "BELAJAR",
        links: [
          { route: "#/home", label: "Beranda", icon: "layout-grid" },
          { route: "#/library", label: "Kelas Saya", icon: "graduation-cap" },
          { route: "#/jalur", label: "Jalur Belajar", icon: "git-branch" },
          { route: "#/bootcamp", label: "Bootcamp", icon: "calendar" }
        ]
      },
      {
        section: "SUMBER DAYA AI",
        links: [
          { route: "#/prompts", label: "Master Prompt", icon: "sparkles" },
          { route: "#/skills", label: "Bank Skill", icon: "zap" },
          { route: "#/apps", label: "Library Aplikasi", icon: "folder-archive" }
        ]
      },
      {
        section: "KOMUNITAS & LAYANAN",
        links: [
          { route: "#/karya", label: "Pameran Karya", icon: "trophy" },
          { route: "#/guides", label: "Panduan", icon: "book-open" },
          { route: "#/custom", label: "Aplikasi Custom", icon: "code-2" },
          { route: "#/orders", label: "Pesanan", icon: "receipt" },
          { route: "#/helpdesk", label: "Helpdesk", icon: "help-circle" },
          { route: "#/tour", label: "Tur Panduan", icon: "compass" },
          { route: "#/security", label: "PIN & Keamanan", icon: "shield-check" }
        ]
      }
    ];

    let groupsHtml = navItems.map(group => `
      <div class="mb-5">
        <div class="px-3 mb-2 text-[10px] font-extrabold tracking-wider text-[#627d9e] uppercase">${group.section}</div>
        <div class="space-y-1">
          ${group.links.map(link => {
            const isActive = activeRoute === link.route || (activeRoute === '' && link.route === '#/home');
            return `
              <a href="${link.route}" class="sidebar-link ${isActive ? 'active' : ''} flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#111d38] transition-all">
                <i data-lucide="${link.icon}" class="w-4 h-4 flex-shrink-0"></i>
                <span class="truncate">${link.label}</span>
              </a>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    return `
      <!-- Desktop Sidebar -->
      <aside id="main-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen bg-[#0d162d] border-r border-[#20335e] flex flex-col justify-between transition-transform duration-300 md:translate-x-0 -translate-x-full">
        <div class="flex flex-col h-full">
          <!-- Logo Brand -->
          <div class="h-16 px-5 border-b border-[#20335e] flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
                <i data-lucide="layers" class="w-4 h-4"></i>
              </div>
              <div class="font-bold text-sm text-[#f8fafc] truncate">Produk Digital</div>
            </div>
            <button id="btn-sidebar-collapse" class="text-[#94a3b8] hover:text-[#f8fafc] md:block hidden">
              <i data-lucide="panel-left-close" class="w-4 h-4"></i>
            </button>
            <button id="btn-sidebar-close-mobile" class="text-[#94a3b8] hover:text-[#f8fafc] md:hidden block">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Nav Items -->
          <div class="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            ${groupsHtml}
          </div>

          <!-- Bottom User Card & Bottom Logout -->
          <div class="p-3 border-t border-[#20335e] bg-[#0a1124] flex items-center justify-between gap-1">
            <button id="btn-bottom-profile" class="flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#111d38] transition-colors group flex-1 min-w-0 text-left cursor-pointer">
              <div class="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">
                ${user.avatar_initial || 'W'}
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-xs font-semibold text-[#f8fafc] truncate group-hover:text-blue-400 transition-colors">${user.name}</div>
                <div class="text-[11px] text-[#94a3b8] truncate">${user.email}</div>
              </div>
            </button>
            <button id="btn-bottom-logout" class="p-2 text-[#94a3b8] hover:text-red-400 hover:bg-[#111d38] rounded-xl transition-colors cursor-pointer flex-shrink-0" title="Keluar">
              <i data-lucide="log-out" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </aside>

      <!-- Mobile Backdrop -->
      <div id="sidebar-backdrop" class="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden hidden"></div>
    `;
  },

  /** Announcement Banner */
  announcementBanner(announcement) {
    if (!announcement) return '';
    return `
      <div class="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/40 border border-blue-800/40 flex items-center justify-between text-xs md:text-sm">
        <div class="flex items-center gap-3 text-blue-300">
          <i data-lucide="megaphone" class="w-4 h-4 text-blue-400 flex-shrink-0"></i>
          <span><strong>Pengumuman:</strong> ${announcement.title}</span>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <a href="${announcement.link}" class="px-2.5 py-1 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 rounded-md hover:bg-blue-500/20 transition-colors">Lihat</a>
          <button onclick="this.parentElement.parentElement.remove()" class="p-1 text-[#94a3b8] hover:text-[#f8fafc]">
            <i data-lucide="x" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  },

  /** Hero Welcome Card */
  heroWelcome(user) {
    return `
      <div class="relative overflow-hidden p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[#111d38] via-[#132247] to-[#0d182e] border border-[#20335e] shadow-lg">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
              <i data-lucide="check-circle-2" class="w-3 h-3"></i>
              <span>Profil Lengkap & Terverifikasi</span>
            </div>
            <h2 class="text-base md:text-lg font-bold text-[#f8fafc] tracking-tight">Selamat datang kembali, ${user.name}!</h2>
            <p class="text-xs text-[#94a3b8] mt-1">Kelola pembelajaran Anda, cek jadwal bootcamp, atau jelajahi katalog produk digital terbaru.</p>
          </div>
          <div class="flex items-center gap-2.5 flex-shrink-0">
            <a href="#/library" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer">
              <i data-lucide="play-circle" class="w-3.5 h-3.5"></i>
              <span>Kelas Saya</span>
            </a>
            <a href="#/library" class="px-3.5 py-2 rounded-xl bg-[#162548] hover:bg-[#1f3363] text-[#f8fafc] border border-[#20335e] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer">
              <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
              <span>Katalog</span>
            </a>
          </div>
        </div>
      </div>
    `;
  },

  /** Metric KPI Cards */
  statsCards(stats) {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <!-- Inventaris Akses -->
        <div class="p-4 rounded-xl bg-[#111d38] border border-[#20335e] flex flex-col justify-between hover-card">
          <div class="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-1">INVENTARIS AKSES</div>
          <div class="flex items-baseline justify-between">
            <div class="text-base md:text-lg font-bold text-[#f8fafc]">${stats.totalOwned} Produk Dimiliki</div>
            <i data-lucide="library" class="w-4 h-4 text-blue-400 opacity-80"></i>
          </div>
          <div class="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-2 font-medium">
            <i data-lucide="check" class="w-3 h-3"></i>
            <span>Siap dipelajari</span>
          </div>
        </div>

        <!-- Program Bootcamp -->
        <div class="p-4 rounded-xl bg-[#111d38] border border-[#20335e] flex flex-col justify-between hover-card">
          <div class="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-1">PROGRAM BOOTCAMP</div>
          <div class="flex items-baseline justify-between">
            <div class="text-base md:text-lg font-bold text-[#f8fafc]">${stats.activeBootcampCount} Bootcamp Aktif</div>
            <i data-lucide="monitor" class="w-4 h-4 text-indigo-400 opacity-80"></i>
          </div>
          <div class="w-full bg-[#162548] rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div class="bg-blue-500 h-1.5 rounded-full" style="width: 25%"></div>
          </div>
          <div class="text-[10px] text-[#94a3b8] mt-1.5 flex justify-between font-medium">
            <span>Presensi Kehadiran</span>
            <span>Hadir 1/4</span>
          </div>
        </div>

        <!-- Status Pesanan -->
        <div class="p-4 rounded-xl bg-[#111d38] border border-[#20335e] flex flex-col justify-between hover-card">
          <div class="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-1">STATUS PESANAN</div>
          <div class="flex items-baseline justify-between">
            <div class="text-base md:text-lg font-bold text-[#f8fafc]">${stats.pendingOrders} Menunggu</div>
            <i data-lucide="badge-dollar-sign" class="w-4 h-4 text-emerald-400 opacity-80"></i>
          </div>
          <div class="text-[11px] text-[#94a3b8] mt-2 font-medium">Tidak ada pesanan tertunda</div>
        </div>
      </div>
    `;
  },

  /** User Profile Widget (Sidebar kanan Beranda) */
  userProfileWidget(user) {
    let waStr = String(user.whatsapp || '-');
    if (/^\d{9,12}$/.test(waStr) && !waStr.startsWith('0')) {
      waStr = '0' + waStr;
    }

    return `
      <div class="space-y-4">
        <!-- User Info Card -->
        <div class="p-5 rounded-2xl bg-[#111d38] border border-[#20335e] shadow-md">
          <div class="flex items-center gap-3 mb-3.5">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 border border-amber-400/40 flex items-center justify-center font-bold text-slate-950 text-sm shadow-sm flex-shrink-0">
              ${user.avatar_initial || 'W'}
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-sm font-bold text-[#f8fafc] truncate">${user.name}</div>
              <div class="text-[11px] text-[#94a3b8] truncate">${user.email}</div>
            </div>
          </div>

          <div class="py-2 px-3 rounded-xl bg-[#0a1124] border border-[#20335e] flex items-center justify-between text-xs mb-3.5">
            <span class="text-[#94a3b8] text-[11px]">WhatsApp</span>
            <span class="font-mono font-semibold text-[#f8fafc] text-xs">${waStr}</span>
          </div>

          <a href="#/security" class="w-full py-2 rounded-xl bg-[#162548] hover:bg-[#1f3363] text-[#f8fafc] border border-[#20335e] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <i data-lucide="settings" class="w-3.5 h-3.5"></i>
            <span>Pengaturan Akun</span>
          </a>
        </div>

        <!-- Akses Cepat Member -->
        <div class="p-5 rounded-2xl bg-[#111d38] border border-[#20335e] shadow-md">
          <div class="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] mb-3">AKSES CEPAT MEMBER</div>
          <div class="space-y-2">
            <!-- Ajukan Karya -->
            <a href="#/karya" class="flex items-center justify-between p-2.5 rounded-xl bg-[#0a1124] hover:bg-[#162548] border border-[#20335e] transition-colors group">
              <div class="flex items-center gap-2.5">
                <i data-lucide="award" class="w-4 h-4 text-blue-400"></i>
                <div>
                  <div class="text-xs font-semibold text-[#f8fafc] group-hover:text-blue-300">Ajukan Karya</div>
                  <div class="text-[10px] text-[#94a3b8]">Pameran portofolio Anda</div>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-[#94a3b8]"></i>
            </a>

            <!-- Order Aplikasi Custom -->
            <a href="#/custom" class="flex items-center justify-between p-2.5 rounded-xl bg-[#0a1124] hover:bg-[#162548] border border-[#20335e] transition-colors group">
              <div class="flex items-center gap-2.5">
                <i data-lucide="layers" class="w-4 h-4 text-purple-400"></i>
                <div>
                  <div class="text-xs font-semibold text-[#f8fafc] group-hover:text-blue-300">Order Aplikasi Custom</div>
                  <div class="text-[10px] text-[#94a3b8]">Kebutuhan aplikasi khusus</div>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-[#94a3b8]"></i>
            </a>

            <!-- Panduan -->
            <a href="#/guides" class="flex items-center justify-between p-2.5 rounded-xl bg-[#0a1124] hover:bg-[#162548] border border-[#20335e] transition-colors group">
              <div class="flex items-center gap-2.5">
                <i data-lucide="book-open" class="w-4 h-4 text-emerald-400"></i>
                <div>
                  <div class="text-xs font-semibold text-[#f8fafc] group-hover:text-blue-300">Panduan</div>
                  <div class="text-[10px] text-[#94a3b8]">3 dokumen & video tutorial</div>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-[#94a3b8]"></i>
            </a>

            <!-- Helpdesk & CS -->
            <a href="#/helpdesk" class="flex items-center justify-between p-2.5 rounded-xl bg-[#0a1124] hover:bg-[#162548] border border-[#20335e] transition-colors group">
              <div class="flex items-center gap-2.5">
                <i data-lucide="headphones" class="w-4 h-4 text-amber-400"></i>
                <div>
                  <div class="text-xs font-semibold text-[#f8fafc] group-hover:text-blue-300">Helpdesk & CS</div>
                  <div class="text-[10px] text-[#94a3b8]">Solusi kendala & kontak Admin</div>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-[#94a3b8]"></i>
            </a>

            <!-- Redeem Kode Akses -->
            <button onclick="document.getElementById('btn-open-redeem').click()" class="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0a1124] hover:bg-[#162548] border border-[#20335e] transition-colors group text-left cursor-pointer">
              <div class="flex items-center gap-2.5">
                <i data-lucide="key" class="w-4 h-4 text-amber-400"></i>
                <div>
                  <div class="text-xs font-semibold text-[#f8fafc] group-hover:text-amber-300">Redeem Kode Akses</div>
                  <div class="text-[10px] text-[#94a3b8]">Punya kode dari Lynk.id?</div>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-[#94a3b8]"></i>
            </button>
          </div>
        </div>

        <!-- Grup Komunitas Member -->
        <div class="p-5 rounded-2xl bg-[#111d38] border border-[#20335e] shadow-md">
          <div class="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#f8fafc]">
            <i data-lucide="users" class="w-4 h-4 text-blue-400"></i>
            <span>Grup Komunitas Member</span>
          </div>
          <p class="text-[11px] text-[#94a3b8] mb-3.5 leading-relaxed">Diskusi, info kelas terbaru, dan saling bantu sesama member.</p>
          <a href="https://chat.whatsapp.com/sample-group" target="_blank" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer">
            <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
            <span>Gabung Grup</span>
          </a>
        </div>

        <!-- Testimoni Member -->
        <div class="p-5 rounded-2xl bg-[#111d38] border border-[#20335e] shadow-md">
          <div class="flex items-center gap-2 mb-1.5 text-xs font-bold text-[#f8fafc]">
            <i data-lucide="star" class="w-4 h-4 text-amber-400 fill-amber-400"></i>
            <span>Testimoni Member</span>
          </div>
          <p class="text-[11px] text-[#94a3b8] mb-3.5 leading-relaxed">Lihat pengalaman & hasil para member kami.</p>
          <button id="btn-open-testimonials" class="w-full py-2.5 rounded-xl bg-[#162548] hover:bg-[#1f3363] text-[#f8fafc] border border-[#20335e] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            <span>Lihat Testimoni Member</span>
          </button>
        </div>
      </div>
    `;
  },

  /** Course Card */
  courseCard(item) {
    const isDoc = item.type === 'dokumen';
    const typeLabel = isDoc ? 'DOKUMEN' : 'KELAS';
    const typeBadgeClass = isDoc ? 'bg-purple-600/30 border-purple-500/40 text-purple-300' : 'bg-blue-600/30 border-blue-500/40 text-blue-300';

    return `
      <div class="hover-card flex flex-col justify-between bg-[#111d38] border border-[#20335e] rounded-2xl overflow-hidden group">
        <!-- Thumbnail -->
        <div class="relative w-full aspect-video bg-[#0a1124] overflow-hidden">
          <img src="${item.thumbnail_url}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
          
          <!-- Badges Overlay -->
          <div class="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${typeBadgeClass} backdrop-blur-md">
            ${typeLabel}
          </div>
          <div class="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-md flex items-center gap-1">
            <i data-lucide="check" class="w-3 h-3"></i>
            <span>Dimiliki</span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-3.5 flex-1 flex flex-col justify-between">
          <div>
            <div class="text-[10px] font-semibold text-blue-400 uppercase tracking-wide mb-1">${typeLabel}</div>
            <h3 class="text-xs md:text-sm font-bold text-[#f8fafc] line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">${item.title}</h3>
            <p class="text-[11px] text-[#94a3b8] mt-1 line-clamp-2 leading-normal">${item.subtitle || ''}</p>
          </div>

          <div class="mt-3 pt-2.5 border-t border-[#20335e]/60 flex items-center justify-between text-[10px] text-[#94a3b8]">
            <div class="flex items-center gap-2.5">
              ${item.total_episodes ? `<span><i data-lucide="film" class="w-3 h-3 inline mr-1 text-slate-400"></i>${item.total_episodes} episode</span>` : ''}
              <span><i data-lucide="file-text" class="w-3 h-3 inline mr-1 text-slate-400"></i>${item.total_materials} materi</span>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="p-3.5 pt-0">
          <button onclick="alert('Membuka materi: ${item.title}')" class="w-full py-2 rounded-xl bg-[#162548] hover:bg-blue-600 text-[#f8fafc] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer">
            <i data-lucide="play" class="w-3 h-3"></i>
            <span>${isDoc ? 'Akses Produk' : 'Buka Ruang Belajar'}</span>
          </button>
        </div>
      </div>
    `;
  },

  /** Step Timeline (Jalur Belajar) */
  trackTimeline(track) {
    return `
      <div class="mb-8">
        <!-- Track Description Card -->
        <div class="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 to-[#111d38] border border-blue-500/30 mb-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg md:text-xl font-bold text-[#f8fafc]">${track.name}</h3>
              <p class="text-xs md:text-sm text-[#94a3b8] mt-1 max-w-2xl leading-relaxed">${track.description}</p>
            </div>
            <div class="flex-shrink-0 text-right">
              <div class="text-2xl font-black text-[#f8fafc]">${track.ownedCount}/${track.totalSteps}</div>
              <div class="text-xs text-blue-400 font-semibold">kelas dimiliki</div>
              <div class="w-32 bg-[#162548] rounded-full h-1.5 mt-2">
                <div class="bg-blue-500 h-1.5 rounded-full" style="width: ${(track.ownedCount / track.totalSteps) * 100}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Steps Chain Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          ${track.steps.map((st, idx) => `
            <div class="relative p-5 rounded-2xl bg-[#111d38] border border-[#20335e] flex flex-col justify-between hover-card h-full">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-emerald-400">${st.stage}</span>
                  <span class="text-[11px] text-[#94a3b8] font-medium">${st.owned ? '1/1 dimiliki' : '0/1 dimiliki'}</span>
                </div>
                <div class="text-xs text-[#94a3b8] font-medium mb-3">${st.subtag}</div>
                
                <div class="flex items-center gap-3 p-3 rounded-xl bg-[#0a1124] border border-[#20335e]">
                  <div class="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    ${st.step}
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-xs font-bold text-[#f8fafc] truncate">${st.product_title}</div>
                    <div class="text-[10px] text-blue-400 font-semibold">Kelas</div>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-[#20335e]">
                <button onclick="alert('Membuka ${st.product_title}')" class="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer">
                  <i data-lucide="play" class="w-3 h-3"></i>
                  <span>Buka Kelas</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /** Bootcamp Saya Card */
  bootcampCard(btc) {
    const enr = btc.enrollment || {};
    return `
      <div class="p-6 rounded-2xl bg-[#111d38] border border-[#20335e] shadow-xl hover-card">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <!-- Banner Image -->
          <div class="lg:col-span-5 rounded-xl overflow-hidden aspect-video relative bg-[#0a1124] border border-[#20335e]">
            <img src="${btc.banner_image_url}" alt="${btc.title}" class="w-full h-full object-cover">
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-extrabold bg-blue-600 text-white shadow-md">
              ${btc.batch_name}
            </div>
          </div>

          <!-- Bootcamp Info & Gauges -->
          <div class="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ${btc.status}
                </span>
                <span class="text-xs text-[#94a3b8] font-medium flex items-center gap-1">
                  <i data-lucide="clock" class="w-3.5 h-3.5 text-blue-400"></i>
                  <span>Sekarang: 08.19 WIB</span>
                </span>
              </div>

              <h3 class="text-xl font-extrabold text-[#f8fafc] mb-1">${btc.title}</h3>
              <p class="text-xs text-blue-400 font-semibold mb-4">${btc.theme}</p>

              <!-- Session Alert Chip -->
              <div class="p-3.5 rounded-xl bg-[#0a1124] border border-blue-500/30 flex items-center justify-between gap-2 mb-4">
                <div class="flex items-center gap-2 text-xs text-[#f8fafc]">
                  <i data-lucide="calendar" class="w-4 h-4 text-blue-400"></i>
                  <span>Berikutnya: <strong>${btc.next_session_title}</strong> • ${btc.next_session_time}</span>
                </div>
              </div>

              <!-- Stats & Radial Progress -->
              <div class="flex items-center gap-6 py-2">
                <!-- Circular Radial Gauge -->
                <div class="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <svg class="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="26" stroke="#162548" stroke-width="5" fill="transparent" />
                    <circle cx="32" cy="32" r="26" stroke="#3b82f6" stroke-width="5" fill="transparent"
                      stroke-dasharray="163.36" stroke-dashoffset="${163.36 * (1 - (enr.progress_percent || 25) / 100)}" stroke-linecap="round" />
                  </svg>
                  <span class="absolute text-xs font-black text-[#f8fafc]">${enr.progress_percent || 25}%</span>
                </div>

                <div class="text-xs text-[#94a3b8] space-y-1">
                  <div class="flex items-center gap-2">
                    <i data-lucide="user-check" class="w-3.5 h-3.5 text-blue-400"></i>
                    <span>Hadir <strong>${enr.attended_sessions}/${btc.total_sessions}</strong> Pertemuan</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i data-lucide="book" class="w-3.5 h-3.5 text-purple-400"></i>
                    <span><strong>${enr.materials_unlocked || 5}</strong> materi belajar</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i data-lucide="check-square" class="w-3.5 h-3.5 text-emerald-400"></i>
                    <span><strong>${enr.tasks_completed || 1}</strong> tugas diselesaikan</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="mt-4">
              <a href="#/bootcamp/room" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer">
                <i data-lucide="video" class="w-4 h-4"></i>
                <span>Masuk Ruang Belajar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /** Kartu Bootcamp yang Bisa Diikuti (Program Tersedia) */
  availableBootcampCard(item) {
    return `
      <div class="max-w-sm rounded-2xl bg-[#111d38] border border-[#20335e] overflow-hidden hover-card flex flex-col justify-between shadow-lg">
        <div>
          <!-- Poster Flyer Image -->
          <div class="relative w-full aspect-[4/3] bg-[#0a1124] overflow-hidden border-b border-[#20335e]">
            <img src="${item.banner_image_url}" alt="${item.title}" class="w-full h-full object-cover">
            
            <!-- Batch Badge Top Left -->
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-amber-500/25 border border-amber-400/40 text-amber-300 backdrop-blur-md flex items-center gap-1 shadow-sm">
              <i data-lucide="sparkles" class="w-3 h-3 text-amber-400"></i>
              <span>${item.batch_name}</span>
            </div>

            <!-- Total Sessions Bottom Left -->
            <div class="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-black/70 text-slate-200 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
              <i data-lucide="calendar" class="w-3 h-3 text-blue-400"></i>
              <span>${item.sessions_count} pertemuan</span>
            </div>
          </div>

          <!-- Content Info -->
          <div class="p-4">
            <h4 class="text-sm md:text-base font-bold text-[#f8fafc] mb-1.5 leading-snug">${item.title}</h4>
            
            <!-- Schedule Row -->
            <div class="text-xs text-[#94a3b8] flex items-center gap-1.5 mb-3.5">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-blue-400"></i>
              <span>${item.schedule_text}</span>
            </div>

            <!-- Price and Material Row -->
            <div class="flex items-center justify-between pt-2 border-t border-[#20335e]/60 mb-2">
              <div class="text-sm font-extrabold text-blue-400">${item.price_text}</div>
              <div class="text-[11px] text-[#94a3b8] flex items-center gap-1">
                <i data-lucide="file-text" class="w-3 h-3"></i>
                <span>${item.materials_count} materi</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="p-4 pt-0 grid grid-cols-2 gap-2.5">
          <button onclick="alert('Kurikulum ${item.title}:\\n1. Perencanaan & PRD\\n2. Desain Stitch UI\\n3. Integrasi GitHub & Vercel\\n4. Release AppWeb')" class="py-2.5 px-3 rounded-xl bg-[#162548] hover:bg-[#1f3363] text-[#f8fafc] border border-[#20335e] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            <span>Lihat Detail</span>
          </button>
          <a href="${item.buy_url}" target="_blank" class="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer">
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            <span>Beli Token di Lynk.id</span>
          </a>
        </div>
      </div>
    `;
  },

  /** Ruang Belajar Bootcamp (Detail / Learning Room) Sesuai Screenshot */
  bootcampRoomView(btc) {
    const room = (btc && btc.room) ? btc.room : (SEED_DATA.bootcamp.room || {});
    const sessions = room.sessions || [];
    const criteria = room.certificate_criteria || [];
    const classes = room.related_classes || [];
    const progress = room.progress_percent || 48;

    return `
      <div class="space-y-6">
        <!-- Back Breadcrumb -->
        <div>
          <a href="#/bootcamp" class="inline-flex items-center gap-1.5 text-xs text-[#94a3b8] hover:text-blue-400 transition-colors font-medium cursor-pointer">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Bootcamp Saya</span>
          </a>
        </div>

        <!-- Hero Card (Gradient Blue Container) -->
        <div class="rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-3 max-w-xl">
            <!-- Badge Peserta Terverifikasi -->
            <div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/15 border border-white/20 text-white backdrop-blur-md">
                <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-200"></i>
                <span>${room.verified_badge || 'Peserta Terverifikasi'}</span>
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-xl md:text-3xl font-black text-white tracking-tight">${btc.title || 'BootCamp Batch 1 (NOVEMBER)'}</h1>

            <!-- Next Session Bar -->
            <div class="bg-black/25 backdrop-blur-md border border-white/10 rounded-xl px-3.5 py-2.5 flex flex-wrap items-center gap-3">
              <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-white/20 text-white flex items-center gap-1">
                <i data-lucide="calendar" class="w-3 h-3"></i>
                <span>Berikutnya</span>
              </span>
              <div class="text-xs font-bold text-white uppercase tracking-wider">${room.next_session?.time || 'MINGGU, 15 NOV 2026 • 19.30 WIB'}</div>
              <div class="text-xs text-white/90 font-medium">${room.next_session?.title || 'Sesi 2: Pertemuan 2'}</div>
            </div>
          </div>

          <!-- Circular Progress Ring Card -->
          <div class="flex-shrink-0 self-start md:self-center">
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[140px] text-center shadow-lg">
              <div class="relative w-16 h-16 flex items-center justify-center">
                <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path class="text-white/20" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="text-amber-400" stroke-dasharray="${progress}, 100" stroke-linecap="round" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span class="absolute text-sm font-black text-white">${progress}%</span>
              </div>
              <div class="text-xs font-bold text-white mt-2">Progres kelulusan</div>
              <div class="text-[10px] text-white/70">${room.criteria_completed || '1 dari 4 syarat'}</div>
            </div>
          </div>
        </div>

        <!-- Segmented Tab Navigation -->
        <div class="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-[#20335e] pb-3">
          <button class="room-tab-btn active px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 bg-white dark:bg-[#111d38] border border-blue-500 text-blue-600 dark:text-blue-400 shadow-sm transition-all cursor-pointer" data-tab="kurikulum">
            <i data-lucide="book-open" class="w-4 h-4 text-blue-500"></i>
            <span>Kurikulum & Materi</span>
          </button>
          <button class="room-tab-btn px-4 py-2 rounded-xl text-xs md:text-sm font-medium flex items-center gap-2 text-slate-500 dark:text-[#94a3b8] hover:text-slate-800 dark:hover:text-[#f8fafc] border border-transparent transition-all cursor-pointer" data-tab="evaluasi">
            <i data-lucide="file-check-2" class="w-4 h-4"></i>
            <span>Evaluasi & Portofolio</span>
          </button>
          <button class="room-tab-btn px-4 py-2 rounded-xl text-xs md:text-sm font-medium flex items-center gap-2 text-slate-500 dark:text-[#94a3b8] hover:text-slate-800 dark:hover:text-[#f8fafc] border border-transparent transition-all cursor-pointer" data-tab="sertifikat">
            <i data-lucide="award" class="w-4 h-4"></i>
            <span>Sertifikat</span>
          </button>
        </div>

        <!-- 2 Column Content Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <!-- Left Column (8 cols): Tab Content Panes -->
          <div class="lg:col-span-8">
            <!-- PANE 1: Kurikulum & Materi -->
            <div id="room-tab-content-kurikulum" class="room-tab-pane space-y-4">
              <div>
                <h3 class="text-base font-bold text-slate-900 dark:text-[#f8fafc]">Kurikulum & Materi Belajar</h3>
                <p class="text-xs text-slate-500 dark:text-[#94a3b8] mt-0.5">Lakukan presensi, pelajari materi tiap pertemuan, lalu tandai Selesai. Materi tetap bisa dibuka kapan pun.</p>
              </div>

              <!-- Sessions Accordion -->
              <div class="space-y-3">
                ${sessions.map((s, idx) => {
                  const isExpanded = s.active || idx === 1;
                  return `
                    <div class="rounded-2xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] overflow-hidden transition-all shadow-sm">
                      <!-- Session Header -->
                      <div class="p-4 flex items-center justify-between cursor-pointer session-toggle-header" data-session-id="${s.id}">
                        <div class="flex items-center gap-3.5">
                          ${s.completed ? `
                            <div class="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                              <i data-lucide="check" class="w-4 h-4"></i>
                            </div>
                          ` : `
                            <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#162548] border border-slate-200 dark:border-[#20335e] text-slate-700 dark:text-[#f8fafc] flex items-center justify-center font-bold text-xs flex-shrink-0">
                              ${s.number}
                            </div>
                          `}
                          <div>
                            <div class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-[#162548] text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-1">
                              Pertemuan ${s.number}
                            </div>
                            <h4 class="text-sm font-bold text-slate-900 dark:text-[#f8fafc]">${s.title}</h4>
                            <p class="text-[11px] text-slate-500 dark:text-[#94a3b8] mt-0.5">${s.schedule}</p>
                          </div>
                        </div>

                        <div class="flex items-center gap-3">
                          ${s.materials_progress ? `
                            <div class="hidden sm:flex items-center gap-2">
                              <div class="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-[#162548] overflow-hidden">
                                <div class="h-full bg-blue-500 rounded-full" style="width: 83%"></div>
                              </div>
                              <span class="text-[11px] font-bold text-slate-500 dark:text-[#94a3b8]">${s.materials_progress}</span>
                            </div>
                          ` : ''}
                          <button class="text-slate-400 dark:text-[#94a3b8] hover:text-slate-800 dark:hover:text-[#f8fafc] p-1">
                            <i data-lucide="${isExpanded ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4"></i>
                          </button>
                        </div>
                      </div>

                      <!-- Session Body (Expanded if active) -->
                      <div class="session-body px-4 pb-4 pt-1 border-t border-slate-100 dark:border-[#20335e]/60 ${isExpanded ? '' : 'hidden'}">
                        ${s.presence_window ? `
                          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a1124] border border-slate-200 dark:border-[#20335e] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <div class="text-[10px] font-extrabold text-slate-400 dark:text-[#627d9e] uppercase tracking-wider">PRESENSI</div>
                              <div class="text-xs font-semibold text-slate-800 dark:text-[#f8fafc] mt-0.5">${s.presence_window}</div>
                            </div>
                            <div>
                              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-[#162548] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#20335e] shadow-sm">
                                <i data-lucide="lock" class="w-3.5 h-3.5 text-amber-500"></i>
                                <span>${s.presence_status || 'Absen dibuka tepat waktu'}</span>
                              </span>
                            </div>
                          </div>
                        ` : ''}

                        ${s.notes ? `
                          <p class="text-xs text-slate-500 dark:text-[#94a3b8] mt-3">${s.notes}</p>
                        ` : `
                          <div class="text-xs text-slate-500 dark:text-[#94a3b8] mt-3">Materi dan rekaman zoom akan tersedia setelah sesi selesai.</div>
                        `}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- PANE 2: Evaluasi & Portofolio (Sesuai Screenshot Asli) -->
            <div id="room-tab-content-evaluasi" class="room-tab-pane space-y-4 hidden">
              <!-- Card 1: Kuesioner Evaluasi -->
              <div class="rounded-2xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] p-5 shadow-sm">
                <div class="flex items-start gap-3 mb-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <i data-lucide="file-text" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900 dark:text-[#f8fafc]">Kuesioner Evaluasi</h3>
                    <p class="text-[11px] text-slate-500 dark:text-[#94a3b8] mt-0.5">Bantu kami meningkatkan kualitas bootcamp berikutnya.</p>
                  </div>
                </div>
                <div class="text-xs text-slate-500 dark:text-[#94a3b8] bg-slate-50 dark:bg-[#0a1124] p-3 rounded-xl border border-slate-200 dark:border-[#20335e]">
                  Kuesioner belum disiapkan Admin.
                </div>
              </div>

              <!-- Card 2: Portofolio Akhir & Kesan-Pesan -->
              <div class="rounded-2xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] p-5 shadow-sm">
                <div class="flex items-start gap-3 mb-5">
                  <div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/40 text-amber-500 flex items-center justify-center flex-shrink-0">
                    <i data-lucide="award" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900 dark:text-[#f8fafc]">Portofolio Akhir & Kesan-Pesan</h3>
                    <p class="text-[11px] text-slate-500 dark:text-[#94a3b8] mt-0.5 leading-relaxed">
                      Unggah 3-5 tangkapan layar karya/proyek akhir Anda dan tuliskan kesan-pesan. Karya terbaik dapat tampil sebagai testimoni di halaman depan.
                    </p>
                  </div>
                </div>

                <!-- Form -->
                <form id="form-portfolio" onsubmit="event.preventDefault(); alert('Portofolio & Kesan-pesan berhasil disimpan!');" class="space-y-4">
                  <!-- Foto profil (opsional) -->
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#162548] border border-slate-200 dark:border-[#20335e] flex items-center justify-center text-slate-400 flex-shrink-0">
                      <i data-lucide="user" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <div class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Foto profil (opsional)</div>
                      <label class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-[#20335e] bg-slate-50 dark:bg-[#0a1124] hover:bg-slate-100 dark:hover:bg-[#162548] text-xs font-medium text-slate-700 dark:text-[#f8fafc] cursor-pointer transition-colors shadow-sm">
                        <i data-lucide="image" class="w-3.5 h-3.5 text-slate-500"></i>
                        <span>Pilih Foto</span>
                        <input type="file" accept="image/*" class="hidden">
                      </label>
                    </div>
                  </div>

                  <!-- Judul karya * -->
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Judul karya <span class="text-red-500">*</span></label>
                    <input type="text" placeholder="mis. Aplikasi Absensi Sekolah" class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0a1124] border border-slate-200 dark:border-[#20335e] text-xs text-slate-800 dark:text-[#f8fafc] placeholder-slate-400 focus:outline-none focus:border-blue-500">
                  </div>

                  <!-- Tangkapan layar karya * (0/5, minimal 3) -->
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tangkapan layar karya <span class="text-red-500">*</span> <span class="text-slate-400 font-normal text-[11px]">(0/5, minimal 3)</span></label>
                    <div class="flex flex-wrap items-center gap-3">
                      <label class="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 dark:border-[#20335e] hover:border-blue-500 dark:hover:border-blue-400 flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-blue-500 transition-colors bg-slate-50/50 dark:bg-[#0a1124]/50">
                        <i data-lucide="image-plus" class="w-4 h-4 mb-0.5"></i>
                        <span class="text-[10px] font-semibold">Tambah</span>
                        <input type="file" multiple accept="image/*" class="hidden">
                      </label>
                    </div>
                  </div>

                  <!-- Kesan-pesan * (0 karakter, kurang 50) -->
                  <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Kesan-pesan <span class="text-red-500">*</span> <span id="char-count-label" class="text-slate-400 font-normal text-[11px]">(0 karakter, kurang 50)</span></label>
                    <textarea id="input-portfolio-feedback" rows="3" placeholder="Ceritakan pengalaman belajar Anda, hasil yang Anda capai, dan saran untuk peserta berikutnya (minimal 50 karakter)." class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0a1124] border border-slate-200 dark:border-[#20335e] text-xs text-slate-800 dark:text-[#f8fafc] placeholder-slate-400 focus:outline-none focus:border-blue-500"></textarea>
                  </div>

                  <!-- Rating bootcamp & Link demo (opsional) Grid -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Rating bootcamp -->
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Rating bootcamp</label>
                      <div id="star-rating-container" class="flex items-center gap-1.5 text-slate-300 dark:text-slate-600 text-lg cursor-pointer">
                        <span class="star-item hover:text-amber-400 transition-colors text-slate-300" data-value="1">☆</span>
                        <span class="star-item hover:text-amber-400 transition-colors text-slate-300" data-value="2">☆</span>
                        <span class="star-item hover:text-amber-400 transition-colors text-slate-300" data-value="3">☆</span>
                        <span class="star-item hover:text-amber-400 transition-colors text-slate-300" data-value="4">☆</span>
                        <span class="star-item hover:text-amber-400 transition-colors text-slate-300" data-value="5">☆</span>
                      </div>
                    </div>

                    <!-- Link demo (opsional) -->
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Link demo (opsional)</label>
                      <input type="url" placeholder="https://..." class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0a1124] border border-slate-200 dark:border-[#20335e] text-xs text-slate-800 dark:text-[#f8fafc] placeholder-slate-400 focus:outline-none focus:border-blue-500">
                    </div>
                  </div>

                  <!-- Submit button aligned right -->
                  <div class="flex justify-end pt-2">
                    <button type="submit" class="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer">
                      <i data-lucide="cloud-upload" class="w-4 h-4"></i>
                      <span>Kirim Portofolio</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- PANE 3: Sertifikat -->
            <div id="room-tab-content-sertifikat" class="room-tab-pane space-y-5 hidden">
              <div class="rounded-2xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] p-6 shadow-sm">
                <div class="flex items-start gap-3.5 mb-4">
                  <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/40 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <i data-lucide="award" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="text-base font-bold text-slate-900 dark:text-[#f8fafc]">Sertifikat Kelulusan</h3>
                    <p class="text-xs text-slate-500 dark:text-[#94a3b8] mt-0.5">Sertifikat resmi tanda kelulusan Bootcamp Batch 1.</p>
                  </div>
                </div>

                <div class="p-6 rounded-xl bg-slate-50 dark:bg-[#0a1124] border border-slate-200 dark:border-[#20335e] text-center py-8">
                  <div class="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
                    <i data-lucide="lock" class="w-6 h-6"></i>
                  </div>
                  <h4 class="text-sm font-bold text-slate-800 dark:text-[#f8fafc] mb-1">Sertifikat Belum Terbuka</h4>
                  <p class="text-xs text-slate-500 dark:text-[#94a3b8] max-w-sm mx-auto mb-4 leading-relaxed">
                    Selesaikan seluruh 4 syarat kelulusan di panel sebelah kanan untuk mengunduh sertifikat digital ber-nomor verifikasi resmi.
                  </p>
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200 dark:bg-[#162548] text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span>Progres: 1 dari 4 syarat terpenuhi (48%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column (4 cols): Syarat Sertifikat & Kelas Bootcamp -->
          <div class="lg:col-span-4 space-y-5">
            <!-- Card 1: Syarat Sertifikat -->
            <div class="rounded-2xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] p-5 shadow-sm">
              <div class="flex items-center gap-2 mb-4 font-bold text-sm text-slate-900 dark:text-[#f8fafc]">
                <i data-lucide="check-square" class="w-4 h-4 text-blue-500"></i>
                <span>Syarat Sertifikat</span>
              </div>
              
              <div class="space-y-3">
                ${criteria.map(c => {
                  const isPassed = c.status === 'passed';
                  return isPassed ? `
                    <div class="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center mt-0.5 flex-shrink-0">
                        <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
                      </div>
                      <div>
                        <div class="text-xs font-bold text-emerald-800 dark:text-emerald-400">${c.label}</div>
                        <div class="text-[11px] text-emerald-600 dark:text-emerald-300/80">${c.sub}</div>
                      </div>
                    </div>
                  ` : `
                    <div class="flex items-start gap-3 p-1">
                      <div class="w-5 h-5 rounded-full border-2 border-dashed border-slate-300 dark:border-[#627d9e] flex items-center justify-center mt-0.5 flex-shrink-0"></div>
                      <div>
                        <div class="text-xs font-semibold text-slate-800 dark:text-[#f8fafc]">${c.label}</div>
                        <div class="text-[11px] text-slate-500 dark:text-[#94a3b8]">${c.sub}</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Button Lihat Detail Syarat -->
              <button onclick="alert('Syarat Sertifikat Kelulusan:\\n1. Kehadiran presensi 4 sesi\\n2. Mengerjakan materi wajib\\n3. Form evaluasi\\n4. Pengumpulan tugas portofolio akhir')" class="mt-5 w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-[#20335e] bg-slate-50 dark:bg-[#0a1124] hover:bg-slate-100 dark:hover:bg-[#162548] text-xs font-semibold text-slate-700 dark:text-[#f8fafc] flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                <i data-lucide="eye" class="w-3.5 h-3.5 text-blue-500"></i>
                <span>Lihat Detail Syarat</span>
              </button>
            </div>

            <!-- Card 2: Kelas Bootcamp -->
            <div class="rounded-2xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] p-5 shadow-sm">
              <div class="flex items-center gap-2 mb-4 font-bold text-sm text-slate-900 dark:text-[#f8fafc]">
                <i data-lucide="folder" class="w-4 h-4 text-blue-500"></i>
                <span>Kelas Bootcamp</span>
              </div>

              <div class="space-y-2.5">
                ${classes.map(cl => `
                  <a href="#/library" class="p-3 rounded-xl bg-slate-50 dark:bg-[#0a1124] hover:bg-slate-100 dark:hover:bg-[#162548] border border-slate-200 dark:border-[#20335e] flex items-center justify-between gap-3 group transition-colors">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div class="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
                        <i data-lucide="disc" class="w-4 h-4"></i>
                      </div>
                      <div class="min-w-0">
                        <div class="text-xs font-bold text-slate-900 dark:text-[#f8fafc] truncate group-hover:text-blue-500 transition-colors">${cl.title}</div>
                        <div class="text-[11px] text-slate-500 dark:text-[#94a3b8] truncate">${cl.sub}</div>
                      </div>
                    </div>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-slate-400 dark:text-[#627d9e] group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0"></i>
                  </a>
                `).join('')}
              </div>
            </div>

            <!-- Card 3: Butuh Bantuan? Sesuai Screenshot Asli -->
            <div class="rounded-2xl bg-[#eff6ff] dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 p-5 shadow-sm">
              <div class="flex items-center gap-2 mb-2 font-bold text-sm text-slate-900 dark:text-[#f8fafc]">
                <i data-lucide="help-circle" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i>
                <span>Butuh bantuan?</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-[#94a3b8] mb-3 leading-relaxed">
                Kendala absen, materi, atau tugas? Tanyakan langsung ke Admin.
              </p>
              <a href="https://wa.me/6285841109887?text=Halo%20Admin,%20saya%20butuh%20bantuan%20mengenai%20Bootcamp%20Batch%201" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                <span>Hubungi Admin</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /** Bank Skill Card */
  skillCard(item) {
    return `
      <div class="p-6 rounded-2xl bg-[#111d38] border border-[#20335e] flex flex-col justify-between hover-card">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
              <i data-lucide="zap" class="w-4 h-4"></i>
            </span>
            <div class="flex gap-1.5">
              ${(item.tags || []).map(t => `
                <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#162548] text-[#94a3b8] border border-[#20335e]">${t}</span>
              `).join('')}
            </div>
          </div>
          <h3 class="text-base font-bold text-[#f8fafc] mb-1">${item.title}</h3>
          <div class="text-xs text-[#94a3b8] flex items-center gap-1.5 font-mono">
            <i data-lucide="file-code" class="w-3.5 h-3.5 text-blue-400"></i>
            <span>${item.file_name} • ${item.file_size}</span>
          </div>
        </div>

        <div class="mt-6">
          <button onclick="alert('Mengunduh ${item.file_name}')" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Unduh Skill</span>
          </button>
        </div>
      </div>
    `;
  },

  /** Library Aplikasi Card */
  appCard(item) {
    return `
      <div class="p-5 rounded-2xl bg-[#111d38] border border-[#20335e] flex flex-col justify-between hover-card">
        <div>
          <!-- Thumbnail preview -->
          <div class="w-full aspect-video rounded-xl overflow-hidden bg-[#0a1124] mb-4 border border-[#20335e] relative">
            <img src="${item.thumbnail_url}" alt="${item.title}" class="w-full h-full object-cover">
            <div class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">${item.tag}</div>
            <div class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">${item.status_badge}</div>
          </div>
          <h3 class="text-base font-bold text-[#f8fafc] mb-1">${item.title}</h3>
          <p class="text-xs text-[#94a3b8] mb-3">${item.description}</p>
          <div class="text-xs text-[#94a3b8] font-mono flex items-center gap-1.5">
            <i data-lucide="archive" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>${item.file_name} • ${item.file_size}</span>
          </div>
        </div>

        <div class="mt-5 grid grid-cols-2 gap-2">
          <button onclick="alert('Mengunduh ${item.file_name}')" class="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>Unduh .zip</span>
          </button>
          <a href="${item.demo_url}" target="_blank" class="py-2.5 rounded-xl bg-[#162548] hover:bg-[#1f3363] text-[#f8fafc] border border-[#20335e] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer">
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            <span>Demo</span>
          </a>
        </div>
      </div>
    `;
  },

  /** Pameran Karya Showcase */
  showcaseSection(data) {
    return `
      <!-- Notice banner -->
      <div class="p-4 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 text-xs md:text-sm flex items-center gap-3 mb-6">
        <i data-lucide="lock" class="w-4 h-4 text-red-400 flex-shrink-0"></i>
        <span><strong>${data.notice}</strong></span>
      </div>

      <!-- My Submission -->
      <div class="p-5 rounded-2xl bg-[#111d38] border border-[#20335e] mb-8">
        <div class="text-xs font-extrabold uppercase text-[#94a3b8] mb-3">Pengajuan Saya</div>
        <div class="p-4 rounded-xl bg-[#0a1124] border border-[#20335e] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              <i data-lucide="layout" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-sm font-bold text-[#f8fafc]">${data.my_submission.title}</div>
              <div class="text-xs text-[#94a3b8]">${data.my_submission.submitted_at}</div>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ${data.my_submission.status_badge}
          </span>
        </div>
      </div>

      <!-- Gallery Grid -->
      <div>
        <div class="text-xs font-extrabold uppercase text-[#94a3b8] mb-1">GALERI</div>
        <h3 class="text-xl font-bold text-[#f8fafc] mb-1">Pameran Karya Member</h3>
        <p class="text-xs text-[#94a3b8] mb-6">Inspirasi dari karya member lain — portofolio alumni siap pakai.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${data.gallery.map(g => `
            <div class="rounded-2xl overflow-hidden bg-[#111d38] border border-[#20335e] hover-card">
              <div class="relative aspect-video bg-[#0a1124]">
                <img src="${g.thumbnail_url}" alt="${g.title}" class="w-full h-full object-cover">
                <div class="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md flex items-center gap-1">
                  <i data-lucide="image" class="w-3 h-3"></i>
                  <span>${g.image_count}</span>
                </div>
              </div>
              <div class="p-4">
                <h4 class="text-sm font-bold text-[#f8fafc] truncate">${g.title}</h4>
                <p class="text-xs text-[#94a3b8] mt-1">Karya: <strong class="text-slate-300">${g.author}</strong></p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /** Video Guide Card */
  guideCard(item) {
    return `
      <div class="rounded-2xl overflow-hidden bg-[#111d38] border border-[#20335e] flex flex-col justify-between hover-card group">
        <div class="relative aspect-video bg-[#0a1124] overflow-hidden">
          <img src="${item.thumbnail_url}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div class="w-12 h-12 rounded-full bg-blue-600/80 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <i data-lucide="play" class="w-5 h-5 ml-0.5"></i>
            </div>
          </div>
          <div class="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">Video</div>
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between">
          <h4 class="text-sm font-bold text-[#f8fafc] mb-4">${item.title}</h4>
          <button onclick="alert('Memutar video: ${item.title}')" class="w-full py-2.5 rounded-xl bg-[#162548] hover:bg-blue-600 text-[#f8fafc] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <i data-lucide="play-circle" class="w-4 h-4"></i>
            <span>Tonton Video</span>
          </button>
        </div>
      </div>
    `;
  },

  /** Redeem Modal Popup */
  redeemModal() {
    return `
      <div id="modal-redeem" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="relative w-full max-w-md rounded-2xl bg-[#111d38] border border-[#20335e] p-6 shadow-2xl">
          <button id="btn-close-redeem" class="absolute top-4 right-4 p-1.5 text-[#94a3b8] hover:text-[#f8fafc] rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <i data-lucide="key" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-[#f8fafc]">Redeem Kode Akses</h3>
              <p class="text-xs text-[#94a3b8]">Klaim kelas atau aktivasi tiket bootcamp</p>
            </div>
          </div>

          <form id="form-redeem" class="space-y-4">
            <div>
              <label for="input-voucher-code" class="block text-xs font-semibold text-[#f8fafc] mb-1.5">Kode Voucher / Token</label>
              <input id="input-voucher-code" type="text" placeholder="Contoh: REDEEM-NOV2026 atau BONUS-GAS" required
                class="w-full px-4 py-3 rounded-xl bg-[#0a1124] border border-[#20335e] text-[#f8fafc] placeholder-[#627d9e] text-sm uppercase tracking-wider focus:outline-none focus:border-amber-400">
            </div>

            <div id="redeem-feedback" class="text-xs hidden p-3 rounded-xl"></div>

            <button type="submit" id="btn-submit-redeem" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2">
              <i data-lucide="sparkles" class="w-4 h-4"></i>
              <span>Tukarkan Kode</span>
            </button>
          </form>

          <div class="mt-4 pt-4 border-t border-[#20335e] text-center text-xs text-[#94a3b8]">
            Belum punya kode? Hubungi admin melalui menu <a href="#/guides" class="text-blue-400 hover:underline">Panduan</a>.
          </div>
        </div>
      </div>
    `;
  },

  /** Google Apps Script URL Config Modal */
  apiConfigModal() {
    const currentUrl = api.getApiUrl();
    return `
      <div id="modal-api-config" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="relative w-full max-w-lg rounded-2xl bg-[#111d38] border border-[#20335e] p-6 shadow-2xl">
          <button id="btn-close-api-config" class="absolute top-4 right-4 p-1.5 text-[#94a3b8] hover:text-[#f8fafc] rounded-lg">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <i data-lucide="database" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-[#f8fafc]">Koneksi Google Sheets DB</h3>
              <p class="text-xs text-[#94a3b8]">Sambungkan aplikasi web ke Web App Google Apps Script</p>
            </div>
          </div>

          <div class="text-xs text-[#94a3b8] mb-4 space-y-1.5 bg-[#0a1124] p-3.5 rounded-xl border border-[#20335e]">
            <p>1. Buka file <code class="text-blue-400">backend/SetupSheets.gs</code> di Google Spreadsheet untuk membuat 9 tabel database.</p>
            <p>2. Salin <code class="text-blue-400">backend/Kode.gs</code> ke Apps Script, klik <strong>Deploy > New Deployment > Web App</strong> (Access: Anyone).</p>
            <p>3. Tempel URL Web App di bawah ini:</p>
          </div>

          <form id="form-api-config" class="space-y-4">
            <div>
              <label for="input-gas-url" class="block text-xs font-semibold text-[#f8fafc] mb-1.5">Web App URL (exec)</label>
              <input id="input-gas-url" type="url" value="${currentUrl}" placeholder="https://script.google.com/macros/s/.../exec"
                class="w-full px-4 py-3 rounded-xl bg-[#0a1124] border border-[#20335e] text-[#f8fafc] placeholder-[#627d9e] text-xs focus:outline-none focus:border-emerald-400">
            </div>

            <div class="flex items-center gap-3">
              <button type="submit" class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer">
                Simpan & Hubungkan
              </button>
              <button type="button" id="btn-reset-api" class="px-4 py-2.5 rounded-xl bg-[#162548] hover:bg-[#1f3363] text-[#94a3b8] hover:text-[#f8fafc] font-semibold text-xs border border-[#20335e] transition-colors cursor-pointer">
                Gunakan Demo DB
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  /** Showcase Section in Home Page (Pameran Karya Member di Beranda) */
  showcaseHomeGrid(items) {
    const list = items || [];
    return `
      <div class="mt-12 pt-8 border-t border-[#20335e]">
        <div class="flex items-center justify-between mb-4">
          <div>
            <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-500 mb-0.5">SHOWCASE</div>
            <h3 class="text-base md:text-lg font-bold text-[#f8fafc] tracking-tight">Pameran Karya Member</h3>
            <p class="text-xs text-[#94a3b8]">Karya terbaik para member — jadikan inspirasi!</p>
          </div>
          <a href="#/karya" class="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            <span>Lihat semua</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${list.map(item => `
            <div class="hover-card flex flex-col justify-between bg-[#111d38] border border-[#20335e] rounded-2xl overflow-hidden group">
              <div class="relative w-full aspect-video bg-[#0a1124] overflow-hidden">
                <img src="${item.thumbnail_url}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
                <div class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md flex items-center gap-1">
                  <i data-lucide="camera" class="w-3 h-3"></i>
                  <span>${item.image_count || 5}</span>
                </div>
              </div>

              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 class="text-xs md:text-sm font-bold text-[#f8fafc] truncate mb-1">${item.title}</h4>
                  <p class="text-[11px] text-[#94a3b8] line-clamp-2 leading-relaxed mb-4">${item.description || ''}</p>
                </div>

                <div class="pt-3 border-t border-[#20335e]/60 flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    ${item.avatar_initial || 'M'}
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-xs font-semibold text-[#f8fafc] truncate">${item.author}</div>
                    <div class="text-[10px] text-[#94a3b8] truncate">${item.role || 'Alumni Member'}</div>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /** Modal Testimoni Member */
  testimonialModal(testimonials) {
    const list = testimonials || SEED_DATA.testimonials || [];
    return `
      <div id="modal-testimonial" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="relative w-full max-w-xl rounded-2xl bg-[#111d38] border border-[#20335e] p-6 shadow-2xl">
          <button id="btn-close-testimonial" class="absolute top-4 right-4 p-1.5 text-[#94a3b8] hover:text-[#f8fafc] rounded-lg cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <i data-lucide="star" class="w-5 h-5 fill-amber-400"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-[#f8fafc]">Testimoni Para Member</h3>
              <p class="text-xs text-[#94a3b8]">Pengalaman nyata member yang belajar di portal kami</p>
            </div>
          </div>

          <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            ${list.map(t => `
              <div class="p-4 rounded-xl bg-[#0a1124] border border-[#20335e]">
                <div class="flex items-center gap-3 mb-2.5">
                  <div class="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                    ${t.avatar || 'M'}
                  </div>
                  <div>
                    <div class="text-xs font-bold text-[#f8fafc]">${t.name}</div>
                    <div class="text-[10px] text-[#94a3b8]">${t.role}</div>
                  </div>
                </div>
                <p class="text-xs text-slate-300 italic leading-relaxed">"${t.quote}"</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  /** S08: Pusat Bantuan & Helpdesk */
  helpdeskView(data) {
    const helpdesk = data || SEED_DATA.helpdesk;
    const categories = helpdesk.categories || [];
    const articles = helpdesk.articles || [];

    return `
      <div>
        <!-- Top Header Row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div class="text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-0.5">KNOWLEDGE BASE & SOLUSI</div>
            <h2 class="text-lg md:text-xl font-bold text-slate-800 dark:text-[#f8fafc] tracking-tight">Pusat Bantuan & Helpdesk</h2>
            <p class="text-xs text-slate-500 dark:text-[#94a3b8] mt-0.5">Temukan solusi cepat untuk kendala akses, materi, pembayaran, dan lainnya.</p>
          </div>
          <div>
            <a href="https://wa.me/6285841109887?text=Halo%20Admin,%20saya%20butuh%20bantuan%20terkait%20portal" target="_blank" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer">
              <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
              <span>Tanya Admin</span>
            </a>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="mb-5">
          <div class="relative">
            <i data-lucide="search" class="w-3.5 h-3.5 absolute left-3.5 top-3 text-slate-400"></i>
            <input type="text" id="helpdesk-search-input" placeholder='Cari kendala, mis. "video tidak muncul"' class="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] text-xs text-slate-800 dark:text-[#f8fafc] placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm">
          </div>
        </div>

        <!-- 3 Stats & Quick Action Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-5">
          <!-- Card 1: Total Solusi -->
          <div class="p-3.5 rounded-xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] flex items-center gap-3 shadow-sm">
            <div class="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center flex-shrink-0">
              <i data-lucide="book-open" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">TOTAL SOLUSI</div>
              <div class="text-xs md:text-sm font-bold text-slate-800 dark:text-[#f8fafc]">${helpdesk.totalArticles || 15} Artikel</div>
            </div>
          </div>

          <!-- Card 2: Kategori -->
          <div class="p-3.5 rounded-xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] flex items-center gap-3 shadow-sm">
            <div class="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <i data-lucide="folder" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">KATEGORI</div>
              <div class="text-xs md:text-sm font-bold text-slate-800 dark:text-[#f8fafc]">${helpdesk.totalTopics || 6} Topik</div>
            </div>
          </div>

          <!-- Card 3: Chat Admin (Orange/Peach Accent) -->
          <a href="https://wa.me/6285841109887?text=Halo%20Admin,%20saya%20ingin%20tanya%20kendala%20portal" target="_blank" class="p-3.5 rounded-xl bg-[#ffedd5] dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/50 flex items-center gap-3 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer">
            <div class="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
              <i data-lucide="message-circle" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-[9px] font-extrabold text-amber-800/80 dark:text-amber-300/80 uppercase tracking-wider">BUTUH BANTUAN LANGSUNG?</div>
              <div class="text-xs md:text-sm font-bold text-slate-800 dark:text-[#f8fafc]">Chat Admin</div>
            </div>
          </a>
        </div>

        <!-- 2 Column Layout: Categories Sidebar + Articles Accordion -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <!-- Left Column (4 cols): Categories Sidebar -->
          <div class="lg:col-span-4 space-y-3.5">
            <!-- Categories List Card -->
            <div class="rounded-xl bg-white dark:bg-[#111d38] border border-slate-200 dark:border-[#20335e] p-3 shadow-sm">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">KATEGORI BANTUAN</div>
              <div class="space-y-0.5">
                ${categories.map((c, idx) => `
                  <button class="helpdesk-cat-btn w-full p-2 rounded-lg text-[11px] font-medium flex items-center justify-between transition-colors cursor-pointer ${idx === 0 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 active-cat font-semibold' : 'text-slate-600 dark:text-[#94a3b8] hover:bg-slate-50 dark:hover:bg-[#162548]'}" data-cat="${c.id}">
                    <div class="flex items-center gap-2">
                      <i data-lucide="${c.icon || 'folder'}" class="w-3.5 h-3.5 text-slate-400"></i>
                      <span>${c.name}</span>
                    </div>
                    <span class="cat-count-badge px-1.5 py-0.5 rounded-full text-[9px] font-bold ${idx === 0 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-[#162548] text-slate-500 dark:text-[#94a3b8]'}">${c.count}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Masih ada kendala? Card -->
            <div class="rounded-xl bg-[#eff6ff] dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 p-3 shadow-sm space-y-2">
              <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-[#f8fafc]">
                <i data-lucide="help-circle" class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"></i>
                <span>Masih ada kendala?</span>
              </div>
              <p class="text-[10px] text-slate-500 dark:text-[#94a3b8] leading-relaxed">
                Hubungi Admin dan sebutkan kategori kendala Anda agar cepat ditangani.
              </p>
              <a href="https://wa.me/6285841109887?text=Halo%20Admin,%20saya%20masih%20mengalami%20kendala" target="_blank" class="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                <span>Hubungi Admin</span>
              </a>
            </div>
          </div>

          <!-- Right Column (8 cols): Articles Accordion -->
          <div class="lg:col-span-8 space-y-1.5" id="helpdesk-articles-container">
            ${articles.map(art => `
              <div class="helpdesk-article-item rounded-xl bg-white dark:bg-[#111d38] border border-slate-200/80 dark:border-[#20335e] overflow-hidden transition-all shadow-sm" data-category="${art.categoryId}">
                <!-- Header / Question Bar -->
                <div class="py-2 px-3.5 flex items-center justify-between cursor-pointer helpdesk-toggle-header gap-3">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase bg-slate-100 dark:bg-[#162548] text-slate-500 dark:text-[#94a3b8] border border-slate-200/80 dark:border-[#20335e] flex-shrink-0 tracking-wider">
                      ${art.category}
                    </span>
                    <h4 class="text-[11px] font-medium text-slate-700 dark:text-slate-200 truncate leading-snug">
                      ${art.title}
                    </h4>
                  </div>
                  <button class="text-slate-400 dark:text-[#94a3b8] hover:text-slate-700 dark:hover:text-[#f8fafc] p-0.5 flex-shrink-0">
                    <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
                  </button>
                </div>

                <!-- Answer Body (Accordion Collapse) -->
                <div class="helpdesk-answer-body px-3.5 pb-3 pt-1 border-t border-slate-100 dark:border-[#20335e]/60 hidden">
                  <p class="text-[11px] text-slate-500 dark:text-[#94a3b8] leading-relaxed">
                    ${art.solution}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  /** Modal Profil Pengguna */
  profileModal(user) {
    const u = user || SEED_DATA.user;
    return `
      <div id="modal-profile" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="relative w-full max-w-md rounded-2xl bg-[#111d38] border border-[#20335e] p-6 shadow-2xl">
          <button id="btn-close-profile" class="absolute top-4 right-4 p-1.5 text-[#94a3b8] hover:text-[#f8fafc] rounded-lg cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>

          <div class="text-center mb-6">
            <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 border-2 border-blue-400/50 flex items-center justify-center font-black text-2xl text-white mx-auto mb-3 shadow-lg shadow-blue-600/30">
              ${u.avatar_initial || 'W'}
            </div>
            <h3 class="text-lg font-bold text-[#f8fafc]">${u.name}</h3>
            <p class="text-xs text-[#94a3b8] mt-0.5">${u.email}</p>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold mt-2.5">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
              <span>Member Terverifikasi</span>
            </div>
          </div>

          <div class="space-y-2.5 mb-6">
            <div class="p-3 rounded-xl bg-[#0a1124] border border-[#20335e] flex items-center justify-between text-xs">
              <span class="text-[#94a3b8]">WhatsApp</span>
              <span class="font-mono font-semibold text-[#f8fafc]">0${u.whatsapp || '85841109887'}</span>
            </div>
            <div class="p-3 rounded-xl bg-[#0a1124] border border-[#20335e] flex items-center justify-between text-xs">
              <span class="text-[#94a3b8]">Status Akun</span>
              <span class="font-semibold text-emerald-400">Aktif (8 Produk Dimiliki)</span>
            </div>
            <div class="p-3 rounded-xl bg-[#0a1124] border border-[#20335e] flex items-center justify-between text-xs">
              <span class="text-[#94a3b8]">Bootcamp</span>
              <span class="font-semibold text-blue-400">Batch 1 (November)</span>
            </div>
          </div>

          <div class="space-y-2.5">
            <a href="#/security" id="btn-profile-to-security" class="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer">
              <i data-lucide="shield" class="w-4 h-4"></i>
              <span>Pengaturan PIN & Keamanan</span>
            </a>
            <button id="btn-profile-trigger-logout" class="w-full py-2.5 px-4 rounded-xl bg-[#162548] hover:bg-red-500/20 text-[#94a3b8] hover:text-red-400 border border-[#20335e] hover:border-red-500/40 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <i data-lucide="log-out" class="w-4 h-4"></i>
              <span>Keluar dari Akun</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /** Modal Konfirmasi Logout */
  logoutModal(user) {
    const u = user || SEED_DATA.user;
    return `
      <div id="modal-logout" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 hidden">
        <div class="relative w-full max-w-sm rounded-2xl bg-[#111d38] border border-[#20335e] p-6 shadow-2xl text-center">
          <div class="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-4">
            <i data-lucide="log-out" class="w-6 h-6"></i>
          </div>

          <h3 class="text-base font-bold text-[#f8fafc] mb-1.5">Keluar dari Akun?</h3>
          <p class="text-xs text-[#94a3b8] leading-relaxed mb-6">
            Apakah Anda yakin ingin keluar dari akun <strong class="text-slate-200">${u.name}</strong>? Anda dapat masuk kembali kapan saja.
          </p>

          <div class="grid grid-cols-2 gap-3">
            <button id="btn-cancel-logout" class="py-2.5 px-4 rounded-xl bg-[#162548] hover:bg-[#1f3363] text-[#f8fafc] border border-[#20335e] font-semibold text-xs transition-colors cursor-pointer">
              Batal
            </button>
            <button id="btn-confirm-logout" class="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5">
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
              <span>Ya, Keluar</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
