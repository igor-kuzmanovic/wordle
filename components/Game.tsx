import { useState } from 'react';
import Link from 'next/link';
import { wordGuesslist, wordAllowlist } from '../lib/dictionary-5';
import Board from './Board';
import { TileStatus } from './Tile';
import Keyboard, { EmptyKey, SpecialKey } from './Keyboard';
import Alert from './Alert';

const wordLength = 5;
const numberOfTries = 6;
const guessWord =
  wordGuesslist[Math.floor(Math.random() * wordGuesslist.length)];

export default function Game() {
  const [gameState, setGameState] = useState({
    tiles: Array.from(Array(numberOfTries).keys()).map(() => {
      return Array.from(Array(wordLength).keys()).map(() => {
        return EmptyKey;
      });
    }),
    validity: Array.from(Array(numberOfTries).keys()).map(() => {
      return Array.from(Array(wordLength).keys()).map(() => {
        return TileStatus.None;
      });
    }),
    row: 0,
    tile: 0,
  });
  const [isInvalidWord, setIsInvalidWord] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [invalidKeys, setInvalidKeys] = useState(new Set<string>());
  const [partialKeys, setPartialKeys] = useState(new Set<string>());
  const [correctKeys, setCorrectKeys] = useState(new Set<string>());

  function pressKey(value: string) {
    if (isGameWon || isGameLost) {
      return gameState;
    }

    if (/^[a-z]$/.test(value)) {
      if (gameState.tile < wordLength) {
        gameState.tiles[gameState.row][gameState.tile] = value;
        gameState.tile++;
      }
    } else if (value === SpecialKey.Backspace) {
      if (gameState.tile > 0) {
        gameState.tile--;
        gameState.tiles[gameState.row][gameState.tile] = EmptyKey;
      }
    } else if (value === SpecialKey.Enter) {
      if (gameState.row < numberOfTries && gameState.tile === wordLength) {
        if (
          !wordGuesslist.includes(gameState.tiles[gameState.row].join('')) &&
          !wordAllowlist.includes(gameState.tiles[gameState.row].join(''))
        ) {
          setIsInvalidWord(true);
          return gameState;
        }

        const invalidKeysCopy = new Set<string>(invalidKeys);
        const partialKeysCopy = new Set<string>(partialKeys);
        const correctKeysCopy = new Set<string>(correctKeys);

        let guessWordCopy = guessWord;

        gameState.tiles[gameState.row].forEach((tile, tileIndex) => {
          if (guessWordCopy[tileIndex] === tile) {
            guessWordCopy = `${guessWordCopy.substring(
              0,
              tileIndex
            )}${' '}${guessWordCopy.substring(
              tileIndex + 1,
              guessWordCopy.length
            )}`;

            if (partialKeysCopy.has(tile)) {
              partialKeysCopy.delete(tile);
            }

            correctKeysCopy.add(tile);

            gameState.validity[gameState.row][tileIndex] = TileStatus.Correct;
          }
        });

        gameState.tiles[gameState.row].forEach((tile, tileIndex) => {
          if (
            gameState.validity[gameState.row][tileIndex] === TileStatus.None
          ) {
            if (guessWordCopy.includes(tile)) {
              guessWordCopy = guessWordCopy.replace(tile, ' ');

              if (!correctKeysCopy.has(tile)) {
                partialKeysCopy.add(tile);
              }

              gameState.validity[gameState.row][tileIndex] = TileStatus.Partial;
            } else {
              if (!correctKeysCopy.has(tile) && !partialKeysCopy.has(tile)) {
                invalidKeysCopy.add(tile);
              }

              gameState.validity[gameState.row][tileIndex] = TileStatus.Invalid;
            }
          }
        });

        setInvalidKeys(invalidKeysCopy);
        setPartialKeys(partialKeysCopy);
        setCorrectKeys(correctKeysCopy);

        if (gameState.tiles[gameState.row].join('') === guessWord) {
          setTimeout(() => {
            setIsGameWon(true);
          }, 1500);
        } else if (gameState.row === numberOfTries - 1) {
          setTimeout(() => {
            setIsGameLost(true);
          }, 500);
        }

        gameState.row++;
        gameState.tile = 0;
      }
    } else {
      return gameState;
    }

    setGameState({
      tiles: gameState.tiles.map((row) => {
        return row.map((tile) => {
          return tile;
        });
      }),
      validity: gameState.validity.map((row) => {
        return row.map((tile) => {
          return tile;
        });
      }),
      row: gameState.row,
      tile: gameState.tile,
    });
  }

  return (
    <main>
      <header>
        <h1>Wordle</h1>
      </header>
      <Board
        numberOfTries={numberOfTries}
        wordLength={wordLength}
        tiles={gameState.tiles}
        validity={gameState.validity}
        row={gameState.row}
        isInvalidWord={isInvalidWord}
        onBoardRowAnimateInvalid={() => setIsInvalidWord(false)}
      />
      <Keyboard
        invalidKeys={invalidKeys}
        partialKeys={partialKeys}
        correctKeys={correctKeys}
        onKey={pressKey}
      />
      <footer>
        <p>
          Play the original{' '}
          <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>
        </p>
      </footer>
      <Alert isShown={isGameWon}>
        <p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          Good job! <a href="/">Play again</a>
        </p>
      </Alert>
      <Alert isShown={isGameLost}>
        <p>
          The correct word was <strong>{guessWord}</strong>!{' '}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">Play again</a>
        </p>
      </Alert>
    </main>
  );
}
