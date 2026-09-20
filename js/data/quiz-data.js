/**
 * Digital_Sakshar - Quiz Question Bank
 * Categorized MCQs with 4 options, explanations, and bilingual clarity.
 */

const QUIZ_DATA = {
  computer: {
    title: "Computer Basics Quiz (संगणक मूलभूत चाचणी)",
    icon: "💻",
    description: "Test your understanding of computer parts, hardware, software, and everyday uses.",
    questions: [
      {
        id: "c1",
        question: "Which component is known as the 'Brain' of the computer?",
        marathiSub: "संगणकाचा 'मेंदू' म्हणून कोणता घटक ओळखला जातो?",
        options: ["Monitor", "CPU (Central Processing Unit)", "Keyboard", "Mouse"],
        correctIndex: 1,
        explanation: "The CPU (Central Processing Unit) processes all data, instructions, and calculations, acting as the brain of the computer."
      },
      {
        id: "c2",
        question: "Which of the following is an INPUT device?",
        marathiSub: "खालीलपैकी कोणते इनपुट साधन (Input Device) आहे?",
        options: ["Printer", "Speaker", "Keyboard", "Projector"],
        correctIndex: 2,
        explanation: "A Keyboard is an input device used to enter letters, numbers, and commands into the computer."
      },
      {
        id: "c3",
        question: "What is the primary function of a Monitor?",
        marathiSub: "मॉनिटरचे मुख्य कार्य काय आहे?",
        options: [
          "To print files on paper",
          "To display visual output like text, images, and videos",
          "To store files permanently",
          "To supply power to the CPU"
        ],
        correctIndex: 1,
        explanation: "A monitor is an output device that visually displays information, photos, text, and videos on screen."
      },
      {
        id: "c4",
        question: "What does RAM stand for?",
        marathiSub: "RAM चे पूर्ण रूप काय आहे?",
        options: [
          "Read Access Memory",
          "Random Access Memory",
          "Rapid Action Module",
          "Remote Application Memory"
        ],
        correctIndex: 1,
        explanation: "RAM stands for Random Access Memory. It is high-speed temporary memory holding active applications."
      },
      {
        id: "c5",
        question: "Which of the following is an example of System Software (Operating System)?",
        marathiSub: "खालीलपैकी कोणती कार्यप्रणाली (Operating System) आहे?",
        options: ["Microsoft Windows", "MS Paint", "Calculator", "WhatsApp"],
        correctIndex: 0,
        explanation: "Microsoft Windows is an Operating System that manages all hardware components and software programs."
      },
      {
        id: "c6",
        question: "Where do deleted files typically go on a Windows computer?",
        marathiSub: "संगणकावरून हटवलेल्या फाइल्स साधारणतः कोठे जमा होतात?",
        options: ["Control Panel", "Recycle Bin", "My Documents", "Internet"],
        correctIndex: 1,
        explanation: "Deleted files are temporarily stored in the Recycle Bin, allowing you to restore them if deleted by accident."
      },
      {
        id: "c7",
        question: "Which shortcut key is commonly used to COPY selected text or files?",
        marathiSub: "निवडलेला मजकूर किंवा फाइल कॉपी करण्यासाठी कोणता शॉर्टकट वापरतात?",
        options: ["Ctrl + V", "Ctrl + C", "Ctrl + Z", "Ctrl + P"],
        correctIndex: 1,
        explanation: "Ctrl + C is used to Copy, while Ctrl + V is used to Paste."
      },
      {
        id: "c8",
        question: "Which of these devices is an OUTPUT device?",
        marathiSub: "यापैकी कोणते आऊटपुट साधन (Output Device) आहे?",
        options: ["Microphone", "Webcam", "Printer", "Barcode Scanner"],
        correctIndex: 2,
        explanation: "A Printer gives physical output by printing digital documents on sheets of paper."
      },
      {
        id: "c9",
        question: "What is a 'Folder' used for in a computer?",
        marathiSub: "संगणकामध्ये 'फोल्डर' कशासाठी वापरले जाते?",
        options: [
          "To clean dust from the monitor",
          "To group and organize multiple files neatly",
          "To browse websites",
          "To speed up internet connection"
        ],
        correctIndex: 1,
        explanation: "Folders are digital containers used to organize, group, and manage files systematically."
      },
      {
        id: "c10",
        question: "Which storage device retains your files permanently even after turning off power?",
        marathiSub: "संगणक बंद केल्यावरही कोणती मेमरी माहिती कायमस्वरूपी सुरक्षित ठेवते?",
        options: ["RAM", "Hard Disk / SSD", "Cache Memory", "CPU Registers"],
        correctIndex: 1,
        explanation: "Hard Disks and SSDs provide permanent, non-volatile storage for your photos, files, and programs."
      }
    ]
  },

  internet: {
    title: "Internet Basics Quiz (इंटरनेट मूलभूत चाचणी)",
    icon: "🌐",
    description: "Test your skills on web browsing, search engines, emails, Wi-Fi, and downloads.",
    questions: [
      {
        id: "i1",
        question: "What is the global network of connected computers called?",
        marathiSub: "जगभरातील जोडलेल्या संगणकांच्या जागतिक नेटवर्कला काय म्हणतात?",
        options: ["Intranet", "The Internet", "Bluetooth", "Ethernet Local"],
        correctIndex: 1,
        explanation: "The Internet is the global network connecting billions of computers, phones, and servers worldwide."
      },
      {
        id: "i2",
        question: "Which application is used to view websites on the internet?",
        marathiSub: "इंटरनेटवरील वेबसाइट पाहण्यासाठी कोणते ॲप वापरले जाते?",
        options: ["Web Browser (e.g. Chrome, Firefox)", "MS Paint", "Notepad", "Media Player"],
        correctIndex: 0,
        explanation: "A Web Browser (like Google Chrome, Microsoft Edge, Safari, or Firefox) renders and displays websites."
      },
      {
        id: "i3",
        question: "In a website address, what does 'https://' indicate?",
        marathiSub: "वेबसाइटच्या पत्त्यातील 'https://' चा काय अर्थ होतो?",
        options: [
          "The website is completely free",
          "The connection is encrypted and secure with SSL",
          "The website belongs to the government",
          "The website has high downloading speed"
        ],
        correctIndex: 1,
        explanation: "'https://' stands for Hypertext Transfer Protocol Secure, meaning data exchanged with the site is encrypted."
      },
      {
        id: "i4",
        question: "What is the process of getting a file from the internet onto your device called?",
        marathiSub: "इंटरनेटवरून एखादी फाइल आपल्या उपकरणावर घेण्याच्या प्रक्रियेला काय म्हणतात?",
        options: ["Uploading", "Downloading", "Broadcasting", "Buffering"],
        correctIndex: 1,
        explanation: "Downloading means receiving or saving files from the internet onto your local computer or phone."
      },
      {
        id: "i5",
        question: "Which symbol is mandatory in every valid email address?",
        marathiSub: "कोणत्याही वैध ईमेल पत्त्यामध्ये कोणते चिन्ह असणे आवश्यक असते?",
        options: ["#", "$", "@", "&"],
        correctIndex: 2,
        explanation: "The '@' (at) symbol separates the user's username from the mail service provider domain (e.g., student@gmail.com)."
      },
      {
        id: "i6",
        question: "What is a Search Engine used for?",
        marathiSub: "शोध यंत्राचा (Search Engine) वापर कशासाठी होतो?",
        options: [
          "To repair physical computer parts",
          "To find websites, images, and information on the web",
          "To draw computer sketches",
          "To recharge mobile battery"
        ],
        correctIndex: 1,
        explanation: "A search engine like Google or Bing scans the web to return relevant results for questions or keywords you enter."
      },
      {
        id: "i7",
        question: "What does Wi-Fi allow devices to do?",
        marathiSub: "वाय-फाय (Wi-Fi) मुळे काय करता येते?",
        options: [
          "Connect to a local network and internet without cables",
          "Clean computer viruses automatically",
          "Double the CPU processing speed",
          "Print pages in full color"
        ],
        correctIndex: 0,
        explanation: "Wi-Fi is a wireless networking technology that allows devices to connect to internet routers using radio waves."
      },
      {
        id: "i8",
        question: "Where do unsolicited or unwanted promotional/fraudulent emails usually get filtered?",
        marathiSub: "अनोळखी किंवा संशयास्पद ईमेल साधारणतः कोणत्या फोल्डरमध्ये जमा होतात?",
        options: ["Inbox", "Outbox", "Spam / Junk Folder", "Starred"],
        correctIndex: 2,
        explanation: "Spam or Junk mail folders collect suspicious, unsolicited, or bulk marketing emails automatically."
      },
      {
        id: "i9",
        question: "What is a 'Bookmark' in a web browser?",
        marathiSub: "वेब ब्राउझरमध्ये 'बुकमार्क' चा काय फायदा होतो?",
        options: [
          "A virtual bookmark to save and quickly revisit favorite websites",
          "A password protector",
          "A download accelerator",
          "An antivirus plugin"
        ],
        correctIndex: 0,
        explanation: "Bookmarks allow you to save web addresses so you can return to your favorite sites with one click."
      },
      {
        id: "i10",
        question: "What is 'Uploading'?",
        marathiSub: "'अपलोडिंग' (Uploading) म्हणजे काय?",
        options: [
          "Restarting the computer",
          "Sending a photo or document from your phone/PC to the internet",
          "Closing all open windows",
          "Upgrading RAM"
        ],
        correctIndex: 1,
        explanation: "Uploading is the action of transmitting files from your device up to a remote server or social platform."
      }
    ]
  },

  safety: {
    title: "Digital Safety & Cyber Awareness (डिजिटल सुरक्षा चाचणी)",
    icon: "🛡️",
    description: "Assess your readiness against cyber scams, fake links, weak passwords, and OTP fraud.",
    questions: [
      {
        id: "s1",
        question: "A caller claiming to be a Bank Manager asks for your 6-digit OTP to unblock your card. What should you do?",
        marathiSub: "बँक व्यवस्थापक असल्याचा दावा करणाऱ्या व्यक्तीने कार्ड चालू ठेवण्यासाठी OTP मागितला तर काय करावे?",
        options: [
          "Immediately give the OTP so your card remains active",
          "Refuse immediately, never share OTP, and report to the bank",
          "Give only the first 3 digits of the OTP",
          "Share the OTP and ask for their employee ID later"
        ],
        correctIndex: 1,
        explanation: "Golden Rule: Real banks and RBI never ask for OTPs or PINs. Never share your OTP with anyone under any circumstances!"
      },
      {
        id: "s2",
        question: "Which of the following is considered a STRONG password?",
        marathiSub: "खालीलपैकी कोणता पासवर्ड सर्वात मजबूत (Strong) मानला जाईल?",
        options: [
          "12345678",
          "password2026",
          "Sanket@123",
          "Tr#9qM$2k!Pz9"
        ],
        correctIndex: 3,
        explanation: "Strong passwords combine uppercase letters, lowercase letters, numbers, and special symbols with at least 10-12 characters, avoiding common names."
      },
      {
        id: "s3",
        question: "What is 'Phishing' in cyber security?",
        marathiSub: "सायबर सुरक्षेत 'फिशिंग' (Phishing) म्हणजे काय?",
        options: [
          "Catching digital fish in a video game",
          "Fraudulent messages or fake websites designed to steal passwords and financial info",
          "Fixing hardware bugs in a computer",
          "Cleaning the browser history"
        ],
        correctIndex: 1,
        explanation: "Phishing is a social engineering attack where cybercriminals trick users into sharing confidential credentials using fake urgency."
      },
      {
        id: "s4",
        question: "You receive an SMS: 'Your electricity power will be disconnected tonight. Pay ₹10 immediately at http://bijli-bill-quick.xyz'. What is this?",
        marathiSub: "'वीज खंडित होईल, लगेच १० रुपये भरा' असा मेसेज आला तर हा कोणता प्रकार आहे?",
        options: [
          "An official government message that must be paid instantly",
          "A classic cyber scam using urgency to steal your banking details",
          "A benign mobile recharge reminder",
          "A system software update alert"
        ],
        correctIndex: 1,
        explanation: "Scammers create artificial panic with fake electricity disconnection threats. Genuine electricity boards send official notices with customer consumer numbers."
      },
      {
        id: "s5",
        question: "Why should you be cautious when using free public Wi-Fi at railway stations or cafes?",
        marathiSub: "रेल्वे स्थानक किंवा कॅफेमधील मोफत सार्वजनिक वाय-फाय वापरताना सावध का राहावे?",
        options: [
          "It can drain phone battery faster",
          "Unencrypted public Wi-Fi can allow cyber criminals on the same network to snoop on your data",
          "Public Wi-Fi turns off phone Bluetooth",
          "It permanently deletes phone contacts"
        ],
        correctIndex: 1,
        explanation: "Public Wi-Fi networks often lack strong encryption, meaning hackers can intercept unencrypted data. Avoid online banking on open public Wi-Fi."
      },
      {
        id: "s6",
        question: "What does 'Two-Factor Authentication' (2FA) do?",
        marathiSub: "टू-फॅक्टर ऑथेंटिकेशन (2FA) मुळे काय संरक्षण मिळते?",
        options: [
          "It requires two different monitors to log in",
          "It adds a second layer of security (like an OTP or biometric) beyond just a password",
          "It doubles the typing speed of your keyboard",
          "It creates two identical copies of every file"
        ],
        correctIndex: 1,
        explanation: "2FA requires both your password AND a verification code from your phone or authenticator app, keeping your account safe even if your password leaks."
      },
      {
        id: "s7",
        question: "How can you tell if a website link might be FAKE or suspicious?",
        marathiSub: "एखादी लिंक बनावट किंवा संशयास्पद असू शकते हे कसे ओळखावे?",
        options: [
          "It has spelling variations like 'g00gle.com' or 'sbi-update.top'",
          "It lacks the secure padlock icon or uses unusual domain extensions",
          "It promises free money, lottery wins, or urgent account recovery",
          "All of the above"
        ],
        correctIndex: 3,
        explanation: "All of these are primary red flags! Fraudulent links often contain subtle misspellings, strange domains, and lure victims with greed or panic."
      },
      {
        id: "s8",
        question: "What is the best practice for social media privacy?",
        marathiSub: "सोशल मीडियावर खाजगी माहिती सुरक्षित ठेवण्याचा उत्तम मार्ग कोणता?",
        options: [
          "Accept friend requests from every unknown stranger",
          "Keep your profile private and avoid sharing Aadhaar, PAN, home address, or travel plans publicly",
          "Post your phone number on your public bio so friends can call you",
          "Use your birth date as your master password"
        ],
        correctIndex: 1,
        explanation: "Protect your privacy by keeping profiles restricted to trusted people and never posting sensitive documents like Aadhaar, PAN, or tickets publicly."
      },
      {
        id: "s9",
        question: "What should you do if you realize you mistakenly entered your debit card details on a fake phishing website?",
        marathiSub: "बनावट वेबसाइटवर चुकून बँक कार्ड तपशील भरले गेले तर त्वरित काय करावे?",
        options: [
          "Wait a month to see if money gets deducted",
          "Immediately block your card via bank app/helpline and report to Cyber Crime Helpline (1930)",
          "Turn off your phone and hope nothing happens",
          "Delete the SMS from your phone"
        ],
        correctIndex: 1,
        explanation: "Act immediately! Block the card via your bank app or customer helpline, change your passwords, and report the fraud at cybercrime.gov.in or helpline 1930."
      },
      {
        id: "s10",
        question: "What is the official National Cyber Crime Reporting Portal Helpline number in India?",
        marathiSub: "भारतातील राष्ट्रीय सायबर गुन्हे नोंदणी हेल्पलाइन क्रमांक कोणता आहे?",
        options: ["100", "1930", "108", "139"],
        correctIndex: 1,
        explanation: "Helpline 1930 is the official citizen financial cyber fraud reporting helpline in India."
      }
    ]
  }
};
