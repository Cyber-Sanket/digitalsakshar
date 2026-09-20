/**
 * Digital_Sakshar - Digital Dictionary Data
 * Comprehensive glossary of essential computer & internet terminology
 * with simplified English definitions and Marathi (मराठी) translations.
 */

const DICTIONARY_DATA = [
  {
    term: "Computer",
    marathi: "संगणक (Sanganak)",
    category: "Hardware",
    definition: "An electronic machine that takes data (input), processes it, and gives useful results (output).",
    marathiDef: "एक इलेक्ट्रॉनिक यंत्र जे माहिती स्वीकारते, त्यावर प्रक्रिया करते आणि उपयुक्त निकाल देते.",
    example: "Laptops, desktops, and tablets are all types of computers."
  },
  {
    term: "CPU (Central Processing Unit)",
    marathi: "मध्यवर्ती प्रक्रिया केंद्र (Madhyavarti Prakriya Kendra)",
    category: "Hardware",
    definition: "The 'brain' of the computer that performs calculations and controls all other parts.",
    marathiDef: "संगणकाचा 'मेंदू' जो सर्व गणिते आणि इतर भागांचे नियंत्रण करतो.",
    example: "When you open an app or click a button, the CPU executes the instructions."
  },
  {
    term: "Monitor / Screen",
    marathi: "पडदा / मॉनिटर (Parda / Monitor)",
    category: "Hardware",
    definition: "The display screen that shows visual output like text, photos, and videos.",
    marathiDef: "एक स्क्रीन ज्यावर संगणकाचे चित्र, मजकूर आणि व्हिडीओ दिसतात.",
    example: "You are looking at a monitor or phone screen right now!"
  },
  {
    term: "Keyboard",
    marathi: "कळफलक (Kalphalk)",
    category: "Hardware",
    definition: "An input device with letter, number, and function keys used to type text and give commands.",
    marathiDef: "अक्षरे, आकडे आणि आज्ञा टाईप करण्यासाठी वापरले जाणारे साधनाचे साधन.",
    example: "Pressing keys on the keyboard allows you to write letters and emails."
  },
  {
    term: "Mouse",
    marathi: "माउस / दर्शक साधन (Mouse)",
    category: "Hardware",
    definition: "A handheld pointing device that controls the arrow cursor on the screen.",
    marathiDef: "पडद्यावरील बाण (कर्सर) हलवण्यासाठी आणि क्लिक करण्यासाठी वापरले जाणारे साधन.",
    example: "Clicking the left mouse button opens files and links."
  },
  {
    term: "RAM (Random Access Memory)",
    marathi: "अल्पकालीन मेमरी (Alpkalin Memory)",
    category: "Hardware",
    definition: "Fast temporary memory used by the computer to hold apps and data currently in use.",
    marathiDef: "संगणकाची तात्पुरती जलद स्मरणशक्ती, जी चालू कामांसाठी वापरली जाते.",
    example: "More RAM allows your computer to run multiple programs smoothly at once."
  },
  {
    term: "Hard Disk / SSD (Storage)",
    marathi: "साठवण यंत्र (Sathvan Yantra / Storage)",
    category: "Hardware",
    definition: "The permanent storage device where files, photos, songs, and software are safely kept.",
    marathiDef: "कायमस्वरूपी माहिती, फोटो आणि फाइल्स साठवून ठेवणारे साधन.",
    example: "Even when you turn off the computer, files on the SSD or Hard Disk are not lost."
  },
  {
    term: "Operating System (OS)",
    marathi: "कार्यप्रणाली (Karyapranali / OS)",
    category: "Software",
    definition: "Master software that manages computer hardware and allows you to run other programs.",
    marathiDef: "मुख्य सॉफ्टवेअर जे संपूर्ण संगणक यंत्रणा चालवते (उदा. Windows, Android).",
    example: "Windows 11, macOS, and Android are popular operating systems."
  },
  {
    term: "Software / App",
    marathi: "सॉफ्टवेअर / ॲप (Software / App)",
    category: "Software",
    definition: "A set of coded instructions or programs that tell the computer what task to perform.",
    marathiDef: "संगणक किंवा मोबाईलवर विविध कामे करण्यासाठी वापरल्या जाणाऱ्या आज्ञावलींचा संच.",
    example: "Calculator, Paint, WhatsApp, and Google Chrome are software applications."
  },
  {
    term: "File",
    marathi: "संचिका (Sanchika / File)",
    category: "Software",
    definition: "A digital container that stores specific information like text, a photo, or an audio song.",
    marathiDef: "कोणतीही डिजिटल माहिती, दस्तऐवज किंवा फोटो साठवणारे एकक.",
    example: "A photo saved as 'photo.jpg' or a letter saved as 'letter.docx'."
  },
  {
    term: "Folder",
    marathi: "धारिका (Dharika / Folder)",
    category: "Software",
    definition: "A virtual folder used to organize and group multiple files together neatly.",
    marathiDef: "अनेक फाइल्स एकत्र आणि व्यवस्थित ठेवण्यासाठी तयार केलेले डिजिटल कपाट किंवा फोल्डर.",
    example: "You can create a folder named 'School Project' to store all relevant documents."
  },
  {
    term: "Internet",
    marathi: "महाजाल / आंतरजाल (Mahajaal / Antarjaal)",
    category: "Internet",
    definition: "A massive global network connecting millions of computers to share information instantly.",
    marathiDef: "जगभरातील संगणक आणि मोबाईल एकमेकांशी जोडणारे जागतिक नेटवर्क.",
    example: "The internet enables online video calls, shopping, news reading, and learning."
  },
  {
    term: "Web Browser",
    marathi: "वेब ब्राउझर (Web Browser)",
    category: "Internet",
    definition: "An application used to open, view, and navigate websites on the World Wide Web.",
    marathiDef: "इंटरनेटवरील वेगवेगळ्या वेबसाइट्स पाहण्यासाठी वापरले जाणारे सॉफ्टवेअर.",
    example: "Google Chrome, Mozilla Firefox, and Microsoft Edge are web browsers."
  },
  {
    term: "URL / Web Address",
    marathi: "वेबसाइटचा पत्ता (Website Patta / URL)",
    category: "Internet",
    definition: "The unique address of a web page on the internet (starts with https://).",
    marathiDef: "इंटरनेटवरील कोणत्याही पानाचा किंवा साइटचा विशिष्ट पत्ता.",
    example: "https://www.google.com is a URL."
  },
  {
    term: "Search Engine",
    marathi: "शोध यंत्र (Shodh Yantra / Search Engine)",
    category: "Internet",
    definition: "A website that helps you find information, articles, images, and answers on the web.",
    marathiDef: "इंटरनेटवरून कोणतीही माहिती शोधून देणारी यंत्रणा.",
    example: "Google, Bing, and DuckDuckGo are search engines."
  },
  {
    term: "Download",
    marathi: "उतरवणे (Utrvane / Download)",
    category: "Internet",
    definition: "Copying or receiving a file from the internet onto your computer or phone.",
    marathiDef: "इंटरनेटवरून एखादी फाइल, फोटो किंवा गाणे आपल्या संगणकात किंवा फोनमध्ये घेणे.",
    example: "Downloading your train ticket PDF to your phone."
  },
  {
    term: "Upload",
    marathi: "चढवणे (Chadhvane / Upload)",
    category: "Internet",
    definition: "Sending a file or photo from your personal device onto the internet or a server.",
    marathiDef: "आपल्या मोबाईल किंवा संगणकावरून एखादी फाइल इंटरनेटवर पाठवणे.",
    example: "Uploading your photo on WhatsApp or submitting an online exam form."
  },
  {
    term: "Wi-Fi",
    marathi: "वायरलेस इंटरनेट (Wi-Fi)",
    category: "Internet",
    definition: "A wireless technology that connects devices to the internet without physical cables.",
    marathiDef: "विना वायर इंटरनेट जोडणी देणारे तंत्रज्ञान.",
    example: "Connecting your phone to home Wi-Fi to browse without using mobile cellular data."
  },
  {
    term: "Email",
    marathi: "विद्युत टपाल (Vidyut Tapal / Email)",
    category: "Internet",
    definition: "Electronic mail sent over the internet from one user to another within seconds.",
    marathiDef: "इंटरनेटद्वारे क्षणार्धात संदेश, कागदपत्रे पाठवण्याची डिजिटल टपाल पद्धत.",
    example: "Sending an official leave letter to your teacher via Gmail."
  },
  {
    term: "Password",
    marathi: "गुप्तशब्द / सांकेतिक शब्द (Guptashabd)",
    category: "Safety",
    definition: "A secret sequence of characters used to confirm identity and unlock access to an account.",
    marathiDef: "आपले खाते किंवा खाजगी माहिती सुरक्षित ठेवण्यासाठी वापरला जाणारा गोपनीय शब्द.",
    example: "A strong password like 'Sanket#Learn2026!' protects your email from hackers."
  },
  {
    term: "OTP (One Time Password)",
    marathi: "एकवेळचा गुप्तशब्द (One Time Password)",
    category: "Safety",
    definition: "A temporary 4 or 6 digit security code sent to your phone valid for only one transaction.",
    marathiDef: "केवळ एकदाच वापरता येणारा आणि काही मिनिटांत कालबाह्य होणारा गोपनीय सुरक्षा क्रमांक.",
    example: "Never share your bank transaction OTP with anyone over the phone!"
  },
  {
    term: "Phishing",
    marathi: "फसवणूक / डिजिटल गंडा (Phishing / Cyber Scam)",
    category: "Safety",
    definition: "A cyber crime where scammers impersonate trusted banks or companies to steal passwords or money.",
    marathiDef: "बनावट मेसेज किंवा लिंक पाठवून लोकांची बँक खाती किंवा पासवर्ड चोरण्याचा सायबर गुन्हा.",
    example: "A message saying 'Click here to claim ₹50,000 lottery' is a typical phishing scam."
  },
  {
    term: "Malware / Virus",
    marathi: "विघातक संगणक विषाणू (Vighatak Sanganak Vishanu)",
    category: "Safety",
    definition: "Harmful software designed to damage, steal data, or slow down your computer.",
    marathiDef: "संगणकाला किंवा मोबाईलला हानी पोहोचवणारे आणि माहिती चोरणारे वाईट सॉफ्टवेअर.",
    example: "Installing a trusted Antivirus protects your computer from viruses."
  },
  {
    term: "Firewall",
    marathi: "सुरक्षा भिंत (Suraksha Bhint / Firewall)",
    category: "Safety",
    definition: "A digital security barrier that monitors and blocks unauthorized internet traffic.",
    marathiDef: "अनोळखी आणि धोकादायक इंटरनेट संपर्कांना रोखणारी सुरक्षा भिंत.",
    example: "A firewall stops hackers from gaining remote access to your computer network."
  },
  {
    term: "Cloud Storage",
    marathi: "क्लाउड स्टोरेज / आभासी साठवणूक (Cloud Storage)",
    category: "Internet",
    definition: "Storing files on secure remote internet servers instead of just on your local device.",
    marathiDef: "इंटरनेटवरील सुरक्षित सर्व्हरवर फोटो आणि फाइल्स सुरक्षित ठेवण्याची पद्धत.",
    example: "Google Drive and Microsoft OneDrive are popular cloud storage services."
  }
];

// Marathi ⇄ English Vocabulary Quick Table
const MARATHI_TERMS_TABLE = [
  { english: "Computer", marathi: "संगणक", phonetic: "Sanganak", context: "Electronic computing device" },
  { english: "Monitor / Screen", marathi: "पडदा", phonetic: "Parda", context: "Visual display" },
  { english: "Keyboard", marathi: "कळफलक", phonetic: "Kalphalk", context: "Typing keys board" },
  { english: "Mouse", marathi: "माउस / दर्शक", phonetic: "Mouse", context: "Pointing device" },
  { english: "Printer", marathi: "मुद्रक", phonetic: "Mudrak", context: "Prints on physical paper" },
  { english: "Internet", marathi: "महाजाल / आंतरजाल", phonetic: "Mahajaal", context: "Global web network" },
  { english: "Website", marathi: "संकेतस्थळ", phonetic: "Sanketasthal", context: "Web location / portal" },
  { english: "File", marathi: "संचिका", phonetic: "Sanchika", context: "Document or item" },
  { english: "Folder", marathi: "धारिका", phonetic: "Dharika", context: "Group container for files" },
  { english: "Password", marathi: "गुप्तशब्द", phonetic: "Guptashabd", context: "Secret security word" },
  { english: "Download", marathi: "उतरवणे", phonetic: "Utrvane", context: "Get file from internet" },
  { english: "Upload", marathi: "चढवणे", phonetic: "Chadhvane", context: "Send file to internet" },
  { english: "Search", marathi: "शोधणे", phonetic: "Shodhane", context: "Look up information" },
  { english: "Save", marathi: "जतन करणे", phonetic: "Jatan Karne", context: "Preserve document" },
  { english: "Delete", marathi: "हटवणे / काढून टाकणे", phonetic: "Hatvane", context: "Remove document" },
  { english: "Settings", marathi: "संरचना / सेटिंग्ज", phonetic: "Sanrachna", context: "System preferences" },
  { english: "Network", marathi: "जाळे", phonetic: "Jaale", context: "Connected system" },
  { english: "Digital Signature", marathi: "डिजिटल स्वाक्षरी", phonetic: "Digital Swakshari", context: "Electronic sign" },
  { english: "Security", marathi: "सुरक्षितता", phonetic: "Surakshitata", context: "Safety and protection" },
  { english: "Literacy", marathi: "साक्षरता", phonetic: "Saksharata", context: "Knowledge & ability to use" }
];
