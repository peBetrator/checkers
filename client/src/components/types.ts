export type CheckboardPropTypes = {
  selectedPiece: string | null;
  select: (name: string | null) => void;
};

export type CheckerPropTypes = CheckboardPropTypes & {
  row: number;
  col: number;
  value: 0 | 1 | 2;
};
