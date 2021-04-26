import styles from "../styles/words.module.scss";
import {useEffect, useState} from 'react';
import { map } from "leaflet";

export default function Words() {

    const [words, setWords] = useState([])
    const [speed, setSpeed] = useState(0.01);
    const [spawnrate, setSpawnrate] = useState(0.1);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            newFrame()
        }, 5000);
        return () => clearInterval(interval)
    }, [])

    const newFrame = () => {
        
        const textModel = [
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            Date.now(),
            false
        ]
        setWords(words => [...words, textModel])
        return Math.random()
    }

    const Delitem = (i) => {
        
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
                    if (Number(style.fontSize.replace(/px$/, '')) > 45 || word[3]) {
                        
                        //setWords(words.splice(i, 1));
                        //words.splice(i, 1)
                        return
                    }
                    return (
                        <label style={style} className={styles.word} onClick={() => setWords(words.slice(i))}>rickroll</label>
                    )
                })}
            </div>
        )
    }

    const Drawer = () => {
        <div>
            
        </div>
    }

    return (
        <div className={styles.backdrop}>
            <Drawer/>
            
        </div>
    )
}