import { RandomPlayer } from "./RandomPlayer";
import { GameController } from "./GameController";
import { Board } from "./Board";

// Forward Compatibility for ES2021
Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1):any {
      return this.reduce(function (flat:any, toFlatten:any):any {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

const game = new GameController(new Board(), new RandomPlayer(), new RandomPlayer());
game.run();
