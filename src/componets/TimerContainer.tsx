import { useEffect, useRef, useState } from "react";
import { TimerControl, TimerProps } from "../types/Timer";
import Timer from "./Timer";

const TimerContainer = () =>{
    const timer = useRef<TimerControl>({
        numberComplets:0,
        numberRounds:3,
        timeBreaks:30,
        timeRound:190,
    })

    const relojTime:TimerProps={
        hours:-1,
        minutes:-1,
        seconds:-1
    }
    

    useEffect(() =>{
        let timerAux = timer.current;

        if(timerAux.numberRounds>0){
            let valorDeTiempoTotalDeRoundsEnSegundos = timerAux.numberRounds * timerAux.timeRound
            let dividirTiempoEnHrsMinSeg = (((valorDeTiempoTotalDeRoundsEnSegundos)/60)/60)

            console.log(dividirTiempoEnHrsMinSeg);
            

        }
    },[])

    return(
        <main>
            <Timer
                hours={relojTime.hours}
                minutes={relojTime.minutes}
                seconds={relojTime.seconds}
            />
            <hr/>
            <section>
                <section>
                    <h2>Rounds</h2>
                </section>
                <section>
                    Rounds completos
                </section>
            </section>
        </main>
    )
}


export default TimerContainer;