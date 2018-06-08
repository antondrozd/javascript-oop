export default class View {
    constructor(model) {
        this.model = model;
        this.controller;

        this.gridSize = model.gridSize;
        this.cellSize = 17;

        this.init();

        this.model.on('clearGrid', this.clearGrid.bind(this));
        this.model.on('live', this.live.bind(this));
        this.model.on('die', this.die.bind(this));
        this.model.on('compute', this.displayUpdatedGrid.bind(this));
        this.model.on('play', this.play.bind(this));
        this.model.on('pause', this.pause.bind(this));
    }

    init() {
        this.gridContainer = document.querySelector('#grid');
        this.clearBtn = document.querySelector('#reset-button');
        this.randomGridBtn = document.querySelector('#randomize-button');
        this.togglePlayBtn = document.querySelector('#play-button');
        this.speedRange = document.querySelector('#speed-slider');

        this.gridContainer.addEventListener(
            'click',
            this.handleGridClick.bind(this)
        );

        this.clearBtn.addEventListener('click', this.handleClear.bind(this));

        this.randomGridBtn.addEventListener(
            'click',
            this.handleRandomGrid.bind(this)
        );

        this.togglePlayBtn.addEventListener(
            'click',
            this.handleTogglePlayBtnClick.bind(this)
        );

        this.speedRange.addEventListener(
            'input',
            this.handleSpeedChange.bind(this)
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
            width: `${this.gridSize * this.cellSize}px`,
            height: `${this.gridSize * this.cellSize}px`,
            gridTemplate: `repeat(${this.gridSize}, 1fr) / repeat(${
                this.gridSize
            }, 1fr)`
        });
    }

    handleGridClick({ target }) {
        const element = target;

        if (element.id === 'grid') return;

        const row = element.getAttribute('data-row');
        const col = element.getAttribute('data-col');

        if (!element.classList.contains('alive')) {
            this.controller.live({ row, col });
        } else {
            this.controller.die({ row, col });
        }
    }

    handleClear() {
        this.controller.clearGrid();
    }

    handleRandomGrid() {
        this.controller.randomGrid();
    }

    handleTogglePlayBtnClick() {
        if (!this.model.isPlaying) {
            this.controller.play();
        } else {
            this.controller.pause();
        }
    }

    handleSpeedChange() {
        const speed = this.speedRange.value;

        this.controller.setSpeed(speed);
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

    displayUpdatedGrid() {
        this.model.grid.forEachCell((cell, row, col) => {
            const cellElement = this._getCellElement({ row, col });

            if (cell.isAlive) {
                cellElement.classList.add('alive');
            } else {
                cellElement.classList.remove('alive');
            }
        });
    }

    play() {
        this.togglePlayBtn.textContent = 'pause';
    }

    pause() {
        this.togglePlayBtn.textContent = 'play_arrow';
    }

    _getCellElement({ row, col }) {
        return this.gridContainer.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
    }
}
