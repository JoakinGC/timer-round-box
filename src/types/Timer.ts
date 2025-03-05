export type TimerControl = {
    numberComplets:number,
    numberRounds:number,
    timeBreaks:number,
    timeRound:number,
    isBreak:boolean,
    totalRealTime:number,
    realTime:number,
    relojTime:TimerProps
}


export type TimerProps = {
    hours:number,
    minutes:number,
    seconds:number,
}