export const buildWinningLines = (
  boardSize: number,
): Array<Array<[number, number]>> => {
  const lines: Array<Array<[number, number]>> = [];

  // Horizontal rows
  for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
    const row: Array<[number, number]> = [];
    for (let colIndex = 0; colIndex < boardSize; colIndex++) {
      row.push([rowIndex, colIndex]);
    }
    lines.push(row);
  }

  // Vertical columns
  for (let colIndex = 0; colIndex < boardSize; colIndex++) {
    const col: Array<[number, number]> = [];
    for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
      col.push([rowIndex, colIndex]);
    }
    lines.push(col);
  }

  // Top-left → bottom-right diagonal
  const ltrDiagonal: Array<[number, number]> = [];
  for (let i = 0; i < boardSize; i++) {
    ltrDiagonal.push([i, i]);
  }
  lines.push(ltrDiagonal);

  // Top-right → bottom-left diagonal
  const rtlDiagonal: Array<[number, number]> = [];
  for (let i = 0; i < boardSize; i++) {
    rtlDiagonal.push([i, boardSize - 1 - i]);
  }
  lines.push(rtlDiagonal);

  return lines;
};
