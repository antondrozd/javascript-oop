import Color from './color.js';

export default class ColorPalette {
    constructor({
        element,
        colors = [new Color(0, 0, 0)],
        maxColorsAmount = 7
    }) {
        this.element = element;
        this.colors = colors;
        this.maxColorsAmount = maxColorsAmount;
        this.currentColor = colors[0];
        this._currentColorIndex = 0;

        this.handleClick = this.handleClick.bind(this);
    }

    get currentColorIndex() {
        return this._currentColorIndex;
    }

    set currentColorIndex(id) {
        this._currentColorIndex = +id;
        this.currentColor = this.colors[this.currentColorIndex];
        this.displaySelected();
    }

    get lastColorIndex() {
        return this.colors.length - 1;
    }

    render() {
        let html = '';

        this.colors.forEach(
            (color, index) =>
                (html += `<li id=${index} class="color-palette__color" style="background-color: ${color.toString()};"><span class="color-palette__remove-color"></span></li>`)
        );

        this.element.innerHTML = html;

        this.element.addEventListener('click', this.handleClick);

        this.displaySelected();
        // codedojo Добавил сюда вызов этого метода, так как необходимо,
        // чтобы при первом рендере отображался выбранный по умолчанию цвет.
        // Но получается, что этот метод вызывается дважды при удалении цвета
        // в методе handleColorRemove, если id удаляемого ответа ниже,
        // чем индекс текущего цвета (в этом случае нужно уменьшить индекс на 1).
        // Сначала displaySelected вызывается из сеттера, а потом отсюда
        // (из метода render).
        // Не знаю, как это грамотно поправить
    }

    handleClick({ target }) {
        if (target.classList.contains('color-palette__color'))
            this.handleColorChange(target.id);
        if (target.classList.contains('color-palette__remove-color'))
            this.handleColorRemove(target.parentNode.id);
    }

    handleColorChange(id) {
        this.selectColor(id);
    }

    handleColorRemove(id) {
        if (this.colors.length > 1) {
            this.colors.splice(id, 1);

            if (id < this.currentColorIndex) {
                this.currentColorIndex -= 1;
            }

            this.render();
        }
    }

    selectColor(id) {
        this.currentColorIndex = id;
    }

    displaySelected() {
        this.element.childNodes.forEach(colorElement => {
            colorElement.classList.remove('selected');

            if (colorElement.id == this.currentColorIndex) {
                colorElement.classList.add('selected');
            }
        });
    }

    addColor(color) {
        if (this.colors.length === this.maxColorsAmount) {
            alert(
                'Слишком много цветов в палитре! Удалите один или несколько цветов.'
            );
            return;
        }

        this.colors.push(color);
        this.render();
        this.currentColorIndex = this.lastColorIndex;
    }
}
