// Styles & animations
import styles from "../styles/aboutus.module.scss";
import { fadeInUp, stagger } from "../models/animations/animations";
import { motion } from "framer-motion";

// Team page
export default function AboutUs() {

  return (
    <motion.div
    exit={{ opacity: 0 }}
    initial="initial"
    animate="animate"
    className={styles["about-game"]}
    >
      <h4>Projekts</h4>
      <div className={styles["page-wrapper"]}>

        <motion.div 
        variants={fadeInUp} 
        className={styles.project}
        >
          <h1>
            Par projektu
          </h1>
          <p>
            Qui sint est voluptatem magni possimus. Nesciunt velit amet sed optio. Quas et suscipit deleniti quam blanditiis praesentium facilis. Iste aliquam quod facere facilis sed. Illum et impedit doloremque similique odit voluptatem aut neque.
          </p>
        </motion.div>

        <motion.div 
        variants={fadeInUp} 
        className={styles.creators}
        >
          <h1>
            Projekta veidotāji
          </h1>
          <p>
            Ventspils Valsts 1. Ģimnāzijas skolēni,
          </p>

          <div 
          className={styles["wrapper"]}
          >
            <div 
            className={styles.sm}
            >
              <h2>
                Kristaps Mihelsons
              </h2>

              <div>      
                  <h1>
                    <a 
                    href="https://www.instagram.com/kristaps0s/"
                    >
                      kristaps0s
                    </a>
                  </h1>
                  <h1>
                    <a 
                    href="https://github.com/kristaps0s/"
                    >
                      kristaps0s
                    </a>
                  </h1>
              </div>
            </div>

            <div 
            className={styles.sm}
            >
              <h2>
                Ronalds Palacis
              </h2>
                <div>
                  <h1>
                    <a href="https://www.instagram.com/rwnalds/">
                      rwnalds
                    </a>
                  </h1>
                  <h1>
                    <a 
                    href="https://github.com/devkeystuff/"
                    >
                      devkeystuff
                    </a>
                  </h1>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
