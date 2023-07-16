import React, { useEffect, useState } from "react";

interface FourthRowProps {
  inputs: number[];
  fourthWordInput: string[];
  setFourthWordInput: React.Dispatch<React.SetStateAction<string[]>>;
  fourthInput: boolean;
  MAIN_WORD: string;
}

const FourthRowInput:React.FC<FourthRowProps> = ({ 
    inputs, 
    fourthWordInput, 
    setFourthWordInput, 
    fourthInput,
    MAIN_WORD
  }) => {

    const [emptyMessage, setEmptyMessage] = useState<string>('');

    useEffect(() => {
      checkEmptyFields();
    }, [fourthWordInput]);
  
    const checkEmptyFields = () => {
      const isEmpty = fourthWordInput.some(word => word === " " || word === undefined);
      if (isEmpty) {
        setEmptyMessage('Will not accept empty field/s!');
      } else {
        setEmptyMessage('');
      }
    };

  const MAIN_WORD_ARR = MAIN_WORD.split("");

  return (
    <form className="flex flex-col items-center">
      <div className="flex gap-3">
        {
          inputs.map(i => {
            const isCorrect = MAIN_WORD_ARR[i] === fourthWordInput[i];
            const inputClassName = `${fourthInput ? 'opacity-40' : ''} 
            text-2xl text-center w-10 border-2 
            ${fourthInput ? 'border-gray-300' : 'border-gray-400'} 
            duration-150 rounded-md focus:border-green-400 outline-none capitalize 
            ${isCorrect ? 'bg-green-400' : ''}`;

            return (
              <input 
                className={inputClassName}
                type="text" 
                key={i}
                name={i.toString()} 
                id={i.toString()}
                title="letter here" 
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
    </form>
  )
}

export default FourthRowInput