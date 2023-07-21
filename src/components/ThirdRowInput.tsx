import React, { useEffect, useState } from "react";

interface ThirdRowProps {
  inputs: number[];
  thirdWordInput: string[];
  setThirdWordInput: React.Dispatch<React.SetStateAction<string[]>>;
  thirdInput: boolean;
  MAIN_WORD: string;
}

const ThirdRowInput:React.FC<ThirdRowProps> = ({ 
    inputs, 
    thirdWordInput, 
    setThirdWordInput, 
    thirdInput,
    MAIN_WORD
  }) => {
  
  const [emptyMessage, setEmptyMessage] = useState<string>('');

  useEffect(() => {
    checkEmptyFields();
  }, [thirdWordInput]);

  const checkEmptyFields = () => {
    const isEmpty = thirdWordInput.some(word => word === " " || word === undefined);
    if (isEmpty) {
      setEmptyMessage('Dili pwede walay sulod!');
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
            const isCorrect = MAIN_WORD_ARR[i] === thirdWordInput[i];
            const inputClassName = `${thirdInput ? 'opacity-40' : ''} 
            text-2xl text-center w-10 border-2 
            ${thirdInput ? 'border-gray-300' : 'border-gray-400'} 
            duration-150 rounded-md focus:border-green-400 outline-none capitalize 
            ${isCorrect ? 'bg-green-400' : ''}`;

            return (
              <input 
                className={inputClassName}
                type="text" 
                key={i}
                name={i.toString()} 
                id={i.toString()}
                title="letra diri" 
                maxLength={1}
                onChange={
                  (e) => {
                    let updatedWord = [...thirdWordInput];
                    updatedWord[i] = e.target.value;
                    setThirdWordInput(updatedWord);
                  }    
                }
                required 
                disabled={thirdInput} 
                />
            )
          })
        }
      </div>
      <p className="text-red-500">{emptyMessage}</p>
    </form>
  )
}

export default ThirdRowInput