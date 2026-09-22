/**
 * Digital_Sakshar - Computer Basics Module
 * Features:
 * 1. Interactive Computer Anatomy Explorer with analogies and voice support
 * 2. Input vs Output Device Sorting Activity
 * 3. Virtual Desktop File & Folder Simulator
 * 4. HTML5 Canvas Paint Activity
 */

const ComputerModule = {
  activePart: "cpu",
  canvas: null,
  ctx: null,
  isPainting: false,
  paintTool: "brush",
  paintColor: "#4f46e5",
  paintSize: 6,

  // Desktop Simulator State
  desktopItems: [
    { id: "my-pc", name: "This PC", type: "system", icon: "🖥️" },
    { id: "docs", name: "My Documents", type: "folder", icon: "📁", children: [
      { id: "f1", name: "Welcome_Sakshar.txt", type: "file", icon: "📄", content: "Welcome to Digital Sakshar! You are learning file management." }
    ]},
    { id: "recycle", name: "Recycle Bin", type: "trash", icon: "🗑️", children: [] }
  ],
  selectedDesktopItem: null,
  openWindow: null,

  // Sorting Game State
  sortPool: [
    { id: "s1", name: "Keyboard (कळफलक)", type: "input", icon: "⌨️" },
    { id: "s2", name: "Monitor Screen (पडदा)", type: "output", icon: "🖥️" },
    { id: "s3", name: "Mouse (माउस)", type: "input", icon: "🖱️" },
    { id: "s4", name: "Printer (मुद्रक)", type: "output", icon: "🖨️" },
    { id: "s5", name: "Microphone (माईक)", type: "input", icon: "🎙️" },
    { id: "s6", name: "Speakers (स्पीकर्स)", type: "output", icon: "🔊" },
    { id: "s7", name: "Webcam (कॅमेरा)", type: "input", icon: "📷" },
    { id: "s8", name: "Projector (प्रोजेक्टर)", type: "output", icon: "📽️" },
    { id: "s9", name: "Barcode Scanner (स्कॅनर)", type: "input", icon: "🏷️" },
    { id: "s10", name: "Headphones (हेडफोन)", type: "output", icon: "🎧" }
  ],
  sortedInput: [],
  sortedOutput: [],
  selectedSortItem: null,

  // Anatomy Data
  partsData: {
    cpu: {
      title: "CPU (Central Processing Unit)",
      marathi: "मध्यवर्ती प्रक्रिया केंद्र (Madhyavarti Prakriya Kendra)",
      category: "Processing Unit (प्रक्रिया घटक)",
      badge: "badge-primary",
      analogy: "🧠 The Human Brain: Just as your brain processes thoughts and directs your body, the CPU computes instructions and directs all computer hardware.",
      desc: "Often called the brain of the computer, the CPU executes program instructions, performs arithmetic and logic, and coordinates input and output.",
      specs: ["Clock Speed measured in GHz", "Multi-core processors (Quad-core, Octa-core)", "Generates heat, kept cool with fans"]
    },
    monitor: {
      title: "Monitor / Display Screen",
      marathi: "मॉनिटर / पडदा (Parda)",
      category: "Output Device (आऊटपुट साधन)",
      badge: "badge-success",
      analogy: "📺 The Television: It shows you images, text, and videos so you can see what the computer is doing in real-time.",
      desc: "The primary visual interface displaying the desktop, applications, documents, videos, and games.",
      specs: ["Measured diagonally in inches (e.g. 24 inch, 15.6 inch)", "Resolution: Full HD (1920x1080), 4K", "Connects via HDMI or DisplayPort"]
    },
    keyboard: {
      title: "Keyboard",
      marathi: "कळफलक (Kalphalk)",
      category: "Input Device (इनपुट साधन)",
      badge: "badge-warning",
      analogy: "✍️ Pen & Paper: It is your main tool to write words, numbers, and send commands into the computer.",
      desc: "Features letter keys (A-Z), number keys (0-9), function keys (F1-F12), and navigation arrows. Essential for typing and shortcut execution.",
      specs: ["QWERTY standard layout", "Shortcut keys (Ctrl, Alt, Shift)", "Mechanical or membrane key switches"]
    },
    mouse: {
      title: "Mouse / Trackpad",
      marathi: "माउस / दर्शक साधन",
      category: "Input Device (इनपुट साधन)",
      badge: "badge-warning",
      analogy: "👉 Your Pointing Finger: Moves the cursor on screen, lets you point, select, and double-click to open items.",
      desc: "A hand-held pointing device that detects two-dimensional motion. Includes Left Click (select/open), Right Click (context options), and Scroll Wheel.",
      specs: ["Optical sensor technology", "Wireless via Bluetooth or 2.4GHz dongle", "Left, right, and middle scroll click"]
    },
    ram: {
      title: "RAM (Random Access Memory)",
      marathi: "अल्पकालीन मेमरी (Alpkalin Memory)",
      category: "Temporary Memory (तात्पुरती मेमरी)",
      badge: "badge-marathi",
      analogy: "📖 Your Study Desk: A larger desk lets you keep more open notebooks at hand simultaneously without putting them back in the bookshelf.",
      desc: "Extremely fast volatile memory that temporarily stores active programs and open tabs. When power turns off, RAM data clears.",
      specs: ["Capacity: 8GB, 16GB, 32GB standard", "Speed: DDR4, DDR5", "Clears on system shutdown"]
    },
    storage: {
      title: "SSD / Hard Disk (Permanent Storage)",
      marathi: "साठवण यंत्र (Sathvan Yantra)",
      category: "Storage Device (कायम साठवण)",
      badge: "badge-primary",
      analogy: "📚 The Library Bookshelf: All your photo albums, study books, and videos are permanently stored here safely even when the lights are turned off.",
      desc: "Solid State Drives (SSDs) and Hard Disk Drives (HDDs) hold the Operating System, software files, and your personal data permanently.",
      specs: ["SSDs are 5x-10x faster than traditional spinning HDDs", "Capacities: 512GB, 1TB, 2TB", "Non-volatile: data survives power loss"]
    },
    printer: {
      title: "Printer (मुद्रक)",
      marathi: "मुद्रक साधन (Printer)",
      category: "Output Device (आऊटपुट साधन)",
      badge: "badge-success",
      analogy: "🖨️ The Xerox Machine: Just as a photocopier prints onto paper, a printer transfers digital files, letters, and photos into physical paper sheets.",
      desc: "An external hardware output device that converts digital documents on screen into physical hard-copy prints.",
      specs: ["Laser, Inkjet, or Thermal printing", "Color and Black & White printing", "Connects via USB or Wireless Wi-Fi"]
    },
    speakers: {
      title: "Speakers & Headphones (ध्वनिक्षेपक)",
      marathi: "ध्वनिक्षेपक / आवाज साधन",
      category: "Output Device (आऊटपुट साधन)",
      badge: "badge-success",
      analogy: "📢 The Radio Loudspeaker: Converts electrical digital audio data into audible music, voices, video sound, and accessibility speech.",
      desc: "Audio output devices enabling users to listen to video tutorials, voice calls, music, and spoken instructions.",
      specs: ["Built-in laptop speakers or external 3.5mm jack", "Bluetooth wireless audio support", "Stereo sound channels"]
    }
  },

  // 7 Core Educational Topics
  educationalTopics: [
    {
      id: "what-is-computer",
      icon: "💻",
      title: "1. What is a Computer?",
      mrTitle: "संगणक म्हणजे काय?",
      desc: "An electronic machine that accepts raw data (Input), computes it at high speed (Processing), produces meaningful results (Output), and preserves data (Storage) — the universal IPOS cycle.",
      analogy: "Think of an automatic juicer: oranges in (Input), motor crushes them (Process), juice in glass (Output), extra pulp saved (Storage).",
      points: ["Executes millions of calculations per second", "High accuracy without fatigue", "Operates using binary machine code (0s and 1s)"]
    },
    {
      id: "parts-of-computer",
      icon: "🖥️",
      title: "2. Parts of a Computer",
      mrTitle: "संगणकाचे प्रमुख भाग",
      desc: "A complete computer setup consists of Monitor (Display), CPU Cabinet (Processor & Motherboard), Keyboard (Typing input), Mouse (Pointing input), and power supply.",
      analogy: "Just like the human body has eyes (Monitor), a brain (CPU), hands (Keyboard/Mouse), and memory storage.",
      points: ["Monitor displays graphical feedback", "CPU coordinates all hardware parts", "Connects via HDMI, USB, and audio jacks"]
    },
    {
      id: "uses-of-computers",
      icon: "🏢",
      title: "3. Uses of Computers",
      mrTitle: "संगणकाचे विविध क्षेत्रांतील उपयोग",
      desc: "Computers are indispensable tools across modern society: Schools & Universities, Digital Banking & ATMs, Hospitals & Diagnostics, and Everyday Communication.",
      analogy: "A multi-purpose digital tool: a library for students, an accounting ledger for shops, a medical diagnostic center for doctors.",
      points: [
        "Education: Online classes, study materials, digital literacy",
        "Banking: ATM withdrawals, UPI transfers, account management",
        "Healthcare: Digital patient records, MRI scans, patient monitoring",
        "Daily Life: Booking railway tickets, online payments, video calling"
      ]
    },
    {
      id: "input-output-devices",
      icon: "📥",
      title: "4. Input vs Output Devices",
      mrTitle: "इनपुट आणि आऊटपुट साधने",
      desc: "Input devices allow humans to enter data and instructions into the computer. Output devices display or reproduce the results of processed data.",
      analogy: "Input is like speaking into someone's ear; Output is like listening to them reply back.",
      points: [
        "Input: Keyboard, Mouse, Microphone, Webcam, Scanner",
        "Output: Monitor, Printer, Speakers, Projector, Headphones"
      ]
    },
    {
      id: "hardware-software",
      icon: "⚙️",
      title: "5. Hardware vs Software",
      mrTitle: "हार्डवेअर आणि सॉफ्टवेअर",
      desc: "Hardware refers to tangible physical machinery you can touch. Software consists of intangible digital code, apps, and operating systems.",
      analogy: "A physical music CD is Hardware; the songs recorded on it are Software. Neither is useful without the other.",
      points: [
        "Hardware: Screen, Motherboard, Keyboard, Mouse, RAM",
        "System Software: Microsoft Windows, macOS, Android, Linux",
        "Application Software: MS Paint, Google Chrome, Word, Calculator"
      ]
    },
    {
      id: "basic-applications",
      icon: "📱",
      title: "6. Basic Computer Applications",
      mrTitle: "दैनंदिन वापरातील मूलभूत ॲप्स",
      desc: "Every computer comes with standard software tools designed for everyday practical tasks.",
      analogy: "Hand tools in a home toolbox: a hammer, a measuring tape, each specialized for a practical task.",
      points: [
        "Word Processor / Notepad: Type letters, resumes, and text notes",
        "Web Browser: Browse internet sites (Chrome, Edge)",
        "Media Player: Watch videos and listen to music",
        "Calculator & Paint: Quick calculations and digital drawing"
      ]
    },
    {
      id: "files-folders",
      icon: "📁",
      title: "7. Files and Folders",
      mrTitle: "फाइल्स आणि फोल्डर्सची संकल्पना",
      desc: "A File is a single unit of digital information with a unique name and extension (.txt, .jpg, .pdf). A Folder is a container used to group multiple files neatly.",
      analogy: "A paper document is a File; a sturdy filing cabinet holding 50 documents is a Folder.",
      points: [
        "File name & extension: e.g. 'Aadhaar_Card_2026.pdf'",
        "Extension types: .pdf (document), .jpg (image), .mp4 (video)",
        "Storage: Organize by year, topic, or person for quick access"
      ]
    }
  ],

  init() {
    this.setupSubTabs();
    this.renderEducationalTopics();
    this.setupAnatomy();
    this.setupSortingActivity();
    this.setupDesktopSim();
    this.setupPaintCanvas();
  },

  renderEducationalTopics() {
    const container = document.getElementById("compTopicsGrid");
    if (!container) return;

    container.innerHTML = this.educationalTopics.map(t => `
      <div class="card" style="padding: 1.25rem;">
        <div class="meter-header">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-size:1.6rem;">${t.icon}</span>
            <h4 style="margin:0; font-size:1.05rem;">${t.title}</h4>
          </div>
          <span class="badge badge-primary">Core Concept</span>
        </div>
        <div class="section-marathi-subtitle" style="margin: 0.35rem 0 0.5rem 0; font-size:0.88rem;">${t.mrTitle}</div>
        <p style="font-size:0.88rem; line-height:1.5;">${t.desc}</p>
        <div class="tip-card" style="margin: 0.75rem 0; padding: 0.6rem 0.85rem; font-size:0.82rem;">
          💡 <strong>Analogy:</strong> ${t.analogy}
        </div>
        <ul style="padding-left:1.2rem; font-size:0.82rem; color:var(--text-muted); margin:0;">
          ${t.points.map(p => `<li style="margin-bottom:0.25rem;">${p}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  },

  onEnter() {
    StorageManager.markTopicViewed("computerBasics", "intro");
  },

  setupSubTabs() {
    document.querySelectorAll(".comp-sub-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".comp-sub-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.getAttribute("data-target");

        document.querySelectorAll(".comp-sub-section").forEach(sec => {
          sec.style.display = (sec.id === target) ? "block" : "none";
        });

        if (target === "comp-paint" && this.canvas) {
          this.resizeCanvas();
        }
        App.playSound("click");
      });
    });
  },

  // --------------------------------------------------------------------------
  // 1. Anatomy Explorer
  // --------------------------------------------------------------------------
  setupAnatomy() {
    document.querySelectorAll(".part-trigger").forEach(el => {
      el.addEventListener("click", () => {
        const partKey = el.getAttribute("data-part");
        this.selectPart(partKey);
        App.playSound("click");
      });
    });

    // Read aloud button
    const readBtn = document.getElementById("readAnatomyBtn");
    if (readBtn) {
      readBtn.addEventListener("click", () => {
        const part = this.partsData[this.activePart];
        if (part) {
          App.speak(`${part.title}. ${part.desc} ${part.analogy}`);
        }
      });
    }

    this.selectPart("cpu");
  },

  selectPart(partKey) {
    this.activePart = partKey;
    const part = this.partsData[partKey];
    if (!part) return;

    // Highlight trigger buttons
    document.querySelectorAll(".part-trigger").forEach(el => {
      el.classList.toggle("active", el.getAttribute("data-part") === partKey);
    });

    const panel = document.getElementById("anatomyDetails");
    if (panel) {
      panel.innerHTML = `
        <div class="meter-header">
          <div>
            <h3>${part.title}</h3>
            <div class="section-marathi-subtitle">${part.marathi}</div>
          </div>
          <span class="badge ${part.badge}">${part.category}</span>
        </div>

        <div class="part-analogy-box">
          <strong>💡 Easy Analogy:</strong><br>
          ${part.analogy}
        </div>

        <p>${part.desc}</p>

        <div>
          <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem;">Key Characteristics:</h4>
          <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-muted);">
            ${part.specs.map(s => `<li style="margin-bottom: 0.35rem;">${s}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    StorageManager.recordComputerActivity("anatomyExplored", true);
  },

  // --------------------------------------------------------------------------
  // 2. Input vs Output Sorting Activity
  // --------------------------------------------------------------------------
  setupSortingActivity() {
    this.renderSortPool();

    const inputBasket = document.getElementById("basketInput");
    const outputBasket = document.getElementById("basketOutput");

    if (inputBasket) {
      inputBasket.addEventListener("click", () => {
        if (this.selectedSortItem) {
          this.placeSelectedItem("input");
        }
      });
    }

    if (outputBasket) {
      outputBasket.addEventListener("click", () => {
        if (this.selectedSortItem) {
          this.placeSelectedItem("output");
        }
      });
    }

    const resetBtn = document.getElementById("resetSortBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.resetSortingGame();
        App.playSound("click");
      });
    }
  },

  renderSortPool() {
    const poolEl = document.getElementById("sortPool");
    if (!poolEl) return;
    poolEl.innerHTML = "";

    const remainingItems = this.sortPool.filter(item => 
      !this.sortedInput.includes(item.id) && !this.sortedOutput.includes(item.id)
    );

    if (remainingItems.length === 0) {
      poolEl.innerHTML = `
        <div class="text-center" style="width: 100%; padding: 1rem;">
          <h4 style="color: var(--success);">🎉 Fantastic! All devices sorted accurately!</h4>
          <p style="font-size: 0.88rem;">You have mastered Input and Output devices.</p>
        </div>
      `;
      StorageManager.recordComputerActivity("sortingGameCompleted", true);
      App.playSound("correct");
      return;
    }

    remainingItems.forEach(item => {
      const btn = document.createElement("div");
      btn.className = `sort-item ${this.selectedSortItem === item.id ? "selected" : ""}`;
      btn.innerHTML = `${item.icon} ${item.name}`;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectedSortItem = (this.selectedSortItem === item.id) ? null : item.id;
        this.renderSortPool();
        App.playSound("click");
      });
      poolEl.appendChild(btn);
    });

    this.renderBaskets();
  },

  placeSelectedItem(targetBasket) {
    if (!this.selectedSortItem) return;
    const item = this.sortPool.find(i => i.id === this.selectedSortItem);
    if (!item) return;

    if (item.type === targetBasket) {
      if (targetBasket === "input") {
        this.sortedInput.push(item.id);
      } else {
        this.sortedOutput.push(item.id);
      }
      App.playSound("correct");
      App.showToast("Correct Placement!", `${item.name} is indeed an ${targetBasket.toUpperCase()} device.`, "success", "✅");
    } else {
      App.playSound("wrong");
      App.showToast("Oops! Try again", `${item.name} is NOT an ${targetBasket.toUpperCase()} device. Think about data flow!`, "danger", "❌");
    }

    this.selectedSortItem = null;
    this.renderSortPool();
  },

  renderBaskets() {
    const inEl = document.getElementById("inputItemsList");
    const outEl = document.getElementById("outputItemsList");

    if (inEl) {
      inEl.innerHTML = this.sortedInput.map(id => {
        const item = this.sortPool.find(i => i.id === id);
        return `<span class="sort-item" style="background: var(--bg-surface);">${item.icon} ${item.name}</span>`;
      }).join('');
    }

    if (outEl) {
      outEl.innerHTML = this.sortedOutput.map(id => {
        const item = this.sortPool.find(i => i.id === id);
        return `<span class="sort-item" style="background: var(--bg-surface);">${item.icon} ${item.name}</span>`;
      }).join('');
    }
  },

  resetSortingGame() {
    this.sortedInput = [];
    this.sortedOutput = [];
    this.selectedSortItem = null;
    this.renderSortPool();
  },

  // --------------------------------------------------------------------------
  // 3. Desktop File & Folder Simulator
  // --------------------------------------------------------------------------
  setupDesktopSim() {
    this.renderDesktop();

    const newFolderBtn = document.getElementById("simNewFolderBtn");
    const newFileBtn = document.getElementById("simNewFileBtn");
    const emptyTrashBtn = document.getElementById("simEmptyTrashBtn");

    if (newFolderBtn) {
      newFolderBtn.addEventListener("click", () => {
        const name = prompt("Enter folder name (फोल्डरचे नाव):", "My New Folder");
        if (name && name.trim()) {
          this.desktopItems.push({
            id: `f_${Date.now()}`,
            name: name.trim(),
            type: "folder",
            icon: "📁",
            children: []
          });
          this.renderDesktop();
          StorageManager.recordComputerActivity("desktopSimUsed", true);
          App.playSound("click");
          App.showToast("Folder Created!", `Created folder '${name.trim()}'`, "success", "📁");
        }
      });
    }

    if (newFileBtn) {
      newFileBtn.addEventListener("click", () => {
        const name = prompt("Enter text document name:", "Notes.txt");
        if (name && name.trim()) {
          this.desktopItems.push({
            id: `txt_${Date.now()}`,
            name: name.trim(),
            type: "file",
            icon: "📄",
            content: "You created this file using Digital Sakshar Desktop Simulator!"
          });
          this.renderDesktop();
          StorageManager.recordComputerActivity("desktopSimUsed", true);
          App.playSound("click");
          App.showToast("File Created!", `Created file '${name.trim()}'`, "success", "📄");
        }
      });
    }

    if (emptyTrashBtn) {
      emptyTrashBtn.addEventListener("click", () => {
        const trash = this.desktopItems.find(i => i.id === "recycle");
        if (trash) {
          trash.children = [];
          App.playSound("click");
          App.showToast("Recycle Bin Emptied", "All deleted items permanently cleared.", "warning", "🗑️");
        }
      });
    }
  },

  renderDesktop() {
    const canvas = document.getElementById("desktopCanvas");
    if (!canvas) return;
    canvas.innerHTML = "";

    this.desktopItems.forEach(item => {
      const el = document.createElement("div");
      el.className = `desktop-icon-item ${this.selectedDesktopItem === item.id ? "active" : ""}`;
      el.innerHTML = `
        <div class="desktop-icon-glyph">${item.icon}</div>
        <div class="desktop-icon-name">${item.name}</div>
      `;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectedDesktopItem = item.id;
        this.renderDesktop();
        App.playSound("click");
      });

      el.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        this.openVirtualWindow(item);
        App.playSound("click");
      });

      canvas.appendChild(el);
    });
  },

  openVirtualWindow(item) {
    this.openWindow = item;
    const win = document.getElementById("simVirtualWindow");
    if (!win) return;

    const title = document.getElementById("simWinTitle");
    const body = document.getElementById("simWinBody");

    if (title) title.innerHTML = `${item.icon} ${item.name}`;
    if (body) {
      if (item.type === "file") {
        body.innerHTML = `
          <div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-family: monospace;">
            <p>${item.content || "Empty document."}</p>
          </div>
          <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
            <button class="btn btn-sm btn-danger" onclick="ComputerModule.deleteItem('${item.id}')">🗑️ Move to Trash</button>
          </div>
        `;
      } else if (item.children) {
        if (item.children.length === 0) {
          body.innerHTML = `<p style="color: var(--text-muted); text-align: center; margin-top: 2rem;">This folder is currently empty.</p>`;
        } else {
          body.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 1rem;">
              ${item.children.map(child => `
                <div style="text-align: center; cursor: pointer; padding: 0.5rem; border-radius: 6px;" class="desktop-icon-item">
                  <div style="font-size: 1.8rem;">${child.icon}</div>
                  <div style="font-size: 0.75rem; color: var(--text-main); margin-top: 0.2rem;">${child.name}</div>
                </div>
              `).join('')}
            </div>
          `;
        }
      }
    }

    win.style.display = "flex";
  },

  closeVirtualWindow() {
    const win = document.getElementById("simVirtualWindow");
    if (win) win.style.display = "none";
    this.openWindow = null;
    App.playSound("click");
  },

  deleteItem(id) {
    const idx = this.desktopItems.findIndex(i => i.id === id);
    if (idx !== -1) {
      const deleted = this.desktopItems.splice(idx, 1)[0];
      const trash = this.desktopItems.find(i => i.id === "recycle");
      if (trash) {
        trash.children.push(deleted);
      }
      this.closeVirtualWindow();
      this.renderDesktop();
      App.playSound("click");
      App.showToast("Moved to Recycle Bin", `${deleted.name} moved to trash.`, "warning", "🗑️");
    }
  },

  // --------------------------------------------------------------------------
  // 4. Paint Activity (HTML5 Canvas)
  // --------------------------------------------------------------------------
  setupPaintCanvas() {
    this.canvas = document.getElementById("paintCanvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    // Canvas Events
    const start = (e) => {
      this.isPainting = true;
      this.draw(e);
    };

    const stop = () => {
      this.isPainting = false;
      this.ctx.beginPath();
    };

    this.canvas.addEventListener("mousedown", start);
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    this.canvas.addEventListener("mouseup", stop);
    this.canvas.addEventListener("mouseleave", stop);

    // Touch Support
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      start(e.touches[0]);
    }, { passive: false });

    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      this.draw(e.touches[0]);
    }, { passive: false });

    this.canvas.addEventListener("touchend", stop);

    // Color Swatches
    document.querySelectorAll(".color-swatch").forEach(swatch => {
      swatch.addEventListener("click", () => {
        document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
        swatch.classList.add("active");
        this.paintColor = swatch.getAttribute("data-color");
        this.paintTool = "brush";
        App.playSound("click");
      });
    });

    // Tool Buttons
    const brushBtn = document.getElementById("paintBrushBtn");
    const eraserBtn = document.getElementById("paintEraserBtn");
    const clearBtn = document.getElementById("paintClearBtn");
    const downloadBtn = document.getElementById("paintDownloadBtn");
    const sizeSlider = document.getElementById("paintSizeSlider");

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
        if (confirm("Clear your entire drawing?")) {
          this.ctx.fillStyle = "#ffffff";
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          App.playSound("click");
        }
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
        link.href = this.canvas.toDataURL("image/png");
        link.click();
        StorageManager.recordComputerActivity("paintArtSaved", true);
        App.playSound("correct");
        App.showToast("Drawing Saved!", "Your art has been downloaded to your computer.", "success", "🎨");
      });
    }
  },

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      // Save canvas content before resizing
      const temp = this.ctx ? this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height) : null;
      this.canvas.width = rect.width;
      this.canvas.height = 380;
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      if (temp) {
        try { this.ctx.putImageData(temp, 0, 0); } catch (e) {}
      }
    }
  },

  draw(e) {
    if (!this.isPainting || !this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.ctx.lineWidth = this.paintSize;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    if (this.paintTool === "eraser") {
      this.ctx.strokeStyle = "#ffffff";
    } else {
      this.ctx.strokeStyle = this.paintColor;
    }

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }
};

window.ComputerModule = ComputerModule;
