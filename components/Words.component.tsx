import styles from "../styles/words.module.scss"; // Import stylesheet for component
import { Component } from "react"; // Import class Componenet from react

interface WordProps {
  setGameEnded: (gameEnded: boolean) => void; // Import props from parent code
  setGameObj: (object: any) => void;
  setStage: (stage: number) => void;
  setPoints: (points: any) => void;
  stage: number;
  sectors: any[];
}

export default class Words extends Component<WordProps> {
  mainthread = setInterval(() => {
    this.newObj(document.getElementById("board"));
    this.newTick(document.getElementsByClassName("wordObj"));
  }, 600);
  state = {
    inBrowser: false,
    points: 0,
    speed: 1000,
    maxObjCount: 20,
    objCount: 0,
    wordList: {

      correct: [
        "remontē",
        "salabo",
        "sašuj",
        "salāpi",
        "šķiro",
        "atdod",
        "aizņemies",
        "iestādi",
        "audzē",
        "pārstrādā",
        "ēd vietējo",
        "samal",
      ],

      dictionary: [
        "remontē",
        "salabo",
        "sašuj",
        "nešķiro atkritumus",
        "salāpi",
        "šķiro",
        "atdod",
        "aizņemies",
        "tērē ūdeni",
        "iestādi",
        "audzē",
        "pērc jaunu",
        "izmanto ķīmiju",
        "pārstrādā",
        "ēd vietējo",
        "samal",
      ],
    },
  };

  newObj(parent) {
    // Function for creating new componenet(word)
    if (this.state.objCount < this.state.maxObjCount) {
      // Redundant if statment, seems to speed up the code, for no appearent reson, but if it works it works.
      const obj = document.createElement("label"); // Create blank html <label/> element

      obj.innerHTML = this.state.wordList.dictionary[
        Math.floor(Math.random() * this.state.wordList.dictionary.length)
      ]; // Style <label/> element

      obj.style.left = Math.random() * 100 + "%"; // Set <label/> - horizontal  axis
      obj.style.top = Math.random() * 100 + "%"; // Set <label/> - vertical    axis
      obj.style.position = "absolute"; // Set <label/> - position
      obj.style.fontSize = "16px"; // Set <label/> - font-size
      obj.style.width = "min-content";

      obj.classList.add("wordObj"); // /Style <label/> element
      this.setState({objCount: this.state.objCount+1});
      try {
        parent.appendChild(obj); // Try adding the html <label/> to game canvas
      } catch {}
    }
    return;
  }

  newTick(elements) {
    // Function for updating existing component(word) age/size.
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let wordSize = parseInt(
        window.getComputedStyle(element).getPropertyValue("font-size")
      );
      if (wordSize > 60) {
        element.remove();
        this.setState({objCount: this.state.objCount-1});
      }
      element.style.zIndex = wordSize + 1;
      element.style.fontSize = wordSize + 1 + "px";
    }
  }

  clickEvent(e) {
    // Function for handling click events inside of game canvas
    let correct = false; // Variable for

    this.state.wordList.correct.map((word, i) => {
      // Compare if clicked on target has
      if (e.target.innerHTML == word) return (correct = true); // innerHTML text, that is the correct text,
    }); // by comparing it against this.state.wordList.correct list

    if (correct) {
      // If compare loop returns, true,
      this.setState({ points: this.state.points + 1 }); // Add 1 point to game counter
      e.target.remove(); // Delete correctly clicked <label/>
      this.setState({objCount: this.state.objCount-1});
    } else if (e.target.tagName == "LABEL") {
      e.target.style.color = "#FD6579"; // else if clicked word is incorrect, we set the color to red
      e.target.style.pointerEvents = "none";
    }
  }

  componentDidMount() {
    // Set inBrowser: true, for later validation NoSSR
    this.setState({ inBrowser: true });

    setTimeout(() => {
      clearInterval(this.mainthread);
      this.mainthread = setInterval(() => {
        this.newObj(document.getElementById("board"));
        this.newTick(document.getElementsByClassName("wordObj"));
      }, 300);
    }, 5000);

    setTimeout(() => {
      clearInterval(this.mainthread);
      this.mainthread = setInterval(() => {
        this.newObj(document.getElementById("board"));
        this.newTick(document.getElementsByClassName("wordObj"));
      }, 250);
    }, 10000);

      setTimeout(() => {
        clearInterval(this.mainthread);
        this.props.setGameObj(null);
        if (this.props.sectors.length == 0) {
          this.props.setPoints((points) => ({
            ...points,
            words: points.words + this.state.points,
          }));
          this.props.setGameEnded(true);
        } else {
          this.props.setPoints((points) => ({
            ...points,
            words: points.words + this.state.points,
          }));
          this.props.setStage(1);
        }
      }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.mainthread);
  }

  render() {
    if (!this.state.inBrowser) {
      // Make sure if component loads in NoSSR mode
      return null; // if doesnt, return null
    }

    return (
      // Return html objects to be rendered
      <div className={styles.backdrop} onClick={(e) => this.clickEvent(e)}>
        <div className={styles["points-backdrop"]}><h2>+{this.state.points}</h2></div>
        <div className={styles.canvas} id="board" />
      </div>
    );
  }
}
