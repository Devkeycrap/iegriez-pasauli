import Link from "next/link";
import styles from "../styles/navbar.module.scss";
import { useRouter } from "next/router";

import { connect } from "react-redux";

export function Navbar({ isActive }) {
  const router = useRouter();

  if (isActive) return null;
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">
            <a className={router.pathname === "/" ? styles.active : ""}>
              Sākums
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about-game">
            <a
              className={router.pathname === "/about-game" ? styles.active : ""}
            >
              Par spēli
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about-us">
            <a className={router.pathname === "/about-us" ? styles.active : ""}>
              Komanda
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  isActive: state.game.isActive,
});

export default connect(mapStateToProps)(Navbar);
