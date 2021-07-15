// Styles & animations
import styles from "../styles/aboutgame.module.scss";
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
          <p>
            Spēle "RITenis" ir par Tevi pasaulē - par to, kā domāt un dzīvot videi draudzīgāk; par to, kas notiek pasaulē un kā Tu vari to ietekmēt; par to, kā lietas var izmantot atkārtoti, remontēt, atjaunot, pārstrādāt, lai tās kalpotu ilgāk, tādējādi taupot dabas resursus. Šī spēle mainīs Tavu skatu uz daudzām lietām. Iesaisties aprites ekonomikā - esi RITenis, nevis PĀRTenis.
          </p>
        </motion.div>

        <motion.div 
        variants={fadeInUp} 
        className={styles.creators}
        >
          <p>
            Spēli digitalizējuši Kristaps Mihelsons un Ronalds Palacis
          </p>
          <p>
            no Ventspils Valsts 1. ģimnāzijas.
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

        <motion.div
        variants={fadeInUp}
        className={styles.instructions}>
          <div>
            <div>
              <h1>
                1.
              </h1>
              <p>
                Iegriez ratu un uzzini spēles tēmu: banāni hamburgers skrituļdēlis vai T-krekls.
              </p>
            </div>
            <div>
              <h1>
                2.
              </h1>
              <p>
                Spēles pirmajā līmenī izvērtē dotos apgalvojumus. Par katru pareizu atbildi saņem 5 punktus. (arī uz ekrāna nevajag PATIESĪBA vai MELI - tu jābūt Izvērtē apgalvojumus! - kā bija arī manis sūtītajā failā)
              </p>
            </div>
          </div>
          <div>
            <div>
              <h1>
                3.
              </h1>
              <p>
                Spēles otrajā līmenī izvēlies pareizo vārda vai frāzes skaidrojumu. Par katru pareizu atbildi saņem 5 punktus. (šī daļa man neiet, nevaru komentēt tāpēc neko tālāk)
              </p>
            </div>
            <div>
              <h1>
                4.
              </h1>
              <p>
                Spēles trešajā līmenī klikšķini uz vārdiem, kas saistīti ar aprites ekonomiku. Dotais laiks - 15 sekundes. Par katru pareizi izvēlētu vārdu 0.5 punkti.
              </p>
            </div>
          </div>
          <div>
            <div>
              <svg 
              aria-hidden="true" 
              focusable="false" 
              data-prefix="fas" 
              data-icon="trophy" 
              class="svg-inline--fa fa-trophy fa-w-18" 
              role="img" xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 576 512"
              >
                <path
                fill="#9ACA3C" 
                d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"
                /></svg>
                <p>
                  Spēles noslēgumā uzzini vai esi
                </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
