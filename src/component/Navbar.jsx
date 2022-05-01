import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navbar__list}>
          <li className={styles.navbar__item}>
            <a href="/home" className={styles.navbar__link}>
              Home
            </a>
          </li>
          <li className={styles.navbar__item}>
            <a href="/about" className={styles.navbar__link}>
              About
            </a>
          </li>
          <li className={styles.navbar__item}>
            <a href="contact" className={styles.navbar__link}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

                        
    </>
  );
}
