import { _validator } from "./_validator";
import { Position } from "./Position";
import { Board } from "./Board";

export enum Side {
  SIDE_X = 'X',
  SIDE_O = 'O'
}

export class Move {
  side:Side;
  position:Position;

  constructor(side:Side, position:Position) {
    this.side = side;
    this.position = position;
  }

  show(showPos:boolean = true):void {
    Board.createFromMove(this).show(showPos);
  }

  toString():string {
    retrun `Move(Side, Position): ${JSON.stringify(this)}`;
  }
}
