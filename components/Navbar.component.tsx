import Link from "next/link";
import styles from "../styles/navbar.module.scss";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
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
