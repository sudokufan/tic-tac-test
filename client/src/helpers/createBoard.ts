import { XorO } from "../types";

export const createBoard = (size: number) =>
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => undefined as XorO | undefined),
  );
