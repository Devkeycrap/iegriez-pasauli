import styles from "../styles/home.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";

//
// Landing page
//
export default function Home() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.home}
    >
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
    </motion.div>
  );
}
