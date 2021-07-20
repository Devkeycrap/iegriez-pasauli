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
      <div className={styles.content}>
        <div className={styles.main}>
          <h1>RITenis</h1>
          <p>Aprites ekonomikas spēle</p>
          <Link href="game">
            <button className={`${styles.btn}  ${styles["btn-orange"]}`}>
              Sākt spēli
            </button>
          </Link>
        </div>
        <div className={styles.footer}>
          <img src="/img/ek-logo.jpg" alt="Eiropas Komisija" />
          <p>
            Spēle tapusi sadarbībā ar biedrību "Eiropas Kustība Latvijā" un SIA
            “ZAAO” dabas un tehnoloģiju parku “Urda”. Izstrādātāji: Ronalds
            Palacis & Kristaps Mihelsons no komandas "Failed Nodes" <br /> ©
            Eiropas Savienība 2021
          </p>
        </div>
      </div>
      <div className={styles["animation-container"]}>
        <div className={styles["globe-container"]}>
          <img
            className={styles.globe}
            src="/icons/planet-earth.svg"
            alt="Globe"
          />
          <div className={styles.ball}></div>
        </div>
        <img
          className={styles.orbit}
          src="/icons/globe-orbit.svg"
          alt="Orbit"
        />
      </div>
    </motion.div>
  );
}
