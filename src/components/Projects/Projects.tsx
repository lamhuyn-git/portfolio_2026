import React, { useEffect, useRef } from "react";
import Button from "../Button/Button";
import Showcase from "./Showcase";
import styles from "./Projects.module.scss";

const LINES = ["I Design Solutions", "Not just interfaces"];

const projectsData = [
  {
    title: "Melody - A Music Player Application",
    img: "https://ik.imagekit.io/mku5dcybr/Me.png?updatedAt=1753894222146",
    tags: ["React", "TypeScript", "SCSS", "Application Design"],
  },
  {
    title: "Project Two",
    img: "https://zeyna.pethemes.com/wp-content/uploads/2026/01/showcase_webgl_carousel-scaled.webp",
    tags: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Project Three",
    img: "https://zeyna.pethemes.com/wp-content/uploads/2026/01/showcase_webgl_carousel-scaled.webp",
    tags: ["Python", "Django", "PostgreSQL"],
  },
];

const Projects = () => {
  const projects = projectsData;
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const showcaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Letter shift-in animation — observe the text content directly
    const el = contentRef.current;
    if (el) {
      const letters = el.querySelectorAll(`.${styles.letter}`);

      const letterObserver = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;

          letters.forEach((span) => {
            const s = span as HTMLElement;
            s.style.transform = "translateY(0)";
            s.style.opacity = "1";
            s.style.filter = "blur(0)";
          });

          letterObserver.disconnect();
        },
        { threshold: 0.1 },
      );

      letterObserver.observe(el);
    }

    // Showcases float-up on scroll — each card rolls up from bottom
    const totalCards = projectsData.length;
    // First 30% of scroll = text visible, remaining 70% = cards float up
    const textPhase = 0.3;
    const cardPhase = 1 - textPhase;
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!wrapperRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        const wh = window.innerHeight;
        const scrollable = rect.height - wh;
        const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollable));

        // Fade out projects_top synced with first card's scroll progress
        const topEl = topRef.current;
        if (topEl) {
          const firstCardStart = textPhase;
          const firstCardEnd = textPhase + (1 / totalCards) * cardPhase;
          const firstCardProgress = Math.max(
            0,
            Math.min(
              1,
              (rawProgress - firstCardStart) / (firstCardEnd - firstCardStart),
            ),
          );
          const opacity = 1 - firstCardProgress;
          const scale = 1 - firstCardProgress * 0.1;
          const pushDown = firstCardProgress * 60;
          topEl.style.opacity = `${opacity}`;
          topEl.style.transform = `scale(${scale}) translateY(${pushDown}px)`;
        }

        showcaseRefs.current.forEach((card, i) => {
          if (!card) return;

          // Cards only start after text phase
          const cardStart = textPhase + (i / totalCards) * cardPhase;
          const cardEnd = textPhase + ((i + 1) / totalCards) * cardPhase;
          const cardProgress = Math.max(
            0,
            Math.min(1, (rawProgress - cardStart) / (cardEnd - cardStart)),
          );

          // Float up
          const translateY = (1 - cardProgress) * 100;

          // top: 10% when not scrolled → -10% when fully scrolled in
          const top = 10 - cardProgress * 20;
          card.style.top = `${top}%`;

          // Scale down when next card is coming in
          let scale = 1;
          if (i < totalCards - 1) {
            const nextStart = textPhase + ((i + 1) / totalCards) * cardPhase;
            const nextEnd = textPhase + ((i + 2) / totalCards) * cardPhase;
            const nextProgress = Math.max(
              0,
              Math.min(1, (rawProgress - nextStart) / (nextEnd - nextStart)),
            );
            scale = 1 - nextProgress * 0.15;
          }

          card.style.transform = `translateY(${translateY}%) scale(${scale})`;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Count total letters across all lines for continuous stagger
  let globalIndex = 0;

  return (
    <div ref={wrapperRef} className={styles["projects-wrapper"]}>
      <div className={styles.projects}>
        <div className={styles.projects_container}>
          <div ref={topRef} className={styles.projects_top}>
            <div className={styles.projects_top_wrapper}>
              <div ref={contentRef} className={styles.projects_top_content}>
                {LINES.map((line, lineIdx) => (
                  <p key={lineIdx}>
                    {line.split("").map((char, charIdx) => {
                      const delay = 0.03 * globalIndex;
                      globalIndex++;
                      return (
                        <span
                          key={charIdx}
                          className={styles.letter}
                          style={{ transitionDelay: `${delay}s` }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </div>
              <div className={styles.projects_top_desc}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the
              </div>
              <div className={styles.projects_top_button}>
                <svg
                  width="5"
                  height="19"
                  viewBox="0 0 5 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 19V0H5V1.76519H2.17656V17.2348H5V19H0Z"
                    fill="white"
                  />
                </svg>
                <Button text="Scroll To View Projects" />
                <svg
                  width="5"
                  height="19"
                  viewBox="0 0 5 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 19V0H1.22086e-07V1.76519H2.82344V17.2348H1.22086e-07V19H5Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Each project is its own showcase card that floats up */}
          {projects.map((project, index) => (
            <Showcase
              key={index}
              title={project.title}
              index={index}
              img={project.img}
              tags={project.tags}
              showcaseRef={(el) => {
                showcaseRefs.current[index] = el;
              }}
            />
          ))}

          {/* Bottom nav stays on top */}
          <div className={styles.projects_bottom}>
            {projects.map((project, index) => (
              <div
                key={index}
                className={`${styles.projects_item} ${index === 0 ? styles["projects_item--active"] : ""}`}
              >
                <p>{project.title}</p>
              </div>
            ))}
            <div className={styles.projects_contact}>
              <span>Contact Me</span>
              <div className={styles.projects_contact_circle}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
