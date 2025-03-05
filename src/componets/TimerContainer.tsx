import { useEffect,  useRef } from "react";
import { TimerControl, TimerProps } from "../types/Timer";
import Timer from "./Timer";

const TimerContainer = () =>{
    const timer = useRef<TimerControl>({
        numberComplets:0,
        numberRounds:1,
        timeBreaks:2,
        timeRound:2,
        isBreak:false,
    })
    const totalRealTime = useRef<number>(0);
    const realTime = useRef<number>(0);

    const relojTime= useRef<TimerProps>({
        hours:0,
        minutes:0,
        seconds:0
    })
    
    const intervalTimer = useRef<undefined|number>();

    function controlTimer() {
        let timerAux = timer.current;
        let TotalRoundTimeInSeconds = timerAux.numberRounds * timerAux.timeRound;
        let TotalRestTimeInSeconds = timerAux.numberRounds * timerAux.timeBreaks; 
        let TotalTimeInSeconds = TotalRoundTimeInSeconds + TotalRestTimeInSeconds;

        if(realTime.current===timer.current.timeRound&&!(timer.current.isBreak)){
            realTime.current=0;
            timer.current.isBreak = !timer.current.isBreak;
            timer.current.numberComplets +=1;
            relojTime.current ={
                hours:0,
                minutes:0,
                seconds:0
            }
        }

        if(realTime.current===timer.current.timeBreaks&&timer.current.isBreak){
            realTime.current=0;
            timer.current.isBreak = !timer.current.isBreak;
            relojTime.current ={
                hours:0,
                minutes:0,
                seconds:0
            };
        }

        if(totalRealTime.current===TotalTimeInSeconds){
            console.log("Se detuvo");

            relojTime.current ={
                hours:0,
                minutes:0,
                seconds:0
            };
            clearInterval(intervalTimer.current);    
        }
    }

    useEffect(() =>{
        let timerAux = timer.current;
        if(timerAux.numberRounds>0){
            intervalTimer.current = setInterval(()=>{
                relojTime.current.seconds+=1;
                totalRealTime.current +=1;
                realTime.current +=1;
                console.log("reloj timer");
    
                if(relojTime.current.seconds===60){
                    relojTime.current.seconds=0;
                    relojTime.current.minutes+=1;
                }
                if(relojTime.current.minutes===60){
                    relojTime.current.minutes=0;
                    relojTime.current.hours+=1;
                }
            
                controlTimer()
            },1000)

            return () => clearInterval(intervalTimer.current);
        }
    },[])

    return(
        <main>
            <Timer
                hours={relojTime.current.hours}
                minutes={relojTime.current.minutes}
                seconds={relojTime.current.seconds}
            />
            <hr/>
            <section>
                <section>
                    <h2>Rounds</h2>
                    {timer.current.numberRounds}
                </section>
                <section>
                    Rounds completos:
                    {timer.current.numberComplets}
                </section>
            </section>
        </main>
    )
}


export default TimerContainer;


