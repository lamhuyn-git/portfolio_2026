import { useEffect, useRef } from "react";
import Circle from "./Circle";
import Decorate from "./Decorate";
import styles from "./Footer.module.scss";

const LINES = [
  "Let's collaborate to bring",
  "impactful digital products to life!",
];

const Footer = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const bottomItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Scroll-linked stagger for footer_bottom items (mobile only) ──────────
  useEffect(() => {
    if (window.innerWidth > 480) return;

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const footer = footerRef.current;
        if (!footer) return;

        const rect = footer.getBoundingClientRect();
        const wh = window.innerHeight;

        // 0 = footer bottom-edge just touching viewport-bottom
        // 1 = footer top-edge at viewport-top (fully in view)
        const progress = Math.max(0, Math.min(1, (wh - rect.top) / wh));

        bottomItemRefs.current.forEach((item, i) => {
          if (!item) return;

          // Each item starts 0.2 apart, animates over 0.35 of total progress
          const start = i * 0.2;
          const p = Math.max(0, Math.min(1, (progress - start) / 0.35));

          item.style.transform = `translateY(${(1 - p) * 56}px)`;
          item.style.opacity = `${p}`;
          item.style.filter = `blur(${(1 - p) * 8}px)`;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial state

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const letters = el.querySelectorAll(`.${styles.letter}`);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate in — remove inline transition override, let CSS class take over
          letters.forEach((span) => {
            const s = span as HTMLElement;
            s.style.transition = "";
            s.style.transform = "translateY(0)";
            s.style.opacity = "1";
            s.style.filter = "blur(0)";
          });
        } else {
          // Reset instantly while out of view
          letters.forEach((span) => {
            const s = span as HTMLElement;
            s.style.transition = "none";
            s.style.transform = "translateY(100%)";
            s.style.opacity = "0";
            s.style.filter = "blur(8px)";
          });
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  let globalIndex = 0;

  return (
    <div ref={footerRef} className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_top}>
          <Decorate className={styles.line} />
          <Circle className={styles.circle} />

          <div ref={contentRef} className={styles.footer_top_content}>
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
            <h3>
              Let's collaborate to bring impactful digital products to life!
            </h3>
          </div>

          <svg
            width="24"
            height="44"
            viewBox="0 0 24 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="23.1667"
              y="0.500001"
              width="42.6667"
              height="22.6667"
              rx="11.3333"
              transform="rotate(90 23.1667 0.500001)"
              fill="white"
              fillOpacity="0.15"
            />
            <rect
              x="23.1667"
              y="0.500001"
              width="42.6667"
              height="22.6667"
              rx="11.3333"
              transform="rotate(90 23.1667 0.500001)"
              stroke="white"
            />
            <path
              d="M12.3333 16.5C12.3333 16.2239 12.1095 16 11.8333 16C11.5572 16 11.3333 16.2239 11.3333 16.5L11.3333 26.5206C11.2623 26.477 11.1834 26.4209 11.0938 26.3489C10.8181 26.1275 10.4928 25.8003 10.02 25.3233L8.85514 24.148C8.66075 23.9519 8.34417 23.9505 8.14804 24.1449C7.95191 24.3393 7.9505 24.6558 8.14489 24.852L9.33075 26.0485C9.77738 26.4991 10.1424 26.8674 10.4677 27.1286C10.8059 27.4002 11.1492 27.5969 11.5612 27.6494C11.7419 27.6724 11.9248 27.6724 12.1055 27.6494C12.5175 27.5969 12.8608 27.4002 13.199 27.1286C13.5243 26.8674 13.8893 26.4991 14.3359 26.0485L15.5218 24.852C15.7162 24.6558 15.7148 24.3393 15.5187 24.1449C15.3225 23.9505 15.0059 23.9519 14.8116 24.148L13.6467 25.3233C13.1739 25.8003 12.8486 26.1275 12.5729 26.3489C12.4833 26.4209 12.4044 26.477 12.3333 26.5206L12.3333 16.5Z"
              fill="white"
            />
          </svg>
        </div>
        <div className={styles.footer_bottom}>
          <div
            ref={(el) => { bottomItemRefs.current[0] = el; }}
            className={styles.footer_bottom_content}
          >
            <p className={styles.title}>send me e-mail</p>
            <p className={styles.detail}>lam.huynthi@gmail.com</p>
            <p></p>
          </div>
          <div
            ref={(el) => { bottomItemRefs.current[1] = el; }}
            className={styles.footer_bottom_content}
          >
            <p className={styles.title}>Call me</p>
            <p className={styles.detail}>+(84) 366 400 874</p>
            <p></p>
          </div>
          <div
            ref={(el) => { bottomItemRefs.current[2] = el; }}
            className={styles.footer_bottom_content}
          >
            <p className={styles.title}>Address</p>
            <p className={styles.detail}>Ho Chi Minh City, Vietnam</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
