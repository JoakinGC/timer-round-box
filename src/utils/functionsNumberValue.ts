import { TimerProps } from "../types/Timer";

const valueNumber = ({timer}:{timer:TimerProps}) =>{
    let timerAux:TimerProps ={
        hours:0,
        minutes:0,
        seconds:0,
    }
    if(typeof timer.hours == "number") timerAux.hours = timer.hours;
    if(typeof timer.minutes == "number") timerAux.minutes = timer.minutes;
    if(typeof timer.seconds == "number") timerAux.seconds = timer.seconds;
    //cases NaN or other type
    return timerAux;
};


const numberWithinRange = (
    {number,maxRan, minRan}:
    {number:number,maxRan:number,minRan:number}
) => number>=minRan && number<maxRan


export {valueNumber,numberWithinRange};