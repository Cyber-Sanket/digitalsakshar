/**
 * Digital_Sakshar - Interactive Quiz Engine
 * Features:
 * - 4 Quiz Categories (Computer, Internet, Safety, Grand Challenge)
 * - 4 Options per question with instant visual feedback & explanations
 * - Automatic score calculation and comprehensive final scorecard
 */

const QuizModule = {
  activeCategory: "computer",
  questions: [],
  currentIndex: 0,
  score: 0,
  userAnswers: [], // stores { questionId, selectedIndex, isCorrect }
  answered: false,

  init() {
    this.setupCategoryButtons();
  },

  onEnter() {
    this.startQuiz(this.activeCategory);
  },

  setupCategoryButtons() {
    document.querySelectorAll(".quiz-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".quiz-cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.getAttribute("data-cat");
        this.startQuiz(cat);
        App.playSound("click");
      });
    });

    const restartBtn = document.getElementById("quizRetryBtn");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        this.startQuiz(this.activeCategory);
        App.playSound("click");
      });
    }
  },

  startQuiz(catKey) {
    this.activeCategory = catKey;
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.answered = false;

    if (catKey === "allInOne") {
      // Blend questions from all 3 categories
      const allQ = [
        ...QUIZ_DATA.computer.questions,
        ...QUIZ_DATA.internet.questions,
        ...QUIZ_DATA.safety.questions
      ];
      // Shuffle and pick 15
      this.questions = allQ.sort(() => 0.5 - Math.random()).slice(0, 15);
    } else {
      this.questions = [...QUIZ_DATA[catKey].questions];
    }

    // Toggle views: show question arena, hide scorecard
    const qArena = document.getElementById("quizQuestionArena");
    const scorecard = document.getElementById("quizScorecard");
    if (qArena) qArena.style.display = "block";
    if (scorecard) scorecard.style.display = "none";

    this.renderQuestion();
  },

  renderQuestion() {
    this.answered = false;
    const q = this.questions[this.currentIndex];
    const arena = document.getElementById("quizQuestionArena");
    if (!arena || !q) return;

    // Update Progress Bar
    const progressPercent = Math.round(((this.currentIndex) / this.questions.length) * 100);
    const fill = document.getElementById("quizProgressFill");
    if (fill) fill.style.width = `${progressPercent}%`;

    // Render Question HTML
    arena.innerHTML = `
      <div class="quiz-question-card">
        <div class="question-header">
          <span class="badge badge-primary">Question ${this.currentIndex + 1} of ${this.questions.length}</span>
          <span class="badge badge-success">Score: ${this.score}</span>
        </div>

        <div class="question-text">${q.question}</div>
        ${q.marathiSub ? `<div class="question-marathi-sub">${q.marathiSub}</div>` : ''}

        <div class="quiz-options-list" id="quizOptionsList">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option-btn" data-idx="${idx}">
              <span class="option-badge">${String.fromCharCode(65 + idx)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>

        <div id="quizExplanationBox" style="display: none;" class="quiz-explanation-box"></div>

        <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end;">
          <button id="quizNextBtn" class="btn btn-primary" style="display: none;">
            ${this.currentIndex === this.questions.length - 1 ? "Finish & View Scorecard 🏆" : "Next Question ➡️"}
          </button>
        </div>
      </div>
    `;

    // Bind option clicks
    document.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (this.answered) return;
        const selectedIdx = parseInt(btn.getAttribute("data-idx"), 10);
        this.handleAnswer(selectedIdx);
      });
    });

    // Bind Next button
    const nextBtn = document.getElementById("quizNextBtn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentIndex < this.questions.length - 1) {
          this.currentIndex++;
          this.renderQuestion();
          App.playSound("click");
        } else {
          this.showScorecard();
        }
      });
    }
  },

  handleAnswer(selectedIdx) {
    this.answered = true;
    const q = this.questions[this.currentIndex];
    const isCorrect = (selectedIdx === q.correctIndex);

    if (isCorrect) {
      this.score++;
      App.playSound("correct");
    } else {
      App.playSound("wrong");
    }

    this.userAnswers.push({
      question: q.question,
      selected: selectedIdx,
      correct: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    });

    // Style option buttons
    document.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.disabled = true;
      const idx = parseInt(btn.getAttribute("data-idx"), 10);
      if (idx === q.correctIndex) {
        btn.classList.add("correct");
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    // Show Explanation
    const expBox = document.getElementById("quizExplanationBox");
    if (expBox) {
      expBox.style.display = "block";
      expBox.innerHTML = `
        <strong>${isCorrect ? "✅ Correct!" : "❌ Incorrect!"}</strong><br>
        ${q.explanation}
      `;
    }

    // Show Next Button
    const nextBtn = document.getElementById("quizNextBtn");
    if (nextBtn) nextBtn.style.display = "inline-flex";
  },

  showScorecard() {
    const qArena = document.getElementById("quizQuestionArena");
    const scorecard = document.getElementById("quizScorecard");
    if (qArena) qArena.style.display = "none";
    if (!scorecard) return;

    scorecard.style.display = "block";

    const total = this.questions.length;
    const percent = Math.round((this.score / total) * 100);

    // Save score in local storage
    StorageManager.recordQuizScore(this.activeCategory, this.score, total);

    let medal = "🥉";
    let title = "Beginner Learner (शिकणारा)";
    let desc = "Good attempt! Review the study materials and retake the quiz to improve your score.";

    if (percent >= 90) {
      medal = "🏆";
      title = "Quiz Master & Champion!";
      desc = "Outstanding performance! You have thoroughly mastered this topic.";
      App.playSound("fanfare");
    } else if (percent >= 75) {
      medal = "🥇";
      title = "Certified Digital Sakshar!";
      desc = "Impressive knowledge! You understand digital concepts with great accuracy.";
      App.playSound("fanfare");
    } else if (percent >= 50) {
      medal = "🥈";
      title = "Digital Explorer";
      desc = "Good effort! A few more practice sessions and you'll be a digital expert.";
      App.playSound("correct");
    }

    scorecard.innerHTML = `
      <div class="card text-center animate-pop-in" style="max-width: 650px; margin: 0 auto; padding: 2.5rem;">
        <div style="font-size: 4rem; margin-bottom: 0.5rem;">${medal}</div>
        <h2>${title}</h2>
        <div class="section-marathi-subtitle">चाचणी निकाल (Quiz Results)</div>

        <div style="margin: 1.5rem 0; font-size: 3rem; font-weight: 800; color: var(--primary);">
          ${this.score} / ${total}
          <div style="font-size: 1.1rem; color: var(--text-muted); font-weight: 600;">${percent}% Accuracy</div>
        </div>

        <p style="margin-bottom: 1.5rem;">${desc}</p>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="QuizModule.startQuiz('${this.activeCategory}')">🔄 Retake Quiz</button>
          <button class="btn btn-outline" onclick="App.navigateTo('progress')">📊 View My Progress & Certificate</button>
        </div>

        <div style="margin-top: 2rem; text-align: left; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
          <h4 style="margin-bottom: 1rem;">Answer Review Summary:</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${this.userAnswers.map((a, i) => `
              <div style="padding: 0.75rem; border-radius: var(--radius-sm); background: var(--bg-input); font-size: 0.88rem; border-left: 3px solid ${a.isCorrect ? 'var(--success)' : 'var(--danger)'};">
                <strong>Q${i + 1}:</strong> ${a.question}<br>
                <span style="color: ${a.isCorrect ? 'var(--success)' : 'var(--danger)'}; font-weight: 600;">
                  ${a.isCorrect ? "✓ Answered Correctly" : "✗ Needs Review"}
                </span>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">${a.explanation}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};

window.QuizModule = QuizModule;
