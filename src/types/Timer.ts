export type TimerControl = {
    timeBreaks:number,
    timeRound:number,
    totalRealTime:number,
    realTime:number,
    intervalTimer:number|undefined,
    
}
export type TimerUIComponent = {
    buttonActive:ButtonsUIActive,
    relojTime:TimerProps,
    numberRounds:number,
    numberComplets:number,
    isBreak:boolean,
}

export type ButtonsUIActive = {
    buttonInit:boolean,
    buttonStop:boolean,
    buttonRestart:boolean,
}

export type TimerProps = {
    hours:number,
    minutes:number,
    seconds:number,
}

export type FormTimerProps = {
    numberRounds:number,
    timeBreaks:number,
    timeRound:number,
}