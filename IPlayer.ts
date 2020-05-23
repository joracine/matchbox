import { Board } from "./Board";
import { Position } from "./Position";
import { Side } from "./Move";

export interface IPlayer {
  playTurn(board:Board, side:Side):Position;
}
