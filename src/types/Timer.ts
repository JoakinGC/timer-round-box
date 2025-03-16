export type TimerCoundDownControl = {
    timeRound:number,
    timeBreaks:number,
    numberRounds:number,
    isBreak:boolean|null,
    roundsRemaining:number,
    currentTime:number,
    buttonActive:ButtonsUIActive,
    isFinally:boolean,
}

export type TimerControl = {
    timeBreaks:number,
    timeRound:number,
    totalRealTime:number,
    realTime:number,
    numberRounds:number,
    numberComplets:number,
    isBreak:boolean,
    relojTime:TimerProps,
    buttonActive:ButtonsUIActive
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