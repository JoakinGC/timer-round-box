import { FormTimerProps } from "../../types/Timer";
import Timer from "./Timer";
//import { useTimerInterval } from "../hooks/useTimerInterval";
import { useTimerCountdown } from "../../hooks/useTimerCountDown";
import "../styles/TimerContainer.css";
import ring from  "../assets/ring.mp3";
import roundSound from  "../assets/boxingStartRound.mp3";
import { useEffect } from "react";

const TimerContainer = ({timerProps}:{timerProps:FormTimerProps}) =>{
    
    //const {timerState,resetTimer,startTimer,stopTimer} =useTimerInterval({timerProps});

    const { startTimer, stopTimer, resetTimer, timerState, toHms } = useTimerCountdown({ timerProps });

    const { hours, minutes, seconds } = toHms(timerState.currentTime);
    const finalSound = new Audio(ring);
    const boxRoundSound = new Audio(roundSound);

    useEffect(() =>{
        if(timerState.isFinally) finalSound.play();
        if(timerState.isBreak) boxRoundSound.play();
    },[timerState.isFinally,timerState.isBreak])

    return(
        <>
        <article>
                <h2>Estás en:</h2>
                <h3>
                    {(timerState.isFinally) ? "Fin": timerState.isBreak ?"Descanso" :"Round"}
                </h3>
        </article>
        <article className="timer-container">
            <article>
                <h2>Número de Rounds</h2>
                <p>{timerState.numberRounds}</p>
            </article>
            <article>
                <Timer
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                />
            </article>
            <article>
                <h2>Rounds restantes:</h2>
                <p>{timerState.roundsRemaining}</p>
            </article>
        </article>
        <article>
            <button disabled={timerState.buttonActive.buttonStop} onClick={() => stopTimer()}>Parar</button>
            <button disabled={timerState.buttonActive.buttonInit} onClick={() => startTimer()}>Iniciar</button>
            <button disabled={timerState.buttonActive.buttonRestart} onClick={() => resetTimer()}>Reinciar</button>
        </article>
        
        </>

    )
}


export default TimerContainer;


