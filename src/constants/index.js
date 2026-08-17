// index.js
export const servicesData = [
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
 
];

export const webProjects = [
  {
    id: 1,
    name: "Letterly",
    description:
      "An AI-powered newsletter SaaS platform for creators and growth teams, featuring an AI writing assistant, a drag-and-drop email editor, subscriber analytics, and a public API for integrations.",
    href: "https://useletterly.vercel.app/",
    image: "/assets/projects/web-dev/letterly.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Tailwind CSS" },
      { id: 4, name: "Clerk" },
      { id: 5, name: "MongoDB" },
      { id: 6, name: "Framer Motion" },
    ],
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    name: "ExpoMind",
    showcaseId: "expomind",
    description:
      "An AI-powered mobile assistant for developers, offering a documentation-focused chat experience for Expo SDK 57 using a RAG pipeline with vector embeddings, Supabase, and Gemini AI.",
    href: "https://github.com/Anmoly6422/expomind",
    image: "/assets/projects/mob-dev/expo1.jpg",
    bgImage: "/assets/backgrounds/blanket.jpg",
    galleryImages: [
      "/assets/expomind/expo1.jpg",
      "/assets/expomind/expo2.jpg",
      "/assets/expomind/expo3.jpg",
      "/assets/expomind/expo4.jpg",
      "/assets/expomind/expo5.jpg",
      "/assets/expomind/expo6.jpg",
      "/assets/expomind/expo7.jpg",
    ],
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "Expo" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "Supabase" },
      { id: 5, name: "Gemini AI" },
    ],
  },
  {
    id: 2,
    name: "Kribb",
    showcaseId: "kribb",
    description:
      "A modern real estate mobile app for discovering, exploring, and saving properties, with role-based access for users and admins to manage listings.",
    href: "https://github.com/Anmoly6422/Kribb",
    image: "/assets/projects/mob-dev/kribb1.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    galleryImages: [
      "/assets/kribb/kribb1.jpg",
      "/assets/kribb/2.jpg",
      "/assets/kribb/3.jpg",
      "/assets/kribb/4.jpg",
      "/assets/kribb/5.jpg",
      "/assets/kribb/7.jpg",
    ],
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "Expo" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "Clerk" },
      { id: 5, name: "Supabase" },
    ],
  },
  {
    id: 3,
    name: "TIC-TAC-TOE",
    description:
      "A modern two-player Tic Tac Toe game featuring turn-based gameplay, automatic win/draw detection, and a clean, responsive UI.",
    href: "https://github.com/Anmoly6422/TIC-TAC-TOE",
    image: "/assets/projects/mob-dev/tictactoe.png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "TypeScript" },
    ],
  },
  {
    id: 4,
    name: "PassForge",
    description:
      "A password generator with a glassmorphic UI, adjustable length, character-set toggles, a strength meter, and one-tap clipboard copy.",
    href: "https://github.com/Anmoly6422/PassForge",
    image: "/assets/projects/mob-dev/passforge.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Formik" },
      { id: 4, name: "Yup" },
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