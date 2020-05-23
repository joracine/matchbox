import { Validator } from "./Validator";
import { Position } from "./Position";
import { Move, Side } from "./Move";

export class Board {
  moves = new Array<Move>();
  board = new Array<Array<Side>>(
    [Side.UNKNOWN, Side.UNKNOWN, Side.UNKNOWN],
    [Side.UNKNOWN, Side.UNKNOWN, Side.UNKNOWN],
    [Side.UNKNOWN, Side.UNKNOWN, Side.UNKNOWN],
  );

  static createFromMove(move:Move):Board {
    let board = new Board();
     Validator._checkTrue(board.addMove(move), `Failed to add move ${JSON.stringify(move)} position already filled.`);
    return board;
  }

  static createFromMoves(moves:Move[]):Board {
    Validator._checkArraySize(0, 9, moves);
    let board = new Board();
    moves.map(move => Validator._checkTrue(board.addMove(move), `Failed to add move ${JSON.stringify(move)} position already filled.`));
    return board;
  }

  /**
  * Adds a move to the board. Only adds the move if it's a valid move (i.e. not on top of a previous move).
  * @param  move the move to be added to the board.
  * @return      true = move was added, false = move was invalid and was not added.
  */
  addMove(move:Move):boolean {
    const row = move.position.row;
    const col = move.position.col;

    if (this.moves.length > 0 && this.moves[this.moves.length - 1].side == move.side) {
      console.error("Invalid move: Trying to play ${move.side} but it's not ${move.side}'s turn!'");
      return false;
    }

    if (this.board[row][col] != Side.UNKNOWN) {
      console.error(`Invalid move: The location ${row},${col} has already been played.`);
      return false;
    }

    this.moves.push(move);
    this.board[row][col] = move.side;
    console.info(`Move played: ${move.side} played at ${row},${col}.`);
    return true;
  }

  /**
  * Check is the given position has already been useed by a previous move.
  * @param  position Position on the board to be checked.
  * @return          true = position is free, false = position is filled.
  */
  isFree(position:Position):boolean {
    return this.board[position.row][position.col] == Side.UNKNOWN;
  }

  /**
   * Returns which side has played the given position.
   * @param  position Position on the board.
   * @return          X = X played this position, O = O played this position,UNKNOWN = psition hasn't been played.
   */
  getSide(position:Position):(Side) {
    let side = this.board[position.row][position.col];
    return side;
  }

  /**
   * Returns all free spots on the board.
   * @return Array of positions which are free.
   */
  getAllFree():Position[] {
    let allSpots:number[] = Array.from({length: 9}, (_value, index) => index);
    let usedSpots:(number | undefined)[] = this.board.flat().map((value:Side, index:number) => { if (value !== Side.UNKNOWN) return index; return undefined;});
    let freeSpots = allSpots.filter(address => !usedSpots.includes(address));
    return Array.from(freeSpots, address => Position.createFromAddress(address));
  }

  /**
   * Checks that the board is valid (i.e. moves have been taken in the right order). Throws an exceptions if not.
   */
  checkValid():boolean {
    //TBA
    return true;
  }

  /**
  * Checks if there's a victor for the current board, and if so, whether it's X or O that won.
  * @return X_SIDE = X side won, O_SIDE = O side won, undefined = no victor yet, null = game is a draw.
  */
  checkVictor():Side {
    let make_pos = (row:number, col:number):Position => { return new Position(row, col); }; // For readability only

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

    const VICTOR_IS_X:string = Side.X + Side.X + Side.X;
    const VICTOR_IS_O:string = Side.O + Side.O + Side.O;

    let victor:Side = Side.BOTH;
    possibleVictories.map(possibleVictory => {
      if (victor != Side.UNKNOWN && victor != Side.BOTH)
        return;

      let result:string = "";
      possibleVictory.map(pos => result = result + this.getSide(pos));
      if (result == VICTOR_IS_X)
        victor = Side.X;
      else if (result == VICTOR_IS_O)
        victor = Side.O;
      else if (result.lastIndexOf(Side.UNKNOWN) != -1)
        victor = Side.UNKNOWN;
    });
    return victor;
  }

  /**
  * Shows the current board in the console.
  */
  show():void {
    for (let row  = 0; row < 3; ++row) {
      console.log(this.board[row].join('').replace(/[?]/g, ' '));
    }
  }

  toString():string {
      return `Board(): ${JSON.stringify(this)}`;
  }
}
