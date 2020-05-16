import { _validator } from "./_validator";
import { Position } from "./Position";
import { Move } from "./Move";

export class Board {
  static const EMPTY_BOARD:string =
    "+-----+\n" +
    "|0|1|2|\n" +
    "+-+-+-+\n" +
    "|3|4|5|\n" +
    "+-+-+-+\n" +
    "|6|7|8|\n" +
    "+-----+\n";

  moves = new Array<Move>(9);
  board = Board.EMPTY_BOARD;

  static createFromMove(move:Move):Board {
    let board = new Board();
    board.addMove(move);
    return board;
  }

  static createFromMoves(moves:Move[]):Board {
    _validator._checkArraySize(0, 9, moves);
    let board = new Board();
    moves.map(move => _validator._checkTrue(board.addMove(move), `Failed to add move ${JSON.stringify(move)} position already filled.`));
    return board;
  }

  addMove(move:Move):boolean {
    if (typeof this.moves[move.position.address()] !== 'undefined')
      return false;
    this.moves[move.position.address()] = move;
    this.board = this.board.replace(move.position.address().toString(), move.side.toString()));
    return true;
  }

  show(showPos:boolean = true):void {
    if (showPos == true) {
      console.log(this.board);
    } else {
      console.log(this.board.replace(/[0-9]/gi, ' '));
    }
  }

  toString():string {
      return `Board(): ${JSON.stringify(this)}`;
  }
}
