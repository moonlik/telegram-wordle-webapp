import './style.css';
import { createGameField, setLetter, showMessage, flipTiles } from './functions';

const tileContainer = document.querySelector('.tile-container');
const messageContainer = document.querySelector('.message-container');

let wordle: string = 'SUPER';

const gameMatrix = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

let currentRow: number = 0;
let currentCol: number = 0;
let isGameOver: boolean = false;

createGameField(gameMatrix, tileContainer);

window.addEventListener('keydown', (e) => handleClick(e.key.toUpperCase()))

const handleClick = async (key: string) => {
  console.log(key)

  switch (key) {
    case 'BACKSPACE':
      if (currentCol === 0) {
        return;
      }

      currentCol--;

      setLetter(gameMatrix, currentRow, currentCol, '');
      break;

    case 'ENTER':
      if (currentCol <= 4) {
        return;
      }

      await flipTiles(currentRow, wordle);

      if (gameMatrix[currentRow].join('') === wordle) {
        showMessage(messageContainer, 'Magnificent!');
        isGameOver = true;
      } else if (currentRow >= 5) {
        showMessage(messageContainer, 'Game Over');
        isGameOver = true;
      } else {
        currentRow++;
        currentCol = 0;
      }
      break;

    default:
      if (currentRow > 5 && currentCol >= 4) {
        return;
      }

      setLetter(gameMatrix, currentRow, currentCol, key);

      currentCol++;
      break;
  }
};
