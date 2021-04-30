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
  state = {
    // Declare class variables
    inBrowser: false, // variable - this.state.inBrowser
    points: 0, // variable - this.state.points
    speed: 0, // variable - this.state.speed
    wordList: {
      // Word dictionary, with predefined correct awnsers

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

  componentDidMount() {
    // Function *only* runs on first render
    this.setState({ inBrowser: true }); // Set inBrowser: true, for later validation NoSSR
  }

  newObj(parent) {
    // Function for creating new componenet(word)
    if (true) {
      // Redundant if statment, seems to speed up the code, for no appearent reson, but if it works it works.
      const obj = document.createElement("label"); // Create blank html <label/> element

      obj.innerHTML = this.state.wordList.dictionary[
        Math.floor(Math.random() * this.state.wordList.dictionary.length)
      ]; // Style <label/> element
      obj.style.fontFamily = "montserrat, Sans-serif"; // Set <label/> - font-family
      obj.style.webkitUserSelect = "none"; // Set <label/> - webkituserselect

      obj.style.left = Math.random() * 100 + "%"; // Set <label/> - horizontal  axis
      obj.style.top = Math.random() * 100 + "%"; // Set <label/> - vertical    axis
      obj.style.position = "absolute"; // Set <label/> - position
      obj.style.fontSize = "16px"; // Set <label/> - font-size

      obj.style.whiteSpace = "no-wrap"; // Set <label/> - whit-space
      obj.style.overflow = "hidden"; // Set <label/> - overflow
      obj.style.cursor = "pointer"; // Set <label/> - onHover cursor
      obj.style.color = "#495F41"; // Set <label/> - text color

      obj.classList.add("wordObj"); // /Style <label/> element
      try {
        parent.appendChild(obj); // Try adding the html <label/> to game canvas
      } catch {}
    }
    return;
  }

  newTick(elements) {
    // Function for updating existing component(word) age/size.
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i]; // loop trough each existing obj in the current tick
      let wordSize = parseInt(
        window.getComputedStyle(element).getPropertyValue("font-size")
      ); // Get fontsize and parse to Int
      if (wordSize > 60) element.remove(); // if fontsize above threshold (60) delete obj
      element.style.zIndex = wordSize + 1; // Change word zIndex aka location on canvas in z dimension
      element.style.fontSize = wordSize + 1 + "px"; // Update word fontSize after adding 1 px to it's last value
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
    } else {
      e.target.style.color = "#FD6579"; // else if clicked word is incorrect, we set the color to red
    }
  }

  render() {
    if (!this.state.inBrowser) {
      // Make sure if component loads in NoSSR mode
      return null; // if doesnt, return null
    }
    const mainThread = setInterval(() => {
      // Main interval for
      this.newObj(document.getElementById("board")); // Spawning new <label/> objects
      this.newTick(document.getElementsByClassName("wordObj")); // Update existing <label/> object age/size
    }, 1000 - this.state.speed); // 1s - this.state.speed                      (each loop delay)

    setTimeout(() => {
      // Each 5s,
      this.setState({ speed: this.state.speed + 10 }); // set's game-speed (this.state.speed) higher
      setTimeout(
        () =>
          setTimeout(() => {
            this.props.setGameObj(null);
            if (this.props.sectors.length == 0) {
              this.props.setGameEnded(true);
            } else {
              this.props.setPoints((points) => ({
                words: points.words + this.state.points,
              }));

              this.props.setStage(1);
            }
          }, 6000),
        5000
      ); // 5s + 5s timer + 1s(for discreptencies), after goes to endscreen
    }, 5000); // final timer sum: 15s + 1s(for discreptencies)

    return (
      // Return html objects to be rendered
      <div className={styles.backdrop} onClick={(e) => this.clickEvent(e)}>
        <div className={styles.canvas} id="board" />
      </div>
    ); // /Return html objects to be rendered
  }
}
