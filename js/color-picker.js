import Color from './color.js';
import { EventEmitter } from './helpers.js';

export default class ColorPicker extends EventEmitter {
    constructor({ element }) {
        super();

        this.element = element;
        this._color = new Color(0, 0, 0);

        this.redRangeElement;
        this.greenRangeElement;
        this.blueRangeElement;
        this.addColorButton;
        this.closeButton;
        this.previewElement;

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleColorAdd = this.handleColorAdd.bind(this);

        this.init();
    }

    get color() {
        return this._color;
    }

    set color(newColor) {
        this._color = newColor;

        this.displayPreview();
    }

    init() {
        this.previewElement = this.element.querySelector(
            '.color-picker__preview'
        );
        this.redRangeElement = this.element.querySelector('#red');
        this.greenRangeElement = this.element.querySelector('#green');
        this.blueRangeElement = this.element.querySelector('#blue');
        this.addColorButton = this.element.querySelector(
            '.color-picker__add-button'
        );
        this.closeButton = this.element.querySelector(
            '.color-picker__close-button'
        );

        this.redRangeElement.addEventListener('input', ({ target }) =>
            this.setRedValue(target.value)
        );
        this.greenRangeElement.addEventListener('input', ({ target }) =>
            this.setGreenValue(target.value)
        );
        this.blueRangeElement.addEventListener('input', ({ target }) =>
            this.setBlueValue(target.value)
        );
        this.addColorButton.addEventListener('click', this.handleColorAdd);
        this.closeButton.addEventListener('click', this.close);

        this.displayPreview();
    }

    open() {
        this.element.classList.add('open');
    }

    close() {
        this.element.classList.remove('open');
    }

    displayPreview() {
        this.previewElement.style.backgroundColor = this.color.toString();
    }

    setRedValue(red) {
        this.color = Object.assign(this.color, { red });
    }

    setGreenValue(green) {
        this.color = Object.assign(this.color, { green });
    }

    setBlueValue(blue) {
        this.color = Object.assign(this.color, { blue });
    }

    reset() {
        this.color = new Color(0, 0, 0);

        this.redRangeElement.value = 0;
        this.greenRangeElement.value = 0;
        this.blueRangeElement.value = 0;
    }

    handleColorAdd() {
        this.emit('colorAdd', this.color);
        this.reset();
        this.close();
    }
}
