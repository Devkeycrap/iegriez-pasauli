import styles from '../styles/endscreen.module.scss';

export default function Endscreen() {
    return (
        <div className={styles.canvas}>
            <div className={styles["button-container"]}>
                <button className={`${styles.btn}  ${styles["btn-orange"]}`}>Spēlēt vēlreiz</button>
                <button className={`${styles.btn}  ${styles["btn-neutral"]}`}>Rezultātu tabula</button>
            </div>
        </div>
    )
}