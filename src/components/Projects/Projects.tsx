import { useEffect, useRef } from "react";
import Button from "../Button/Button";
import Showcase from "./Showcase";
import styles from "./Projects.module.scss";

const LINES = ["I Design Solutions", "Not just interfaces"];

const projectsData = [
  {
    title: "Yup - A Food Delivery Application",
    desc: "A sleek and intuitive food delivery application designed to provide users with a seamless ordering experience.",
    img: "https://ik.imagekit.io/mku5dcybr/Yup!%20Everything%20on%20Your%20Phone!%20(1).svg?updatedAt=1753927203711",
    tags: ["React", "TypeScript", "SCSS", "Application Design"],
  },
  {
    title: "Melody - A Music Player Application",
    desc: "A modern web application built with React and TypeScript, featuring a responsive design and a clean user interface",
    img: "https://ik.imagekit.io/mku5dcybr/Me.png?updatedAt=1753894222146",
    tags: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Project Three",
    desc: "A sleek and intuitive music player application designed to provide users with a seamless listening experience.",
    img: "https://static.wixstatic.com/media/bb0466_b29ff5e5635748d8a412656cf9a09bc2~mv2.png/v1/fill/w_1310,h_754,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Noir.png",
    tags: ["Python", "Django", "PostgreSQL"],
  },
];

const Projects = () => {
  const projects = projectsData;
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const showcaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Shift-in animation — observe the text content, then animate all elements
    const el = contentRef.current;
    const shiftElements = [
      descRef.current,
      buttonRef.current,
      bottomRef.current,
    ];
    const totalLetters = LINES.join("").length;

    if (el) {
      const letters = el.querySelectorAll(`.${styles.letter}`);

      const letterObserver = new IntersectionObserver(
        (entries) => {
          const lineEls = Array.from(
            el.querySelectorAll("p"),
          ) as HTMLElement[];

          if (entries[0].isIntersecting) {
            // ── All sizes: reveal letters instantly, animate lines + shift ─
            letters.forEach((span) => {
              const s = span as HTMLElement;
              s.style.transition = "none";
              s.style.transform = "translateY(0)";
              s.style.opacity = "1";
              s.style.filter = "blur(0)";
            });

            // lines → desc → button → bottom, each 0.09s apart
            const allItems = [
              ...lineEls,
              ...shiftElements,
            ] as HTMLElement[];
            allItems.forEach((elem, i) => {
              if (!elem) return;
              elem.style.transitionProperty = "transform, opacity, filter";
              elem.style.transitionDuration = "1.3s";
              elem.style.transitionTimingFunction =
                "cubic-bezier(0.16, 1, 0.3, 1)";
              elem.style.transitionDelay = `${i * 0.09}s`;
              elem.style.transform = "translateY(0)";
              elem.style.opacity = "1";
              elem.style.filter = "blur(0)";
            });
          } else {
            // ── Reset ────────────────────────────────────────────────────
            letters.forEach((span) => {
              const s = span as HTMLElement;
              s.style.transition = "none";
              s.style.transform = "translateY(100%)";
              s.style.opacity = "0";
              s.style.filter = "blur(8px)";
            });

            lineEls.forEach((line) => {
              line.style.transition = "none";
              line.style.transitionDelay = "0s";
              line.style.transform = "translateY(40px)";
              line.style.opacity = "0";
              line.style.filter = "blur(8px)";
            });

            shiftElements.forEach((elem) => {
              if (!elem) return;
              elem.style.transition = "none";
              elem.style.transitionDelay = "0s";
              elem.style.transform = "translateY(40px)";
              elem.style.opacity = "0";
              elem.style.filter = "blur(8px)";
            });
          }
        },
        { threshold: 0.1 },
      );

      letterObserver.observe(el);
    }

    // Showcases float-up on scroll — each card rolls up from bottom
    const totalCards = projectsData.length;
    // First 10% of scroll = text visible, remaining 90% = cards float up
    const textPhase = 0.1;
    const cardPhase = 1 - textPhase;
    let rafId: number;
    let bottomScrollControlled = false;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!wrapperRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        const wh = window.innerHeight;
        const scrollable = rect.height - wh;
        const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollable));

        // Fade out projects_top based on raw scroll (text fades back in on scroll-up)
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

        // Single pass: compute raw progress and apply styles directly (bidirectional)
        showcaseRefs.current.forEach((card, i) => {
          if (!card) return;

          const cardStart = textPhase + (i / totalCards) * cardPhase;
          const cardEnd = textPhase + ((i + 1) / totalCards) * cardPhase;
          const cardProgress = Math.max(
            0,
            Math.min(1, (rawProgress - cardStart) / (cardEnd - cardStart)),
          );

          const translateY = (1 - cardProgress) * 100;
          // On mobile, card 0 starts at -60% so its top edge (~38% of vh)
          // is close to the text block, reducing the visible empty gap.
          const isMobile = window.innerWidth <= 480;
          const topStart = i === 0 && isMobile ? -60 : 10;
          const top = topStart + cardProgress * (-10 - topStart);
          card.style.top = `${top}%`;

          const nextCardStart = textPhase + ((i + 1) / totalCards) * cardPhase;
          const nextCardEnd = textPhase + ((i + 2) / totalCards) * cardPhase;
          const nextCardProgress =
            i < totalCards - 1
              ? Math.max(
                  0,
                  Math.min(
                    1,
                    (rawProgress - nextCardStart) /
                      (nextCardEnd - nextCardStart),
                  ),
                )
              : 0;

          const scale = i < totalCards - 1 ? 1 - nextCardProgress * 0.15 : 1;
          card.style.transform = `translateY(${translateY}%) scale(${scale})`;
        });

        // Update active nav item based on which card is currently on top
        let activeIndex = 0;
        for (let i = totalCards - 1; i >= 0; i--) {
          const cardStart = textPhase + (i / totalCards) * cardPhase;
          const cardEnd = textPhase + ((i + 1) / totalCards) * cardPhase;
          const p = Math.max(
            0,
            Math.min(1, (rawProgress - cardStart) / (cardEnd - cardStart)),
          );
          if (p > 0) {
            activeIndex = i;
            break;
          }
        }
        itemRefs.current.forEach((item, i) => {
          if (!item) return;
          if (i === activeIndex) {
            item.classList.add(styles["projects_item--active"]);
          } else {
            item.classList.remove(styles["projects_item--active"]);
          }
        });

        // Scale down bottom bar as section wraps up
        const bottomEl = bottomRef.current;
        if (bottomEl) {
          const scaleStart = 0.85;
          const scaleProgress = Math.max(
            0,
            Math.min(1, (rawProgress - scaleStart) / (1 - scaleStart)),
          );
          if (scaleProgress > 0) {
            bottomScrollControlled = true;
            bottomEl.style.transition = "none";
            bottomEl.style.transitionDelay = "0s";
            bottomEl.style.transform = `scale(${1 - scaleProgress * 0.3})`;
            bottomEl.style.opacity = `${1 - scaleProgress}`;
          } else if (bottomScrollControlled) {
            bottomScrollControlled = false;
            bottomEl.style.transition = "none";
            bottomEl.style.transitionDelay = "0s";
            bottomEl.style.transform = "scale(1)";
            bottomEl.style.opacity = "1";
          }
        }
      });
    };

    // overflow-x:hidden on html/body promotes overflow-y to auto, making body
    // the scroll container instead of window. Scroll events don't bubble, so
    // listen on both — whichever one is actually scrolling will fire.
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("scroll", onScroll);
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
              <div
                ref={descRef}
                className={`${styles.projects_top_desc} ${styles["shift-element"]}`}
              >
                I’m a UX/UI Designer focused on creating clear, usable, and
                visually engaging products by combining user research and modern
                interface design.
              </div>
              <div
                ref={buttonRef}
                className={`${styles.projects_top_button} ${styles["shift-element"]}`}
              >
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
                <Button
                  text="Scroll To View Projects"
                  className={styles.button}
                />
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
              desc={project.desc}
              index={index}
              img={project.img}
              tags={project.tags}
              showcaseRef={(el) => {
                showcaseRefs.current[index] = el;
              }}
            />
          ))}

          {/* Bottom nav stays on top */}
          <div
            ref={bottomRef}
            className={`${styles.projects_bottom} ${styles["shift-element"]}`}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
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
