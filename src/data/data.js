import project01 from "../assets/coffeespot/project-01.png";
import project02 from "../assets/cashier/project-02.png";
import project03 from "../assets/expenses/project-03.png";


// ============================================================
// PROJECTS
// ============================================================

export const projects = [

  // ==========================================================
  // COFFEE SPOT
  // ==========================================================

  {
    number: "01",

    slug: "coffee-spot",

    title: "COFFEE SPOT",

    type: "WEB EXPERIENCE",

    className: "project-one",

    year: "2026",

    image: project01,


    // --------------------------------------------------------
    // PHOTO LAYOUT
    //
    // C1 = coffeespot1.png
    // C2 = coffeespot2.png
    // dst...
    // --------------------------------------------------------

    hero: "C1",

    horizontal: [
      "C1",
      "C2",
      "C3",
    ],

    vertical: [
      "C4",
      "C5",
      "C6",
      "C7",
      "C8",
      "C9",
      "C10",
      "C11",
      "C12",
      "C13",
      "C14",
    ],


    // --------------------------------------------------------
    // PROJECT DESCRIPTION
    // --------------------------------------------------------

    description:
      "An interactive web experience built with Flutter, delivering seamless animations, custom UI/UX, and a highly responsive layout for discovering coffee spots.",

    longDescription:
      "COFFEE SPOT is a responsive recommendation web platform built with Flutter Web and Supabase, designed to help users discover curated coffee spots through intuitive UI and smooth interactions.",

    about:
      "A visually driven web experience combining modern interface design, Flutter development, and tailored UI layouts into one cohesive product. Every part of the application was crafted to feel intentional, responsive, and distinctive for coffee enthusiasts.",


    // --------------------------------------------------------
    // STACK
    // --------------------------------------------------------

    stack: [
      "FLUTTER WEB",
      "DART",
      "UI / UX",
      "WEB",
    ],
  },


  // ==========================================================
  // CASHIER SYSTEM
  // ==========================================================

  {
    number: "02",

    slug: "cashier-system",

    title: "CASHIER SYSTEM",

    type: "APPLICATION",

    className: "project-two",

    year: "2026",

    image: project02,


    // --------------------------------------------------------
    // PHOTO LAYOUT
    // --------------------------------------------------------

    hero: "K1",

    horizontal: [
      "K2",
      "K4",
      "K5",
      "K6",
    ],

    vertical: [
      "K3",
      "K7",
      "K8",
      "K9",
      "K10",
      "K11",
    ],


    // --------------------------------------------------------
    // PROJECT DESCRIPTION
    // --------------------------------------------------------

    description:
      "A fast and responsive cashier application built with Flutter, featuring seamless offline capabilities powered by a local database.",

    longDescription:
      "This point-of-sale application is designed to provide quick and reliable transaction operations. Built with Flutter, it leverages a local database to ensure seamless offline functionality, fast data retrieval, and secure local storage. The interface is optimized for speed, accuracy, and an intuitive user experience for daily business operations.",

    about:
      "A reliable cashier solution that combines smooth Flutter UI development with robust local data management. Every feature was crafted to accelerate the checkout process while maintaining data integrity without requiring constant internet access.",


    // --------------------------------------------------------
    // STACK
    // --------------------------------------------------------

    stack: [
      "FLUTTER",
      "LOCAL DB",
      "UI / UX",
      "APP",
    ],
  },


  // ==========================================================
  // EXPENSES TRACKER
  // ==========================================================

  {
    number: "03",

    slug: "expenses-tracker",

    title: "EXPENSES TRACKER",

    type: "CROSS-PLATFORM APP",

    className: "project-three",

    year: "2026",

    image: project03,


    // --------------------------------------------------------
    // PHOTO LAYOUT
    // --------------------------------------------------------

    hero: "E1",

    horizontal: [
      "E4",
      "E11",
      "E12",
    ],

    vertical: [
      "E2",
      "E3",
      "E5",
      "E6",
      "E7",
      "E8",
      "E9",
      "E10",
      "E13",
      "E14",
      "E15",
    ],


    // --------------------------------------------------------
    // PROJECT DESCRIPTION
    // --------------------------------------------------------

    description:
      "A cross-platform financial tracking application built with Flutter, utilizing Supabase for secure and real-time data synchronization across web and mobile.",

    longDescription:
      "EXPENSES TRACKER is a comprehensive financial management tool designed to monitor daily income and expenses effortlessly. Built using Flutter, it delivers a unified and seamless experience across both mobile and web platforms. The system is powered by a fully custom-configured Supabase database, ensuring reliable data storage, fast retrieval, and real-time synchronization.",

    about:
      "A complete full-stack solution demonstrating the seamless integration of a responsive Flutter frontend with a robust, independently configured Supabase backend. Every aspect was built to provide users with a smooth, secure, and accurate financial tracking experience.",


    // --------------------------------------------------------
    // STACK
    // --------------------------------------------------------

    stack: [
      "FLUTTER",
      "SUPABASE",
      "CROSS-PLATFORM",
      "FULL-STACK",
    ],
  },
];


// ============================================================
// SERVICES
// ============================================================

export const services = [
  "WEB DEVELOPMENT",
  "WEB APPLICATION",
  "MOBILE APPLICATION",
  "UI / UX DESIGN",
  "CUSTOM SOFTWARE",
];