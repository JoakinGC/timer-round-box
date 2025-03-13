import { useEffect,  useRef,useState } from "react";
import { FormTimerProps, TimerControl } from "../types/Timer";
import Timer from "./Timer";

const TimerContainer = ({timerProps}:{timerProps:FormTimerProps}) =>{
    const [dummyState, setDummyState] = useState(false); 
    const [buttonActive, disableButton] = useState({
        buttonInit:false,
        buttonStop:true,
        buttonRestart:true
    }); 
    const timer = useRef<TimerControl>({
        numberComplets:0,
        numberRounds:timerProps.numberRounds,
        timeBreaks:timerProps.timeBreaks,
        timeRound:timerProps.timeRound,
        isBreak:false,
        totalRealTime:0,
        realTime:0,
        relojTime:{
            hours:0,
            minutes:0,
            seconds:0
        },
        intervalTimer:undefined,
    })

    function clearTimer(){
        clearInterval(timer.current.intervalTimer); 
        timer.current.isBreak = false;
        timer.current.numberComplets = 0;
        timer.current.realTime = 0;
        timer.current.totalRealTime = 0;
        timer.current.relojTime = {
            hours:0,
            minutes:0,
            seconds:0
        };
        disableButton({
            buttonInit:false,
            buttonRestart:true,
            buttonStop:true
        })
    }

    function controlTimer() {
        let timerAux = timer.current;
        let TotalRoundTimeInSeconds = timerAux.numberRounds * timerAux.timeRound;
        let TotalRestTimeInSeconds = timerAux.numberRounds * timerAux.timeBreaks; 
        let TotalTimeInSeconds = TotalRoundTimeInSeconds + TotalRestTimeInSeconds+1;

        if(timer.current.realTime>timer.current.timeRound&&!(timer.current.isBreak)){
            timer.current.realTime=0;
            timer.current.isBreak = !timer.current.isBreak;
            timer.current.numberComplets +=1;
            timer.current.relojTime ={
                hours:0,
                minutes:0,
                seconds:0
            }
        }

        if(timer.current.realTime>timer.current.timeBreaks&&timer.current.isBreak){
            timer.current.realTime=0;
            timer.current.isBreak = !timer.current.isBreak;
            timer.current.relojTime = {
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
            disableButton({
                buttonInit:true,
                buttonRestart:true,
                buttonStop:true
    
            })
            clearInterval(timer.current.intervalTimer);    
        }
    }

    const initTimer = () =>{
        
        let timerAux = timer.current;
        if(timerAux.numberRounds>0&&timerAux.timeBreaks>0&&timerAux.timeRound>0){
            disableButton({
                buttonInit:true,
                buttonRestart:false,
                buttonStop:false
    
            })
            timer.current.intervalTimer = setInterval(()=>{
                timer.current.relojTime.seconds+=1;
                timer.current.totalRealTime +=1;
                timer.current.realTime +=1;
                setDummyState((prev) => !prev);
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
                console.log(timer);
                
            },1000)



            return () => clearInterval(timer.current.intervalTimer);
        }
    }
    
    const stop = () =>{
        clearInterval(timer.current.intervalTimer); 
        disableButton({
            buttonInit:false,
            buttonRestart:false,
            buttonStop:true

        }) 
    }
    const restart = () =>{
        clearTimer();
    }


    useEffect(() =>{
        timer.current.timeBreaks = timerProps.timeBreaks;
        timer.current.timeRound =timerProps.timeRound;
        timer.current.numberRounds = timerProps.numberRounds;
        //let timerAux = timer.current;
        //console.log(timerAux.numberRounds>0&&timerAux.timeBreaks>0&&timerAux.timeRound>0);
        
        clearTimer();
        disableButton({
            buttonInit:false,
            buttonRestart:true,
            buttonStop:true
        })
    },[timerProps])

    return(
        <main>
            <p>{timer.current.isBreak ?"Descanso" :"Round"}</p>
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
                <button disabled={buttonActive.buttonStop} onClick={() => stop()}>Parar</button>
                <button disabled={buttonActive.buttonInit} onClick={() => initTimer()}>Iniciar</button>
                <button disabled={buttonActive.buttonRestart} onClick={() => restart()}>Reinciar</button>
            </section>
        </main>
    )
}


export default TimerContainer;


