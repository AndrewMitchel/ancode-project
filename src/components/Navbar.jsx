function Navbar() {
  return (
    <header className="navbar">

      <a href="#" className="logo">
        ancode.
      </a>

      <nav>
        <a href="#PRODUCT">
          PRODUCT
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
  );
}

export default Navbar;