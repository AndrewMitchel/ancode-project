import { useEffect, useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar${menuOpen ? " navbar-menu-open" : ""}`}>
      <a href="#" className="logo" onClick={closeMenu}>
        ancode.
      </a>

      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span>{menuOpen ? "CLOSE" : "MENU"}</span>
        <span className="mobile-menu-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <nav id="primary-navigation" className={menuOpen ? "is-open" : ""}>
        <a href="#PRODUCT" onClick={closeMenu}>PRODUCT</a>
        <a href="#services" onClick={closeMenu}>SERVICES</a>
        <a href="#joki-tugas" onClick={closeMenu}>JOKI TUGAS</a>
        <a href="#contact" onClick={closeMenu}>CONTACT</a>
      </nav>

      <div className="menu-status">
        AVAILABLE
        <span></span>
      </div>
    </header>
  );
}

export default Navbar;
