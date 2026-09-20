/**
 * Digital_Sakshar - Learning Resources & Marathi-English Glossary Module
 * Features:
 * - Curated Educational Video Tutorials
 * - Easy Notes & Keyboard Shortcuts Cheat Sheet
 * - Searchable Digital Dictionary (A to Z) with category filters
 * - Marathi ⇄ English Computer Vocabulary with Speech pronunciation
 */

const ResourcesModule = {
  activeCategory: "all",
  searchQuery: "",

  // Curated Educational Video Data
  videoData: [
    {
      id: "v1",
      title: "Computer Basics for Absolute Beginners",
      marathiTitle: "संगणक मूलभूत माहिती - नवशिक्यांसाठी",
      duration: "10 mins",
      thumbnailIcon: "💻",
      embedUrl: "https://www.youtube-nocookie.com/embed/fJ5zSfqK33s",
      summary: "Understand what hardware and software are, how the CPU processes instructions, and how to safely power on and off a computer."
    },
    {
      id: "v2",
      title: "How the Internet & Google Search Work",
      marathiTitle: "इंटरनेट आणि गुगल शोध कसा काम करतो?",
      duration: "8 mins",
      thumbnailIcon: "🌐",
      embedUrl: "https://www.youtube-nocookie.com/embed/7_LPdttKXPc",
      summary: "Explore the global network of websites, browsers, search engines, and how to find verified reliable information online."
    },
    {
      id: "v3",
      title: "Digital Banking, UPI & OTP Safety Rules",
      marathiTitle: "डिजिटल बँकिंग, UPI आणि OTP सुरक्षितता नियम",
      duration: "12 mins",
      thumbnailIcon: "🛡️",
      embedUrl: "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
      summary: "Crucial guidelines from RBI on identifying phishing calls, fake loan SMS, and why you should never share your PIN or OTP."
    },
    {
      id: "v4",
      title: "Top 10 Keyboard Shortcuts for Fast Work",
      marathiTitle: "वेगवान कामासाठी १० महत्वाचे कीबोर्ड शॉर्टकट",
      duration: "6 mins",
      thumbnailIcon: "⌨️",
      embedUrl: "https://www.youtube-nocookie.com/embed/D_hJ-F2o29s",
      summary: "Master Ctrl+C, Ctrl+V, Ctrl+Z, Alt+Tab, and Win+D to operate any computer like a pro."
    }
  ],

  init() {
    this.setupSubTabs();
    this.renderVideoCards();
    this.renderDictionary();
    this.renderMarathiTerms();
    this.setupSearchListeners();
  },

  onEnter() {
    StorageManager.markTopicViewed("resources", "intro");
  },

  setupSubTabs() {
    document.querySelectorAll(".res-sub-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".res-sub-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.getAttribute("data-target");

        document.querySelectorAll(".res-sub-section").forEach(sec => {
          sec.style.display = (sec.id === target) ? "block" : "none";
        });
        App.playSound("click");
      });
    });
  },

  // --------------------------------------------------------------------------
  // 1. Video Tutorials
  // --------------------------------------------------------------------------
  renderVideoCards() {
    const container = document.getElementById("videoCardsContainer");
    if (!container) return;

    container.innerHTML = this.videoData.map(v => `
      <div class="card card-interactive" onclick="ResourcesModule.openVideoModal('${v.id}')">
        <div style="height: 140px; background: linear-gradient(135deg, #312e81 0%, #1e3a8a 100%); border-radius: var(--radius-md); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; position: relative;">
          <span style="font-size: 3rem;">${v.thumbnailIcon}</span>
          <span style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem;">⏱️ ${v.duration}</span>
        </div>
        <div style="margin-top: 1rem;">
          <h4 style="font-size: 1.05rem; line-height: 1.3;">${v.title}</h4>
          <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-top: 0.2rem;">${v.marathiTitle}</div>
          <p style="font-size: 0.86rem; margin-top: 0.5rem;">${v.summary}</p>
        </div>
        <button class="btn btn-sm btn-outline" style="width: 100%; margin-top: 1rem;">▶️ Watch Video Tutorial</button>
      </div>
    `).join('');
  },

  openVideoModal(id) {
    const video = this.videoData.find(v => v.id === id);
    if (!video) return;

    const modal = document.getElementById("videoPlayerModal");
    const frame = document.getElementById("videoModalFrame");
    const title = document.getElementById("videoModalTitle");
    const summary = document.getElementById("videoModalSummary");

    if (modal && frame && title && summary) {
      title.textContent = video.title;
      summary.innerHTML = `
        <p><strong>मराठी शीर्षक:</strong> ${video.marathiTitle}</p>
        <p style="margin-top: 0.35rem;">${video.summary}</p>
      `;
      frame.src = video.embedUrl;
      modal.classList.add("active");
      App.playSound("click");
    }
  },

  closeVideoModal() {
    const modal = document.getElementById("videoPlayerModal");
    const frame = document.getElementById("videoModalFrame");
    if (modal) modal.classList.remove("active");
    if (frame) frame.src = "";
    App.playSound("click");
  },

  // --------------------------------------------------------------------------
  // 2. Digital Dictionary
  // --------------------------------------------------------------------------
  renderDictionary() {
    const container = document.getElementById("dictionaryCardsContainer");
    if (!container) return;

    let filtered = DICTIONARY_DATA;
    if (this.activeCategory !== "all") {
      filtered = filtered.filter(item => item.category.toLowerCase() === this.activeCategory.toLowerCase());
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.term.toLowerCase().includes(q) ||
        item.marathi.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No terms found matching your search. Try another keyword!</p>`;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="meter-header">
            <h4 style="font-size: 1.15rem; color: var(--text-main);">${item.term}</h4>
            <span class="badge badge-primary">${item.category}</span>
          </div>
          <div class="section-marathi-subtitle" style="font-size: 0.9rem; margin-bottom: 0.75rem;">${item.marathi}</div>
          <p style="font-size: 0.92rem; margin-bottom: 0.5rem;">${item.definition}</p>
          <p style="font-size: 0.88rem; color: var(--primary); font-style: italic;">${item.marathiDef}</p>
        </div>
        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.82rem; color: var(--text-subtle); display: flex; justify-content: space-between; align-items: center;">
          <span>💡 ${item.example}</span>
          <button class="btn-icon" title="Listen Pronunciation" onclick="App.speak('${item.term}. ${item.definition}')" style="font-size: 1rem;">🔊</button>
        </div>
      </div>
    `).join('');
  },

  // --------------------------------------------------------------------------
  // 3. Marathi ⇄ English Vocabulary
  // --------------------------------------------------------------------------
  renderMarathiTerms(query = "") {
    const tbody = document.getElementById("marathiTermsTbody");
    if (!tbody) return;

    let list = MARATHI_TERMS_TABLE;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(item => 
        item.english.toLowerCase().includes(q) || 
        item.marathi.includes(q) || 
        item.phonetic.toLowerCase().includes(q)
      );
    }

    tbody.innerHTML = list.map(t => `
      <tr style="border-bottom: 1px solid var(--border-subtle);">
        <td style="padding: 0.85rem 1rem; font-weight: 700; color: var(--text-main);">${t.english}</td>
        <td style="padding: 0.85rem 1rem; color: var(--primary); font-weight: 700; font-size: 1.05rem;">${t.marathi}</td>
        <td style="padding: 0.85rem 1rem; font-style: italic; color: var(--text-muted);">${t.phonetic}</td>
        <td style="padding: 0.85rem 1rem; font-size: 0.88rem; color: var(--text-muted);">${t.context}</td>
        <td style="padding: 0.85rem 1rem; text-align: center;">
          <button class="btn btn-sm btn-outline" onclick="App.speak('${t.english}. Marathi term: ${t.phonetic}')" style="padding: 0.2rem 0.6rem;">🔊</button>
        </td>
      </tr>
    `).join('');
  },

  setupSearchListeners() {
    // Dictionary search
    const dictInput = document.getElementById("dictSearchInput");
    if (dictInput) {
      dictInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim();
        this.renderDictionary();
      });
    }

    // Category pills
    document.querySelectorAll(".dict-cat-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".dict-cat-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.activeCategory = pill.getAttribute("data-cat");
        this.renderDictionary();
        App.playSound("click");
      });
    });

    // Marathi terms search
    const marathiInput = document.getElementById("marathiSearchInput");
    if (marathiInput) {
      marathiInput.addEventListener("input", (e) => {
        this.renderMarathiTerms(e.target.value.trim());
      });
    }
  }
};

window.ResourcesModule = ResourcesModule;
