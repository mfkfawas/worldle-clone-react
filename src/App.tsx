import { KeyboardEvent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Line from './components/Line';

const API_URL = 'https://random-word-api.herokuapp.com/word?number=20&length=5';

function App() {
  const [solution, setSolution] = useState<string>('hello');
  const [guesses, setGuesses] = useState<(string | null)[]>(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(
    () => {
      const handleType = (event: any) => {
        if (isGameOver) {
          return;
        }

        const key = event.key;

        if (key === 'Enter') {
          if (currentGuess.length !== 5) {
            return;
          }

          const newGuesses = [...guesses];
          newGuesses[guesses.findIndex(val => val == null)] = currentGuess;
          setGuesses(newGuesses);
          setCurrentGuess('');

          const isCorrect = solution === currentGuess;
          if (isCorrect) {
            setIsGameOver(true);
          }
        }

        if (key === 'Backspace') {
          setCurrentGuess(currentGuess => currentGuess.slice(0, -1));
          return;
        }

        if (currentGuess.length >= 5) {
          return;
        }

        setCurrentGuess(previousGuess => previousGuess + event.key);
      };

      window.addEventListener('keydown', handleType);

      return () => window.removeEventListener('keydown', handleType);
    },
    [currentGuess, isGameOver, solution],
    guesses
  );

  // useEffect(() => {
  //   const fetchWord = async () => {
  //     const res = await fetch(API_URL);
  //     const words = await res.json();
  //     const word = words[Math.floor(Math.random() * words.length)];
  //     setSolution(word);
  //   };

  //   fetchWord();
  // }, []);

  return (
    <div className='board'>
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex(val => val == null);
        return (
          <Line
            key={i}
            guess={isCurrentGuess ? currentGuess : guess ?? ''}
            isFinal={!isCurrentGuess && guess !== null}
            solution={solution}
          />
        );
      })}
    </div>
  );
}

export default App;
