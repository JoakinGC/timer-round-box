import { useState } from "react";
import { FormTimerProps, TimerProps } from "../types/Timer";
import RelojForm from "./RelojForm";


const FormTimer = ({SetTimerProps,propsTimer}:{SetTimerProps:any,propsTimer:FormTimerProps}) =>{
    
    const [timerRound,setTimerRound] = useState<TimerProps>({
        hours:0,
        minutes:0,
        seconds:0
    });
    const [timerBreeak,setTimerBreak] = useState<TimerProps>({
        hours:0,
        minutes:0,
        seconds:0
    });
    
    
    const handleSumit = (e: React.FormEvent) =>{
        e.preventDefault();

        let tiempoTotalDeRoundEnSegundos = timerRound.hours *3600 + timerRound.minutes * 60 + timerRound.seconds;
        let tiempoTotalDeDescansoEnSegundos = timerRound.hours *3600 + timerRound.minutes * 60 + timerRound.seconds;
        SetTimerProps({...propsTimer, timeRound:tiempoTotalDeRoundEnSegundos,timeBreaks:tiempoTotalDeDescansoEnSegundos});
    }
    console.log(timerRound);
    console.log(timerBreeak);
    
    return(
        <form onSubmit={handleSumit}>
            <label>Nº de Rounds</label>
            <br/>
            <input type="number" 
                placeholder="Número de rounds" 
                onChange={(e) => SetTimerProps({...propsTimer,numberRounds:parseInt(e.target.value)})}
            />
            <br/>
            <label>Tiempo de Round:</label>
            <br/>
            <RelojForm
                propsTimer={timerRound}
                setPropsTimer={setTimerRound}
            />
            <br/>
            <label>Tiempo de descanso</label>
            <br/>
            <RelojForm
                propsTimer={timerBreeak}
                setPropsTimer={setTimerBreak}
            />
            <br/>
            <button type="submit"></button>
        </form>
    );
}

export default FormTimer;