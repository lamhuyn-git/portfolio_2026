import type { ProjectItemType } from "./data";
import styles from "./MyProject.module.scss";

type ProjectItemProps = ProjectItemType & {
  itemRef?: (element: HTMLDivElement | null) => void;
};

const ProjectItem = (props: ProjectItemProps) => {
  const isEvenItem = props.number % 2 == 0;

  return (
    <div ref={props.itemRef} className={styles.ProjectItem}>
      <div
        className={`${styles.ProjectItem__left} ${isEvenItem ? styles.isEven : ""}`}
      >
        <p>{props.main_tag}</p>
        <p className={styles.subDescription}>{props.subDescription}</p>
      </div>
      <div
        className={`${styles.ProjectItem__middle} ${isEvenItem ? styles.isEven : ""}`}
      >
        <div className={`${styles.ProjectItem__image}`}>
          <img
            src={props.imageUrl}
            alt={props.title}
            className={`${isEvenItem ? styles.isEven : ""}`}
          />
        </div>
        <div className={styles.ProjectItem__right}>
          <div className={styles.ProjectItem__right__top}>
            <h2
              className={`${styles.title} ${isEvenItem ? styles.isEven : ""}`}
            >
              {props.title}
            </h2>
            <p className={styles.description}>{props.description}</p>
          </div>
          <div className={styles.ProjectItem__right__bottom}>
            <div className={styles.left}>
              {props.tags.map((tag) => (
                <p>{tag}</p>
              ))}
            </div>
            <div className={styles.ctas}>
              <a
                href={props.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="10"
                  height="13"
                  viewBox="0 0 10 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.875 0.375H2.22794C1.20459 0.375 0.375 1.19257 0.375 2.20109C0.375 3.20961 1.20459 4.02717 2.22794 4.02717H7.52206C8.54541 4.02717 9.375 3.20961 9.375 2.20109C9.375 1.19257 8.54541 0.375 7.52206 0.375H4.875ZM4.875 0.375V10.4185M4.875 4.54891H2.22794C1.20459 4.54891 0.375 5.36648 0.375 6.375C0.375 7.38352 1.20459 8.20109 2.22794 8.20109H4.875M9.11029 6.11413C9.11029 7.26672 8.16219 8.20109 6.99265 8.20109C5.8231 8.20109 4.875 7.26672 4.875 6.11413C4.875 4.96154 5.8231 4.02717 6.99265 4.02717C8.16219 4.02717 9.11029 4.96154 9.11029 6.11413ZM4.875 10.288C4.875 11.4406 3.9269 12.375 2.75735 12.375C1.58781 12.375 0.639706 11.4406 0.639706 10.288C0.639706 9.13545 1.58781 8.20109 2.75735 8.20109C3.9269 8.20109 4.875 9.13545 4.875 10.288Z"
                    stroke="#0E1049"
                    stroke-width="0.75"
                  />
                </svg>
              </a>
              <button className={styles.video_cta}>
                <a
                  href={props.videoUrl || props.showcaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.videoUrl && <span>Watch Video</span>}
                  {props.showcaseUrl && <span>Watch Showcase</span>}
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
