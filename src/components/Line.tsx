import React from 'react';

interface LineProps {
  guess: string;
  isFinal: boolean;
  solution: string;
}
const WORD_LENGTH = 5;

const Line = ({ guess, isFinal, solution }: LineProps) => {
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let className = 'tile';

    if (isFinal) {
      className +=
        char === solution[i]
          ? ' correct'
          : solution.includes(char)
          ? ' close'
          : ' incorrect';
    }

    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }

  return <div className='line'>{tiles}</div>;
};

export default Line;
