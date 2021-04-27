import styles from "../styles/words.module.scss";
import {useEffect, useState, Component} from 'react';

const Wordlist = ["rickroll"];

export default class Words extends Component {

    state = {
        inBrowser: false
    }

    componentDidMount() {
        this.setState({ inBrowser: true })
    }

    rDouble() { return Math.floor(Math.random()) }
    rPosition() { return Math.floor(Math.random()*100)+"%"}

    newComponent(parent) {
        let obj = document.createElement("label");
        obj.innerHTML = Wordlist[this.rDouble()*Wordlist.length]
        obj.style.webkitUserSelect = "none";

        obj.style.left = this.rPosition();
        obj.style.top = this.rPosition();
        obj.style.position ="absolute";

        obj.style.wordWrap = "no-wrap";
        obj.style.cursor = "pointer";
        obj.style.color = "white";
        obj.id = "wordObj";

        parent.appendChild(obj);
        return
    }


    render() {
        // Make sure the map loads with ssr set to false
        if (!this.state.inBrowser) {
            return null;
        }

        let newObjects = setInterval(() => {
            this.newComponent(document.getElementById("board"))
        }, 1000)

        return (
            <div className={styles.backdrop} id="board">
                
            </div>
        )
    }
}