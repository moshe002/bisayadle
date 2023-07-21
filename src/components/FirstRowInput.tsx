import React, { useEffect, useState } from "react";

interface FirstRowProps {
  inputs: number[];
  firstWordInput: string[];
  setFirstWordInput: React.Dispatch<React.SetStateAction<string[]>>;
  firstInput: boolean;
  firstBgColors: string[];
}

const FirstRowInput: React.FC<FirstRowProps> = ({ 
    inputs, 
    firstWordInput, 
    setFirstWordInput, 
    firstInput,
    firstBgColors
  }) => {
 
  const [emptyMessage, setEmptyMessage] = useState<string>('');
  
  useEffect(() => {
    checkEmptyFields();
  }, [firstWordInput]);

  const checkEmptyFields = () => {
    const isEmpty = firstWordInput.some(word => word === " " || word === undefined);
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
                className={`${firstInput ? 'opacity-40' : ''} 
                text-2xl text-center w-10 border-2 ${firstBgColors[i]}
                ${firstInput ? 'border-gray-300' : 'border-gray-400'} 
                duration-150 rounded-md focus:border-green-400 outline-none capitalize`}
                type="text" 
                key={i}
                name={i.toString()} 
                id={i.toString()}
                title="letra diri" 
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