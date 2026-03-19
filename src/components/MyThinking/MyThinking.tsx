import React, { useEffect, useRef, useState } from "react";

import styles from "./MyThinking.module.scss";
import DecorateImage from "../../assets/images/thinking_decorate.png";
import Decoration from "./Decoration";

const QUOTE_WORDS = [
  "DESIGN", "IS", "NOT", "DECORATION.",
  "IT", "IS", "THE", "ART", "OF",
  "SHAPING", "EXPERIENCES",
  "ENGAGING,", "INTENTIONAL,", "AND",
  "DEEPLY", "IMPACTFUL.",
];

const MyThinking: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      if (!sectionRef.current || !containerRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowCenter = windowHeight / 2;

      const elementCenter = rect.top + rect.height / 2;
      const maxDistance = windowHeight * 0.6;
      const distanceFromCenter = Math.abs(elementCenter - windowCenter);
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

      // Scale
      const scale = 1 - normalizedDistance * 0.25;
      containerRef.current.style.transform = `scale(${scale})`;

      // Word-by-word reveal: tính scroll progress từ 0 → 1
      // khi section đi từ dưới viewport lên center
      const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.top / (windowHeight * 0.8))));
      const totalWords = QUOTE_WORDS.length;

      wordRefs.current.forEach((span, i) => {
        if (!span) return;
        // Mỗi từ có 1 "window" riêng để chuyển từ mờ → sáng
        const wordStart = i / totalWords;
        const wordEnd = (i + 1) / totalWords;
        const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordStart) / (wordEnd - wordStart)));
        const opacity = 0.2 + wordProgress * 0.8;
        span.style.opacity = `${opacity}`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.thinking}>
      <div ref={containerRef} className={styles.thinking__container}>
        <Decoration className={styles.thinking__decoration} />
        <img
          src={DecorateImage}
          alt="Decorative design element"
          className={styles.thinking__image}
        />
        <div className={styles.thinking__inner}>
          <div className={styles.thinking__top}>
            <p className={styles.thinking__label}>MY THINKING</p>
            <p className={styles.thinking__quote}>
              {QUOTE_WORDS.map((word, i) => (
                <React.Fragment key={i}>
                  <span
                    ref={(el) => { wordRefs.current[i] = el; }}
                    className={styles.thinking__word}
                  >
                    {word}
                  </span>
                  {/* Line breaks sau các từ cuối mỗi dòng */}
                  {(i === 2 || i === 3 || i === 8 || i === 10 || i === 11 || i === 13) ? <br /> : " "}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className={styles.thinking__bottom}>
            <p className={styles.thinking__label}>DESIGNING</p>
            <p className={styles.desc}>
              Not just my job — it is my jam. I turn chaos into scroll-worthy,
              sleek magic.
            </p>
            <div
              className={styles.thinking__svg}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <svg
                width="521"
                height="120"
                viewBox="0 0 521 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41.4001 118.347H0V1.5962H41.7423C53.4894 1.5962 63.6018 3.93349 72.0796 8.60808C80.5573 13.2447 87.0771 19.9145 91.6391 28.6176C96.2391 37.3207 98.5391 47.734 98.5391 59.8575C98.5391 72.019 96.2391 82.4703 91.6391 91.2114C87.0771 99.9525 80.5192 106.66 71.9655 111.335C63.4498 116.009 53.2613 118.347 41.4001 118.347ZM24.6918 97.1971H40.3737C47.6729 97.1971 53.8126 95.905 58.7927 93.3207C63.8109 90.6983 67.5746 86.6508 70.0837 81.1782C72.6308 75.6675 73.9044 68.5606 73.9044 59.8575C73.9044 51.2304 72.6308 44.1805 70.0837 38.7078C67.5746 33.2352 63.8299 29.2067 58.8498 26.6223C53.8696 24.038 47.7299 22.7458 40.4307 22.7458H24.6918V97.1971Z"
                  fill="white"
                />
                <path
                  d="M103.983 118.347V1.5962H182.678V21.9477H128.675V49.7672H178.629V70.1188H128.675V97.9952H182.906V118.347H103.983Z"
                  fill="white"
                />
                <path
                  d="M252.817 35.1734C252.361 30.5748 250.403 27.0024 246.943 24.4561C243.484 21.9097 238.789 20.6366 232.858 20.6366C228.828 20.6366 225.426 21.2066 222.651 22.3468C219.875 23.4489 217.746 24.9881 216.264 26.9644C214.819 28.9406 214.097 31.1829 214.097 33.6912C214.021 35.7815 214.458 37.6057 215.408 39.1639C216.397 40.7221 217.746 42.0713 219.457 43.2114C221.168 44.3135 223.145 45.2827 225.388 46.1188C227.631 46.9169 230.026 47.601 232.573 48.171L243.065 50.6793C248.16 51.8195 252.836 53.3397 257.094 55.2399C261.352 57.1401 265.039 59.4774 268.156 62.2518C271.274 65.0261 273.688 68.2945 275.399 72.057C277.147 75.8195 278.041 80.133 278.079 84.9976C278.041 92.1425 276.216 98.3373 272.604 103.582C269.031 108.789 263.861 112.836 257.094 115.724C250.365 118.575 242.248 120 232.744 120C223.316 120 215.104 118.556 208.109 115.667C201.152 112.779 195.716 108.504 191.8 102.841C187.922 97.1401 185.888 90.0903 185.698 81.6912H209.592C209.858 85.6057 210.979 88.8741 212.956 91.4964C214.971 94.0807 217.651 96.038 220.997 97.3682C224.38 98.6603 228.201 99.3064 232.459 99.3064C236.641 99.3064 240.271 98.6983 243.351 97.4822C246.468 96.266 248.882 94.5748 250.593 92.4086C252.304 90.2423 253.159 87.753 253.159 84.9406C253.159 82.3183 252.38 80.114 250.821 78.3278C249.3 76.5416 247.057 75.0214 244.092 73.7672C241.165 72.5131 237.572 71.3729 233.314 70.3468L220.598 67.1544C210.751 64.7601 202.977 61.0166 197.274 55.924C191.572 50.8314 188.74 43.9715 188.778 35.3444C188.74 28.2755 190.622 22.0998 194.423 16.8171C198.263 11.5344 203.528 7.41093 210.219 4.44656C216.91 1.48219 224.513 0 233.029 0C241.697 0 249.262 1.48219 255.725 4.44656C262.226 7.41093 267.282 11.5344 270.894 16.8171C274.505 22.0998 276.368 28.2185 276.482 35.1734H252.817Z"
                  fill="white"
                />
                <path
                  d="M306.533 1.5962V118.347H281.841V1.5962H306.533Z"
                  fill="white"
                />
                <path
                  d="M391.441 39.3349C390.643 36.5606 389.521 34.1093 388.077 31.981C386.632 29.8147 384.864 27.9905 382.773 26.5083C380.72 24.9881 378.363 23.829 375.702 23.0309C373.079 22.2328 370.171 21.8337 366.977 21.8337C361.009 21.8337 355.762 23.3159 351.238 26.2803C346.752 29.2447 343.255 33.5582 340.746 39.2209C338.237 44.8456 336.982 51.7245 336.982 59.8575C336.982 67.9905 338.218 74.9074 340.689 80.6081C343.16 86.3088 346.657 90.6603 351.181 93.6627C355.705 96.6271 361.047 98.1093 367.205 98.1093C372.794 98.1093 377.565 97.1211 381.519 95.1449C385.51 93.1306 388.552 90.2993 390.643 86.6508C392.772 83.0024 393.836 78.6888 393.836 73.7102L398.854 74.4513H368.745V55.867H417.615V70.5748C417.615 80.8361 415.449 89.6532 411.115 97.0261C406.781 104.361 400.812 110.024 393.209 114.014C385.605 117.967 376.9 119.943 367.091 119.943C356.143 119.943 346.524 117.53 338.237 112.703C329.949 107.838 323.486 100.941 318.848 92.0095C314.248 83.0404 311.948 72.399 311.948 60.0855C311.948 50.6223 313.317 42.1853 316.054 34.7743C318.829 27.3254 322.707 21.0166 327.687 15.848C332.667 10.6793 338.465 6.74584 345.08 4.0475C351.695 1.34917 358.861 0 366.578 0C373.193 0 379.352 0.969122 385.054 2.90737C390.757 4.8076 395.813 7.50594 400.223 11.0024C404.671 14.4988 408.301 18.6603 411.115 23.4869C413.928 28.2755 415.734 33.5582 416.532 39.3349H391.441Z"
                  fill="white"
                />
                <path
                  d="M521 1.5962V118.347H499.673L448.863 44.8646H448.008V118.347H423.316V1.5962H444.986L495.396 75.0214H496.422V1.5962H521Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyThinking;
