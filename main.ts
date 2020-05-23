import { Validator } from "./Validator";
import { Position } from "./Position";
import { Move, Side } from "./Move";
import { Board } from "./Board";

// Forward Compatibility for ES2021
Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1):any {
      return this.reduce(function (flat:any, toFlatten:any):any {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

interface IPlayer {
  playTurn(board:Board, side:Side):Position;
}

class RandomPlayer implements IPlayer {
  playTurn(board:Board, _side:Side):Position {
    let freeSpots = board.getAllFree();
    return freeSpots[Math.floor(Math.random() * (freeSpots.length - 1))];
  }
}

class GameController {
  board:Board;
  players:Map<Side, IPlayer>;

  constructor(board:Board, playerX:IPlayer, playerO:IPlayer) {
    this.board = board;
    this.players = new Map([
      [Side.X, playerX],
      [Side.O, playerO]
    ]);
  }

  run():void {
    let side:Side = [Side.X, Side.O][Math.floor(Math.random() * 2)];
    console.info(`Side ${side} won the coin toss!`);
    this.board.show();

    let turn = 0;
    while (this.board.checkVictor() == Side.UNKNOWN) {
      console.info(`Turn #${++turn}`);
      let player = this.players.get(side);
      if (player === undefined)
        throw new Error(`Unrecoverable error: Player ${side} is undefined.`);

      console.info(`Player ${side} is thinking...`);
      let position:Position = player.playTurn(this.board, side);
      if (this.board.addMove(new Move(side, position)) == false)
        throw new Error('Aborting - player has played invalid move.');
      console.info(`Player ${side} played at row ${position.row}, and column ${position.col}.`);
      this.board.show();

      side = side == Side.X ? Side.O : Side.X;

      Validator._checkTrue(this.board.checkValid());
    }

    let victor = this.board.checkVictor();
    console.info(`The winner is: ${victor == Side.BOTH ? "it's a draw" : victor}!`)
    this.board.show();
  }
}

const game = new GameController(new Board(), new RandomPlayer(), new RandomPlayer());
game.run();
