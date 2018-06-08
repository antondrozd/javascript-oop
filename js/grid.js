import Cell from './cell.js';

export default class Grid {
    constructor(size) {
        this.size = size;
        this._cells = [];

        this.init();
    }

    get cells() {
        return this._cells;
    }

    init() {
        // this._cells = new Array(this.size).fill(null);

        for (let row = 0; row < this.size; row++) {
            // this._cells[row] = new Array(this.size);
            this._cells[row] = [];

            for (let col = 0; col < this.size; col++) {
                this._cells[row][col] = new Cell({ row, col });
            }
        }
    }

    forEachCell(callback) {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                callback(this.cells[row][col], row, col);
            }
        }
    }
}
