import React, { useEffect, useState } from "react";

interface FifthRowProps {
  inputs: number[];
  fifthWordInput: string[];
  setFifthWordInput: React.Dispatch<React.SetStateAction<string[]>>;
  fifthInput: boolean;
  MAIN_WORD: string;
}

const FifthRowInput:React.FC<FifthRowProps> = ({ 
    inputs, 
    fifthWordInput, 
    setFifthWordInput, 
    fifthInput,
    MAIN_WORD
  }) => {
  
  const [emptyMessage, setEmptyMessage] = useState<string>('');

  useEffect(() => {
    checkEmptyFields();
  }, [fifthWordInput]);

  const checkEmptyFields = () => {
    const isEmpty = fifthWordInput.some(word => word === " " || word === undefined);
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
            const isCorrect = MAIN_WORD_ARR[i] === fifthWordInput[i];
            const inputClassName = `${fifthInput ? 'opacity-40' : ''} 
            text-2xl text-center w-10 border-2 
            ${fifthInput ? 'border-gray-300' : 'border-gray-400'} 
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
                    let updatedWord = [...fifthWordInput];
                    updatedWord[i] = e.target.value;
                    setFifthWordInput(updatedWord);
                  }    
                }
                required 
                disabled={fifthInput} 
                />
            )
          })
        }
      </div>
      <p className="text-red-500">{emptyMessage}</p> 
    </form>
  )
}

export default FifthRowInput