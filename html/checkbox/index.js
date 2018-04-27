const Input = require('../input/');

class Checkbox extends Input {
    /**
     * @param {{ tag: string, id: string, className: string, type: string, name: string, disabled: boolean, required: boolean, checked: boolean }} args
     */
    constructor({ checked = false, ...args }) {
        super({ ...args, type: 'checkbox', value: false });

        this._checked = checked;
    }

    /**
     * `get` - Возвращает значение элемента.
     *
     * `set` - Устанавливает значение элемента и сообщает слушателям о событии `change`.
     *
     * @returns {boolean}
     */
    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = !this._checked;
        this.emit('change', value);
    }

    /**
     * Проверяет валидность значения
     * @returns {boolean}
     */
    get isValid() {
        return typeof this._checked === 'boolean';
    }
}

module.exports = Checkbox;