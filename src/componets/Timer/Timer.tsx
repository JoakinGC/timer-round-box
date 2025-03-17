import { TimerProps } from "../../types/Timer";

const Timer = ({hours,minutes,seconds}:TimerProps) =>{
    return(
        <span className="reloj--timmer">{`${hours} : ${minutes} : ${seconds}`}</span>
    )
}



export default Timer;