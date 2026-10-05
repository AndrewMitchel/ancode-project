import { useEffect, useLayoutEffect, useRef } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./index.css";

import { projects, services } from "./data/data";

import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Intro from "./components/Intro";
import Product from "./components/Product";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Statement from "./components/Statement";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";
import LoadingPage from "./components/LoadingPage";

gsap.registerPlugin(ScrollTrigger);


/* =====================================================
   LANDING PAGE
===================================================== */

function LandingRoute() {

  const navigate = useNavigate();


  const appRef = useRef(null);
  const cursorRef = useRef(null);
  const spotlightRef = useRef(null);
  const heroRef = useRef(null);


  useLayoutEffect(() => {

    const ctx =
      gsap.context(() => {

        const cursor =
          cursorRef.current;

        const spotlight =
          spotlightRef.current;

        const hero =
          heroRef.current;


        if (!cursor || !hero) {
          return;
        }


        /* =========================================
           CURSOR
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


        const moveSpotlightX =
          spotlight
            ? gsap.quickTo(
                spotlight,
                "x",
                {
                  duration: 0.35,
                  ease: "power3.out",
                }
              )
            : null;


        const moveSpotlightY =
          spotlight
            ? gsap.quickTo(
                spotlight,
                "y",
                {
                  duration: 0.35,
                  ease: "power3.out",
                }
              )
            : null;


        const moveMouse = (e) => {

          moveCursorX(
            e.clientX
          );

          moveCursorY(
            e.clientY
          );


          if (
            spotlight &&
            moveSpotlightX &&
            moveSpotlightY
          ) {

            moveSpotlightX(
              e.clientX
            );

            moveSpotlightY(
              e.clientY
            );

          }

        };


        window.addEventListener(
          "mousemove",
          moveMouse
        );


        /* =========================================
           HERO PARALLAX
        ========================================= */

        const heroShape =
          hero.querySelector(
            ".hero-background-shape"
          );


        const heroFloating =
          hero.querySelectorAll(
            ".hero-floating"
          );


        if (heroShape) {

          gsap.to(
            heroShape,
            {
              y: 120,
              x: -60,
              scale: 1.08,

              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );

        }


        heroFloating.forEach(
          (
            item,
            index
          ) => {

            gsap.to(
              item,
              {
                y:
                  index % 2 === 0
                    ? -80
                    : 80,

                x:
                  index === 1
                    ? -40
                    : 30,

                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1.5,
                },
              }
            );

          }
        );


        /* =========================================
           TEXT CURSOR INTERACTION
        ========================================= */

        const textTargets =
          document.querySelectorAll(`
            .hero-word,
            .hero-description p,
            .intro-content p:first-child,
            .intro-small,
            .services-heading h2,
            .service-item h3,
            .statement-word,
            .contact-content h2,
            .contact-small
          `);


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

          }
        );


        /* =========================================
           HERO INTRO
        ========================================= */

        const heroWords =
          document.querySelectorAll(
            ".hero-word"
          );


        const heroEyebrow =
          document.querySelector(
            ".hero-eyebrow"
          );


        const heroDescription =
          document.querySelector(
            ".hero-description"
          );


        const heroBottom =
          document.querySelector(
            ".hero-bottom"
          );


        const heroFloatingElements =
          document.querySelectorAll(
            ".hero-floating"
          );


        const heroTimeline =
          gsap.timeline({
            delay: 0,
          });


        if (heroEyebrow) {

          heroTimeline.from(
            heroEyebrow,
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            }
          );

        }


        if (heroWords.length) {

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

        }


        if (heroDescription) {

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

        }


        if (heroBottom) {

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

        }


        if (
          heroFloatingElements.length
        ) {

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

        }


        /* =========================================
           GENERAL REVEAL
        ========================================= */

        const revealElements =
          document.querySelectorAll(`
            .section-label,
            .intro-content,
            .project-info,
            .service-item,
            .contact-button,
            .footer
          `);


        revealElements.forEach(
          (element) => {

            gsap.from(
              element,
              {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: element,
                  start: "top 85%",
                  once: true,
                },
              }
            );

          }
        );


        /* =========================================
           PROJECT REVEAL + INTERACTION
        ========================================= */

        const projectCards =
          document.querySelectorAll(
            ".project-card"
          );


        projectCards.forEach(
          (card) => {

            const visual =
              card.querySelector(
                ".project-visual"
              );


            const orb =
              card.querySelector(
                ".visual-orb"
              );


            const title =
              card.querySelector(
                ".visual-title"
              );


            const hoverLabel =
              card.querySelector(
                ".project-hover-label"
              );


            gsap.from(
              card,
              {
                y: 100,
                opacity: 0,
                duration: 1.1,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  once: true,
                },
              }
            );


            const enterProject = () => {

              cursor.classList.add(
                "cursor-view"
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


              if (hoverLabel) {

                gsap.to(
                  hoverLabel,
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power3.out",
                  }
                );

              }

            };


            const leaveProject = () => {

              cursor.classList.remove(
                "cursor-view"
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


              if (hoverLabel) {

                gsap.to(
                  hoverLabel,
                  {
                    opacity: 0,
                    y: 15,
                    duration: 0.3,
                    ease: "power3.out",
                  }
                );

              }


              if (visual) {

                gsap.to(
                  visual,
                  {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.7,
                    ease: "power3.out",
                  }
                );

              }


              if (orb) {

                gsap.to(
                  orb,
                  {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                  }
                );

              }


              if (title) {

                gsap.to(
                  title,
                  {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                  }
                );

              }

            };


            const moveProject = (e) => {

              if (!visual) {
                return;
              }


              const rect =
                visual.getBoundingClientRect();


              const x =
                (e.clientX -
                  rect.left) /
                  rect.width -
                0.5;


              const y =
                (e.clientY -
                  rect.top) /
                  rect.height -
                0.5;


              gsap.to(
                visual,
                {
                  rotateY: x * 10,
                  rotateX: y * -10,
                  duration: 0.5,
                  ease: "power3.out",
                }
              );


              if (orb) {

                gsap.to(
                  orb,
                  {
                    x: x * 40,
                    y: y * 40,
                    duration: 0.6,
                    ease: "power3.out",
                  }
                );

              }


              if (title) {

                gsap.to(
                  title,
                  {
                    x: x * -25,
                    y: y * -25,
                    duration: 0.6,
                    ease: "power3.out",
                  }
                );

              }

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

          }
        );


        /* =========================================
           STATEMENT
        ========================================= */

        const statementWords =
          document.querySelectorAll(
            ".statement-word"
          );


        statementWords.forEach(
          (word) => {

            gsap.from(
              word,
              {
                y: 120,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",

                scrollTrigger: {
                  trigger: word,
                  start: "top 90%",
                  once: true,
                },
              }
            );

          }
        );


        /* =========================================
           MARQUEE
        ========================================= */

        const marqueeTrack =
          document.querySelector(
            ".marquee-track"
          );


        if (marqueeTrack) {

          gsap.to(
            marqueeTrack,
            {
              xPercent: -50,
              duration: 20,
              ease: "none",
              repeat: -1,
            }
          );

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


    return () =>
      ctx.revert();

  }, []);


  /* =========================================
     OPEN PROJECT
     
     REACT ROUTER:
     TIDAK ADA LOADING DI SINI.
  ========================================= */

  const openProject = (project) => {

    navigate(
      `/project/${project.slug}`
    );

  };


  return (
    <div
      ref={appRef}
      className="site"
    >

      <CustomCursor
        cursorRef={cursorRef}
      />


      <div
        ref={spotlightRef}
        className="mouse-spotlight"
      />


      <Navbar />


      <main>

        <LandingPage
          heroRef={heroRef}
        />


        <Intro />


        <Product
          projects={projects}
          onProjectClick={
            openProject
          }
        />


        <Marquee />


        <Services
          services={services}
        />


        <Statement />


        <Contact />

      </main>


      <Footer />

    </div>
  );
}


/* =====================================================
   PROJECT ROUTE
===================================================== */

function ProjectRoute() {

  const { slug } =
    useParams();


  const project =
    projects.find(
      (item) =>
        item.slug === slug
    );


  return (
    <ProjectDetail
      project={project}
    />
  );
}


/* =====================================================
   ROUTER + LOADING FLOW
===================================================== */

function AppRouter() {

  const location =
    useLocation();

  const navigate =
    useNavigate();


  const bootCheckedRef =
    useRef(false);


  useEffect(() => {

    /*
      Cuma cek sekali saat aplikasi
      pertama kali dibuka.

      Jadi perpindahan:

      landing -> detail
      detail -> landing

      TIDAK akan memicu loading.
    */

    if (
      bootCheckedRef.current
    ) {
      return;
    }


    bootCheckedRef.current =
      true;


    /*
      Kalau URL awal memang /loading,
      jangan redirect lagi.
    */

    if (
      location.pathname ===
      "/loading"
    ) {
      return;
    }


    /*
      Browser Navigation API:

      navigate = buka halaman
      reload   = refresh browser
      back_forward = tombol browser
    */

    const navigationEntry =
      performance.getEntriesByType(
        "navigation"
      )[0];


    const isRefresh =
      navigationEntry?.type ===
      "reload";


    /*
      Cek apakah session ini
      sudah pernah melewati loading.
    */

    const sessionStarted =
      sessionStorage.getItem(
        "ancode-session-started"
      ) === "true";


    /*
      Loading kalau:

      1. Pertama kali buka web
      2. Refresh browser
    */

    if (
      !sessionStarted ||
      isRefresh
    ) {

      const returnPath =
        location.pathname +
        location.search +
        location.hash;


      /*
        Simpan URL yang sedang dibuka.

        Ini yang membuat:

        refresh /
        -> loading
        -> /

        refresh /project/coffee-spot
        -> loading
        -> /project/coffee-spot
      */

      sessionStorage.setItem(
        "ancode-loading-return",
        returnPath
      );


      navigate(
        "/loading",
        {
          replace: true,
        }
      );

    }

  }, [
    location.pathname,
    location.search,
    location.hash,
    navigate,
  ]);


  return (
    <Routes>

      {/* =========================================
          LOADING
      ========================================= */}

      <Route
        path="/loading"
        element={
          <LoadingPage />
        }
      />


      {/* =========================================
          LANDING
      ========================================= */}

      <Route
        path="/"
        element={
          <LandingRoute />
        }
      />


      {/* =========================================
          PROJECT DETAIL
      ========================================= */}

      <Route
        path="/project/:slug"
        element={
          <ProjectRoute />
        }
      />


      {/* =========================================
          FALLBACK
      ========================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}


/* =====================================================
   APP
===================================================== */

function App() {

  return (
    <AppRouter />
  );
}


export default App;