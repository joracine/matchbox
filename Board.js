"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const _validator_1 = require("./_validator");
const Position_1 = require("./Position");
const Move_1 = require("./Move");
let Board = /** @class */ (() => {
    class Board {
        constructor() {
            this.moves = new Array();
            this.board = Board.EMPTY_BOARD;
        }
        static createFromMove(move) {
            let board = new Board();
            _validator_1._validator._checkTrue(board.addMove(move), `Failed to add move ${JSON.stringify(move)} position already filled.`);
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
            const row = move.position.row;
            const col = move.position.col;
            if (this.moves.length > 0 && this.moves.slice(-1).side == move.side) {
                console.error("Invalid move: Trying to play ${move.side} but it's ${move.side}'s turn!'");
                return false;
            }
            if (this.board[row][col] !== undefined) {
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
        isFree(position) {
            return this.board[position.row][position.col] === undefined;
        }
        /**
         * Returns which side has played the given position.
         * @param  position Position on the board.
         * @return          X_SIDE = X played this position, O_SIDE = O played this position, null = this position is free.
         */
        getSide(position) {
            let side = this.board[position.row][position.col];
            if (side === undefined)
                return null;
            return side;
        }
        /**
         * Returns all free spots on the board.
         * @return Array of positions which are free.
         */
        getAllFree() {
            let allSpots = Array.from({ length: 9 }, (value, index) => index);
            let usedSpots = Array.from(this.board.flat(), { value, index });
            if (value !== undefined)
                return index;
            ;
            let freeSpots = allSpots.filter(address => !usedSpots.includes(address));
            return Array.from(freeSpots, address => Position_1.Position.createFromAddress(address));
        }
        /**
         * Checks that the board is valid (i.e. moves have been taken in the right order). Throws an exceptions if not.
         */
        checkValid() {
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
        */
        show() {
            for (let row = 0; row < 3; ++row) {
                let displayRow = Array.from(this.board[row]);
                for (let col = 0; col < 3; ++col) {
                    if (displayRow[col] === undefined)
                        displayRow[col] = new Position_1.Position(row, col).address();
                }
                console.log(displayRow.join(''));
            }
        }
        toString() {
            return `Board(): ${JSON.stringify(this)}`;
        }
    }
    Board.EMPTY_BOARD = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
    ];
    return Board;
})();
exports.Board = Board;
