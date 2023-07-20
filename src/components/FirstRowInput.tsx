import React, { useEffect, useState } from "react";

interface FirstRowProps {
  inputs: number[];
  firstWordInput: string[];
  setFirstWordInput: React.Dispatch<React.SetStateAction<string[]>>;
  firstInput: boolean;
  MAIN_WORD: string;
}

const FirstRowInput: React.FC<FirstRowProps> = ({ 
    inputs, 
    firstWordInput, 
    setFirstWordInput, 
    firstInput,
    MAIN_WORD
  }) => {
 
  const [emptyMessage, setEmptyMessage] = useState<string>('');
  
  useEffect(() => {
    checkEmptyFields();
  }, [firstWordInput]);

  const checkEmptyFields = () => {
    const isEmpty = firstWordInput.some(word => word === " " || word === undefined);
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
            const isCorrect = MAIN_WORD_ARR[i] === firstWordInput[i];
            //const inputClassName = ;
            
            return (
              <input 
                className={`${firstInput ? 'opacity-40' : ''} 
                text-2xl text-center w-10 border-2 
                ${firstInput ? 'border-gray-300' : 'border-gray-400'} 
                duration-150 rounded-md focus:border-green-400 outline-none capitalize 
                ${isCorrect ? 'bg-green-400' : ''}`}
                type="text" 
                key={i}
                name={i.toString()} 
                id={i.toString()}
                title="letter here" 
                maxLength={1}
                onChange={e => {
                    let updatedWord = [...firstWordInput];
                    updatedWord[i] = e.target.value;
                    setFirstWordInput(updatedWord);
                  }
                } 
                disabled={firstInput} 
                required
                />
            )
          })
        }
      </div>
      <p className="text-red-500">{emptyMessage}</p>
    </form>
  )
}

export default FirstRowInput