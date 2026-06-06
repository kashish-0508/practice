import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/hero.css";

const Hero = ({ isLoaded }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-title-line > span",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        }
      )
        .fromTo(
          ".hero-text",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          [".left-wave", ".purple-shape"],
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )
        .fromTo(
          ".img-holder",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            stagger: 0.05,
            ease: "elastic.out(1, 0.6)",
            onComplete: startFloating,
          },
          "-=1.0"
        );

      function startFloating() {
        const bubbles = gsap.utils.toArray(".img-holder");

        bubbles.forEach((bubble, idx) => {
          const range = 8 + (idx % 3) * 4;
          const dur = 3 + (idx % 2) * 1.5;

          gsap.to(bubble, {
            yPercent: idx % 2 === 0 ? -range : range,
            duration: dur,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: idx * 0.1,
          });
        });

        gsap.to(".left-wave", {
          yPercent: -8,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".purple-shape", {
          yPercent: 10,
          rotation: 45,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const handleMouseMove = (e) => {
        const rect = heroRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        const layers = [
          { selector: ".p1", factor: 0.06 },
          { selector: ".p2", factor: -0.04 },
          { selector: ".p3", factor: 0.03 },
          { selector: ".p4", factor: -0.05 },
          { selector: ".p5", factor: 0.07 },
          { selector: ".p6", factor: -0.03 },
          { selector: ".p7", factor: 0.05 },
          { selector: ".p8", factor: -0.06 },
          { selector: ".left-wave", factor: 0.02 },
          { selector: ".purple-shape", factor: -0.04 },
        ];

        layers.forEach((layer) => {
          gsap.to(layer.selector, {
            x: mouseX * layer.factor,
            y: mouseY * layer.factor,
            duration: 1.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      heroRef.current.addEventListener("mousemove", handleMouseMove);

      return () => {
        if (heroRef.current) {
          heroRef.current.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section className="hero" ref={heroRef}>
      <div className="left-wave">
        <svg width="120" height="250" viewBox="0 0 120 250" fill="none">
          <path
            d="M15 0 C100 0 100 60 40 90 C0 110 0 140 40 160 C100 190 100 250 15 250"
            stroke="#ff7171"
            strokeWidth="4"
            fill="none"
          />

          <path
            d="M45 0 C130 0 130 60 70 90 C30 110 30 140 70 160 C130 190 130 250 45 250"
            stroke="#111"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line">
            <span>
              The <span className="thinkers">thinkers</span> and
            </span>
          </span>

          <span className="hero-title-line">
            <span>
              doers were ch<span className="changing">anging</span>
            </span>
          </span>

          <span className="hero-title-line">
            <span>
              the <span className="status">status</span> Quo with
            </span>
          </span>
        </h1>

        <p className="hero-text">
          We are a team of strategists, designers, communicators,
          researchers. Together, we believe that progress only happens
          when you refuse to play things safe.
        </p>
      </div>

      <div className="purple-shape" style={{ opacity: 0 }}></div>

      <div className="people-layout">
        <div className="img-holder p1" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/736x/d1/c2/6f/d1c26f01eda84435cfaf169fc29639a8.jpg"
            alt=""
          />
        </div>

        <div className="img-holder p2" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/1200x/d7/ba/7a/d7ba7ab9c583a0fa5e78e2035a2a2587.jpg"
            alt=""
          />
        </div>

        <div className="img-holder p3" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/736x/fc/af/7a/fcaf7aec4b7be05a0d062eff7851d2aa.jpg"
            alt=""
          />
        </div>

        <div className="img-holder p4" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/1200x/42/ee/be/42eebecb56ab118db8fe7ae49e8d4816.jpg"
            alt=""
          />
        </div>

        <div className="img-holder p5" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/1200x/e8/09/8a/e8098a3d487b4fd7b8d591d7d9db32bb.jpg"
            alt=""
          />
        </div>

        <div className="img-holder p6" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/1200x/2b/b6/3e/2bb63eb96b47d44977cf2ba77145f127.jpg"
            alt=""
          />
        </div>

        <div className="img-holder p7" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/736x/31/3d/89/313d8984586d469782716bf4d87e87e8.jpg"
            alt=""
          />
        </div>

        <div className="img-holder p8" style={{ opacity: 0 }}>
          <img
            src="https://i.pinimg.com/736x/e5/69/4f/e5694f6efbd19ba5bd81b68927650eaf.jpg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;