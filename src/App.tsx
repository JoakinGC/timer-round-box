import { useState } from 'react';
import './styles/App.css';
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
    <main>
      <article className='hero'>
        <h1 className='title--app'>Reloj</h1>
      </article>
      <TimerContainer
        timerProps={timerProps}
      />
      <section>
      <FormTimer
        SetTimerProps={SetTimerProps}
        propsTimer={timerProps}
      />
      </section>
    </main>
  );
}

export default App;
