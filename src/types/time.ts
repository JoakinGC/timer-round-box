
export type time = {
    hours:number,
    minutes:number,
    seconds:number
}

export type timer = {
    tiempoPorRound: time,
    tiempoDeDescanso: time,
    roudns:checkTimer[],
    descansos:checkTimer[],
    tiempoTotal:time
    }

export type checkTimer = {
    estado:boolean,
    tiempo:time
}