class Stack {
    /**
     * Создает стопку, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...items) {
        this._items = items;
    }

    /**
     * Возвращает количество элементов в стопке
     * @returns {number}
     */
    get size() {
        return this._items.length;
    }

    /**
     * Возвращает `true` если стопка пустая, и `false` если стопка не пустая
     * @returns {boolean}
     */
    get isEmpty() {
        return this.size == 0;
    }

    /**
     * Добавляет элемент в стопку
     * @param {*} item
     */
    push(item) {
        this._items.push(item);
    }

    /**
     * Удаляет элемент из стопки и возвращает его
     * @returns {*}
     */
    pop() {
        return this._items.pop();
    }

    /**
     * Возвращает последний элемент в стопке не удаляя его
     * @returns {*}
     */
    peek() {
        return this._items[this.size - 1];
    }
}

module.exports = Stack;
