// Central data file — update your portfolio content here
// ============================================================

export interface Skill {
  name: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "tools";
  icon: string;  // React Icons key e.g. "FaReact"
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: "fullstack" | "frontend" | "uiux";
  github: string;
  demo?: string;
  gradient: string;
  icon: string;
}

export interface TimelineItem {
  title: string;
  org: string;
  period: string;
  description: string;
  type: "education" | "work";
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: string;
  color: string;
}

// ── Personal Info ─────────────────────────────────────────
export const personal = {
  name: "Chathura Weerasinghe",
  initials: "CW",
  role: "Software Engineering Undergraduate",
  taglines: [
    "Full-Stack Developer",
    "Software Engineer",
    "Problem Solver",
    "Tech Enthusiast",
  ],
  bio: [
    "I am a passionate Software Engineering undergraduate with strong experience in full-stack web development. I enjoy transforming complex problems into simple, beautiful, and intuitive solutions.",
    "With a strong foundation in modern web technologies and a keen eye for detail, I specialize in building responsive, accessible, and performant web applications. Currently seeking an internship opportunity to contribute to meaningful projects and grow as a professional developer.",
  ],
  stats: [
    { label: "Projects",      value: "5+" },
    { label: "Technologies",  value: "10+" },
    { label: "Yrs Experience",value: "2+" },
    { label: "Committed",     value: "100%" },
  ],
  email:    "chathuraw2005@gmail.com",
  github:   "https://github.com/Chathura05",
  linkedin: "https://www.linkedin.com/in/chathura-weerasinghe-616b03316",
  whatsapp: "https://wa.me/94756537127?text=Hi%20Chathura,%20I%20saw%20your%20portfolio",
  cv:       "/Chathura_Weerasinghe_CV.pdf",
  photo:    "/Profile.jpg",
};

// ── Skills ────────────────────────────────────────────────
export const skills: Skill[] = [
  // Frontend
  { name: "HTML / CSS",   level: 95, category: "frontend", icon: "FaHtml5" },
  { name: "JavaScript",   level: 90, category: "frontend", icon: "FaJs" },
  { name: "TypeScript",   level: 85, category: "frontend", icon: "SiTypescript" },
  { name: "React",        level: 75, category: "frontend", icon: "FaReact" },
  { name: "Tailwind CSS", level: 88, category: "frontend", icon: "SiTailwindcss" },
  // Backend
  { name: "PHP",          level: 85, category: "backend",  icon: "FaPhp" },
  { name: "Laravel",      level: 85, category: "backend",  icon: "FaLaravel" },
  { name: "Node.js",      level: 75, category: "backend",  icon: "FaNodeJs" },
  { name: "MySQL",        level: 83, category: "backend",  icon: "SiMysql" },
  { name: "PostgreSQL",   level: 80, category: "backend",  icon: "SiPostgresql" },
  { name: "Java",         level: 88, category: "backend",  icon: "FaJava" },
  // Tools
  { name: "Git / GitHub", level: 92, category: "tools",    icon: "FaGitAlt" },
  { name: "VS Code",      level: 95, category: "tools",    icon: "TbBrandVscode" },
  { name: "Postman",      level: 85, category: "tools",    icon: "SiPostman" },
  { name: "Figma",        level: 70, category: "tools",    icon: "FaFigma" },
];

// ── Timeline ──────────────────────────────────────────────
export const timeline: TimelineItem[] = [
  {
    title:       "Software Engineering Undergraduate",
    org:         "BSc in Software Engineering",
    period:      "2023 – Present",
    description: "Pursuing a degree with focus on software development methodologies, algorithms, and system design.",
    type:        "education",
  },
  {
    title:       "Web Development Projects",
    org:         "Freelance",
    period:      "2023 – Present",
    description: "Developed responsive websites and full-stack applications for construction companies, hospitals, and e-commerce platforms.",
    type:        "work",
  },

];

// ── Projects ──────────────────────────────────────────────
export const projects: Project[] = [
  {
    title:       "Sunny Construction",
    description: "Construction company website with service listings, inquiry system, and admin dashboard.",
    tags:        ["HTML", "CSS", "JavaScript", "PHP", "PostgreSQL"],
    category:    "fullstack",
    github:      "https://github.com/Chathura05/Construction-Web",
    gradient:    "from-brand-600 to-brand-800",
    icon:        "FaBuilding",
  },
  {
    title:       "Hospital Management Website",
    description: "Responsive hospital information website with department details, doctor profiles, and appointment system.",
    tags:        ["HTML5", "CSS3", "JavaScript", "Responsive"],
    category:    "frontend",
    github:      "https://github.com/Chathura05/Hospital-Web",
    demo:        "https://frabjous-dragon-f0aa0f.netlify.app",
    gradient:    "from-emerald-500 to-teal-600",
    icon:        "FaHospital",
  },
  {
    title:       "Bake House E-Commerce",
    description: "Modern bakery website with product catalog, shopping cart, and online ordering system.",
    tags:        ["HTML", "CSS", "JavaScript", "Bootstrap"],
    category:    "uiux",
    github:      "https://github.com/Chathura05/Restaurant-Web",
    demo:        "https://boisterous-sunburst-21eebc.netlify.app",
    gradient:    "from-amber-500 to-orange-600",
    icon:        "FaBreadSlice",
  },
  {
    title:       "Enterprise POS & Inventory System",
    description: "A custom-built retail POS system engineered for speed and touch-screen usability. Features real-time inventory tracking, a dynamic checkout engine, and secure role-based access control.",
    tags:        ["Laravel", "PHP", "MySQL", "JavaScript", "HTML/CSS"],
    category:    "fullstack",
    github:      "https://github.com/Chathura05",
    gradient:    "from-violet-500 to-purple-700",
    icon:        "FaCashRegister",
  },

];

// ── Contact Links ─────────────────────────────────────────
export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "chathuraw2005@gmail.com",
    href:  `mailto:${personal.email}`,
    icon:  "FaEnvelope",
    color: "bg-brand-600 hover:bg-brand-500",
  },
  {
    label: "GitHub",
    value: "@Chathura05",
    href:  personal.github,
    icon:  "FaGithub",
    color: "bg-zinc-700 hover:bg-zinc-600",
  },
  {
    label: "LinkedIn",
    value: "Chathura Weerasinghe",
    href:  personal.linkedin,
    icon:  "FaLinkedinIn",
    color: "bg-blue-700 hover:bg-blue-600",
  },
  {
    label: "WhatsApp",
    value: "+94 75 653 7127",
    href:  personal.whatsapp,
    icon:  "FaWhatsapp",
    color: "bg-green-600 hover:bg-green-500",
  },
  {
    label: "Download CV",
    value: "PDF Format",
    href:  personal.cv,
    icon:  "FaFileDownload",
    color: "bg-emerald-600 hover:bg-emerald-500",
  },
];
