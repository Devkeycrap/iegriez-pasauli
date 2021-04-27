import styles from "../styles/words.module.scss";
import {useEffect, useState, Component} from 'react';

const Wordlist = ["rickroll"];

export default class Words extends Component {

    state = {
        inBrowser: false,
        liveObjects: [],
        speed: 0.01
    }

    componentDidMount() {
        this.setState({ inBrowser: true })
    }

    rDouble() { return Math.random() }

    newComponent() {
        const textModel = [
            (this.rDouble() * 100),
            (this.rDouble() * 100),
            Date.now()
        ]
        console.log(this.state.liveObjects);
        this.state.liveObjects.push([123, 1341, 11111331])
        console.log(this.state.liveObjects)
    }

    render() {
        // Make sure the map loads with ssr set to false
        if (!this.state.inBrowser) {
            return null;
        }

        let interval = setInterval(() => {
            this.newComponent()
        }, 1000)

        return (
            <div className={styles.backdrop} id="board">
                {this.state.liveObjects.map((obj, i) => {
                    const style = {
                        left: obj[0]+"%",
                        top: obj[1]+"%",
                        fontSize: Math.floor((Date.now() - obj[2])*this.state.speed)+"px",
                        color: "white"
                    }
                    if (Number(style.fontSize.replace(/px$/, '')) > 45) style.color = "red"
                    if (Number(style.fontSize.replace(/px$/, '')) > 45) return
                    return (
                        <label className={styles.textObj} style={style}>rickroll</label>
                    )
                })}
            </div>
        )
    }
}