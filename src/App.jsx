import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "NOVA",
    type: "WEB EXPERIENCE",
    className: "project-one",
    description:
      "A bold digital experience built around motion, visual rhythm and immersive interaction.",
    stack: ["REACT", "GSAP", "UI / UX", "WEB"],
  },
  {
    number: "02",
    title: "MONO",
    type: "DIGITAL PRODUCT",
    className: "project-two",
    description:
      "A minimal digital product focused on clarity, speed and a strong visual system.",
    stack: ["REACT", "PRODUCT", "UI / UX", "SYSTEM"],
  },
  {
    number: "03",
    title: "FORMA",
    type: "WEB APPLICATION",
    className: "project-three",
    description:
      "A functional web application combining custom interfaces with expressive interactions.",
    stack: ["REACT", "APP", "DEVELOPMENT", "SYSTEM"],
  },
];

const services = [
  "WEB DEVELOPMENT",
  "WEB APPLICATION",
  "MOBILE APPLICATION",
  "UI / UX DESIGN",
  "CUSTOM SOFTWARE",
];

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

      // ==========================================
      // SMOOTH MOUSE
      // ==========================================

      const cursorX = gsap.quickTo(cursor, "x", {
        duration: 0.18,
        ease: "power3.out",
      });

      const cursorY = gsap.quickTo(cursor, "y", {
        duration: 0.18,
        ease: "power3.out",
      });

      const moveMouse = (e) => {
        cursorX(e.clientX);
        cursorY(e.clientY);

        if (spotlight) {
          gsap.quickTo(spotlight, "x", {
            duration: 0.4,
            ease: "power3.out",
          })(e.clientX);

          gsap.quickTo(spotlight, "y", {
            duration: 0.4,
            ease: "power3.out",
          })(e.clientY);
        }

        if (hero) {
          const x =
            (e.clientX / window.innerWidth - 0.5) * 2;

          const y =
            (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(".hero-background-shape", {
            x: x * 25,
            y: y * 25,
            duration: 1.2,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(".hero-floating", {
            x: x * -12,
            y: y * -12,
            duration: 1.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      window.addEventListener("mousemove", moveMouse);

      // ==========================================
      // TEXT INVERT
      // ==========================================

      const invertTargets = document.querySelectorAll(
        ".hero-word, .hero-description p, .intro-content p:first-child, .intro-small, .services-heading h2, .service-item h3, .statement-word, .contact-content h2, .contact-small"
      );

      const textEnter = () => {
        cursor.classList.add("cursor-invert");

        gsap.to(cursor, {
          width: 110,
          height: 110,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const textLeave = () => {
        cursor.classList.remove("cursor-invert");

        gsap.to(cursor, {
          width: 54,
          height: 54,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      invertTargets.forEach((element) => {
        element.addEventListener("mouseenter", textEnter);
        element.addEventListener("mouseleave", textLeave);
      });

      // ==========================================
      // PRELOADER
      // ==========================================

      const counter = { value: 0 };

      const loaderTimeline = gsap.timeline();

      loaderTimeline.to(counter, {
        value: 100,
        duration: 1.8,
        ease: "power3.out",

        onUpdate: () => {
          const number =
            document.querySelector(".loader-number");

          if (number) {
            number.textContent = Math.floor(counter.value)
              .toString()
              .padStart(2, "0");
          }
        },
      });

      loaderTimeline.to(".loader-number", {
        y: -100,
        opacity: 0,
        duration: 0.45,
        ease: "power3.inOut",
      });

      loaderTimeline.to(
        ".loader",
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.15,
          ease: "power4.inOut",
        },
        "-=0.1"
      );

      // ==========================================
      // HERO INTRO
      // ==========================================

      const heroTimeline = gsap.timeline({
        delay: 2.25,
      });

      heroTimeline
        .from(".hero-eyebrow", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".hero-word",
          {
            yPercent: 120,
            opacity: 0,
            duration: 1.15,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          ".hero-bottom",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // ==========================================
      // HERO SCROLL
      // ==========================================

      gsap.to(".hero-title", {
        yPercent: -18,

        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-description", {
        yPercent: -30,

        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-background-shape", {
        yPercent: 30,
        rotation: 25,

        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ==========================================
      // GENERAL REVEAL
      // ==========================================

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
        });
      });

      // ==========================================
      // PROJECT REVEAL
      // ==========================================

      gsap.utils
        .toArray(".project-card")
        .forEach((project, index) => {
          gsap.from(project, {
            y: 100,
            opacity: 0,
            duration: 1.1,
            delay: index * 0.08,
            ease: "power3.out",

            scrollTrigger: {
              trigger: project,
              start: "top 85%",
            },
          });
        });

      // ==========================================
      // PROJECT MOUSE EFFECT
      // ==========================================

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

          if (hoverLabel) {
            gsap.to(hoverLabel, {
              opacity: 0,
              y: 15,
              duration: 0.25,
            });
          }
        };

        const moveProject = (e) => {
          const rect = card.getBoundingClientRect();

          const x =
            (e.clientX - rect.left) / rect.width - 0.5;

          const y =
            (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(visual, {
            rotateY: x * 7,
            rotateX: y * -7,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(orb, {
            x: x * 45,
            y: y * 45,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
          });

          gsap.to(title, {
            x: x * -25,
            y: y * -25,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
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

        card.addEventListener("click", () => {
          const projectNumber =
            card.dataset.project;

          const selected =
            projects.find(
              (item) =>
                item.number === projectNumber
            );

          setActiveProject(selected);
        });
      });

      // ==========================================
      // STATEMENT
      // ==========================================

      gsap.from(".statement-word", {
        y: 120,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",

        scrollTrigger: {
          trigger: ".statement",
          start: "top 70%",
        },
      });

      // ==========================================
      // MARQUEE
      // ==========================================

      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      return () => {
        window.removeEventListener(
          "mousemove",
          moveMouse
        );

        invertTargets.forEach((element) => {
          element.removeEventListener(
            "mouseenter",
            textEnter
          );

          element.removeEventListener(
            "mouseleave",
            textLeave
          );
        });
      };
    }, appRef);

    return () => ctx.revert();
  }, []);

  // ==========================================
  // PROJECT MODAL
  // ==========================================

  useEffect(() => {
    if (!activeProject) return;

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      gsap.fromTo(
        ".project-modal-backdrop",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".project-modal",
        {
          y: 80,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".modal-content > *",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          delay: 0.15,
          ease: "power3.out",
        }
      );
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  const closeProject = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProject(null);
      },
    });

    tl.to(".modal-content > *", {
      y: -15,
      opacity: 0,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
    })
      .to(
        ".project-modal",
        {
          y: 50,
          opacity: 0,
          scale: 0.97,
          duration: 0.4,
          ease: "power3.inOut",
        },
        "-=0.1"
      )
      .to(
        ".project-modal-backdrop",
        {
          opacity: 0,
          duration: 0.35,
        },
        "-=0.25"
      );
  };

  return (
    <div ref={appRef} className="site">

      {/* =====================================
          CURSOR
      ===================================== */}

      <div
        ref={cursorRef}
        className="custom-cursor"
      >
        <span>↗</span>

        <strong>
          VIEW
        </strong>
      </div>

      <div
        ref={spotlightRef}
        className="mouse-spotlight"
      ></div>

      {/* =====================================
          PRELOADER
      ===================================== */}

      <div className="loader">

        <div className="loader-brand">
          ancode.
        </div>

        <div className="loader-content">

          <span className="loader-label">
            BUILDING DIGITAL EXPERIENCES
          </span>

          <span className="loader-number">
            00
          </span>

        </div>

        <div className="loader-line"></div>

      </div>

      {/* =====================================
          NAVBAR
      ===================================== */}

      <header className="navbar">

        <a href="#" className="logo">
          ancode.
        </a>

        <nav>
          <a href="#work">
            WORK
          </a>

          <a href="#services">
            SERVICES
          </a>

          <a href="#contact">
            CONTACT
          </a>
        </nav>

        <div className="menu-status">
          AVAILABLE
          <span></span>
        </div>

      </header>

      <main>

        {/* =====================================
            HERO
        ===================================== */}

        <section
          ref={heroRef}
          className="hero"
        >

          <div className="hero-background">

            <div className="hero-grid"></div>

            <div className="hero-background-shape"></div>

          </div>

          <div className="hero-content">

            <div className="hero-eyebrow">

              <span>
                01 — DIGITAL STUDIO
              </span>

              <span>
                INDONESIA / 2026
              </span>

            </div>

            <div className="hero-title">

              <div className="hero-word-wrapper">

                <span className="hero-word">
                  WE
                </span>

              </div>

              <div className="hero-word-wrapper hero-indent">

                <span className="hero-word">
                  BUILD
                </span>

              </div>

              <div className="hero-word-wrapper">

                <span className="hero-word">
                  DIGITAL
                  <span className="hero-dot">
                    .
                  </span>
                </span>

              </div>

            </div>

            <div className="hero-description">

              <p>
                WE DESIGN AND BUILD
                <br />
                DIGITAL PRODUCTS
                <br />
                WITH CHARACTER.
              </p>

            </div>

            <div className="hero-floating floating-one">
              WEB
            </div>

            <div className="hero-floating floating-two">
              APP
            </div>

            <div className="hero-floating floating-three">
              CODE
            </div>

          </div>

          <div className="hero-bottom">

            <div className="hero-location">

              <span className="status-dot"></span>

              AVAILABLE FOR PROJECTS

            </div>

            <a
              href="#work"
              className="scroll-indicator"
            >

              <span>
                SCROLL TO EXPLORE
              </span>

              <div className="scroll-arrow">
                ↓
              </div>

            </a>

            <div className="hero-services">
              WEB / APP / DESIGN
            </div>

          </div>

        </section>

        {/* =====================================
            INTRO
        ===================================== */}

        <section className="intro section">

          <div className="section-label reveal">

            <span>
              (01)
            </span>

            <span>
              INTRODUCTION
            </span>

          </div>

          <div className="intro-content reveal">

            <p>
              WE BUILD DIGITAL EXPERIENCES
              THAT ARE DESIGNED TO BE
              REMEMBERED.
            </p>

            <p className="intro-small">
              From websites to applications,
              we combine design, technology
              and motion to create digital
              products with character.
            </p>

          </div>

        </section>

        {/* =====================================
            WORK
        ===================================== */}

        <section
          id="work"
          className="work section"
        >

          <div className="section-label reveal">

            <span>
              (02)
            </span>

            <span>
              SELECTED WORK
            </span>

          </div>

          <div className="projects">

            {projects.map((project) => (

              <article
                className="project-card"
                key={project.number}
                data-project={project.number}
              >

                <div
                  className={`project-visual ${project.className}`}
                >

                  <div className="visual-grid"></div>

                  <div className="visual-orb"></div>

                  <span className="visual-title">
                    {project.title}
                  </span>

                  <span className="visual-arrow">
                    ↗
                  </span>

                  <div className="project-hover-label">

                    <span>
                      EXPLORE PROJECT
                    </span>

                    <span>
                      ↗
                    </span>

                  </div>

                </div>

                <div className="project-info">

                  <div>

                    <span>
                      {project.number}
                    </span>

                    <div>

                      <h3>
                        {project.title}
                      </h3>

                      <p className="project-description">
                        {project.description}
                      </p>

                      <div className="project-tags">

                        {project.stack.map((tag) => (

                          <span key={tag}>
                            {tag}
                          </span>

                        ))}

                      </div>

                    </div>

                  </div>

                  <div className="project-type">
                    {project.type}
                  </div>

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* =====================================
            MARQUEE
        ===================================== */}

        <section className="marquee">

          <div className="marquee-track">

            <span>
              DESIGN — DEVELOPMENT — MOTION —
            </span>

            <span>
              DESIGN — DEVELOPMENT — MOTION —
            </span>

            <span>
              DESIGN — DEVELOPMENT — MOTION —
            </span>

          </div>

        </section>

        {/* =====================================
            SERVICES
        ===================================== */}

        <section
          id="services"
          className="services section"
        >

          <div className="section-label reveal">

            <span>
              (03)
            </span>

            <span>
              WHAT WE DO
            </span>

          </div>

          <div className="services-heading reveal">

            <h2>
              DIGITAL
              <br />

              <span>
                CRAFT.
              </span>

            </h2>

          </div>

          <div className="service-list">

            {services.map((service, index) => (

              <div
                className="service-item reveal"
                key={service}
              >

                <span>
                  0{index + 1}
                </span>

                <h3>
                  {service}
                </h3>

                <span className="service-arrow">
                  ↗
                </span>

              </div>

            ))}

          </div>

        </section>

        {/* =====================================
            STATEMENT
        ===================================== */}

        <section className="statement section">

          <div className="statement-content">

            <span className="statement-word">
              GOOD
            </span>

            <span className="statement-word">
              DESIGN
            </span>

            <span className="statement-word">
              SHOULD
            </span>

            <span className="statement-word outline">
              MOVE.
            </span>

          </div>

        </section>

        {/* =====================================
            CONTACT
        ===================================== */}

        <section
          id="contact"
          className="contact section"
        >

          <div className="section-label">

            <span>
              (04)
            </span>

            <span>
              CONTACT
            </span>

          </div>

          <div className="contact-content">

            <p className="contact-small">
              HAVE A PROJECT IN MIND?
            </p>

            <h2>
              LET'S
              <br />
              MAKE
              <br />
              SOMETHING
              <br />

              <span>
                GOOD.
              </span>

            </h2>

            <a
              href="mailto:hello@ancode.dev"
              className="contact-button"
            >

              START A PROJECT

              <span>
                ↗
              </span>

            </a>

          </div>

        </section>

      </main>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="footer">

        <div className="footer-top">

          <div className="footer-logo">
            ancode.
          </div>

          <p>
            DIGITAL STUDIO
            <br />
            INDONESIA
          </p>

          <p>
            WEB
            <br />
            APP
            <br />
            DESIGN
          </p>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 ancode.
          </span>

          <span>
            ALL RIGHTS RESERVED
          </span>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            BACK TO TOP ↑
          </a>

        </div>

      </footer>

      {/* =====================================
          PROJECT MODAL
      ===================================== */}

      {activeProject && (

        <div
          className="project-modal-layer"
          onClick={closeProject}
        >

          <div className="project-modal-backdrop"></div>

          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={closeProject}
            >
              CLOSE
              <span>×</span>
            </button>

            <div className="modal-content">

              <div className="modal-top">

                <span>
                  {activeProject.number}
                </span>

                <span>
                  {activeProject.type}
                </span>

              </div>

              <div
                className={`modal-visual ${activeProject.className}`}
              >

                <div className="modal-visual-grid"></div>

                <div className="modal-visual-shape"></div>

                <span>
                  {activeProject.title}
                </span>

              </div>

              <div className="modal-info">

                <div>

                  <p className="modal-label">
                    ABOUT THE PROJECT
                  </p>

                  <h2>
                    {activeProject.title}
                  </h2>

                </div>

                <div className="modal-description">

                  <p>
                    {activeProject.description}
                  </p>

                  <div className="modal-stack">

                    {activeProject.stack.map(
                      (tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      )
                    )}

                  </div>

                </div>

              </div>

              <div className="modal-footer">

                <span>
                  DIGITAL EXPERIENCE
                </span>

                <span>
                  ancode. / 2026
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;