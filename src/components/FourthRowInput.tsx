import React, { useEffect, useState } from "react";

interface FourthRowProps {
  inputs: number[];
  fourthWordInput: string[];
  setFourthWordInput: React.Dispatch<React.SetStateAction<string[]>>;
  fourthInput: boolean;
  fourthBgColors: string[];
}

const FourthRowInput:React.FC<FourthRowProps> = ({ 
    inputs, 
    fourthWordInput, 
    setFourthWordInput, 
    fourthInput,
    fourthBgColors
  }) => {

    const [emptyMessage, setEmptyMessage] = useState<string>('');

    useEffect(() => {
      checkEmptyFields();
    }, [fourthWordInput]);
  
    const checkEmptyFields = () => {
      const isEmpty = fourthWordInput.some(word => word === " " || word === undefined);
      if (isEmpty) {
        setEmptyMessage('Dili pwede walay sulod!');
      } else {
        setEmptyMessage('');
      }
    };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2">
        {
          inputs.map(i => {

            return (
              <input 
                className={`${fourthInput ? 'opacity-40' : ''} 
                text-2xl text-center w-10 border-2 ${fourthBgColors[i]}
                ${fourthInput ? 'border-gray-300' : 'border-gray-400'} 
                duration-150 rounded-md focus:border-green-400 outline-none capitalize`}
                type="text" 
                key={i}
                name={i.toString()} 
                id={i.toString()}
                title="letra diri" 
                maxLength={1}
                onChange={
                  (e) => {
                    let updatedWord = [...fourthWordInput];
                    updatedWord[i] = e.target.value;
                    setFourthWordInput(updatedWord);
                  }    
                }
                required 
                disabled={fourthInput} 
                />
            )
          })
        }
      </div>
      <p className="text-red-500">{emptyMessage}</p> 
    </div>
  )
}

export default FourthRowInput