import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topnav}>
            <div className={styles.title}>
              Footravel </div>
              <a href="/">Home</a>
              <a href="/about">About Us</a>
            </div>
        </div>
      </div>
    </>
  );
}
