import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
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
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={menuOpen ? "mobile-menu-open" : ""}
        aria-label="Main navigation"
      >
        <a href="#PRODUCT" onClick={closeMenu}>
          PRODUCT
        </a>

        <a href="#services" onClick={closeMenu}>
          SERVICES
        </a>

        <a href="#joki-tugas" onClick={closeMenu}>
          JOKI TUGAS
        </a>

        <a href="#contact" onClick={closeMenu}>
          CONTACT
        </a>
      </nav>

      <div className="menu-status">
        AVAILABLE
        <span></span>
      </div>
    </header>
  );
}

export default Navbar;
