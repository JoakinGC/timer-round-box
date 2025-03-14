import { useEffect, useState, useRef } from "react";
import { FormTimerProps } from "../types/Timer";

export function useTimerCountdown({ timerProps }: { timerProps: FormTimerProps }) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [timerState, setTimerState] = useState({
    timeRound: timerProps.timeRound,   
    timeBreaks: timerProps.timeBreaks, 
    numberRounds: timerProps.numberRounds,
    isBreak: false,
    roundsRemaining: timerProps.numberRounds,
    currentTime: timerProps.timeRound,

    // Estado para la UI de los botones
    buttonActive: {
      buttonInit: false,
      buttonStop: true,
      buttonRestart: true
    }
  });

  function toHms(totalSecs: number) {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return { hours, minutes, seconds };
  }

  function resetTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState((prev) => ({
      ...prev,
      isBreak: false,
      roundsRemaining: prev.numberRounds,       
      currentTime: prev.timeRound,             
      buttonActive: {
        buttonInit: false,
        buttonStop: true,
        buttonRestart: true
      }
    }));
  }

  function switchPhase() {
    setTimerState((prev) => {
      if (!prev.isBreak) {
        console.log("⏳ Round terminado; iniciando descanso...");
        return {
          ...prev,
          isBreak: true,
          currentTime: prev.timeBreaks 
        };
      } else {
        console.log("🔥 Descanso terminado; siguiente round...");
        const nextRounds = prev.roundsRemaining - 1;
        if (nextRounds <= 0) {
          console.log("✅ Timer completado");
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return {
            ...prev,
            roundsRemaining: 0,
            buttonActive: {
              buttonInit: true,
              buttonRestart: true,
              buttonStop: true
            }
          };
        }
        return {
          ...prev,
          isBreak: false,
          roundsRemaining: nextRounds,
          currentTime: prev.timeRound
        };
      }
    });
  }

  
  function startTimer() {
    if (intervalRef.current) {
      return; 
    }

    setTimerState((prev) => ({
      ...prev,
      buttonActive: {
        buttonInit: true,
        buttonRestart: false,
        buttonStop: false
      }
    }));

    intervalRef.current = setInterval(() => {
      setTimerState((prev) => {
        if (prev.roundsRemaining <= 0) {
          return prev;
        }

        const newTime = prev.currentTime - 1;
        if (newTime < 0) {
          switchPhase();
          return prev;
        }
        return {
          ...prev,
          currentTime: newTime
        };
      });
    }, 1000);
  }

  function stopTimer() {
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
  }

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimerState((prev) => ({
      ...prev,
      timeRound: timerProps.timeRound,
      timeBreaks: timerProps.timeBreaks,
      numberRounds: timerProps.numberRounds,
      isBreak: false,
      roundsRemaining: timerProps.numberRounds,
      currentTime: timerProps.timeRound,
      buttonActive: {
        buttonInit: false,
        buttonRestart: true,
        buttonStop: true
      }
    }));
  }, [timerProps]);

  return {
    startTimer,
    stopTimer,
    resetTimer,
    timerState,
    toHms
  };
}
