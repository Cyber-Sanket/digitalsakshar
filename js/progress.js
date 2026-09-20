/**
 * Digital_Sakshar - Progress, Achievements & Certificate Generator Module
 * Features:
 * - Real-time Digital Literacy Index calculation
 * - Detailed progress breakdown across all 8 modules
 * - Unlocked badge showcases with celebratory fanfares
 * - High-resolution printable Certificate of Digital Literacy
 */

const ProgressModule = {
  certCandidateName: "Digital Learner",

  init() {
    this.renderDashboard();
    this.setupCertificateControls();

    // Listen to global progress updates
    window.addEventListener("sakshar_progress_updated", () => {
      this.renderDashboard();
    });
  },

  onEnter() {
    this.renderDashboard();
  },

  renderDashboard() {
    const overallScore = StorageManager.calculateLiteracyScore();
    const progress = StorageManager.getProgress();
    const achievements = StorageManager.getAchievements();

    // 1. Overall Score Display
    const scoreVal = document.getElementById("overallLiteracyScore");
    const scoreFill = document.getElementById("overallProgressFill");
    const heroMeter = document.getElementById("heroMeterVal");
    const heroFill = document.getElementById("heroProgressFill");

    if (scoreVal) scoreVal.textContent = `${overallScore}%`;
    if (scoreFill) scoreFill.style.width = `${overallScore}%`;
    if (heroMeter) heroMeter.textContent = `${overallScore}%`;
    if (heroFill) heroFill.style.width = `${overallScore}%`;

    // 2. Category Progress Bars
    // Computer Basics (max 25)
    let compScore = 0;
    if (progress.computerBasics.anatomyExplored) compScore += 6;
    if (progress.computerBasics.sortingGameCompleted) compScore += 7;
    if (progress.computerBasics.desktopSimUsed) compScore += 6;
    if (progress.computerBasics.paintArtSaved) compScore += 6;
    const compPercent = Math.min(100, Math.round((compScore / 25) * 100));

    // Internet Basics (max 20)
    let netScore = 0;
    if (progress.internetBasics.browserExplored) netScore += 6;
    if (progress.internetBasics.searchSimUsed) netScore += 7;
    if (progress.internetBasics.emailComposed) netScore += 7;
    const netPercent = Math.min(100, Math.round((netScore / 20) * 100));

    // Digital Safety (max 25)
    let safeScore = 0;
    if (progress.digitalSafety.passwordTested) safeScore += 7;
    if (progress.digitalSafety.otpScenarioPassed) safeScore += 8;
    if (progress.digitalSafety.phishingCompleted) safeScore += 10;
    const safePercent = Math.min(100, Math.round((safeScore / 25) * 100));

    // Typing (max 10)
    const typingCount = progress.typing.completedExercises.length;
    const typingPercent = Math.min(100, typingCount * 25);

    // Quizzes (max 20)
    let quizAvg = 0;
    let attemptedCount = 0;
    ['computer', 'internet', 'safety'].forEach(k => {
      const q = progress.quizzes[k];
      if (q.attempted) {
        quizAvg += (q.bestScore / q.totalQuestions) * 100;
        attemptedCount++;
      }
    });
    const quizPercent = attemptedCount > 0 ? Math.round(quizAvg / 3) : 0;

    // Update DOM bars
    this.updateBar("barComp", compPercent);
    this.updateBar("barNet", netPercent);
    this.updateBar("barSafe", safePercent);
    this.updateBar("barType", typingPercent);
    this.updateBar("barQuiz", quizPercent);

    // Update Quick Stat Counts on Home Hero
    const statBadges = document.getElementById("statBadgesCount");
    const statQuizzes = document.getElementById("statQuizzesCount");
    const statTyping = document.getElementById("statTypingWpm");

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    if (statBadges) statBadges.textContent = `${unlockedCount} / ${achievements.length}`;
    if (statQuizzes) statQuizzes.textContent = `${attemptedCount} / 3`;
    if (statTyping) statTyping.textContent = `${progress.typing.bestWpm || 0} WPM`;

    // 3. Render Badges Grid
    const badgesContainer = document.getElementById("achievementsGrid");
    if (badgesContainer) {
      badgesContainer.innerHTML = achievements.map(b => `
        <div class="badge-card ${b.unlocked ? 'unlocked' : 'locked'}">
          <div class="badge-trophy-icon">${b.icon}</div>
          <h4 style="font-size: 0.95rem; line-height: 1.3;">${b.title}</h4>
          <p style="font-size: 0.82rem; margin-top: 0.35rem;">${b.desc}</p>
          <div style="margin-top: 0.75rem;">
            ${b.unlocked 
              ? `<span class="badge badge-success">✓ Unlocked (${new Date(b.unlockedAt || Date.now()).toLocaleDateString()})</span>`
              : `<span class="badge badge-warning">🔒 In Progress</span>`}
          </div>
        </div>
      `).join('');
    }

    // 4. Update Certificate Preview
    this.updateCertificatePreview();
  },

  updateBar(id, percent) {
    const bar = document.getElementById(id);
    const text = document.getElementById(`${id}Val`);
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}%`;
  },

  // --------------------------------------------------------------------------
  // Certificate Generator
  // --------------------------------------------------------------------------
  setupCertificateControls() {
    const input = document.getElementById("certNameInput");
    const updateBtn = document.getElementById("certUpdateNameBtn");
    const printBtn = document.getElementById("certPrintBtn");
    const resetBtn = document.getElementById("resetAllProgressBtn");

    if (input) {
      input.value = StorageManager.getUser().name || "Digital Learner";
      this.certCandidateName = input.value;
    }

    if (updateBtn && input) {
      updateBtn.addEventListener("click", () => {
        const val = input.value.trim();
        if (val) {
          this.certCandidateName = val;
          StorageManager.updateUser({ name: val });
          this.updateCertificatePreview();
          App.playSound("correct");
          App.showToast("Certificate Updated!", `Name updated to: ${val}`, "success", "📜");
        }
      });
    }

    if (printBtn) {
      printBtn.addEventListener("click", () => {
        App.playSound("click");
        window.print();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset all your learning progress, quiz scores, and badges?")) {
          StorageManager.resetAllProgress();
        }
      });
    }
  },

  updateCertificatePreview() {
    const nameEl = document.getElementById("certDisplayCandidateName");
    const dateEl = document.getElementById("certIssueDate");
    const idEl = document.getElementById("certVerificationId");
    const scoreBadgeEl = document.getElementById("certScoreBadge");

    const user = StorageManager.getUser();
    const candidateName = user.name || this.certCandidateName || "Digital Learner";
    const overallScore = StorageManager.calculateLiteracyScore();

    if (nameEl) nameEl.textContent = candidateName;
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
    if (idEl) idEl.textContent = `DS-${new Date().getFullYear()}-${Math.abs(this.hashCode(candidateName)).toString().slice(0, 6)}`;
    if (scoreBadgeEl) scoreBadgeEl.textContent = `Score: ${overallScore}% Sakshar`;
  },

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
};

window.ProgressModule = ProgressModule;
