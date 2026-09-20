/**
 * Digital_Sakshar - Local Storage & Progress Manager
 * Handles persistent tracking of lessons, quizzes, simulators, badges, and user profile.
 */

const STORAGE_KEY = "digital_sakshar_state_v1";

const DEFAULT_STATE = {
  user: {
    name: "Learner",
    theme: "light", // 'light', 'dark', 'senior'
    fontSize: "normal", // 'normal', 'large', 'xlarge'
    soundEnabled: true,
    speechEnabled: true
  },
  progress: {
    computerBasics: {
      anatomyExplored: false,
      sortingGameCompleted: false,
      sortingScore: 0,
      desktopSimUsed: false,
      paintArtSaved: false,
      topicsViewed: []
    },
    internetBasics: {
      browserExplored: false,
      searchSimUsed: false,
      emailComposed: false,
      topicsViewed: []
    },
    digitalSafety: {
      passwordTested: false,
      otpScenarioPassed: false,
      phishingScore: 0,
      phishingCompleted: false,
      topicsViewed: []
    },
    typing: {
      completedExercises: [],
      bestWpm: 0,
      bestAccuracy: 0,
      totalWordsTyped: 0
    },
    quizzes: {
      computer: { attempted: false, bestScore: 0, totalQuestions: 10 },
      internet: { attempted: false, bestScore: 0, totalQuestions: 10 },
      safety: { attempted: false, bestScore: 0, totalQuestions: 10 },
      allInOne: { attempted: false, bestScore: 0, totalQuestions: 15 }
    },
    resources: {
      dictionarySearches: 0,
      videosWatched: []
    }
  },
  achievements: [
    {
      id: "beginner-learner",
      icon: "🥉",
      title: "Beginner Learner (सुरुवातीचा शिकणारा)",
      desc: "Completed your first lesson or explored computer anatomy",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "file-manager",
      icon: "📁",
      title: "File Manager (संचिका व्यवस्थापक)",
      desc: "Created a folder or file in the Desktop Simulator",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "digital-artist",
      icon: "🎨",
      title: "Digital Artist (डिजिटल कलाकार)",
      desc: "Created and downloaded a drawing in Paint Activity",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "digital-explorer",
      icon: "🥈",
      title: "Digital Explorer (डिजिटल शोधक)",
      desc: "Explored Internet Basics and tried Search simulator",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "cyber-guardian",
      icon: "🛡️",
      title: "Cyber Guardian (सायबर रक्षक)",
      desc: "Tested password strength & passed OTP and Phishing safety tests",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "speed-typist",
      icon: "⌨️",
      title: "Key Master (कळफलक कुशल)",
      desc: "Completed typing practice with at least 85% accuracy",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "quiz-master",
      icon: "🏆",
      title: "Quiz Champion (चाचणी विजेता)",
      desc: "Scored 80% or higher on any Digital Sakshar quiz",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "certified-sakshar",
      icon: "🥇",
      title: "Certified Digital Sakshar (प्रमाणित डिजिटल साक्षर)",
      desc: "Attained 75%+ overall digital literacy across all modules",
      unlocked: false,
      unlockedAt: null
    }
  ]
};

const StorageManager = {
  state: null,

  init() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.state = JSON.parse(stored);
        // Ensure forward compatibility if new keys were added to DEFAULT_STATE
        this.state = this._deepMerge(DEFAULT_STATE, this.state);
      } else {
        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        this.save();
      }
    } catch (e) {
      console.warn("LocalStorage access error, falling back to in-memory state:", e);
      this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    return this.state;
  },

  _deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (this._isObject(target) && this._isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this._isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this._deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  },

  _isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  },

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to persist state in localStorage:", e);
    }
  },

  getUser() {
    return this.state.user;
  },

  updateUser(updates) {
    this.state.user = { ...this.state.user, ...updates };
    this.save();
  },

  getProgress() {
    return this.state.progress;
  },

  getAchievements() {
    return this.state.achievements;
  },

  markTopicViewed(moduleKey, topicId) {
    if (!this.state.progress[moduleKey]) return;
    if (!this.state.progress[moduleKey].topicsViewed.includes(topicId)) {
      this.state.progress[moduleKey].topicsViewed.push(topicId);
      this.save();
      this.checkAchievements();
    }
  },

  recordComputerActivity(activity, val) {
    this.state.progress.computerBasics[activity] = val;
    this.save();
    this.checkAchievements();
  },

  recordInternetActivity(activity, val) {
    this.state.progress.internetBasics[activity] = val;
    this.save();
    this.checkAchievements();
  },

  recordSafetyActivity(activity, val) {
    this.state.progress.digitalSafety[activity] = val;
    this.save();
    this.checkAchievements();
  },

  recordTypingResult(exerciseId, wpm, accuracy) {
    const t = this.state.progress.typing;
    if (!t.completedExercises.includes(exerciseId)) {
      t.completedExercises.push(exerciseId);
    }
    if (wpm > t.bestWpm) t.bestWpm = wpm;
    if (accuracy > t.bestAccuracy) t.bestAccuracy = accuracy;
    this.save();
    this.checkAchievements();
  },

  recordQuizScore(category, score, total) {
    const q = this.state.progress.quizzes[category];
    if (q) {
      q.attempted = true;
      if (score > q.bestScore) q.bestScore = score;
      q.totalQuestions = total;
      this.save();
      this.checkAchievements();
    }
  },

  // Calculate Overall Literacy Percentage (0 - 100%)
  calculateLiteracyScore() {
    const p = this.state.progress;
    let totalPoints = 0;
    const maxPoints = 100;

    // Computer Basics (max 25 pts)
    if (p.computerBasics.anatomyExplored) totalPoints += 5;
    if (p.computerBasics.sortingGameCompleted) totalPoints += 7;
    if (p.computerBasics.desktopSimUsed) totalPoints += 6;
    if (p.computerBasics.paintArtSaved) totalPoints += 7;

    // Internet Basics (max 20 pts)
    if (p.internetBasics.browserExplored) totalPoints += 6;
    if (p.internetBasics.searchSimUsed) totalPoints += 7;
    if (p.internetBasics.emailComposed) totalPoints += 7;

    // Digital Safety (max 25 pts)
    if (p.digitalSafety.passwordTested) totalPoints += 7;
    if (p.digitalSafety.otpScenarioPassed) totalPoints += 8;
    if (p.digitalSafety.phishingCompleted) totalPoints += 10;

    // Typing Practice (max 10 pts)
    if (p.typing.completedExercises.length >= 1) totalPoints += 5;
    if (p.typing.completedExercises.length >= 3) totalPoints += 5;

    // Quizzes (max 20 pts)
    let quizTotal = 0;
    let quizCount = 0;
    ['computer', 'internet', 'safety'].forEach(k => {
      if (p.quizzes[k].attempted) {
        quizTotal += (p.quizzes[k].bestScore / p.quizzes[k].totalQuestions);
        quizCount++;
      }
    });
    if (quizCount > 0) {
      totalPoints += Math.round((quizTotal / 3) * 20);
    }

    return Math.min(100, Math.round(totalPoints));
  },

  // Check and unlock achievement criteria
  checkAchievements() {
    const p = this.state.progress;
    const overallScore = this.calculateLiteracyScore();
    const newlyUnlocked = [];

    const unlockBadge = (id) => {
      const b = this.state.achievements.find(item => item.id === id);
      if (b && !b.unlocked) {
        b.unlocked = true;
        b.unlockedAt = new Date().toISOString();
        newlyUnlocked.push(b);
      }
    };

    // 1. Beginner Learner
    if (p.computerBasics.anatomyExplored || p.computerBasics.topicsViewed.length > 0) {
      unlockBadge("beginner-learner");
    }
    // 2. File Manager
    if (p.computerBasics.desktopSimUsed) {
      unlockBadge("file-manager");
    }
    // 3. Digital Artist
    if (p.computerBasics.paintArtSaved) {
      unlockBadge("digital-artist");
    }
    // 4. Digital Explorer
    if (p.internetBasics.browserExplored && p.internetBasics.searchSimUsed) {
      unlockBadge("digital-explorer");
    }
    // 5. Cyber Guardian
    if (p.digitalSafety.passwordTested && p.digitalSafety.otpScenarioPassed && p.digitalSafety.phishingCompleted) {
      unlockBadge("cyber-guardian");
    }
    // 6. Speed Typist
    if (p.typing.bestAccuracy >= 85 && p.typing.completedExercises.length > 0) {
      unlockBadge("speed-typist");
    }
    // 7. Quiz Champion
    const quizHigh = ['computer', 'internet', 'safety'].some(k => {
      const q = p.quizzes[k];
      return q.attempted && (q.bestScore / q.totalQuestions) >= 0.8;
    });
    if (quizHigh) {
      unlockBadge("quiz-master");
    }
    // 8. Certified Digital Sakshar
    if (overallScore >= 75) {
      unlockBadge("certified-sakshar");
    }

    if (newlyUnlocked.length > 0) {
      this.save();
      // Dispatch custom event for UI reaction (toasts, fanfares)
      window.dispatchEvent(new CustomEvent("sakshar_achievement_unlocked", {
        detail: { badges: newlyUnlocked }
      }));
    }

    window.dispatchEvent(new CustomEvent("sakshar_progress_updated", {
      detail: { overallScore }
    }));

    return newlyUnlocked;
  },

  resetAllProgress() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
    window.location.reload();
  }
};
