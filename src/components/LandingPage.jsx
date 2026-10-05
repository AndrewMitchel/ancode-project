import HeroOrbit3D from "./HeroOrbit3D";

function LandingPage({ heroRef }) {
  return (
    <section ref={heroRef} className="hero">

      <div className="hero-background">
        <div className="hero-grid"></div>
      </div>

      <HeroOrbit3D />

      <div className="hero-content">

        <div className="hero-eyebrow"></div>

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

      </div>

      <div className="hero-bottom">

        <div className="hero-location">
          <span className="status-dot"></span>
          AVAILABLE FOR PROJECTS
        </div>

        <a
          href="#PRODUCT"
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
        </div>

      </div>

    </section>
  );
}

export default LandingPage;