import { TimerProps } from "../types/Timer";

const Timer = ({hours,minutes,seconds}:TimerProps) =>{
    return(
        <>{`${hours} : ${minutes} : ${seconds}`}</>
    )
}



export default Timer;