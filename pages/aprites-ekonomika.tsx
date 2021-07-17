// Styles & animations
import styles from "../styles/apritesekonomika.module.scss";
import { fadeInUp, stagger } from "../models/animations/animations";
import { motion } from "framer-motion";

// Team page
export default function AboutUs() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className={styles["aprites-ekonomika"]}
    >
      <div className={styles.content}>
        <p className={styles.centered}>
          Visu ražojumu pamatā ir dabas resursi. Nemitīga ražošana, lai pārdotu
          pēc iespējas vairāk preču, ir radījusi augstu piesārņojuma līmeni,
          dabas resursu noplicināšanos un milzīgu atkritumu daudzumu pasaulē.
        </p>
        <p>
          Lai pasargātu dabas resursus, ir jāmainās ne tikai ražošanai, bet arī
          katram no mums -{" "}
          <span className={styles.green}>jāmaina domāšana</span>, dzīves{" "}
          <span className={styles.green}>paradumi</span> un{" "}
          <span className={styles.green}>attieksme</span>.
        </p>
        <p>
          Tieši uz to mudina aprites ekonomika - ražošanas un patēriņa modelis,
          kas ietver resursu ieguvi un sadali, atkārtotu izmantošanu, preču
          remontu, atjaunošanu un pārstrādi.{" "}
          <span style={{ fontWeight: "bold" }}>
            Aprites ekonomikas mērķis ir nodrošināt pēc iespējas ilgāku
            izmantoto resursu lietošanu, pirms tie kļūst par neizmantojamiem
            atkritumiem.
          </span>{" "}
          Iesaistoties aprites ekonomikā, arī Tu palīdzi samazināt dabas resursu
          ieguvi un padari planētu zaļāku.
        </p>
        <h1>Aprites ekonomikas modelis</h1>
        <img
          className={styles.illustration}
          src="/img/aprites_ekonomika.svg"
          alt="Aprites ekonomika"
        />
      </div>
    </motion.div>
  );
}
