import React, { useContext, useState, useRef, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { timerContext } from "../App";

const Timer = () => {
    const settingsInfo = useContext(timerContext)
    

    const [mode,setMode] = useState('work')
    const [isPaused,setIsPaused] = useState(true)
    const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes*60);
    const [isFirstCycle,setIsFirstCycle] = useState(true)
    
    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    let totalSwitch = settingsInfo.cycle*2 -1

    const tick = () => {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
      }
    
    const switchMode = () => {
        if(totalSwitch>0){
          const nextMode = modeRef.current === 'work' ? 'break' : 'work';
          const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
      
          setMode(nextMode);
          modeRef.current = nextMode;
      
          setSecondsLeft(nextSeconds);
          secondsLeftRef.current = nextSeconds;
          totalSwitch = totalSwitch-1
         }
      }

    const startTimer = () => {
        const interval = setInterval(() => {
          if (isPausedRef.current) return
          if (secondsLeftRef.current === 0) {
            return switchMode();
          }
    
          tick();
        },1000);
    
    return () => clearInterval(interval)
    }

    const handlePlay = () => {
        
        if(isFirstCycle){
            secondsLeftRef.current = settingsInfo.workMinutes * 60;
            setSecondsLeft(secondsLeftRef.current);
            startTimer()
            setIsFirstCycle(false)
        }
        setIsPaused(false)
        isPausedRef.current = false
    }




    const totalSeconds = mode === 'work'? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);
  
    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10){
        seconds = '0'+seconds;
    } 

    return(
        <div className=" flex flex-col justify-center items-center w-full max-w-xs text-center " >
            <div className="w-full text-center" >
                <CircularProgressbar 
                    className="text-center"
                    value={percentage}
                    text={minutes + ':' + seconds}
                    styles={buildStyles({
                        textColor:'#fff',
                        pathColor:mode === 'work' ? '#f54e4e' : '#4aec8c',
                        tailColor:'rgba(255,255,255,.2)',
                        
                    })}/>
            
            </div>
            <div className="BUTTONS flex items-center mt-4 gap-16" >
                <div  >

                    {
                        isPaused ? <button className=" bg-transparent   cursor-pointer flex items-center w-auto rounded-xl py-2 px-5 text-xl" onClick={handlePlay} >
                                <svg className=' w-20 ' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </button> : 

                            <button className=" bg-transparent   cursor-pointer flex items-center w-auto rounded-xl py-2 px-5 text-xl" onClick={() => {setIsPaused(true); isPausedRef.current = true}}>
                            <svg className=' w-20 ' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    }
                

            
            
                </div>
                <div>
                    <button onClick={() => settingsInfo.setShowSettings(true)} className="bg-transparent flex items-center w-auto rounded-xl py-2 px-5 text-xl " >
                        <svg className='w-20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                
                        
                    </button>
                </div>
            </div>
        
        </div>
    )
}

export default Timer