export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  status: string;
  featured?: boolean;
  stack: string[];
  summary: string;
  details: string[];
  highlights: string[];
  images: string[];
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
    stack: ["Flutter", "Dart", "SQLite", "Provider", "Notifications", "File Handling"],
    summary:
      "A Flutter-based productivity ecosystem that combines task management, notes, spaced repetition, focus tools, file attachments, notifications, gamification, and offline-first local storage into one clean mobile experience.",
    details: [
      "NisanApp began as a task manager and evolved into a broader productivity system for tasks, notes, learning workflows, focus sessions, statistics, settings, and calendar views.",
      "The project strengthened my understanding of local persistence, SQLite modeling, parent-child task relationships, notification scheduling, file metadata, media previews, share flows, and long-term product iteration.",
      "It is positioned as my flagship mobile project because it shows product thinking, Flutter architecture, UI refinement, and practical personal initiative.",
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
    ],
    downloads: [
      {
        label: "Download NisanApp Cloud APK",
        href: "/downloads/apps/nisanapp-cloud-release.apk",
        note: "From StudioProjects/hellome. Includes online save/sync direction.",
      },
      {
        label: "Download NisanApp Local APK",
        href: "/downloads/apps/nisanapp-local-release.apk",
        note: "Local-device storage variant.",
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
    downloads: [
      {
        label: "Download LunaCycle APK",
        href: "/downloads/apps/lunacycle-release.apk",
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
    downloads: [
      {
        label: "Download DiamondCity APK",
        href: "/downloads/apps/diamondcity-release.apk",
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
    images: [],
  },
  {
    slug: "ai-smart-energy-management",
    title: "AI-Based Smart Energy Management",
    subtitle: "Detecting idle power waste",
    category: "AI/ML",
    year: "2026",
    status: "Research project",
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
  },
  {
    slug: "ceresvera",
    title: "CeresVera",
    subtitle: "AI-first agricultural support platform",
    category: "Product Leadership",
    year: "2026",
    status: "3rd place team",
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
    images: [],
  },
  {
    slug: "habitly",
    title: "Habitly",
    subtitle: "Habit tracking app",
    category: "Flutter App",
    year: "2025",
    status: "Learning project",
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
