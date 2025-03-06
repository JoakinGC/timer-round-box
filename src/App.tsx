import { useState } from 'react';
import './App.css';
import FormTimer from './componets/FormTimer';
import TimerContainer from './componets/TimerContainer';
import { FormTimerProps } from './types/Timer';

function App() {
  const [timerProps,SetTimerProps] = useState<FormTimerProps>({
    numberRounds:0,
    timeBreaks:0,
    timeRound:0
  })
  console.log(timerProps);
  
  return (
    <>
      <h1>Reloj</h1>
      
      <TimerContainer
      />
      <FormTimer
        SetTimerProps={SetTimerProps}
        propsTimer={timerProps}
      />
    </>
  );
}

export default App;
