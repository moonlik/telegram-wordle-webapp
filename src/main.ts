import './style.css';
import { WordService, createGameField, setLetter, showMessage, flipTiles, RusWordArrayService } from './functions';

/**
 * Game start
 *
 * @param length Secret word length
 * @param attempts Number of attempts
 * @param wordService Word provider
 */
const start = ({length, attempts, wordService}: {
  length: number,
  attempts: number,
  wordService: WordService
}) => {
  const tileContainer = document.querySelector('.tile-container');
  const messageContainer = document.querySelector('.message-container');
  const wordle: string = wordService.getWord(length).toUpperCase();
  const gameMatrix: string[][] = Array.from(Array(attempts), () => new Array(length).fill(''));

  let currentRow: number = 0;
  let currentCol: number = 0;
  let isGameOver: boolean = false;

  createGameField(gameMatrix, tileContainer);

  console.log(wordle)

  window.addEventListener('keydown', (e) => handleClick(e.key.toUpperCase()))

  const handleClick = async (key: string) => {
    console.log(key)

    switch (true) {
      case (/^[а-я]$/gi).test(key): {
        if (currentRow > attempts && currentCol >= length-1) {
          return;
        }

        setLetter(gameMatrix, currentRow, currentCol, key);

        currentCol++;
        break;
      }

      case key === 'BACKSPACE': {
        if (currentCol === 0) {
          return;
        }

        currentCol--;

        setLetter(gameMatrix, currentRow, currentCol, '');
        break;
      }

      case key === 'ENTER': {
        if (currentCol <= 4) {
          return;
        }

        if (RusWordArrayService.checkWord(gameMatrix[currentRow].join('').toLowerCase()) === false) {
          showMessage(messageContainer, 'Word not in the list. Input exsiting word');
          return;
        }

        await flipTiles(currentRow, wordle);

        if (gameMatrix[currentRow].join('') === wordle) {
          showMessage(messageContainer, 'Magnificent!');
          isGameOver = true;
        } else if (currentRow >= attempts) {
          showMessage(messageContainer, 'Game Over');
          isGameOver = true;
        } else {
          currentRow++;
          currentCol = 0;
        }
        break;
      }
    }
  }
};

start({
  length: 5,
  attempts: 5,
  wordService: RusWordArrayService,
});
