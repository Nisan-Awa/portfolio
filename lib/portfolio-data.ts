export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  status: string;
  featured?: boolean;
  group: "Flagship Apps" | "Engineering, AI and Product" | "UI Concepts and Practice Builds";
  icon?: string;
  stack: string[];
  summary: string;
  details: string[];
  highlights: string[];
  images: string[];
  imageLayout?: "phone" | "wide";
  imageCaptions?: string[];
  caseStudy?: {
    problem: string;
    built: string;
    challenge: string;
    learned: string;
    impact: string;
  };
  downloads?: { label: string; href: string; note?: string }[];
};

export const featuredStats = [
  { value: "4K+", label: "LinkedIn community" },
  { value: "3rd", label: "Interswitch Pan-African Discovery Series" },
  { value: "330/132 kV", label: "Power transmission exposure" },
  { value: "10+", label: "Flutter projects and app concepts" },
];

export const projects: Project[] = [
  {
    slug: "nisanapp",
    title: "NisanApp",
    subtitle: "Smart productivity ecosystem",
    category: "Flutter App",
    year: "2025-2026",
    status: "Flagship project",
    featured: true,
    group: "Flagship Apps",
    icon: "/assets/app-icons/nisanapp.png",
    stack: ["Flutter", "Dart", "SQLite", "Provider", "Notifications", "File Handling"],
    summary:
      "A Flutter-based productivity ecosystem that combines task management, notes, spaced repetition, focus tools, file attachments, notifications, gamification, and offline-first local storage into one clean mobile experience.",
    details: [
      "NisanApp began as a task manager and evolved into a broader productivity system for tasks, notes, learning workflows, focus sessions, statistics, settings, and calendar views.",
      "The project strengthened my understanding of local persistence, SQLite modeling, parent-child task relationships, notification scheduling, file metadata, media previews, share flows, and long-term product iteration.",
      "It is positioned as my flagship mobile project because it shows product thinking, Flutter architecture, UI refinement, practical personal initiative, and the difference between cloud-sync and local/offline app delivery.",
    ],
    highlights: [
      "Tasks, subtasks, notes, calendar, focus hub, stopwatch and countdown tools.",
      "SQLite structure with parent task relationships, foreign keys and cascade behavior.",
      "File picker, path provider, local media preview, image zoom, video playback and sharing support.",
      "Gamified XP/levels, spaced repetition logic, notifications and offline-first thinking.",
    ],
    images: [
      "/assets/screenshots/nisanapp/nisanapp-01.jpeg",
      "/assets/screenshots/nisanapp/nisanapp-02.jpeg",
      "/assets/screenshots/nisanapp/nisanapp-03.jpeg",
      "/assets/screenshots/nisanapp/nisanapp-04.jpeg",
    ],
    imageCaptions: [
      "Task dashboard and productivity overview.",
      "Notes, planning and learning workflow.",
      "Focus tools, utilities and app navigation.",
      "Calendar quick-capture flow for tasks, notes and planning.",
    ],
    caseStudy: {
      problem:
        "Students and builders often split tasks, notes, focus sessions, learning reminders and file references across too many tools.",
      built:
        "I built a Flutter productivity ecosystem with tasks, subtasks, notes, calendar planning, focus tools, notifications, file attachments, media preview and gamified progress.",
      challenge:
        "The main technical challenge was keeping the app expandable while handling local data relationships, reminders, attachments and multiple productivity flows without making the UI feel crowded.",
      learned:
        "I learned how database structure, notification timing, offline-first decisions and feature hierarchy affect the everyday feel of a mobile product.",
      impact:
        "NisanApp now acts as my strongest proof of Flutter product development because it combines useful features, long-term iteration and practical architecture.",
    },
    downloads: [
      {
        label: "Cloud version APK",
        href: "/downloads/apps/nisanapp-cloud-release.apk",
        note: "Android APK demo build for manual installation on Android devices. This version points toward online save/sync workflows.",
      },
      {
        label: "Local/offline version APK",
        href: "/downloads/apps/nisanapp-local-release.apk",
        note: "Android APK demo build for manual installation on Android devices. This version stores user data on the mobile device.",
      },
    ],
  },
  {
    slug: "lunacycle",
    title: "LunaCycle",
    subtitle: "Cycle tracking and self-care app",
    category: "Flutter App",
    year: "2026",
    status: "Featured project",
    featured: true,
    group: "Flagship Apps",
    icon: "/assets/app-icons/lunacycle.png",
    stack: ["Flutter", "Dart", "Health UI", "Calendar UX", "Local Data"],
    summary:
      "A cycle tracking app with a soft, mobile-first interface for period estimates, cycle day tracking, insights, calendar views and self-care flows.",
    details: [
      "LunaCycle shows my ability to build sensitive, user-centered mobile experiences where visual tone, clarity, privacy and daily usability matter.",
      "The app uses a polished pink interface, cycle-day summaries, upcoming period estimates, calendar thinking, insights and self-care navigation to make health tracking approachable.",
    ],
    highlights: [
      "Cycle day dashboard with period estimate and phase display.",
      "Calendar, insights and self-care navigation patterns.",
      "Friendly mobile UI with card-based summaries and clear primary actions.",
      "Built as one of my strongest recent Flutter app showcases.",
    ],
    images: [
      "/assets/screenshots/lunacycle/lunacycle-01.jpeg",
      "/assets/screenshots/lunacycle/lunacycle-02.jpeg",
      "/assets/screenshots/lunacycle/lunacycle-03.jpeg",
      "/assets/screenshots/lunacycle/lunacycle-04.jpeg",
    ],
    imageCaptions: [
      "Cycle overview with soft health-focused visual language.",
      "Calendar and period tracking flow.",
      "Insights and self-care navigation.",
      "Mobile-first dashboard for cycle awareness.",
    ],
    caseStudy: {
      problem:
        "Health-tracking apps need to feel clear, private and calm while still giving useful daily information.",
      built:
        "I built a cycle-tracking mobile experience with period estimates, calendar thinking, insights, phase display and self-care navigation.",
      challenge:
        "The design challenge was balancing a soft visual identity with direct, readable information that a user can understand quickly.",
      learned:
        "LunaCycle strengthened my sensitivity to visual tone, privacy-aware product design and mobile health UI patterns.",
      impact:
        "It shows that I can build beyond productivity tools into more personal, user-centered mobile experiences.",
    },
    downloads: [
      {
        label: "Download Android APK",
        href: "/downloads/apps/lunacycle-release.apk",
        note: "Android APK demo build. Install manually on Android devices.",
      },
    ],
  },
  {
    slug: "diamondcity",
    title: "REMSALERT / DiamondCity",
    subtitle: "Real estate management solution",
    category: "Client-facing App",
    year: "2025",
    status: "Featured project",
    featured: true,
    group: "Flagship Apps",
    icon: "/assets/app-icons/diamondcity.png",
    stack: ["Flutter", "Firebase Thinking", "SQLite", "Notifications", "Windows Build"],
    summary:
      "A real estate management solution with access code generation, visitor registration, CCTV access interface, WhatsApp support, cloud-sync thinking, notifications and multi-theme support.",
    details: [
      "REMSALERT was later rebranded to DiamondCity at the client's request. It exposed me to client-driven development, feature planning, interface organization, backend thinking and delivery builds.",
      "The project includes estate workflows, property records, visitor registration, access code concepts, CCTV access placeholders, owner messaging, client documents, complaints and app settings.",
    ],
    highlights: [
      "Visitor registration and gate-pass/access-code workflow.",
      "Estate, property, owner, document, complaint and notification modules.",
      "Light, dark and system theme support in the app.",
      "Delivered as Android APK and Windows build for review.",
    ],
    images: [
      "/assets/screenshots/diamondcity/diamondcity-01.png",
      "/assets/screenshots/diamondcity/diamondcity-02.png",
      "/assets/screenshots/diamondcity/diamondcity-03.png",
    ],
    imageCaptions: [
      "Estate dashboard and property management entry point.",
      "Visitor, access and resident-facing workflows.",
      "Settings and estate administration screens.",
    ],
    caseStudy: {
      problem:
        "Estate and facility teams need clearer digital workflows for visitors, access, documents, complaints and resident support.",
      built:
        "I built a Flutter real-estate management app with visitor registration, access-code thinking, CCTV/support entry points, notifications, documents and theme options.",
      challenge:
        "The main challenge was organizing many estate workflows into one app while keeping role-based admin/client access, local persistence, secure authentication, provider state and cross-platform delivery understandable.",
      learned:
        "I learned how to model estate data with SQLite, connect secure local auth to admin/client routes, generate visitor gate-pass codes, manage complaints/notifications and support documents, WhatsApp links and theme modes.",
      impact:
        "The project became a fuller estate portal demo: admins can manage properties, owners, visitors and complaints while clients can access documents, submit complaints and interact with estate support workflows.",
    },
    downloads: [
      {
        label: "Download Android APK",
        href: "/downloads/apps/diamondcity-release.apk",
        note: "Android APK demo build. Install manually on Android devices.",
      },
    ],
  },
  {
    slug: "automated-file-delivery-robot",
    title: "Automated File Delivery Robot",
    subtitle: "Final-year engineering project",
    category: "Robotics",
    year: "2026",
    status: "Capstone",
    group: "Engineering, AI and Product",
    stack: ["Robotics", "Automation", "Firebase/Web Integration", "Authentication"],
    summary:
      "Final-year engineering project focused on improving an autonomous office file-delivery robot with better workflow design, authentication, delivery request handling and digital integration.",
    details: [
      "The project addresses a practical office problem: moving physical files between departments can waste time and interrupt workflows.",
      "My team's direction connects the robot's movement with a digital control system where verified users can request deliveries, select pickup/destination locations, monitor status and support secure handoff.",
    ],
    highlights: [
      "Robotics, embedded systems, office automation and route-planning concepts.",
      "Authentication, authorization, request handling and delivery workflow thinking.",
      "Firestore/Firebase Realtime Database planning and web/mobile integration direction.",
      "A strong hardware-meets-software capstone project.",
    ],
    images: [
      "/assets/screenshots/robot/robot-01.png",
      "/assets/screenshots/robot/robot-02.png",
      "/assets/screenshots/robot/robot-03.png",
      "/assets/screenshots/robot/robot-04.png",
    ],
    imageLayout: "wide",
    imageCaptions: [
      "Rendered exterior view of the automated file-delivery robot body.",
      "Angled CAD render showing the chassis, wheel position and enclosure form.",
      "Exploded CAD view showing internal structure and component placement.",
      "Technical drawing with projected views and key dimensions.",
    ],
    caseStudy: {
      problem:
        "Office file movement can interrupt staff workflows and make physical handoff harder to track across departments.",
      built:
        "My final-year project direction improves an automated file-delivery robot with digital request handling, location selection, authentication and delivery workflow thinking.",
      challenge:
        "The main challenge is connecting physical movement with secure digital instructions, status visibility and real office usability.",
      learned:
        "The project deepened my interest in robotics systems that combine embedded hardware, web/mobile control and human-centered workflow design.",
      impact:
        "It is the clearest proof of my hardware-meets-software identity because the solution crosses robotics, automation, authentication and software integration.",
    },
  },
  {
    slug: "ai-smart-energy-management",
    title: "AI-Based Smart Energy Management",
    subtitle: "Detecting idle power waste",
    category: "AI/ML",
    year: "2026",
    status: "Research project",
    group: "Engineering, AI and Product",
    stack: ["Python", "pandas", "scikit-learn", "RandomForest", "Time-Series"],
    summary:
      "A machine learning project focused on detecting appliance states and predicting energy consumption patterns to reduce idle power waste.",
    details: [
      "The classification work used engineered power, lag, rolling-window and grouped sequence features to detect OFF, IDLE and ACTIVE appliance states.",
      "The regression side used chronological splitting, time features, lags, rolling averages and a HistGradientBoostingRegressor to predict appliance energy consumption.",
    ],
    highlights: [
      "Explored FIRED, LIT, BLOND, UK-DALE, REDD, Pecan Street and ECO dataset directions.",
      "Reported balanced accuracy around 0.9983 and macro-F1 around 0.9820 in one classification run, compared against a 0.3333 baseline.",
      "Reported test MAE around 28.48 against a baseline MAE around 52.53, with R2 around 0.5554 for regression.",
      "Handled results carefully with baseline and validation awareness to reduce leakage risk.",
    ],
    images: [],
    imageLayout: "wide",
    caseStudy: {
      problem:
        "Idle and standby appliances can waste power quietly across homes, offices and institutions.",
      built:
        "I experimented with appliance-state classification and energy prediction using Python, pandas, scikit-learn, engineered features, baselines and time-series validation.",
      challenge:
        "Energy datasets can produce misleadingly high scores if splits are too easy, so baseline comparison and validation awareness were important.",
      learned:
        "I learned how electrical engineering context can guide AI feature engineering, model evaluation and practical energy optimization thinking.",
      impact:
        "The project shows research-oriented AI/ML ability connected to a real engineering problem instead of a generic model demo.",
    },
  },
  {
    slug: "ceresvera",
    title: "CeresVera",
    subtitle: "AI-first agricultural support platform",
    category: "Product Leadership",
    year: "2026",
    status: "3rd place team",
    group: "Engineering, AI and Product",
    stack: ["Product Strategy", "AI", "Agriculture", "Pitching", "Business Model"],
    summary:
      "An AI-first platform for smallholder farmers, designed to detect crop issues early and connect farmers with verified agricultural experts through secure consultation systems.",
    details: [
      "I served as Product/Business Lead for Team CeresVera at the Interswitch Pan-African Discovery Series held at ABUAD, where the team placed 3rd.",
      "My contribution focused on product direction, value proposition, business positioning, pitch structure and communicating why the solution mattered.",
    ],
    highlights: [
      "AI crop issue detection for early intervention.",
      "Verified expert access and escrow-backed consultation concept.",
      "Team included frontend, backend, product design, AI/ML and product/business roles.",
      "Also pitched at Campus to Career 2.0 and received cash-prize recognition.",
    ],
    images: ["/assets/screenshots/ceresvera/ceresvera-01.jpeg"],
    imageLayout: "wide",
    imageCaptions: [
      "CeresVera pitch moment during the Interswitch Pan-African Discovery Series at ABUAD.",
    ],
    caseStudy: {
      problem:
        "Smallholder farmers often lose crops because pests, diseases and crop stress are not identified early enough.",
      built:
        "As Product/Business Lead, I helped shape CeresVera as an AI-first platform for crop issue detection, verified expert access and escrow-backed consultation.",
      challenge:
        "The challenge was communicating the product value clearly across agriculture, AI, trust, expert verification and business sustainability.",
      learned:
        "I learned how product direction, team collaboration and pitch structure can be as important as code in innovation settings.",
      impact:
        "The team placed 3rd at the Interswitch Pan-African Discovery Series, giving the project strong public validation.",
    },
  },
  {
    slug: "habitly",
    title: "Habitly",
    subtitle: "Habit tracking app",
    category: "Flutter App",
    year: "2025",
    status: "Learning project",
    group: "UI Concepts and Practice Builds",
    icon: "/assets/app-icons/habitly.png",
    stack: ["Flutter", "Local Storage", "Productivity UI"],
    summary:
      "A habit-tracking app designed to help users build consistency and monitor progress through simple mobile workflows.",
    details: [
      "Habitly fits into my broader interest in productivity tools and self-improvement software.",
    ],
    highlights: ["Habit flows", "Progress tracking concepts", "Clean productivity UI", "Local storage practice"],
    images: [],
  },
  {
    slug: "nisanexpress",
    title: "NisanExpress",
    subtitle: "E-commerce app concept",
    category: "Flutter App",
    year: "2025",
    status: "Concept",
    group: "UI Concepts and Practice Builds",
    icon: "/assets/app-icons/nisanexpress.png",
    stack: ["Flutter", "Mobile Commerce", "Product UI"],
    summary:
      "An e-commerce app concept built to practice product listing, navigation, shopping interface structure and responsive mobile commerce design.",
    details: ["The project helped me understand how storefronts structure discovery and purchase-related screens."],
    highlights: ["Product listing", "Shopping UI", "Navigation flows", "Responsive app layout"],
    images: [],
  },
  {
    slug: "nisanchat",
    title: "NisanChat",
    subtitle: "WhatsApp-style chat UI",
    category: "Flutter UI",
    year: "2025",
    status: "Interface study",
    group: "UI Concepts and Practice Builds",
    icon: "/assets/app-icons/nisanchat.png",
    stack: ["Flutter", "Messaging UI", "Mobile UX"],
    summary:
      "A messaging interface project with screens for chats, statuses, calls, contacts and modern communication patterns.",
    details: ["NisanChat demonstrates my ability to recreate familiar mobile patterns and organize communication content clearly."],
    highlights: ["Chat layouts", "Status screens", "Call UI", "Conversation interface patterns"],
    images: [],
  },
  {
    slug: "weather-clima",
    title: "Weather / Clima Apps",
    subtitle: "API-powered weather utilities",
    category: "Flutter App",
    year: "2025",
    status: "Practice projects",
    group: "UI Concepts and Practice Builds",
    icon: "/assets/app-icons/weather-clima.png",
    stack: ["Flutter", "REST APIs", "JSON", "Async Dart"],
    summary:
      "Weather applications built to practice API integration, location-based data, asynchronous programming and JSON parsing.",
    details: ["These projects strengthened my ability to consume external services and present live data in a useful interface."],
    highlights: ["API integration", "JSON parsing", "Location-based data", "Dynamic UI updates"],
    images: [],
  },
  {
    slug: "chukwuka-math-game",
    title: "Chukwuka Math Game",
    subtitle: "Educational Flutter game",
    category: "Game / Education",
    year: "2025",
    status: "Learning app",
    group: "UI Concepts and Practice Builds",
    icon: "/assets/app-icons/chukwuka.png",
    stack: ["Flutter", "Game Logic", "Education"],
    summary:
      "An educational math game with directional controls, levels, scoring and interactive learning mechanics.",
    details: ["The project connects my software work with my interest in Python teaching, robotics thinking and child-friendly technical education."],
    highlights: ["Levels", "Scoring", "Directional controls", "Interactive learning mechanics"],
    images: [],
  },
];

export const experiences = [
  {
    role: "Pfizer Advanced AI Document Intelligence Extern",
    company: "Extern / Pfizer",
    period: "2026",
    description:
      "Selected for an AI-powered document insights and data extraction externship focused on Python pipelines, PDF extraction, OCR for pharmaceutical labels, AI model testing and RAG-based search across compliance-document workflows.",
  },
  {
    role: "Mobile App Developer Intern",
    company: "Featuremind Nigeria Limited",
    period: "2025",
    description:
      "Completed a six-month SIWES placement focused on Flutter and Dart mobile development, Firebase integration, SQLite, Provider, REST APIs, Figma-to-Flutter implementation, debugging, Git/GitHub workflows and deployment preparation.",
  },
  {
    role: "Technical Intern / SWEP II",
    company: "Transmission Company of Nigeria",
    period: "2024",
    description:
      "Gained exposure to 330/132 kV transmission systems, HMI/control-room monitoring, voltage/current/frequency logging, transformer checks, switchgear inspection, annunciator interpretation, fault tracing and GIS substation environments.",
  },
  {
    role: "Network Infrastructure Intern",
    company: "Winrock Nigeria Limited / Plusnet",
    period: "2024",
    description:
      "Worked around fiber-optic deployment, OTDR testing, microwave point-to-point links, router/CPE configuration, static IP and VLAN concepts, PRTG network monitoring, UPS/DC backup and field troubleshooting.",
  },
  {
    role: "Broadcast Engineering Intern",
    company: "Federal Radio Corporation of Nigeria",
    period: "2023",
    description:
      "Learned master control room operations, audio routing, FM transmission chains around 92.9 MHz, RF systems, exciters, combiners, power amplifiers, antennas and backup power support.",
  },
  {
    role: "Teaching, Speaking and Facilitation",
    company: "ASVA, Python classes and student communities",
    period: "2025-2026",
    description:
      "Taught Python to younger learners, facilitated a software portfolio workshop, supported portfolio strategy, and spoke on networking, mentors and tech ecosystems during The Blueprint webinar.",
  },
];

export const achievements = [
  "Selected for the Pfizer Advanced: AI-Powered Document Insights & Data Extraction Externship with Extern.",
  "3rd Place - Interswitch Pan-African Discovery Series with Team CeresVera.",
  "Campus to Career 2.0 cash-prize recognition after pitching CeresVera at ABUAD.",
  "Selected for a competitive NUC internship opportunity around national university database management.",
  "Completed Featuremind SIWES and built multiple Flutter/Firebase projects.",
  "Grew a LinkedIn community past 4,000 followers by documenting engineering, software, AI, events and growth.",
  "Facilitated an ASVA Software Portfolio Workshop and taught Python to younger learners.",
];

export const skillGroups = [
  {
    title: "Mobile Development",
    items: ["Flutter", "Dart", "Provider", "Responsive UI", "Animations", "Notifications", "Android builds"],
  },
  {
    title: "Backend and Data",
    items: ["Firebase Auth", "Cloud Firestore", "Firebase Storage", "SQLite", "sqflite", "REST APIs", "JSON"],
  },
  {
    title: "Engineering Systems",
    items: ["Power systems", "HMI monitoring", "OTDR", "Fiber optics", "Microwave links", "RF systems", "PRTG"],
  },
  {
    title: "AI/ML and Python",
    items: ["Python", "pandas", "NumPy", "scikit-learn", "Feature engineering", "Time-series validation", "joblib"],
  },
  {
    title: "Product and UI/UX",
    items: ["Figma-to-Flutter", "User flows", "Theme systems", "Portfolio strategy", "Product storytelling"],
  },
  {
    title: "Workflow",
    items: ["Git", "GitHub", "VS Code", "Android Studio", "Firebase Console", "Documentation", "Debugging"],
  },
];

export const certificates = [
  {
    title: "Featuremind Flutter Development Internship",
    image: "/assets/certificates/featuremind.jpg",
    description: "Internship certificate from Featuremind Nigeria Limited for Flutter development experience during the 2025 SIWES placement.",
  },
  {
    title: "Pfizer Advanced AI Document Intelligence Externship",
    image: "/assets/certificates/pfizer-externship-announcement.png",
    description: "Externship announcement for AI-powered pharmaceutical document processing, PDF extraction, OCR, Python pipelines and RAG-based search workflows.",
  },
  {
    title: "ASVA Portfolio Workshop",
    image: "/assets/certificates/asva.jpg",
    description: "Recognition connected to portfolio facilitation and software visibility work.",
  },
  {
    title: "COMHSSA Recognition",
    image: "/assets/certificates/comhssa.jpg",
    description: "Certificate from student and community engagement activities.",
  },
  {
    title: "IEEE Certificate",
    image: "/assets/certificates/ieee.jpg",
    description: "Engineering and technology community participation.",
  },
  {
    title: "Professional Development Certificate",
    image: "/assets/certificates/nisan-awa-tojah.png",
    description: "Certificate documenting recent learning and professional development.",
  },
  {
    title: "Additional Recognition",
    image: "/assets/certificates/certificate-extra.png",
    description: "Additional certificate and public learning evidence from 2026.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
