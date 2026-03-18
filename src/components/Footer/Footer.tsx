import Circle from "./Circle";
import Decorate from "./Decorate";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_top}>
          <Decorate className={styles.line} />
          <Circle className={styles.circle} />
          <p>Let’s collaborate to bring impactful digital products to life!</p>
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
              fill-opacity="0.15"
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
          <div className={styles.footer_bottom_content}>
            <p className={styles.title}>send me e-mail</p>
            <p className={styles.detail}>lam.huynthi@gmail.com</p>
            <p></p>
          </div>
          <div className={styles.footer_bottom_content}>
            <p className={styles.title}>Call me</p>
            <p className={styles.detail}>+(84) 366 400 874</p>
            <p></p>
          </div>

          <div className={styles.footer_bottom_content}>
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
