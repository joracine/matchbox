"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const _validator_1 = require("./_validator");
let Board = /** @class */ (() => {
    class Board {
        constructor() {
            this.moves = new Array(9);
            this.board = Board.EMPTY_BOARD;
        }
        static createFromMove(move) {
            let board = new Board();
            board.addMove(move);
            return board;
        }
        static createFromMoves(moves) {
            _validator_1._validator._checkArraySize(0, 9, moves);
            let board = new Board();
            moves.map(move => _validator_1._validator._checkTrue(board.addMove(move), `Failed to add move ${JSON.stringify(move)} position already filled.`));
            return board;
        }
        addMove(move) {
            if (typeof this.moves[move.position.address()] !== 'undefined')
                return false;
            this.moves[move.position.address()] = move;
            this.board = this.board.replace(move.position.address().toString(), move.side.toString());
            ;
            return true;
        }
        show(showPos = true) {
            if (showPos == true) {
                console.log(this.board);
            }
            else {
                console.log(this.board.replace(/[0-9]/gi, ' '));
            }
        }
        toString() {
            return `Board(): ${JSON.stringify(this)}`;
        }
    }
    Board.EMPTY_BOARD = "+-----+\n" +
        "|0|1|2|\n" +
        "+-+-+-+\n" +
        "|3|4|5|\n" +
        "+-+-+-+\n" +
        "|6|7|8|\n" +
        "+-----+\n";
    return Board;
})();
exports.Board = Board;
