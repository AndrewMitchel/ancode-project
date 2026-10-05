import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import "./ProjectDetail.css";
import "../styles/cursor.css";

import CustomCursor from "./CustomCursor";


function ProjectDetail({ project }) {

  const cursorRef =
    useRef(null);


  /*
    =========================================
    BACK TO WORK
    =========================================

    Kita kasih tanda bahwa navigasi ini
    berasal dari project detail.

    Jadi Landing Page tidak menampilkan
    loading.

    Flag ini hanya dipakai SATU KALI.
  */

  const handleBackToWork = () => {

    sessionStorage.setItem(
      "ancode-skip-next-loading",
      "true"
    );

  };


  /* =========================================
     CUSTOM CURSOR
  ========================================= */

  useEffect(() => {

    const cursor =
      cursorRef.current;


    if (!cursor) {
      return;
    }


    /* =========================================
       CURSOR MOVEMENT
    ========================================= */

    const moveCursorX =
      gsap.quickTo(
        cursor,
        "x",
        {
          duration: 0.18,
          ease: "power3.out",
        }
      );


    const moveCursorY =
      gsap.quickTo(
        cursor,
        "y",
        {
          duration: 0.18,
          ease: "power3.out",
        }
      );


    const moveMouse =
      (e) => {

        moveCursorX(
          e.clientX
        );


        moveCursorY(
          e.clientY
        );

      };


    window.addEventListener(
      "mousemove",
      moveMouse
    );


    /* =========================================
       TEXT CURSOR INTERACTION
    ========================================= */

    const textTargets =
      document.querySelectorAll(`
        .project-detail-logo,
        .project-detail-back,
        .project-detail-meta,
        .project-detail-title p,
        .project-detail-title h1,
        .project-detail-intro p,
        .detail-info-label,
        .detail-info-content p,
        .detail-info-grid span,
        .detail-info-grid strong,
        .project-gallery-heading,
        .project-gallery-item figcaption,
        .project-detail-stack,
        .detail-stack-list span,
        .project-detail-footer
      `);


    const handlers = [];


    textTargets.forEach(
      (text) => {

        const enter = () => {

          cursor.classList.add(
            "cursor-invert"
          );


          gsap.to(
            cursor,
            {
              width: 110,
              height: 110,
              duration: 0.45,
              ease: "power3.out",
            }
          );

        };


        const leave = () => {

          cursor.classList.remove(
            "cursor-invert"
          );


          gsap.to(
            cursor,
            {
              width: 54,
              height: 54,
              duration: 0.45,
              ease: "power3.out",
            }
          );

        };


        text.addEventListener(
          "mouseenter",
          enter
        );


        text.addEventListener(
          "mouseleave",
          leave
        );


        handlers.push({
          text,
          enter,
          leave,
        });

      }
    );


    /* =========================================
       PROJECT IMAGES
    ========================================= */

    const images =
      document.querySelectorAll(
        ".project-detail img"
      );


    images.forEach(
      (image) => {

        const enter = () => {

          cursor.classList.add(
            "cursor-invert"
          );


          gsap.to(
            cursor,
            {
              width: 72,
              height: 72,
              duration: 0.4,
              ease: "power3.out",
            }
          );

        };


        const leave = () => {

          cursor.classList.remove(
            "cursor-invert"
          );


          gsap.to(
            cursor,
            {
              width: 54,
              height: 54,
              duration: 0.4,
              ease: "power3.out",
            }
          );

        };


        image.addEventListener(
          "mouseenter",
          enter
        );


        image.addEventListener(
          "mouseleave",
          leave
        );


        handlers.push({
          text: image,
          enter,
          leave,
        });

      }
    );


    /* =========================================
       CLEANUP
    ========================================= */

    return () => {

      window.removeEventListener(
        "mousemove",
        moveMouse
      );


      handlers.forEach(
        ({
          text,
          enter,
          leave,
        }) => {

          text.removeEventListener(
            "mouseenter",
            enter
          );


          text.removeEventListener(
            "mouseleave",
            leave
          );

        }
      );

    };

  }, []);


  /* =========================================
     PROJECT NOT FOUND
  ========================================= */

  if (!project) {

    return (
      <>

        <CustomCursor
          cursorRef={cursorRef}
        />


        <main className="project-detail-not-found">

          <div>

            <span>
              404
            </span>


            <h1>
              PROJECT NOT FOUND
            </h1>


            <Link
              to="/"
              onClick={
                handleBackToWork
              }
            >
              BACK TO WORK ↗
            </Link>

          </div>

        </main>

      </>
    );

  }


  const gallery =
    project.images?.length
      ? project.images
      : [project.image];


  return (
    <>

      {/* =========================================
          CUSTOM CURSOR
      ========================================= */}

      <CustomCursor
        cursorRef={cursorRef}
      />


      {/* =========================================
          PROJECT DETAIL
      ========================================= */}

      <main className="project-detail">


        {/* =========================================
            HEADER
        ========================================= */}

        <header className="project-detail-header">

          <Link
            to="/"
            onClick={
              handleBackToWork
            }
            className="project-detail-logo"
          >
            ancode.
          </Link>


          <Link
            to="/"
            onClick={
              handleBackToWork
            }
            className="project-detail-back"
          >

            BACK TO WORK


            <span>
              ↗
            </span>

          </Link>

        </header>


        {/* =========================================
            HERO
        ========================================= */}

        <section className="project-detail-hero">

          <div className="project-detail-meta">

            <span>
              ({project.number})
            </span>


            <span>
              {project.type}
            </span>

          </div>


          <div className="project-detail-title">

            <p>
              SELECTED PROJECT
            </p>


            <h1>
              {project.title}
            </h1>

          </div>


          <div className="project-detail-intro">

            <p>
              {project.longDescription ||
                project.description}
            </p>

          </div>

        </section>


        {/* =========================================
            FEATURE IMAGE
        ========================================= */}

        <section className="project-detail-feature">

          <img
            src={gallery[0]}
            alt={`${project.title} project`}
          />

        </section>


        {/* =========================================
            ABOUT
        ========================================= */}

        <section className="project-detail-info">

          <div className="detail-info-label">
            ABOUT THE PROJECT
          </div>


          <div className="detail-info-content">

            <p>
              {project.about ||
                project.description}
            </p>


            <div className="detail-info-grid">

              <div>

                <span>
                  TYPE
                </span>


                <strong>
                  {project.type}
                </strong>

              </div>


              <div>

                <span>
                  YEAR
                </span>


                <strong>
                  {project.year ||
                    "2026"}
                </strong>

              </div>


              <div>

                <span>
                  SERVICES
                </span>


                <strong>
                  {project.stack?.join(
                    " / "
                  )}
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            GALLERY
        ========================================= */}

        <section className="project-gallery">

          <div className="project-gallery-heading">

            <span>
              PROJECT GALLERY
            </span>


            <span>
              {gallery.length} IMAGES
            </span>

          </div>


          <div className="project-gallery-grid">

            {gallery.map(
              (image, index) => (

                <figure
                  className={
                    index === 0
                      ? "project-gallery-item project-gallery-item-large"
                      : "project-gallery-item"
                  }

                  key={
                    `${project.title}-${index}`
                  }
                >

                  <img
                    src={image}
                    alt={
                      `${project.title} ${
                        index + 1
                      }`
                    }

                    loading={
                      index === 0
                        ? "eager"
                        : "lazy"
                    }
                  />


                  <figcaption>

                    <span>
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>


                    <span>
                      {project.title}
                    </span>

                  </figcaption>

                </figure>

              )
            )}

          </div>

        </section>


        {/* =========================================
            TECHNOLOGY
        ========================================= */}

        <section className="project-detail-stack">

          <div className="detail-info-label">
            TECHNOLOGY & SERVICES
          </div>


          <div className="detail-stack-list">

            {project.stack?.map(
              (item) => (

                <span
                  key={item}
                >
                  {item}
                </span>

              )
            )}

          </div>

        </section>


        {/* =========================================
            FOOTER
        ========================================= */}

        <section className="project-detail-footer">

          <span>
            ancode. / 2026
          </span>


          <Link
            to="/"
            onClick={
              handleBackToWork
            }
          >
            BACK TO WORK ↗
          </Link>

        </section>

      </main>

    </>
  );
}


export default ProjectDetail;