import { useState, useRef } from "react";
import RowInput from "./components/RowInput";
import Creator from "./components/Creator";
import HowToPlay from "./components/HowToPlay";
import bisayaWords from "./bisayaWords.json";
import WIN from './assets/audio/daug.mp3';
import WRONG from './assets/audio/getWrong.mp3';
import LOSE from './assets/audio/pildi.mp3';

// gets one word from the JSON file which will be our word
const BISAYA_WORDS:string[] = bisayaWords;
const wordIndex:number = Math.floor(Math.random() * BISAYA_WORDS.length); // generate random value for getting random word

const MAIN_WORD:string = BISAYA_WORDS[wordIndex];

const clue = MAIN_WORD[Math.floor(Math.random() * MAIN_WORD.length)].split('');

function App() {
  const rowsAndInputs = [
    [1, 2, 3, 4, 5], 
    [6, 7, 8, 9, 10], 
    [11, 12, 13, 14, 15], 
    [16, 17, 18, 19, 20], 
    [21, 22, 23, 24, 25]
  ];

  // display how to play
  const [howToPlay, setHowToPlay] = useState<boolean>(true); // set to true 
  // play audio on win or lose
  const [winOrLose, setWinOrLose] = useState<{ win: boolean, lose: boolean, wrong: boolean }>({ 
    win: false, 
    lose: false,
    wrong: false,
  });

  const wrongRef = useRef<HTMLAudioElement | null>(null);
  const winRef = useRef<HTMLAudioElement | null>(null);
  const loseRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-5 p-3">
        <h1 className="text-4xl font-bold">BISAYADLE</h1>
        <p className="text-blue-500 text-lg">Clue: naay letter <b className="text-black capitalize">{`${clue}`}</b> sa word</p>
          <RowInput 
            mainWord={MAIN_WORD}
            rowsAndInputs={rowsAndInputs}
            winOrLose={winOrLose}
            setWinOrLose={setWinOrLose}
            audioRef={{ win: winRef, wrong: wrongRef, lose: loseRef }} />
          {
            winOrLose.wrong &&
            <audio ref={wrongRef}>
              <source src={WRONG} type="audio/mpeg" />
            </audio>
          }
          {
            winOrLose.win &&
            <audio ref={winRef}>
              <source src={WIN} type="audio/mpeg" />
            </audio>
          }
          {
            winOrLose.lose &&
            <audio ref={loseRef}>
              <source src={LOSE} type="audio/mpeg" />
            </audio>
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
      { howToPlay && <HowToPlay setHowToPlay={setHowToPlay} /> }
    </div>
  )
}

export default App
