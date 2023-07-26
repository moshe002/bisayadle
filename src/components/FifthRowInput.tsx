import React, { useEffect, useState } from "react";

interface FifthRowProps {
  inputs: number[];
  fifthWordInput: string[];
  setFifthWordInput: React.Dispatch<React.SetStateAction<string[]>>;
  fifthInput: boolean;
  fifthBgColors: string[];
}

const FifthRowInput:React.FC<FifthRowProps> = ({ 
    inputs, 
    fifthWordInput, 
    setFifthWordInput, 
    fifthInput,
    fifthBgColors
  }) => {
  
  const [emptyMessage, setEmptyMessage] = useState<string>('');

  useEffect(() => {
    checkEmptyFields();
  }, [fifthWordInput]);

  const checkEmptyFields = () => {
    const isEmpty = fifthWordInput.some(word => word === " " || word === undefined);
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
                className={`${fifthInput ? 'opacity-40' : ''} 
                text-2xl text-center w-10 border-2 ${fifthBgColors[i]}
                ${fifthInput ? 'border-gray-300' : 'border-gray-400'} 
                duration-150 rounded-md focus:border-green-400 outline-none capitalize`}
                type="text" 
                key={i}
                name={i.toString()} 
                id={i.toString()}
                title="letra diri" 
                maxLength={1}
                onChange={
                  (e) => {
                    let updatedWord = [...fifthWordInput];
                    updatedWord[i] = e.target.value;
                    setFifthWordInput(updatedWord);
                  }    
                }
                onKeyUp={handleNext}
                required 
                disabled={fifthInput} 
                />
            )
          })
        }
      </div>
      <p className="text-red-500">{emptyMessage}</p> 
    </div>
  )
}

export default FifthRowInput