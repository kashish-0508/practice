import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/Preloader.css";

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Split the title letters
    const title = titleRef.current;
    if (title) {
      const text = title.textContent;
      title.innerHTML = text
        .split("")
        .map((char) => `<span class="preloader-char">${char}</span>`)
        .join("");
    }

    const chars = containerRef.current.querySelectorAll(".preloader-char");
    const timeline = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // 1. Initial State
    gsap.set(containerRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });

    // 2. Entrance Animation
    timeline
      .fromTo(
        chars,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 0.7,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      // Slight pause to enjoy the branding
      .to({}, { duration: 0.6 })
      // 3. Reveal Animation (Curve slide up using clip-path for high visual fidelity)
      .to(containerRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 1.2,
        ease: "power4.inOut",
      })
      .to(
        [title, subtitleRef.current],
        {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power4.inIn",
        },
        "-=1.0"
      );
  }, [onComplete]);

  return (
    <div className="preloader" ref={containerRef}>
      <div className="preloader-content">
        <h1 className="preloader-title" ref={titleRef}>
          ELEMENTUM
        </h1>
        <p className="preloader-subtitle" ref={subtitleRef}>
          CREATIVE STRATEGY &bull; DIGITAL STUDIO
        </p>
      </div>
    </div>
  );
};

export default Preloader;
