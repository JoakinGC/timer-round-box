import { useState } from 'react';
import './styles/App.css';
import FormTimer from './componets/Form/FormTimer';
import TimerContainer from './componets/Timer/TimerContainer';
import { FormTimerProps } from './types/Timer';
import logo from "./assets/logo.svg";

function App() {
  const [timerProps,SetTimerProps] = useState<FormTimerProps>({
    numberRounds:0,
    timeBreaks:0,
    timeRound:0
  })
  console.log(timerProps);
  
  return (
    <main>
      <article>
        <article className='hero'>
          <h1 className='title--app'>Reloj</h1>
          <img
            src={logo}
            className='logo reysom'      
          />
        </article>
      <TimerContainer
        timerProps={timerProps}
      />
      <FormTimer
        SetTimerProps={SetTimerProps}
        propsTimer={timerProps}
      />
      </article>
    </main>
  );
}

export default App;
