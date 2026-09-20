/**
 * Digital_Sakshar - Interactive Typing Practice Tutor
 * Features:
 * - 3 Progressive Levels (Drills, Words, Sentences)
 * - Live real-time WPM, Accuracy %, and Error counting
 * - Interactive visual on-screen keyboard with key highlights
 * - Web Audio mechanical keyboard clack sounds
 */

const TypingModule = {
  currentLevelIndex: 0,
  currentExerciseIndex: 0,
  targetText: "",
  userTyped: "",
  charIndex: 0,
  errorsCount: 0,
  totalKeystrokes: 0,
  startTime: null,
  timerInterval: null,
  isActive: false,

  init() {
    this.renderLevelSelector();
    this.loadExercise(0, 0);
    this.setupKeyboardListeners();
    this.setupVisualKeyboard();

    const restartBtn = document.getElementById("typingRestartBtn");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        this.resetTypingTest();
        App.playSound("click");
      });
    }
  },

  onEnter() {
    this.resetTypingTest();
  },

  renderLevelSelector() {
    const levelContainer = document.getElementById("typingLevelSelector");
    const exContainer = document.getElementById("typingExerciseSelector");
    if (!levelContainer || !exContainer) return;

    levelContainer.innerHTML = "";
    TYPING_DATA.levels.forEach((lvl, idx) => {
      const btn = document.createElement("button");
      btn.className = `sub-tab-btn ${idx === this.currentLevelIndex ? "active" : ""}`;
      btn.textContent = lvl.title;
      btn.addEventListener("click", () => {
        document.querySelectorAll("#typingLevelSelector .sub-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentLevelIndex = idx;
        this.currentExerciseIndex = 0;
        this.renderExerciseSelector();
        this.loadExercise(this.currentLevelIndex, 0);
        App.playSound("click");
      });
      levelContainer.appendChild(btn);
    });

    this.renderExerciseSelector();
  },

  renderExerciseSelector() {
    const exContainer = document.getElementById("typingExerciseSelector");
    if (!exContainer) return;
    exContainer.innerHTML = "";

    const level = TYPING_DATA.levels[this.currentLevelIndex];
    level.exercises.forEach((ex, idx) => {
      const btn = document.createElement("button");
      btn.className = `btn btn-sm ${idx === this.currentExerciseIndex ? "btn-primary" : "btn-outline"}`;
      btn.textContent = ex.name;
      btn.addEventListener("click", () => {
        document.querySelectorAll("#typingExerciseSelector .btn").forEach(b => {
          b.className = "btn btn-sm btn-outline";
        });
        btn.className = "btn btn-sm btn-primary";
        this.currentExerciseIndex = idx;
        this.loadExercise(this.currentLevelIndex, idx);
        App.playSound("click");
      });
      exContainer.appendChild(btn);
    });
  },

  loadExercise(lvlIdx, exIdx) {
    const ex = TYPING_DATA.levels[lvlIdx].exercises[exIdx];
    this.targetText = ex.text;
    const instEl = document.getElementById("typingInstruction");
    if (instEl) instEl.textContent = `📌 ${ex.instruction}`;
    this.resetTypingTest();
  },

  resetTypingTest() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.userTyped = "";
    this.charIndex = 0;
    this.errorsCount = 0;
    this.totalKeystrokes = 0;
    this.startTime = null;
    this.isActive = false;

    document.getElementById("typingWpm").textContent = "0";
    document.getElementById("typingAccuracy").textContent = "100%";
    document.getElementById("typingErrors").textContent = "0";
    document.getElementById("typingTimer").textContent = "00:00";

    this.renderTextDisplay();
    this.highlightTargetKey();
  },

  renderTextDisplay() {
    const display = document.getElementById("typingTextDisplay");
    if (!display) return;

    let html = "";
    for (let i = 0; i < this.targetText.length; i++) {
      const targetChar = this.targetText[i];
      if (i < this.userTyped.length) {
        const typedChar = this.userTyped[i];
        if (typedChar === targetChar) {
          html += `<span class="char-correct">${this.escapeHtml(targetChar)}</span>`;
        } else {
          html += `<span class="char-wrong">${this.escapeHtml(targetChar)}</span>`;
        }
      } else if (i === this.charIndex) {
        html += `<span class="char-current">${this.escapeHtml(targetChar)}</span>`;
      } else {
        html += `<span>${this.escapeHtml(targetChar)}</span>`;
      }
    }

    display.innerHTML = html;
  },

  escapeHtml(ch) {
    if (ch === " ") return "&nbsp;";
    if (ch === "<") return "&lt;";
    if (ch === ">") return "&gt;";
    if (ch === "&") return "&amp;";
    return ch;
  },

  setupKeyboardListeners() {
    window.addEventListener("keydown", (e) => {
      // Only handle when typing view is active
      if (App.currentRoute !== "typing") return;

      // Ignore special modifier keys alone
      if (["Shift", "Control", "Alt", "Meta", "Tab", "CapsLock"].includes(e.key)) return;

      // Prevent space scrolling down the page
      if (e.key === " ") e.preventDefault();

      // Start timer on first keystroke
      if (!this.isActive) {
        this.isActive = true;
        this.startTime = Date.now();
        this.startTimer();
      }

      // Visual keyboard press animation
      this.animateVisualKey(e.key);

      // Handle Backspace
      if (e.key === "Backspace") {
        if (this.userTyped.length > 0) {
          this.userTyped = this.userTyped.slice(0, -1);
          this.charIndex = Math.max(0, this.charIndex - 1);
          this.renderTextDisplay();
          this.highlightTargetKey();
          App.playSound("typewriter");
        }
        return;
      }

      // Handle single character inputs
      if (e.key.length === 1 && this.charIndex < this.targetText.length) {
        this.totalKeystrokes++;
        const expected = this.targetText[this.charIndex];

        if (e.key !== expected) {
          this.errorsCount++;
          App.playSound("wrong");
        } else {
          App.playSound("typewriter");
        }

        this.userTyped += e.key;
        this.charIndex++;
        this.renderTextDisplay();
        this.updateStats();
        this.highlightTargetKey();

        // Check for exercise completion
        if (this.charIndex >= this.targetText.length) {
          this.completeExercise();
        }
      }
    });
  },

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (!this.startTime) return;
      const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
      const secs = String(elapsedSeconds % 60).padStart(2, "0");
      document.getElementById("typingTimer").textContent = `${mins}:${secs}`;
      this.updateStats();
    }, 500);
  },

  updateStats() {
    if (!this.startTime) return;
    const elapsedMinutes = (Date.now() - this.startTime) / 60000;

    // Calculate WPM (Words = characters / 5)
    let correctChars = 0;
    for (let i = 0; i < this.userTyped.length; i++) {
      if (this.userTyped[i] === this.targetText[i]) correctChars++;
    }

    const wpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;
    const accuracy = this.totalKeystrokes > 0 
      ? Math.max(0, Math.round(((this.totalKeystrokes - this.errorsCount) / this.totalKeystrokes) * 100))
      : 100;

    document.getElementById("typingWpm").textContent = String(wpm);
    document.getElementById("typingAccuracy").textContent = `${accuracy}%`;
    document.getElementById("typingErrors").textContent = String(this.errorsCount);
  },

  completeExercise() {
    clearInterval(this.timerInterval);
    const finalWpm = parseInt(document.getElementById("typingWpm").textContent, 10) || 0;
    const finalAccuracy = parseInt(document.getElementById("typingAccuracy").textContent, 10) || 0;

    const currentEx = TYPING_DATA.levels[this.currentLevelIndex].exercises[this.currentExerciseIndex];
    StorageManager.recordTypingResult(currentEx.id, finalWpm, finalAccuracy);

    App.playSound("correct");
    App.showToast("Exercise Completed! 🎉", `Speed: ${finalWpm} WPM | Accuracy: ${finalAccuracy}%`, "success", "⌨️");

    // Suggest next exercise or level
    setTimeout(() => {
      if (confirm(`Well done! You achieved ${finalWpm} WPM with ${finalAccuracy}% accuracy.\n\nWould you like to advance to the next exercise?`)) {
        const nextExIdx = this.currentExerciseIndex + 1;
        const currentLevel = TYPING_DATA.levels[this.currentLevelIndex];
        if (nextExIdx < currentLevel.exercises.length) {
          this.currentExerciseIndex = nextExIdx;
          this.renderExerciseSelector();
          this.loadExercise(this.currentLevelIndex, nextExIdx);
        } else {
          App.showToast("Level Finished!", "You have finished all exercises in this level!", "success", "🏆");
        }
      }
    }, 400);
  },

  // --------------------------------------------------------------------------
  // Visual Keyboard Highlighting
  // --------------------------------------------------------------------------
  setupVisualKeyboard() {
    const kbContainer = document.getElementById("visualKeyboard");
    if (!kbContainer) return;

    const layout = [
      ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
      ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
      ["Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
      ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
      ["Space"]
    ];

    kbContainer.innerHTML = "";
    layout.forEach(row => {
      const rowEl = document.createElement("div");
      rowEl.className = "kb-row";

      row.forEach(key => {
        const keyEl = document.createElement("div");
        keyEl.className = "kb-key";
        keyEl.setAttribute("data-key", key.toLowerCase());

        if (["Backspace", "Enter", "Shift", "Caps", "Tab"].includes(key)) {
          keyEl.classList.add("key-wide");
        } else if (key === "Space") {
          keyEl.classList.add("key-space");
        }

        keyEl.textContent = key;
        rowEl.appendChild(keyEl);
      });

      kbContainer.appendChild(rowEl);
    });
  },

  highlightTargetKey() {
    // Remove previous highlights
    document.querySelectorAll(".kb-key").forEach(k => k.classList.remove("key-target"));

    if (this.charIndex >= this.targetText.length) return;
    let target = this.targetText[this.charIndex];
    if (target === " ") target = "space";
    else target = target.toLowerCase();

    const targetEl = document.querySelector(`.kb-key[data-key="${target}"]`);
    if (targetEl) {
      targetEl.classList.add("key-target");
    }
  },

  animateVisualKey(key) {
    let lookup = key.toLowerCase();
    if (lookup === " ") lookup = "space";
    const el = document.querySelector(`.kb-key[data-key="${lookup}"]`);
    if (el) {
      el.classList.add("key-active");
      setTimeout(() => el.classList.remove("key-active"), 120);
    }
  }
};

window.TypingModule = TypingModule;
