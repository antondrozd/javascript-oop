export default class ColorPalette {
    constructor({ element, colors }) {
        this.element = element;
        this.colors = colors;
        this._currentColor = 'black';
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
            this.handleBrushColorChange.bind(this)
        );
    }

    handleBrushColorChange({ target }) {
        if (target.tagName !== 'LI') return;

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
}
