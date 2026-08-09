import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import HeaderVector from "./HeaderVector";
import styles from "./MyProject.module.scss";
import ProjectItem from "./ProjectItem";
import { projectItems, type ProjectItemType } from "./data";

const MyProject = () => {
  const [projects, setProjects] = useState<ProjectItemType[]>([]);
  const projectItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frontRef = useRef<HTMLDivElement | null>(null);
  const [isFrontVisible, setIsFrontVisible] = useState(false);
  const midRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [isMidVisible, setIsMidVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    setProjects(projectItems);
  }, []);

  useEffect(() => {
    const section = frontRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsFrontVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFrontVisible(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px 0px -14% 0px" },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = midRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsMidVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsMidVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px 0px -14% 0px" },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const list = listRef.current;

    if (!list) return;

    if (!("IntersectionObserver" in window)) {
      setIsListVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsListVisible(entry.isIntersecting),
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(list);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    projectItemRefs.current = projectItemRefs.current.slice(0, projects.length);

    const items = projectItemRefs.current.filter(
      (item): item is HTMLDivElement => Boolean(item),
    );

    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(styles.ProjectItemVisible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [projects.length]);

  return (
    <div
      className={[
        styles.MyProjects,
        isFrontVisible ? styles.MyProjectsVisible : "",
      ].join(" ")}
    >
      <div className={styles.MyProjects__container}>
        <div className={styles.MyProjects__top}>
          <p>Portfolio</p>
          <span className={styles.line}></span>
          <p>[2026]</p>
          <span className={styles.line}></span>
          <p className={styles.text}>UX/UI Designer</p>
        </div>
        <div className={styles.MyProjects__bottom}>
          <div ref={frontRef} className={styles.MyProjects__front}>
            <div className={styles.MyProjects__front__text}>
              <p>
                I’m a UX/UI Designer focused on creating clear, usable, and
                visually engaging products by combining user research and modern
                interface design.
              </p>
            </div>
            <HeaderVector></HeaderVector>
            <div className={styles.MyProjects__front__cta}>
              <div className={styles.tag}>
                <p>Portfolio Highlight</p>
              </div>
              <Button text="See my project" className={styles["right"]} />
            </div>
          </div>
          <div
            ref={midRef}
            className={[
              styles.MyProjects__mid,
              isMidVisible ? styles.MyProjectsMidVisible : "",
            ].join(" ")}
          >
            <h2>I Design Solutions Not just interfaces</h2>
            <div className={styles.MyProjects__mid__tags}>
              <div className={styles.tag}>
                <p>Portfolio Highlight</p>
              </div>
              <div className={styles.tag}>
                <p>Solutions</p>
              </div>
              <div className={styles.tag}>
                <p>Showcase</p>
              </div>
            </div>
          </div>
          <div className={styles.MyProjects__projects}>
            <div
              ref={listRef}
              className={[
                styles.list,
                isListVisible ? styles.ProjectListVisible : "",
              ].join(" ")}
            >
              {projects.map((project, index) => (
                <ProjectItem
                  key={project.number}
                  itemRef={(element) => {
                    projectItemRefs.current[index] = element;
                  }}
                  {...project}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.MyProjects__top}>
          <p>Portfolio</p>
          <span className={styles.line}></span>
          <p>[2026]</p>
          <span className={styles.line}></span>
          <p className={styles.text}>UX/UI Designer</p>
        </div>
      </div>
    </div>
  );
};

export default MyProject;
