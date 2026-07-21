// index.js
export const servicesData = [
  {
    title: "Full Stack Web Development",
    description:
      "I build clean, responsive full-stack web apps end to end — from database schema to polished UI — using modern React/Next.js on the frontend and Node.js/Express on the backend.",
    items: [
      {
        title: "Frontend Development",
        description: "(React, Next.js, TypeScript, Tailwind CSS)",
      },
      {
        title: "Backend Development",
        description: "(Node.js, Express, REST APIs, Auth with NextAuth)",
      },
      {
        title: "Database Design",
        description: "(MongoDB, MySQL, Schema Design & Optimization)",
      },
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "I design and build cross-platform mobile apps with React Native and TypeScript, focused on smooth interactions and clean, intuitive interfaces.",
    items: [
      {
        title: "Cross-Platform Apps",
        description: "(React Native, TypeScript, single codebase for iOS/Android)",
      },
      {
        title: "Form Handling & Validation",
        description: "(Formik, Yup)",
      },
      {
        title: "Navigation & State",
        description: "(React Navigation, Context/State Management)",
      },
    ],
  },
  {
    title: "UI/UX & Frontend Craft",
    description:
      "I care about how products feel, not just how they work — building responsive, pixel-conscious interfaces that stay usable across devices.",
    items: [
      {
        title: "Responsive Design",
        description: "(Tailwind CSS, Mobile-First Layouts)",
      },
      {
        title: "Interactive UI",
        description: "(dnd-kit, Canvas API, Animations)",
      },
      {
        title: "Component Architecture",
        description: "(Reusable, Maintainable React Components)",
      },
    ],
  },
  {
    title: "Problem Solving & DSA",
    description:
      "I'm actively practicing Data Structures & Algorithms and applying strong fundamentals (C++, Java, Python) to write efficient, well-structured code.",
    items: [
      {
        title: "Algorithms & DSA",
        description: "(Practicing Problem Solving, Optimized Solutions)",
      },
      {
        title: "Clean Code",
        description: "(Readable, Maintainable, Well-Structured Logic)",
      },
      {
        title: "Continuous Learning",
        description: "(Full Stack & Mobile Dev, Always Building)",
      },
    ],
  },
];

export const webProjects = [
  {
    id: 1,
    name: "Mystry Messages",
    description:
      "A full-stack anonymous messaging app with OTP-based email verification for secure, safe user authentication.",
    href: "https://mystry-messages-drab.vercel.app/",
    image: "/assets/projects/web-dev/1.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "NextAuth" },
      { id: 6, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "Job Application Tracker",
    description:
      "A full-stack job application tracker with an intuitive drag-and-drop Kanban board to organize and monitor your job search.",
    href: "https://job-application-tracker-five-lime.vercel.app/",
    image: "/assets/projects/web-dev/2.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "NextAuth" },
      { id: 6, name: "dnd-kit" },
    ],
  },
  {
    id: 3,
    name: "Event Planner",
    description:
      "A full-stack event management and RSVP platform that lets users create events, generate secure invite links, and collect RSVPs.",
    href: "https://event-planner-sepia-eight.vercel.app/",
    image: "/assets/projects/web-dev/3.png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 4,
    name: "Clown Fighter",
    description:
      "A browser-based fighting game built with vanilla JavaScript and the Canvas API, featuring sprite animation and collision detection.",
    href: "https://clownfighter.netlify.app/",
     image: "/assets/projects/web-dev/4.png",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "HTML5" },
      { id: 2, name: "CSS3" },
      { id: 3, name: "JavaScript" },
      { id: 4, name: "Canvas API" },
    ],
  },
];

export const mobileProjects = [
  {
    id: 1,
    name: "ItemFlow",
    description:
      "A modern item management mobile app that lets users organize, track, add, update, view, and delete items through a clean interface.",
    href: "https://github.com/Anmoly6422/ItemFlow",
    image: "/assets/projects/mob-dev/item.png",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "JavaScript" },
      { id: 3, name: "React Navigation" },
    ],
  },
  {
    id: 2,
    name: "PassForge",
    description:
      "A password generator with a glassmorphic UI, adjustable length, character-set toggles, a strength meter, and one-tap clipboard copy.",
    href: "https://github.com/Anmoly6422/PassForge",
     image: "/assets/projects/mob-dev/pass.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Formik" },
      { id: 4, name: "Yup" },
    ],
  },
  {
    id: 3,
    name: "CurrencyConvertor",
    description:
      "A sleek currency converter enabling conversion between multiple international currencies with a clean, responsive interface.",
    href: "https://github.com/Anmoly6422/CurrencyConvertor",
     image: "/assets/projects/mob-dev/cc.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "TypeScript" },
    ],
  },
  {
    id: 4,
    name: "TIC-TAC-TOE",
    description:
      "A modern two-player Tic Tac Toe game featuring turn-based gameplay, automatic win/draw detection, and a clean, responsive UI.",
    href: "https://github.com/Anmoly6422/TIC-TAC-TOE",
     image: "/assets/projects/mob-dev/tic.png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "TypeScript" },
    ],
  },
  {
    id: 5,
    name: "Roll-The-Dice",
    description:
      "A minimal dice-rolling app with a smooth animated roll effect — tap to get a random result from 1 to 6.",
    href: "https://github.com/Anmoly6422/Roll-The-Dice",
    image: "/assets/projects/mob-dev/d.png",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "TypeScript" },
    ],
  },
];

export const socials = [
  { name: "GitHub", href: "https://github.com/Anmoly6422" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/anmol-yadav-35ba40269/",
  },
];