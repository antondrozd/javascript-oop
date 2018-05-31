export default class ColorPalette {
    constructor({ element, colors }) {
        this.element = element;
        this.colors = colors;
        this._currentColor = 'black';

        this.handleBrushColorChange = this.handleBrushColorChange.bind(this);
    }

    get currentColor() {
        return this._currentColor;
    }

    render() {
        let html = '';

        const elements = this.colors.map(
            color =>
                (html += `<li class="color-palette__color" style="background-color: rgb(${
                    color.red
                }, ${color.green}, ${color.blue});"></li>`)
        );

        this.element.innerHTML = html;

        this.element.addEventListener(
            'click',
            this.handleBrushColorChange
        );
    }

    handleBrushColorChange({ target }) {
        if (!target.classList.contains('color-palette__color')) return;

        const colorElement = target;

        this._currentColor = colorElement.style.backgroundColor;

        this.displaySelected(colorElement);
    }

    displaySelected(colorElement) {
        this.element.childNodes.forEach(color =>
            color.classList.remove('selected')
        );

        colorElement.classList.add('selected');
    }

    addColor(color) {
        this.colors.push(color);

        this.render();

        // this.element.lastChild.dispatchEvent(new Event('click'), {
        //     bubbles: true
        // });

        this.handleBrushColorChange({ target: this.element.lastChild });
    }
}
