import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <>

      <div className={styles.cobaNavbar}>
        <div className={styles.title}>Footravel </div>
        <div className={styles.isiNavbar}>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
        </div>
      </div>
    </>
  );
}
