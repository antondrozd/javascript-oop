import Grid from './grid.js';
import { EventEmitter } from './helpers.js';

export default class Model extends EventEmitter {
    constructor({ gridSize = 36 }) {
        super();

        this.gridSize = gridSize;
        this.gameSpeed = 100;
        this.isPlaying = false;
        this.grid;

        this.computeNextGrid = this.computeNextGrid.bind(this);
    }

    init() {
        this.grid = new Grid(this.gridSize);

        this.emit('init', this.gridSize);
    }

    live({ row, col }) {
        this.grid.cells[row][col].live();

        this.emit('live', { row, col });
    }

    die({ row, col }) {
        this.grid.cells[row][col].die();

        this.emit('die', { row, col });
    }

    clearGrid() {
        this.grid.forEachCell(cell => cell.die());

        this.emit('clearGrid');
    }

    randomGridFill() {
        this.clearGrid();

        this.grid.forEachCell(cell => {
            if (Math.random() < 0.5) {
                cell.live();
            }
        });

        this.emit('randomGridFill');
    }

    computeNextGrid() {
        let nextGrid = new Grid(this.gridSize);

        this.grid.forEachCell((cell, row, col) => {
            if (
                (cell.isAlive && this._countAliveNeighbors(cell) === 2) ||
                this._countAliveNeighbors(cell) === 3
            ) {
                nextGrid.cells[row][col].live();
            }
        });

        this.grid = nextGrid;

        this.emit('compute');
    }

    play() {
        this.interval = setInterval(this.computeNextGrid, this.gameSpeed);
        this.isPlaying = true;

        this.emit('play');
    }

    pause() {
        clearInterval(this.interval);
        this.interval = null;
        this.isPlaying = false;

        this.emit('pause');
    }

    setSpeed(speed) {
        this.gameSpeed = speed;

        if (this.isPlaying) {
            clearInterval(this.interval);
            this.interval = setInterval(this.computeNextGrid, this.gameSpeed);
        }
    }

    _countAliveNeighbors(cell) {
        const row = cell.row;
        const col = cell.col;

        let count = 0;

        if (
            this.grid.cells[row - 1] &&
            this.grid.cells[row - 1][col - 1] &&
            this.grid.cells[row - 1][col - 1].isAlive
        )
            count += 1;
        if (
            this.grid.cells[row - 1] &&
            this.grid.cells[row - 1][col] &&
            this.grid.cells[row - 1][col].isAlive
        )
            count += 1;
        if (
            this.grid.cells[row - 1] &&
            this.grid.cells[row - 1][col + 1] &&
            this.grid.cells[row - 1][col + 1].isAlive
        )
            count += 1;
        if (
            this.grid.cells[row] &&
            this.grid.cells[row][col + 1] &&
            this.grid.cells[row][col + 1].isAlive
        )
            count += 1;
        if (
            this.grid.cells[row + 1] &&
            this.grid.cells[row + 1][col + 1] &&
            this.grid.cells[row + 1][col + 1].isAlive
        )
            count += 1;
        if (
            this.grid.cells[row + 1] &&
            this.grid.cells[row + 1][col] &&
            this.grid.cells[row + 1][col].isAlive
        )
            count += 1;
        if (
            this.grid.cells[row + 1] &&
            this.grid.cells[row + 1][col - 1] &&
            this.grid.cells[row + 1][col - 1].isAlive
        )
            count += 1;
        if (
            this.grid.cells[row] &&
            this.grid.cells[row][col - 1] &&
            this.grid.cells[row][col - 1].isAlive
        )
            count += 1;

        return count;
    }
}
