const Element = require('../element');

class Input extends Element {
    /**
     * @param {{ tag: string, id: string, className: string, type: string, name: string, disabled: boolean, required: boolean }} args
     */
    constructor({
        type = 'text',
        name,
        value,
        disabled = false,
        required = false,
        ...args
    }) {
        super({ ...args, tag: 'input' });

        this.type = type;
        this.name = name;
        this.disabled = disabled;
        this.required = required;
        this._value = value;
    }

    /**
     * `get` - Возвращает значение элемента.
     *
     * `set` - Устанавливает значение элемента и сообщает слушателям о событии `change`.
     *
     * @returns {boolean}
     */
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.emit('change', value);
    }

    /**
     * Проверяет валидность значения.
     *
     * Если элемент отмечен как `required`, то значение не должно быть `undefined`
     *
     * @returns {boolean}
     */
    get isValid() {
        return this.required && this.value === undefined ? false : true;
    }
}

module.exports = Input;