import { useState } from "react";
import { FormTimerProps, TimerProps } from "../types/Timer";
import InputTimer from "./InputTimer";
import { validateTime } from "../utils/validateTime";
import "../styles/FormTimer.css";

const FormTimer = ({ SetTimerProps, propsTimer }: { SetTimerProps: any; propsTimer: FormTimerProps }) => {
  const [timerRound, setTimerRound] = useState<TimerProps>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [timerBreak, setTimerBreak] = useState<TimerProps>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [nRounds, setNRounds] = useState<number>(0);

  const [errorMsg, setErrorMsg] = useState("");

  

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(""); 

    if (typeof nRounds !== "number" || isNaN(nRounds)) {
      setErrorMsg("Nº de rounds debe ser un número");
      return;
    }
    if (nRounds <= 0) {
      setErrorMsg("Nº de rounds debe ser mayor que 0");
      return;
    }

    
    if (!validateTime(timerBreak, 1, "descanso",setErrorMsg)) return;

    
    if (!validateTime(timerRound, 1, "round",setErrorMsg)) return;
    
    const totalRoundTimeInSeconds =
      timerRound.hours * 3600 + timerRound.minutes * 60 + timerRound.seconds;
    const totalRestTimeInSeconds =
      timerBreak.hours * 3600 + timerBreak.minutes * 60 + timerBreak.seconds;

    SetTimerProps({
      ...propsTimer,
      numberRounds: nRounds,
      timeRound: totalRoundTimeInSeconds,
      timeBreaks: totalRestTimeInSeconds,
    });
  }

  return (

    <form className="form" onSubmit={handleSubmit}>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <article className="form--article">
        <label htmlFor="numRounds">Nº de Rounds</label>
        <input
          id="numRounds"
          type="number"
          placeholder="Número de rounds"
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (isNaN(val)) setNRounds(0);
            else setNRounds(val);
          }}
          min="1"
        />
      </article>

 
      <article className="form--article">
        <label>Tiempo de Round:</label>
        <InputTimer
          propsTimer={timerRound}
          setPropsTimer={setTimerRound}
        />
      </article>
        
      <article className="form--article">
        <label>Tiempo de descanso</label>
        <InputTimer
          propsTimer={timerBreak}
          setPropsTimer={setTimerBreak}
        />
      </article>

      <button className="form--boutton" type="submit">Tiempo</button>

    </form>
  );
};

export default FormTimer;
