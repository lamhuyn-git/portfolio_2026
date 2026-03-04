import React from "react";

import styles from "./Projects.module.scss";
import Decorate from "./Decorate";
import Circle from "./Circle";

interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  accent: string;
  bg: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: "01",
    tag: "Fitness website",
    title: "BUILD STRENGTH. BUILD YOU.",
    description:
      "Brand identity and landing page for a performance fitness brand.",
    accent: "#ff3333",
    bg: "#111111",
    featured: true,
  },
  {
    id: "02",
    tag: "Creative website",
    title: "Orbit Visual",
    description: "A creative studio portfolio exploring bold spatial design.",
    accent: "#ffffff",
    bg: "#0a0a0a",
    featured: false,
  },
  {
    id: "03",
    tag: "Finance website",
    title: "Finova",
    description: "Modern fintech dashboard and marketing site.",
    accent: "#00ccff",
    bg: "#050510",
    featured: false,
  },
  {
    id: "04",
    tag: "Creative portfolio",
    title: "NOIR",
    description: "Dark editorial photography portfolio.",
    accent: "#ffffff",
    bg: "#0d0d0d",
    featured: false,
  },
  {
    id: "05",
    tag: "Mobile app",
    title: "TripAI",
    description: "AI-powered travel planning mobile app UI.",
    accent: "#ff8800",
    bg: "#0a0805",
    featured: false,
  },
];

const Projects: React.FC = () => {
  return (
    <section className={styles.projects} id="projects">
      {/* Solutions headline */}
      <div className={styles.projects__headline_wrap}>
        <Decorate classname={styles.projects__decorate} />
        <Circle classname={styles.projects__orb} />
        <div className={styles.projects__headline_text}>
          <p className={styles.projects__desc}>
            That gap people think — it is my pain.
            <br />
            Hunt clients who are worthy, seek magic.
            <br />
            Lived dream, being deeply impactful.
          </p>
          <a href="#projects" className={styles.projects__btn}>
            SEE MY PROJECT <span>↗</span>
          </a>
        </div>
      </div>

      {/* Projects count */}
      <div className={styles.projects__count_bar}>
        <span className={styles.projects__count_label}>5 PROJECTS</span>
      </div>

      {/* Projects grid */}
      <div className={styles.projects__grid}>
        {projects.map((project: Project) => (
          <div
            key={project.id}
            className={`${styles.project_card} ${project.featured ? styles["project_card--featured"] : ""}`}
            style={{ background: project.bg }}
          >
            <div className={styles.project_card__inner}>
              <div className={styles.project_card__header}>
                <span className={styles.project_card__tag}>{project.tag}</span>
                <span className={styles.project_card__id}>{project.id}</span>
              </div>
              <div className={styles.project_card__body}>
                {project.featured ? (
                  <h3
                    className={`${styles.project_card__title} ${styles["project_card__title--featured"]}`}
                    style={{ color: project.accent }}
                  >
                    {project.title}
                  </h3>
                ) : (
                  <h3 className={styles.project_card__title}>
                    {project.title}
                  </h3>
                )}
                <p className={styles.project_card__desc}>
                  {project.description}
                </p>
              </div>
              <div className={styles.project_card__footer}>
                <button
                  className={styles.project_card__link}
                  aria-label={`View ${project.title}`}
                >
                  VIEW →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
