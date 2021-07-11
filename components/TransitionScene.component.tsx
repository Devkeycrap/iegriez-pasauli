import styles from "../styles/transitionScene.module.scss";
import { motion } from "framer-motion";

import { connect } from "react-redux";
import { fadeInDown, fadeInUp, stagger } from "../models/animations/animations";

export function TransitionScene({ title, description, isActive }) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className={`${styles.transitionscene} ${isActive && styles.active}`}
    >
      {isActive && (
        <motion.div variants={stagger}>
          <motion.h1 className={styles.title} variants={fadeInDown}>
            {title}
          </motion.h1>
          <motion.p className={styles.description} variants={fadeInUp}>
            {description}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}

const mapStateToProps = (state) => ({
  title: state.transition.title,
  description: state.transition.description,
  isActive: state.transition.isActive,
});

export default connect(mapStateToProps)(TransitionScene);
