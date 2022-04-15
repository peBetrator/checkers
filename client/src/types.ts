import { Socket } from 'socket.io-client';

export type Color = 'red' | 'white';

type Board = (0 | 1 | 2)[][];

type Player = {
  socket: Socket;
  color: Color;
};

export type Game = {
  name: string;
  turn: Color;
  players: Player[];
  chat: unknown[];
  id: number;
  board: Board;
};
