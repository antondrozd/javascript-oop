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

    live({ row, col }) {
        this.model.live({ row, col });
    }

    die({ row, col }) {
        this.model.die({ row, col });
    }

    clearGrid() {
        this.model.clearGrid();
    }

    randomGrid() {
        this.model.computeRandomGrid();
    }

    play() {
        this.model.play();
    }

    pause() {
        this.model.pause();
    }

    setSpeed(speed) {
        this.model.setSpeed(+speed);
    }
}
