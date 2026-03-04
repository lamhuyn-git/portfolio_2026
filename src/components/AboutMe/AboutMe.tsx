import React from "react";

import styles from "./AboutMe.module.scss";
import Decorate from "./Decorate";

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
  return (
    <section className={styles.about}>
      {/* Glow orb right */}
      <Decorate classname={styles.about__decorate} />
      <div className={styles.about__inner}>
        {/* Timeline */}
        <div className={styles.about__timeline}>
          {timeline.map((item: TimelineItem, index: number) => (
            <div key={index} className={styles.about__timeline_item}>
              <span className={styles.about__period}>{item.period}</span>
              <div className={styles.about__content_wrap}>
                <div className={styles.about__content}>
                  <p className={styles.about__type}>{item.type}</p>
                  <h3 className={styles.about__institution}>{item.title}</h3>
                  {item.subtitle && (
                    <p className={styles.about__subtitle}>{item.subtitle}</p>
                  )}
                </div>
                {item.detail && (
                  <p className={styles.about__detail}>{item.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
