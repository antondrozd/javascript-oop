export default class ColorPalette {
    constructor({ element, colors }) {
        this.element = element;
        this.colors = colors;
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
    }

    subscribe(onColorChange) {
        this.element.addEventListener('click', onColorChange);
    }
}
