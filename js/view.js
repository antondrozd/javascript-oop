export default class View {
    constructor(model) {
        this.model = model;
        this.controller;

        this.cellSize = 17;

        this.init();

        this.model.on('clearGrid', this.clearGrid.bind(this));
        this.model.on('live', this.live.bind(this));
        this.model.on('die', this.die.bind(this));
        this.model.on('randomGridFill', this.randomGridFill.bind(this));
        this.model.on('compute', this.displayCurrentGrid.bind(this));
    }

    init() {
        this.gridContainer = document.querySelector('#grid');
        this.clearBtn = document.querySelector('#reset-button');
        this.randomGridFillBtn = document.querySelector('#randomize-button');
        this.startStopBtn = document.querySelector('#play-button');

        this.gridContainer.addEventListener(
            'click',
            this.handleGridClick.bind(this)
        );

        this.clearBtn.addEventListener('click', this.handleClear.bind(this));

        this.randomGridFillBtn.addEventListener(
            'click',
            this.handleRandomGridFill.bind(this)
        );

        this.startStopBtn.addEventListener(
            'click',
            this.handleStartStopBtnClick.bind(this)
        );
    }

    initController(controller) {
        this.controller = controller;
    }

    createGrid() {
        let docFr = new DocumentFragment();

        this.model.grid.forEachCell(cell => {
            const cellElement = cell.getDOMElement();

            docFr.appendChild(cellElement);
        });

        this.gridContainer.appendChild(docFr);

        Object.assign(this.gridContainer.style, {
            width: `${this.model.gridSize * this.cellSize}px`,
            height: `${this.model.gridSize * this.cellSize}px`,
            gridTemplate: `repeat(${this.model.gridSize}, 1fr) / repeat(${
                this.model.gridSize
            }, 1fr)`
        });
    }

    handleGridClick({ target }) {
        const element = target;

        if (element.id === 'grid') return;

        if (!element.classList.contains('alive')) {
            this.controller.live(element);
        } else {
            this.controller.die(element);
        }
    }

    handleClear() {
        this.controller.clearGrid();
    }

    handleRandomGridFill() {
        this.controller.randomGridFill();
    }

    handleStartStopBtnClick() {
        this.controller.play();
    }

    live({ row, col }) {
        const cellElement = this._getCellElement({ row, col });

        cellElement.classList.add('alive');
    }

    die({ row, col }) {
        const cellElement = this._getCellElement({ row, col });

        cellElement.classList.remove('alive');
    }

    clearGrid() {
        Array.prototype.forEach.call(this.gridContainer.children, element =>
            element.classList.remove('alive')
        );
    }

    randomGridFill() {
        this.model.grid.forEachCell((cell, row, col) => {
            const cellElement = this._getCellElement({ row, col });

            if (cell.isAlive) {
                cellElement.classList.add('alive');
            }
        });
    }

    displayCurrentGrid() {
        this.clearGrid();

        this.model.grid.forEachCell((cell, row, col) => {
            const cellElement = this._getCellElement({ row, col });

            if (cell.isAlive) {
                cellElement.classList.add('alive');
            }
        });
    }

    _getCellElement({ row, col }) {
        return this.gridContainer.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
    }
}
