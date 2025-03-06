import { useEffect,  useRef } from "react";
import { TimerControl } from "../types/Timer";
import Timer from "./Timer";

const TimerContainer = () =>{
    const timer = useRef<TimerControl>({
        numberComplets:0,
        numberRounds:1,
        timeBreaks:2,
        timeRound:2,
        isBreak:false,
        totalRealTime:0,
        realTime:0,
        relojTime:{
            hours:0,
            minutes:0,
            seconds:0
        },
        intervalTimer:undefined
    })


    function controlTimer() {
        let timerAux = timer.current;
        let TotalRoundTimeInSeconds = timerAux.numberRounds * timerAux.timeRound;
        let TotalRestTimeInSeconds = timerAux.numberRounds * timerAux.timeBreaks; 
        let TotalTimeInSeconds = TotalRoundTimeInSeconds + TotalRestTimeInSeconds;

        if(timer.current.realTime===timer.current.timeRound&&!(timer.current.isBreak)){
            timer.current.realTime=0;
            timer.current.isBreak = !timer.current.isBreak;
            timer.current.numberComplets +=1;
            timer.current.relojTime ={
                hours:0,
                minutes:0,
                seconds:0
            }
        }

        if(timer.current.realTime===timer.current.timeBreaks&&timer.current.isBreak){
            timer.current.realTime=0;
            timer.current.isBreak = !timer.current.isBreak;
            timer.current.relojTime ={
                hours:0,
                minutes:0,
                seconds:0
            };
        }

        if(timer.current.totalRealTime===TotalTimeInSeconds){
            console.log("stopped");

            timer.current.relojTime ={
                hours:0,
                minutes:0,
                seconds:0
            };
            clearInterval(timer.current.intervalTimer);    
        }
    }

    useEffect(() =>{
        let timerAux = timer.current;
        if(timerAux.numberRounds>0){
            timer.current.intervalTimer = setInterval(()=>{
                timer.current.relojTime.seconds+=1;
                timer.current.totalRealTime +=1;
                timer.current.realTime +=1;
                console.log("reloj timer");
    
                if(timer.current.relojTime.seconds===60){
                    timer.current.relojTime.seconds=0;
                    timer.current.relojTime.minutes+=1;
                }
                if(timer.current.relojTime.minutes===60){
                    timer.current.relojTime.minutes=0;
                    timer.current.relojTime.hours+=1;
                }
            
                controlTimer()
            },1000)

            return () => clearInterval(timer.current.intervalTimer);
        }
    },[])

    return(
        <main>
            <Timer
                hours={timer.current.relojTime.hours}
                minutes={timer.current.relojTime.minutes}
                seconds={timer.current.relojTime.seconds}
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


