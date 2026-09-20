# 🌐 Digital_Sakshar (डिजिटल साक्षर)

> **Digital Literacy Awareness Platform**  
> *"Learn Digital. Stay Safe. Become Digital_Sakshar."* 🌐💻🛡️

**Digital_Sakshar** is an interactive, beginner-friendly digital literacy awareness web platform built to help students, beginners, parents, teachers, and senior citizens master computers, navigate the internet safely, protect themselves from cyber fraud, improve typing speed, and earn an official printable certificate of digital literacy.

---

## 🚀 Key Features & Modules

### 1. 🏠 Home & Digital Dashboard
- **Digital Literacy Index**: Real-time progress meter (0–100%) tracking completion across all modules.
- **Daily Digital Tip**: Dynamic daily security and productivity tips (e.g., recognizing fake electricity bill SMS, OTP safety rules).
- **Senior Citizen & High-Contrast Modes**: Instant theme switcher (☀️ Light / 🌙 Dark / 👓 Senior Citizen High-Contrast) and font scaler (A / A+ / A++).
- **Web Audio Sound Effects**: Zero-latency offline sound synthesis for clicks, correct answers, wrong answers, and celebratory fanfares (with mute toggle).

### 2. 💻 Computer Basics
- **Interactive Anatomy Explorer**: Inspect the CPU, Monitor, Keyboard, Mouse, RAM, and SSD/HDD with real-world analogies and speech synthesis read-aloud.
- **Input vs Output Sorting Activity**: Hands-on sorting game with 10 devices, instant feedback, and celebration upon completion.
- **Virtual Desktop File & Folder Simulator**: A safe Windows-like desktop where beginners can practice creating folders, text notes, double-clicking to view contents, and deleting files to the Recycle Bin.
- **Interactive Paint Studio**: HTML5 Canvas drawing tool with 12 colors, brush thickness controls, eraser, and a 1-click **Download My Art** button.

### 3. 🌐 Internet Basics
- **Browser Anatomy Guide**: Interactive hotspots explaining the Address bar (URL), HTTPS padlock encryption, Back/Forward, and Bookmarks.
- **Mock Google Search Simulator**: Safe search engine simulator showing realistic search results, distinguishing verified government portals (`.gov.in`) from suspicious phishing links.
- **Safe Email Composer Simulator**: Practice composing emails with sample templates (Leave Application, Certificate Inquiry), recipient validation, and attachment simulation.
- **Download vs Upload & Wi-Fi Guide**: Visual explanation of downloading vs uploading and public Wi-Fi security rules.

### 4. 🛡️ Digital Safety & Cyber Awareness
- **Interactive Password Strength Analyzer**: Real-time password entropy gauge (Weak, Fair, Strong, Unbreakable) checking length, cases, numbers, and symbols, plus a **1-click Strong Password Generator**.
- **OTP Voice Call Scam Simulator**: Realistic telephone ring simulation with an interactive decision tree teaching RBI's golden rule: *"Banks NEVER call to ask for your OTP or PIN."*
- **Phishing & Fake Link Spotter Game**: 5 realistic scenarios (Urgent Electricity bill SMS, Lottery WhatsApp message, Fake KYC link, Legitimate bank alert, Fake job offer) with "Scam" vs "Safe" voting and red-flag analysis.
- **National Cyber Crime Helpline**: Direct awareness of Helpline **1930** and `cybercrime.gov.in`.

### 5. ⌨️ Typing Practice
- **3 Progressive Levels**:
  1. *Home Row & Alphabet Drills* (`asdf jkl;`, vowels, index stretches)
  2. *Essential Computer Words* (`mouse`, `screen`, `internet`, `password`, `sakshar`)
  3. *Digital Wisdom Sentences* (Safety guidelines and literacy quotes)
- **Live Metrics**: Real-time Words Per Minute (WPM), Accuracy percentage, Error counter, and Elapsed time.
- **Interactive Visual Keyboard**: QWERTY keyboard that highlights pressed keys and glows the target key to guide fingers.

### 6. 🧠 Interactive Quiz
- **4 Quiz Categories**: Computer Basics (10 MCQs), Internet Basics (10 MCQs), Digital Safety (10 MCQs), and Grand All-in-One Challenge (15 Mixed MCQs).
- **Instant Feedback**: Colored option cards, instant explanations for every question, and a final scorecard with badges and answer review.

### 7. 📚 Learning Resources & Marathi Dictionary
- **Educational Video Tutorials**: Embedded high-quality lessons on computer fundamentals, internet searching, and digital banking safety.
- **Study Notes Cheat Sheet**: Quick reference for top keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+S, etc.).
- **Digital Dictionary (A to Z)**: Searchable glossary with category filters and voice pronunciation.
- **Marathi ⇄ English Vocabulary**: Dedicated bilingual terminology table (e.g., Keyboard = कळफलक, Mouse = माउस, Screen = पडदा, File = संचिका, Folder = धारिका, Internet = महाजाल, Download = उतरवणे).

### 8. 📊 My Progress & Official Certificate
- **Progress Tracking**: Stored securely in browser `localStorage`.
- **8 Gamified Badges**:
  - 🥉 *Beginner Learner*
  - 📁 *File Manager*
  - 🎨 *Digital Artist*
  - 🥈 *Digital Explorer*
  - 🛡️ *Cyber Guardian*
  - ⌨️ *Key Master*
  - 🏆 *Quiz Champion*
  - 🥇 *Certified Digital Sakshar*
- **Printable Certificate Generator**: Candidate name customization, official seal, unique Sakshar Verification ID, and print-ready CSS for generating a PDF or paper certificate.

---

## 💻 How to Run Locally

### Option 1: Direct Browser Opening (Zero Setup)
Simply double-click `index.html` in your file explorer to open it in any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari).

### Option 2: Local HTTP Server (Recommended)
You can run any lightweight server in the project folder:

**Using Node.js:**
```bash
# In d:\Project\Digital_Sakshar
npx serve .
# OR
node server.js
```
Then open `http://localhost:8080` (or the port displayed in your terminal).

**Using Python:**
```bash
python -m http.server 8080
```

---

## 📂 Project Structure

```
Digital_Sakshar/
├── index.html                  # Master application shell
├── README.md                   # Project documentation
├── css/
│   ├── style.css               # Core design tokens, light/dark/senior themes
│   ├── components.css          # Navigation, cards, buttons, modals, toasts
│   ├── modules.css             # Simulators, canvas paint, typing, quiz styles
│   └── responsive.css          # Tablet/mobile styles and certificate print CSS
├── js/
│   ├── app.js                  # Main controller, audio synth, speech, router
│   ├── storage.js              # LocalStorage manager for progress & badges
│   ├── computer-basics.js      # Anatomy, sorting game, desktop sim, canvas paint
│   ├── internet-basics.js      # Browser simulator, mock search engine, email
│   ├── safety.js               # Password analyzer, OTP call, phishing game
│   ├── typing.js               # Typing tutor, visual keyboard, WPM engine
│   ├── quiz.js                 # Quiz runner, instant feedback, scorecard
│   ├── resources.js            # Video player, dictionary, Marathi terms
│   ├── progress.js             # Progress bars, badges, certificate generator
│   └── data/
│       ├── dictionary-data.js  # A-Z digital terms + Marathi translations
│       ├── quiz-data.js        # Question banks across all categories
│       └── typing-data.js      # Key drills, words, and safety sentences
```

---

## 🇮🇳 Educational Impact
Digital_Sakshar was created to bridge the digital divide by making essential computing, internet navigation, and cyber defense accessible to everyone, everywhere.
