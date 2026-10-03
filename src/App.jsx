import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./index.css";

import { projects, services } from "./data/data";

import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Intro from "./components/Intro";
import Product from "./components/Product";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Statement from "./components/Statement";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);
  const cursorRef = useRef(null);
  const spotlightRef = useRef(null);
  const heroRef = useRef(null);

  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cursor = cursorRef.current;
      const spotlight = spotlightRef.current;
      const hero = heroRef.current;

      if (!cursor || !hero) return;

      /* =========================================
         CURSOR
      ========================================= */

      const moveCursorX = gsap.quickTo(cursor, "x", {
        duration: 0.18,
        ease: "power3.out",
      });

      const moveCursorY = gsap.quickTo(cursor, "y", {
        duration: 0.18,
        ease: "power3.out",
      });

      const moveSpotlightX = gsap.quickTo(spotlight, "x", {
        duration: 0.35,
        ease: "power3.out",
      });

      const moveSpotlightY = gsap.quickTo(spotlight, "y", {
        duration: 0.35,
        ease: "power3.out",
      });

      const moveMouse = (e) => {
        moveCursorX(e.clientX);
        moveCursorY(e.clientY);

        if (spotlight) {
          moveSpotlightX(e.clientX);
          moveSpotlightY(e.clientY);
        }
      };

      window.addEventListener("mousemove", moveMouse);

      /* =========================================
         HERO PARALLAX
      ========================================= */

      const heroShape = hero.querySelector(
        ".hero-background-shape"
      );

      const heroFloating = hero.querySelectorAll(
        ".hero-floating"
      );

      if (heroShape) {
        gsap.to(heroShape, {
          y: 120,
          x: -60,
          scale: 1.08,
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      heroFloating.forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -80 : 80,
          x: index === 1 ? -40 : 30,
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      /* =========================================
         TEXT CURSOR INTERACTION
      ========================================= */

      const textTargets = document.querySelectorAll(
        `
        .hero-word,
        .hero-description p,
        .intro-content p:first-child,
        .intro-small,
        .services-heading h2,
        .service-item h3,
        .statement-word,
        .contact-content h2,
        .contact-small
        `
      );

      textTargets.forEach((text) => {
        const enter = () => {
          cursor.classList.add("cursor-invert");

          gsap.to(cursor, {
            width: 110,
            height: 110,
            duration: 0.45,
            ease: "power3.out",
          });
        };

        const leave = () => {
          cursor.classList.remove("cursor-invert");

          gsap.to(cursor, {
            width: 54,
            height: 54,
            duration: 0.45,
            ease: "power3.out",
          });
        };

        text.addEventListener("mouseenter", enter);
        text.addEventListener("mouseleave", leave);
      });

      /* =========================================
         PRELOADER
      ========================================= */

      const loader = document.querySelector(".loader");
      const loaderNumber =
        document.querySelector(".loader-number");

      if (loader && loaderNumber) {
        const loaderValue = { value: 0 };

        gsap.to(loaderValue, {
          value: 100,
          duration: 2,
          ease: "power2.inOut",

          onUpdate: () => {
            loaderNumber.textContent = Math.floor(
              loaderValue.value
            )
              .toString()
              .padStart(2, "0");
          },

          onComplete: () => {
            gsap.to(loader, {
              clipPath: "inset(0 0 100% 0)",
              duration: 1.2,
              ease: "power4.inOut",
              delay: 0.2,
            });
          },
        });
      }

      /* =========================================
         HERO INTRO
      ========================================= */

      const heroWords = document.querySelectorAll(
        ".hero-word"
      );

      const heroEyebrow =
        document.querySelector(".hero-eyebrow");

      const heroDescription =
        document.querySelector(".hero-description");

      const heroBottom =
        document.querySelector(".hero-bottom");

      const heroFloatingElements =
        document.querySelectorAll(".hero-floating");

      const heroTimeline = gsap.timeline({
        delay: 2.25,
      });

      heroTimeline.from(heroEyebrow, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      heroTimeline.from(
        heroWords,
        {
          y: 120,
          opacity: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.3"
      );

      heroTimeline.from(
        heroDescription,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      heroTimeline.from(
        heroBottom,
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.5"
      );

      heroTimeline.from(
        heroFloatingElements,
        {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

      /* =========================================
         GENERAL REVEAL
      ========================================= */

      const revealElements = document.querySelectorAll(
        `
        .section-label,
        .intro-content,
        .project-info,
        .service-item,
        .contact-button,
        .footer
        `
      );

      revealElements.forEach((element) => {
        gsap.from(element, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });

      /* =========================================
         PROJECT REVEAL + INTERACTION
      ========================================= */

      const projectCards =
        document.querySelectorAll(".project-card");

      projectCards.forEach((card) => {
        const visual =
          card.querySelector(".project-visual");

        const orb =
          card.querySelector(".visual-orb");

        const title =
          card.querySelector(".visual-title");

        const hoverLabel =
          card.querySelector(".project-hover-label");

        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });

        const enterProject = () => {
          cursor.classList.add("cursor-view");

          gsap.to(cursor, {
            width: 72,
            height: 72,
            duration: 0.4,
            ease: "power3.out",
          });

          if (hoverLabel) {
            gsap.to(hoverLabel, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
            });
          }
        };

        const leaveProject = () => {
          cursor.classList.remove("cursor-view");

          gsap.to(cursor, {
            width: 54,
            height: 54,
            duration: 0.4,
            ease: "power3.out",
          });

          if (hoverLabel) {
            gsap.to(hoverLabel, {
              opacity: 0,
              y: 15,
              duration: 0.3,
              ease: "power3.out",
            });
          }

          gsap.to(visual, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "power3.out",
          });

          gsap.to(orb, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });

          gsap.to(title, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        };

        const moveProject = (e) => {
          const rect =
            visual.getBoundingClientRect();

          const x =
            (e.clientX - rect.left) /
              rect.width -
            0.5;

          const y =
            (e.clientY - rect.top) /
              rect.height -
            0.5;

          gsap.to(visual, {
            rotateY: x * 10,
            rotateX: y * -10,
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(orb, {
            x: x * 40,
            y: y * 40,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(title, {
            x: x * -25,
            y: y * -25,
            duration: 0.6,
            ease: "power3.out",
          });
        };

        card.addEventListener(
          "mouseenter",
          enterProject
        );

        card.addEventListener(
          "mouseleave",
          leaveProject
        );

        card.addEventListener(
          "mousemove",
          moveProject
        );
      });

      /* =========================================
         STATEMENT
      ========================================= */

      const statementWords =
        document.querySelectorAll(
          ".statement-word"
        );

      statementWords.forEach((word) => {
        gsap.from(word, {
          y: 120,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",

          scrollTrigger: {
            trigger: word,
            start: "top 90%",
            once: true,
          },
        });
      });

      /* =========================================
         MARQUEE
      ========================================= */

      const marqueeTrack =
        document.querySelector(".marquee-track");

      if (marqueeTrack) {
        gsap.to(marqueeTrack, {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }

      /* =========================================
         CLEANUP
      ========================================= */

      return () => {
        window.removeEventListener(
          "mousemove",
          moveMouse
        );

        cursor.classList.remove(
          "cursor-invert",
          "cursor-view"
        );
      };
    }, appRef);

    return () => ctx.revert();
  }, []);

  /* =========================================
     CLOSE PROJECT MODAL
  ========================================= */

  const closeProject = () => {
    const modalLayer = document.querySelector(
      ".project-modal-layer"
    );

    const modalBackdrop = document.querySelector(
      ".project-modal-backdrop"
    );

    const modal = document.querySelector(
      ".project-modal"
    );

    if (!modalLayer || !modal || !modalBackdrop) {
      setActiveProject(null);
      return;
    }

    gsap
      .timeline({
        onComplete: () => {
          setActiveProject(null);
        },
      })
      .to(modal, {
        y: 40,
        opacity: 0,
        duration: 0.45,
        ease: "power3.in",
      })
      .to(
        modalBackdrop,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.2"
      );
  };

  return (
    <div ref={appRef} className="site">
      <CustomCursor cursorRef={cursorRef} />

      <div
        ref={spotlightRef}
        className="mouse-spotlight"
      />

      <Preloader />

      <Navbar />

      <main>
        <LandingPage heroRef={heroRef} />

        <Intro />

        <Product
          projects={projects}
          onProjectClick={setActiveProject}
        />

        <Marquee />

        <Services services={services} />

        <Statement />

        <Contact />
      </main>

      <Footer />

      <ProjectModal
        activeProject={activeProject}
        closeProject={closeProject}
      />
    </div>
  );
}

export default App;