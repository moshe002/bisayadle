import { useState, useEffect, useRef } from "react";

import FirstRowInput from "./components/FirstRowInput";
import SecondRowInput from "./components/SecondRowInput";
import ThirdRowInput from "./components/ThirdRowInput";
import FourthRowInput from "./components/FourthRowInput";
import FifthRowInput from "./components/FifthRowInput";
import CheckButton from "./components/CheckButton";
import WinnerModal from "./components/WinnerModal";
import Creator from "./components/Creator";
import HowToPlay from "./components/HowToPlay";
import PlayAgain from "./components/PlayAgain";

import bisayaWords from "./bisayaWords.json";

import WIN from './assets/audio/daug.mp3';
import WRONG from './assets/audio/getWrong.mp3';
import LOSE from './assets/audio/pildi.mp3';

// gets one word from the JSON file which will be our word
const BISAYA_WORDS:string[] = bisayaWords;
const wordIndex:number = Math.floor(Math.random() * BISAYA_WORDS.length); 

const MAIN_WORD:string = BISAYA_WORDS[wordIndex];
//console.log(MAIN_WORD);

const clue = MAIN_WORD[Math.floor(Math.random() * MAIN_WORD.length)].split('');

function App() {
  
  // basically maps 5 input fields
  const inputs:number[] = [0, 1, 2, 3, 4];
  // MAIN WORD: SABAK (for now)

  // the letters (word) being inputted each row 
  const [firstWordInput, setFirstWordInput] = useState<string[]>([]);
  const [secondWordInput, setSecondWordInput] = useState<string[]>([]);
  const [thirdWordInput, setThirdWordInput] = useState<string[]>([]);
  const [fourthWordInput, setFourthWordInput] = useState<string[]>([]);
  const [fifthWordInput, setFifthWordInput] = useState<string[]>([]);

  // display wrong word message feedback
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [wrongMessage, setWrongMessage] = useState<string>('');
  const [displayMessageAnyway, setDisplayMessageAnyway] = useState<string>('');

  // display winner message feedback
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // disable boolean input rows
  const [firstInput, setFirstInput] = useState<boolean>(false);
  const [secondInput, setSecondInput] = useState<boolean>(true);
  const [thirdInput, setThirdInput] = useState<boolean>(true);
  const [fourthInput, setFourthInput] = useState<boolean>(true);
  const [fifthInput, setFifthInput] = useState<boolean>(true);

  // display how to play
  const [howToPlay, setHowToPlay] = useState<boolean>(true); // change to true later

  // play again
  const [playAgain, setPlayAgain] = useState<boolean>(false);

  // set color
  const [firstBgColors, setFirstBgColors] = useState<string[]>(Array(inputs.length).fill(""));
  const [secondBgColors, setSecondBgColors] = useState<string[]>(Array(inputs.length).fill(""));
  const [thirdBgColors, setThirdBgColors] = useState<string[]>(Array(inputs.length).fill(""));
  const [fourthBgColors, setFourthBgColors] = useState<string[]>(Array(inputs.length).fill(""));
  const [fifthBgColors, setFifthBgColors] = useState<string[]>(Array(inputs.length).fill(""));

  // play audio on win or lose
  const [win, setWin] = useState<boolean>(false);
  const [lose, setLose] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null); // wrong answer
  const winRef = useRef<HTMLAudioElement | null>(null); // correct answer
  const lostRef = useRef<HTMLAudioElement | null>(null); // you lost

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isWrong) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isWrong]);

  useEffect(() => {
    const audioElement = winRef.current;
    if (audioElement) {
      if (win) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [win]);

  useEffect(() => {
    const audioElement = lostRef.current;
    if (audioElement) {
      if (lose) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [lose]);

  const checkWord = (inputWord:string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    const input:string[] = inputWord.split(""); 
    let arrMainWord:string[] = MAIN_WORD.split("");

    const updatedBgColors:string[] = input.map((letter, index) => {
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
    setState(updatedBgColors);
  }

  const handleSubmit = () => {
      let firstWord:string = firstWordInput.join('').toLowerCase();
      let secondWord:string = secondWordInput.join('').toLowerCase();
      let thirdWord:string = thirdWordInput.join('').toLowerCase();
      let fourthWord:string = fourthWordInput.join('').toLowerCase();
      let fifthWord:string = fifthWordInput.join('').toLowerCase();
      
      if(firstWordInput.length > 0 && secondWordInput.length == 0) {
        checkWord(firstWord, setFirstBgColors);
        if(firstWord === MAIN_WORD) {
          setIsCorrect(true);
          setWin(true);
          //console.log('CONGRATS YOU WIN')
          setPlayAgain(true);
          //console.log(firstWord)
        } else {
          setIsWrong(true)
          setWrongMessage('SAYOP');
          // makes the message go away
          setTimeout(() => {
            setIsWrong(false)
          }, 2000)
          //console.log('WRONG WORD')
          setFirstInput(true)
          setSecondInput(false)
          //console.log(firstWord)
        }
      } // end of firstWordInput
      if(secondWordInput.length > 0 && thirdWordInput.length == 0) {
        checkWord(secondWord, setSecondBgColors);
        if(secondWord === MAIN_WORD) {
          setIsCorrect(true);
          setWin(true);
          setPlayAgain(true);
          //console.log('CONGRATS YOU WIN')
          //console.log(secondWord)
        } else {
          setIsWrong(true)
          setWrongMessage('SAYOP');
          // makes the message go away
          setTimeout(() => {
            setIsWrong(false)
          }, 2000)
          //console.log('WRONG WORD')
          setFirstInput(true)
          setSecondInput(true)
          setThirdInput(false)
          //console.log(secondWord)
        }
      } // end of secondWordInput
      if(thirdWordInput.length > 0 && fourthWordInput.length == 0) {
        checkWord(thirdWord, setThirdBgColors);
        if(thirdWord === MAIN_WORD) {
          setIsCorrect(true);
          setWin(true);
          setPlayAgain(true);
          //console.log('CONGRATS YOU WIN')
          //console.log(thirdWord)
        } else {
          setIsWrong(true)
          setWrongMessage('SAYOP');
          // makes the message go away
          setTimeout(() => {
            setIsWrong(false)
          }, 2000)
          //console.log('WRONG WORD')
          setFirstInput(true)
          setSecondInput(true)
          setThirdInput(true)
          setFourthInput(false)
          //console.log(thirdWord)
        }
      } // end of thirdWordInput
      if(fourthWordInput.length > 0 && fifthWordInput.length == 0) {
        checkWord(fourthWord, setFourthBgColors);
        if(fourthWord === MAIN_WORD) {
          setIsCorrect(true);
          setWin(true);
          setPlayAgain(true);
          //console.log('CONGRATS YOU WIN')
          //console.log(fourthWord)
        } else {
          setIsWrong(true)
          setWrongMessage('SAYOP');
          // makes the message go away
          setTimeout(() => {
            setIsWrong(false)
          }, 2000)
          //console.log('WRONG WORD')
          setFirstInput(true)
          setSecondInput(true)
          setThirdInput(true)
          setFourthInput(true)
          setFifthInput(false)
          //console.log(fourthWord)
        }
      } // end of fourthWordInput
      if(fifthWordInput.length > 0 && fourthWordInput.length > 0) {
        checkWord(fifthWord, setFifthBgColors);
        if(fifthWord === MAIN_WORD) {
          setIsCorrect(true);
          setWin(true);
          setPlayAgain(true);
          //console.log('CONGRATS YOU WIN')
          //console.log(fifthWord)
        } else {
          setIsWrong(true)
          setTimeout(() => {
            setLose(true);
          }, 1000)
          setWrongMessage(`Sensya pero wala ka naka tag-an. Suwaya lang sunod.`);
          setDisplayMessageAnyway(`Ang word kay: ${MAIN_WORD.toUpperCase()}`)
          setPlayAgain(true);
          setFirstInput(true)
          setSecondInput(true)
          setThirdInput(true)
          setFourthInput(true)
          setFifthInput(false)
          //console.log(fifthWord)
        }
      } // end of fifthWordInput
  };  

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center gap-5 p-3">
        <h1 className="text-4xl font-bold">BISAYADLE</h1>
        <p className="text-blue-500 text-lg">Clue: naay letter <b className="text-black capitalize">{`${clue}`}</b> sa word</p>
          <section className="flex flex-col gap-2">

            <FirstRowInput 
              inputs={inputs} 
              firstWordInput={firstWordInput} 
              setFirstWordInput={setFirstWordInput} 
              firstInput={firstInput} 
              firstBgColors={firstBgColors} />

            <SecondRowInput 
              inputs={inputs} 
              secondWordInput={secondWordInput} 
              setSecondWordInput={setSecondWordInput} 
              secondInput={secondInput}
              secondBgColors={secondBgColors} />
              
            <ThirdRowInput 
              inputs={inputs} 
              thirdWordInput={thirdWordInput} 
              setThirdWordInput={setThirdWordInput}
              thirdInput={thirdInput}
              thirdBgColors={thirdBgColors} />

            <FourthRowInput 
              inputs={inputs} 
              fourthWordInput={fourthWordInput} 
              setFourthWordInput={setFourthWordInput} 
              fourthInput={fourthInput}
              fourthBgColors={fourthBgColors} />

            <FifthRowInput 
              inputs={inputs} 
              fifthWordInput={fifthWordInput} 
              setFifthWordInput={setFifthWordInput} 
              fifthInput={fifthInput}
              fifthBgColors={fifthBgColors} />

          </section>
          <CheckButton handleSubmit={handleSubmit} />
          {
            playAgain
            &&
            <PlayAgain /> // setHowToPlay={setHowToPlay} para ma close ang howToPlay everytime mo duwa sila balik 
          }
          {
            isWrong
            &&
            <audio ref={audioRef}>
              <source src={WRONG} type="audio/mpeg" />
            </audio>
          }
          {
            win
            &&
            <audio ref={winRef}>
              <source src={WIN} type="audio/mpeg" />
            </audio>
          }
          {
            lose
            &&
            <audio ref={lostRef}>
              <source src={LOSE} type="audio/mpeg" />
            </audio>
          }
          <p className={`${isWrong ? 'opacity-100' : 'opacity-0'} text-center text-2xl text-red-500 font-semibold duration-150`}>
            {wrongMessage}
          </p>
          <p className={`${isWrong ? 'opacity-100' : 'opacity-0'} text-center text-black duration-150`}>
            <b>
              {displayMessageAnyway}
            </b>
          </p>
          {
            isCorrect
            &&
            <WinnerModal setIsCorrect={setIsCorrect} />  
          }
        <div className="flex flex-col items-center">
          <button 
            onClick={() => setHowToPlay(true)}
            type="button"
            title="E-click ko para unsaon pagduwa" 
            className="text-sm text-blue-500 underline mb-2">
              Unsaon pagduwa
          </button>
          <Creator />
        </div>
      </div> 
      {
        howToPlay
        &&
        <HowToPlay setHowToPlay={setHowToPlay} />
      }
    </div>
  )
}

export default App
