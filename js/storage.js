/**
 * Digital_Sakshar - Local Storage & Progress Manager
 * Handles persistent tracking of lessons, quizzes, practical simulators, badges, and user profile.
 */

const STORAGE_KEY = "digital_sakshar_state_v2";

const DEFAULT_STATE = {
  user: {
    name: "Digital Learner",
    language: "en", // 'en' | 'mr'
    theme: "light", // 'light' | 'dark' | 'senior'
    fontSize: "normal", // 'normal' | 'large' | 'xlarge'
    soundEnabled: true,
    speechEnabled: true
  },
  progress: {
    computerBasics: {
      anatomyExplored: false,
      sortingGameCompleted: false,
      sortingScore: 0,
      topicsViewed: []
    },
    practicalSkills: {
      paintLearned: false,
      folderCreated: false,
      textFileSaved: false,
      copyPastePracticed: false,
      fileRenamed: false,
      fileDeleted: false,
      fileRestored: false,
      mousePracticed: false,
      keyboardPracticed: false,
      completedTopics: []
    },
    internetBasics: {
      browserExplored: false,
      searchSimUsed: false,
      emailComposed: false,
      topicsViewed: []
    },
    resources: {
      dictionarySearches: 0,
      videosWatched: [],
      topicsViewed: []
    },
    quizzes: {
      computer: { attempted: false, bestScore: 0, totalQuestions: 10 },
      practical: { attempted: false, bestScore: 0, totalQuestions: 10 },
      internet: { attempted: false, bestScore: 0, totalQuestions: 10 },
      allInOne: { attempted: false, bestScore: 0, totalQuestions: 15 }
    }
  },
  achievements: [
    {
      id: "beginner-learner",
      icon: "🥉",
      title: "Beginner Learner (सुरुवातीचा शिकणारा)",
      desc: "Completed your first computer learning activity",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "file-manager",
      icon: "📁",
      title: "File Manager (संचिका व्यवस्थापक)",
      desc: "Completed folder and file practical lessons",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "digital-artist",
      icon: "🎨",
      title: "Digital Artist (डिजिटल कलाकार)",
      desc: "Completed the Paint drawing practical lesson",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "digital-explorer",
      icon: "🌐",
      title: "Digital Explorer (डिजिटल शोधक)",
      desc: "Explored Internet Basics and web browsing guides",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "pc-skills-master",
      icon: "🖥️",
      title: "PC Skills Master (संगणक कौशल्य मास्टर)",
      desc: "Completed at least 5 Practical Computer Skills topics",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "learning-explorer",
      icon: "📚",
      title: "Learning Explorer (अभ्यास शोधक)",
      desc: "Explored video tutorials, study notes, or Digital Dictionary",
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
      desc: "Attained 75%+ overall digital literacy across all active modules",
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
    if (!this.state.progress[moduleKey].topicsViewed) {
      this.state.progress[moduleKey].topicsViewed = [];
    }
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

  recordPracticalActivity(topicId, val) {
    const p = this.state.progress.practicalSkills;
    if (val) {
      p[topicId] = true;
      if (!p.completedTopics.includes(topicId)) {
        p.completedTopics.push(topicId);
      }
    } else {
      p[topicId] = false;
      p.completedTopics = p.completedTopics.filter(t => t !== topicId);
    }
    this.save();
    this.checkAchievements();
  },

  isTopicCompleted(topicId) {
    return this.state.progress.practicalSkills.completedTopics.includes(topicId);
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
  // Recommended weighting:
  // Computer Basics:     25%
  // Practical Skills:    30%
  // Internet Basics:     20%
  // Learning Resources:  10%
  // Interactive Quizzes: 15%
  // Total:              100%
  calculateLiteracyScore() {
    const p = this.state.progress;
    let totalPoints = 0;

    // 1. Computer Basics (max 25 pts)
    let compPts = 0;
    if (p.computerBasics.anatomyExplored) compPts += 10;
    if (p.computerBasics.sortingGameCompleted) compPts += 10;
    if (p.computerBasics.topicsViewed && p.computerBasics.topicsViewed.length > 0) compPts += 5;
    totalPoints += Math.min(25, compPts);

    // 2. Practical Skills (max 30 pts)
    const completedCount = p.practicalSkills.completedTopics ? p.practicalSkills.completedTopics.length : 0;
    const practicalPts = Math.round((completedCount / 9) * 30);
    totalPoints += Math.min(30, practicalPts);

    // 3. Internet Basics (max 20 pts)
    let netPts = 0;
    if (p.internetBasics.browserExplored) netPts += 7;
    if (p.internetBasics.searchSimUsed) netPts += 7;
    if (p.internetBasics.emailComposed) netPts += 6;
    totalPoints += Math.min(20, netPts);

    // 4. Learning Resources (max 10 pts)
    let resPts = 0;
    if (p.resources.videosWatched && p.resources.videosWatched.length > 0) resPts += 4;
    if (p.resources.dictionarySearches > 0) resPts += 3;
    if (p.resources.topicsViewed && p.resources.topicsViewed.length > 0) resPts += 3;
    totalPoints += Math.min(10, resPts);

    // 5. Quizzes (max 15 pts)
    let quizSum = 0;
    let attemptedCount = 0;
    ['computer', 'practical', 'internet', 'allInOne'].forEach(k => {
      const q = p.quizzes[k];
      if (q && q.attempted) {
        quizSum += (q.bestScore / q.totalQuestions);
        attemptedCount++;
      }
    });
    if (attemptedCount > 0) {
      totalPoints += Math.min(15, Math.round((quizSum / attemptedCount) * 15));
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
    if (p.computerBasics.anatomyExplored || (p.computerBasics.topicsViewed && p.computerBasics.topicsViewed.length > 0) || (p.practicalSkills.completedTopics && p.practicalSkills.completedTopics.length > 0)) {
      unlockBadge("beginner-learner");
    }

    // 2. File Manager
    if (p.practicalSkills.folder || p.practicalSkills.folderCreated || p.practicalSkills.rename || p.practicalSkills.fileRenamed || p.practicalSkills.delete || p.practicalSkills.fileDeleted || p.practicalSkills.restore || p.practicalSkills.fileRestored || (p.practicalSkills.completedTopics && (p.practicalSkills.completedTopics.includes("folder") || p.practicalSkills.completedTopics.includes("rename") || p.practicalSkills.completedTopics.includes("delete") || p.practicalSkills.completedTopics.includes("restore")))) {
      unlockBadge("file-manager");
    }

    // 3. Digital Artist
    if (p.practicalSkills.paint || p.practicalSkills.paintLearned || (p.practicalSkills.completedTopics && p.practicalSkills.completedTopics.includes("paint"))) {
      unlockBadge("digital-artist");
    }

    // 4. Digital Explorer
    if (p.internetBasics.browserExplored || p.internetBasics.searchSimUsed) {
      unlockBadge("digital-explorer");
    }

    // 5. PC Skills Master (at least 5 practical skills topics completed)
    if (p.practicalSkills.completedTopics && p.practicalSkills.completedTopics.length >= 5) {
      unlockBadge("pc-skills-master");
    }

    // 6. Learning Explorer
    if ((p.resources.videosWatched && p.resources.videosWatched.length > 0) || p.resources.dictionarySearches > 0 || (p.resources.topicsViewed && p.resources.topicsViewed.length > 0)) {
      unlockBadge("learning-explorer");
    }

    // 7. Quiz Champion (80%+ on any quiz)
    const quizWon = ['computer', 'practical', 'internet', 'allInOne'].some(k => {
      const q = p.quizzes[k];
      return q && q.attempted && (q.bestScore / q.totalQuestions) >= 0.8;
    });
    if (quizWon) {
      unlockBadge("quiz-master");
    }

    // 8. Certified Digital Sakshar (75%+ overall progress)
    if (overallScore >= 75) {
      unlockBadge("certified-sakshar");
    }

    if (newlyUnlocked.length > 0) {
      this.save();
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

window.StorageManager = StorageManager;
