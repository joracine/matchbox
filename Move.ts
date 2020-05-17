import { _validator } from "./_validator";
import { Position } from "./Position";
import { Board } from "./Board";

export enum Side {
  UNKNOWN = '?',
  X = 'X',
  O = 'O',
  BOTH = 'O&X'
}

export class Move {
  side:Side;
  position:Position;

  constructor(side:Side, position:Position) {
    this.side = side;
    this.position = position;
  }

  /**
   * Shows the move in a board in the console.
   * @param showAddress true = show address of empty spots, false = show empty spots as empty.
   */
  show():void {
    Board.createFromMove(this).show();
  }

  toString():string {
    return `Move(Side, Position): ${JSON.stringify(this)}`;
  }
}
