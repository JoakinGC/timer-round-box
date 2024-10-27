import { timer } from "../types/time"
import BotonsRound from "./BotonsRound";

export const Reloj = ({time}:{time:timer}) =>{

    const {tiempoTotal = {hours:0,minutes:0,seconds:0}} =  time
    
    
    return (
    <section>
        <h4>
            Time
        </h4>
        <section className="reloj">
            {`${tiempoTotal.hours} : ${tiempoTotal.minutes} : ${tiempoTotal.seconds}`}
        </section>
        <section className="section-rounds">
            <span> Roud: {(time && time.roudns) ? `${time.roudns.length}`:""}</span>
        </section>
        <BotonsRound/>
    </section>)
}

export default Reloj