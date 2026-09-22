/**
 * Digital_Sakshar - Quiz Question Bank
 * Categorized MCQs with 4 options, explanations, and bilingual clarity.
 * Categories:
 * 1. Computer Basics (10 MCQs)
 * 2. Practical Computer Skills (10 MCQs)
 * 3. Internet Basics (10 MCQs)
 * 4. Grand Digital_Sakshar Challenge (15 Mixed MCQs from the 3 modules)
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
        options: ["Microsoft Windows", "MS Paint", "Calculator", "VLC Media Player"],
        correctIndex: 0,
        explanation: "Microsoft Windows is an Operating System that manages all hardware components and software programs."
      },
      {
        id: "c6",
        question: "Which device produces physical hard-copy prints on paper?",
        marathiSub: "कागदावर प्रत्यक्ष प्रिंट काढण्यासाठी कोणते साधन वापरले जाते?",
        options: ["Scanner", "Webcam", "Printer (मुद्रक)", "Microphone"],
        correctIndex: 2,
        explanation: "A Printer is an output device that prints digital documents, text, and images onto physical paper."
      },
      {
        id: "c7",
        question: "Which component outputs sound, music, and voice from the computer?",
        marathiSub: "संगणकामधून आवाज, गाणी आणि संवाद ऐकण्यासाठी कोणते साधन वापरतात?",
        options: ["Speakers (स्पीकर्स)", "Monitor", "RAM", "Mouse"],
        correctIndex: 0,
        explanation: "Speakers are audio output devices that convert electrical audio signals into audible sound waves."
      },
      {
        id: "c8",
        question: "What is the key difference between Hardware and Software?",
        marathiSub: "हार्डवेअर आणि सॉफ्टवेअरमधील मुख्य फरक काय आहे?",
        options: [
          "Hardware is physical parts you can touch; Software is programs and instructions",
          "Hardware runs on battery; Software runs on solar power",
          "Hardware is free; Software is always paid",
          "Hardware connects to internet; Software cannot connect"
        ],
        correctIndex: 0,
        explanation: "Hardware refers to tangible physical machinery (Monitor, CPU, Keyboard), while Software consists of intangible digital code and apps."
      },
      {
        id: "c9",
        question: "In which fields are computers widely used today?",
        marathiSub: "आज संगणकाचा वापर कोणत्या क्षेत्रात मोठ्या प्रमाणावर केला जातो?",
        options: [
          "Only gaming",
          "Education, Banking, Healthcare, and Daily Communication",
          "Only drawing pictures",
          "Only calculating numbers"
        ],
        correctIndex: 1,
        explanation: "Computers are essential modern tools powering schools, digital banking, hospital healthcare, and global communications."
      },
      {
        id: "c10",
        question: "Which storage device retains your files permanently even after power is turned off?",
        marathiSub: "संगणक बंद केल्यावरही कोणती मेमरी माहिती कायमस्वरूपी सुरक्षित ठेवते?",
        options: ["RAM", "SSD / Hard Disk", "Cache Memory", "CPU Register"],
        correctIndex: 1,
        explanation: "Hard Disks and SSDs provide permanent, non-volatile storage for your photos, files, and programs."
      }
    ]
  },

  practical: {
    title: "Practical Computer Skills Quiz (प्रात्यक्षिक संगणक कौशल्ये चाचणी)",
    icon: "🖥️",
    description: "Test your practical skills on Paint, folders, Notepad, copy-paste, renaming, deletion, mouse, and keyboard operations.",
    questions: [
      {
        id: "p1",
        question: "Which Windows application is commonly used for basic drawing, coloring, and shapes?",
        marathiSub: "चित्रे काढण्यासाठी आणि रंग भरण्यासाठी कोणते मूलभूत ॲप वापरले जाते?",
        options: ["MS Paint", "Notepad", "Calculator", "Recycle Bin"],
        correctIndex: 0,
        explanation: "Microsoft Paint is a built-in beginner-friendly drawing tool for freehand sketching, shapes, and colors."
      },
      {
        id: "p2",
        question: "What is the correct step to create a new folder on the Windows Desktop?",
        marathiSub: "डेस्कटॉपवर नवीन फोल्डर तयार करण्यासाठी योग्य कृती कोणती?",
        options: [
          "Double click Recycle Bin",
          "Right Click on Desktop → New → Folder",
          "Press Ctrl + Alt + Delete",
          "Click Start Menu → Shut down"
        ],
        correctIndex: 1,
        explanation: "To create a folder, right-click on an empty space on Desktop, select 'New' from the context menu, and click 'Folder'."
      },
      {
        id: "p3",
        question: "Which simple program is used to write, edit, and save plain text files (.txt)?",
        marathiSub: "साधा मजकूर लिहिण्यासाठी आणि जतन (.txt) करण्यासाठी कोणता प्रोग्राम वापरतात?",
        options: ["Notepad", "Paint", "Media Player", "Task Manager"],
        correctIndex: 0,
        explanation: "Notepad is a lightweight built-in text editor ideal for typing quick notes and saving .txt files."
      },
      {
        id: "p4",
        question: "Which shortcut is used to COPY selected text or a file?",
        marathiSub: "निवडलेला मजकूर किंवा फाइल कॉपी करण्यासाठी कोणता shortcut वापरला जातो?",
        options: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"],
        correctIndex: 1,
        explanation: "Ctrl + C copies the selected item or text to your computer's clipboard without deleting the original."
      },
      {
        id: "p5",
        question: "Which shortcut is used to PASTE the copied content into its destination?",
        marathiSub: "कॉपी केलेला मजकूर किंवा फाइल नवीन जागी पेस्ट (ठेवण्यासाठी) कोणता शॉर्टकट वापरतात?",
        options: ["Ctrl + P", "Ctrl + S", "Ctrl + V", "Ctrl + C"],
        correctIndex: 2,
        explanation: "Ctrl + V pastes items from the clipboard into your currently focused folder or document."
      },
      {
        id: "p6",
        question: "What does the shortcut Ctrl + Z do?",
        marathiSub: "Ctrl + Z या शॉर्टकट की चे कार्य काय आहे?",
        options: [
          "Undo the last action (शेवटची कृती पूर्ववत करणे)",
          "Cut selected text",
          "Close the window",
          "Zoom in on screen"
        ],
        correctIndex: 0,
        explanation: "Ctrl + Z is the universal Undo command that reverses your most recent action or deletion."
      },
      {
        id: "p7",
        question: "Which keyboard key allows you to quickly RENAME a selected file or folder?",
        marathiSub: "निवडलेली फाइल किंवा फोल्डरचे नाव बदलण्यासाठी (Rename) कोणती की दाबावी?",
        options: ["F1", "F2", "F5", "Esc"],
        correctIndex: 1,
        explanation: "Pressing F2 on a selected file or folder immediately highlights its name, allowing you to type a new name."
      },
      {
        id: "p8",
        question: "Where do deleted files go, and how can you get them back if deleted by mistake?",
        marathiSub: "डिलीट केलेल्या फाइल्स कोठे जातात आणि चुकून डिलीट झाल्यास त्या कशा परत आणता येतात?",
        options: [
          "They go to Recycle Bin; open it and click 'Restore'",
          "They are lost forever immediately",
          "They go to the web browser",
          "They get saved in MS Paint"
        ],
        correctIndex: 0,
        explanation: "Files deleted from normal drives are placed in the Recycle Bin. You can open it, right-click the file, and select 'Restore'."
      },
      {
        id: "p9",
        question: "Which mouse action is used to open files, folders, or launch desktop programs?",
        marathiSub: "फाइल किंवा फोल्डर उघडण्यासाठी माउसची कोणती कृती वापरली जाते?",
        options: [
          "Double Click (डावे बटण सलग दोनदा दाबणे)",
          "Right Click once",
          "Scroll wheel up",
          "Hold mouse in air"
        ],
        correctIndex: 0,
        explanation: "Double-clicking the left mouse button quickly opens folders, executes desktop shortcuts, and launches applications."
      },
      {
        id: "p10",
        question: "Which shortcut quickly saves your active document or project?",
        marathiSub: "सुरू असलेली फाइल किंवा कागदपत्र झटपट सेव्ह (Save) करण्यासाठी कोणता शॉर्टकट वापरतात?",
        options: ["Ctrl + S", "Ctrl + O", "Ctrl + N", "Alt + F4"],
        correctIndex: 0,
        explanation: "Ctrl + S is the universal save shortcut that prevents loss of unsaved changes."
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
        options: ["Web Browser (e.g. Chrome, Edge, Firefox)", "MS Paint", "Notepad", "Media Player"],
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
        explanation: "A search engine like Google scans the web to return relevant results for questions or keywords you enter."
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
        question: "What is the main purpose of the 'Subject' line in an email?",
        marathiSub: "ईमेलमधील 'Subject' (विषय) चा मुख्य उद्देश काय असतो?",
        options: [
          "To write your email password",
          "To provide a brief summary of what the email is about",
          "To attach heavy video files",
          "To mention the sender's mobile number"
        ],
        correctIndex: 1,
        explanation: "The Subject line briefly informs the recipient what your message is about before they open it."
      },
      {
        id: "i9",
        question: "What is a 'Bookmark' in a web browser?",
        marathiSub: "वेब ब्राउझरमध्ये 'बुकमार्क' चा काय फायदा होतो?",
        options: [
          "A virtual shortcut to save and quickly revisit favorite websites",
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
        explanation: "Uploading is the action of transmitting files from your device up to a remote server, portal, or email attachment."
      }
    ]
  },

  allInOne: {
    title: "Grand Digital_Sakshar Challenge (महा डिजिटल साक्षर आव्हान)",
    icon: "🏆",
    description: "A comprehensive 15-question mixed challenge across Computer Basics, Practical Skills, and Internet Basics.",
    questions: [] // Populated dynamically in QuizModule.startQuiz()
  }
};

window.QUIZ_DATA = QUIZ_DATA;
