import { useEffect, useState, useRef } from "react";
import { FormTimerProps } from "../types/Timer";

export function useTimerInterval({ timerProps }: { timerProps: FormTimerProps }) {
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  
  const [timerState, setTimerState] = useState({
    timeBreaks: timerProps.timeBreaks,
    timeRound: timerProps.timeRound,
    totalRealTime: 0,
    realTime: 0,

    numberRounds: timerProps.numberRounds,
    numberComplets: 0,
    isBreak: false,

    relojTime: {
      hours: 0,
      minutes: 0,
      seconds: 0
    },

    buttonActive: {
      buttonInit: false,
      buttonStop: true,
      buttonRestart: true
    }
  });

 
  function resetTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimerState((prev) => ({
      ...prev,
      realTime: 0,
      totalRealTime: 0,
      isBreak: false,
      numberComplets: 0,
      relojTime: { hours: 0, minutes: 0, seconds: 0 },
      buttonActive: {
        buttonInit: false,
        buttonRestart: true,
        buttonStop: true
      }
    }));
  }

 
  function checkTimer() {
    setTimerState((prev) => {
      const totalRoundTimeInSeconds = prev.numberRounds * prev.timeRound;
      const totalRestTimeInSeconds = prev.numberRounds * prev.timeBreaks;
      const totalTimeInSeconds = totalRoundTimeInSeconds + totalRestTimeInSeconds ;

      let nextState = { ...prev };


      if (prev.realTime >= prev.timeRound && !prev.isBreak) {
        console.log("Round terminado")
        nextState.realTime = 0;
        nextState.isBreak = true;
        nextState.numberComplets = prev.numberComplets + 1;
        nextState.relojTime = { hours: 0, minutes: 0, seconds: 0 };
      }


      if (prev.realTime >= prev.timeBreaks && prev.isBreak) {
        console.log("descanso terminado")
        nextState.realTime = 0;
        nextState.isBreak = false;
        nextState.relojTime = { hours: 0, minutes: 0, seconds: 0 };
      }

      if (prev.totalRealTime === totalTimeInSeconds) {
        console.log("stopped");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        nextState.buttonActive = {
          buttonInit: true,
          buttonRestart: true,
          buttonStop: true
        };
        nextState.relojTime = { hours: 0, minutes: 0, seconds: 0 };
      }

      return nextState;
    });
  }


  const startTimer = () => {
    if (intervalRef.current) {
      return;
    }

    setTimerState((prev) => {
      if (prev.numberRounds <= 0 || prev.timeBreaks <= 0 || prev.timeRound <= 0) {
        return prev; 
      }
  
      return {
        ...prev,
        buttonActive: {
          buttonInit: true,
          buttonRestart: false,
          buttonStop: false
        }
      };
    });


    intervalRef.current = setInterval(() => {
      setTimerState((prev) => {
        const newRealTime = prev.realTime + 1;
        const newTotalRealTime = prev.totalRealTime + 1;

        let { hours, minutes, seconds } = prev.relojTime;
        seconds += 1;
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
        if (minutes === 60) {
          minutes = 0;
          hours += 1;
        }

        return {
          ...prev,
          realTime: newRealTime,
          totalRealTime: newTotalRealTime,
          relojTime: { hours, minutes, seconds }
        };
      });
      checkTimer()
      //setTimeout(() => checkTimer(), 50);
    }, 1000);
  };

 
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimerState((prev) => ({
      ...prev,
      buttonActive: {
        buttonInit: false,
        buttonRestart: false,
        buttonStop: true
      }
    }));
  };


  useEffect(() => {
    setTimerState((prev) => ({
      ...prev,
      timeBreaks: timerProps.timeBreaks,
      timeRound: timerProps.timeRound,
      numberRounds: timerProps.numberRounds
    }));

    resetTimer();
  }, [timerProps]);

  return {
    resetTimer,
    stopTimer,
    startTimer,
    timerState
  };
}
