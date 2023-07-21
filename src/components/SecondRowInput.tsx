import React, { useEffect, useState } from "react";

interface SecondRowProps {
  inputs: number[];
  secondWordInput: string[];
  setSecondWordInput: React.Dispatch<React.SetStateAction<string[]>>;
  secondInput: boolean;
  secondBgColors: string[];
}

const SecondRowInput:React.FC<SecondRowProps> = ({ 
    inputs, 
    secondWordInput, 
    setSecondWordInput, 
    secondInput,
    secondBgColors
  }) => {
  
  const [emptyMessage, setEmptyMessage] = useState<string>('');

  useEffect(() => {
    checkEmptyFields();
  }, [secondWordInput]);

  const checkEmptyFields = () => {
    const isEmpty = secondWordInput.some(word => word === " " || word === undefined);
    if (isEmpty) {
      setEmptyMessage('Dili pwede walay sulod!');
    } else {
      setEmptyMessage('');
    }
  };

  return (
    <form className="flex flex-col items-center">
      <div className="flex gap-2">
        {
          inputs.map(i => {
            return (
              <input 
              className={`${secondInput ? 'opacity-40' : ''} 
              text-2xl text-center w-10 border-2 ${secondBgColors[i]}
              ${secondInput ? 'border-gray-300' : 'border-gray-400'} 
              duration-150 rounded-md focus:border-green-400 outline-none capitalize`}
                type="text" 
                key={i}
                name={i.toString()} 
                id={i.toString()}
                title="letra diri" 
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