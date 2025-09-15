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
        rowIndex === cellRow && colIndex === cellCol ? turn : cellValue
      )
    );
    setBoard(updatedBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  return (
    <div className="flex flex-col pt-10 items-center h-screen gap-10 bg-green text-white">
      <h1 className="font-bold font-spruce text-2xl">Tic Tac Toe</h1>
      <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 w-2/5 max-w-screen-sm">
        {board.map((row, rowIndex) => (
          <div className="flex gap-1 sm:gap-2 md:gap-3 w-full">
            {row.map((column, colIndex) => {
              return (
                <div
                  onClick={
                    !column ? () => handleClick(rowIndex, colIndex) : undefined
                  }
                  className={`${!column && "cursor-pointer hover:bg-green-light"} border-2 border-gray-400 flex-1 aspect-square items-center justify-center text-2xl font-bold flex
                  `}
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
