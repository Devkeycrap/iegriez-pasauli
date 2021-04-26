import styles from "../styles/home.module.scss";
import Link from "next/link";
import Head from "next/head";
import Wheel from "../components/Wheel.component";

export default function Home() {
  return (
    <div className={styles.home}>
      <div>
        <h1>
          Vai zini, kas ir <br />
          <span>aprites ekonomika</span>?
        </h1>
        <p>Pārbaudi savas zināšanas, spēlējot spēli “Iegriez pasauli”!</p>
        <Link href="game">
          <button className={`${styles.btn}  ${styles["btn-orange"]}`}>
            Sākt spēli
          </button>
        </Link>
      </div>
    </div>
  );
}
