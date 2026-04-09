import React, { useRef, useCallback } from "react";
import styles from "./Projects.module.scss";

interface ShowcaseProps {
  title: string;
  desc: string;
  img?: string;
  video?: string;
  index: number;
  tags?: string[];
  showcaseRef: (el: HTMLDivElement | null) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({
  title,
  desc,
  img,
  video,
  index,
  tags,
  showcaseRef,
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null); // moves with mouse (no transition)
  const labelRef = useRef<HTMLDivElement>(null);    // scales in/out (with transition)

  // Set both parent callback ref and local ref
  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      (localRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      showcaseRef(el);
    },
    [showcaseRef],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!localRef.current || !followerRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    followerRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseEnter = () => {
    if (!labelRef.current) return;
    labelRef.current.style.opacity = "1";
    labelRef.current.style.transform = "translate(-50%, -50%) scale(1)";
  };

  const handleMouseLeave = () => {
    if (!labelRef.current) return;
    labelRef.current.style.opacity = "0";
    labelRef.current.style.transform = "translate(-50%, -50%) scale(0)";
  };

  return (
    <div
      ref={setRef}
      className={`${styles.projects_showcase} ${index % 2 === 0 ? styles.odd : styles.even}`}
      style={{ zIndex: 2 + index }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Custom cursor follower */}
      <div ref={followerRef} className={styles.cursor_follower}>
        <div
          ref={labelRef}
          className={`${styles.cursor_label} ${index % 2 !== 0 ? styles.cursor_label__dark : ""}`}
        >
          See Detail
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.image}>
          {video ? (
            <video src={video} autoPlay muted loop playsInline preload="metadata" />
          ) : img ? (
            <img src={img} alt={title} />
          ) : null}
        </div>
        <div className={styles.info}>
          <div className={styles.text}>
            <p>Project page</p>
            <h3>{title}</h3>
            <span>{desc}</span>
          </div>
          <div className={styles.tags}>
            {tags?.map((tag, idx) => (
              <div key={idx} className={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
