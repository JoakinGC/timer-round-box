import { TimerProps } from "../types/Timer";

export function validateTime(
    { hours, minutes, seconds }: TimerProps,
    minSeconds: number,
    label: string,
    setErrMsg:any
  ): boolean {

    if (hours < 0 || hours > 3600) {
      console.error(`Las horas de ${label} deben ser 0..3600`);
      setErrMsg(`Las horas de ${label} deben ser 0..3600`)
      return false;
    }
    if (minutes < 0 || minutes > 59) {
      console.error(`Los minutos de ${label} deben ser 0..59`);
      setErrMsg(`Los minutos de ${label} deben ser 0..59`)
      return false;
    }
    if (seconds < 0 || seconds > 59) {
      console.error(`Los segundos de ${label} deben ser 0..59`);
      setErrMsg(`Los segundos de ${label} deben ser 0..59`)
      return false;
    }
  
    const totalSec = hours * 3600 + minutes * 60 + seconds;
    if (totalSec < minSeconds) {
      console.error(`El ${label} debe tener al menos ${minSeconds} segundo(s).`);
      setErrMsg(`El ${label} debe tener al menos ${minSeconds} segundo(s).`)
      return false;
    }
  
    return true;
  }
  