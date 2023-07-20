/*

  how wordle works:
  - 5 tries
  - can input 5 letters 
  - if letter is present in main word then letter bg color
  will be green, if letter is present but in the wrong
  place, letter bg color will be yellow
  - if all letter == main word bg color will be green,
  meaning success

*/

import { useState } from "react";

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

// gets one word from the JSON file which will be our word
const BISAYA_WORDS:string[] = bisayaWords;
const wordIndex:number = Math.floor(Math.random() * BISAYA_WORDS.length); 

const MAIN_WORD:string = BISAYA_WORDS[wordIndex];
console.log(MAIN_WORD);

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
  const [howToPlay, setHowToPlay] = useState<boolean>(true);

  // play again
  const [playAgain, setPlayAgain] = useState<boolean>(false);

  const checkWord = (inputWord:string, MAIN_WORD:string) => {
    // checks input after submit
    const input:string[] = inputWord.split(""); 
    let arrMainWord:string[] = MAIN_WORD.split("");
    // console.log(`What i inputted: ${input}`)
    // console.log(`The main word: ${arrMainWord}`);
    for(let x = 0; x < input.length; x++){
      if(arrMainWord.includes(input[x])){
        // check if input letter is equal to mainWord letter and check if input letter and mainWord letter has the same location
        if(input[x] != arrMainWord[x]){
          // console.log(`letter ${input[x]} exists but not in the same place`)
          // letter exists but not in the same place
          // bg color should be yellowish (amber-600 or amber-500)
        } else if(input[x] == arrMainWord[x]) {
          // console.log(`letter ${input[x]} exists and same location`)
          // letter exists and in the same place
          // bg color should be green (green-400)
        }
      } else {
        // console.log(`letter ${input[x]} does not exist in mainWord`)
        // default color
      }
    }
  }

  const handleSubmit = () => {
      let firstWord:string = firstWordInput.join('');
      let secondWord:string = secondWordInput.join('');
      let thirdWord:string = thirdWordInput.join('');
      let fourthWord:string = fourthWordInput.join('');
      let fifthWord:string = fifthWordInput.join('');
      
      if(firstWordInput.length > 0 && secondWordInput.length == 0) {
        checkWord(firstWord, MAIN_WORD);
        if(firstWord === MAIN_WORD) {
          setIsCorrect(true);
          //console.log('CONGRATS YOU WIN')
          setPlayAgain(true);
          console.log(firstWord)
        } else {
          setIsWrong(true)
          setWrongMessage('WRONG WORD');
          // makes the message go away
          setTimeout(() => {
            setIsWrong(false)
          }, 2000)
          //console.log('WRONG WORD')
          setFirstInput(true)
          setSecondInput(false)
          console.log(firstWord)
        }
      } // end of firstWordInput
      if(secondWordInput.length > 0 && thirdWordInput.length == 0) {
        if(secondWord === MAIN_WORD) {
          setIsCorrect(true);
          setPlayAgain(true);
          //console.log('CONGRATS YOU WIN')
          console.log(secondWord)
        } else {
          setIsWrong(true)
          setWrongMessage('WRONG WORD');
          // makes the message go away
          setTimeout(() => {
            setIsWrong(false)
          }, 2000)
          //console.log('WRONG WORD')
          setFirstInput(true)
          setSecondInput(true)
          setThirdInput(false)
          console.log(secondWord)
        }
      } // end of secondWordInput
      if(thirdWordInput.length > 0 && fourthWordInput.length == 0) {
        if(thirdWord === MAIN_WORD) {
          setIsCorrect(true);
          setPlayAgain(true);
          //console.log('CONGRATS YOU WIN')
          console.log(thirdWord)
        } else {
          setIsWrong(true)
          setWrongMessage('WRONG WORD');
          // makes the message go away
          setTimeout(() => {
            setIsWrong(false)
          }, 2000)
          //console.log('WRONG WORD')
          setFirstInput(true)
          setSecondInput(true)
          setThirdInput(true)
          setFourthInput(false)
          console.log(thirdWord)
        }
      } // end of thirdWordInput
      if(fourthWordInput.length > 0 && fifthWordInput.length == 0) {
        if(fourthWord === MAIN_WORD) {
          setIsCorrect(true);
          setPlayAgain(true);
          //console.log('CONGRATS YOU WIN')
          console.log(fourthWord)
        } else {
          setIsWrong(true)
          setWrongMessage('WRONG WORD');
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
          console.log(fourthWord)
        }
      } // end of fourthWordInput
      if(fifthWordInput.length > 0 && fourthWordInput.length > 0) {
        if(fifthWord === MAIN_WORD) {
          setIsCorrect(true);
          setPlayAgain(true);
          //console.log('CONGRATS YOU WIN')
          console.log(fifthWord)
        } else {
          setIsWrong(true)
          setWrongMessage(`Sorry but you have not guessed the correct word. Try again next time.`);
          setDisplayMessageAnyway(`The word is: ${MAIN_WORD.toUpperCase()}`)
          setPlayAgain(true);
          // makes the message go away
          // setTimeout(() => {
          //   setIsWrong(false)
          // }, 4000)
          //console.log('WRONG WORD')
          setFirstInput(true)
          setSecondInput(true)
          setThirdInput(true)
          setFourthInput(true)
          setFifthInput(false)
          console.log(fifthWord)
        }
      } // end of fifthWordInput
  };  

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center gap-5 p-3">
        <h1 className="text-4xl font-bold">BISAYADLE</h1>
        <p className="text-blue-500 text-lg">Clue: naay letter <b className="text-black capitalize">{`${clue}`}</b> sa word</p>
          <section>
            <FirstRowInput 
              inputs={inputs} 
              firstWordInput={firstWordInput} 
              setFirstWordInput={setFirstWordInput} 
              firstInput={firstInput}
              MAIN_WORD={MAIN_WORD} />
              <br />
            <SecondRowInput 
              inputs={inputs} 
              secondWordInput={secondWordInput} 
              setSecondWordInput={setSecondWordInput} 
              secondInput={secondInput}
              MAIN_WORD={MAIN_WORD} />
              <br />
            <ThirdRowInput 
              inputs={inputs} 
              thirdWordInput={thirdWordInput} 
              setThirdWordInput={setThirdWordInput}
              thirdInput={thirdInput}
              MAIN_WORD={MAIN_WORD} />
              <br />
            <FourthRowInput 
              inputs={inputs} 
              fourthWordInput={fourthWordInput} 
              setFourthWordInput={setFourthWordInput} 
              fourthInput={fourthInput}
              MAIN_WORD={MAIN_WORD} />
              <br />
            <FifthRowInput 
              inputs={inputs} 
              fifthWordInput={fifthWordInput} 
              setFifthWordInput={setFifthWordInput} 
              fifthInput={fifthInput}
              MAIN_WORD={MAIN_WORD} />
          </section>
          <CheckButton handleSubmit={handleSubmit} />
          {
            playAgain
            &&
            <PlayAgain />
          }
          <p className={`${isWrong ? 'opacity-100' : 'opacity-0'} text-center text-red-500 font-semibold duration-150`}>
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
        <Creator />
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
