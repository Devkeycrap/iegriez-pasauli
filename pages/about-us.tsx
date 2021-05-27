import styles from "../styles/aboutus.module.scss";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../models/animations/animations";
import linkIcon from "../public/icons/link.svg";

export default function AboutGame() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className={styles["about-us"]}
      >
    <h4>Komanda</h4>
      <motion.div variants={stagger} className={styles["page-wrapper"]}>
        <motion.div variants={fadeInUp} className={styles["content-wrapper"]}>
          <div className={styles["user-card"]}>
            <div className={styles.image}>
              <img className={styles.icon} src="https://avatars.githubusercontent.com/u/66126144" alt=""/>
              <div className={styles["icon-overlay"]} onClick={() => window.open("https://github.com/devkeycrap")}>
                <img src={linkIcon}/>
              </div>
            </div>
            <motion.div variants={fadeInUp} className={styles["data-wrapper"]}>
              <div className={styles.cell}>
                <h1>Ronalds</h1>
                <h3>Programētājs</h3>
              </div>
            </motion.div>
          </div>

          <div className={styles["user-card"]}>
            <div className={styles.image}>
              <img className={styles.icon} src="https://avatars.githubusercontent.com/u/71285785" alt=""/>
              <div className={styles["icon-overlay"]} onClick={() => window.open("https://github.com/kristaps0s")}>
                <img src={linkIcon}/>
              </div>
            </div>
            <motion.div variants={fadeInUp} className={styles["data-wrapper"]}>
              <div className={styles.cell}>
                <h1>Kristaps</h1>
                <h3>Programētājs</h3>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
