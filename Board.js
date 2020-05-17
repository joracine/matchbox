"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const _validator_1 = require("./_validator");
const Position_1 = require("./Position");
const Move_1 = require("./Move");
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
        /**
        * Adds a move to the board. Only adds the move if it's a valid move (i.e. not on top of a previous move).
        * @param  move the move to be added to the board.
        * @return      true = move was added, false = move was invalid and was not added.
        */
        addMove(move) {
            if (this.moves[move.position.address()] !== undefined)
                return false;
            this.moves[move.position.address()] = move;
            this.board = this.board.replace(move.position.address().toString(), move.side.toString());
            ;
            return true;
        }
        /**
        * Check is the given position has already been useed by a previous move.
        * @param  position Position on the board to be checked.
        * @return          true = position is free, false = position is filled.
        */
        isFree(position) {
            return this.moves[position.address()] === undefined;
        }
        /**
         * Returns which side has played the given position.
         * @param  position Position on the board.
         * @return          X_SIDE = X played this position, O_SIDE = O played this position, null = this position is free.
         */
        getSide(position) {
            let move = this.moves[position.address()];
            if (move === undefined)
                return null;
            return move.side;
        }
        /**
        * Checks if there's a victor for the current board, and if so, whether it's X or O that won.
        * @return X_SIDE = X side won, O_SIDE = O side won, undefined = no victor yet, null = game is a draw.
        */
        checkVictor() {
            let make_pos = (row, col) => { return new Position_1.Position(row, col); }; // For readability only
            const possibleVictories = [
                // Horizontal
                [make_pos(0, 0), make_pos(0, 1), make_pos(0, 2)],
                [make_pos(1, 0), make_pos(1, 1), make_pos(1, 2)],
                [make_pos(2, 0), make_pos(2, 1), make_pos(2, 2)],
                // Vertical
                [make_pos(0, 0), make_pos(1, 0), make_pos(2, 0)],
                [make_pos(0, 1), make_pos(1, 1), make_pos(2, 1)],
                [make_pos(0, 2), make_pos(1, 2), make_pos(2, 2)],
                // Diagonal
                [make_pos(0, 0), make_pos(1, 1), make_pos(2, 2)],
                [make_pos(0, 2), make_pos(1, 1), make_pos(2, 0)],
            ];
            const VICTOR_IS_X = Move_1.Side.SIDE_X + Move_1.Side.SIDE_X + Move_1.Side.SIDE_X;
            const VICTOR_IS_O = Move_1.Side.SIDE_O + Move_1.Side.SIDE_O + Move_1.Side.SIDE_O;
            let victor = null;
            possibleVictories.map(possibleVictory => {
                if (victor !== null && victor !== undefined)
                    return;
                let result = "";
                possibleVictory.map(pos => result = result + this.getSide(pos));
                if (result == VICTOR_IS_X)
                    victor = Move_1.Side.SIDE_X;
                else if (result == VICTOR_IS_O)
                    victor = Move_1.Side.SIDE_O;
                else if (result.length != 3)
                    victor = undefined;
            });
            return victor;
        }
        /**
        * Shows the current board in the console.
        * @param showAddress true = show address of empty spots, false = show empty spots as empty.
        */
        show(showAddress = true) {
            if (showAddress == true) {
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
