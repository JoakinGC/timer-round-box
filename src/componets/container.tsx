import { useState } from "react";
import Reloj from "./reloj";
import { time } from "../types/time";


const ContainerReloj = () =>{

    const [tiempoParaCadaRound,setTiempoParaCadaRound] = useState<time|null>(null)
    const [tiempoParaCadaDescanso,setTiempoParaCadaDescanso] = useState<time|null>(null)
    const [numeroDedescansos,setNumeroDedescansos] = useState<time|null>(null)
    const [numeroDeRounds,setNumeroDeRounds] = useState<time|null>(null)
    const [tiempoTotal,setTiempoTotal] = useState<time|null>(null)

    return(<>
        <Reloj
            time={
             {
                tiempoPorRound:{
                    hours:0,
                    minutes:1,
                    seconds:59
                },
                tiempoDeDescanso:{
                    hours:0,
                    minutes:0,
                    seconds:30
                },
                descansos:[
                    {
                        estado:false,
                        tiempo:{
                            hours:0,
                            minutes:1,
                            seconds:59
                        }
                    },
                    {
                        estado:false,
                        tiempo:{
                            hours:0,
                            minutes:1,
                            seconds:59
                        }
                    }
                ],
                roudns:[
                    {
                        estado:false,
                        tiempo:{
                            hours:0,
                            minutes:1,
                            seconds:59
                        }
                    },
                    {
                        estado:false,
                        tiempo:{
                            hours:0,
                            minutes:1,
                            seconds:59
                        }
                    }
                ],
                tiempoTotal:{
                    hours:0,
                    minutes:10,
                    seconds:30
                }
             }   
            }
        />
    </>);
}


export default ContainerReloj