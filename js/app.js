/**
 * app.js - Main Application Orchestrator & Hash Router
 * Single Page Application for Portal Kelas Digital Replica
 */

const app = {
  state: {
    currentRoute: '',
    searchQuery: '',
    categoryFilter: 'semua',
    initialData: null,
    tracks: [],
    skills: [],
    apps: [],
    showcase: null,
    guides: []
  },

  async init() {
    // Restore Saved Theme
    const savedTheme = localStorage.getItem('PORTAL_THEME');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    this.setupGlobalEvents();
    await this.loadInitialData();
    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();
  },

  async loadInitialData() {
    this.state.initialData = await api.getInitialData();
    this.renderShell();
  },

  renderShell() {
    const data = this.state.initialData;
    const user = data.user;

    // Render Sidebar & Navbar
    document.getElementById('sidebar-container').innerHTML = components.sidebar(this.state.currentRoute, user);
    document.getElementById('navbar-container').innerHTML = components.topNavbar(this.getPageTitle(this.state.currentRoute), user);
    document.getElementById('modals-container').innerHTML = 
      components.redeemModal() + 
      components.apiConfigModal() + 
      components.testimonialModal(SEED_DATA.testimonials) +
      components.profileModal(user) +
      components.logoutModal(user);

    this.bindShellEvents();
    if (window.lucide) window.lucide.createIcons();
  },

  bindShellEvents() {
    // Sidebar Mobile Toggle
    const toggleBtn = document.getElementById('btn-sidebar-toggle');
    const closeBtn = document.getElementById('btn-sidebar-close-mobile');
    const sidebar = document.getElementById('main-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    const toggleSidebar = () => {
      sidebar.classList.toggle('-translate-x-full');
      backdrop.classList.toggle('hidden');
    };

    if (toggleBtn) toggleBtn.onclick = toggleSidebar;
    if (closeBtn) closeBtn.onclick = toggleSidebar;
    if (backdrop) backdrop.onclick = toggleSidebar;

    // Open Redeem Modal
    const btnOpenRedeem = document.getElementById('btn-open-redeem');
    const modalRedeem = document.getElementById('modal-redeem');
    const btnCloseRedeem = document.getElementById('btn-close-redeem');
    const formRedeem = document.getElementById('form-redeem');
    const inputCode = document.getElementById('input-voucher-code');
    const feedback = document.getElementById('redeem-feedback');

    if (btnOpenRedeem) {
      btnOpenRedeem.onclick = () => {
        modalRedeem.classList.remove('hidden');
        if (feedback) feedback.classList.add('hidden');
        if (inputCode) inputCode.focus();
      };
    }
    if (btnCloseRedeem) {
      btnCloseRedeem.onclick = () => modalRedeem.classList.add('hidden');
    }

    if (formRedeem) {
      formRedeem.onsubmit = async (e) => {
        e.preventDefault();
        const code = inputCode.value;
        const btnSubmit = document.getElementById('btn-submit-redeem');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span>Memverifikasi...</span>';

        const result = await api.redeemCode(code);
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i data-lucide="sparkles" class="w-4 h-4"></i><span>Tukarkan Kode</span>';
        if (window.lucide) window.lucide.createIcons();

        feedback.classList.remove('hidden', 'bg-emerald-950/40', 'border-emerald-800/40', 'text-emerald-300', 'bg-red-950/40', 'border-red-800/40', 'text-red-300');
        if (result.success) {
          feedback.classList.add('bg-emerald-950/40', 'border', 'border-emerald-800/40', 'text-emerald-300');
          feedback.innerText = result.message;
          // Reload state
          await this.loadInitialData();
          this.handleRouting();
          setTimeout(() => {
            modalRedeem.classList.add('hidden');
          }, 2000);
        } else {
          feedback.classList.add('bg-red-950/40', 'border', 'border-red-800/40', 'text-red-300');
          feedback.innerText = result.message;
        }
      };
    }

    // Theme Toggle Handler
    const btnTheme = document.getElementById('btn-theme-toggle');
    const themeIcon = document.getElementById('theme-toggle-icon');
    const updateThemeIcon = (isDark) => {
      if (themeIcon) {
        themeIcon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
        if (window.lucide) window.lucide.createIcons();
      }
    };
    updateThemeIcon(document.documentElement.classList.contains('dark'));

    if (btnTheme) {
      btnTheme.onclick = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('PORTAL_THEME', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
      };
    }

    // Testimonials Modal Trigger
    const btnOpenTesti = document.getElementById('btn-open-testimonials');
    const modalTesti = document.getElementById('modal-testimonial');
    const btnCloseTesti = document.getElementById('btn-close-testimonial');
    if (btnOpenTesti && modalTesti) {
      btnOpenTesti.onclick = () => modalTesti.classList.remove('hidden');
    }
    if (btnCloseTesti && modalTesti) {
      btnCloseTesti.onclick = () => modalTesti.classList.add('hidden');
    }

    // Live API Config Modal
    const btnOpenApi = document.getElementById('btn-open-api-config');
    const modalApi = document.getElementById('modal-api-config');
    const btnCloseApi = document.getElementById('btn-close-api-config');
    const formApi = document.getElementById('form-api-config');
    const btnResetApi = document.getElementById('btn-reset-api');
    const inputGasUrl = document.getElementById('input-gas-url');

    if (btnOpenApi) btnOpenApi.onclick = () => modalApi.classList.remove('hidden');
    if (btnCloseApi) btnCloseApi.onclick = () => modalApi.classList.add('hidden');
    if (btnResetApi) {
      btnResetApi.onclick = () => {
        api.setApiUrl('');
        modalApi.classList.add('hidden');
        window.location.reload();
      };
    }
    if (formApi) {
      formApi.onsubmit = (e) => {
        e.preventDefault();
        const url = inputGasUrl.value;
        api.setApiUrl(url);
        modalApi.classList.add('hidden');
        window.location.reload();
      };
    }

    // Profile & Logout Modals
    const modalProfile = document.getElementById('modal-profile');
    const btnNavProfile = document.getElementById('btn-navbar-profile');
    const btnBottomProfile = document.getElementById('btn-bottom-profile');
    const btnCloseProfile = document.getElementById('btn-close-profile');
    const btnProfileToSecurity = document.getElementById('btn-profile-to-security');

    const modalLogout = document.getElementById('modal-logout');
    const btnNavLogout = document.getElementById('btn-navbar-logout');
    const btnBottomLogout = document.getElementById('btn-bottom-logout');
    const btnProfileTriggerLogout = document.getElementById('btn-profile-trigger-logout');
    const btnCancelLogout = document.getElementById('btn-cancel-logout');
    const btnConfirmLogout = document.getElementById('btn-confirm-logout');

    // Open Profile Modal
    const openProfile = () => {
      if (modalProfile) modalProfile.classList.remove('hidden');
    };
    if (btnNavProfile) btnNavProfile.onclick = openProfile;
    if (btnBottomProfile) btnBottomProfile.onclick = openProfile;
    if (btnCloseProfile) {
      btnCloseProfile.onclick = () => modalProfile.classList.add('hidden');
    }
    if (btnProfileToSecurity) {
      btnProfileToSecurity.onclick = () => modalProfile.classList.add('hidden');
    }

    // Open Logout Confirmation Modal
    const openLogout = () => {
      if (modalProfile) modalProfile.classList.add('hidden');
      if (modalLogout) modalLogout.classList.remove('hidden');
    };
    if (btnNavLogout) btnNavLogout.onclick = openLogout;
    if (btnBottomLogout) btnBottomLogout.onclick = openLogout;
    if (btnProfileTriggerLogout) btnProfileTriggerLogout.onclick = openLogout;

    if (btnCancelLogout) {
      btnCancelLogout.onclick = () => modalLogout.classList.add('hidden');
    }
    if (btnConfirmLogout) {
      btnConfirmLogout.onclick = () => {
        btnConfirmLogout.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Keluar...</span>';
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          // Tutup modal logout
          modalLogout.classList.add('hidden');
          // Reset aplikasi: hapus data user dari state & local storage bila ada
          if (app && app.state) {
            app.state.initialData = null;
          }
          localStorage.removeItem('USER_SESSION'); // contoh, sesuaikan nama kunci sebenarnya
          alert('Anda telah berhasil keluar dari akun.');
          // Arahkan ke beranda
          window.location.hash = '#/home';
          // Panggil routing manual agar hash diproses
          if (typeof app !== 'undefined' && app.handleRouting) {
            app.handleRouting();
          }
        }, 600);
      };
    }
  },

  setupGlobalEvents() {
    // Global Event Delegation for Modals
    document.addEventListener('click', (e) => {
      const openTesti = e.target.closest('#btn-open-testimonials');
      if (openTesti) {
        const m = document.getElementById('modal-testimonial');
        if (m) m.classList.remove('hidden');
      }

      const closeTesti = e.target.closest('#btn-close-testimonial');
      if (closeTesti) {
        const m = document.getElementById('modal-testimonial');
        if (m) m.classList.add('hidden');
      }
    });

    // Keyboard Escape to close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const m1 = document.getElementById('modal-redeem');
        const m2 = document.getElementById('modal-api-config');
        const m3 = document.getElementById('modal-testimonial');
        const m4 = document.getElementById('modal-profile');
        const m5 = document.getElementById('modal-logout');
        if (m1) m1.classList.add('hidden');
        if (m2) m2.classList.add('hidden');
        if (m3) m3.classList.add('hidden');
        if (m4) m4.classList.add('hidden');
        if (m5) m5.classList.add('hidden');
      }
    });
  },

  getPageTitle(route) {
    if (route && route.startsWith('#/bootcamp')) return 'Bootcamp';
    switch (route) {
      case '#/home': return 'Beranda';
      case '#/library': return 'Kelas Saya';
      case '#/jalur': return 'Jalur Belajar';
      case '#/bootcamp': return 'Bootcamp';
      case '#/skills': return 'Bank Skill';
      case '#/apps': return 'Library Aplikasi';
      case '#/karya': return 'Pameran Karya';
      case '#/guides': return 'Panduan';
      case '#/prompts': return 'Master Prompt';
      case '#/security': return 'PIN & Keamanan';
      case '#/orders': return 'Pesanan';
      case '#/helpdesk': return 'Helpdesk & CS';
      case '#/custom': return 'Aplikasi Custom';
      default: return 'Beranda';
    }
  },

  async handleRouting() {
    let hash = window.location.hash || '#/home';
    if (!hash.startsWith('#/')) hash = '#/home';
    this.state.currentRoute = hash;

    // Update Top Title & active sidebar
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.innerText = this.getPageTitle(hash);

    document.querySelectorAll('.sidebar-link').forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === hash || (hash.startsWith('#/bootcamp') && linkHref === '#/bootcamp')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const contentArea = document.getElementById('main-content');
    contentArea.innerHTML = '<div class="p-8 text-center text-xs text-[#94a3b8] flex items-center justify-center gap-2"><div class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div><span>Memuat data...</span></div>';

    // Route Handler: Check for Bootcamp Room Detail first
    if (hash === '#/bootcamp/room' || (hash.startsWith('#/bootcamp/') && hash !== '#/bootcamp')) {
      await this.renderBootcampRoom(contentArea);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Standard Routes
    switch (hash) {
      case '#/home':
        await this.renderHome(contentArea);
        break;
      case '#/library':
        await this.renderLibrary(contentArea);
        break;
      case '#/jalur':
        await this.renderJalur(contentArea);
        break;
      case '#/bootcamp':
        await this.renderBootcamp(contentArea);
        break;
      case '#/skills':
        await this.renderSkills(contentArea);
        break;
      case '#/apps':
        await this.renderApps(contentArea);
        break;
      case '#/karya':
        await this.renderKarya(contentArea);
        break;
      case '#/guides':
        await this.renderGuides(contentArea);
        break;
      case '#/security':
        this.renderSecurity(contentArea);
        break;
      case '#/prompts':
        this.renderPrompts(contentArea);
        break;
      case '#/orders':
        this.renderOrders(contentArea);
        break;
      case '#/helpdesk':
        this.renderHelpdesk(contentArea);
        break;
      case '#/custom':
        this.renderCustom(contentArea);
        break;
      default:
        await this.renderHome(contentArea);
        break;
    }

    if (window.lucide) window.lucide.createIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /** S01: Beranda */
  async renderHome(container) {
    const data = this.state.initialData || await api.getInitialData();
    const user = data.user;
    const stats = data.stats;
    const announcement = data.announcement;
    const products = data.ownedProducts || [];

    let filtered = products;
    if (this.state.categoryFilter === 'kelas') filtered = products.filter(p => p.type === 'kelas');
    if (this.state.categoryFilter === 'dokumen') filtered = products.filter(p => p.type === 'dokumen');

    container.innerHTML = `
      <div>
        ${components.announcementBanner(announcement)}
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Main Content Column (Left 8-cols) -->
          <div class="lg:col-span-8 space-y-6">
            ${components.heroWelcome(user)}
            ${components.statsCards(stats)}

            <!-- Filter Tabs & Search -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <button class="btn-filter px-3.5 py-1.5 rounded-full text-xs font-semibold ${this.state.categoryFilter === 'semua' ? 'bg-blue-600 text-white' : 'bg-[#111d38] text-[#94a3b8] hover:text-[#f8fafc] border border-[#20335e]'}" data-cat="semua">
                  Semua ${products.length}
                </button>
                <button class="btn-filter px-3.5 py-1.5 rounded-full text-xs font-semibold ${this.state.categoryFilter === 'kelas' ? 'bg-blue-600 text-white' : 'bg-[#111d38] text-[#94a3b8] hover:text-[#f8fafc] border border-[#20335e]'}" data-cat="kelas">
                  Kelas ${products.filter(p => p.type === 'kelas').length}
                </button>
                <button class="btn-filter px-3.5 py-1.5 rounded-full text-xs font-semibold ${this.state.categoryFilter === 'dokumen' ? 'bg-blue-600 text-white' : 'bg-[#111d38] text-[#94a3b8] hover:text-[#f8fafc] border border-[#20335e]'}" data-cat="dokumen">
                  Dokumen ${products.filter(p => p.type === 'dokumen').length}
                </button>
              </div>

              <div class="relative w-full sm:w-64">
                <i data-lucide="search" class="w-4 h-4 absolute left-3 top-3 text-[#627d9e]"></i>
                <input type="text" id="search-input" placeholder="Cari materi & alat..." value="${this.state.searchQuery}"
                  class="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111d38] border border-[#20335e] text-xs text-[#f8fafc] placeholder-[#627d9e] focus:outline-none focus:border-blue-500">
              </div>
            </div>

            <!-- Products Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${filtered.map(p => components.courseCard(p)).join('')}
            </div>

            <!-- Showcase Gallery on Home (Pameran Karya Member) -->
            ${components.showcaseHomeGrid(SEED_DATA.showcase.gallery)}
          </div>

          <!-- Right Sidebar Column (Right 4-cols) -->
          <div class="lg:col-span-4 space-y-6">
            ${components.userProfileWidget(user)}
          </div>
        </div>
      </div>
    `;

    // Filter clicks
    container.querySelectorAll('.btn-filter').forEach(btn => {
      btn.onclick = () => {
        this.state.categoryFilter = btn.dataset.cat;
        this.renderHome(container);
      };
    });

    // Search input
    const searchInput = container.querySelector('#search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        const val = e.target.value.toLowerCase();
        container.querySelectorAll('.hover-card').forEach(card => {
          const text = card.innerText.toLowerCase();
          card.style.display = text.includes(val) ? '' : 'none';
        });
      };
    }
  },

  /** S02: Kelas Saya */
  async renderLibrary(container) {
    const products = await api.getProducts();

    container.innerHTML = `
      <div>
        <div class="mb-6">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 mb-1">MEMBER PORTAL</div>
          <h2 class="text-2xl font-black text-[#f8fafc] tracking-tight">Kelas Saya</h2>
          <p class="text-xs md:text-sm text-[#94a3b8] mt-1">Semua kelas, aplikasi & dokumen yang sudah Anda miliki.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${products.map(p => components.courseCard(p)).join('')}
        </div>
      </div>
    `;
  },

  /** S03: Jalur Belajar */
  async renderJalur(container) {
    const tracks = await api.getLearningTracks();

    container.innerHTML = `
      <div>
        <div class="mb-6">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 mb-1">REKOMENDASI URUTAN BELAJAR</div>
          <h2 class="text-2xl font-black text-[#f8fafc] tracking-tight">Jalur Belajar</h2>
          <p class="text-xs md:text-sm text-[#94a3b8] mt-1">Ikuti urutan dari tahap awal sampai mahir agar belajar lebih terarah. Ini panduan — Anda tetap bebas membuka kelas yang sudah dimiliki kapan saja.</p>
        </div>

        <!-- Track Selector Tabs -->
        <div class="flex flex-wrap gap-2 mb-6">
          ${tracks.map((t, idx) => `
            <button class="btn-track px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${idx === 0 ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-[#111d38] border-[#20335e] text-[#94a3b8] hover:text-[#f8fafc]'}" data-index="${idx}">
              ${t.name}
            </button>
          `).join('')}
        </div>

        <div id="track-content-area">
          ${components.trackTimeline(tracks[0])}
        </div>
      </div>
    `;

    container.querySelectorAll('.btn-track').forEach(btn => {
      btn.onclick = () => {
        container.querySelectorAll('.btn-track').forEach(b => {
          b.classList.remove('bg-blue-600/20', 'border-blue-500', 'text-blue-400');
          b.classList.add('bg-[#111d38]', 'border-[#20335e]', 'text-[#94a3b8]');
        });
        btn.classList.add('bg-blue-600/20', 'border-blue-500', 'text-blue-400');
        btn.classList.remove('bg-[#111d38]', 'border-[#20335e]', 'text-[#94a3b8]');
        
        const idx = parseInt(btn.dataset.index, 10);
        document.getElementById('track-content-area').innerHTML = components.trackTimeline(tracks[idx]);
        if (window.lucide) window.lucide.createIcons();
      };
    });
  },

  /** S04: Bootcamp */
  async renderBootcamp(container) {
    const data = await api.getBootcamp();
    const btc = data.bootcamp;

    container.innerHTML = `
      <div>
        <div class="mb-6">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 mb-1">KURIKULUM & MATERI BELAJAR</div>
          <h2 class="text-xl font-bold text-[#f8fafc] tracking-tight">Bootcamp Saya</h2>
          <p class="text-xs text-[#94a3b8] mt-1">Masuk ke ruang belajar untuk presensi, mempelajari materi tiap pertemuan, mengerjakan tugas, dan mengunduh sertifikat.</p>
        </div>

        ${components.bootcampCard(btc)}

        <!-- PROGRAM TERSEDIA: Bootcamp yang Bisa Anda Ikuti -->
        <div class="mt-12 pt-8 border-t border-[#20335e]">
          <div class="mb-5">
            <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-500 mb-0.5">PROGRAM TERSEDIA</div>
            <h3 class="text-base md:text-lg font-bold text-[#f8fafc] tracking-tight">Bootcamp yang Bisa Anda Ikuti</h3>
            <p class="text-xs text-[#94a3b8]">Klik kartu untuk melihat detail lengkap & kurikulum.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${(SEED_DATA.availableBootcamps || []).map(item => components.availableBootcampCard(item)).join('')}
          </div>
        </div>
      </div>
    `;
  },

  /** Ruang Belajar Bootcamp (Learning Room) S04.1 Sesuai Screenshot */
  async renderBootcampRoom(container) {
    const data = await api.getBootcamp();
    const btc = data.bootcamp;

    container.innerHTML = components.bootcampRoomView(btc);

    // Tab Switch Behavior (Kurikulum, Evaluasi & Portofolio, Sertifikat)
    container.querySelectorAll('.room-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const targetTab = btn.dataset.tab;
        
        container.querySelectorAll('.room-tab-btn').forEach(b => {
          b.classList.remove('active', 'bg-white', 'dark:bg-[#111d38]', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400', 'shadow-sm');
          b.classList.add('text-slate-500', 'dark:text-[#94a3b8]', 'border-transparent');
        });
        btn.classList.add('active', 'bg-white', 'dark:bg-[#111d38]', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400', 'shadow-sm');
        btn.classList.remove('text-slate-500', 'dark:text-[#94a3b8]', 'border-transparent');

        container.querySelectorAll('.room-tab-pane').forEach(pane => pane.classList.add('hidden'));
        const activePane = container.querySelector(`#room-tab-content-${targetTab}`);
        if (activePane) activePane.classList.remove('hidden');

        if (window.lucide) window.lucide.createIcons();
      };
    });

    // Accordion Toggle Behavior for Sessions
    container.querySelectorAll('.session-toggle-header').forEach(header => {
      header.onclick = () => {
        const parent = header.closest('.rounded-2xl');
        const body = parent.querySelector('.session-body');
        const chevron = header.querySelector('i');
        
        if (body.classList.contains('hidden')) {
          body.classList.remove('hidden');
          if (chevron) {
            chevron.setAttribute('data-lucide', 'chevron-up');
          }
        } else {
          body.classList.add('hidden');
          if (chevron) {
            chevron.setAttribute('data-lucide', 'chevron-down');
          }
        }
        if (window.lucide) window.lucide.createIcons();
      };
    });

    // Portfolio Form Interactions (Character Counter & Star Rating)
    const feedbackInput = container.querySelector('#input-portfolio-feedback');
    const charLabel = container.querySelector('#char-count-label');
    if (feedbackInput && charLabel) {
      feedbackInput.oninput = () => {
        const len = feedbackInput.value.length;
        if (len < 50) {
          charLabel.innerText = `(${len} karakter, kurang ${50 - len})`;
          charLabel.className = 'text-slate-400 font-normal text-[11px]';
        } else {
          charLabel.innerText = `(${len} karakter, memenuhi syarat)`;
          charLabel.className = 'text-emerald-500 font-semibold text-[11px]';
        }
      };
    }

    const starItems = container.querySelectorAll('.star-item');
    starItems.forEach(star => {
      star.onclick = () => {
        const rating = parseInt(star.dataset.value, 10);
        starItems.forEach(s => {
          const val = parseInt(s.dataset.value, 10);
          if (val <= rating) {
            s.innerText = '★';
            s.classList.remove('text-slate-300', 'dark:text-slate-600');
            s.classList.add('text-amber-400');
          } else {
            s.innerText = '☆';
            s.classList.remove('text-amber-400');
            s.classList.add('text-slate-300', 'dark:text-slate-600');
          }
        });
      };
    });
  },

  /** S05: Bank Skill */
  async renderSkills(container) {
    const skills = await api.getSkills();

    container.innerHTML = `
      <div>
        <div class="mb-6">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 mb-1">SUMBER DAYA AI</div>
          <h2 class="text-2xl font-black text-[#f8fafc] tracking-tight">Bank Skill</h2>
          <p class="text-xs md:text-sm text-[#94a3b8] mt-1">Berkas skill AI siap unduh. Sebagian terbuka untuk semua member, sebagian khusus pemilik kelas/bootcamp tertentu.</p>
        </div>

        <div class="mb-6 max-w-sm">
          <div class="relative">
            <i data-lucide="search" class="w-4 h-4 absolute left-3 top-3 text-[#627d9e]"></i>
            <input type="text" placeholder="Cari bank skill..." class="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111d38] border border-[#20335e] text-xs text-[#f8fafc] placeholder-[#627d9e] focus:outline-none focus:border-blue-500">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${skills.map(s => components.skillCard(s)).join('')}
        </div>
      </div>
    `;
  },

  /** S06: Library Aplikasi */
  async renderApps(container) {
    const apps = await api.getApps();

    container.innerHTML = `
      <div>
        <div class="mb-6">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 mb-1">SUMBER DAYA AI</div>
          <h2 class="text-2xl font-black text-[#f8fafc] tracking-tight">Library Aplikasi</h2>
          <p class="text-xs md:text-sm text-[#94a3b8] mt-1">Source code aplikasi web siap pasang (.zip). Tombol unduh aktif sesuai kelas/bootcamp yang Anda miliki.</p>
        </div>

        <div class="mb-6 max-w-sm">
          <div class="relative">
            <i data-lucide="search" class="w-4 h-4 absolute left-3 top-3 text-[#627d9e]"></i>
            <input type="text" placeholder="Cari library aplikasi..." class="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111d38] border border-[#20335e] text-xs text-[#f8fafc] placeholder-[#627d9e] focus:outline-none focus:border-blue-500">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${apps.map(a => components.appCard(a)).join('')}
        </div>
      </div>
    `;
  },

  /** S07: Pameran Karya */
  async renderKarya(container) {
    const data = await api.getShowcase();

    container.innerHTML = `
      <div>
        <div class="mb-6">
          <h2 class="text-2xl font-black text-[#f8fafc] tracking-tight">Pameran Karya</h2>
          <p class="text-xs md:text-sm text-[#94a3b8] mt-1">Bagikan karya terbaik Anda! Unggah foto profil, 5 gambar aplikasi/karya atau video Aplikasi kalian, dan ceritakan pengalaman Anda. Karya yang disetujui tampil di halaman utama.</p>
        </div>

        ${components.showcaseSection(data)}
      </div>
    `;
  },

  /** S08: Panduan */
  async renderGuides(container) {
    const guides = await api.getGuides();

    container.innerHTML = `
      <div>
        <div class="mb-6">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 mb-1">DOKUMENTASI & TUTORIAL</div>
          <h2 class="text-2xl font-black text-[#f8fafc] tracking-tight">Panduan</h2>
          <p class="text-xs md:text-sm text-[#94a3b8] mt-1">Dokumen & video panduan penggunaan.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${guides.map(g => components.guideCard(g)).join('')}
        </div>
      </div>
    `;
  },

  /** PIN & Keamanan */
  renderSecurity(container) {
    const user = (this.state.initialData && this.state.initialData.user) || SEED_DATA.user;
    container.innerHTML = `
      <div class="max-w-xl">
        <div class="mb-6">
          <h2 class="text-2xl font-black text-[#f8fafc] tracking-tight">PIN & Keamanan Akun</h2>
          <p class="text-xs md:text-sm text-[#94a3b8] mt-1">Kelola data profil dan nomor WhatsApp untuk notifikasi kelas.</p>
        </div>

        <div class="p-6 rounded-2xl bg-[#111d38] border border-[#20335e] shadow-xl space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#f8fafc] mb-1">Nama Lengkap</label>
            <input type="text" id="prof-name" value="${user.name}" class="w-full px-4 py-2.5 rounded-xl bg-[#0a1124] border border-[#20335e] text-xs text-[#f8fafc]">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#f8fafc] mb-1">Alamat Email (Akun)</label>
            <input type="email" value="${user.email}" disabled class="w-full px-4 py-2.5 rounded-xl bg-[#0a1124]/50 border border-[#20335e] text-xs text-[#94a3b8] cursor-not-allowed">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#f8fafc] mb-1">Nomor WhatsApp</label>
            <input type="text" id="prof-wa" value="${user.whatsapp}" class="w-full px-4 py-2.5 rounded-xl bg-[#0a1124] border border-[#20335e] text-xs text-[#f8fafc]">
          </div>

          <div class="pt-4 border-t border-[#20335e]">
            <button id="btn-save-profile" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    `;

    const saveBtn = container.querySelector('#btn-save-profile');
    if (saveBtn) {
      saveBtn.onclick = async () => {
        const name = container.querySelector('#prof-name').value;
        const wa = container.querySelector('#prof-wa').value;
        saveBtn.disabled = true;
        saveBtn.innerText = 'Menyimpan...';
        await api.updateProfile(name, wa);
        alert('Profil berhasil diperbarui!');
        saveBtn.disabled = false;
        saveBtn.innerText = 'Simpan Perubahan';
        await this.loadInitialData();
        this.renderShell();
      };
    }
  },

  /** Master Prompt */
  renderPrompts(container) {
    container.innerHTML = `
      <div>
        <div class="mb-6">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 mb-1">SUMBER DAYA AI</div>
          <h2 class="text-2xl font-black text-[#f8fafc] tracking-tight">Master Prompt AI</h2>
          <p class="text-xs md:text-sm text-[#94a3b8] mt-1">Koleksi prompt siap salin untuk mengonversi ide web menjadi PRD, Wireframe, dan Kode Apps Script.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 rounded-2xl bg-[#111d38] border border-[#20335e] hover-card">
            <h3 class="text-base font-bold text-[#f8fafc] mb-2">Prompt PRD Generator</h3>
            <p class="text-xs text-[#94a3b8] mb-4">Ubah 1 baris ide menjadi dokumen PRD spesifikasi lengkap untuk aplikasi Google Sheets.</p>
            <button onclick="navigator.clipboard.writeText('Buatkan PRD lengkap untuk web app GAS...'); alert('Prompt berhasil disalin ke clipboard!')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Salin Prompt</span>
            </button>
          </div>

          <div class="p-6 rounded-2xl bg-[#111d38] border border-[#20335e] hover-card">
            <h3 class="text-base font-bold text-[#f8fafc] mb-2">Prompt UI/UX Stitch High-Fidelity</h3>
            <p class="text-xs text-[#94a3b8] mb-4">Prompt komprehensif untuk Google Stitch AI menghasilkan desain antarmuka 3-4 layar.</p>
            <button onclick="navigator.clipboard.writeText('Rancang sistem desain UI/UX di Stitch...'); alert('Prompt berhasil disalin ke clipboard!')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Salin Prompt</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /** Pesanan */
  renderOrders(container) {
    container.innerHTML = `
      <div>
        <div class="mb-6">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 mb-1">TRANSAKSI MEMBER</div>
          <h2 class="text-xl font-bold text-[#f8fafc] tracking-tight">Status Pesanan</h2>
          <p class="text-xs text-[#94a3b8] mt-1">Riwayat transaksi dan status pembelian produk digital.</p>
        </div>
        <div class="p-8 rounded-2xl bg-[#111d38] border border-[#20335e] text-center max-w-lg mx-auto">
          <div class="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <i data-lucide="check-circle" class="w-6 h-6"></i>
          </div>
          <h3 class="text-sm font-bold text-[#f8fafc] mb-1">Semua Pesanan Selesai</h3>
          <p class="text-xs text-[#94a3b8]">Tidak ada pesanan yang tertunda. Semua 8 produk telah aktif di akun Anda.</p>
        </div>
      </div>
    `;
  },

  /** S08: Pusat Bantuan & Helpdesk */
  renderHelpdesk(container) {
    container.innerHTML = components.helpdeskView(SEED_DATA.helpdesk);

    // Accordion Toggle for Articles
    container.querySelectorAll('.helpdesk-toggle-header').forEach(header => {
      header.onclick = () => {
        const item = header.closest('.helpdesk-article-item');
        const body = item.querySelector('.helpdesk-answer-body');
        const chevron = header.querySelector('i');

        if (body.classList.contains('hidden')) {
          body.classList.remove('hidden');
          if (chevron) chevron.setAttribute('data-lucide', 'chevron-up');
        } else {
          body.classList.add('hidden');
          if (chevron) chevron.setAttribute('data-lucide', 'chevron-down');
        }
        if (window.lucide) window.lucide.createIcons();
      };
    });

    // Category Filter Behavior
    const catButtons = container.querySelectorAll('.helpdesk-cat-btn');
    const articles = container.querySelectorAll('.helpdesk-article-item');
    const searchInput = container.querySelector('#helpdesk-search-input');

    const filterArticles = (selectedCat, query) => {
      const q = (query || '').toLowerCase().trim();
      articles.forEach(art => {
        const artCat = art.dataset.category;
        const text = art.innerText.toLowerCase();
        const matchCat = (selectedCat === 'all' || !selectedCat || artCat === selectedCat);
        const matchQuery = (!q || text.includes(q));

        if (matchCat && matchQuery) {
          art.classList.remove('hidden');
        } else {
          art.classList.add('hidden');
        }
      });
    };

    catButtons.forEach(btn => {
      btn.onclick = () => {
        const selectedCat = btn.dataset.cat;
        
        catButtons.forEach(b => {
          b.classList.remove('bg-blue-500/10', 'text-blue-600', 'dark:text-blue-400', 'border', 'border-blue-500/20', 'active-cat');
          b.classList.add('text-slate-600', 'dark:text-[#94a3b8]');
          const badge = b.querySelector('.cat-count-badge');
          if (badge) {
            badge.className = 'cat-count-badge px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-[#162548] text-slate-500 dark:text-[#94a3b8]';
          }
        });

        btn.classList.add('bg-blue-500/10', 'text-blue-600', 'dark:text-blue-400', 'border', 'border-blue-500/20', 'active-cat');
        btn.classList.remove('text-slate-600', 'dark:text-[#94a3b8]');
        const activeBadge = btn.querySelector('.cat-count-badge');
        if (activeBadge) {
          activeBadge.className = 'cat-count-badge px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white';
        }

        const currentQuery = searchInput ? searchInput.value : '';
        filterArticles(selectedCat, currentQuery);
      };
    });

    // Search Input Real-Time Filter
    if (searchInput) {
      searchInput.oninput = () => {
        const activeBtn = container.querySelector('.helpdesk-cat-btn.active-cat');
        const selectedCat = activeBtn ? activeBtn.dataset.cat : 'all';
        filterArticles(selectedCat, searchInput.value);
      };
    }
  },

  /** Custom App Request */
  renderCustom(container) {
    container.innerHTML = `
      <div>
        <div class="mb-6">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 mb-1">LAYANAN KHUSUS</div>
          <h2 class="text-xl font-bold text-[#f8fafc] tracking-tight">Order Aplikasi Custom</h2>
          <p class="text-xs text-[#94a3b8] mt-1">Konsultasikan kebutuhan pembuatan aplikasi Google Apps Script / Web kustom untuk bisnis Anda.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#111d38] border border-[#20335e] max-w-lg">
          <p class="text-xs text-[#94a3b8] mb-4">Tim kami siap membantu merealisasikan sistem ERP, presensi, POS, atau integrasi webhook khusus.</p>
          <a href="https://wa.me/6285841109887?text=Halo%20Admin,%20saya%20ingin%20konsultasi%20aplikasi%20custom" target="_blank" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Konsultasi Proyek Custom</span>
          </a>
        </div>
      </div>
    `;
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
