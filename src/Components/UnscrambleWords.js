import React, { useState, useEffect } from 'react';
import data from './data.json'; // Import your data.json file

function UnscrambleWords() {
  const [input, setInput] = useState('');
  const [foundWords, setFoundWords] = useState({});

  useEffect(() => {
    // Implement your logic to find words when 'input' or 'data' changes
    findWords();
  }, [input, data]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const findWords = () => {
    // Filter words from the 'data' that can be formed using the 'input' letters
    const inputLetters = input.toLowerCase().split('');
    const validWords = Object.keys(data).filter((word) => {
      const wordLetters = word.toLowerCase().split('');
      return canFormWord(wordLetters, inputLetters);
    });

    // Group words by their lengths
    const wordsByLength = validWords.reduce((result, word) => {
      const length = word.length;
      if (!result[length]) {
        result[length] = [];
      }
      result[length].push(word);
      return result;
    }, {});

    setFoundWords(wordsByLength);
  };

  // Function to check if a word can be formed from the given letters
// Function to check if a word can be formed from the given letters
const canFormWord = (wordLetters, inputLetters) => {
  const lowercaseInputLetters = inputLetters.map((letter) => letter.toLowerCase());
  const lowercaseWordLetters = wordLetters.map((letter) => letter.toLowerCase());

  const letterCounts = {};
  for (const letter of lowercaseInputLetters) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  for (const letter of lowercaseWordLetters) {
    if (!letterCounts[letter]) {
      return false;
    }
    letterCounts[letter]--;
  }

  return true;
};


  return (
    <div>
      <h1>Word Finder</h1>
      <label>
        Enter a string of letters:
        <input type="text" value={input} onChange={handleInputChange} />
      </label>
      <h2>Found Words:</h2>
      {Object.keys(foundWords).map((length) => (
        <div key={length}>
          {length} letter words:
          <ul>
            {foundWords[length].map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default UnscrambleWords;
