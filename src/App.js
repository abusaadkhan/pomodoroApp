import logo from './logo.svg';
import './App.css';
import { createContext, useContext,useState } from 'react';
import Timer from './component/Timer';
import Settings from './component/Settings';

export  const timerContext = createContext()
   

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [cycle,setCycle] = useState(2)

  return (
    <div className='bg-[#30384b] text-white  text-center flex flex-col justify-center items-center w-full  h-screen' >
      <timerContext.Provider value={{
        showSettings,
        workMinutes,
        breakMinutes,
        cycle,
        setShowSettings,
        setCycle,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </timerContext.Provider>
    
    </div>
  );
}

export default App;
