import { useState, useEffect, useRef } from 'react';
import './App.css';
import TimerContainer from './componets/TimerContainer';

function App() {
  const [timer, setTimer] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTimer(prev => prev + 1); 
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <h1>Reloj</h1>
      <TimerContainer/>
    </>
  );
}

export default App;
