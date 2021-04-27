import styles from "../styles/words.module.scss";
import {useEffect, useState} from 'react';
import { map } from "leaflet";

export default function Words() {

    const [words, setWords] = useState([])
    const [speed, setSpeed] = useState(0.01);
    const [spawnrate, setSpawnrate] = useState(0.01);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const tfMs = 1;
        const interval = setInterval(() => {
            newFrame()
        }, tfMs);

        return () => clearInterval(interval)
    }, [])

    const clickEvent = (e) => {
        if (e == null) e = window.event

        // Add more validation this is jank
        if (e.target.nodeName == "LABEL") {
            // Remove that object here
            console.log("Point")
        }
    }

    const newFrame = () => {
        const textModel = [
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            Date.now(),
            false
        ]
        setWords(words => [...words, textModel])    
    }

    const Renderer = () => {
        return (
            <div>
                {words.map((word, i) => {
                    const style = {
                        left: word[0]+"%",
                        top: word[1]+"%",
                        fontSize: `${Math.floor((Date.now()- word[2]) * speed)}`+"px"
                    }
                    if (Number(style.fontSize.replace(/px$/, '')) > 45 || word[3]) return
                    return (
                        <label style={style} className={styles.word}>rickroll</label>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={styles.backdrop} onClick={clickEvent}>
            <Renderer/>
        </div>
    )
}