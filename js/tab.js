export default class Tab {
    /**
     * Создает вкладку.
     * @param {{ element: HTMLElement }} args
     */
    constructor({ element }) {
        this.element = element;
    }

    /**
     * Инициализирует объект.
     * Устанавливает свойство акивности вкладки.
     * Устанавливает обработчик для обработки нажатия на элемент.
     * @private
     */
    init() {}

    /**
     * Возвращает HTML элемент.
     * @returns {HTMLElement}
     */
    get element() {}

    /**
     * Возвращает ID вкладки.
     * ID вкладки берется из атрибута `hash` у элемента (`#panel-1` => `panel-1`)
     * @returns {string}
     */
    get id() {}

    /**
     * `get` - Возвращает `true` или `false` в зависимости от того активна вкладка или нет.
     *
     * `set` - Устанавливает активность вкладки, добавляя или удаляя соответствующий класс
     * @returns {boolean}
     */
    get isActive() {}
    set isActive(value) {}

    /**
     * Вызывается при нажатии на вкладку.
     *
     * Устанавливает активность вкладки.
     * Вызывает функцию обратного вызова, отправляя туда ссылку на текущий объект, т.е. саму вкладку.
     * @private
     * @param {Event} event
     */
    handleClick(event) {}
}
