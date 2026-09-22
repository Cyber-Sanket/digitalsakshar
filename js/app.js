/**
 * Digital_Sakshar - Core App Engine & Utilities
 * Manages audio synthesizer, speech synthesis, theming, bilingual language switching (EN / मराठी), routing, and toasts.
 */

const App = {
  audioCtx: null,
  speechSynth: window.speechSynthesis || null,
  currentRoute: "home",
  currentLanguage: "en", // 'en' | 'mr'

  init() {
    // Initialize Local Storage state
    StorageManager.init();

    // Apply stored user preferences
    const user = StorageManager.getUser();
    this.setTheme(user.theme || "light");
    this.setFontSize(user.fontSize || "normal");
    this.setLanguage(user.language || "en", false);

    // Setup Navigation & Router
    this.setupRouter();
    this.setupAccessibilityControls();
    this.setupLanguageToggle();
    this.setupDailyTip();

    // Setup global listeners for achievements
    window.addEventListener("sakshar_achievement_unlocked", (e) => {
      e.detail.badges.forEach(badge => {
        this.showToast(`🏆 Achievement Unlocked!`, badge.title, "achievement", badge.icon);
        this.playSound("fanfare");
      });
    });

    console.log("Digital_Sakshar Platform initialized successfully 🌐💻");
  },

  // --------------------------------------------------------------------------
  // Language Switcher (EN ⇄ मराठी)
  // --------------------------------------------------------------------------
  setupLanguageToggle() {
    const btn = document.getElementById("langToggleBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        const nextLang = (this.currentLanguage === "en") ? "mr" : "en";
        this.setLanguage(nextLang, true);
        this.playSound("click");
      });
    }
  },

  setLanguage(lang, notify = true) {
    this.currentLanguage = lang;
    document.documentElement.setAttribute("data-lang", lang);
    StorageManager.updateUser({ language: lang });

    const btn = document.getElementById("langToggleBtn");
    if (btn) {
      const textSpan = btn.querySelector(".lang-text");
      const html = (lang === "en") ? "EN | <strong>मर</strong>" : "<strong>EN</strong> | मर";
      if (textSpan) {
        textSpan.innerHTML = html;
      } else {
        btn.innerHTML = (lang === "en") ? "🌐 EN | <strong>मर</strong>" : "🌐 <strong>EN</strong> | मर";
      }
      btn.title = (lang === "en") ? "Switch to Marathi (मराठीत बदला)" : "Switch to English (इंग्रजीत बदला)";
    }

    // Bilingual label adjustments
    document.querySelectorAll("[data-i18n-en]").forEach(el => {
      const en = el.getAttribute("data-i18n-en");
      const mr = el.getAttribute("data-i18n-mr");
      if (lang === "mr" && mr) {
        el.textContent = mr;
      } else if (en) {
        el.textContent = en;
      }
    });

    if (notify) {
      this.showToast(
        lang === "mr" ? "भाषा बदलली: मराठी" : "Language Switched: English",
        lang === "mr" ? "आता सर्व मुख्य माहिती मराठीत उपलब्ध आहे." : "Platform content is now in English.",
        "info",
        "🌐"
      );
    }
  },

  // --------------------------------------------------------------------------
  // Audio Synthesizer (Zero-dependency Web Audio API)
  // --------------------------------------------------------------------------
  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },

  playSound(type = "click") {
    const user = StorageManager.getUser();
    if (!user.soundEnabled) return;

    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "correct") {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = "triangle";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.15);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.35);
      } else if (type === "wrong") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(180, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "fanfare") {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + (i * 0.08));
          gain.gain.setValueAtTime(0.16, now + (i * 0.08));
          gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.08) + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + (i * 0.08));
          osc.stop(now + (i * 0.08) + 0.28);
        });
      }
    } catch (e) {
      console.warn("Web Audio playback failed:", e);
    }
  },

  speak(text, lang = "en-US") {
    const user = StorageManager.getUser();
    if (!user.speechEnabled || !this.speechSynth) return;

    try {
      this.speechSynth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = lang;
      this.speechSynth.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis unavailable:", e);
    }
  },

  // --------------------------------------------------------------------------
  // Theming & Accessibility
  // --------------------------------------------------------------------------
  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    StorageManager.updateUser({ theme });

    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-theme-val") === theme);
    });
  },

  setFontSize(size) {
    document.documentElement.setAttribute("data-fontsize", size);
    StorageManager.updateUser({ fontSize: size });

    document.querySelectorAll(".fontsize-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-size-val") === size);
    });
  },

  toggleSound() {
    const user = StorageManager.getUser();
    const nextState = !user.soundEnabled;
    StorageManager.updateUser({ soundEnabled: nextState });
    this.updateSoundBtnUI(nextState);

    if (nextState) {
      this.playSound("click");
      this.showToast("Sound Enabled", "Audio feedback is now active.", "info", "🔊");
    } else {
      this.showToast("Sound Muted", "Audio feedback has been turned off.", "info", "🔇");
    }
  },

  updateSoundBtnUI(enabled) {
    const btn = document.getElementById("soundToggleBtn");
    if (btn) {
      btn.innerHTML = enabled
        ? '<span class="sound-icon" aria-hidden="true">🔊</span><span class="sound-text">Sound</span>'
        : '<span class="sound-icon" aria-hidden="true">🔇</span><span class="sound-text">Mute</span>';
      btn.classList.toggle("active", enabled);
    }
  },

  setupAccessibilityControls() {
    // Theme buttons
    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme-val");
        this.setTheme(theme);
        this.playSound("click");
      });
    });

    // Font size buttons
    document.querySelectorAll(".fontsize-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const size = btn.getAttribute("data-size-val");
        this.setFontSize(size);
        this.playSound("click");
        const labels = {
          normal: { en: "Normal Font Size (A)", mr: "सामान्य अक्षरांचा आकार (A)" },
          large: { en: "Large Font Size (A+)", mr: "मोठा अक्षरांचा आकार (A+)" },
          xlarge: { en: "Extra Large Font Size (A++)", mr: "खूप मोठा अक्षरांचा आकार (A++)" }
        };
        const label = labels[size] || labels.normal;
        this.showToast(
          this.currentLanguage === "mr" ? label.mr : label.en,
          this.currentLanguage === "mr" ? "वाचनासाठी मजकुराचा आकार बदलला आहे." : "Text readability size successfully adjusted.",
          "info",
          "🔤"
        );
      });
    });

    // Sound toggle
    const soundBtn = document.getElementById("soundToggleBtn");
    if (soundBtn) {
      const user = StorageManager.getUser();
      this.updateSoundBtnUI(user.soundEnabled);
      soundBtn.addEventListener("click", () => this.toggleSound());
    }

    // Mobile nav toggle & drawer controls
    const mobileBtn = document.getElementById("mobileNavBtn");
    const closeBtn = document.getElementById("mobileNavCloseBtn");
    const mainNav = document.getElementById("mainNav");
    const backdrop = document.getElementById("navBackdrop");

    const closeDrawer = () => {
      if (mainNav) mainNav.classList.remove("active");
      if (mobileBtn) {
        mobileBtn.classList.remove("active");
        mobileBtn.setAttribute("aria-expanded", "false");
      }
      if (backdrop) backdrop.classList.remove("active");
      document.body.classList.remove("nav-open");
    };

    const openDrawer = () => {
      if (mainNav) mainNav.classList.add("active");
      if (mobileBtn) {
        mobileBtn.classList.add("active");
        mobileBtn.setAttribute("aria-expanded", "true");
      }
      if (backdrop) backdrop.classList.add("active");
      document.body.classList.add("nav-open");
    };

    if (mobileBtn && mainNav) {
      mobileBtn.addEventListener("click", () => {
        const isOpened = mainNav.classList.contains("active");
        if (isOpened) {
          closeDrawer();
        } else {
          openDrawer();
        }
        this.playSound("click");
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        closeDrawer();
        this.playSound("click");
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", () => {
        closeDrawer();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav && mainNav.classList.contains("active")) {
        closeDrawer();
      }
    });
  },

  // --------------------------------------------------------------------------
  // Navigation & Router
  // --------------------------------------------------------------------------
  setupRouter() {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      this.navigateTo(hash, false);
    };

    window.addEventListener("hashchange", handleHash);

    // Initial route check
    const initialRoute = window.location.hash.replace("#", "") || "home";
    this.navigateTo(initialRoute, false);

    // Nav click handlers
    document.querySelectorAll("[data-route]").forEach(elem => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        const route = elem.getAttribute("data-route");
        this.navigateTo(route);
      });
    });
  },

  navigateTo(route, updateHash = true) {
    // Fallback if invalid route is requested
    const validRoutes = ["home", "computer", "practical", "internet", "resources", "quiz", "progress"];
    if (!validRoutes.includes(route)) {
      route = "home";
    }

    this.currentRoute = route;
    if (updateHash) {
      window.location.hash = route;
    }

    // Update active nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      const target = link.getAttribute("data-route");
      link.classList.toggle("active", target === route);
    });

    // Close mobile menu if open
    const mainNav = document.getElementById("mainNav");
    const mobileBtn = document.getElementById("mobileNavBtn");
    const backdrop = document.getElementById("navBackdrop");
    if (mainNav) mainNav.classList.remove("active");
    if (mobileBtn) {
      mobileBtn.classList.remove("active");
      mobileBtn.setAttribute("aria-expanded", "false");
    }
    if (backdrop) backdrop.classList.remove("active");
    document.body.classList.remove("nav-open");

    // Hide all view sections, show active view
    document.querySelectorAll(".module-view").forEach(section => {
      const isTarget = section.id === `view-${route}`;
      section.style.display = isTarget ? "block" : "none";
      if (isTarget) {
        section.classList.remove("animate-fade-in");
        void section.offsetWidth; // trigger reflow
        section.classList.add("animate-fade-in");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Module specific initializers
    if (route === "computer" && window.ComputerModule) {
      window.ComputerModule.onEnter();
    } else if (route === "practical" && window.PracticalSkillsModule) {
      window.PracticalSkillsModule.onEnter();
    } else if (route === "internet" && window.InternetModule) {
      window.InternetModule.onEnter();
    } else if (route === "quiz" && window.QuizModule) {
      window.QuizModule.onEnter();
    } else if (route === "resources" && window.ResourcesModule) {
      window.ResourcesModule.onEnter();
    } else if (route === "progress" && window.ProgressModule) {
      window.ProgressModule.onEnter();
    }

    // Update index & check achievements
    StorageManager.checkAchievements();
  },

  // --------------------------------------------------------------------------
  // Daily Digital Tip
  // --------------------------------------------------------------------------
  setupDailyTip() {
    const tips = [
      {
        icon: "💾",
        title: "Daily Tip: Save Your Work Regularly (Ctrl + S)",
        text: "While typing or drawing, press 'Ctrl + S' every few minutes. This prevents losing your valuable work during power cuts or system restarts."
      },
      {
        icon: "📁",
        title: "Daily Tip: Organize with Named Folders",
        text: "Avoid saving everything directly on your desktop. Create dedicated folders like 'Electricity_Bills' or 'Study_Notes' for instant access."
      },
      {
        icon: "🔒",
        title: "Daily Tip: Always Check for HTTPS & Padlock",
        text: "Before entering any login information on websites, make sure the address bar shows 'https://' and a locked padlock icon."
      },
      {
        icon: "⌨️",
        title: "Daily Tip: Quick Rename with F2",
        text: "Don't waste time right-clicking! Just click any file or folder and press the 'F2' key on your keyboard to instantly rename it."
      },
      {
        icon: "🗑️",
        title: "Daily Tip: Recycle Bin vs Permanent Delete",
        text: "Pressing 'Delete' moves files to the Recycle Bin so you can restore them. Pressing 'Shift + Delete' permanently erases files—use with care!"
      }
    ];

    const todayIndex = new Date().getDate() % tips.length;
    const tip = tips[todayIndex];

    const banner = document.getElementById("dailyTipBanner");
    if (banner) {
      banner.innerHTML = `
        <div class="tip-icon-badge">${tip.icon}</div>
        <div class="tip-content">
          <h4>${tip.title}</h4>
          <p>${tip.text}</p>
        </div>
      `;
    }
  },

  // --------------------------------------------------------------------------
  // Toast Notification System
  // --------------------------------------------------------------------------
  showToast(title, msg, type = "success", icon = "✅") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${msg}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
};

window.App = App;
