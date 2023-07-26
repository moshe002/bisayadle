//import React from "react";

// interface PlayAgainProps {
//   setHowToPlay: React.Dispatch<React.SetStateAction<boolean>>;
// }

function PlayAgain () { //{setHowToPlay}:PlayAgainProps
  return (
    <>
        <button 
            type='button' 
            onClick={() => {
              window.location.reload();
              //setHowToPlay(false);
            }}
            className="p-2 text-lg bg-green-400 rounded-md text-white font-semibold opacity-75 focus:outline-green-600 hover:opacity-100 duration-150" 
            >    
            DUWA BALIK
        </button>
    </>
  )
}

export default PlayAgain