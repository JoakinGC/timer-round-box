import { useState } from "react";
import { FormTimerProps, TimerProps } from "../types/Timer";
import InputTimer from "./InputTimer";
import { numberWithinRange, valueNumber } from "../utils/functionsNumberValue";





const FormTimer = ({SetTimerProps,propsTimer}:{SetTimerProps:any,propsTimer:FormTimerProps}) =>{
    
    const [timerRound,setTimerRound] = useState<TimerProps>({
        hours:0,
        minutes:0,
        seconds:0
    });
    const [timerBreak,setTimerBreak] = useState<TimerProps>({
        hours:0,
        minutes:0,
        seconds:0
    });
    const [nRounds,setNRounds] = useState<number>(0);

    
    const evaluateValue = () =>{
        let timerBreakAux=valueNumber({timer:timerBreak});
        let timerRoundAux=valueNumber({timer:timerRound});


        if(typeof nRounds !== "number"){
            console.error("Nº de rounds debe ser un numero");
            return false;
        }

        if(nRounds >= 1){
            console.error("Nº de rounds debe ser mayor a 1");
            return false;
        }

        if(!numberWithinRange({number:timerBreakAux.hours,maxRan:3600,minRan:0})){
            console.error("Los segundos del descanso NO estan dentro del rango");
            return false;
        }
        if(!numberWithinRange({number:timerBreakAux.minutes,maxRan:59,minRan:0})){
            console.error("Los minutos del descanso NO estan dentro del rango");
            return false;
        }
        if(!numberWithinRange({number:timerBreakAux.seconds,maxRan:59,minRan:0})){
            console.error("Los segundos de round NO estan dentro del rango");
            return false
        } 

        if(!numberWithinRange({number:timerRoundAux.hours,maxRan:3600,minRan:0})){
            console.error("Las horas del round No estan dentro del rango");
            return false;
        }
        if(!numberWithinRange({number:timerRoundAux.minutes,maxRan:59,minRan:0})){
            console.error("Los minutos del round NO estan dentro del rango");
            return false;
        }
        if(!numberWithinRange({number:timerRoundAux.seconds,maxRan:59,minRan:0})){
            console.error("Los segundos del round NO estan dentro del rango");
            return false
        } 
        
        return () => {
            
        };


    }
    
    
    const handleSumit = (e: React.FormEvent) =>{
        e.preventDefault();

    



        let totalRoundTimeInSeconds = timerRound.hours *3600 + timerRound.minutes * 60 + timerRound.seconds;
        let totalRestTimeInSeconds = timerBreak.hours *3600 + timerBreak.minutes * 60 + timerBreak.seconds;
        SetTimerProps({...propsTimer,numberRounds:nRounds, timeRound:totalRoundTimeInSeconds,timeBreaks:totalRestTimeInSeconds});
    }
    console.log(timerRound);
    console.log(timerBreak);
    
    return(
        <form onSubmit={handleSumit}>
            <label>Nº de Rounds</label>
            <br/>
            <input type="number" 
                placeholder="Número de rounds" 
                onChange={(e) => setNRounds(parseInt(e.target.value))}
            />
            <br/>
            <label>Tiempo de Round:</label>
            <br/>
            <InputTimer
                propsTimer={timerRound}
                setPropsTimer={setTimerRound}
            />
            <br/>
            <label>Tiempo de descanso</label>
            <br/>
            <InputTimer
                propsTimer={timerBreak}
                setPropsTimer={setTimerBreak}
            />
            <br/>
            <button type="submit"></button>
        </form>
    );
}

export default FormTimer;