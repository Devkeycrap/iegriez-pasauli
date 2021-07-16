import Link from "next/link";
import styles from "../styles/navbar.module.scss";
import { useRouter } from "next/router";

import { connect } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

export function Navbar({ isActive }) {
  const router = useRouter();

  const [navbarToggled, setNavbarToggled] = useState(false);

  function toggleNavbar() {
    setNavbarToggled(!navbarToggled);
  }

  if (isActive) return null;

  return (
    <div className={styles.content}>
      <nav className={`${styles.nav} ${!navbarToggled ? "" : styles.active}`}>
        <div className={styles.burger} onClick={toggleNavbar}>
          <div></div>
          <div></div>
        </div>
        <ul>
          <li style={{ animationDelay: "0.2" }} onClick={toggleNavbar}>
            <Link href="/">
              <a className={router.pathname === "/" ? styles.active : ""}>
                Sākums
              </a>
            </Link>
          </li>
          <li style={{ animationDelay: "1s" }} onClick={toggleNavbar}>
            <Link href="/about-game">
              <a
                className={
                  router.pathname === "/about-game" ? styles.active : ""
                }
              >
                Par spēli
              </a>
            </Link>
          </li>
          <li style={{ animationDelay: "2s" }} onClick={toggleNavbar}>
            <Link href="/aprites-ekonomika">
              <a
                className={
                  router.pathname === "/aprites-ekonomika" ? styles.active : ""
                }
              >
                Kas ir aprites ekonomika?
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isActive: state.game.isActive,
});

export default connect(mapStateToProps)(Navbar);
