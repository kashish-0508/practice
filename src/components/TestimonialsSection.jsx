import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/TestimonialsSection.css";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = ({ isLoaded }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Heading Reveal
      gsap.fromTo(
        ".testimonial-heading",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonial-heading",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Card Scale-up & Fade-in
      gsap.fromTo(
        ".testimonial-card",
        { scale: 0.85, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".testimonial-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3. Avatar Scatter Entrance & Asynchronous Float
      const avatars = sectionRef.current.querySelectorAll(".avatar");
      avatars.forEach((avatar, idx) => {
        // Generate random directional starting point
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 100;
        const startX = Math.cos(angle) * distance;
        const startY = Math.sin(angle) * distance;

        gsap.fromTo(
          avatar,
          { x: startX, y: startY, scale: 0, opacity: 0 },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: "elastic.out(1, 0.75)",
            scrollTrigger: {
             trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            onComplete: () => {
              // Smoothly start individual float loop
              const range = 6 + (idx % 3) * 4; // 6px, 10px, 14px
              const dur = 3 + (idx % 2) * 1.5; // 3s, 4.5s
              gsap.to(avatar, {
                y: -range,
                duration: dur,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: idx * 0.1,
              });
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section className="testimonials" ref={sectionRef}>
      {/* LEFT AVATARS */}
      <div className="avatar a1" style={{ opacity: 0 }}>
        <img src="https://i.pinimg.com/736x/d7/ad/01/d7ad014a25e4b4dcdf5775bde2cb1fd1.jpg" alt="" />
      </div>

      <div className="avatar a2" style={{ opacity: 0 }}>
        <img src="https://i.pinimg.com/1200x/4f/37/26/4f3726e481efeca38abe2e991cd773b9.jpg" alt="" />
      </div>

      <div className="avatar a3" style={{ opacity: 0 }}>
        <img src="https://i.pinimg.com/1200x/31/20/65/312065e5af6db6fc413a54a82ed038e9.jpg" alt="" />
      </div>

      {/* RIGHT AVATARS */}
      <div className="avatar a4" style={{ opacity: 0 }}>
        <img src="https://i.pinimg.com/1200x/77/be/3e/77be3e603e92640702074a9cafe823ed.jpg" alt="" />
      </div>

      <div className="avatar a5" style={{ opacity: 0 }}>
        <img src="https://i.pinimg.com/736x/bd/11/96/bd11961909970f21870820f21c6a036b.jpg" alt="" />
      </div>

      <div className="avatar a6" style={{ opacity: 0 }}>
        <img src="https://i.pinimg.com/736x/0a/bc/ea/0abceac8463f76097148d6c56b981400.jpg" alt="" />
      </div>

      <div className="avatar a7" style={{ opacity: 0 }}>
        <img src="https://i.pinimg.com/1200x/c5/98/c3/c598c38f71c9c16dfe2a1e21354d90e3.jpg" alt="" />
      </div>
      {/* HEADING */}
      <div className="testimonial-heading" style={{ opacity: 0 }}>
        <h2>
          <span className="highlight">What</span> our customer
          <br />
          says <span className="about">About Us</span>
        </h2>
        <div className="scribble"></div>
      </div>

      {/* CARD */}
      <div className="testimonial-card" style={{ opacity: 0 }}>
        <div className="quote-left">&ldquo;</div>
        <p>
          Elementum delivered the site within the timeline as they
          requested. In the end, the client found a 50% increase in
          traffic within days since its launch. They also had an
          impressive ability to use technologies that the company
          hadn't used, which have also proved to be easy to use and
          reliable.
        </p>
        <div className="quote-right">&rdquo;</div>
      </div>
    </section>
  );
};

export default TestimonialsSection;