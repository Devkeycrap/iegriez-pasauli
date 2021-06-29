import styles from "../styles/transitionScene.module.scss";
import { Tween, SplitChars } from "react-gsap";
import { connect } from "react-redux";

export function TransitionScene({ title, description, isActive }) {
  return (
    <div className={`${styles.transitionscene} ${isActive && styles.active}`}>
      {isActive && (
        <div>
          <h1>
            <Tween
              to={{
                y: "0",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
              stagger={0.05}
            >
              <SplitChars wrapper={<span className={styles.title} />}>
                {title}
              </SplitChars>
            </Tween>
          </h1>
          <p>
            <Tween
              to={{
                y: "0",
                clipPath: "polygon(0 0, 120% 0, 120% 120%, 0 120%)",
              }}
              stagger={0.01}
            >
              <SplitChars wrapper={<span className={styles.description} />}>
                {description}
              </SplitChars>
            </Tween>
          </p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  title: state.transition.title,
  description: state.transition.description,
  isActive: state.transition.isActive,
});

export default connect(mapStateToProps)(TransitionScene);
