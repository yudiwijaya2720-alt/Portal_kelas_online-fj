/**
 * api.js - Unified Data Layer for Portal Kelas Digital
 * Supports both Live Google Apps Script REST API and local state persistence (localStorage)
 */

const API_CONFIG_KEY = 'PORTAL_GAS_URL';
const USER_KEY = 'PORTAL_USER_DATA';
const OWNED_KEY = 'PORTAL_OWNED_PRODUCTS';

const api = {
  getApiUrl() {
    return localStorage.getItem(API_CONFIG_KEY) || '';
  },

  setApiUrl(url) {
    if (url) {
      localStorage.setItem(API_CONFIG_KEY, url.trim());
    } else {
      localStorage.removeItem(API_CONFIG_KEY);
    }
  },

  isLive() {
    return Boolean(this.getApiUrl());
  },

  /** Ambil data awal member */
  async getInitialData() {
    const url = this.getApiUrl();
    if (url) {
      try {
        const res = await fetch(`${url}?action=getInitialData&email=${encodeURIComponent(SEED_DATA.user.email)}`);
        const json = await res.json();
        if (json.success) {
          return json;
        }
      } catch (err) {
        console.warn('Gagal menghubungi GAS live API, beralih ke local storage data:', err);
      }
    }

    // Fallback: LocalStorage / SEED_DATA
    const cachedUser = JSON.parse(localStorage.getItem(USER_KEY)) || SEED_DATA.user;
    const addedAccess = JSON.parse(localStorage.getItem(OWNED_KEY)) || [];
    
    const products = SEED_DATA.products.map(p => ({
      ...p,
      owned: p.owned || addedAccess.includes(p.id)
    }));

    return {
      success: true,
      user: cachedUser,
      stats: {
        totalOwned: products.filter(p => p.owned).length,
        activeBootcampCount: 1,
        pendingOrders: 0
      },
      announcement: SEED_DATA.announcement,
      ownedProducts: products,
      activeBootcamp: SEED_DATA.bootcamp
    };
  },

  /** Ambil daftar produk */
  async getProducts() {
    const initial = await this.getInitialData();
    return initial.ownedProducts;
  },

  /** Ambil Jalur Belajar */
  async getLearningTracks() {
    const url = this.getApiUrl();
    if (url) {
      try {
        const res = await fetch(`${url}?action=getLearningTracks&email=${encodeURIComponent(SEED_DATA.user.email)}`);
        const json = await res.json();
        if (json.success) return json.tracks;
      } catch (e) {}
    }
    return SEED_DATA.learningTracks;
  },

  /** Ambil detail Bootcamp */
  async getBootcamp() {
    const url = this.getApiUrl();
    if (url) {
      try {
        const res = await fetch(`${url}?action=getBootcampDetails&email=${encodeURIComponent(SEED_DATA.user.email)}`);
        const json = await res.json();
        if (json.success) {
          if (json.bootcamp && !json.bootcamp.room) {
            json.bootcamp.room = SEED_DATA.bootcamp.room;
          }
          return json;
        }
      } catch (e) {}
    }
    return { bootcamp: SEED_DATA.bootcamp, enrollment: SEED_DATA.bootcamp.enrollment };
  },

  /** Ambil Bank Skill */
  async getSkills() {
    const url = this.getApiUrl();
    if (url) {
      try {
        const res = await fetch(`${url}?action=getDigitalAssets&category=skill`);
        const json = await res.json();
        if (json.success) return json.assets;
      } catch (e) {}
    }
    return SEED_DATA.skills;
  },

  /** Ambil Library Aplikasi */
  async getApps() {
    const url = this.getApiUrl();
    if (url) {
      try {
        const res = await fetch(`${url}?action=getDigitalAssets&category=app_template`);
        const json = await res.json();
        if (json.success) return json.assets;
      } catch (e) {}
    }
    return SEED_DATA.apps;
  },

  /** Ambil Pameran Karya */
  async getShowcase() {
    const url = this.getApiUrl();
    if (url) {
      try {
        const res = await fetch(`${url}?action=getShowcase`);
        const json = await res.json();
        if (json.success) return { ...SEED_DATA.showcase, gallery: json.showcase };
      } catch (e) {}
    }
    return SEED_DATA.showcase;
  },

  /** Ambil Panduan */
  async getGuides() {
    const url = this.getApiUrl();
    if (url) {
      try {
        const res = await fetch(`${url}?action=getGuides`);
        const json = await res.json();
        if (json.success) return json.guides;
      } catch (e) {}
    }
    return SEED_DATA.guides;
  },

  /** Tukarkan Voucher / Redeem Kode */
  async redeemCode(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'Harap masukkan kode voucher.' };
    }

    const url = this.getApiUrl();
    if (url) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            action: 'redeemCode',
            code: cleanCode,
            email: SEED_DATA.user.email
          })
        });
        const json = await res.json();
        return json;
      } catch (err) {
        return { success: false, message: 'Gagal terhubung ke Google Apps Script: ' + err.toString() };
      }
    }

    // Local Simulation
    if (cleanCode === 'BOOTCAMP-NOV26' || cleanCode === 'REDEEM-NOV2026') {
      return {
        success: true,
        message: 'Kode berhasil ditukarkan! Bootcamp Batch 1 telah diaktifkan untuk akun Anda.'
      };
    } else if (cleanCode === 'BONUS-GAS' || cleanCode === 'BONUS-GAS-API') {
      const added = JSON.parse(localStorage.getItem(OWNED_KEY)) || [];
      if (!added.includes('PRD-002')) {
        added.push('PRD-002');
        localStorage.setItem(OWNED_KEY, JSON.stringify(added));
      }
      return {
        success: true,
        message: 'Selamat! Kelas "Cara Integrasi API Pihak Ketiga" telah ditambahkan ke Kelas Saya!'
      };
    } else {
      return {
        success: false,
        message: 'Kode voucher tidak valid atau sudah kedaluwarsa. Coba kode demo: "REDEEM-NOV2026" atau "BONUS-GAS"'
      };
    }
  },

  /** Update profil */
  async updateProfile(name, whatsapp) {
    const cachedUser = JSON.parse(localStorage.getItem(USER_KEY)) || { ...SEED_DATA.user };
    if (name) cachedUser.name = name;
    if (whatsapp) cachedUser.whatsapp = whatsapp;
    localStorage.setItem(USER_KEY, JSON.stringify(cachedUser));

    const url = this.getApiUrl();
    if (url) {
      try {
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            action: 'updateProfile',
            email: cachedUser.email,
            name,
            whatsapp
          })
        });
      } catch (e) {}
    }

    return { success: true, user: cachedUser };
  }
};
