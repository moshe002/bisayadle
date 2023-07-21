import React from "react";

import Example1 from '../assets/example1.png'
import Example2 from '../assets/example2.png'
import Example3 from '../assets/example3.png'
import Example4 from '../assets/example4.png'

interface HowToPlaceProps {
    setHowToPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const HowToPlay: React.FC<HowToPlaceProps> = ({ 
    setHowToPlay 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-400 bg-opacity-20 backdrop-filter backdrop-blur-sm">
      <div className="flex flex-col border-2 border-gray-300 h-3/4 items-center rounded-lg p-7 opacity-100 text-center bg-white shadow-2xl overflow-y-auto">
          <h1 className='text-green-500 font-bold text-3xl underline'>UNSAON PAGDUWA:</h1>
          <img className='w-80' src={Example1} alt="example1" />
          <p>Kung color green kay sakto ang letra sakto sad ang placement sa letra.</p>
          <img className='w-80' src={Example2} alt="example2" />
          <p>Kung gray, sayop ang word, ang letra wala sa word.</p>
          <img className='w-80' src={Example4} alt="example4" />
          <p>Kung orange, ang letra naa sa word, sayop lang ang placement.</p>
          <img className='w-80' src={Example3} alt="example3" />
          <p>Green tanan, sakto tanan, daug ka.</p>
          <h1 className='text-2xl font-semibold my-5'>Good luck! 😊🤙</h1>
          <button 
            className='p-3 bg-green-400 text-white rounded-md font-semibold opacity-70 hover:opacity-100 duration-150' 
            type="button" 
            onClick={() => setHowToPlay(false)}
            >
                SIRADO
            </button>
      </div>
    </div>
  )
}

export default HowToPlay