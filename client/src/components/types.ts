export type CheckboardPropTypes = {
  selectedPiece: string | null;
  movePiece: (i: number, j: number) => void;
  select: (name: string | null) => void;
};

export type CheckerPropTypes = Pick<
  CheckboardPropTypes,
  'selectedPiece' | 'select'
> & {
  row: number;
  col: number;
  value: 0 | 1 | 2;
};

export type MenuPropTypes = {
  createGame: () => void;
  joinGame: () => void;
};
