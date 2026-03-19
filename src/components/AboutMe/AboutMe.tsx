import React, { useEffect, useRef, useState } from "react";

import styles from "./AboutMe.module.scss";

// ── 3 content sections that appear at each scroll stop ──────────────────────
const sections = [
  {
    type: "EDUCATION",
    title: "INFORMATION TECHNOLOGY",
    detail:
      "University of Transport and Communications\nCampus in Ho Chi Minh City",
    startTime: "2020",
    endTime: "2024",
  },
  {
    type: "CERTIFICATIONS",
    title: "Google UX Design Professional Certificate",
    detail: "Google UX Design Professional Certificate\nCompleted May 21, 2024",
    startTime: "2020",
    endTime: "2024",
  },
  {
    type: "EXPERIENCE",
    title: "UX/UI Designer & Frontend Developer",
    detail:
      "UX/UI Designer & Frontend Developer\nFreelance & Personal Projects",
    startTime: "2020",
    endTime: "2024",
  },
];

// 3 stops on the path (0 → 1), matching 3 sections
const STOPS = [0, 0.5, 1];

const SVG_VIEWBOX_W = 1326;

const AboutMe: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const decorateRef = useRef<HTMLDivElement>(null);
  const decorateSvgRef = useRef<SVGSVGElement | null>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const easeInOut = (t: number): number =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    // ── Header: fires once via IntersectionObserver ──────────────────────
    const header = headerRef.current;
    const wrapper = wrapperRef.current;

    if (header && wrapper) {
      const textLines = header.querySelectorAll(`.${styles["text-line"]}`);
      const contentItems = wrapper.querySelectorAll(
        `.${styles["about_content_item"]}`,
      );

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;

          textLines.forEach((el, i) => {
            const elem = el as HTMLElement;
            elem.style.transitionProperty = "transform, opacity, filter";
            elem.style.transitionDuration = "1.3s";
            elem.style.transitionTimingFunction =
              "cubic-bezier(0.16, 1, 0.3, 1)";
            elem.style.transitionDelay = `${0.4 + i * 0.09}s`;
            elem.style.transform = "translateY(0)";
            elem.style.opacity = "1";
            elem.style.filter = "blur(0)";
          });

          const firstItem = contentItems[0] as HTMLElement | undefined;
          if (firstItem) {
            const baseDelay = 0.4 + textLines.length * 0.09;
            firstItem.style.transitionProperty = "transform, filter";
            firstItem.style.transitionDuration = "1.3s";
            firstItem.style.transitionTimingFunction =
              "cubic-bezier(0.16, 1, 0.3, 1)";
            firstItem.style.transitionDelay = `${baseDelay}s`;
            firstItem.style.transform = "translateY(0)";
            firstItem.style.filter = "blur(0)";
          }

          observer.disconnect();
        },
        { threshold: 0, rootMargin: "0px 0px 0px 0px" },
      );

      observer.observe(header);
    }

    // ── Orb animation: snap between 4 stops via wheel ──────────────────
    let totalLen = 0;
    let svgScale = 0;
    let currentStop = 0;
    let animFrame: number;
    let animatedP = 0; // current animated path progress (0→1)
    let targetP = 0; // target path progress
    let isAnimating = false;
    let wheelCooldown = false;

    const updateOrb = (pathP: number) => {
      const decorateEl = decorateRef.current;
      const svgEl = decorateSvgRef.current;
      if (!svgEl || !decorateEl) return;

      const guidePath = svgEl.querySelector(
        '[data-about="guide"]',
      ) as SVGPathElement | null;
      const glowOuter = svgEl.querySelector(
        '[data-about="glow-outer"]',
      ) as SVGCircleElement | null;
      const outerGrad = svgEl.querySelector(
        '[data-about="outer-grad"]',
      ) as SVGRadialGradientElement | null;
      if (!guidePath || !glowOuter) return;

      if (totalLen === 0) totalLen = guidePath.getTotalLength();
      if (!svgScale) {
        const w = svgEl.getBoundingClientRect().width;
        if (w > 0) svgScale = w / SVG_VIEWBOX_W;
      }
      if (totalLen === 0 || !svgScale) return;

      const point = guidePath.getPointAtLength(pathP * totalLen);

      glowOuter.setAttribute("cx", `${point.x}`);
      glowOuter.setAttribute("cy", `${point.y}`);

      if (outerGrad) {
        outerGrad.setAttribute(
          "gradientTransform",
          `translate(${point.x} ${point.y}) rotate(90) scale(198.5)`,
        );
      }

      const infoEl = infoRef.current;
      if (infoEl) {
        infoEl.style.left = `${point.x * svgScale}px`;
        infoEl.style.top = `${point.y * svgScale - 60}px`;
      }

      const wh = window.innerHeight;
      const orbCssY = point.y * svgScale;
      decorateEl.style.transform = `translateY(${wh / 2 - orbCssY}px)`;
    };

    // Smooth animation loop to interpolate between stops
    const animate = () => {
      const diff = targetP - animatedP;
      if (Math.abs(diff) < 0.001) {
        animatedP = targetP;
        updateOrb(animatedP);
        isAnimating = false;
        return;
      }
      // Lerp with smooth factor
      animatedP += diff * 0.08;
      updateOrb(animatedP);
      animFrame = requestAnimationFrame(animate);
    };

    const goToStop = (index: number) => {
      currentStop = Math.max(0, Math.min(STOPS.length - 1, index));
      targetP = STOPS[currentStop];
      setActiveSection(currentStop);
      if (!isAnimating) {
        isAnimating = true;
        animFrame = requestAnimationFrame(animate);
      }
    };

    // ── Wheel handler: intercept when about section is in view ─────────
    const onWheel = (e: WheelEvent) => {
      const wrapperEl = wrapperRef.current;
      if (!wrapperEl) return;

      const rect = wrapperEl.getBoundingClientRect();
      // Only intercept if about section is covering viewport
      if (rect.top > 0 || rect.bottom < window.innerHeight) return;

      // Cooldown to prevent rapid-fire
      if (wheelCooldown) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextStop = currentStop + direction;

      // If at first/last stop, let page scroll naturally
      if (nextStop < 0 || nextStop >= STOPS.length) return;

      e.preventDefault();
      wheelCooldown = true;
      setTimeout(() => {
        wheelCooldown = false;
      }, 800);

      goToStop(nextStop);
    };

    // Initialize at first stop
    updateOrb(STOPS[0]);

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const current = sections[activeSection];

  return (
    <div ref={wrapperRef} className={styles["about-wrapper"]}>
      <section ref={aboutRef} className={styles.about}>
        <div className={styles.about_container}>
          <div ref={headerRef} className={styles.about_header}>
            <p className={`${styles.subtitle} ${styles["text-line"]}`}>
              Something about me
            </p>
            <div className={styles.title}>
              <p className={styles["text-line"]}> A journey of turning</p>
              <p className={styles["text-line"]}>small ideas into</p>
              <p className={styles["text-line"]}>creative value</p>
            </div>
          </div>
          <div className={styles["about_content"]}>
            {sections.map((section, i) => (
              <div
                key={i}
                className={`${styles["about_content_item"]} ${i === activeSection ? styles["about_content_item--active"] : ""}`}
              >
                <div className={styles.left}>
                  <p className={styles.title}>{section.type}</p>
                  <p className={styles.subtitle}>{section.title}</p>
                  <p className={styles.detail}>{section.detail}</p>
                </div>
                <div className={styles.right}>
                  <p className={styles.start}>{section.startTime}</p>-
                  <p className={styles.end}>{section.endTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
