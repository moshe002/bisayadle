import React from "react";

import Example1 from '../assets/example1.png'
import Example2 from '../assets/example2.png'
import Example3 from '../assets/example3.png'

interface HowToPlaceProps {
    setHowToPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const HowToPlay: React.FC<HowToPlaceProps> = ({ 
    setHowToPlay 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-400 bg-opacity-20 backdrop-filter backdrop-blur-sm">
      <div className="flex flex-col items-center rounded-lg p-7 opacity-100 text-center bg-white shadow-2xl">
          <h1 className='text-green-500 font-bold text-3xl underline'>HOW TO PLAY:</h1>
          <img className='w-80' src={Example1} alt="example1" />
          <p>The green colored letter/s means the letter/s are on the correct place/s.</p>
          <img className='w-80' src={Example2} alt="example2" />
          <p>This means no letters are correct and an incorrect word.</p>
          <img className='w-80' src={Example3} alt="example3" />
          <p>Correct placement of letters, correct word, you win.</p>
          <h1 className='text-2xl font-semibold my-5'>Good luck! 😊🤙</h1>
          <button 
            className='p-3 bg-green-400 text-white rounded-md font-semibold opacity-70 hover:opacity-100 duration-150' 
            type="button" 
            onClick={() => setHowToPlay(false)}
            >
                CLOSE
            </button>
      </div>
    </div>
  )
}

export default HowToPlay