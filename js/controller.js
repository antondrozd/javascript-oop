export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.on('init', this.initGrid.bind(this));
    }

    initGrid() {
        const size = this.model.gridSize;

        this.view.createGrid({ size });
    }

    live(element) {
        const row = element.getAttribute('data-row');
        const col = element.getAttribute('data-col');

        this.model.live({ row, col });
        // this.view.live(element);
    }

    die(element) {
        const row = element.getAttribute('data-row');
        const col = element.getAttribute('data-col');

        this.model.die({ row, col });
        // this.view.die(element);
    }

    clearGrid() {
        this.model.clearGrid();
        // this.view.clearGrid();
    }

    randomGridFill() {
        this.model.randomGridFill();
        // this.view.randomGridFill();
    }

    play() {
        this.model.play();
    }
}
