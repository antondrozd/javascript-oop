export default class Cell {
    constructor({ row, col, isAlive = false }) {
        this._row = row;
        this._col = col;
        this._isAlive = isAlive;
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    get isAlive() {
        return this._isAlive;
    }

    live() {
        this._isAlive = true;
    }

    die() {
        this._isAlive = false;
    }

    getDOMElement() {
        const cellElement = document.createElement('div');

        cellElement.classList.add('grid-cell');
        if (this.isAlive) {
            cellElement.classList.add('alive');
        }

        cellElement.setAttribute('data-row', this.row);
        cellElement.setAttribute('data-col', this.col);

        return cellElement;
    }
}
