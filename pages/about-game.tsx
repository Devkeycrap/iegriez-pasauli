import styles from "../styles/aboutgame.module.scss";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../models/animations/animations";

//
// About game page
//
export default function AboutGame() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className={styles["about-game"]}
    >
      <h4>Par spēli</h4>
      <motion.div variants={stagger} className={styles["page-wrapper"]}>
        <motion.div variants={fadeInUp} className={styles.level}>
          <div className={styles["title-wrapper"]}>
            <h1>
              <span>1.</span>līmenis
            </h1>
            <h5>Laimes rats</h5>
          </div>
          <div className={styles["paragraph-wrapper"]}>
            <p>
              Šis ir spēles sākums. Iegriez riteni un skaties, uz ko tas
              apstājas, jo visu tālākā spēles kārta būs saistīta ar kādu no šiem
              priekšmetiem: T-krekls, Hamburgers, Longbords, Banāni vai
              Austiņas.
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className={styles.level}>
          <div className={styles["title-wrapper"]}>
            <h1>
              <span>2.</span>līmenis
            </h1>
            <h5>Patiesība/meli</h5>
          </div>
          <div className={styles["paragraph-wrapper"]}>
            <p>
              Šajā solī tev būs jāatbild uz 5 patiesība/meli jautājumiem par
              iepriekšējā solī iegriezto priekšmetu. Ja atbildēsi pareizi, tev
              tiks piešķirti 5 punkti, ja atbildēsi nepareizi, punkti netiks
              atņemti, bet tu būsi zaudējis iespēju nopelnīt šos 5 punktus.
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className={styles.level}>
          <div className={styles["title-wrapper"]}>
            <h1>
              <span>3.</span>līmenis
            </h1>
            <h5>Karte</h5>
          </div>
          <div className={styles["paragraph-wrapper"]}>
            <p>
              Visplašākais un iespējams vissargežģītākais solis šajā spēlē. Tev
              būs jāatbild uz jautājumiem par 1. solī iegriezto priekšmetu, bet
              šoreiz kādā konkrētā jomā. Kopā ir 5 jomas, un katrā pa 3
              jautājumiem. Kopā iespēja nopelnīt 75 punktus.
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className={styles.level}>
          <div className={styles["title-wrapper"]}>
            <h1>
              <span>4.</span>līmenis
            </h1>
            <h5>Augošie vārdi</h5>
          </div>
          <div className={styles["paragraph-wrapper"]}>
            <p>
              Šeit noderēs ātra reakcija un spēja ātri izdarīt lēmumus, jo 15
              sekunžu laikā šajā solī parādīsies vārdi, kas arvien ātrāk sāks
              kustēties tavā virzienā. Ja būsi pietiekami atjautīgs, šajā solī
              varēsi nopelnīt visvairāk punktu!
            </p>
          </div>
        </motion.div>
        <div className={styles.restart}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="redo-alt"
            className={styles["icon-restart"]}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#9aca3c"
              d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"
            ></path>
          </svg>
          <div>
            <h1>Spēle turpinas no jauna</h1>
            <h5>Kamēr nav izspēlēti visi priekšmeti</h5>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
