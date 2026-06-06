import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import "../styles/AboutSection.css";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = ({ isLoaded }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const path = sectionRef.current.querySelector(".wave-line path");

      if (path) {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".wave-line",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      }

      gsap.fromTo(
        ".top-content > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".top-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".top-image .image-holder",
        { scale: 0.85, opacity: 0, x: 50 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".top-image",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".top-image .rectangle",
        { scale: 0.5, rotation: -20, opacity: 0 },
        {
          scale: 1,
          rotation: 12,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".top-image",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".bottom-image .image-holder",
        { scale: 0.85, opacity: 0, x: -50 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bottom-image",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".triangle-left",
        { y: 50, rotation: -30, opacity: 0 },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ".bottom-image",
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".triangle-right",
        { y: -50, rotation: 30, opacity: 0 },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ".bottom-image",
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".bottom-content > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bottom-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section className="about" ref={sectionRef}>
      <div className="center-glow"></div>

      <svg
        className="wave-line"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <path
          d="
            M 0 300
            C 150 120, 250 120, 400 220
            C 550 320, 650 320, 800 120
            C 900 0, 1000 0, 1200 80
          "
        />
      </svg>

      <div className="top-content">
        <h2>
          Tomorrow should
          <br />
          be better than
          <span className="today"> today</span>
        </h2>

        <p>
          We are a team of strategists, designers communicators,
          researchers. Together, we believe that progress only
          happens when you refuse to play things safe.
        </p>

        <a href="/">Read more →</a>
      </div>

      {/* TOP IMAGE */}
      <div className="top-image">
        <div className="rectangle" style={{ opacity: 0 }}></div>

        <div className="image-holder" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/1200x/e5/a9/b9/e5a9b9233b8796e2dd5871fc699a6b03.jpg"
            alt="Team"
          />
        </div>
      </div>

      {/* BOTTOM IMAGE */}
      <div className="bottom-image">
        <div
          className="triangle triangle-left"
          style={{ opacity: 0 }}
        ></div>

        <div
          className="triangle triangle-right"
          style={{ opacity: 0 }}
        ></div>

        <div className="image-holder" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/736x/ec/db/dd/ecdbdde97047019575c21461c4a5e132.jpg"
            alt="Creative Team"
          />
        </div>
      </div>

      <div className="bottom-content">
        <h2>
          <span className="today"> See</span> how we can
          <br />
          help you
          <span className="progress"> progress</span>
        </h2>

        <p>
          We add a layer of fearless insights and action that
          allows change makers to accelerate their progress
          in areas such as brand, design digital, comms
          and social research.
        </p>

        <a href="/">Read more →</a>
      </div>
    </section>
  );
};

export default AboutSection;