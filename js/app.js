export default class App {
    constructor({ canvas }) {
        this.canvas = canvas;

        this.clearCanvasButton;
        this.brushSizeSlider;

        this.context = null;
        this.isDrawing = false;

        this.handleCanvasClear = this.handleCanvasClear.bind(this);
        this.handleBrushSizeChange = this.handleBrushSizeChange.bind(this);

        this.init();
    }

    init() {
        this.context = this.canvas.getContext('2d');

        this.clearCanvasButton = document.querySelector('#clear-canvas-button');
        this.brushSizeSlider = document.querySelector('#brush-size-slider');

        this.clearCanvasButton.addEventListener('click', this.handleCanvasClear);
        this.brushSizeSlider.addEventListener('change', this.handleBrushSizeChange);

        this.canvas.addEventListener('mousedown', this.handleCanvasMousedown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleCanvasMousemove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleCanvasMouseup.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleCanvasMouseleave.bind(this));
    }

    handleCanvasMousedown(event) {
        this.lastEvent = event;
        this.isDrawing = true;
    }

    handleCanvasMousemove(event) {
        if (this.isDrawing) {
            this.context.beginPath();
            this.context.moveTo(this.lastEvent.offsetX, this.lastEvent.offsetY);
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.strokeStyle = 'black';
            this.context.stroke();
            this.lastEvent = event;
        }
    }

    handleCanvasMouseup(event) {
        this.isDrawing = false;
    }

    handleCanvasMouseleave(event) {
        this.isDrawing = false;
    }

    handleCanvasClear(event) {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleBrushSizeChange(event) {
        this.context.lineWidth = Number(event.target.value);
    }
}