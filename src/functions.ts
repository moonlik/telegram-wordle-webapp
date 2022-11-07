export const createGameField = (
  rows: Array<Array<string>>,
  tileContainer: Element | null
): void => {
  rows.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');

    rowElement.setAttribute('id', `row-${rowIndex}`);

    row.forEach((_col, colIndex) => {
      const tileElement = document.createElement('div');

      tileElement.setAttribute('id', `row-${rowIndex}-col-${colIndex}`);

      tileElement.classList.add('tile');
      rowElement.append(tileElement);
    });

    tileContainer?.append(rowElement);
  });
}

export const setLetter = (gameMatrix: Array<Array<string>>, row: number, col: number, letter: string) => {
  const tile = document.getElementById(
    `row-${row}-col-${col}`
  );

  if (tile !== null) {
    tile.textContent = letter;
    tile.setAttribute('data', letter);
  }

  gameMatrix[row][col] = letter;
};

export const showMessage = (messageContainer: Element | null, message: string) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;

  messageContainer?.append(messageElement);

  setTimeout(() => {
    messageContainer?.removeChild(messageElement);
  }, 2000);
};

export const flipTiles = (row: number, wordle: string) => {
  const rowTiles = Array.from(document?.querySelector(`#row-${row}`)?.children as HTMLCollectionOf<HTMLElement>)

  const guess: { letter: string; color: string }[] = rowTiles.map((tile) => ({
    letter: tile.getAttribute('data') ?? '',
    color: 'grey-overlay',
  }));

  guess.forEach((guessItem, index) => {
    if (guessItem.letter === wordle[index]) {
      guessItem.color = 'green-overlay';
    } else if (wordle.includes(guessItem.letter)) {
      guessItem.color = 'yellow-overlay';
    }
  });

  return Promise.all(rowTiles.map((tile, index) => {
    return new Promise((resolve) =>
      setTimeout(() => {
          tile.classList.add('flip');
          tile.classList.add(guess[index].color);
          resolve(true);
        }, 500 * index))
    })
  );
};
