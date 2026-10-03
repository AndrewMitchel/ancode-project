function Footer() {
  const backToTop = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
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
          onClick={backToTop}
        >
          BACK TO TOP ↑
        </a>

      </div>

    </footer>
  );
}

export default Footer;