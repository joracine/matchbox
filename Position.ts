import { _validator } from "./_validator";

export class Position {
  row:number;
  col:number;

  constructor(row:number, col:number) {
    _validator._checkRangeInclusive(0, 2, row);
    _validator._checkRangeInclusive(0, 2, col);

    this.row = row;
    this.col = col;
  }

  address():number {
    return this.row * 3 + this.col;
  }

  print():void {
    console.log(`Position(): ${JSON.stringify(this)}`);
  }
}
