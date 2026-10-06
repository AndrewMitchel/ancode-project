import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from "./CustomCursor";

import { projects } from "../data/data";

import "./ProjectDetail.css";

gsap.registerPlugin(ScrollTrigger);

function ProjectDetail({ project }) {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const progressRef = useRef(null);

  // ============================================================
  // GALLERY
  // ============================================================

  const gallery = useMemo(() => {
    if (!project) return [];

    if (project.gallery?.length) {
      return project.gallery.filter(
        (item) => item?.image
      );
    }

    return (
      project.images
        ?.filter(Boolean)
        .map((image, index) => ({
          image,

          title:
            `SCREEN ${String(
              index + 1
            ).padStart(2, "0")}`,

          description:
            "A detailed view of the digital experience and interface.",
        })) || []
    );
  }, [project]);

  // ============================================================
  // HORIZONTAL IMAGES
  // ============================================================

  const horizontalImages = useMemo(() => {
    if (!project) return [];

    const galleryMap = new Map(
      gallery.map((item) => [
        item.image,
        item,
      ])
    );

    if (project.horizontalImages?.length) {
      return project.horizontalImages
        .map((item) => {
          if (typeof item === "object") {
            return item;
          }

          return galleryMap.get(item);
        })
        .filter(Boolean);
    }

    return gallery.slice(1, 4);
  }, [project, gallery]);

  // ============================================================
  // VERTICAL IMAGES
  // ============================================================

  const verticalImages = useMemo(() => {
    if (!project) return [];

    const galleryMap = new Map(
      gallery.map((item) => [
        item.image,
        item,
      ])
    );

    if (project.verticalImages?.length) {
      return project.verticalImages
        .map((item) => {
          if (typeof item === "object") {
            return item;
          }

          return galleryMap.get(item);
        })
        .filter(Boolean);
    }

    return gallery.slice(4);
  }, [project, gallery]);

  // ============================================================
  // GSAP
  // ============================================================

  useEffect(() => {
    if (
      !project ||
      !pageRef.current
    ) {
      return;
    }

    const page = pageRef.current;

    const ctx = gsap.context(() => {
      // ========================================================
      // HERO
      // ========================================================

      const heroTimeline =
        gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
        });

      heroTimeline
        .from(".case-topbar", {
          y: -25,
          opacity: 0,
          duration: 0.7,
        })

        .from(
          ".case-index",
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35"
        )

        .from(
          ".case-kicker",
          {
            y: 25,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )

        .from(
          ".case-title-line",
          {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.07,
          },
          "-=0.35"
        )

        .from(
          ".case-description",
          {
            y: 35,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.6"
        )

        .from(
          ".case-hero-frame",
          {
            scale: 0.88,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.5"
        );

      // ========================================================
      // HERO PARALLAX
      // ========================================================

      gsap.to(".case-hero-image", {
        scale: 1.08,

        yPercent: 10,

        ease: "none",

        scrollTrigger: {
          trigger: ".case-hero",

          start: "top top",

          end: "bottom top",

          scrub: 1.2,
        },
      });

      gsap.to(".case-hero-title", {
        yPercent: -25,

        ease: "none",

        scrollTrigger: {
          trigger: ".case-hero",

          start: "top top",

          end: "bottom top",

          scrub: 1,
        },
      });

      // ========================================================
      // READING PROGRESS
      // ========================================================

      gsap.to(progressRef.current, {
        scaleY: 1,

        ease: "none",

        scrollTrigger: {
          trigger: page,

          start: "top top",

          end: "bottom bottom",

          scrub: true,
        },
      });

      // ========================================================
      // STATEMENT
      // ========================================================

      gsap.from(".case-statement-word", {
        yPercent: 100,

        opacity: 0,

        stagger: 0.1,

        duration: 1,

        ease: "power4.out",

        scrollTrigger: {
          trigger: ".case-statement",

          start: "top 75%",

          once: true,
        },
      });

      // ========================================================
      // INFO
      // ========================================================

      gsap.from(".case-info-copy", {
        y: 70,

        opacity: 0,

        duration: 0.9,

        ease: "power4.out",

        scrollTrigger: {
          trigger: ".case-info",

          start: "top 75%",

          once: true,
        },
      });

      gsap.from(".case-meta-item", {
        y: 35,

        opacity: 0,

        duration: 0.7,

        stagger: 0.1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: ".case-meta",

          start: "top 80%",

          once: true,
        },
      });

      // ========================================================
      // HORIZONTAL GALLERY
      // ========================================================

      const horizontalSection =
        page.querySelector(
          ".case-horizontal"
        );

      const horizontalTrack =
        page.querySelector(
          ".case-horizontal-track"
        );

      if (
        horizontalSection &&
        horizontalTrack &&
        horizontalImages.length
      ) {
        const cards =
          gsap.utils.toArray(
            ".case-showcase-card"
          );

        if (window.innerWidth > 800) {
          const getDistance = () =>
            Math.max(
              0,

              horizontalTrack.scrollWidth -
                window.innerWidth +
                window.innerWidth * 0.15
            );

          gsap.to(horizontalTrack, {
            x: () => -getDistance(),

            ease: "none",

            scrollTrigger: {
              trigger:
                horizontalSection,

              start: "top top",

              end: () =>
                `+=${Math.max(
                  900,
                  getDistance() * 1.15
                )}`,

              scrub: 1,

              pin: true,

              anticipatePin: 1,

              invalidateOnRefresh: true,
            },
          });

          cards.forEach(
            (card, index) => {
              gsap.to(card, {
                rotate:
                  index % 2 === 0
                    ? 1.5
                    : -1.5,

                y:
                  index % 2 === 0
                    ? -25
                    : 25,

                ease: "none",

                scrollTrigger: {
                  trigger:
                    horizontalSection,

                  start: "top top",

                  end: () =>
                    `+=${Math.max(
                      900,
                      getDistance() * 1.15
                    )}`,

                  scrub: 1,
                },
              });
            }
          );
        }
      }

      // ========================================================
      // VERTICAL GALLERY
      // ========================================================

      gsap.utils
        .toArray(
          ".case-vertical-card"
        )
        .forEach(
          (card, index) => {
            const image =
              card.querySelector(
                ".case-vertical-image"
              );

            gsap.from(card, {
              y: 120,

              opacity: 0,

              rotate:
                index % 2 === 0
                  ? -2
                  : 2,

              duration: 1.1,

              ease: "power4.out",

              scrollTrigger: {
                trigger: card,

                start: "top 85%",

                once: true,
              },
            });

            if (image) {
              gsap.to(image, {
                yPercent: -8,

                scale: 1.05,

                ease: "none",

                scrollTrigger: {
                  trigger: card,

                  start:
                    "top bottom",

                  end:
                    "bottom top",

                  scrub: 1,
                },
              });
            }
          }
        );

      // ========================================================
      // NUMBERS
      // ========================================================

      gsap.utils
        .toArray(
          ".case-vertical-number"
        )
        .forEach((number) => {
          gsap.from(number, {
            x: -30,

            opacity: 0,

            duration: 0.7,

            ease: "power3.out",

            scrollTrigger: {
              trigger: number,

              start: "top 85%",

              once: true,
            },
          });
        });

      // ========================================================
      // DESCRIPTION ANIMATION
      // ========================================================

      gsap.utils
        .toArray(
          ".case-showcase-description, .case-vertical-description"
        )
        .forEach(
          (description) => {
            gsap.from(
              description,
              {
                y: 30,

                opacity: 0,

                duration: 0.7,

                ease: "power3.out",

                scrollTrigger: {
                  trigger:
                    description,

                  start: "top 85%",

                  once: true,
                },
              }
            );
          }
        );

      // ========================================================
      // TECH
      // ========================================================

      gsap.from(".case-tech-item", {
        y: 40,

        opacity: 0,

        duration: 0.7,

        stagger: 0.08,

        ease: "power3.out",

        scrollTrigger: {
          trigger: ".case-tech-list",

          start: "top 80%",

          once: true,
        },
      });

      // ========================================================
      // FINAL IMAGE
      // ========================================================

      gsap.from(".case-final-image-inner", {
        scale: 0.88,

        opacity: 0,

        duration: 1.2,

        ease: "power4.out",

        scrollTrigger: {
          trigger:
            ".case-final-image",

          start: "top 80%",

          once: true,
        },
      });

      // ========================================================
      // BACK TO TOP
      // ========================================================

      gsap.from(".case-back-top-link", {
        y: 50,

        opacity: 0,

        duration: 0.9,

        ease: "power4.out",

        scrollTrigger: {
          trigger: ".case-next",

          start: "top 85%",

          once: true,
        },
      });

      // ========================================================
      // CURSOR
      // ========================================================

      const cursor =
        cursorRef.current;

      if (cursor) {
        const moveX =
          gsap.quickTo(
            cursor,
            "x",
            {
              duration: 0.18,
              ease: "power3.out",
            }
          );

        const moveY =
          gsap.quickTo(
            cursor,
            "y",
            {
              duration: 0.18,
              ease: "power3.out",
            }
          );

        const mouseMove =
          (event) => {
            moveX(
              event.clientX
            );

            moveY(
              event.clientY
            );
          };

        window.addEventListener(
          "mousemove",
          mouseMove
        );

        const interactive =
          page.querySelectorAll(
            "a, .case-showcase-image, .case-vertical-image-wrap, .case-back-top-link"
          );

        const handlers = [];

        interactive.forEach(
          (item) => {
            const enter = () => {
              cursor.classList.add(
                "cursor-invert"
              );

              gsap.to(cursor, {
                width: 88,

                height: 88,

                duration: 0.3,

                ease: "power3.out",
              });
            };

            const leave = () => {
              cursor.classList.remove(
                "cursor-invert"
              );

              gsap.to(cursor, {
                width: 54,

                height: 54,

                duration: 0.3,

                ease: "power3.out",
              });
            };

            item.addEventListener(
              "mouseenter",
              enter
            );

            item.addEventListener(
              "mouseleave",
              leave
            );

            handlers.push({
              item,
              enter,
              leave,
            });
          }
        );

        page._cursorCleanup =
          () => {
            window.removeEventListener(
              "mousemove",
              mouseMove
            );

            handlers.forEach(
              ({
                item,
                enter,
                leave,
              }) => {
                item.removeEventListener(
                  "mouseenter",
                  enter
                );

                item.removeEventListener(
                  "mouseleave",
                  leave
                );
              }
            );
          };
      }
    }, page);

    return () => {
      if (page._cursorCleanup) {
        page._cursorCleanup();
      }

      ctx.revert();
    };
  }, [
    project,
    horizontalImages.length,
    verticalImages.length,
  ]);

  // ============================================================
  // 404
  // ============================================================

  if (!project) {
    return (
      <main className="case-not-found">
        <CustomCursor
          cursorRef={cursorRef}
        />

        <div>
          <span>404</span>

          <h1>
            PROJECT NOT FOUND
          </h1>

          <Link to="/">
            BACK TO WORK ↗
          </Link>
        </div>
      </main>
    );
  }

  // ============================================================
  // HERO IMAGE
  // ============================================================

  const heroImage =
    gallery[0]?.image ||
    horizontalImages[0]?.image ||
    verticalImages[0]?.image ||
    null;

  const titleWords =
    project.title
      .split(" ")
      .filter(Boolean);

  // ============================================================
  // BACK TO TOP FUNCTION
  // ============================================================

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <CustomCursor
        cursorRef={cursorRef}
      />

      <main
        ref={pageRef}
        className="case-page"
      >
        {/* =====================================================
            PROGRESS
        ===================================================== */}

        <div className="case-progress">
          <div
            ref={progressRef}
            className="case-progress-bar"
          />
        </div>

        {/* =====================================================
            NAV
        ===================================================== */}

        <header className="case-topbar">
          <Link
            to="/"
            className="case-logo"
          >
            ancode.
          </Link>

          <div className="case-top-right">
            <span>
              CASE STUDY
            </span>

            <Link to="/">
              BACK TO WORK{" "}
              <b>↗</b>
            </Link>
          </div>
        </header>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="case-hero">
          <div className="case-index">
            <span>
              PROJECT
            </span>

            <strong>
              {project.number ||
                "01"}
            </strong>
          </div>

          <div className="case-kicker">
            {project.type ||
              "DIGITAL EXPERIENCE"}
          </div>

          <div className="case-hero-title">
            {titleWords.map(
              (word, index) => (
                <div
                  className="case-title-mask"
                  key={`${word}-${index}`}
                >
                  <span className="case-title-line">
                    {word}
                  </span>
                </div>
              )
            )}
          </div>

          <div className="case-description">
            <span>
              OVERVIEW
            </span>

            <p>
              {project.longDescription ||
                project.description ||
                project.about}
            </p>
          </div>

          {heroImage && (
            <div className="case-hero-frame">
              <div className="case-hero-corner top-left">
                <span>
                  01
                </span>
              </div>

              <div className="case-hero-corner bottom-right">
                <span>
                  {String(
                    gallery.length
                  ).padStart(
                    2,
                    "0"
                  )}
                </span>
              </div>

              <img
                className="case-hero-image"
                src={heroImage}
                alt={project.title}
              />

              <div className="case-hero-overlay">
                <span>
                  {project.title}
                </span>

                <span>
                  SCROLL TO EXPLORE ↓
                </span>
              </div>
            </div>
          )}
        </section>

        {/* =====================================================
            IDEA
        ===================================================== */}

        <section className="case-statement">
          <div className="case-section-number">
            01 / THE IDEA
          </div>

          <div className="case-statement-content">
            <div className="statement-line">
              <span className="case-statement-word">
                DIGITAL
              </span>
            </div>

            <div className="statement-line indent">
              <span className="case-statement-word">
                EXPERIENCES
              </span>
            </div>

            <div className="statement-line">
              <span className="case-statement-word muted">
                MADE
              </span>

              <span className="case-statement-word">
                SIMPLE.
              </span>
            </div>
          </div>

          <p className="case-statement-copy">
            {project.about ||
              project.description}
          </p>
        </section>

        {/* =====================================================
            PROJECT INFO
        ===================================================== */}

        <section className="case-info">
          <div className="case-section-number">
            02 / PROJECT
          </div>

          <div className="case-info-copy">
            <p>
              {project.longDescription ||
                project.description ||
                project.about}
            </p>
          </div>

          <div className="case-meta">
            <div className="case-meta-item">
              <span>
                TYPE
              </span>

              <strong>
                {project.type ||
                  "WEB"}
              </strong>
            </div>

            <div className="case-meta-item">
              <span>
                YEAR
              </span>

              <strong>
                {project.year ||
                  "2026"}
              </strong>
            </div>

            <div className="case-meta-item">
              <span>
                SCREENS
              </span>

              <strong>
                {gallery.length}
              </strong>
            </div>

            <div className="case-meta-item">
              <span>
                STACK
              </span>

              <strong>
                {project.stack?.join(
                  " / "
                ) ||
                  "DIGITAL"}
              </strong>
            </div>
          </div>
        </section>

        {/* =====================================================
            HORIZONTAL GALLERY
        ===================================================== */}

        {horizontalImages.length > 0 && (
          <section className="case-horizontal">
            <div className="case-horizontal-header">
              <span>
                03 / SELECTED SCREENS
              </span>

              <span>
                SCROLL →
              </span>
            </div>

            <div className="case-horizontal-track">
              {horizontalImages.map(
                (item, index) => (
                  <article
                    className={`case-showcase-card ${
                      index % 2 === 0
                        ? "card-up"
                        : "card-down"
                    }`}
                    key={`${item.image}-${index}`}
                  >
                    <div className="case-showcase-number">
                      {String(
                        index + 2
                      ).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="case-showcase-image">
                      <img
                        src={item.image}
                        alt={`${project.title} ${item.title}`}
                        loading="lazy"
                      />
                    </div>

                    <div className="case-showcase-caption">
                      <div className="case-showcase-caption-top">
                        <span>
                          {item.title}
                        </span>

                        <span>
                          {String(
                            index + 2
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>

                      <p className="case-showcase-description">
                        {item.description}
                      </p>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            VERTICAL GALLERY
        ===================================================== */}

        {verticalImages.length > 0 && (
          <section className="case-vertical">
            <div className="case-vertical-header">
              <div className="case-section-number">
                04 / DETAILS
              </div>

              <p>
                SCROLL DOWN.
                <br />
                TAKE A CLOSER LOOK.
              </p>
            </div>

            <div className="case-vertical-list">
              {verticalImages.map(
                (item, index) => (
                  <article
                    className={`case-vertical-card vertical-${
                      index % 3
                    }`}
                    key={`${item.image}-${index}`}
                  >
                    <div className="case-vertical-number">
                      {String(
                        index +
                          horizontalImages.length +
                          2
                      ).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="case-vertical-image-wrap">
                      <img
                        className="case-vertical-image"
                        src={item.image}
                        alt={`${project.title} ${item.title}`}
                        loading="lazy"
                      />

                      <div className="case-vertical-overlay">
                        <span>
                          {project.title}
                        </span>

                        <span>
                          DETAIL /{" "}
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="case-vertical-caption">
                      <div className="case-vertical-caption-top">
                        <span>
                          {item.title}
                        </span>

                        <span>
                          {String(
                            index +
                              horizontalImages.length +
                              2
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>

                      <p className="case-vertical-description">
                        {item.description}
                      </p>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            TECHNOLOGY
        ===================================================== */}

        <section className="case-tech">
          <div className="case-section-number">
            05 / BUILT WITH
          </div>

          <div className="case-tech-main">
            <h2>
              BUILT
              <br />
              TO <em>PERFORM.</em>
            </h2>

            <p>
              Every part of the
              experience was
              designed around
              clarity, usability
              and a strong visual
              identity.
            </p>

            <div className="case-tech-list">
              {(project.stack || []).map(
                (item, index) => (
                  <div
                    className="case-tech-item"
                    key={item}
                  >
                    <span>
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <strong>
                      {item}
                    </strong>

                    <b>↗</b>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL IMAGE
        ===================================================== */}

        {heroImage && (
          <section className="case-final-image">
            <div className="case-final-image-inner">
              <img
                src={heroImage}
                alt={project.title}
              />

              <div className="case-final-overlay">
                <span>
                  END OF CASE STUDY
                </span>

                <strong>
                  {project.title}
                </strong>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            BACK TO TOP
        ===================================================== */}

        <section className="case-next">
          <button
            type="button"
            className="case-back-top-link"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            <span className="case-back-top-text">
              BACK TO TOP
            </span>

            <span className="case-back-top">
              ↑
            </span>
          </button>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="case-footer">
          <span>
            ancode. © 2026
          </span>

          <span>
            {project.title}
          </span>

          <Link to="/">
            BACK TO WORK ↗
          </Link>
        </footer>
      </main>
    </>
  );
}

export default ProjectDetail;