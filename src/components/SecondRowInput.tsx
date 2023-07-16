import React, { useEffect, useState } from "react";

interface SecondRowProps {
  inputs: number[];
  secondWordInput:string[];
  setSecondWordInput:React.Dispatch<React.SetStateAction<string[]>>;
  secondInput:boolean;
  MAIN_WORD: string;
}

const SecondRowInput:React.FC<SecondRowProps> = ({ 
    inputs, 
    secondWordInput, 
    setSecondWordInput, 
    secondInput,
    MAIN_WORD
  }) => {
  
  const [emptyMessage, setEmptyMessage] = useState<string>('');

  useEffect(() => {
    checkEmptyFields();
  }, [secondWordInput]);

  const checkEmptyFields = () => {
    const isEmpty = secondWordInput.some(word => word === " " || word === undefined);
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
            const isCorrect = MAIN_WORD_ARR[i] === secondWordInput[i];
            const inputClassName = `${secondInput ? 'opacity-40' : ''} 
            text-2xl text-center w-10 border-2 
            ${secondInput ? 'border-gray-300' : 'border-gray-400'} 
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
                    let updatedWord = [...secondWordInput];
                    updatedWord[i] = e.target.value;
                    setSecondWordInput(updatedWord);
                  }    
                }
                required 
                disabled={secondInput} 
                />
            )
          })
        }
      </div>
      <p className="text-red-500">{emptyMessage}</p>
    </form>
  )
}

export default SecondRowInput