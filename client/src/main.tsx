import React, { useState } from "react";
import { XorO } from "./types";

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);
  const [turn, setTurn] = useState<XorO>("X");

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
            {row.map((column, colIndex) => {
              return (
                <div
                  onClick={
                    !column ? () => handleClick(rowIndex, colIndex) : undefined
                  }
                  className={`${!column && "hover:bg-green-light cursor-pointer"} flex aspect-square flex-1 items-center justify-center border-2 border-gray-400 text-3xl font-bold md:text-5xl lg:text-8xl`}
                >
                  {column}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
