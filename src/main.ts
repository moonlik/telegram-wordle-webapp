import './style.css';
import { WordService, createGameField, setLetter, showMessage, flipTiles, YandexWordService } from './functions';

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
  const gameMatrix: Array<Array<string>> = Array.from(Array(attempts), () => new Array(length).fill(''));

  let currentRow: number = 0;
  let currentCol: number = 0;
  let isGameOver: boolean = false;

  createGameField(gameMatrix, tileContainer);

  window.addEventListener('keydown', (e) => handleClick(e.key.toUpperCase()))

  const handleClick = async (key: string) => {
    console.log(key)

    switch (true) {
      case key === 'BACKSPACE':
        if (currentCol === 0) {
          return;
        }

        currentCol--;

        setLetter(gameMatrix, currentRow, currentCol, '');
        break;

      case key === 'ENTER':
        if (currentCol <= 4) {
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

      case (/^\w{1}$/gi).test(key):
        if (currentRow > attempts && currentCol >= length-1) {
          return;
        }
        setLetter(gameMatrix, currentRow, currentCol, key);

        currentCol++;
        break;
    }
  };
}

start({
  length: 5,
  attempts: 5,
  wordService: YandexWordService,
});
