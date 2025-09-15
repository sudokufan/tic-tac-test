import React, { useMemo, useState } from "react";
import { XorO, Conclusion } from "./types";
import { buildWinningLines } from "./helpers/buildWinningLines";
import { createBoard } from "./helpers/createBoard";

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [turn, setTurn] = useState<XorO>("X");
  const [conclusion, setConclusion] = useState<Conclusion>(undefined);
  const [boardSize, setBoardSize] = useState<number>(3);

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
    <div className="bg-green font-spruce flex h-full flex-col items-center gap-10 pb-20 pt-10 text-white">
      <h1 className="text-2xl font-bold">Tic Tac Toe</h1>

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
                  className={`${!cell && !conclusion && "hover:bg-green-hover cursor-pointer"} ${
                    cell === "X" ? "text-green-light" : "text-green-mid"
                  } flex aspect-square min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden border-2 border-gray-400 font-bold leading-none`}
                  style={{
                    fontSize: `calc((min(40vw, 640px)) / ${boardSize} * 0.6)`,
                  }}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <label htmlFor="boardSize" className="text-lg">
          Board size
        </label>
        <select
          id="boardSize"
          value={boardSize}
          onChange={(e) => {
            const val = Number(e.target.value);
            setBoardSize(val);
            setBoard(createBoard(val));
            setTurn("X");
            setConclusion(undefined);
          }}
          className="rounded px-2 py-1 text-black"
        >
          {Array.from({ length: 13 }, (_, i) => i + 3).map((n) => (
            <option key={n} value={n}>
              {n} × {n}
            </option>
          ))}
        </select>
      </div>

      {conclusion && (
        <div className="flex flex-col gap-4">
          <div className="text-2xl">
            {conclusion === "Draw" ? "It’s a draw!" : `${conclusion} wins!`}
          </div>
          <button
            onClick={() => {
              setBoard(
                Array.from({ length: boardSize }, () =>
                  Array.from({ length: boardSize }, () => undefined),
                ),
              );
              setTurn("X");
              setConclusion(undefined);
            }}
            className="bg-green-light hover:bg-green-mid rounded px-3 py-1 text-black hover:text-white"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};
