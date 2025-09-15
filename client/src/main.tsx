import React, { useState } from "react";
import { XorO } from "./types";

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [turn, setTurn] = useState<XorO>("X");

  const buildWinningLines = (
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

  const handleClick = (cellRow: number, cellCol: number) => {
    const updatedBoard = board.map((row, rowIndex) =>
      row.map((cellValue, colIndex) =>
        rowIndex === cellRow && colIndex === cellCol ? turn : cellValue,
      ),
    );
    setBoard(updatedBoard);
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
                    !cell ? () => handleClick(rowIndex, cellIndex) : undefined
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
