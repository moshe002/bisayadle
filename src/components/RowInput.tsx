import { useState, useEffect, useRef } from 'react';
import CheckButton from './CheckButton';
import PlayAgain from './PlayAgain';

type RowInputType = {
  mainWord: string,
  rowsAndInputs: number[][],
  setWinOrLose: React.Dispatch<React.SetStateAction<{
    win: boolean;
    lose: boolean;
    wrong: boolean;
  }>>,
  audioRef: {
    win: React.MutableRefObject<HTMLAudioElement | null>,
    wrong: React.MutableRefObject<HTMLAudioElement | null>,
    lose: React.MutableRefObject<HTMLAudioElement | null>,
  },
  winOrLose: { win: boolean; lose: boolean; wrong: boolean },
};

function RowInput({ 
  mainWord, 
  rowsAndInputs,
  setWinOrLose,
  audioRef, 
  winOrLose } : RowInputType) {

  const [inputtedWord, setInputtedWord] = useState<string[]>([]);
  const [nextIndex, setNextIndex] = useState<number>(0);
  const [inputBgColor, setInputBgColor] = useState<string[][]>(
    Array(rowsAndInputs.length).fill(Array(rowsAndInputs.length).fill(''))
  );

  const checkButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    checkEmptyFields();
  }, [inputtedWord]);

  useEffect(() => {
    if (winOrLose.win && audioRef.win.current) {
      audioRef.win.current.play();
    } else if(winOrLose.wrong && audioRef.wrong.current) {
      audioRef.wrong.current.play();
    } else if(winOrLose.lose && audioRef.lose.current){
      audioRef.lose.current.play();
    }
  }, [winOrLose.win, winOrLose.wrong, winOrLose.lose, audioRef]);

  useEffect(() => {
    if(nextIndex === 5) {
      setWinOrLose({ win: false, lose: true, wrong: false });
      if(checkButtonRef.current) { checkButtonRef.current.disabled = true; }
    }
  }, [nextIndex])

  const handleSubmit = () => {
    const wordToCheck = inputtedWord.join(''); 
    if(wordToCheck === mainWord){
      setWinOrLose({ win: true, lose: false, wrong: false });
    } else {
      setNextIndex((prevIndex) => prevIndex + 1);
      setWinOrLose({ win: false, lose: false, wrong: true });
    }
    bgColorOfInput();
    setInputtedWord([]);
  };  

  const checkEmptyFields = () => {
    try {
      const isEmpty = rowsAndInputs[nextIndex].some(inputIndex => {
        const inputWord = inputtedWord[inputIndex];
        return inputWord === " " || inputWord === undefined;
      });
      if (isEmpty) {
        if(checkButtonRef.current) { checkButtonRef.current.disabled = true; }
        return 'Dili pwede walay sulod!';
      } else {
        if(checkButtonRef.current) { checkButtonRef.current.disabled = false; }
        return '';
      }
    } catch(error) {
      console.error('ERROR AHAHAHAHA: ', error);
    }
  };

  const handleNextInput = (event: any) => { // (NEVER USE ANY AS ITS TYPE) as of now it is any because it throws errors, too lazy to fix it :(
    if (event.target.value.length === event.target.maxLength) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleDisabledInput = (index:number) => index !== nextIndex;

  const bgColorOfInput = () => {    
    const input: string[] = inputtedWord.join('').split('');
    const arrMainWord: string[] = mainWord.split('');

    const updatedBgColors: string[] = input.map((letter, index) => { // returns an array of bg colors (string)
      if (arrMainWord.includes(letter)) {
        if (letter !== arrMainWord[index]) {
          return "bg-amber-500"; // letter exists but not in the same location
        } else {
          return "bg-green-400"; // letter exists and in the same location
        }
      } else {
        return "bg-gray-400"; // letter does not exist in the main word (default color)
      }
    });

    setInputBgColor(prevColors => {
      const updatedColors = [...prevColors];
      updatedColors[nextIndex] = updatedBgColors; // Update colors for the current row
      return updatedColors;
    });
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>, inputIndex:number) => {
    setInputtedWord(prevWord => {
      const updatedWord = [...prevWord];
      updatedWord[inputIndex] = e.target.value;
      return updatedWord;
    });
  };

  return (
    <div className='flex flex-col items-center'>
      {
        rowsAndInputs.map((row, rowIndex) => {
          return (
            // the rows (container of the inputs)
            <div className='flex gap-2 pb-3' key={rowIndex}>
              {
                // the inputs (user to input letters)
                row.map((inputIndex, index) => {
                  return(
                    <input
                      className={`${inputBgColor[rowIndex][index]} ${handleDisabledInput(rowIndex) ? 'opacity-40' : ''} 
                      ${handleDisabledInput(inputIndex) ? 'border-gray-300' : 'border-gray-400'} 
                      text-2xl text-center w-10 border-2 border-gray-400 duration-150 rounded-md 
                      focus:border-green-400 outline-none capitalize`}
                      maxLength={1}
                      onChange={e => handleInputChange(e, inputIndex)}
                      disabled={handleDisabledInput(rowIndex)}
                      onKeyUp={handleNextInput}
                      key={inputIndex}
                      title={'input: ' + inputIndex}
                      type="text"
                      required 
                    />
                  )
                })
              }
            </div>
          )
        })
      }
      {
        checkEmptyFields() === '' || winOrLose.win ?
        <p className='m-5'></p> : winOrLose.lose ? 
        (
          <>
            <p className="text-lg text-red-500 font-semibold">PILDI KA!</p>
            <p className="text-lg text-blue-500 mb-3">Ang sakto nga pulong kay:
              <span className='text-lg text-black font-bold'>{' ' + mainWord.toUpperCase()}</span>
            </p>
          </> 
        )
        : 
        <p className="text-lg text-red-500 mb-3">{checkEmptyFields()}</p>
      }
      { winOrLose.win && <p className="text-2xl text-green-500 font-bold mb-3">DAUG KA! CONGRATS! &#129395; &#127881;</p> }
      {
        winOrLose.win || winOrLose.lose ?
        <PlayAgain />
        :
        <CheckButton 
          handleSubmit={handleSubmit} 
          checkButtonRef={checkButtonRef} 
        />
      }
    </div>
  )
}

export default RowInput