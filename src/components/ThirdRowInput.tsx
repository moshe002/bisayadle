import React, { useEffect, useState } from "react";

interface ThirdRowProps {
  inputs: number[];
  thirdWordInput: string[];
  setThirdWordInput: React.Dispatch<React.SetStateAction<string[]>>;
  thirdInput: boolean;
  thirdBgColors: string[];
}

const ThirdRowInput:React.FC<ThirdRowProps> = ({ 
    inputs, 
    thirdWordInput, 
    setThirdWordInput, 
    thirdInput,
    thirdBgColors
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

  const handleNext = (event: any) => { // (NEVER USE ANY AS ITS TYPE) as of now it is any because it throws errors, too lazy to fix it :(
    if (event.target.value.length === event.target.maxLength) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2">
        {
          inputs.map(i => {

            return (
              <input 
                className={`${thirdInput ? 'opacity-40' : ''} 
                text-2xl text-center w-10 border-2 ${thirdBgColors[i]}
                ${thirdInput ? 'border-gray-300' : 'border-gray-400'} 
                duration-150 rounded-md focus:border-green-400 outline-none capitalize`}
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
                onKeyUp={handleNext}
                disabled={thirdInput} 
                />
            )
          })
        }
      </div>
      <p className="text-red-500">{emptyMessage}</p>
    </div>
  )
}

export default ThirdRowInput