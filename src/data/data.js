import project01 from "../assets/project-01.png";
import project02 from "../assets/project-02.png";
import project03 from "../assets/project-03.png";

export const projects = [
  {
    number: "01",
    slug: "coffee-spot",
    title: "COFFEE SPOT",
    type: "WEB EXPERIENCE",
    className: "project-one",

    image: project01,

    images: [
      project01,
    ],

    description:
      "An interactive web experience built with Flutter, delivering seamless animations, custom UI/UX, and a highly responsive layout for discovering coffee spots.",

    longDescription:
      "COFFEE SPOT is a web platform designed with a strong visual direction, smooth interactions, and a clear interface system using Flutter Web. The project focuses on helping users discover curated coffee locations through an intuitive design, featuring custom gradient widgets and seamless responsiveness.",

    about:
      "A visually driven web experience combining modern interface design, Flutter development, and tailored UI layouts into one cohesive product. Every part of the application was crafted to feel intentional, responsive, and distinctive for coffee enthusiasts.",

    year: "2026",

    stack: [
      "FLUTTER WEB",
      "DART",
      "UI / UX",
      "WEB",
    ],
  },

  {
    number: "02",

    slug: "cashier-system",

    title: "CASHIER SYSTEM",

    type: "APPLICATION",

    className: "project-two",

    image: project02,

    images: [
      project02,

      // Tambahkan foto aplikasi kasir di sini
      // cashier02,
      // cashier03,
      // cashier04,
      // cashier05,
    ],

    description:
      "A fast and responsive cashier application built with Flutter, featuring seamless offline capabilities powered by a local database.",

    longDescription:
      "This point-of-sale application is designed to provide quick and reliable transaction operations. Built with Flutter, it leverages a local database to ensure seamless offline functionality, fast data retrieval, and secure local storage. The interface is optimized for speed, accuracy, and an intuitive user experience for daily business operations.",

    about:
      "A reliable cashier solution that combines smooth Flutter UI development with robust local data management. Every feature was crafted to accelerate the checkout process while maintaining data integrity without requiring constant internet access.",

    year: "2026",

    stack: [
      "FLUTTER",
      "LOCAL DB",
      "UI / UX",
      "APP",
    ],
  },

  {
    number: "03",

    slug: "expenses-tracker",

    title: "EXPENSES TRACKER",

    type: "CROSS-PLATFORM APP",

    className: "project-three",

    image: project03,

    images: [
      project03,

      // Tambahkan foto aplikasi dan web Expenses Tracker di sini
      // expenses02,
      // expenses03,
      // expenses04,
      // expenses05,
    ],

    description:
      "A cross-platform financial tracking application built with Flutter, utilizing Supabase for secure and real-time data synchronization across web and mobile.",

    longDescription:
      "EXPENSES TRACKER is a comprehensive financial management tool designed to monitor daily income and expenses effortlessly. Built using Flutter, it delivers a unified and seamless experience across both mobile and web platforms. The system is powered by a fully custom-configured Supabase database, ensuring reliable data storage, fast retrieval, and real-time synchronization.",

    about:
      "A complete full-stack solution demonstrating the seamless integration of a responsive Flutter frontend with a robust, independently configured Supabase backend. Every aspect was built to provide users with a smooth, secure, and accurate financial tracking experience.",

    year: "2026",

    stack: [
      "FLUTTER",
      "SUPABASE",
      "CROSS-PLATFORM",
      "FULL-STACK",
    ],
  },
];

export const services = [
  "WEB DEVELOPMENT",
  "WEB APPLICATION",
  "MOBILE APPLICATION",
  "UI / UX DESIGN",
  "CUSTOM SOFTWARE",
];