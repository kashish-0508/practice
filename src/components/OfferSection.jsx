import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import "../styles/OfferSection.css";

gsap.registerPlugin(ScrollTrigger);

const OfferSection = ({ isLoaded }) => {
  const sectionRef = useRef(null);

  const services = [
    {
      left: "Office of multiple interest content",
      title: "Colaborative & partnership",
    },
    {
      left: "The hanger US Air force digital experimental",
      title: "We talk about our weight",
    },
    {
      left: "Delta faucet content, social, digital",
      title: "Piloting digital confidence",
    },
  ];

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Heading Reveal
      gsap.fromTo(
        ".offer-heading",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".offer-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Wave Path Drawing
      const wavePath = sectionRef.current.querySelector(".offer-wave path");
      if (wavePath) {
        const length = wavePath.getTotalLength();
        gsap.set(wavePath, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(wavePath, {
          strokeDashoffset: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".offer-wave",
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      }

      // 3. Staggered Rows Entrance
      gsap.fromTo(
        ".offer-row",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".offer-list",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // High-fidelity hover micro-animations
  const handleMouseEnter = (e) => {
    const row = e.currentTarget;
    const arrow = row.querySelector(".offer-arrow");
    const centerText = row.querySelector(".offer-center");

    gsap.to(row, {
      backgroundColor: "rgba(220, 232, 214, 0.4)",
      paddingLeft: window.innerWidth > 768 ? "24px" : "12px",
      x: window.innerWidth > 768 ? 10 : 0,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(arrow, {
      x: 10,
      scale: 1.1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (window.innerWidth > 1024) {
      gsap.to(centerText, {
        paddingLeft: "180px",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = (e) => {
    const row = e.currentTarget;
    const arrow = row.querySelector(".offer-arrow");
    const centerText = row.querySelector(".offer-center");

    gsap.to(row, {
      backgroundColor: "transparent",
      paddingLeft: window.innerWidth > 768 ? "12px" : "8px",
      x: 0,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(arrow, {
      x: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (window.innerWidth > 1024) {
      gsap.to(centerText, {
        paddingLeft: "160px",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <section className="offer" ref={sectionRef}>
      {/* Wave */}
      <svg className="offer-wave" viewBox="0 0 700 250">
        <path
          d="
            M0 200
            C120 220 100 30 220 40
            C350 50 420 130 520 120
            C620 110 680 90 700 20
          "
        />
      </svg>

      {/* Heading */}
      <div className="offer-heading" style={{ opacity: 0 }}>
        <h2>
          What we
          <span className="highlight">can</span>
          <br />
          offer you!
        </h2>
        <div className="yellow-stroke"></div>
      </div>

      {/* Rows */}
      <div className="offer-list">
        {services.map((item, index) => (
          <div
            className="offer-row"
            key={index}
            style={{ opacity: 0 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="offer-left">{item.left}</div>
            <h1 className="offer-center">{item.title}</h1>
            <div className="offer-arrow">&rarr;</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferSection;