import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/navbar.css";

const Navbar = ({ isLoaded }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (!isLoaded) return;

    gsap.fromTo(
      headerRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    const items = headerRef.current.querySelectorAll(
      ".navbar__logo, .navbar__menu a"
    );

    gsap.fromTo(
      items,
      { y: -15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, [isLoaded]);

  return (
    <header className="navbar" ref={headerRef} style={{ opacity: 0 }}>
      <div className="navbar__logo">Elementum</div>

      <nav
        className={`navbar__menu ${
          menuOpen ? "navbar__menu--open" : ""
        }`}
      >
        <a href="/">Home</a>
        <a href="/">Studio</a>
        <a href="/">Services</a>
        <a href="/">Contact</a>
        <a href="/">FAQs</a>
      </nav>

      <button
        className={`navbar__hamburger ${
          menuOpen ? "navbar__hamburger--active" : ""
        }`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Navbar;