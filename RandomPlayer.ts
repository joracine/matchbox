import { IPlayer } from "./IPlayer";
import { Position } from "./Position";
import { Board } from "./Board";
import { Side } from "./Move";

export class RandomPlayer implements IPlayer {
  playTurn(board:Board, _side:Side):Position {
    let freeSpots = board.getAllFree();
    return freeSpots[Math.floor(Math.random() * (freeSpots.length - 1))];
  }
}
