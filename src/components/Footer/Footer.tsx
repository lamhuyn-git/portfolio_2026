import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <>
      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.cta__headline}>
          LET'S COLLABORATE TO BRING
          <br />
          IMPACTFUL DIGITAL PRODUCTS TO LIFE!
        </h2>
        <a
          href="mailto:lam.huynthi@gmail.com"
          className={styles.cta__icon}
          aria-label="Send email"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footer__inner}>
          <div
            className={`${styles.footer__col} ${styles["footer__col--left"]}`}
          >
            <p className={styles.footer__label}>EMAIL</p>
            <a
              href="mailto:lam.huynthi@gmail.com"
              className={styles.footer__link}
            >
              lam.huynthi@gmail.com
            </a>
          </div>

          <div
            className={`${styles.footer__col} ${styles["footer__col--center"]}`}
          >
            <p className={styles.footer__brand}>Trulem</p>
          </div>

          <div
            className={`${styles.footer__col} ${styles["footer__col--right"]}`}
          >
            <p className={styles.footer__label}>PHONE</p>
            <a href="tel:+84798426376" className={styles.footer__link}>
              +84 798 426 376
            </a>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <p className={styles.footer__copy}>
            © 2024 Trulem · All rights reserved
          </p>
          <div className={styles.footer__socials}>
            <a href="#" className={styles.footer__social_link}>
              Behance
            </a>
            <a href="#" className={styles.footer__social_link}>
              Dribbble
            </a>
            <a href="#" className={styles.footer__social_link}>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
