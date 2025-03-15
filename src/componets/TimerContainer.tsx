import { FormTimerProps } from "../types/Timer";
import Timer from "./Timer";
//import { useTimerInterval } from "../hooks/useTimerInterval";
import { useTimerCountdown } from "../hooks/useTimerCountDown";

const TimerContainer = ({timerProps}:{timerProps:FormTimerProps}) =>{
    
    //const {timerState,resetTimer,startTimer,stopTimer} =useTimerInterval({timerProps});

    const { startTimer, stopTimer, resetTimer, timerState, toHms } = useTimerCountdown({ timerProps });

    const { hours, minutes, seconds } = toHms(timerState.currentTime);

    return(
        <section>
            <p>{timerState.isBreak ?"Descanso" :"Round"}</p>
            <Timer
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
            <hr/>
            <section>
                <section>
                    <h2>Rounds</h2>
                    {timerState.numberRounds}
                </section>
                <section>
                    Rounds completos:
                    {timerState.roundsRemaining}
                </section>
                <button disabled={timerState.buttonActive.buttonStop} onClick={() => stopTimer()}>Parar</button>
                <button disabled={timerState.buttonActive.buttonInit} onClick={() => startTimer()}>Iniciar</button>
                <button disabled={timerState.buttonActive.buttonRestart} onClick={() => resetTimer()}>Reinciar</button>
            </section>
        </section>
    )
}


export default TimerContainer;


