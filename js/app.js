/**
 * Digital_Sakshar - Core App Engine & Utilities
 * Manages audio synthesizer, speech synthesis, theming, routing, and toasts.
 */

const App = {
  audioCtx: null,
  speechSynth: window.speechSynthesis || null,
  currentRoute: "home",

  init() {
    // Initialize Local Storage state
    StorageManager.init();

    // Apply stored user preferences
    const user = StorageManager.getUser();
    this.setTheme(user.theme || "light");
    this.setFontSize(user.fontSize || "normal");

    // Setup Navigation & Router
    this.setupRouter();
    this.setupAccessibilityControls();
    this.setupDailyTip();

    // Setup global listeners for achievements
    window.addEventListener("sakshar_achievement_unlocked", (e) => {
      e.detail.badges.forEach(badge => {
        this.showToast(`🏆 Achievement Unlocked!`, badge.title, "achievement", badge.icon);
        this.playSound("fanfare");
      });
    });

    console.log("Digital_Sakshar Platform initialized successfully 🌐💻🛡️");
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
      } else if (type === "typewriter") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(450 + Math.random() * 50, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
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
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "fanfare") {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + idx * 0.1;
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.35);
        });
      }
    } catch (err) {
      console.warn("Audio synth warning:", err);
    }
  },

  // --------------------------------------------------------------------------
  // Text to Speech Read Aloud (Accessibility)
  // --------------------------------------------------------------------------
  speak(text) {
    const user = StorageManager.getUser();
    if (!user.speechEnabled || !this.speechSynth) return;

    this.speechSynth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    this.speechSynth.speak(utterance);
  },

  // --------------------------------------------------------------------------
  // Theming & Accessibility Controls
  // --------------------------------------------------------------------------
  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    StorageManager.updateUser({ theme });
    
    // Update theme toggle buttons UI
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
    const newState = !user.soundEnabled;
    StorageManager.updateUser({ soundEnabled: newState });
    this.updateSoundBtnUI(newState);
    if (newState) {
      this.playSound("click");
      this.showToast("Sound Effects Enabled", "Audio feedback is now active", "success", "🔊");
    } else {
      this.showToast("Muted", "Sound effects turned off", "warning", "🔇");
    }
  },

  updateSoundBtnUI(enabled) {
    const btn = document.getElementById("soundToggleBtn");
    if (btn) {
      btn.innerHTML = enabled ? "🔊 Sound" : "🔇 Mute";
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
      });
    });

    // Sound toggle
    const soundBtn = document.getElementById("soundToggleBtn");
    if (soundBtn) {
      const user = StorageManager.getUser();
      this.updateSoundBtnUI(user.soundEnabled);
      soundBtn.addEventListener("click", () => this.toggleSound());
    }

    // Mobile nav toggle
    const mobileBtn = document.getElementById("mobileNavBtn");
    const mainNav = document.getElementById("mainNav");
    if (mobileBtn && mainNav) {
      mobileBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        this.playSound("click");
      });
    }
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
    if (mainNav) mainNav.classList.remove("active");

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
    } else if (route === "internet" && window.InternetModule) {
      window.InternetModule.onEnter();
    } else if (route === "safety" && window.SafetyModule) {
      window.SafetyModule.onEnter();
    } else if (route === "typing" && window.TypingModule) {
      window.TypingModule.onEnter();
    } else if (route === "quiz" && window.QuizModule) {
      window.QuizModule.onEnter();
    } else if (route === "resources" && window.ResourcesModule) {
      window.ResourcesModule.onEnter();
    } else if (route === "progress" && window.ProgressModule) {
      window.ProgressModule.onEnter();
    }

    // Track topic view in home/stats
    StorageManager.checkAchievements();
  },

  // --------------------------------------------------------------------------
  // Daily Digital Tip
  // --------------------------------------------------------------------------
  setupDailyTip() {
    const tips = [
      {
        icon: "💡",
        title: "Daily Tip: Beware of Fake Electricity Bill Messages",
        text: "Scammers send urgent SMS claiming power will be cut unless you pay ₹10. Real government departments never send unofficial links. Do not click!"
      },
      {
        icon: "🔑",
        title: "Daily Tip: Never Share Your OTP",
        text: "Bank staff, police, and government officials will NEVER call and ask for your 6-digit OTP or UPI PIN. Keep it 100% secret."
      },
      {
        icon: "🛡️",
        title: "Daily Tip: Look for HTTPS & The Lock Icon",
        text: "Before typing passwords or payment details on any site, ensure the address starts with 'https://' and has a secure padlock icon."
      },
      {
        icon: "⌨️",
        title: "Daily Tip: Useful Keyboard Shortcut",
        text: "Press 'Ctrl + C' to copy, 'Ctrl + V' to paste, and 'Ctrl + Z' to undo mistakes. These shortcuts save time every single day!"
      },
      {
        icon: "🌐",
        title: "Daily Tip: Protect Your Personal Data",
        text: "Never upload clear photos of your Aadhaar card, PAN card, or boarding passes on public social media groups."
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
