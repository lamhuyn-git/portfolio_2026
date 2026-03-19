import React from "react";
import styles from "./Projects.module.scss";

interface ShowcaseProps {
  title: string;
  img: string;
  index: number;
  tags?: string[];
  showcaseRef: (el: HTMLDivElement | null) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({
  title,
  img,
  index,
  tags,
  showcaseRef,
}) => {
  return (
    <div
      ref={showcaseRef}
      className={`${styles.projects_showcase} ${index % 2 === 0 ? styles.odd : styles.even}`}
      style={{ zIndex: 2 + index }}
    >
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <img src={img} alt={title} />
        </div>
        <div className={styles.info}>
          <div className={styles.text}>
            <p>Project page</p>
            <h3>{title}</h3>
          </div>
          <div className={styles.tags}>
            {tags?.map((tag, idx) => (
              <div key={idx} className={styles.tag}>
                {tag}
              </div>
            ))}
            <svg
              width="44"
              height="24"
              viewBox="0 0 44 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="42.6667"
                height="22.6667"
                rx="11.3333"
                fill="white"
                fill-opacity="0.15"
              />
              <rect
                x="0.5"
                y="0.5"
                width="42.6667"
                height="22.6667"
                rx="11.3333"
                stroke="white"
              />
              <path
                d="M16.5 11.3332C16.2239 11.3332 16 11.557 16 11.8332C16 12.1093 16.2239 12.3332 16.5 12.3332L26.5206 12.3332C26.477 12.4042 26.4209 12.4831 26.3489 12.5727C26.1275 12.8484 25.8003 13.1737 25.3233 13.6465L24.148 14.8114C23.9519 15.0058 23.9505 15.3223 24.1449 15.5185C24.3393 15.7146 24.6558 15.716 24.852 15.5216L26.0485 14.3358C26.4991 13.8891 26.8674 13.5241 27.1286 13.1989C27.4002 12.8606 27.5969 12.5174 27.6494 12.1053C27.6724 11.9246 27.6724 11.7417 27.6494 11.5611C27.5969 11.149 27.4002 10.8057 27.1286 10.4675C26.8674 10.1422 26.4991 9.7772 26.0485 9.33058L24.852 8.14471C24.6558 7.95032 24.3393 7.95173 24.1449 8.14786C23.9505 8.344 23.9519 8.66058 24.148 8.85496L25.3233 10.0198C25.8003 10.4926 26.1275 10.818 26.3489 11.0936C26.4209 11.1832 26.477 11.2621 26.5206 11.3332L16.5 11.3332Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
