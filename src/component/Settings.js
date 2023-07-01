import ReactSlider from 'react-slider';

import { timerContext } from '../App';
import {useContext} from "react";



function Settings() {
  const settingsInfo = useContext(timerContext);
  return(
    <div className='text-left w-[40%] max-[480px]:w-[80%] flex flex-col items-start'>
      <label className='pb-4' >work: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className='h-10 w-full rounded-[20px] border-2 border-solid border-[#f54e4e]  '
        thumbClassName='bg-[#f54e4e] w-9 h-9 rounded-full border-none '
        trackClassName='border-none'
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={60}
      />
      <label className='pt-8 pb-4'>break: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className='h-10 w-full rounded-[20px] border-2 border-solid border-[#4aec8c]  '
        thumbClassName='bg-[#4aec8c] w-9 h-9 rounded-full border-none '
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={60}
      />
      <label className='pt-8 pb-4'>Cycle: {settingsInfo.cycle}</label>
      <ReactSlider
        className='h-10 w-full rounded-[20px] border-2 border-solid border-[#4a9eec]  '
        thumbClassName='bg-[#4a9eec] w-9 h-9 rounded-full border-none '
        trackClassName={'track'}
        value={settingsInfo.cycle}
        onChange={newValue => settingsInfo.setCycle(newValue)}
        min={1}
        max={100}
      />
      <div className='text-center mt-5 w-full flex justify-center  '>
       
        <button className='w-auto rounded-lg py-2 px-4 text-xl ' onClick={() => settingsInfo.setShowSettings(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className=" w-9 " viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
            Back
        </button>
      </div>

    </div>
  );
}

export default Settings;