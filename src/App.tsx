import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const API_URL = 'https://random-word-api.herokuapp.com/word?number=20&length=5';

function App() {
  useEffect(() => {
    const fetchWord = async () => {
      const res = await fetch(API_URL);
      const words = await res.json();
      const word = words[Math.floor(Math.random() * words.length)];
      console.log(word);
    };

    fetchWord();
  }, []);

  return (
    <div className='App'>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
