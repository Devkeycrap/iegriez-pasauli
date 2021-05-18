import styles from "../styles/aboutus.module.scss";

//
// Our team page
//
export default function AboutUs() {
  return (
    <div className={styles["about-game"]}>
      <h4>Komanda</h4>
      <div className={styles["page-wrapper"]}>
        <div className={styles.level}>
          <div className={styles["image-wrapper"]}>
            <img
              className={styles.icon}
              src="https://avatars.githubusercontent.com/u/66126144?v=4"
              alt="Devkeycrap"
              onClick={() => window.open("https://github.com/Devkeycrap")}
            />
          </div>
          <div className={styles["title-wrapper"]}>
            <h1>
              <span>R</span>onalds
            </h1>
            <h5>Palacis</h5>
          </div>
        </div>
        <div className={styles.level}>
          <div className={styles["image-wrapper"]}>
            <img
              className={styles.icon}
              src="https://avatars.githubusercontent.com/u/71285785?s=400&v=4"
              alt="krisaxh"
              onClick={() => window.open("https://github.com/krisaxh")}
            />
          </div>
          <div className={styles["title-wrapper"]}>
            <h1>
              <span>K</span>ristaps
            </h1>
            <h5>Mihelsons</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
