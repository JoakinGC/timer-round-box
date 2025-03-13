import { useState } from "react";
import { FormTimerProps, TimerProps } from "../types/Timer";
import InputTimer from "./InputTimer";
import { validateTime } from "../utils/validateTime";

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
    setErrorMsg(""); // Limpio el error antes de validar

    if (typeof nRounds !== "number" || isNaN(nRounds)) {
      setErrorMsg("Nº de rounds debe ser un número");
      return;
    }
    if (nRounds <= 0) {
      setErrorMsg("Nº de rounds debe ser mayor que 0");
      return;
    }

    
    if (!validateTime(timerBreak, 1, "descanso",setErrorMsg)) {
      return;
    }
    
    if (!validateTime(timerRound, 1, "round",setErrorMsg)) {
      return;
    }
    
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
    <form onSubmit={handleSubmit}>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <label htmlFor="numRounds">Nº de Rounds</label>
      <br />
      <input
        id="numRounds"
        type="number"
        placeholder="Número de rounds"
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          if (isNaN(val)) setNRounds(0);
          else setNRounds(val);
        }}
      />
      <br />

      <label>Tiempo de Round:</label>
      <br />
      <InputTimer
        propsTimer={timerRound}
        setPropsTimer={setTimerRound}
      />
      <br />

      <label>Tiempo de descanso</label>
      <br />
      <InputTimer
        propsTimer={timerBreak}
        setPropsTimer={setTimerBreak}
      />
      <br />

      <button type="submit">Configurar</button>
    </form>
  );
};

export default FormTimer;
