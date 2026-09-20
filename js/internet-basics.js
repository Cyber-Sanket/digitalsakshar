/**
 * Digital_Sakshar - Internet Basics Module
 * Features:
 * 1. Web Browser Anatomy Simulator
 * 2. Safe Search Engine Simulator (with Scam link vs Official link indicators)
 * 3. Safe Email Composer Simulator
 * 4. Download vs Upload Visualizer & Wi-Fi Guide
 */

const InternetModule = {
  // Mock Search Engine Database
  mockSearchDb: {
    "computer": [
      {
        title: "Computer Basics - Free Learning Guide for Beginners",
        url: "https://www.digital-sakshar.org/computer-basics",
        snippet: "Learn the fundamentals of computer hardware, software, CPU, operating systems, and file management with step-by-step guides.",
        type: "safe"
      },
      {
        title: "Parts of a Computer Explained Simply",
        url: "https://www.digital-sakshar.org/parts-guide",
        snippet: "Discover how monitors, keyboards, mice, and storage work together to make everyday digital computing easy.",
        type: "safe"
      }
    ],
    "internet": [
      {
        title: "What is the Internet? Comprehensive Beginner's Guide",
        url: "https://www.digital-sakshar.org/internet-fundamentals",
        snippet: "The internet connects billions of devices worldwide. Learn about web browsers, search engines, websites, and Wi-Fi networks.",
        type: "safe"
      },
      {
        title: "Understanding Web Browsers & Safe Surfing",
        url: "https://www.digital-sakshar.org/browser-safety",
        snippet: "How to use Google Chrome, Edge, and Firefox safely. Check SSL certificates and avoid malicious popups.",
        type: "safe"
      }
    ],
    "email": [
      {
        title: "How to Create and Send Emails Safely",
        url: "https://mail.google.com/guide",
        snippet: "Step-by-step tutorial on drafting emails, adding subjects, attaching files securely, and identifying spam emails.",
        type: "safe"
      }
    ],
    "pm kisan": [
      {
        title: "PM-KISAN Official Scheme Portal - Government of India",
        url: "https://pmkisan.gov.in (Official Govt Portal)",
        snippet: "Official website for Pradhan Mantri Kisan Samman Nidhi. Beneficiary status, farmer registration, and KYC verification.",
        type: "verified-govt"
      },
      {
        title: "[SCAM AD] Urgent PM Kisan Claim ₹6000 Instantly at kisan-money-claim.xyz",
        url: "http://kisan-claim-quick.xyz (Suspicious Unofficial Link)",
        snippet: "⚠️ ALERT: This is an example of an unofficial fake website seeking to steal bank details. Always verify the .gov.in domain!",
        type: "scam-warning"
      }
    ]
  },

  init() {
    this.setupSubTabs();
    this.setupSearchEngine();
    this.setupEmailComposer();
    this.setupBrowserTooltips();
  },

  onEnter() {
    StorageManager.markTopicViewed("internetBasics", "intro");
  },

  setupSubTabs() {
    document.querySelectorAll(".net-sub-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".net-sub-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.getAttribute("data-target");

        document.querySelectorAll(".net-sub-section").forEach(sec => {
          sec.style.display = (sec.id === target) ? "block" : "none";
        });
        App.playSound("click");
      });
    });
  },

  // --------------------------------------------------------------------------
  // 1. Browser Anatomy
  // --------------------------------------------------------------------------
  setupBrowserTooltips() {
    document.querySelectorAll(".browser-hotspot").forEach(spot => {
      spot.addEventListener("click", () => {
        const info = spot.getAttribute("data-info");
        const title = spot.getAttribute("data-title");
        App.showToast(title, info, "success", "🌐");
        StorageManager.recordInternetActivity("browserExplored", true);
        App.playSound("click");
      });
    });
  },

  // --------------------------------------------------------------------------
  // 2. Mock Search Engine
  // --------------------------------------------------------------------------
  setupSearchEngine() {
    const input = document.getElementById("mockSearchInput");
    const searchBtn = document.getElementById("mockSearchBtn");

    const doSearch = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) return;
      this.renderSearchResults(q);
      StorageManager.recordInternetActivity("searchSimUsed", true);
      App.playSound("click");
    };

    if (searchBtn) searchBtn.addEventListener("click", doSearch);
    if (input) {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") doSearch();
      });
    }

    // Quick suggestion pill clicks
    document.querySelectorAll(".search-suggest-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const text = pill.textContent.trim();
        if (input) input.value = text;
        this.renderSearchResults(text.toLowerCase());
        StorageManager.recordInternetActivity("searchSimUsed", true);
        App.playSound("click");
      });
    });
  },

  renderSearchResults(query) {
    const container = document.getElementById("searchResultsContainer");
    if (!container) return;

    let matched = [];
    Object.keys(this.mockSearchDb).forEach(key => {
      if (query.includes(key) || key.includes(query)) {
        matched = matched.concat(this.mockSearchDb[key]);
      }
    });

    if (matched.length === 0) {
      matched = [
        {
          title: `Information and Guides on "${query}"`,
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
          snippet: `Find verified digital articles, definitions, and tutorials about ${query} on certified educational resources.`,
          type: "safe"
        },
        {
          title: `Educational Videos & Tutorials: ${query}`,
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
          snippet: `Watch visual video demonstrations and step-by-step beginner guides on ${query}.`,
          type: "safe"
        }
      ];
    }

    container.innerHTML = `
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
        Showing educational simulated results for: <strong>"${query}"</strong>
      </div>
      ${matched.map(res => {
        let badge = "";
        let borderStyle = "";
        if (res.type === "verified-govt") {
          badge = `<span class="badge badge-success" style="margin-left: 0.5rem;">🏛️ Verified Official Govt Site (.gov.in)</span>`;
        } else if (res.type === "scam-warning") {
          badge = `<span class="badge badge-danger" style="margin-left: 0.5rem;">⚠️ DANGER: Suspected Phishing Link</span>`;
          borderStyle = `border: 2px solid var(--danger); background: var(--danger-light);`;
        }

        return `
          <div class="search-result-card" style="${borderStyle}">
            <div class="result-url">${res.url} ${badge}</div>
            <div class="result-title">${res.title}</div>
            <div class="result-desc">${res.snippet}</div>
          </div>
        `;
      }).join('')}
    `;
  },

  // --------------------------------------------------------------------------
  // 3. Safe Email Composer Simulator
  // --------------------------------------------------------------------------
  setupEmailComposer() {
    const sendBtn = document.getElementById("emailSendBtn");
    const templateSelect = document.getElementById("emailTemplateSelect");

    if (templateSelect) {
      templateSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        const subInput = document.getElementById("emailSubject");
        const bodyInput = document.getElementById("emailBody");

        if (val === "leave") {
          subInput.value = "Application for 2 Days Leave";
          bodyInput.value = "Respected Teacher / Manager,\n\nI kindly request you to grant me leave for 2 days due to a family occasion.\n\nThanking you,\nSincerely,\nDigital Learner";
        } else if (val === "inquiry") {
          subInput.value = "Inquiry regarding Digital Literacy Certificate";
          bodyInput.value = "Dear Digital Sakshar Team,\n\nI have successfully completed the computer fundamentals module and would like to know the steps to obtain my course certificate.\n\nBest regards,\nLearner";
        } else if (val === "feedback") {
          subInput.value = "Feedback on Digital Sakshar Platform";
          bodyInput.value = "Hello,\n\nThe interactive activities like Paint and Typing Practice have been extremely helpful for my learning. Thank you!";
        }
        App.playSound("click");
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", () => {
        const to = document.getElementById("emailTo").value.trim();
        const sub = document.getElementById("emailSubject").value.trim();
        const body = document.getElementById("emailBody").value.trim();

        if (!to || !to.includes("@") || !to.includes(".")) {
          App.playSound("wrong");
          App.showToast("Invalid Email Address", "A valid email address must contain '@' and a domain name (e.g. name@gmail.com)", "danger", "❌");
          return;
        }

        if (!sub) {
          App.playSound("wrong");
          App.showToast("Subject Missing", "Always include a clear subject so the recipient knows what your email is about.", "warning", "⚠️");
          return;
        }

        // Success Send Animation
        sendBtn.disabled = true;
        sendBtn.innerHTML = "Sending... ✉️";

        setTimeout(() => {
          sendBtn.disabled = false;
          sendBtn.innerHTML = "Send Email ✉️";
          App.playSound("correct");
          App.showToast("Email Sent Successfully!", `Your message to ${to} has been sent!`, "success", "📨");
          StorageManager.recordInternetActivity("emailComposed", true);

          // Clear inputs
          document.getElementById("emailTo").value = "";
          document.getElementById("emailSubject").value = "";
          document.getElementById("emailBody").value = "";
        }, 1200);
      });
    }
  }
};

window.InternetModule = InternetModule;
