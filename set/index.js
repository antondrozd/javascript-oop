class Set {
    /**
     * Создает сет, опционально принимая элементы для добавления
     * @param {...*} [items] Добавляемые элементы
     */
    constructor(...items) {
        this._items = items;
    }

    /**
     * Возвращает количество элементов в сете
     * @returns {number}
     */
    get size() {
        return this._items.length;
    }

    /**
     * Возвращает массив элементов сета
     * @returns {Array}
     */
    get values() {
        return this._items;
    }

    /**
     * Добавляет элемент в сет
     * @param {*} item
     */
    add(item) {
        if (!this.has(item)) {
            this._items.push(item);
        }
    }

    /**
     * Проверяет наличие элемента в сете
     * @param {*} item
     * @returns {boolean}
     */
    has(item) {
        return this._items.includes(item);
    }

    /**
     * Удаляет элемент из сета и возвращает `true` если элемент удален и `false` если нет
     * @param {*} item
     * @returns {boolean}
     */
    remove(item) {
        let index = this._items.indexOf(item);

        if (index !== -1) {
            this._items.splice(index, 1);
            return true;
        }

        return false;
    }

    /**
     * Удаляет все элементы в сете
     */
    clear() {
        this._items = [];
    }

    /**
     * Возращает сет состоящий из элементов двух сетов
     * @param {Set} set
     * @returns {Set}
     */
    union(set) {
        return new Set(...this.values, ...set.values);
    }

    /**
     * Возращает сет состоящий из элементов которые присутствуют в обоих сетах
     * @param {Set} set
     * @returns {Set}
     */
    intersection(set) {
        let items = [...this._items].filter(item => set.has(item));

        return new Set(...items);
    }

    /**
     * Возращает сет состоящий из элементов присутствующих в первом сете, и отсутствующих во втором
     * @param {Set} set
     * @returns {Set}
     */
    difference(set) {
        let items = [...this._items].filter(item => !set.has(item));

        return new Set(...items);
    }

    /**
     * Возвращает `true` если сет содержит в себе все элементы из другого сета
     * @param {Set} set
     * @returns {boolean}
     */
    isSubset(set) {
        if (this.size > set.size) return false;

        for (let i = 0; i < this.size - 1; i++) {
            if (!this.has(set.values[i])) return false;
        }

        return true;
    }
}

module.exports = Set;
