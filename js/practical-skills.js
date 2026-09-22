/**
 * Digital_Sakshar - Practical Computer Skills Module (PC वर हे काम कसं करायचं?)
 * Implements 9 comprehensive step-by-step practical guides with:
 * - 📌 Simple explanation (Bilingual EN/MR)
 * - 🧭 Direction / Where to find it
 * - 🪜 Step-by-step instructions
 * - 📊 Flowchart visual
 * - 🎥 YouTube demonstration video
 * - 💡 Beginner tip
 * - ✅ Try It Yourself hands-on interactive playground
 * - 🏆 Mark as Completed tracking
 */

const PracticalSkillsModule = {
  activeTopicId: "paint",
  paintCanvas: null,
  paintCtx: null,
  isPainting: false,
  paintColor: "#2563eb",
  paintSize: 5,
  paintTool: "brush",

  // Simulated state for activities
  simFolders: [
    { id: "f1", name: "My_Photos_2026", date: "Today" },
    { id: "f2", name: "Official_Letters", date: "Yesterday" }
  ],
  simRecycleBin: [
    { id: "rb1", name: "Old_Draft.txt", size: "12 KB", deletedAt: "10 mins ago" }
  ],
  mouseTasksCompleted: { click: false, dblclick: false, rightclick: false, scroll: false, drag: false },

  // Metadata for the 9 topics
  topics: [
    { id: "paint", icon: "🎨", title: "How to Use Paint", mrTitle: "पेंट ॲप कसे वापरावे", summary: "Learn basic drawing, colors, brushes, and shapes in MS Paint." },
    { id: "folder", icon: "📁", title: "How to Create a Folder", mrTitle: "नवीन फोल्डर कसे बनवावे", summary: "Master folder creation on desktop to organize files." },
    { id: "textfile", icon: "📝", title: "Create & Save a Text File", mrTitle: "टेक्स्ट फाइल तयार करून सेव्ह करणे", summary: "Type notes in Notepad and save them as .txt files." },
    { id: "copypaste", icon: "📋", title: "How to Copy and Paste", mrTitle: "कॉपी आणि पेस्ट कसे करावे", summary: "Duplicate text and files using Ctrl+C and Ctrl+V." },
    { id: "rename", icon: "✏️", title: "Rename a File or Folder", mrTitle: "फाइल किंवा फोल्डरचे नाव बदलणे", summary: "Change file names using right-click or F2 shortcut." },
    { id: "delete", icon: "🗑️", title: "How to Delete a File", mrTitle: "फाइल डिलीट कशी करावी", summary: "Safely remove unwanted files and understand the Recycle Bin." },
    { id: "restore", icon: "🔄", title: "Restore a Deleted File", mrTitle: "डिलीट केलेली फाइल परत मिळवणे", summary: "Retrieve mistakenly deleted files from Recycle Bin." },
    { id: "mouse", icon: "🖱️", title: "Mouse Basics & Actions", mrTitle: "माउसचा वापर आणि युक्त्या", summary: "Master left click, double click, right click, scroll, and drag-drop." },
    { id: "keyboard", icon: "⌨️", title: "Keyboard Basics & Shortcuts", mrTitle: "कीबोर्ड कीज आणि महत्वाचे शॉर्टकट्स", summary: "Essential keys, navigation, and top productivity shortcuts." }
  ],

  init() {
    this.renderTopicSelector();
    this.setupTopicClickHandlers();
    this.loadTopic(this.activeTopicId);
  },

  onEnter() {
    this.renderTopicSelector();
    this.loadTopic(this.activeTopicId);
  },

  renderTopicSelector() {
    const listEl = document.getElementById("practicalTopicsList");
    if (!listEl) return;

    listEl.innerHTML = this.topics.map((t, idx) => {
      const isDone = StorageManager.isTopicCompleted(t.id);
      const isActive = (t.id === this.activeTopicId);
      return `
        <button class="practical-nav-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" data-topic="${t.id}">
          <span class="topic-num">${idx + 1}</span>
          <span class="topic-icon">${t.icon}</span>
          <div class="topic-text-col">
            <span class="topic-title-en">${t.title}</span>
            <span class="topic-title-mr">${t.mrTitle}</span>
          </div>
          ${isDone ? '<span class="status-check" title="Completed">✓</span>' : '<span class="status-dot"></span>'}
        </button>
      `;
    }).join('');

    // Update overall practical progress meter in section header
    this.updateSectionHeaderProgress();
  },

  updateSectionHeaderProgress() {
    const countEl = document.getElementById("practicalCompletedCount");
    const fillEl = document.getElementById("practicalCompletedBar");
    const completed = StorageManager.getProgress().practicalSkills.completedTopics.length;
    if (countEl) countEl.textContent = `${completed} / 9 Topics Completed`;
    if (fillEl) fillEl.style.width = `${Math.round((completed / 9) * 100)}%`;
  },

  setupTopicClickHandlers() {
    const listEl = document.getElementById("practicalTopicsList");
    if (!listEl) return;

    listEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".practical-nav-item");
      if (!btn) return;
      const topicId = btn.getAttribute("data-topic");
      if (topicId) {
        this.loadTopic(topicId);
        App.playSound("click");
      }
    });
  },

  loadTopic(topicId) {
    this.activeTopicId = topicId;
    StorageManager.markTopicViewed("practicalSkills", topicId);

    // Update nav active classes
    document.querySelectorAll(".practical-nav-item").forEach(btn => {
      if (btn.getAttribute("data-topic") === topicId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const arena = document.getElementById("practicalContentArena");
    if (!arena) return;

    // Render corresponding topic content
    switch (topicId) {
      case "paint":
        arena.innerHTML = this.getPaintHTML();
        this.initPaintCanvas();
        break;
      case "folder":
        arena.innerHTML = this.getFolderHTML();
        this.initFolderSim();
        break;
      case "textfile":
        arena.innerHTML = this.getTextFileHTML();
        this.initTextFileSim();
        break;
      case "copypaste":
        arena.innerHTML = this.getCopyPasteHTML();
        this.initCopyPasteSim();
        break;
      case "rename":
        arena.innerHTML = this.getRenameHTML();
        this.initRenameSim();
        break;
      case "delete":
        arena.innerHTML = this.getDeleteHTML();
        this.initDeleteSim();
        break;
      case "restore":
        arena.innerHTML = this.getRestoreHTML();
        this.initRestoreSim();
        break;
      case "mouse":
        arena.innerHTML = this.getMouseHTML();
        this.initMouseSim();
        break;
      case "keyboard":
        arena.innerHTML = this.getKeyboardHTML();
        this.initKeyboardSim();
        break;
    }

    this.bindCompletionButton(topicId);
  },

  bindCompletionButton(topicId) {
    const btn = document.getElementById(`markDoneBtn_${topicId}`);
    if (!btn) return;

    const isDone = StorageManager.isTopicCompleted(topicId);
    this.updateCompletionButtonUI(btn, isDone);

    btn.addEventListener("click", () => {
      const currentlyDone = StorageManager.isTopicCompleted(topicId);
      const newStatus = !currentlyDone;
      StorageManager.recordPracticalActivity(topicId, newStatus);
      this.updateCompletionButtonUI(btn, newStatus);
      this.renderTopicSelector();

      if (newStatus) {
        App.playSound("fanfare");
        App.showToast("Topic Completed! 🏆", `You completed: ${this.getTopicTitle(topicId)}`, "success", "✅");
      } else {
        App.playSound("click");
      }
    });
  },

  updateCompletionButtonUI(btn, isDone) {
    if (isDone) {
      btn.className = "btn btn-success btn-lg";
      btn.innerHTML = `✓ Completed! Click to Unmark`;
    } else {
      btn.className = "btn btn-primary btn-lg";
      btn.innerHTML = `🏆 Mark Topic as Completed`;
    }
  },

  getTopicTitle(id) {
    const t = this.topics.find(x => x.id === id);
    return t ? t.title : id;
  },

  // ==========================================================================
  // TOPIC 1: PAINT
  // ==========================================================================
  getPaintHTML() {
    return `
      <div class="practical-card animate-fade-in">
        <div class="practical-header">
          <div class="topic-tag">Lesson 1 of 9 • Practical PC Skill</div>
          <h2>🎨 How to Use Paint (पेंट ॲप कसे वापरावे)</h2>
          <p class="topic-lead">Learn how to open Microsoft Paint, draw with brushes, select colors, add geometric shapes, use the eraser, and safely save your digital artwork.</p>
        </div>

        <div class="step-pattern-grid">
          <div class="pattern-box pattern-what">
            <h4>📌 What is it? (पेंट म्हणजे काय?)</h4>
            <p>Microsoft Paint is a built-in computer drawing program. It is the best starting application for beginners to develop hand-eye coordination, mouse control, and creative digital skills.</p>
            <div class="bilingual-mr">पेंट हे संगणकामध्ये चित्र काढण्यासाठीचे एक सोपे साधन आहे. यामुळे माउसवर पकड मिळवणे आणि चित्रे काढणे सहज शक्य होते.</div>
          </div>

          <div class="pattern-box pattern-where">
            <h4>🧭 Where to find it? (हे कोठे शोधायचे?)</h4>
            <div class="flow-steps-mini">
              <span class="f-node">Start Menu ⊞</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Search "Paint"</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Click Paint App 🎨</span>
            </div>
          </div>
        </div>

        <div class="flowchart-container">
          <div class="flowchart-title">📊 Step-by-Step Flowchart (कृती क्रम)</div>
          <div class="flowchart-steps">
            <div class="flow-step"><span class="step-num">1</span> Open Paint</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">2</span> Select Brush / Pencil</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">3</span> Pick a Color</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">4</span> Draw on Canvas</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">5</span> Use Shapes & Eraser</div>
            <div class="flow-div">➔</div>
            <div class="flow-step highlight"><span class="step-num">6</span> File ➔ Save As</div>
          </div>
        </div>

        <div class="video-container-card">
          <div class="video-header">
            <h4>🎥 Watch YouTube Demonstration (व्हिडिओ प्रात्यक्षिक)</h4>
            <span class="badge badge-primary">English / Hindi / Marathi friendly</span>
          </div>
          <div class="video-embed-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/V611ZtV7lS4"
              title="How to use MS Paint for Beginners"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Beginner Tip (महत्त्वाची टीप):</strong>
            If your hand slips or you draw an accidental stroke, press <code>Ctrl + Z</code> immediately to undo! You can also hold the <code>Shift</code> key while drawing a line to make it perfectly straight.
          </div>
        </div>

        <div class="practice-arena-card">
          <div class="practice-header">
            <h4>✅ Try It Yourself: Interactive Paint Playground</h4>
            <p>Use the tools below to draw a house, tree, or your name on the digital canvas:</p>
          </div>

          <div class="paint-toolbar-custom">
            <div class="flex items-center gap-2">
              <button class="btn btn-sm btn-primary active" id="ptBrushBtn">🖌️ Brush</button>
              <button class="btn btn-sm btn-outline" id="ptEraserBtn">🧹 Eraser</button>
              <button class="btn btn-sm btn-outline" id="ptClearBtn">🗑️ Clear</button>
            </div>
            <div class="flex items-center gap-2">
              <span style="font-size:0.85rem;">Size:</span>
              <input type="range" id="ptSizeSlider" min="2" max="30" value="6">
            </div>
            <div class="color-palette-wrap">
              <div class="color-dot active" data-color="#2563eb" style="background:#2563eb;"></div>
              <div class="color-dot" data-color="#dc2626" style="background:#dc2626;"></div>
              <div class="color-dot" data-color="#16a34a" style="background:#16a34a;"></div>
              <div class="color-dot" data-color="#f59e0b" style="background:#f59e0b;"></div>
              <div class="color-dot" data-color="#9333ea" style="background:#9333ea;"></div>
              <div class="color-dot" data-color="#0f172a" style="background:#0f172a;"></div>
            </div>
            <button class="btn btn-sm btn-success" id="ptDownloadBtn">💾 Download Art</button>
          </div>

          <div class="canvas-box">
            <canvas id="practicalPaintCanvas" width="800" height="320"></canvas>
          </div>
        </div>

        <div class="completion-footer">
          <button id="markDoneBtn_paint" class="btn btn-primary btn-lg">🏆 Mark Topic as Completed</button>
        </div>
      </div>
    `;
  },

  initPaintCanvas() {
    const canvas = document.getElementById("practicalPaintCanvas");
    if (!canvas) return;
    this.paintCanvas = canvas;
    this.paintCtx = canvas.getContext("2d");
    this.paintCtx.fillStyle = "#ffffff";
    this.paintCtx.fillRect(0, 0, canvas.width, canvas.height);

    const start = (e) => {
      this.isPainting = true;
      this.drawPaint(e);
    };
    const stop = () => {
      this.isPainting = false;
      if (this.paintCtx) this.paintCtx.beginPath();
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", (e) => this.drawPaint(e));
    window.addEventListener("mouseup", stop);

    // Touch
    canvas.addEventListener("touchstart", (e) => { e.preventDefault(); start(e.touches[0]); }, { passive: false });
    canvas.addEventListener("touchmove", (e) => { e.preventDefault(); this.drawPaint(e.touches[0]); }, { passive: false });
    canvas.addEventListener("touchend", stop);

    // Controls
    const brushBtn = document.getElementById("ptBrushBtn");
    const eraserBtn = document.getElementById("ptEraserBtn");
    const clearBtn = document.getElementById("ptClearBtn");
    const sizeSlider = document.getElementById("ptSizeSlider");
    const downloadBtn = document.getElementById("ptDownloadBtn");

    if (brushBtn) {
      brushBtn.addEventListener("click", () => {
        this.paintTool = "brush";
        brushBtn.classList.add("active");
        if (eraserBtn) eraserBtn.classList.remove("active");
        App.playSound("click");
      });
    }
    if (eraserBtn) {
      eraserBtn.addEventListener("click", () => {
        this.paintTool = "eraser";
        eraserBtn.classList.add("active");
        if (brushBtn) brushBtn.classList.remove("active");
        App.playSound("click");
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.paintCtx.fillStyle = "#ffffff";
        this.paintCtx.fillRect(0, 0, this.paintCanvas.width, this.paintCanvas.height);
        App.playSound("click");
      });
    }
    if (sizeSlider) {
      sizeSlider.addEventListener("input", (e) => {
        this.paintSize = parseInt(e.target.value, 10);
      });
    }
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = `Digital_Sakshar_Art_${Date.now()}.png`;
        link.href = this.paintCanvas.toDataURL("image/png");
        link.click();
        App.playSound("correct");
        App.showToast("Artwork Saved! 🎨", "Your drawing has been downloaded successfully.", "success", "💾");
      });
    }

    document.querySelectorAll(".color-dot").forEach(dot => {
      dot.addEventListener("click", () => {
        document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
        dot.classList.add("active");
        this.paintColor = dot.getAttribute("data-color");
        this.paintTool = "brush";
        if (brushBtn) brushBtn.classList.add("active");
        if (eraserBtn) eraserBtn.classList.remove("active");
        App.playSound("click");
      });
    });
  },

  drawPaint(e) {
    if (!this.isPainting || !this.paintCtx) return;
    const rect = this.paintCanvas.getBoundingClientRect();
    const scaleX = this.paintCanvas.width / rect.width;
    const scaleY = this.paintCanvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    this.paintCtx.lineWidth = this.paintSize;
    this.paintCtx.lineCap = "round";
    this.paintCtx.lineJoin = "round";
    this.paintCtx.strokeStyle = (this.paintTool === "eraser") ? "#ffffff" : this.paintColor;

    this.paintCtx.lineTo(x, y);
    this.paintCtx.stroke();
    this.paintCtx.beginPath();
    this.paintCtx.moveTo(x, y);
  },

  // ==========================================================================
  // TOPIC 2: CREATE A FOLDER
  // ==========================================================================
  getFolderHTML() {
    return `
      <div class="practical-card animate-fade-in">
        <div class="practical-header">
          <div class="topic-tag">Lesson 2 of 9 • Practical PC Skill</div>
          <h2>📁 How to Create a Folder (नवीन फोल्डर कसे बनवावे)</h2>
          <p class="topic-lead">Learn how to create a folder, understand why folders are digital filing cabinets, name them logically, and keep your files organized.</p>
        </div>

        <div class="step-pattern-grid">
          <div class="pattern-box pattern-what">
            <h4>📌 What is a Folder? (फोल्डर म्हणजे काय?)</h4>
            <p>A folder (धारिका) is a digital storage container used to group related files together—such as family photos, school notes, or bank statements. Without folders, your computer desktop would look like a cluttered table!</p>
            <div class="bilingual-mr">फोल्डर म्हणजे संगणकातील एक डिजिटल कपाट किंवा फाईल बॉक्स आहे, ज्यामध्ये आपण संबंधित फाइल्स शिस्तबद्ध ठेवू शकतो.</div>
          </div>

          <div class="pattern-box pattern-where">
            <h4>🧭 Direction (कोठे करायचे?)</h4>
            <div class="flow-steps-mini">
              <span class="f-node">Go to Desktop</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Right-Click empty area</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Choose New ➔ Folder</span>
            </div>
          </div>
        </div>

        <div class="flowchart-container">
          <div class="flowchart-title">📊 Step-by-Step Flowchart (कृती क्रम)</div>
          <div class="flowchart-steps">
            <div class="flow-step"><span class="step-num">1</span> Desktop (रिकामी जागा)</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">2</span> Right Click</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">3</span> Select "New"</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">4</span> Click "Folder"</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">5</span> Type Name</div>
            <div class="flow-div">➔</div>
            <div class="flow-step highlight"><span class="step-num">6</span> Press Enter ↵</div>
          </div>
        </div>

        <div class="video-container-card">
          <div class="video-header">
            <h4>🎥 Watch YouTube Demonstration (व्हिडिओ प्रात्यक्षिक)</h4>
            <span class="badge badge-primary">Clear Visual Steps</span>
          </div>
          <div class="video-embed-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/BvHqH0h5K8o"
              title="How to Create and Rename a Folder in Windows"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Beginner Tip (महत्त्वाची टीप):</strong>
            You can create a new folder super fast on Windows by simply pressing: <code>Ctrl + Shift + N</code> together on your keyboard!
          </div>
        </div>

        <div class="practice-arena-card">
          <div class="practice-header">
            <h4>✅ Try It Yourself: Virtual Folder Creator Simulator</h4>
            <p>Practice right now! Type a folder name below and click <strong>Create Folder</strong> or press Enter:</p>
          </div>

          <div class="sim-action-row">
            <input type="text" id="simFolderNameInput" placeholder="Enter folder name (e.g. My_Project_Files)" class="input-styled" style="max-width: 340px;">
            <button class="btn btn-primary" id="simCreateFolderBtn">📁 Create Folder</button>
          </div>

          <div class="virtual-desktop-box" id="virtualFoldersDisplay">
            <!-- Dynamically populated -->
          </div>
        </div>

        <div class="completion-footer">
          <button id="markDoneBtn_folder" class="btn btn-primary btn-lg">🏆 Mark Topic as Completed</button>
        </div>
      </div>
    `;
  },

  initFolderSim() {
    const input = document.getElementById("simFolderNameInput");
    const btn = document.getElementById("simCreateFolderBtn");
    const container = document.getElementById("virtualFoldersDisplay");

    const render = () => {
      if (!container) return;
      container.innerHTML = this.simFolders.map(f => `
        <div class="sim-folder-item" title="Double click to open">
          <span class="sim-folder-icon">📁</span>
          <span class="sim-folder-name">${f.name}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${f.date}</span>
        </div>
      `).join('');
    };

    render();

    const doCreate = () => {
      const name = input.value.trim() || `New_Folder_${this.simFolders.length + 1}`;
      this.simFolders.push({ id: `f_${Date.now()}`, name, date: "Just now" });
      input.value = "";
      render();
      App.playSound("correct");
      App.showToast("Folder Created!", `Folder "${name}" is now on your virtual desktop.`, "success", "📁");
    };

    if (btn) btn.addEventListener("click", doCreate);
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") doCreate();
      });
    }
  },

  // ==========================================================================
  // TOPIC 3: CREATE & SAVE TEXT FILE (NOTEPAD)
  // ==========================================================================
  getTextFileHTML() {
    return `
      <div class="practical-card animate-fade-in">
        <div class="practical-header">
          <div class="topic-tag">Lesson 3 of 9 • Practical PC Skill</div>
          <h2>📝 How to Create and Save a Text File (टेक्स्ट फाईल तयार करून सेव्ह करणे)</h2>
          <p class="topic-lead">Learn how to launch Notepad, write notes or letters, and safely save your document with a <code>.txt</code> extension.</p>
        </div>

        <div class="step-pattern-grid">
          <div class="pattern-box pattern-what">
            <h4>📌 What is a Text File? (टेक्स्ट फाइल म्हणजे काय?)</h4>
            <p>A text file (.txt) is the simplest, most lightweight document format in computing. It stores raw letters and numbers without complex formatting, making it ideal for phone numbers, addresses, and quick notes.</p>
            <div class="bilingual-mr">नोटपॅड हे एक अतिशय हलके आणि सोपे ॲप आहे, ज्यामध्ये आपण पटकन काहीही नोंदी लिहून .txt फॉरमॅटमध्ये सेव्ह करू शकतो.</div>
          </div>

          <div class="pattern-box pattern-where">
            <h4>🧭 Direction (कोठे शोधायचे?)</h4>
            <div class="flow-steps-mini">
              <span class="f-node">Start Menu ⊞</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Search "Notepad"</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Open Notepad 📝</span>
            </div>
          </div>
        </div>

        <div class="flowchart-container">
          <div class="flowchart-title">📊 Step-by-Step Flowchart (कृती क्रम)</div>
          <div class="flowchart-steps">
            <div class="flow-step"><span class="step-num">1</span> Open Notepad</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">2</span> Type your Text</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">3</span> Click "File" Menu</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">4</span> Click "Save As"</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">5</span> Enter Filename</div>
            <div class="flow-div">➔</div>
            <div class="flow-step highlight"><span class="step-num">6</span> Click "Save" 💾</div>
          </div>
        </div>

        <div class="video-container-card">
          <div class="video-header">
            <h4>🎥 Watch YouTube Demonstration (व्हिडिओ प्रात्यक्षिक)</h4>
            <span class="badge badge-primary">Beginner Friendly</span>
          </div>
          <div class="video-embed-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/t83oO4Yp06A"
              title="How to Use Notepad in Windows 10/11"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Beginner Tip (महत्त्वाची टीप):</strong>
            Notice the asterisk (<code>*</code>) next to the filename when you make edits? That means you have unsaved changes! Always press <code>Ctrl + S</code> to save your newest updates.
          </div>
        </div>

        <div class="practice-arena-card">
          <div class="practice-header">
            <h4>✅ Try It Yourself: Virtual Notepad Editor</h4>
            <p>Type any message or note below, then click <strong>Save & Download File</strong>:</p>
          </div>

          <div class="notepad-mockup">
            <div class="notepad-titlebar">
              <span>📝 Untitled - Digital Sakshar Notepad</span>
              <span>✖</span>
            </div>
            <div class="notepad-menubar">
              <span>File</span> <span>Edit</span> <span>Format</span> <span>View</span> <span>Help</span>
            </div>
            <textarea id="simNotepadTextArea" class="notepad-editor" placeholder="Type your first computer note here... (उदा. मी आज संगणक शिकत आहे!)">मी डिजिटल साक्षर बनत आहे! 
Digital Sakshar - Practice Note 1.</textarea>
            <div class="notepad-footer">
              <input type="text" id="simNotepadFileName" value="My_First_File.txt" style="padding:0.35rem 0.6rem; border-radius:4px; border:1px solid #ccc; font-size:0.85rem;">
              <button class="btn btn-sm btn-success" id="simNotepadSaveBtn">💾 File ➔ Save As (.txt)</button>
            </div>
          </div>
        </div>

        <div class="completion-footer">
          <button id="markDoneBtn_textfile" class="btn btn-primary btn-lg">🏆 Mark Topic as Completed</button>
        </div>
      </div>
    `;
  },

  initTextFileSim() {
    const textEl = document.getElementById("simNotepadTextArea");
    const nameEl = document.getElementById("simNotepadFileName");
    const saveBtn = document.getElementById("simNotepadSaveBtn");

    if (saveBtn && textEl && nameEl) {
      saveBtn.addEventListener("click", () => {
        const text = textEl.value;
        let filename = nameEl.value.trim() || "My_First_File.txt";
        if (!filename.endsWith(".txt")) filename += ".txt";

        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        App.playSound("correct");
        App.showToast("File Saved!", `"${filename}" has been downloaded to your computer.`, "success", "📝");
      });
    }
  },

  // ==========================================================================
  // TOPIC 4: COPY AND PASTE
  // ==========================================================================
  getCopyPasteHTML() {
    return `
      <div class="practical-card animate-fade-in">
        <div class="practical-header">
          <div class="topic-tag">Lesson 4 of 9 • Practical PC Skill</div>
          <h2>📋 How to Copy and Paste (कॉपी आणि पेस्ट कसे करावे)</h2>
          <p class="topic-lead">Learn how to duplicate text and files effortlessly using the universal shortcuts <code>Ctrl + C</code> and <code>Ctrl + V</code>.</p>
        </div>

        <div class="step-pattern-grid">
          <div class="pattern-box pattern-what">
            <h4>📌 What is Copy & Paste? (कॉपी-पेस्ट म्हणजे काय?)</h4>
            <p><strong>Copy</strong> creates a duplicate copy of selected text or a file and keeps it in computer temporary memory called the Clipboard. <strong>Paste</strong> places that copied duplicate anywhere you want.</p>
            <div class="bilingual-mr">कॉपी केल्याने मूळ माहिती तशीच राहून त्याची हुबेहूब नक्कल तयार होते आणि पेस्ट केल्याने ती नवीन जागी बसवली जाते.</div>
          </div>

          <div class="pattern-box pattern-where">
            <h4>🧭 Direction (कृती कशी करायची?)</h4>
            <div class="flow-steps-mini">
              <span class="f-node">Select Text / File</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Press Ctrl + C</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Click Destination</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Press Ctrl + V</span>
            </div>
          </div>
        </div>

        <div class="shortcuts-table-wrap">
          <h4>⌨️ Top 4 Essential Clipboard Shortcuts:</h4>
          <table class="shortcuts-table">
            <thead>
              <tr><th>Action (कृती)</th><th>Shortcut Key</th><th>Marathi Meaning</th><th>What it does</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Copy</strong></td><td><code>Ctrl + C</code></td><td>प्रत तयार करणे</td><td>Copies selection to clipboard without removing original.</td></tr>
              <tr><td><strong>Paste</strong></td><td><code>Ctrl + V</code></td><td>चिकटवणे / ठेवणे</td><td>Inserts the copied content into active window.</td></tr>
              <tr><td><strong>Cut</strong></td><td><code>Ctrl + X</code></td><td>कापणे / हलवणे</td><td>Removes selection from current place to move elsewhere.</td></tr>
              <tr><td><strong>Undo</strong></td><td><code>Ctrl + Z</code></td><td>पूर्ववत करणे</td><td>Reverses the last mistake or accidental deletion.</td></tr>
            </tbody>
          </table>
        </div>

        <div class="video-container-card">
          <div class="video-header">
            <h4>🎥 Watch YouTube Demonstration (व्हिडिओ प्रात्यक्षिक)</h4>
            <span class="badge badge-primary">Clipboard Mastery</span>
          </div>
          <div class="video-embed-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/rPzSg_R0mNk"
              title="How to Copy and Paste on Windows"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Beginner Tip (महत्त्वाची टीप):</strong>
            Think of <strong>Ctrl + X (Cut)</strong> as a pair of scissors (X looks like scissors) and <strong>Ctrl + V (Paste)</strong> as an arrow pointing down into paper!
          </div>
        </div>

        <div class="practice-arena-card">
          <div class="practice-header">
            <h4>✅ Try It Yourself: Interactive Clipboard Simulator</h4>
            <p>Click "Copy Source Text" or press Ctrl+C, then click into the Destination box and click "Paste" or press Ctrl+V:</p>
          </div>

          <div class="copypaste-grid">
            <div class="cp-card">
              <label><strong>1. Source Box (स्रोत):</strong></label>
              <input type="text" id="cpSourceInput" value="Digital_Sakshar_Empowers_India_2026" readonly class="input-styled">
              <button class="btn btn-sm btn-primary" id="cpCopyBtn" style="margin-top:0.5rem;">📋 Click to Copy (Ctrl + C)</button>
            </div>

            <div class="cp-arrow">➔</div>

            <div class="cp-card">
              <label><strong>2. Destination Box (नवीन जागा):</strong></label>
              <input type="text" id="cpDestInput" placeholder="Paste will appear here..." class="input-styled">
              <button class="btn btn-sm btn-success" id="cpPasteBtn" style="margin-top:0.5rem;">📥 Click to Paste (Ctrl + V)</button>
            </div>
          </div>
          <div id="cpStatusMsg" style="margin-top:0.75rem; font-weight:600; font-size:0.9rem; text-align:center;"></div>
        </div>

        <div class="completion-footer">
          <button id="markDoneBtn_copypaste" class="btn btn-primary btn-lg">🏆 Mark Topic as Completed</button>
        </div>
      </div>
    `;
  },

  initCopyPasteSim() {
    const src = document.getElementById("cpSourceInput");
    const dest = document.getElementById("cpDestInput");
    const copyBtn = document.getElementById("cpCopyBtn");
    const pasteBtn = document.getElementById("cpPasteBtn");
    const msg = document.getElementById("cpStatusMsg");

    let virtualClipboard = "";

    if (copyBtn && src) {
      copyBtn.addEventListener("click", () => {
        virtualClipboard = src.value;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(virtualClipboard).catch(() => {});
        }
        App.playSound("click");
        if (msg) {
          msg.style.color = "var(--primary)";
          msg.textContent = `✓ Copied "${virtualClipboard}" to clipboard! Now click Paste.`;
        }
      });
    }

    if (pasteBtn && dest) {
      pasteBtn.addEventListener("click", () => {
        if (!virtualClipboard) virtualClipboard = src ? src.value : "Digital_Sakshar_Empowers_India_2026";
        dest.value = virtualClipboard;
        App.playSound("correct");
        if (msg) {
          msg.style.color = "var(--success)";
          msg.textContent = `🎉 Great job! Successfully pasted content using clipboard simulator!`;
        }
      });
    }
  },

  // ==========================================================================
  // TOPIC 5: RENAME A FILE OR FOLDER
  // ==========================================================================
  getRenameHTML() {
    return `
      <div class="practical-card animate-fade-in">
        <div class="practical-header">
          <div class="topic-tag">Lesson 5 of 9 • Practical PC Skill</div>
          <h2>✏️ How to Rename a File or Folder (नाव कसे बदलावे)</h2>
          <p class="topic-lead">Learn how to change file and folder names using the right-click menu or the super-fast <code>F2</code> keyboard key.</p>
        </div>

        <div class="step-pattern-grid">
          <div class="pattern-box pattern-what">
            <h4>📌 Why Rename? (नाव का बदलावे?)</h4>
            <p>When you download photos from a camera or internet, they have confusing names like <code>IMG_84920.jpg</code>. Renaming them to <code>Diwali_2026_Family.jpg</code> helps you find and identify them instantly.</p>
            <div class="bilingual-mr">फाइल किंवा फोल्डरला अर्थपूर्ण नाव दिल्यास भविष्यात ती शोधणे अतिशय सोपे आणि वेळेची बचत करणारे ठरते.</div>
          </div>

          <div class="pattern-box pattern-where">
            <h4>🧭 Two Methods (दोन सोप्या पद्धती)</h4>
            <div style="font-size:0.88rem; line-height:1.6;">
              <strong>Method 1 (Mouse):</strong> Right Click on File ➔ Click "Rename" ✏️<br>
              <strong>Method 2 (Keyboard):</strong> Select File ➔ Press <code>F2</code> key ⌨️
            </div>
          </div>
        </div>

        <div class="flowchart-container">
          <div class="flowchart-title">📊 Step-by-Step Flowchart (कृती क्रम)</div>
          <div class="flowchart-steps">
            <div class="flow-step"><span class="step-num">1</span> Click to select File</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">2</span> Press F2 (or Right-Click ➔ Rename)</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">3</span> Type New Name</div>
            <div class="flow-div">➔</div>
            <div class="flow-step highlight"><span class="step-num">4</span> Press Enter ↵</div>
          </div>
        </div>

        <div class="video-container-card">
          <div class="video-header">
            <h4>🎥 Watch YouTube Demonstration (व्हिडिओ प्रात्यक्षिक)</h4>
            <span class="badge badge-primary">Clear Steps</span>
          </div>
          <div class="video-embed-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/oG9p5r-VkW0"
              title="How to Rename Files in Windows"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Beginner Tip (महत्त्वाची टीप):</strong>
            Never delete the file extension (the <code>.docx</code>, <code>.pdf</code>, or <code>.png</code> part at the end), or Windows might not know which app opens it!
          </div>
        </div>

        <div class="practice-arena-card">
          <div class="practice-header">
            <h4>✅ Try It Yourself: Interactive Rename Activity</h4>
            <p>Click on the file below to select it, then click <strong>Rename (or press F2)</strong>:</p>
          </div>

          <div class="rename-demo-box">
            <div class="file-rename-card" id="renameFileCard">
              <span style="font-size:2.5rem;">📄</span>
              <div id="renameFileDisplay">
                <span id="currentFileNameLabel" style="font-weight:700; font-size:1.05rem;">Old_Document_Draft.txt</span>
              </div>
            </div>

            <div style="display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; margin-top:1rem;">
              <button class="btn btn-outline" id="triggerRenameBtn">✏️ Click to Rename (F2)</button>
              <button class="btn btn-secondary" id="resetRenameBtn">🔄 Reset Original Name</button>
            </div>
          </div>
        </div>

        <div class="completion-footer">
          <button id="markDoneBtn_rename" class="btn btn-primary btn-lg">🏆 Mark Topic as Completed</button>
        </div>
      </div>
    `;
  },

  initRenameSim() {
    const card = document.getElementById("renameFileCard");
    const label = document.getElementById("currentFileNameLabel");
    const trigger = document.getElementById("triggerRenameBtn");
    const reset = document.getElementById("resetRenameBtn");
    let isEditing = false;

    const startEditing = () => {
      if (isEditing) return;
      isEditing = true;
      const current = label.textContent;
      label.parentElement.innerHTML = `
        <input type="text" id="renameInputInline" value="${current}" style="font-weight:700; font-size:1rem; padding:0.25rem 0.5rem; text-align:center; border:2px solid var(--primary); border-radius:4px;">
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Press Enter or click outside to finish</div>
      `;
      const inp = document.getElementById("renameInputInline");
      inp.focus();
      inp.select();

      const finishEditing = () => {
        const val = inp.value.trim() || current;
        inp.parentElement.innerHTML = `<span id="currentFileNameLabel" style="font-weight:700; font-size:1.05rem;">${val}</span>`;
        isEditing = false;
        App.playSound("correct");
        App.showToast("File Renamed! ✏️", `New name: ${val}`, "success", "📄");
      };

      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") finishEditing();
      });
      inp.addEventListener("blur", finishEditing);
    };

    if (trigger) trigger.addEventListener("click", startEditing);
    if (reset) {
      reset.addEventListener("click", () => {
        const display = document.getElementById("renameFileDisplay");
        if (display) display.innerHTML = `<span id="currentFileNameLabel" style="font-weight:700; font-size:1.05rem;">Old_Document_Draft.txt</span>`;
        isEditing = false;
        App.playSound("click");
      });
    }

    // Keyboard F2 support when card is focused or in section
    window.addEventListener("keydown", (e) => {
      if (this.activeTopicId === "rename" && e.key === "F2") {
        e.preventDefault();
        startEditing();
      }
    });
  },

  // ==========================================================================
  // TOPIC 6: DELETE A FILE
  // ==========================================================================
  getDeleteHTML() {
    return `
      <div class="practical-card animate-fade-in">
        <div class="practical-header">
          <div class="topic-tag">Lesson 6 of 9 • Practical PC Skill</div>
          <h2>🗑️ How to Delete a File (फाइल डिलीट कशी करावी)</h2>
          <p class="topic-lead">Learn how to delete unwanted files safely, understand what the Recycle Bin is, and learn the difference between standard delete and permanent delete.</p>
        </div>

        <div class="step-pattern-grid">
          <div class="pattern-box pattern-what">
            <h4>📌 What happens when you Delete? (डिलीट केल्यावर काय होते?)</h4>
            <p>When you delete a file on your computer, Windows moves it to a temporary safety bin called the <strong>Recycle Bin (कचऱ्याचा डबा)</strong>. The file is not immediately destroyed—you can easily bring it back if deleted by mistake!</p>
            <div class="bilingual-mr">फाइल डिलीट केल्यावर ती तात्पुरती 'रिसायकल बिन' मध्ये जाते, जिथून ती हवी तेव्हा परत मिळवता येते.</div>
          </div>

          <div class="pattern-box pattern-where">
            <h4>🧭 Direction (दोन सोप्या पद्धती)</h4>
            <div style="font-size:0.88rem; line-height:1.6;">
              <strong>Method 1:</strong> Select File ➔ Press <code>Delete</code> key on keyboard ⌨️<br>
              <strong>Method 2:</strong> Right Click on File ➔ Select <code>Delete</code> (or Trash Can icon 🗑️)
            </div>
          </div>
        </div>

        <div class="flowchart-container">
          <div class="flowchart-title">📊 Step-by-Step Flowchart (कृती क्रम)</div>
          <div class="flowchart-steps">
            <div class="flow-step"><span class="step-num">1</span> Click File to Select</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">2</span> Press Delete Key</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">3</span> File moves to Recycle Bin 🗑️</div>
            <div class="flow-div">➔</div>
            <div class="flow-step highlight"><span class="step-num">4</span> Desktop space freed up!</div>
          </div>
        </div>

        <div class="video-container-card">
          <div class="video-header">
            <h4>🎥 Watch YouTube Demonstration (व्हिडिओ प्रात्यक्षिक)</h4>
            <span class="badge badge-primary">Safe Deletion Guide</span>
          </div>
          <div class="video-embed-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/H0d80Zg5rO4"
              title="How to Delete and Recover Files in Windows"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Beginner Tip (महत्त्वाची टीप):</strong>
            Pressing <code>Shift + Delete</code> deletes a file <strong>permanently</strong> without going to the Recycle Bin! Only use Shift+Delete when you are 100% sure you will never need the file again.
          </div>
        </div>

        <div class="practice-arena-card">
          <div class="practice-header">
            <h4>✅ Try It Yourself: Interactive File Deletion Simulator</h4>
            <p>Click the <strong>Delete File</strong> button below to test how it moves into the Recycle Bin:</p>
          </div>

          <div class="deletion-sim-grid">
            <div class="del-box">
              <h5>🖥️ Desktop Files:</h5>
              <div id="simDesktopFilesForDelete">
                <!-- Dynamically populated -->
              </div>
            </div>

            <div class="del-bin-box">
              <h5>🗑️ Recycle Bin Status:</h5>
              <div id="simBinCounter" style="font-size:2rem; font-weight:800; color:var(--primary); margin:0.5rem 0;">1 Item</div>
              <p style="font-size:0.8rem; color:var(--text-muted);">Deleted files wait here safely until restored or emptied.</p>
            </div>
          </div>
        </div>

        <div class="completion-footer">
          <button id="markDoneBtn_delete" class="btn btn-primary btn-lg">🏆 Mark Topic as Completed</button>
        </div>
      </div>
    `;
  },

  initDeleteSim() {
    let sampleFiles = [
      { id: "df1", name: "Blurry_Photo.jpg", icon: "🖼️" },
      { id: "df2", name: "Unwanted_Receipt.pdf", icon: "📄" }
    ];

    const render = () => {
      const container = document.getElementById("simDesktopFilesForDelete");
      const counter = document.getElementById("simBinCounter");
      if (!container) return;

      if (sampleFiles.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem; padding:1rem;">All sample files have been deleted! Click reset to practice again.</p>
        <button class="btn btn-sm btn-outline" id="resetDelFilesBtn">🔄 Reset Sample Files</button>`;
        const btn = document.getElementById("resetDelFilesBtn");
        if (btn) btn.addEventListener("click", () => {
          sampleFiles = [
            { id: "df1", name: "Blurry_Photo.jpg", icon: "🖼️" },
            { id: "df2", name: "Unwanted_Receipt.pdf", icon: "📄" }
          ];
          render();
        });
      } else {
        container.innerHTML = sampleFiles.map(f => `
          <div class="del-file-row">
            <span>${f.icon} ${f.name}</span>
            <button class="btn btn-sm btn-danger del-btn-action" data-id="${f.id}">🗑️ Delete</button>
          </div>
        `).join('');

        document.querySelectorAll(".del-btn-action").forEach(btn => {
          btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            const deleted = sampleFiles.find(x => x.id === id);
            sampleFiles = sampleFiles.filter(x => x.id !== id);
            this.simRecycleBin.push({ id: `rb_${Date.now()}`, name: deleted.name, size: "15 KB", deletedAt: "Just now" });
            render();
            App.playSound("wrong");
            App.showToast("File Deleted!", `Moved "${deleted.name}" to Recycle Bin.`, "warning", "🗑️");
          });
        });
      }

      if (counter) counter.textContent = `${this.simRecycleBin.length} Items`;
    };

    render();
  },

  // ==========================================================================
  // TOPIC 7: RESTORE A DELETED FILE
  // ==========================================================================
  getRestoreHTML() {
    return `
      <div class="practical-card animate-fade-in">
        <div class="practical-header">
          <div class="topic-tag">Lesson 7 of 9 • Practical PC Skill</div>
          <h2>🔄 How to Restore a Deleted File (डिलीट फाईल परत मिळवणे)</h2>
          <p class="topic-lead">Accidentally deleted a file? Do not panic! Learn how to open the Recycle Bin and restore your file right back to its original location.</p>
        </div>

        <div class="step-pattern-grid">
          <div class="pattern-box pattern-what">
            <h4>📌 What is File Restoration? (फाइल पूर्ववत करणे म्हणजे काय?)</h4>
            <p>Restoring a file extracts it from the Recycle Bin and moves it back to the exact folder where it originally lived before deletion—as if it was never deleted at all.</p>
            <div class="bilingual-mr">रिसायकल बिनमधून फाईल रिस्टोअर केल्यास ती जशीच्या तशी तिच्या मूळ जागी परत जाते.</div>
          </div>

          <div class="pattern-box pattern-where">
            <h4>🧭 Direction (कोठे करायचे?)</h4>
            <div class="flow-steps-mini">
              <span class="f-node">Desktop: Recycle Bin 🗑️</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Find your File</span>
              <span class="f-arrow">➔</span>
              <span class="f-node">Right-Click ➔ Restore</span>
            </div>
          </div>
        </div>

        <div class="flowchart-container">
          <div class="flowchart-title">📊 Step-by-Step Flowchart (कृती क्रम)</div>
          <div class="flowchart-steps">
            <div class="flow-step"><span class="step-num">1</span> Double Click Recycle Bin 🗑️</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">2</span> Locate the deleted file</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">3</span> Right Click on it</div>
            <div class="flow-div">➔</div>
            <div class="flow-step highlight"><span class="step-num">4</span> Click "Restore" 🔄</div>
          </div>
        </div>

        <div class="video-container-card">
          <div class="video-header">
            <h4>🎥 Watch YouTube Demonstration (व्हिडिओ प्रात्यक्षिक)</h4>
            <span class="badge badge-primary">Quick Recovery Guide</span>
          </div>
          <div class="video-embed-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/c63U4G6p60s"
              title="How to Restore Deleted Files from Recycle Bin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Beginner Tip (महत्त्वाची टीप):</strong>
            If your Recycle Bin is full of hundreds of files, use the search bar inside the Recycle Bin window in the top-right corner to type the file name and find it immediately!
          </div>
        </div>

        <div class="practice-arena-card">
          <div class="practice-header">
            <h4>✅ Try It Yourself: Recycle Bin Restoration Simulator</h4>
            <p>Below are files currently sitting inside your virtual Recycle Bin. Click <strong>Restore</strong> on any file to bring it back:</p>
          </div>

          <div class="recycle-bin-window">
            <div class="rb-header">
              <span>🗑️ Recycle Bin (Virtual)</span>
              <span style="font-size:0.8rem; opacity:0.8;">Click 'Restore' to return file</span>
            </div>
            <div class="rb-body" id="simRestoreList">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>

        <div class="completion-footer">
          <button id="markDoneBtn_restore" class="btn btn-primary btn-lg">🏆 Mark Topic as Completed</button>
        </div>
      </div>
    `;
  },

  initRestoreSim() {
    const render = () => {
      const list = document.getElementById("simRestoreList");
      if (!list) return;

      if (this.simRecycleBin.length === 0) {
        list.innerHTML = `
          <div style="text-align:center; padding:2rem; color:var(--text-muted);">
            <div style="font-size:2.5rem; margin-bottom:0.5rem;">✨</div>
            <strong>Recycle Bin is currently empty!</strong>
            <p style="font-size:0.85rem; margin-top:0.35rem;">Go to the previous lesson ("How to Delete a File") to delete some files, or add a test file below:</p>
            <button class="btn btn-sm btn-outline" id="addTrashTestFileBtn" style="margin-top:0.5rem;">➕ Add Sample File to Bin</button>
          </div>
        `;
        const addBtn = document.getElementById("addTrashTestFileBtn");
        if (addBtn) addBtn.addEventListener("click", () => {
          this.simRecycleBin.push({ id: `rb_${Date.now()}`, name: "Important_Cert_2026.pdf", size: "45 KB", deletedAt: "Just now" });
          render();
        });
      } else {
        list.innerHTML = `
          <table class="rb-table">
            <thead>
              <tr><th>Name</th><th>Size</th><th>Deleted Time</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${this.simRecycleBin.map(item => `
                <tr>
                  <td>📄 <strong>${item.name}</strong></td>
                  <td>${item.size}</td>
                  <td>${item.deletedAt}</td>
                  <td>
                    <button class="btn btn-sm btn-success restore-action-btn" data-id="${item.id}">🔄 Restore</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;

        document.querySelectorAll(".restore-action-btn").forEach(b => {
          b.addEventListener("click", () => {
            const id = b.getAttribute("data-id");
            const restored = this.simRecycleBin.find(x => x.id === id);
            this.simRecycleBin = this.simRecycleBin.filter(x => x.id !== id);
            render();
            App.playSound("correct");
            App.showToast("File Restored! 🔄", `"${restored.name}" has been restored to its original folder!`, "success", "✨");
          });
        });
      }
    };

    render();
  },

  // ==========================================================================
  // TOPIC 8: MOUSE BASICS & ACTIONS
  // ==========================================================================
  getMouseHTML() {
    return `
      <div class="practical-card animate-fade-in">
        <div class="practical-header">
          <div class="topic-tag">Lesson 8 of 9 • Practical PC Skill</div>
          <h2>🖱️ Mouse Basics & Actions (माउसचा वापर आणि युक्त्या)</h2>
          <p class="topic-lead">Master all five essential mouse operations: Left Click, Double Click, Right Click, Scroll Wheel, and Drag & Drop.</p>
        </div>

        <div class="step-pattern-grid">
          <div class="pattern-box pattern-what">
            <h4>📌 Why is Mouse Mastery Important? (माउस का महत्त्वाचा?)</h4>
            <p>The computer mouse is your virtual pointing hand. Just like you point, pick up, and open things in the real world, the mouse controls the cursor to interact with everything on screen.</p>
            <div class="bilingual-mr">माउस हे संगणकावरील तुमचे बोट आहे. यामुळे तुम्ही कोणतीही गोष्ट निवडू शकता, उघडू शकता आणि हलवू शकता.</div>
          </div>

          <div class="pattern-box pattern-where">
            <h4>🧭 5 Core Actions (५ मूलभूत कृती)</h4>
            <ul style="font-size:0.88rem; line-height:1.7; margin:0; padding-left:1.2rem;">
              <li><strong>Left Click:</strong> Selects a button, link, or icon.</li>
              <li><strong>Double Click:</strong> Quickly open files, folders, or apps.</li>
              <li><strong>Right Click:</strong> Opens context menu with options.</li>
              <li><strong>Scroll Wheel:</strong> Roll up or down to read pages.</li>
              <li><strong>Drag & Drop:</strong> Click, hold, move, and release.</li>
            </ul>
          </div>
        </div>

        <div class="flowchart-container">
          <div class="flowchart-title">📊 Drag and Drop Flowchart (ड्रॅग आणि ड्रॉप क्रम)</div>
          <div class="flowchart-steps">
            <div class="flow-step"><span class="step-num">1</span> Point at Item</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">2</span> Click & Hold Left Button</div>
            <div class="flow-div">➔</div>
            <div class="flow-step"><span class="step-num">3</span> Move Mouse across screen</div>
            <div class="flow-div">➔</div>
            <div class="flow-step highlight"><span class="step-num">4</span> Release Button! 🎯</div>
          </div>
        </div>

        <div class="video-container-card">
          <div class="video-header">
            <h4>🎥 Watch YouTube Demonstration (व्हिडिओ प्रात्यक्षिक)</h4>
            <span class="badge badge-primary">Hand-Eye Coordination</span>
          </div>
          <div class="video-embed-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/cO32tBwS9d8"
              title="Mouse Skills Tutorial for Beginners"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Beginner Tip (महत्त्वाची टीप):</strong>
            Keep your wrist straight and rested gently on the table. Move the mouse with your forearm and fingers—don't tense up your shoulder!
          </div>
        </div>

        <div class="practice-arena-card">
          <div class="practice-header">
            <h4>✅ Try It Yourself: 5-in-1 Mouse Challenge Arena</h4>
            <p>Complete all 5 mini challenges below to verify your mouse control mastery:</p>
          </div>

          <div class="mouse-challenges-grid">
            <!-- Challenge 1: Single Click -->
            <div class="mouse-card" id="mCardClick">
              <h5>1. Left Click (डावे बटण)</h5>
              <p style="font-size:0.8rem;">Click the target button once:</p>
              <button class="btn btn-primary" id="mTargetClick">🎯 Click Me Once!</button>
              <div class="m-status" id="mStatusClick">Pending...</div>
            </div>

            <!-- Challenge 2: Double Click -->
            <div class="mouse-card" id="mCardDbl">
              <h5>2. Double Click (दोनदा जलद)</h5>
              <p style="font-size:0.8rem;">Quickly click twice in 1 second:</p>
              <button class="btn btn-secondary" id="mTargetDbl">📂 Double Click to Open</button>
              <div class="m-status" id="mStatusDbl">Pending...</div>
            </div>

            <!-- Challenge 3: Right Click -->
            <div class="mouse-card" id="mCardRight">
              <h5>3. Right Click (उजवे बटण)</h5>
              <p style="font-size:0.8rem;">Right click on the box below:</p>
              <div class="right-click-zone" id="mTargetRight">🖱️ Right-Click Here</div>
              <div class="m-status" id="mStatusRight">Pending...</div>
            </div>

            <!-- Challenge 4: Scroll -->
            <div class="mouse-card" id="mCardScroll">
              <h5>4. Scroll Wheel (चाक फिरवणे)</h5>
              <p style="font-size:0.8rem;">Scroll to the bottom of this box:</p>
              <div class="scroll-test-box" id="mTargetScroll">
                <p>Scroll down...</p>
                <p>Keep scrolling...</p>
                <p>Almost there...</p>
                <div style="background:#22c55e; color:#fff; padding:6px; border-radius:4px; font-weight:700;" id="mScrollBottomGoal">🏁 You reached the bottom!</div>
              </div>
              <div class="m-status" id="mStatusScroll">Pending...</div>
            </div>

            <!-- Challenge 5: Drag & Drop -->
            <div class="mouse-card" style="grid-column: 1 / -1;" id="mCardDrag">
              <h5>5. Drag and Drop (उचलून हलवणे)</h5>
              <p style="font-size:0.8rem;">Drag the document icon into the Folder destination box:</p>
              <div class="drag-drop-arena">
                <div class="drag-item" id="mDragItem" draggable="true">📄 Important_Doc.txt</div>
                <div class="drop-zone" id="mDropZone">📁 Drop Folder Here</div>
              </div>
              <div class="m-status" id="mStatusDrag">Pending...</div>
            </div>
          </div>
        </div>

        <div class="completion-footer">
          <button id="markDoneBtn_mouse" class="btn btn-primary btn-lg">🏆 Mark Topic as Completed</button>
        </div>
      </div>
    `;
  },

  initMouseSim() {
    // 1. Single Click
    const clkBtn = document.getElementById("mTargetClick");
    const clkStat = document.getElementById("mStatusClick");
    if (clkBtn) {
      clkBtn.addEventListener("click", () => {
        this.mouseTasksCompleted.click = true;
        clkBtn.className = "btn btn-success";
        clkBtn.textContent = "✓ Clicked Successfully!";
        if (clkStat) clkStat.innerHTML = `<span style="color:var(--success);">✓ Completed</span>`;
        App.playSound("correct");
      });
    }

    // 2. Double Click
    const dblBtn = document.getElementById("mTargetDbl");
    const dblStat = document.getElementById("mStatusDbl");
    if (dblBtn) {
      dblBtn.addEventListener("dblclick", () => {
        this.mouseTasksCompleted.dblclick = true;
        dblBtn.className = "btn btn-success";
        dblBtn.textContent = "✓ Folder Opened!";
        if (dblStat) dblStat.innerHTML = `<span style="color:var(--success);">✓ Completed</span>`;
        App.playSound("correct");
      });
    }

    // 3. Right Click
    const rtZone = document.getElementById("mTargetRight");
    const rtStat = document.getElementById("mStatusRight");
    if (rtZone) {
      rtZone.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        this.mouseTasksCompleted.rightclick = true;
        rtZone.style.background = "#dcfce7";
        rtZone.style.borderColor = "#16a34a";
        rtZone.textContent = "✓ Context Menu Activated!";
        if (rtStat) rtStat.innerHTML = `<span style="color:var(--success);">✓ Completed</span>`;
        App.playSound("correct");
      });
    }

    // 4. Scroll
    const scrollBox = document.getElementById("mTargetScroll");
    const scrollStat = document.getElementById("mStatusScroll");
    if (scrollBox) {
      scrollBox.addEventListener("scroll", () => {
        if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight - 10) {
          this.mouseTasksCompleted.scroll = true;
          if (scrollStat) scrollStat.innerHTML = `<span style="color:var(--success);">✓ Completed</span>`;
          App.playSound("correct");
        }
      });
    }

    // 5. Drag & Drop
    const dragItem = document.getElementById("mDragItem");
    const dropZone = document.getElementById("mDropZone");
    const dragStat = document.getElementById("mStatusDrag");

    if (dragItem && dropZone) {
      dragItem.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", "file");
      });

      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.style.background = "#dbeafe";
      });

      dropZone.addEventListener("dragleave", () => {
        dropZone.style.background = "";
      });

      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        this.mouseTasksCompleted.drag = true;
        dropZone.style.background = "#dcfce7";
        dropZone.style.borderColor = "#16a34a";
        dropZone.innerHTML = "🎉 File safely placed inside Folder!";
        dragItem.style.display = "none";
        if (dragStat) dragStat.innerHTML = `<span style="color:var(--success);">✓ Completed</span>`;
        App.playSound("fanfare");
      });
    }
  },

  // ==========================================================================
  // TOPIC 9: KEYBOARD BASICS & SHORTCUTS
  // ==========================================================================
  getKeyboardHTML() {
    return `
      <div class="practical-card animate-fade-in">
        <div class="practical-header">
          <div class="topic-tag">Lesson 9 of 9 • Practical PC Skill</div>
          <h2>⌨️ Keyboard Basics & Shortcuts (कीबोर्ड कीज आणि शॉर्टकट्स)</h2>
          <p class="topic-lead">Learn the purpose of special keys (Enter, Space, Backspace, Delete, Shift, Ctrl, Alt, Tab, Esc) and top productivity shortcuts.</p>
        </div>

        <div class="step-pattern-grid">
          <div class="pattern-box pattern-what">
            <h4>📌 Key Special Keys (महत्त्वाच्या विशेष कीज)</h4>
            <ul style="font-size:0.85rem; line-height:1.6; margin:0; padding-left:1.1rem;">
              <li><strong>Enter ↵:</strong> Confirms a command or starts a new line.</li>
              <li><strong>Spacebar:</strong> Inserts a space between words.</li>
              <li><strong>Backspace:</strong> Erases the letter to the <em>left</em> of cursor.</li>
              <li><strong>Delete:</strong> Erases the letter to the <em>right</em> or deletes selected file.</li>
              <li><strong>Shift ⇧:</strong> Type capital letters or symbols on top of keys.</li>
              <li><strong>Tab ⇥:</strong> Jumps to next text field or indents paragraphs.</li>
              <li><strong>Esc (Escape):</strong> Closes popups or exits full-screen mode.</li>
            </ul>
          </div>

          <div class="pattern-box pattern-where">
            <h4>🧭 Top 8 Shortcuts Cheat Sheet</h4>
            <div class="keyboard-mini-shortcuts">
              <span class="sc-pill"><code>Ctrl + C</code> Copy</span>
              <span class="sc-pill"><code>Ctrl + V</code> Paste</span>
              <span class="sc-pill"><code>Ctrl + X</code> Cut</span>
              <span class="sc-pill"><code>Ctrl + Z</code> Undo</span>
              <span class="sc-pill"><code>Ctrl + A</code> Select All</span>
              <span class="sc-pill"><code>Ctrl + S</code> Save</span>
              <span class="sc-pill"><code>Ctrl + P</code> Print</span>
              <span class="sc-pill"><code>Alt + Tab</code> Switch Window</span>
            </div>
          </div>
        </div>

        <div class="video-container-card">
          <div class="video-header">
            <h4>🎥 Watch YouTube Demonstration (व्हिडिओ प्रात्यक्षिक)</h4>
            <span class="badge badge-primary">Keyboard Ergonomics</span>
          </div>
          <div class="video-embed-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/5a2xWnU_jX4"
              title="Computer Keyboard Keys & Shortcuts for Beginners"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <div class="tip-content">
            <strong>Beginner Tip (महत्त्वाची टीप):</strong>
            Notice the tiny raised bumps on the <code>F</code> and <code>J</code> keys? In touch typing, your left index finger rests on <code>F</code> and right index finger rests on <code>J</code> so you never have to look down at the keyboard!
          </div>
        </div>

        <div class="practice-arena-card">
          <div class="practice-header">
            <h4>✅ Try It Yourself: Interactive Key Explorer</h4>
            <p>Click any key below or press keys on your physical keyboard to inspect its role and Marathi meaning:</p>
          </div>

          <div class="virtual-key-details-panel" id="kbKeyDetailsDisplay">
            <h4 style="margin:0; color:var(--primary);" id="kbInspectedKeyTitle">Click any key to inspect its purpose</h4>
            <p style="margin:0.25rem 0 0 0; font-size:0.9rem;" id="kbInspectedKeyDesc">Try pressing Enter, Space, Shift, Ctrl, or typing letters on your physical keyboard!</p>
          </div>

          <div class="virtual-keyboard-grid">
            <div class="kb-row">
              <button class="v-key" data-key="Escape">Esc</button>
              <button class="v-key" data-key="1">1</button>
              <button class="v-key" data-key="2">2</button>
              <button class="v-key" data-key="3">3</button>
              <button class="v-key" data-key="4">4</button>
              <button class="v-key" data-key="5">5</button>
              <button class="v-key" data-key="6">6</button>
              <button class="v-key" data-key="7">7</button>
              <button class="v-key" data-key="8">8</button>
              <button class="v-key" data-key="9">9</button>
              <button class="v-key" data-key="0">0</button>
              <button class="v-key wide" data-key="Backspace">Backspace ⌫</button>
            </div>
            <div class="kb-row">
              <button class="v-key wide" data-key="Tab">Tab ⇥</button>
              <button class="v-key" data-key="q">Q</button>
              <button class="v-key" data-key="w">W</button>
              <button class="v-key" data-key="e">E</button>
              <button class="v-key" data-key="r">R</button>
              <button class="v-key" data-key="t">T</button>
              <button class="v-key" data-key="y">Y</button>
              <button class="v-key" data-key="u">U</button>
              <button class="v-key" data-key="i">I</button>
              <button class="v-key" data-key="o">O</button>
              <button class="v-key" data-key="p">P</button>
            </div>
            <div class="kb-row">
              <button class="v-key wide" data-key="CapsLock">Caps Lock</button>
              <button class="v-key" data-key="a">A</button>
              <button class="v-key" data-key="s">S</button>
              <button class="v-key" data-key="d">D</button>
              <button class="v-key" data-key="f">F</button>
              <button class="v-key" data-key="g">G</button>
              <button class="v-key" data-key="h">H</button>
              <button class="v-key" data-key="j">J</button>
              <button class="v-key" data-key="k">K</button>
              <button class="v-key" data-key="l">L</button>
              <button class="v-key wide" data-key="Enter">Enter ↵</button>
            </div>
            <div class="kb-row">
              <button class="v-key wider" data-key="Shift">Shift ⇧</button>
              <button class="v-key" data-key="z">Z</button>
              <button class="v-key" data-key="x">X</button>
              <button class="v-key" data-key="c">C</button>
              <button class="v-key" data-key="v">V</button>
              <button class="v-key" data-key="b">B</button>
              <button class="v-key" data-key="n">N</button>
              <button class="v-key" data-key="m">M</button>
              <button class="v-key wider" data-key="Shift">Shift ⇧</button>
            </div>
            <div class="kb-row">
              <button class="v-key wide" data-key="Control">Ctrl</button>
              <button class="v-key wide" data-key="Alt">Alt</button>
              <button class="v-key spacebar" data-key=" ">Spacebar (अंतर सोडणे)</button>
              <button class="v-key wide" data-key="Alt">Alt</button>
              <button class="v-key wide" data-key="Control">Ctrl</button>
            </div>
          </div>
        </div>

        <div class="completion-footer">
          <button id="markDoneBtn_keyboard" class="btn btn-primary btn-lg">🏆 Mark Topic as Completed</button>
        </div>
      </div>
    `;
  },

  initKeyboardSim() {
    const keyInfo = {
      Escape: { title: "Esc (Escape Key)", desc: "Exits full-screen video, cancels popups, or dismisses active menus. (बाहेर पडणे)" },
      Enter: { title: "Enter Key (↵)", desc: "Confirms selections, executes commands, or starts a new line in text files. (नवीन ओळ सुरू करणे / होकार)" },
      Backspace: { title: "Backspace Key (⌫)", desc: "Deletes the character immediately to the LEFT of the cursor. (मागील अक्षर खोडणे)" },
      Delete: { title: "Delete Key", desc: "Deletes the character immediately to the RIGHT of cursor or deletes selected files to Recycle Bin. (पुढील अक्षर किंवा फाईल खोडणे)" },
      Shift: { title: "Shift Key (⇧)", desc: "Hold while pressing letter keys to type CAPITAL letters (A, B, C) or special symbols (@, #, $). (मोठे अक्षर किंवा चिन्ह)" },
      Tab: { title: "Tab Key (⇥)", desc: "Jumps the cursor to the next input field or indents text neatly. (पुढील रकान्यात जाणे)" },
      CapsLock: { title: "Caps Lock Key", desc: "Toggles capital letters mode on or off. When lit, all typed letters are uppercase. (सलग मोठी अक्षरे)" },
      Control: { title: "Ctrl (Control Key)", desc: "Used in powerful combinations: Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+S (Save), Ctrl+Z (Undo). (नियंत्रण की)" },
      Alt: { title: "Alt (Alternate Key)", desc: "Used in shortcuts: Alt+Tab (Switch between open apps) or Alt+F4 (Close window). (पर्यायी की)" },
      " ": { title: "Spacebar (मोठी आडवी की)", desc: "Inserts a single empty space between words. The most frequently used key! (शब्दांमध्ये अंतर सोडणे)" }
    };

    const displayKey = (k) => {
      const titleEl = document.getElementById("kbInspectedKeyTitle");
      const descEl = document.getElementById("kbInspectedKeyDesc");
      if (!titleEl || !descEl) return;

      const normalized = (k === " ") ? " " : k;
      const info = keyInfo[normalized];
      if (info) {
        titleEl.textContent = info.title;
        descEl.textContent = info.desc;
      } else {
        titleEl.textContent = `Key: "${k.toUpperCase()}"`;
        descEl.textContent = `Used to type the character "${k}" in text documents, search bars, and web pages.`;
      }
      App.playSound("click");
    };

    document.querySelectorAll(".v-key").forEach(k => {
      k.addEventListener("click", () => {
        const key = k.getAttribute("data-key");
        displayKey(key);
        k.classList.add("active");
        setTimeout(() => k.classList.remove("active"), 200);
      });
    });

    window.addEventListener("keydown", (e) => {
      if (this.activeTopicId === "keyboard") {
        displayKey(e.key);
        const match = document.querySelector(`.v-key[data-key="${e.key}"]`) || 
                      document.querySelector(`.v-key[data-key="${e.key.toLowerCase()}"]`);
        if (match) {
          match.classList.add("active");
          setTimeout(() => match.classList.remove("active"), 200);
        }
      }
    });
  }
};

window.PracticalSkillsModule = PracticalSkillsModule;
