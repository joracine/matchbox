import { _validator } from "./_validator";
import { Position } from "./Position";
import { Move, Side } from "./Move";
import { Board } from "./Board";

const prompt = require('prompt-sync')();

class Matchbox {
  id:number;
  beadsCount:number[];
}

const b = new Board();

b.addMove(new Move(Side.SIDE_O, new Position(1,2));
console.log("MOVE 1:");
b.show(false);

b.addMove(new Move(Side.SIDE_X, new Position(0,2));
console.log("MOVE 2:");
b.show(false);
