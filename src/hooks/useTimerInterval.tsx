import { useEffect,useState,useRef } from "react";
import { FormTimerProps, TimerControl, TimerUIComponent } from "../types/Timer";

export function useTimerInterval({timerProps}:{timerProps:FormTimerProps}){

        const timer = useRef<TimerControl>({
            timeBreaks:timerProps.timeBreaks,
            timeRound:timerProps.timeRound,
            totalRealTime:0,
            realTime:0,
            intervalTimer:undefined,
        })

        const [uiComponents,setUIComponents] = useState<TimerUIComponent>({
            buttonActive:{
                buttonInit:false,
                buttonStop:true,
                buttonRestart:true
            },
            relojTime:{
                hours:0,
                minutes:0,
                seconds:0
            },
            numberRounds:timerProps.numberRounds,
            numberComplets:0,
            isBreak:false,
        })


        
    
        function clearTimer(){
            clearInterval(timer.current.intervalTimer); 
            timer.current.realTime = 0;
            timer.current.totalRealTime = 0;
            setUIComponents( prev => ({
                ...prev,
                isBreak:false,
                numberComplets:0,
                relojTime:{
                    hours:0,
                    minutes:0,
                    seconds:0
                },
                buttonActive:{
                    buttonInit:false,
                    buttonRestart:true,
                    buttonStop:true
                }
            }))
        }
    
        function controlTimer() {
            let timerAux = timer.current;
            let TotalRoundTimeInSeconds = uiComponents.numberRounds * timerAux.timeRound;
            let TotalRestTimeInSeconds = uiComponents.numberRounds * timerAux.timeBreaks; 
            let TotalTimeInSeconds = TotalRoundTimeInSeconds + TotalRestTimeInSeconds+1;
    
            if(timer.current.realTime>timer.current.timeRound&&!(uiComponents.isBreak)){
                timer.current.realTime=0;
                setUIComponents(prev =>({
                    ...prev,
                    isBreak:!prev.isBreak,
                    numberComplets:prev.numberComplets++,
                    relojTime :{
                        hours:0,
                        minutes:0,
                        seconds:0
                    }
                }))
            }
    
            if(timer.current.realTime>timer.current.timeBreaks&&uiComponents.isBreak){
                timer.current.realTime=0;
                setUIComponents(prev =>({
                    ...prev,
                    isBreak:!prev.isBreak,
                    relojTime :{
                        hours:0,
                        minutes:0,
                        seconds:0
                    }
                }))
            }
    
            if(timer.current.totalRealTime===TotalTimeInSeconds){
                console.log("stopped");
                setUIComponents( prev => ({
                    ...prev,
                    buttonActive:{
                        buttonInit:true,
                        buttonRestart:true,
                        buttonStop:true
                    },
                    relojTime:{
                        hours:0,
                        minutes:0,
                        seconds:0
                    }
                }));
                clearInterval(timer.current.intervalTimer);    
            }
        }
    
        const startTimer = () =>{
            
            let timerAux = timer.current;
            if(uiComponents.numberRounds>0&&timerAux.timeBreaks>0&&timerAux.timeRound>0){
                timer.current.intervalTimer = setInterval(()=>{
                    setUIComponents((prev) => {
                        const { hours, minutes, seconds } = prev.relojTime;
                        let newSec = seconds + 1;
                        let newMin = minutes;
                        let newHrs = hours;
                    
                        if (newSec === 60) {
                          newSec = 0;
                          newMin += 1;
                        }
                        if (newMin === 60) {
                          newMin = 0;
                          newHrs += 1;
                        }
                        return {
                          ...prev,
                          buttonActive:{
                            buttonInit:true,
                            buttonRestart:false,
                            buttonStop:false
                        },
                          relojTime: {
                            hours: newHrs,
                            minutes: newMin,
                            seconds: newSec
                          },
                        };
                      });

                    timer.current.totalRealTime +=1;
                    timer.current.realTime +=1;
                    console.log("reloj timer");
        
                    controlTimer()
                    console.log(timer);
                    
                },1000)
    
    
    
                return () => clearInterval(timer.current.intervalTimer);
            }
        }
        
        const stopTimmer = () =>{
            clearInterval(timer.current.intervalTimer); 
            setUIComponents(prev =>({...prev,
                buttonActive:{
                    buttonInit:false,
                    buttonRestart:false,
                    buttonStop:true
                }
            })) 
        }
    
    
        useEffect(() =>{
            timer.current.timeBreaks = timerProps.timeBreaks;
            timer.current.timeRound =timerProps.timeRound;
            //let timerAux = timer.current;
            //console.log(timerAux.numberRounds>0&&timerAux.timeBreaks>0&&timerAux.timeRound>0);
            
            clearTimer();
            setUIComponents(prev => ({...prev,
                numberRounds:timerProps.numberRounds,
                buttonActive:{
                    buttonInit:false,
                    buttonRestart:true,
                    buttonStop:true
                }
            }))
        },[timerProps])

        return {clearTimer,stopTimmer,startTimer,uiComponents}
}