import project01 from "../assets/coffeespot/project-01.png";
import project02 from "../assets/cashier/project-02.png";
import project03 from "../assets/expenses/project-03.png";

// ============================================================
// PROJECT IMAGES
// ============================================================

const coffeeSpotImages = import.meta.glob(
  "../assets/coffeespot/*.png",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const cashierImages = import.meta.glob(
  "../assets/cashier/*.png",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const expensesImages = import.meta.glob(
  "../assets/expenses/*.png",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

// ============================================================
// SORT IMAGES
// ============================================================

const sortImages = (images) => {
  return Object.entries(images)
    .sort(([a], [b]) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    )
    .map(([, image]) => image);
};

const coffeeSpotGallery = sortImages(
  coffeeSpotImages
);

const cashierGallery = sortImages(
  cashierImages
);

const expensesGallery = sortImages(
  expensesImages
);

// ============================================================
// GALLERY BUILDER
// ============================================================

const createGallery = (
  images,
  details = [],
  horizontalCount = 3
) => {
  const gallery = images
    .filter(Boolean)
    .map((image, index) => ({
      image,

      title:
        details[index]?.title ||
        `SCREEN ${String(index + 1).padStart(
          2,
          "0"
        )}`,

      description:
        details[index]?.description ||
        "A detailed view of the digital experience and interface.",
    }));

  return {
    items: gallery,

    images: gallery.map(
      (item) => item.image
    ),

    heroImage:
      gallery[0]?.image || null,

    horizontalImages:
      gallery.slice(
        1,
        horizontalCount + 1
      ),

    verticalImages:
      gallery.slice(
        horizontalCount + 1
      ),
  };
};

// ============================================================
// COFFEE SPOT
// ============================================================

const coffeeSpotGalleryData =
  createGallery(
    coffeeSpotGallery,
    [
      {
        title: "DISCOVERY",
        description:
          "The main experience introduces users to curated coffee spots through a clean and visually focused interface.",
      },

      {
        title: "COFFEE EXPLORATION",
        description:
          "Users can explore available coffee spots through a structured interface designed around discovery and visual hierarchy.",
      },

      {
        title: "LOCATION DETAIL",
        description:
          "Detailed information is presented in a focused layout, making important coffee spot information easy to explore.",
      },

      {
        title: "VISUAL SYSTEM",
        description:
          "Custom UI elements and gradient treatments create a distinctive visual identity across the experience.",
      },

      {
        title: "RESPONSIVE EXPERIENCE",
        description:
          "The interface adapts across screen sizes while maintaining the same visual structure and interaction quality.",
      },
    ],
    3
  );

// ============================================================
// CASHIER SYSTEM
// ============================================================

const cashierGalleryData =
  createGallery(
    cashierGallery,
    [
      {
        title: "DASHBOARD",
        description:
          "The main interface provides a clear overview of the cashier workflow and essential daily operations.",
      },

      {
        title: "TRANSACTION",
        description:
          "The transaction interface is designed for fast input, clear product selection, and efficient checkout operations.",
      },

      {
        title: "PRODUCT MANAGEMENT",
        description:
          "Product information is organized into a practical interface for managing items used during daily transactions.",
      },

      {
        title: "TRANSACTION HISTORY",
        description:
          "Previous transactions can be accessed through a structured view designed for quick reference and record management.",
      },

      {
        title: "OFFLINE SYSTEM",
        description:
          "The application is designed to continue operating reliably through local data storage without requiring constant internet access.",
      },
    ],
    3
  );

// ============================================================
// EXPENSES TRACKER
// ============================================================

const expensesGalleryData =
  createGallery(
    expensesGallery,
    [
      {
        title: "OVERVIEW",
        description:
          "The main dashboard gives users a clear overview of their financial activity and current tracking information.",
      },

      {
        title: "EXPENSE TRACKING",
        description:
          "Users can record and monitor expenses through a structured interface designed for everyday financial management.",
      },

      {
        title: "INCOME MANAGEMENT",
        description:
          "Income information is presented in a simple system that keeps financial records organized and easy to review.",
      },

      {
        title: "FINANCIAL DATA",
        description:
          "Financial records are connected to a centralized data system for reliable storage and synchronization.",
      },

      {
        title: "CROSS-PLATFORM",
        description:
          "The interface is designed to provide a consistent experience across both web and mobile environments.",
      },
    ],
    3
  );

// ============================================================
// PROJECTS
// ============================================================

export const projects = [
  {
    number: "01",

    slug: "coffee-spot",

    title: "COFFEE SPOT",

    type: "WEB EXPERIENCE",

    className: "project-one",

    year: "2026",

    image: project01,

    images:
      coffeeSpotGalleryData.images,

    gallery:
      coffeeSpotGalleryData.items,

    heroImage:
      coffeeSpotGalleryData.heroImage,

    horizontalImages:
      coffeeSpotGalleryData.horizontalImages,

    verticalImages:
      coffeeSpotGalleryData.verticalImages,

    description:
      "An interactive web experience built with Flutter, delivering seamless animations, custom UI/UX, and a highly responsive layout for discovering coffee spots.",

    longDescription:
      "COFFEE SPOT is a responsive recommendation web platform built with Flutter Web and Supabase, designed to help users discover curated coffee spots through intuitive UI and smooth interactions.",

    about:
      "A visually driven web experience combining modern interface design, Flutter development, and tailored UI layouts into one cohesive product. Every part of the application was crafted to feel intentional, responsive, and distinctive for coffee enthusiasts.",

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

    year: "2026",

    image: project02,

    images:
      cashierGalleryData.images,

    gallery:
      cashierGalleryData.items,

    heroImage:
      cashierGalleryData.heroImage,

    horizontalImages:
      cashierGalleryData.horizontalImages,

    verticalImages:
      cashierGalleryData.verticalImages,

    description:
      "A fast and responsive cashier application built with Flutter, featuring seamless offline capabilities powered by a local database.",

    longDescription:
      "This point-of-sale application is designed to provide quick and reliable transaction operations. Built with Flutter, it leverages a local database to ensure seamless offline functionality, fast data retrieval, and secure local storage. The interface is optimized for speed, accuracy, and an intuitive user experience for daily business operations.",

    about:
      "A reliable cashier solution that combines smooth Flutter UI development with robust local data management. Every feature was crafted to accelerate the checkout process while maintaining data integrity without requiring constant internet access.",

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

    year: "2026",

    image: project03,

    images:
      expensesGalleryData.images,

    gallery:
      expensesGalleryData.items,

    heroImage:
      expensesGalleryData.heroImage,

    horizontalImages:
      expensesGalleryData.horizontalImages,

    verticalImages:
      expensesGalleryData.verticalImages,

    description:
      "A cross-platform financial tracking application built with Flutter, utilizing Supabase for secure and real-time data synchronization across web and mobile.",

    longDescription:
      "EXPENSES TRACKER is a comprehensive financial management tool designed to monitor daily income and expenses effortlessly. Built using Flutter, it delivers a unified and seamless experience across both mobile and web platforms. The system is powered by a fully custom-configured Supabase database, ensuring reliable data storage, fast retrieval, and real-time synchronization.",

    about:
      "A complete full-stack solution demonstrating the seamless integration of a responsive Flutter frontend with a robust, independently configured Supabase backend. Every aspect was built to provide users with a smooth, secure, and accurate financial tracking experience.",

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