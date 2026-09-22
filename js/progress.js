/**
 * Digital_Sakshar - Progress, Achievements & Certificate Generator Module
 * Features:
 * - Real-time Digital Literacy Index calculation (Weighted active modules)
 * - Category progress bars for Computer Basics, Practical Skills, Internet Basics, Resources, and Quizzes
 * - Unlocked 8 badge showcases with celebratory fanfares
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

    // 2. Category Progress Calculations
    // Computer Basics (max 25 pts)
    let compScore = 0;
    if (progress.computerBasics.anatomyExplored) compScore += 10;
    if (progress.computerBasics.sortingGameCompleted) compScore += 10;
    if (progress.computerBasics.topicsViewed && progress.computerBasics.topicsViewed.length > 0) compScore += 5;
    const compPercent = Math.min(100, Math.round((compScore / 25) * 100));

    // Practical Computer Skills (max 30 pts, 9 topics)
    const completedPractical = progress.practicalSkills.completedTopics ? progress.practicalSkills.completedTopics.length : 0;
    const practicalPercent = Math.min(100, Math.round((completedPractical / 9) * 100));

    // Internet Basics (max 20 pts)
    let netScore = 0;
    if (progress.internetBasics.browserExplored) netScore += 7;
    if (progress.internetBasics.searchSimUsed) netScore += 7;
    if (progress.internetBasics.emailComposed) netScore += 6;
    const netPercent = Math.min(100, Math.round((netScore / 20) * 100));

    // Learning Resources (max 10 pts)
    let resScore = 0;
    if (progress.resources.videosWatched && progress.resources.videosWatched.length > 0) resScore += 4;
    if (progress.resources.dictionarySearches > 0) resScore += 3;
    if (progress.resources.topicsViewed && progress.resources.topicsViewed.length > 0) resScore += 3;
    const resPercent = Math.min(100, Math.round((resScore / 10) * 100));

    // Quizzes (max 15 pts)
    let quizAvg = 0;
    let attemptedCount = 0;
    ['computer', 'practical', 'internet', 'allInOne'].forEach(k => {
      const q = progress.quizzes[k];
      if (q && q.attempted) {
        quizAvg += (q.bestScore / q.totalQuestions) * 100;
        attemptedCount++;
      }
    });
    const quizPercent = attemptedCount > 0 ? Math.round(quizAvg / attemptedCount) : 0;

    // Update DOM bars
    this.updateBar("barComp", compPercent);
    this.updateBar("barPractical", practicalPercent, `${completedPractical} / 9 Topics Completed`);
    this.updateBar("barNet", netPercent);
    this.updateBar("barRes", resPercent);
    this.updateBar("barQuiz", quizPercent);

    // Update Quick Stat Counts on Home Hero
    const statBadges = document.getElementById("statBadgesCount");
    const statQuizzes = document.getElementById("statQuizzesCount");
    const statPractical = document.getElementById("statPracticalTopics");

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    if (statBadges) statBadges.textContent = `${unlockedCount} / ${achievements.length}`;
    if (statQuizzes) statQuizzes.textContent = `${attemptedCount} / 4`;
    if (statPractical) statPractical.textContent = `${completedPractical} / 9 Topics`;

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

  updateBar(id, percent, customText = null) {
    const bar = document.getElementById(id);
    const text = document.getElementById(`${id}Val`);
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = customText || `${percent}%`;
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
        if (confirm("Are you sure you want to reset all your learning progress, practical tasks, and quiz scores?")) {
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
