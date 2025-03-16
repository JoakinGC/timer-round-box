import { FormTimerProps } from "../types/Timer";
import Timer from "./Timer";
//import { useTimerInterval } from "../hooks/useTimerInterval";
import { useTimerCountdown } from "../hooks/useTimerCountDown";
import "../styles/TimerContainer.css";

const TimerContainer = ({timerProps}:{timerProps:FormTimerProps}) =>{
    
    //const {timerState,resetTimer,startTimer,stopTimer} =useTimerInterval({timerProps});

    const { startTimer, stopTimer, resetTimer, timerState, toHms } = useTimerCountdown({ timerProps });

    const { hours, minutes, seconds } = toHms(timerState.currentTime);

    return(
        <article className="timer-container">
            <h2>Estás en:</h2>
            <h3>
                {(timerState.isFinally) ? "Fin": timerState.isBreak ?"Descanso" :"Round"}
            </h3>
            <Timer
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
            <hr/>
            <article>
                <article>
                    <h2>Número de Rounds</h2>
                    <p>{timerState.numberRounds}</p>
                </article>
                <article>
                    <h2>Rounds completos:</h2>
                    <p>{timerState.roundsRemaining}</p>
                </article>
                <button disabled={timerState.buttonActive.buttonStop} onClick={() => stopTimer()}>Parar</button>
                <button disabled={timerState.buttonActive.buttonInit} onClick={() => startTimer()}>Iniciar</button>
                <button disabled={timerState.buttonActive.buttonRestart} onClick={() => resetTimer()}>Reinciar</button>
            </article>
        </article>
    )
}


export default TimerContainer;


