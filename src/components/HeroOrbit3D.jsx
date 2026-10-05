import { useEffect, useRef } from "react";
import * as THREE from "three";


/* =========================================================
   LABEL TEXTURE
========================================================= */

function createLabelTexture(text, color) {
  const canvas = document.createElement("canvas");

  canvas.width = 512;
  canvas.height = 160;

  const ctx = canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const x = 12;
  const y = 18;
  const width = 488;
  const height = 124;
  const radius = 62;

  /* -------------------------------------------------------
     PILL
  ------------------------------------------------------- */

  ctx.beginPath();

  ctx.moveTo(
    x + radius,
    y
  );

  ctx.lineTo(
    x + width - radius,
    y
  );

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  ctx.lineTo(
    x + width,
    y + height - radius
  );

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  ctx.lineTo(
    x + radius,
    y + height
  );

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  ctx.lineTo(
    x,
    y + radius
  );

  ctx.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );

  ctx.closePath();

  ctx.lineWidth = 5;

  ctx.strokeStyle = color;

  ctx.stroke();


  /* -------------------------------------------------------
     TEXT
  ------------------------------------------------------- */

  ctx.font =
    "700 42px Arial, Helvetica, sans-serif";

  ctx.textAlign = "center";

  ctx.textBaseline = "middle";

  ctx.fillStyle = color;

  ctx.fillText(
    text,
    canvas.width / 2,
    canvas.height / 2 + 2
  );

  return canvas;
}


/* =========================================================
   CREATE LABEL
========================================================= */

function createLabel(text, color) {
  const texture =
    new THREE.CanvasTexture(
      createLabelTexture(
        text,
        color
      )
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  texture.minFilter =
    THREE.LinearFilter;

  texture.magFilter =
    THREE.LinearFilter;

  texture.needsUpdate = true;


  const material =
    new THREE.SpriteMaterial({
      map: texture,

      transparent: true,

      alphaTest: 0.01,

      depthTest: true,

      depthWrite: false,

      sizeAttenuation: true,
    });


  const sprite =
    new THREE.Sprite(material);


  sprite.scale.set(
    2.2,
    0.69,
    1
  );


  return sprite;
}


/* =========================================================
   CREATE REAL 3D ORBIT
========================================================= */

function createOrbitTrack({
  radius,
  tiltX,
  tiltY,
  tiltZ,
  color,
  label,
  startAngle,
  speed,
}) {
  const group =
    new THREE.Group();


  /* =======================================================
     ORBIT RING
  ======================================================= */

  const geometry =
    new THREE.TorusGeometry(
      radius,
      0.018,
      8,
      240
    );


  const material =
    new THREE.MeshBasicMaterial({
      color,

      transparent: true,

      opacity: 0.36,

      depthTest: true,

      depthWrite: false,
    });


  const ring =
    new THREE.Mesh(
      geometry,
      material
    );


  /*
   * Lingkaran asli.
   *
   * Kita cuma memiringkan bidangnya.
   */

  ring.rotation.x =
    THREE.MathUtils.degToRad(
      tiltX
    );

  ring.rotation.y =
    THREE.MathUtils.degToRad(
      tiltY
    );

  ring.rotation.z =
    THREE.MathUtils.degToRad(
      tiltZ
    );


  group.add(
    ring
  );


  /* =======================================================
     LABEL ORBIT
  ======================================================= */

  const labelObject =
    createLabel(
      label,
      color === 0xe86fb7
        ? "#e86fb7"
        : "#b5e84c"
    );


  const labelOrbit =
    new THREE.Group();


  labelOrbit.rotation.x =
    THREE.MathUtils.degToRad(
      tiltX
    );

  labelOrbit.rotation.y =
    THREE.MathUtils.degToRad(
      tiltY
    );

  labelOrbit.rotation.z =
    THREE.MathUtils.degToRad(
      tiltZ
    );


  group.add(
    labelOrbit
  );


  labelOrbit.add(
    labelObject
  );


  return {
    group,

    ring,

    labelOrbit,

    labelObject,

    radius,

    angle: startAngle,

    speed,
  };
}


/* =========================================================
   HERO ORBIT 3D
========================================================= */

function HeroOrbit3D() {
  const containerRef =
    useRef(null);


  useEffect(() => {
    const container =
      containerRef.current;


    if (!container) {
      return;
    }


    /* =====================================================
       SCENE
    ===================================================== */

    const scene =
      new THREE.Scene();


    /* =====================================================
       CAMERA
    ===================================================== */

    const camera =
      new THREE.PerspectiveCamera(
        40,

        container.clientWidth /
          container.clientHeight,

        0.1,

        100
      );


    camera.position.set(
      0,
      0,
      16
    );


    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer =
      new THREE.WebGLRenderer({
        antialias: true,

        alpha: true,

        powerPreference:
          "high-performance",
      });


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );


    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );


    renderer.outputColorSpace =
      THREE.SRGBColorSpace;


    renderer.setClearColor(
      0x000000,
      0
    );


    renderer.domElement.style.display =
      "block";


    renderer.domElement.style.width =
      "100%";


    renderer.domElement.style.height =
      "100%";


    renderer.domElement.style.cursor =
      "grab";


    renderer.domElement.style.touchAction =
      "none";


    container.appendChild(
      renderer.domElement
    );


    /* =====================================================
       LIGHTING
    ===================================================== */

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        1.4
      );


    scene.add(
      ambientLight
    );


    const limeLight =
      new THREE.PointLight(
        0xb5e84c,
        20,
        30
      );


    limeLight.position.set(
      -2,
      5,
      8
    );


    scene.add(
      limeLight
    );


    /* =====================================================
       MAIN HERO 3D
    ===================================================== */

    const hero3D =
      new THREE.Group();


    /*
     * POSISI HORIZONTAL
     *
     * Semakin besar = semakin kanan.
     */

    hero3D.position.x =
      3.25;


    /*
     * POSISI VERTIKAL
     *
     * Nilai negatif = semakin bawah.
     */

    hero3D.position.y =
      -1.05;


    scene.add(
      hero3D
    );


    /* =====================================================
       SPHERE
    ===================================================== */

    const sphereGeometry =
      new THREE.SphereGeometry(
        3.05,
        96,
        96
      );

    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xb5e84c,
        emissive: 0x5f8f24,
        emissiveIntensity: 0.45,
        roughness: 0.4,
        metalness: 0.05,
    });


    const sphere =
      new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
      );


    sphere.renderOrder = 2;


    hero3D.add(
      sphere
    );


    /* =====================================================
       SPHERE GLOW
    ===================================================== */

    const glowGeometry =
      new THREE.SphereGeometry(
        3.35,
        64,
        64
      );


    const glowMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xb5e84c,

        transparent: true,

        opacity: 0.09,

        side: THREE.BackSide,

        depthWrite: false,
      });


    const glow =
      new THREE.Mesh(
        glowGeometry,
        glowMaterial
      );


    glow.renderOrder = 1;


    hero3D.add(
      glow
    );


    /* =====================================================
       ORBIT 01
       
       WEB
    ===================================================== */

    const orbitWeb =
      createOrbitTrack({
        radius: 4.45,

        tiltX: 65,

        tiltY: 0,

        tiltZ: -12,

        color: 0xb5e84c,

        label: "WEB",

        startAngle: 4.9,

        speed: 0.00038,
      });


    /* =====================================================
       ORBIT 02
       
       APP
    ===================================================== */

    const orbitApp =
      createOrbitTrack({
        radius: 5.15,

        tiltX: 68,

        tiltY: 8,

        tiltZ: 8,

        color: 0xe86fb7,

        label: "APP",

        startAngle: 1.8,

        speed: 0.00032,
      });


    /* =====================================================
       ORBIT 03
       
       CODE
    ===================================================== */

    const orbitCode =
      createOrbitTrack({
        radius: 5.85,

        tiltX: 58,

        tiltY: -10,

        tiltZ: -8,

        color: 0xb5e84c,

        label: "CODE",

        startAngle: 3.7,

        speed: 0.00035,
      });


    /* =====================================================
       ORBIT 04
       
       UI / UX
    ===================================================== */

    const orbitUIUX =
      createOrbitTrack({
        radius: 6.55,

        tiltX: 62,

        tiltY: -16,

        tiltZ: 14,

        color: 0xe86fb7,

        label: "UI / UX",

        startAngle: 0.25,

        speed: 0.00029,
      });


    /* =====================================================
       ORBIT 05
       
       DATABASE
    ===================================================== */

    const orbitDatabase =
      createOrbitTrack({
        radius: 7.25,

        tiltX: 71,

        tiltY: 12,

        tiltZ: -18,

        color: 0xb5e84c,

        label: "DATABASE",

        startAngle: 2.8,

        speed: 0.00027,
      });


    /* =====================================================
       ADD ALL ORBITS
    ===================================================== */

    hero3D.add(
      orbitWeb.group
    );

    hero3D.add(
      orbitApp.group
    );

    hero3D.add(
      orbitCode.group
    );

    hero3D.add(
      orbitUIUX.group
    );

    hero3D.add(
      orbitDatabase.group
    );


    const orbitTracks = [
      orbitWeb,
      orbitApp,
      orbitCode,
      orbitUIUX,
      orbitDatabase,
    ];


    /* =====================================================
       RESPONSIVE 3D LAYOUT

       Desktop keeps the original composition.
       Mobile/tablet scale and reposition the 3D system
       so it stays visually consistent with the hero
       instead of being cropped by the narrow viewport.
    ===================================================== */

    const updateResponsiveLayout = () => {
      const width = container.clientWidth;

      if (width <= 480) {
        hero3D.position.x = 0.25;
        hero3D.position.y = -1.45;
        hero3D.scale.setScalar(0.58);
      } else if (width <= 768) {
        hero3D.position.x = 0.55;
        hero3D.position.y = -1.25;
        hero3D.scale.setScalar(0.68);
      } else if (width <= 1024) {
        hero3D.position.x = 1.8;
        hero3D.position.y = -1.05;
        hero3D.scale.setScalar(0.82);
      } else {
        hero3D.position.x = 3.25;
        hero3D.position.y = -1.05;
        hero3D.scale.setScalar(1);
      }
    };

    updateResponsiveLayout();


    /* =====================================================
       DRAG ROTATION
    ===================================================== */

    let dragging = false;

    let previousX = 0;

    let previousY = 0;

    let targetRotationX = 0;

    let targetRotationY = 0;

    let currentRotationX = 0;

    let currentRotationY = 0;


    const pointerDown =
      (event) => {
        dragging = true;

        previousX =
          event.clientX;

        previousY =
          event.clientY;

        renderer.domElement.style.cursor =
          "grabbing";
      };


    const pointerMove =
      (event) => {
        if (!dragging) {
          return;
        }


        const dx =
          event.clientX -
          previousX;


        const dy =
          event.clientY -
          previousY;


        previousX =
          event.clientX;


        previousY =
          event.clientY;


        targetRotationY +=
          dx * 0.006;


        targetRotationX +=
          dy * 0.004;


        targetRotationX =
          THREE.MathUtils.clamp(
            targetRotationX,

            -1.2,

            1.2
          );
      };


    const pointerUp =
      () => {
        dragging = false;

        renderer.domElement.style.cursor =
          "grab";
      };


    renderer.domElement.addEventListener(
      "pointerdown",
      pointerDown
    );


    window.addEventListener(
      "pointermove",
      pointerMove
    );


    window.addEventListener(
      "pointerup",
      pointerUp
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    const resize =
      () => {
        const width =
          container.clientWidth;


        const height =
          container.clientHeight;


        if (
          width <= 0 ||
          height <= 0
        ) {
          return;
        }


        camera.aspect =
          width / height;


        camera.updateProjectionMatrix();


        renderer.setSize(
          width,
          height
        );


        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio,
            2
          )
        );

        updateResponsiveLayout();
      };


    window.addEventListener(
      "resize",
      resize
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    const clock =
      new THREE.Clock();


    let animationFrame;


    const animate =
      () => {
        animationFrame =
          requestAnimationFrame(
            animate
          );


        const elapsed =
          clock.getElapsedTime();


        /* -------------------------------------------------
           SMOOTH ROTATION
        ------------------------------------------------- */

        currentRotationX +=
          (
            targetRotationX -
            currentRotationX
          ) * 0.08;


        currentRotationY +=
          (
            targetRotationY -
            currentRotationY
          ) * 0.08;


        /* -------------------------------------------------
           AUTO ROTATION
        ------------------------------------------------- */

        if (!dragging) {
          targetRotationY +=
            0.00065;
        }


        /* -------------------------------------------------
           WHOLE 3D SYSTEM
        ------------------------------------------------- */

        hero3D.rotation.x =
          currentRotationX;


        hero3D.rotation.y =
          currentRotationY;


        /* -------------------------------------------------
           SPHERE
        ------------------------------------------------- */

        sphere.rotation.y =
          elapsed * 0.12;


        sphere.rotation.x =
          elapsed * 0.035;


        /* -------------------------------------------------
           GLOW
        ------------------------------------------------- */

        const pulse =
          1 +
          Math.sin(
            elapsed * 1.5
          ) *
            0.025;


        glow.scale.setScalar(
          pulse
        );


        /* =================================================
           LABELS FOLLOW THEIR OWN REAL ORBIT
        ================================================= */

        orbitTracks.forEach(
          (orbit) => {
            orbit.angle +=
              orbit.speed * 16.666;


            /*
             * CIRCLE.
             *
             * Radius X dan Y sama.
             *
             * Jadi ini benar-benar
             * lingkaran 3D.
             */

            const x =
              Math.cos(
                orbit.angle
              ) *
              orbit.radius;


            const y =
              Math.sin(
                orbit.angle
              ) *
              orbit.radius;


            /*
             * Label tepat berada
             * di atas relnya.
             */

            orbit.labelObject.position.set(
              x,
              y,
              0
            );


            /*
             * Tetap menghadap kamera.
             */

            orbit.labelObject.quaternion.copy(
              camera.quaternion
            );
          }
        );


        /* -------------------------------------------------
           RENDER
        ------------------------------------------------- */

        renderer.render(
          scene,
          camera
        );
      };


    animate();


    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );


      window.removeEventListener(
        "resize",
        resize
      );


      renderer.domElement.removeEventListener(
        "pointerdown",
        pointerDown
      );


      window.removeEventListener(
        "pointermove",
        pointerMove
      );


      window.removeEventListener(
        "pointerup",
        pointerUp
      );


      sphereGeometry.dispose();

      sphereMaterial.dispose();


      glowGeometry.dispose();

      glowMaterial.dispose();


      orbitTracks.forEach(
        (orbit) => {
          orbit.ring.geometry.dispose();

          orbit.ring.material.dispose();


          orbit.labelObject.material.map?.dispose();

          orbit.labelObject.material.dispose();
        }
      );


      renderer.dispose();


      if (
        renderer.domElement.parentNode ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);


  return (
    <div
      ref={containerRef}
      className="hero-orbit-3d"
      aria-hidden="true"
    />
  );
}


export default HeroOrbit3D;