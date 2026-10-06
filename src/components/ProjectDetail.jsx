import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from "./CustomCursor";
import { projects } from "../data/data";
import { photoData } from "../data/photoData";

import "./ProjectDetail.css";

gsap.registerPlugin(ScrollTrigger);

function ProjectDetail({ project }) {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const progressRef = useRef(null);

  // ============================================================
  // PHOTO DATA
  //
  // data.js:
  // hero: "C1"
  // horizontal: ["C2", "C3", "C4"]
  // vertical: ["C5", ...]
  //
  // photoData.js:
  // C1 -> coffeespot1.png
  // C2 -> coffeespot2.png
  // dst.
  // ============================================================

  const getPhoto = (id) => {
    if (!id) {
      return null;
    }

    return photoData?.[id] || null;
  };

  // ============================================================
  // HERO
  // ============================================================

  const heroItem = useMemo(() => {
    if (!project?.hero) {
      return null;
    }

    const photo = getPhoto(project.hero);

    if (!photo?.image) {
      return null;
    }

    return {
      id: project.hero,
      ...photo,
    };
  }, [project]);

  // ============================================================
  // HORIZONTAL
  // ============================================================

  const horizontalImages = useMemo(() => {
    if (!project) {
      return [];
    }

    return (project.horizontal || [])
      .map((id) => {
        const photo = getPhoto(id);

        if (!photo?.image) {
          return null;
        }

        return {
          id,
          ...photo,
        };
      })
      .filter(Boolean);
  }, [project]);

  // ============================================================
  // VERTICAL
  // ============================================================

  const verticalImages = useMemo(() => {
    if (!project) {
      return [];
    }

    return (project.vertical || [])
      .map((id) => {
        const photo = getPhoto(id);

        if (!photo?.image) {
          return null;
        }

        return {
          id,
          ...photo,
        };
      })
      .filter(Boolean);
  }, [project]);

  // ============================================================
  // ALL GALLERY
  // ============================================================

  const gallery = useMemo(() => {
    if (!project) {
      return [];
    }

    const items = [];

    if (heroItem) {
      items.push(heroItem);
    }

    items.push(...horizontalImages);
    items.push(...verticalImages);

    return items;
  }, [
    project,
    heroItem,
    horizontalImages,
    verticalImages,
  ]);

  // ============================================================
  // HERO IMAGE
  // ============================================================

  const heroImage =
    heroItem?.image ||
    horizontalImages[0]?.image ||
    verticalImages[0]?.image ||
    null;

  // ============================================================
  // NEXT PROJECT
  // ============================================================

  const nextProject = useMemo(() => {
    if (!project || !projects?.length) {
      return null;
    }

    const currentIndex = projects.findIndex(
      (item) => item.slug === project.slug
    );

    if (currentIndex === -1) {
      return null;
    }

    return projects[
      (currentIndex + 1) % projects.length
    ];
  }, [project]);

  // ============================================================
  // GSAP
  // ============================================================

  useEffect(() => {
    if (!project || !pageRef.current) {
      return;
    }

    const page = pageRef.current;

    const ctx = gsap.context(() => {
      // ========================================================
      // HERO
      // ========================================================

      const heroTimeline = gsap.timeline({
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
      // IDEA TEXT
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
        document.querySelector(
          ".case-horizontal"
        );

      const horizontalTrack =
        document.querySelector(
          ".case-horizontal-track"
        );

      if (
        horizontalSection &&
        horizontalTrack &&
        horizontalImages.length > 0
      ) {
        const horizontalCards =
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
              trigger: horizontalSection,
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

          horizontalCards.forEach(
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
        .toArray(".case-vertical-card")
        .forEach((card, index) => {
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
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        });

      // ========================================================
      // VERTICAL IMAGE NUMBER
      // ========================================================

      gsap.utils
        .toArray(".case-vertical-number")
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
      // TECH STACK
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

      gsap.from(
        ".case-final-image-inner",
        {
          scale: 0.88,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",

          scrollTrigger: {
            trigger: ".case-final-image",
            start: "top 80%",
            once: true,
          },
        }
      );

      // ========================================================
      // NEXT PROJECT
      // ========================================================

      gsap.from(".case-next-title span", {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",

        scrollTrigger: {
          trigger: ".case-next",
          start: "top 75%",
          once: true,
        },
      });

      // ========================================================
      // CURSOR
      // ========================================================

      const cursor = cursorRef.current;

      if (cursor) {
        const moveX = gsap.quickTo(
          cursor,
          "x",
          {
            duration: 0.18,
            ease: "power3.out",
          }
        );

        const moveY = gsap.quickTo(
          cursor,
          "y",
          {
            duration: 0.18,
            ease: "power3.out",
          }
        );

        const mouseMove = (event) => {
          moveX(event.clientX);
          moveY(event.clientY);
        };

        window.addEventListener(
          "mousemove",
          mouseMove
        );

        const interactive =
          page.querySelectorAll(
            "a, .case-image-wrap, .case-showcase-image"
          );

        const handlers = [];

        interactive.forEach((item) => {
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
        });

        page._cursorCleanup = () => {
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
  // NOT FOUND
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
  // TITLE
  // ============================================================

  const titleWords = project.title
    .split(" ")
    .filter(Boolean);

  return (
    <>
      <CustomCursor
        cursorRef={cursorRef}
      />

      <main
        ref={pageRef}
        className="case-page"
      >
        {/* =====================================
            PROGRESS
        ===================================== */}

        <div className="case-progress">
          <div
            ref={progressRef}
            className="case-progress-bar"
          />
        </div>

        {/* =====================================
            NAV
        ===================================== */}

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

        {/* =====================================
            HERO
        ===================================== */}

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
                alt={
                  heroItem?.title ||
                  project.title
                }
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

        {/* =====================================
            IDEA
        ===================================== */}

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

        {/* =====================================
            INFO
        ===================================== */}

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

        {/* =====================================
            HORIZONTAL
        ===================================== */}

        {horizontalImages.length >
          0 && (
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
                (
                  item,
                  index
                ) => (
                  <article
                    className={`case-showcase-card ${
                      index % 2 === 0
                        ? "card-up"
                        : "card-down"
                    }`}
                    key={item.id}
                  >
                    <div className="case-showcase-number">
                      {item.id}
                    </div>

                    <div className="case-showcase-image">
                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.title ||
                          `${project.title} screen ${
                            index +
                            2
                          }`
                        }
                        loading="lazy"
                      />
                    </div>

                    <div className="case-showcase-caption">
                      <div>
                        <strong>
                          {item.title}
                        </strong>

                        <p>
                          {
                            item.description
                          }
                        </p>
                      </div>

                      <span>
                        ↗
                      </span>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {/* =====================================
            VERTICAL STORY
        ===================================== */}

        {verticalImages.length >
          0 && (
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
                (
                  item,
                  index
                ) => (
                  <article
                    className={`case-vertical-card vertical-${
                      index % 3
                    }`}
                    key={item.id}
                  >
                    <div className="case-vertical-number">
                      {item.id}
                    </div>

                    <div className="case-vertical-image-wrap">
                      <img
                        className="case-vertical-image"
                        src={
                          item.image
                        }
                        alt={
                          item.title ||
                          `${project.title} detail ${
                            index +
                            1
                          }`
                        }
                        loading="lazy"
                      />

                      <div className="case-vertical-overlay">
                        <span>
                          {
                            project.title
                          }
                        </span>

                        <span>
                          DETAIL /{" "}
                          {item.id}
                        </span>
                      </div>
                    </div>

                    <div className="case-vertical-caption">
                      <span>
                        {item.id}
                      </span>

                      <div>
                        <strong>
                          {item.title}
                        </strong>

                        <p>
                          {
                            item.description
                          }
                        </p>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {/* =====================================
            TECHNOLOGY
        ===================================== */}

        <section className="case-tech">
          <div className="case-section-number">
            05 / BUILT WITH
          </div>

          <div className="case-tech-main">
            <h2>
              BUILT
              <br />
              TO{" "}
              <em>
                PERFORM.
              </em>
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
              {(project.stack ||
                []
              ).map(
                (
                  item,
                  index
                ) => (
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

                    <b>
                      ↗
                    </b>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* =====================================
            FINAL
        ===================================== */}

        {heroImage && (
          <section className="case-final-image">
            <div className="case-final-image-inner">
              <img
                src={heroImage}
                alt={
                  project.title
                }
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

        {/* =====================================
            NEXT
        ===================================== */}

        <section className="case-next">
          <div className="case-next-label">
            <span>
              NEXT PROJECT
            </span>

            <span>
              ↘
            </span>
          </div>

          <Link
            to={
              nextProject?.slug
                ? `/project/${nextProject.slug}`
                : "/"
            }
            className="case-next-link"
          >
            <div className="case-next-title">
              <span>
                {nextProject?.title ||
                  "BACK"}
              </span>

              {!nextProject?.title && (
                <span>
                  TO WORK
                </span>
              )}
            </div>

            <div className="case-next-arrow">
              ↗
            </div>
          </Link>
        </section>

        {/* =====================================
            FOOTER
        ===================================== */}

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