import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../styles/Footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ isLoaded }) => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Decorative Lines Reveal
     const waves = footerRef.current.querySelectorAll(".footer-lines path");

waves.forEach((wave) => {
  const length = wave.getTotalLength();

  gsap.set(wave, {
    strokeDasharray: length,
    strokeDashoffset: length,
    opacity: 1,
  });

  gsap.to(wave, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer-lines",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
});

      // 2. Purple Shape Scale & Rotation Loop
      gsap.fromTo(
        ".footer-shape",
        { scale: 0, rotation: 0, opacity: 0 },
        {
          scale: 1,
          rotation: 35,
          opacity: 1,
          duration: 1.5,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".footer-shape",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
            gsap.to(".footer-shape", {
              yPercent: -10,
              rotation: 35 + 8,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        }
      );

      // 3. Newsletter Staggered Fade-in
      gsap.fromTo(
        ".newsletter > *",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".newsletter",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Grid Columns Reveal
      gsap.fromTo(
        ".footer-grid > div",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-grid",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 5. Copyright Reveal
      gsap.fromTo(
        ".copyright",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".copyright",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <footer className="footer" ref={footerRef}>
      {/* Decorative Lines */}
     <div className="footer-lines">
  <svg
    width="220"
    height="100"
    viewBox="0 0 220 110"
    fill="none"
  >
    <path
      className="wave-1"
      d="M70 0 C70 30 25 35 25 70 C25 85 35 95 45 100"
    />
    <path
      className="wave-2"
      d="M140 0 C140 30 95 35 95 70 C95 85 105 95 115 100"
    />
  </svg>
</div>

      {/* Purple Shape */}
      <div className="footer-shape" style={{ opacity: 0 }}></div>

      {/* Newsletter */}
      <div className="newsletter">
        <h2 style={{ opacity: 0 }}>
          Subscribe to
          <br />
          our newsletter
        </h2>
        <p style={{ opacity: 0 }}>
          To make your stay special and even more memorable
        </p>
        <button style={{ opacity: 0 }}>
          Subscribe Now
        </button>
      </div>

      {/* Divider */}
      <div className="footer-divider"></div>

      {/* Footer Columns */}
      <div className="footer-grid">
        <div style={{ opacity: 0 }}>
          <h4>Company</h4>
          <a href="/">Home</a>
          <a href="/">Studio</a>
          <a href="/">Service</a>
          <a href="/">Blog</a>
        </div>

        <div style={{ opacity: 0 }}>
          <h4>Terms & Policies</h4>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
          <a href="/">Explore</a>
          <a href="/">Accessibility</a>
        </div>

        <div style={{ opacity: 0 }}>
          <h4>Follow Us</h4>
          <a href="/">Instagram</a>
          <a href="/">LinkedIn</a>
          <a href="/">Youtube</a>
          <a href="/">Twitter</a>
        </div>

        <div style={{ opacity: 0 }}>
          <h4>Contact</h4>
          <p>1498w Fulton ste, STE</p>
          <p>2D Chicago, IL 63867.</p>
          <p>(123) 456789000</p>
          <p>info@elementum.com</p>
        </div>
      </div>

      <div className="copyright" style={{ opacity: 0 }}>
        &copy;2023 Elementum. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;