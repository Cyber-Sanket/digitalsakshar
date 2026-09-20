/**
 * Digital_Sakshar - Digital Safety & Cyber Awareness Module
 * Features:
 * 1. Password Strength Analyzer & Strong Password Generator
 * 2. OTP Voice Call & SMS Scam Simulator
 * 3. Phishing & Fake Link Spotter Game
 */

const SafetyModule = {
  // Phishing Scenarios
  scenarios: [
    {
      id: "phish-1",
      sender: "VM-BIJBIL (Unknown Sender)",
      type: "phishing",
      message: "Dear Consumer, your electricity power connection will be disconnected tonight at 9:30 PM because your previous bill was not updated. Please call our power officer immediately at 98200XXXXX or pay ₹10 at http://bijli-bill-quick.xyz",
      isScam: true,
      flags: [
        "Creates extreme panic and false urgency ('power will be cut tonight')",
        "Uses unofficial URL (http://bijli-bill-quick.xyz) instead of state electricity board portal",
        "Asks you to call a personal 10-digit mobile number instead of toll-free customer care"
      ]
    },
    {
      id: "phish-2",
      sender: "SBI-ALERT (Legitimate Bank Format)",
      type: "safe",
      message: "Your A/C ending with XX4589 has been credited with INR 2,500.00 on 20-Sep-26 by NEFT Transfer. Available balance: INR 14,820.50. Call 18001234 if not recognized.",
      isScam: false,
      flags: [
        "Normal transactional alert with masked account number (XX4589)",
        "Does NOT ask you to click any mysterious links",
        "Does NOT ask for OTP, PIN, or passwords"
      ]
    },
    {
      id: "phish-3",
      sender: "WhatsApp Message from +92-300-XXXXXXX",
      type: "phishing",
      message: "CONGRATULATIONS! Your WhatsApp number has won ₹25,00,000 (25 Lakhs) in KBC All India Lucky Draw! To claim your cheque, send your Aadhaar, PAN card, and pay processing fee ₹1,500 via PhonePe.",
      isScam: true,
      flags: [
        "You cannot win a lottery or competition you never entered",
        "Legitimate companies never ask you to pay an 'advance fee' to claim prizes",
        "Scammer seeks your Aadhaar & PAN to commit identity theft"
      ]
    },
    {
      id: "phish-4",
      sender: "HD-KYCUPD (Fraudulent Sender)",
      type: "phishing",
      message: "URGENT: Your NetBanking account will be permanently BLOCKED in 24 hours due to pending KYC verification. Click here to update immediately: https://hdfc-bank-kyc-portal.top",
      isScam: true,
      flags: [
        "Unofficial fake domain extension '.top' rather than official '.com' bank website",
        "Banks never block accounts via sudden SMS without written formal notices",
        "Designed to steal your NetBanking ID and password"
      ]
    },
    {
      id: "phish-5",
      sender: "Earn-Fast Jobs",
      type: "phishing",
      message: "Part-time job opportunity! Earn ₹3,000 to ₹8,000 daily from home just by subscribing to YouTube channels and liking videos. No experience required. WhatsApp us now.",
      isScam: true,
      flags: [
        "Classic 'Task-based Scam' (Part-Time Job Scam)",
        "Initially pays ₹100-200 to win trust, then demands deposits of thousands of rupees",
        "Never transfer money to get a job"
      ]
    }
  ],

  currentScenarioIdx: 0,
  phishingScore: 0,

  init() {
    this.setupSubTabs();
    this.setupPasswordTester();
    this.setupOtpSimulator();
    this.setupPhishingGame();
  },

  onEnter() {
    StorageManager.markTopicViewed("digitalSafety", "intro");
  },

  setupSubTabs() {
    document.querySelectorAll(".safe-sub-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".safe-sub-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.getAttribute("data-target");

        document.querySelectorAll(".safe-sub-section").forEach(sec => {
          sec.style.display = (sec.id === target) ? "block" : "none";
        });
        App.playSound("click");
      });
    });
  },

  // --------------------------------------------------------------------------
  // 1. Password Strength Analyzer
  // --------------------------------------------------------------------------
  setupPasswordTester() {
    const input = document.getElementById("passwordTestInput");
    const toggleBtn = document.getElementById("pwToggleVisibility");
    const generateBtn = document.getElementById("pwGenerateBtn");

    if (input) {
      input.addEventListener("input", (e) => {
        this.evaluatePassword(e.target.value);
      });
    }

    if (toggleBtn && input) {
      toggleBtn.addEventListener("click", () => {
        const isPw = input.type === "password";
        input.type = isPw ? "text" : "password";
        toggleBtn.textContent = isPw ? "🙈" : "👁️";
        App.playSound("click");
      });
    }

    if (generateBtn && input) {
      generateBtn.addEventListener("click", () => {
        const generated = this.generateStrongPassword();
        input.value = generated;
        input.type = "text";
        if (toggleBtn) toggleBtn.textContent = "🙈";
        this.evaluatePassword(generated);
        App.playSound("correct");
        App.showToast("Strong Password Generated!", "Password copied to clipboard & verified strong!", "success", "🔐");
        navigator.clipboard?.writeText(generated).catch(() => {});
        StorageManager.recordSafetyActivity("passwordTested", true);
      });
    }
  },

  evaluatePassword(pw) {
    const fill = document.getElementById("pwStrengthFill");
    const text = document.getElementById("pwStrengthText");
    const ruleLen = document.getElementById("ruleLen");
    const ruleUpper = document.getElementById("ruleUpper");
    const ruleNum = document.getElementById("ruleNum");
    const ruleSym = document.getElementById("ruleSym");

    if (!fill || !text) return;

    if (!pw) {
      fill.className = "strength-fill";
      fill.style.width = "0%";
      text.textContent = "Enter a password above to evaluate its security";
      [ruleLen, ruleUpper, ruleNum, ruleSym].forEach(r => r && r.classList.remove("valid"));
      return;
    }

    const hasLen = pw.length >= 8;
    const hasUpper = /[A-Z]/.test(pw) && /[a-z]/.test(pw);
    const hasNum = /[0-9]/.test(pw);
    const hasSym = /[^A-Za-z0-9]/.test(pw);

    if (ruleLen) ruleLen.classList.toggle("valid", hasLen);
    if (ruleUpper) ruleUpper.classList.toggle("valid", hasUpper);
    if (ruleNum) ruleNum.classList.toggle("valid", hasNum);
    if (ruleSym) ruleSym.classList.toggle("valid", hasSym);

    let score = 0;
    if (hasLen) score++;
    if (pw.length >= 12) score++;
    if (hasUpper) score++;
    if (hasNum) score++;
    if (hasSym) score++;

    // Common weak words penalty
    const weakList = ["password", "123456", "admin", "welcome", "qwerty", "india"];
    if (weakList.some(w => pw.toLowerCase().includes(w))) {
      score = Math.min(score, 1);
    }

    fill.className = "strength-fill";
    if (score <= 1) {
      fill.classList.add("weak");
      text.innerHTML = `<span style="color: var(--danger); font-weight: 700;">Weak (अतिशय कमकुवत)</span> - Hackers can crack this in seconds!`;
    } else if (score <= 3) {
      fill.classList.add("fair");
      text.innerHTML = `<span style="color: var(--warning); font-weight: 700;">Fair (साधारण)</span> - Add symbols & uppercase letters to make it secure.`;
    } else if (score === 4) {
      fill.classList.add("strong");
      text.innerHTML = `<span style="color: var(--secondary); font-weight: 700;">Strong (मजबूत)</span> - Good defense against automated attacks.`;
      StorageManager.recordSafetyActivity("passwordTested", true);
    } else {
      fill.classList.add("unbreakable");
      text.innerHTML = `<span style="color: var(--success); font-weight: 700;">Unbreakable (अभेद्य सुरक्षा!)</span> - Excellent password security.`;
      StorageManager.recordSafetyActivity("passwordTested", true);
    }
  },

  generateStrongPassword() {
    const uppers = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lowers = "abcdefghijkmnopqrstuvwxyz";
    const numbers = "23456789";
    const symbols = "!@#$%^&*";

    let pw = "";
    // Ensure at least 2 of each
    for (let i = 0; i < 3; i++) pw += uppers[Math.floor(Math.random() * uppers.length)];
    for (let i = 0; i < 4; i++) pw += lowers[Math.floor(Math.random() * lowers.length)];
    for (let i = 0; i < 3; i++) pw += numbers[Math.floor(Math.random() * numbers.length)];
    for (let i = 0; i < 2; i++) pw += symbols[Math.floor(Math.random() * symbols.length)];

    return pw.split('').sort(() => 0.5 - Math.random()).join('');
  },

  // --------------------------------------------------------------------------
  // 2. OTP Voice Call Simulator
  // --------------------------------------------------------------------------
  setupOtpSimulator() {
    const triggerBtn = document.getElementById("simulateCallBtn");
    const acceptBtn = document.getElementById("callAcceptBtn");
    const declineBtn = document.getElementById("callDeclineBtn");
    const callModal = document.getElementById("otpCallModal");

    if (triggerBtn && callModal) {
      triggerBtn.addEventListener("click", () => {
        callModal.classList.add("active");
        this.playPhoneRing();
      });
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        this.stopPhoneRing();
        this.showCallDialogue();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener("click", () => {
        this.stopPhoneRing();
        if (callModal) callModal.classList.remove("active");
        App.playSound("correct");
        App.showToast("Smart Decision! 🛡️", "You declined the unknown caller! Banks NEVER ask for OTP over phone calls.", "success", "✅");
        StorageManager.recordSafetyActivity("otpScenarioPassed", true);
      });
    }
  },

  playPhoneRing() {
    // Generate telephone dual ring tone using Web Audio
    try {
      App.initAudio();
      if (!App.audioCtx) return;
      const ctx = App.audioCtx;
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.setValueAtTime(440, now);
      osc2.frequency.setValueAtTime(480, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.2);
      osc2.stop(now + 1.2);
    } catch (e) {}
  },

  stopPhoneRing() {
    // ring sound duration is short
  },

  showCallDialogue() {
    const dialogue = document.getElementById("callDialogueArea");
    if (dialogue) {
      dialogue.innerHTML = `
        <div style="background: var(--bg-input); padding: 1.25rem; border-radius: var(--radius-md); border-left: 4px solid var(--danger);">
          <p><strong>Caller (Fake Officer):</strong> "Hello! I am calling from State Bank Head Office. Your ATM card is going to be blocked in 10 minutes. Tell me the 6-digit OTP sent to your phone right now to keep it active!"</p>
          <div style="margin-top: 1rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <button class="btn btn-sm btn-danger" id="giveOtpBtn">Tell OTP (Give Code)</button>
            <button class="btn btn-sm btn-success" id="refuseOtpBtn">Refuse & Disconnect Call</button>
          </div>
        </div>
      `;

      document.getElementById("giveOtpBtn")?.addEventListener("click", () => {
        App.playSound("wrong");
        alert("🚨 FRAUD ALERT! You shared your OTP! The scammer just drained money from your account. GOLDEN RULE: Banks NEVER call to ask for your OTP!");
        document.getElementById("otpCallModal")?.classList.remove("active");
      });

      document.getElementById("refuseOtpBtn")?.addEventListener("click", () => {
        App.playSound("correct");
        App.showToast("Excellent Defense!", "You followed the golden rule: Never share your OTP with anyone calling from any bank.", "success", "🛡️");
        StorageManager.recordSafetyActivity("otpScenarioPassed", true);
        document.getElementById("otpCallModal")?.classList.remove("active");
      });
    }
  },

  // --------------------------------------------------------------------------
  // 3. Phishing Spotter Game
  // --------------------------------------------------------------------------
  setupPhishingGame() {
    this.renderCurrentScenario();

    const scamBtn = document.getElementById("voteScamBtn");
    const safeBtn = document.getElementById("voteSafeBtn");
    const nextBtn = document.getElementById("nextScenarioBtn");

    if (scamBtn) {
      scamBtn.addEventListener("click", () => this.handleScenarioVote(true));
    }

    if (safeBtn) {
      safeBtn.addEventListener("click", () => this.handleScenarioVote(false));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.currentScenarioIdx = (this.currentScenarioIdx + 1) % this.scenarios.length;
        this.renderCurrentScenario();
        App.playSound("click");
      });
    }
  },

  renderCurrentScenario() {
    const sc = this.scenarios[this.currentScenarioIdx];
    const card = document.getElementById("phishingScenarioCard");
    const feedback = document.getElementById("scenarioFeedback");
    const nextBtn = document.getElementById("nextScenarioBtn");
    const scamBtn = document.getElementById("voteScamBtn");
    const safeBtn = document.getElementById("voteSafeBtn");

    if (!card) return;

    if (feedback) feedback.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    if (scamBtn) scamBtn.disabled = false;
    if (safeBtn) safeBtn.disabled = false;

    card.innerHTML = `
      <div class="meter-header">
        <div class="scenario-sender">📩 Sender: ${sc.sender}</div>
        <span class="badge badge-primary">Scenario ${this.currentScenarioIdx + 1} of ${this.scenarios.length}</span>
      </div>
      <div class="scenario-body">
        "${sc.message}"
      </div>
    `;
  },

  handleScenarioVote(userSaysScam) {
    const sc = this.scenarios[this.currentScenarioIdx];
    const feedback = document.getElementById("scenarioFeedback");
    const nextBtn = document.getElementById("nextScenarioBtn");
    const scamBtn = document.getElementById("voteScamBtn");
    const safeBtn = document.getElementById("voteSafeBtn");

    if (scamBtn) scamBtn.disabled = true;
    if (safeBtn) safeBtn.disabled = true;

    const isCorrect = (userSaysScam === sc.isScam);

    if (isCorrect) {
      this.phishingScore++;
      App.playSound("correct");
      App.showToast("Spot On!", "You accurately recognized the nature of this message!", "success", "🎯");
    } else {
      App.playSound("wrong");
      App.showToast("Incorrect Identification", "Be careful! Scammers use clever disguises.", "danger", "❌");
    }

    if (feedback) {
      feedback.style.display = "block";
      feedback.className = `scenario-feedback ${isCorrect ? "feedback-correct" : "feedback-incorrect"}`;
      feedback.innerHTML = `
        <h4>${isCorrect ? "✅ Well Done!" : "⚠️ Warning: Potential Trap!"}</h4>
        <p style="margin: 0.5rem 0;">This message is indeed <strong>${sc.isScam ? "A DANGEROUS PHISHING SCAM 🚨" : "A LEGITIMATE SAFE MESSAGE ✅"}</strong>.</p>
        <div style="font-size: 0.88rem;">
          <strong>Key Indicators & Red Flags to Notice:</strong>
          <ul style="padding-left: 1.25rem; margin-top: 0.35rem;">
            ${sc.flags.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (nextBtn) nextBtn.style.display = "inline-flex";

    if (this.currentScenarioIdx === this.scenarios.length - 1) {
      StorageManager.recordSafetyActivity("phishingCompleted", true);
      StorageManager.recordSafetyActivity("phishingScore", this.phishingScore);
    }
  }
};

window.SafetyModule = SafetyModule;
