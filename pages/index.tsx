// General imports
import Link from "next/link";

// Styles & animations
import styles from "../styles/home.module.scss";
import { motion } from "framer-motion";

// Landing page
export default function Home() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.home}
    >
      <div>
        <h1>RITenis</h1>
        <p>Aprites ekonomikas spēle jauniešiem</p>
        <Link href="game">
          <button className={`${styles.btn}  ${styles["btn-orange"]}`}>
            Sākt spēli
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
