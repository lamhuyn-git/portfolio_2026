import React, { useEffect, useRef } from "react";

import styles from "./AboutMe.module.scss";

interface TimelineItem {
  period: string;
  type: "EDUCATION" | "CERTIFICATIONS" | string;
  title: string;
  subtitle: string;
  detail?: string;
}

const timeline: TimelineItem[] = [
  {
    period: "2022 – Now",
    type: "EDUCATION",
    title: "UNIVERSITY OF HO CHI MINH",
    subtitle:
      "University of Transport and Communications Campus in Ho Chi Minh City",
  },
  {
    period: "Nov 2023 – May 2024",
    type: "CERTIFICATIONS",
    title: "GOOGLE UX DESIGN PROFESSIONAL CERTIFICATE",
    subtitle: "Completed May 21, 2024",
    detail: "Issued by Coursera / Google",
  },
];

const AboutMe: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Easing function matching Hero section
    const easeInOut = (t: number): number =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    let rafId: number;

    const handleScroll = () => {
      if (!aboutRef.current || !headerRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const aboutRect = aboutRef.current.getBoundingClientRect();

      // Start animation when AboutMe section enters viewport
      // Animation completes when section is fully in view
      const sectionTop = scrollY + aboutRect.top;
      const sectionHeight = aboutRef.current.offsetHeight;

      // Animation range: start when section is 100px before entering, complete when centered
      const animationStart = sectionTop - windowHeight + 100;
      const animationEnd = sectionTop - windowHeight * 0.3;
      const animationRange = animationEnd - animationStart;

      if (animationRange <= 0) return;

      // Calculate progress (0 to 1)
      let progress = (scrollY - animationStart) / animationRange;
      progress = Math.max(0, Math.min(1, progress)); // Clamp 0-1

      // Apply easing
      const easedProgress = easeInOut(progress);

      // Get text elements using CSS modules class names
      const textLines = headerRef.current.querySelectorAll(
        `.${styles["text-line"]}`,
      );

      textLines.forEach((line, index) => {
        const element = line as HTMLElement;
        if (!element) return;

        // Staggered animation - each line starts slightly later
        const staggerDelay = index * 0.15; // 15% delay between lines
        let lineProgress = (easedProgress - staggerDelay) / (1 - staggerDelay);
        lineProgress = Math.max(0, Math.min(1, lineProgress));

        // Determine slide direction based on classes
        const isFromLeft = element.classList.contains(
          styles["slide-from-left"],
        );
        const isFromRight = element.classList.contains(
          styles["slide-from-right"],
        );

        let translateX = 0;
        if (isFromLeft) {
          translateX = -100 * (1 - lineProgress); // Start from -100%, end at 0%
        } else if (isFromRight) {
          translateX = 100 * (1 - lineProgress); // Start from 100%, end at 0%
        }

        const opacity = lineProgress;

        // Apply transform
        element.style.transform = `translateX(${translateX}%)`;
        element.style.opacity = opacity.toString();
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial render
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={aboutRef} className={styles.about}>
      <div className={styles.about_container}>
        <div ref={headerRef} className={styles.about_header}>
          <div className={styles.title}>
            <p
              className={`${styles["text-line"]} ${styles["slide-from-left"]}`}
            >
              {" "}
              A journey of turning
            </p>
            <p
              className={`${styles["text-line"]} ${styles["slide-from-right"]}`}
            >
              small ideas into creative value
            </p>
          </div>
          <p
            className={`${styles.subtitle} ${styles["text-line"]} ${styles["slide-from-left"]}`}
          >
            Something about me
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
