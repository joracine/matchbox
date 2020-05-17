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

  static createFromAddress(address:number):Position {
    return new Position(Math.floor(address / 3), address % 3);
  }

  /**
   * Returns the addess of the position. The address is the linear memory representation of the position, calcualted as row * 3 + col.
   * @return Address of the position.
   */
  address():number {
    return this.row * 3 + this.col;
  }

  print():void {
    console.log(`Position(): ${JSON.stringify(this)}`);
  }
}
