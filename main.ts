import { _validator } from "./_validator";
import { Position } from "./Position";
import { Move, Side } from "./Move";
import { Board } from "./Board";

interface IPlayer {
  playTurn(board:Board):Move;
}

class AIPlayer implements IPlayer {
  playTurn(_board:Board) { return new Move(Side.X, new Position(0,0)); }
}

class RandomPlayer implements IPlayer {
  playTurn(_board:Board) { return new Move(Side.X, new Position(0,0)); }
}

class GameController {
  board:Board;
  player1:IPlayer;
  player2:IPlayer;


  constructor(board:Board, player1:IPlayer, player2:IPlayer) {
    this.board = board;
    this.player1 = player1;
    this.player2 = player2;
  }

  run():void {

  }
}

const game = new GameController(new Board(), new AIPlayer(), new RandomPlayer());
game.run();
