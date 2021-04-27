import styles from "../styles/words.module.scss";
import {useEffect, useState, Component} from 'react';
import { point } from "leaflet";

interface MapProps {
    setStage: (stage: number) => void;
  }

// THIS CLASS IS CURSED, NO TOUCHING ALLOWED!   
export default class Words extends Component {

    state = {
        inBrowser: false,
        points: 0,
        speed: 1, // 1-10
        wordList: {correct:["remontē", "salabo", "sašuj", "salāpi", "šķiro", "atdod", "aizņemies", "iestādi", "audzē", "pārstrādā", "ēd vietējo", "samal"], 
                    dictionary:["remontē", "salabo", "sašuj", "nešķiro atkritumus", "salāpi", "šķiro", "atdod", "aizņemies", "tērē ūdeni", "iestādi", "audzē", "pērc jaunu", "izmanto ķīmiju", "pārstrādā", "ēd vietējo", "samal"]}
    }

    componentDidMount() {
        this.setState({ inBrowser: true })
    }

    newObj(parent) {
        if (true) {
            const obj = document.createElement("label");

            obj.innerHTML = this.state.wordList.dictionary[Math.floor(Math.random()*this.state.wordList.dictionary.length)];
            obj.style.webkitUserSelect = "none";

            obj.style.left = (Math.random()*100)+"%";
            obj.style.top = (Math.random()*100)+"%";
            obj.style.position ="absolute";
            obj.style.fontSize = "16px"

            obj.style.wordWrap = "no-wrap";
            obj.style.cursor = "pointer";
            obj.style.color = "white";
            obj.classList.add("wordObj");

            parent.appendChild(obj);
        }
        return
    }

    newTick(elements) {
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let wordSize = parseInt(window.getComputedStyle(element).getPropertyValue("font-size"));
            if (wordSize > 50) {
                element.style.color = "darkgrey";
            }
            if (wordSize > 60) element.remove();
            element.style.zIndex = wordSize + 1;
            element.style.fontSize = wordSize + 1 + "px";
        }
    }   

    clickEvent(e) {
        let correct = false;
        this.state.wordList.correct.map((word, i) => {
            if (e.target.innerHTML == word) return correct = true
        })
        if (correct) {
            this.setState({points: this.state.points+1})
            e.target.remove()
            console.log(this.state.points);
        }
    }

    render() {
        // Make sure the map loads with ssr set to false
        if (!this.state.inBrowser) {
            return null;
        }
        let seconds = 0;
        const mainThread = setInterval(() => {
            this.newObj(document.getElementById("board"))
            this.newTick(document.getElementsByClassName("wordObj"))
    
            //seconds = seconds + (1000/this.state.speed);
        }, 1000/this.state.speed)


        return (
            <div>
                <h1>{this.state.points}</h1>
                <div className={styles.backdrop} id="board" onClick={(e) => this.clickEvent(e)}/>
            </div>
        )
    }
}