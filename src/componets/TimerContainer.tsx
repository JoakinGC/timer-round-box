import { FormTimerProps } from "../types/Timer";
import Timer from "./Timer";
import { useTimerInterval } from "../hooks/useTimerInterval";

const TimerContainer = ({timerProps}:{timerProps:FormTimerProps}) =>{
    
    const {uiComponents,clearTimer,startTimer,stopTimmer} =useTimerInterval({timerProps});

    return(
        <main>
            <p>{uiComponents.isBreak ?"Descanso" :"Round"}</p>
            <Timer
                hours={uiComponents.relojTime.hours}
                minutes={uiComponents.relojTime.minutes}
                seconds={uiComponents.relojTime.seconds}
            />
            <hr/>
            <section>
                <section>
                    <h2>Rounds</h2>
                    {uiComponents.numberRounds}
                </section>
                <section>
                    Rounds completos:
                    {uiComponents.numberComplets}
                </section>
                <button disabled={uiComponents.buttonActive.buttonStop} onClick={() => stopTimmer()}>Parar</button>
                <button disabled={uiComponents.buttonActive.buttonInit} onClick={() => startTimer()}>Iniciar</button>
                <button disabled={uiComponents.buttonActive.buttonRestart} onClick={() => clearTimer()}>Reinciar</button>
            </section>
        </main>
    )
}


export default TimerContainer;


