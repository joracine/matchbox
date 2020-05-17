import { _validator } from "./_validator";
import { Position } from "./Position";
import { Move, Side } from "./Move";

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

  /**
  * Adds a move to the board. Only adds the move if it's a valid move (i.e. not on top of a previous move).
  * @param  move the move to be added to the board.
  * @return      true = move was added, false = move was invalid and was not added.
  */
  addMove(move:Move):boolean {
    if (this.moves[move.position.address()] !== undefined)
      return false;
    this.moves[move.position.address()] = move;
    this.board = this.board.replace(move.position.address().toString(), move.side.toString()));
    return true;
  }

  /**
  * Check is the given position has already been useed by a previous move.
  * @param  position Position on the board to be checked.
  * @return          true = position is free, false = position is filled.
  */
  isFree(position:Position):boolean {
    return this.moves[position.address()] === undefined;
  }

  /**
   * Returns which side has played the given position.
   * @param  position Position on the board.
   * @return          X_SIDE = X played this position, O_SIDE = O played this position, null = this position is free.
   */
  getSide(position:Position):Side {
    let move = this.moves[position.address()];
    if (move === undefined)
      return null;
    return move.side;
  }

  /**
   * Returns all free spots on the board.
   * @return Array of positions which are free.
   */
  getAllFree():Position[] {
    let allSpots:number[] = Array.from({length: 9}, (value, index) => index);
    let usedSpots:number[] = [];
    this.moves.map((move, index) => { usedSpots.push(index); });
    let freeSpots = allSpots.filter(address => !usedSpots.includes(address));
    return Array.from(freeSpots, address => Position.createFromAddress(address));
  }

  /**
  * Checks if there's a victor for the current board, and if so, whether it's X or O that won.
  * @return X_SIDE = X side won, O_SIDE = O side won, undefined = no victor yet, null = game is a draw.
  */
  checkVictor():Side {
    let make_pos = (row:number, col:number):number => { return new Position(row, col); }; // For readability only

    const possibleVictories:Position[][] = [
      // Horizontal
      [ make_pos(0,0), make_pos(0,1), make_pos(0,2) ],
      [ make_pos(1,0), make_pos(1,1), make_pos(1,2) ],
      [ make_pos(2,0), make_pos(2,1), make_pos(2,2) ],
      // Vertical
      [ make_pos(0,0), make_pos(1,0), make_pos(2,0) ],
      [ make_pos(0,1), make_pos(1,1), make_pos(2,1) ],
      [ make_pos(0,2), make_pos(1,2), make_pos(2,2) ],
      // Diagonal
      [ make_pos(0,0), make_pos(1,1), make_pos(2,2) ],
      [ make_pos(0,2), make_pos(1,1), make_pos(2,0) ],
    ];

    const VICTOR_IS_X:string = Side.SIDE_X + Side.SIDE_X + Side.SIDE_X;
    const VICTOR_IS_O:string = Side.SIDE_O + Side.SIDE_O + Side.SIDE_O;

    let victor:Side = null;
    possibleVictories.map(possibleVictory => {
      if (victor !== null && victor !== undefined)
        return;

      let result:string = "";
      possibleVictory.map(pos => result = result + this.getSide(pos));

      if (result == VICTOR_IS_X)
        victor = Side.SIDE_X;
      else if (result == VICTOR_IS_O)
        victor = Side.SIDE_O;
      else if (result.length != 3)
        victor = undefined;
    });
    return victor;
  }

  /**
  * Shows the current board in the console.
  * @param showAddress true = show address of empty spots, false = show empty spots as empty.
  */
  show(showAddress:boolean = true):void {
    if (showAddress == true) {
      console.log(this.board);
    } else {
      console.log(this.board.replace(/[0-9]/gi, ' '));
    }
  }

  toString():string {
      return `Board(): ${JSON.stringify(this)}`;
  }
}
