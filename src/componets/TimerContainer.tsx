import { FormTimerProps } from "../types/Timer";
import Timer from "./Timer";
import { useTimerInterval } from "../hooks/useTimerInterval";

const TimerContainer = ({timerProps}:{timerProps:FormTimerProps}) =>{
    
    const {timerState,resetTimer,startTimer,stopTimer} =useTimerInterval({timerProps});

    return(
        <main>
            <p>{timerState.isBreak ?"Descanso" :"Round"}</p>
            <Timer
                hours={timerState.relojTime.hours}
                minutes={timerState.relojTime.minutes}
                seconds={timerState.relojTime.seconds}
            />
            <hr/>
            <section>
                <section>
                    <h2>Rounds</h2>
                    {timerState.numberRounds}
                </section>
                <section>
                    Rounds completos:
                    {timerState.numberComplets}
                </section>
                <button disabled={timerState.buttonActive.buttonStop} onClick={() => stopTimer()}>Parar</button>
                <button disabled={timerState.buttonActive.buttonInit} onClick={() => startTimer()}>Iniciar</button>
                <button disabled={timerState.buttonActive.buttonRestart} onClick={() => resetTimer()}>Reinciar</button>
            </section>
        </main>
    )
}


export default TimerContainer;


