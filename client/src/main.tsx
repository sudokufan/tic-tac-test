import React, { useMemo, useState } from "react";
import { XorO, Conclusion } from "./types";
import { buildWinningLines } from "./helpers/buildWinningLines";

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [turn, setTurn] = useState<XorO>("X");
  const [conclusion, setConclusion] = useState<Conclusion>(undefined);

  const boardSize = board.length;

  const winningLines = useMemo(() => buildWinningLines(boardSize), [boardSize]);

  const checkForWinner = (
    currentBoard: (XorO | undefined)[][],
  ): XorO | undefined => {
    for (const line of winningLines) {
      const [firstRow, firstCol] = line[0];
      const firstSymbol = currentBoard[firstRow][firstCol];
      if (!firstSymbol) continue;
      const isWinner = line
        .slice(1)
        .every(([row, column]) => currentBoard[row][column] === firstSymbol);

      if (isWinner) return firstSymbol;
    }
    return undefined;
  };

  const checkForDraw = (currentBoard: (XorO | undefined)[][]): boolean => {
    const flattened = currentBoard.flat();
    const fullBoard = flattened.every((cell) => cell !== undefined);
    return fullBoard;
  };

  const handleClick = (cellRow: number, cellCol: number) => {
    const updatedBoard = board.map((row, rowIndex) =>
      row.map((cellValue, colIndex) =>
        rowIndex === cellRow && colIndex === cellCol ? turn : cellValue,
      ),
    );
    setBoard(updatedBoard);

    const isWinner = checkForWinner(updatedBoard);
    if (isWinner) {
      setConclusion(isWinner);
      return;
    }

    if (checkForDraw(updatedBoard)) {
      setConclusion("Draw");
      return;
    }

    setTurn(turn === "X" ? "O" : "X");
  };

  return (
    <div className="bg-green flex h-screen flex-col items-center gap-10 pt-10 text-white">
      <h1 className="font-spruce text-2xl font-bold">Tic Tac Toe</h1>
      <div className="flex w-2/5 max-w-screen-sm flex-col gap-1 sm:gap-2 md:gap-3">
        {board.map((row, rowIndex) => (
          <div className="flex w-full gap-1 sm:gap-2 md:gap-3">
            {row.map((cell, cellIndex) => {
              return (
                <div
                  onClick={
                    !cell && !conclusion
                      ? () => handleClick(rowIndex, cellIndex)
                      : undefined
                  }
                  className={`${!cell && "hover:bg-green-hover cursor-pointer"} ${cell === "X" ? "text-green-light" : "text-green-mid"} flex aspect-square flex-1 items-center justify-center border-2 border-gray-400 text-3xl font-bold md:text-5xl lg:text-8xl`}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
