export default class TabBar {
    /**
     * Создает объект.
     * @param {{ element: HTMLElement, tabs: Tab[], onChange: Function }} args
     */
    constructor() {}

    /**
     * Инициализирует объект.
     * Устанавливает обработчик для обработки активации вкладки.
     * @private
     */
    init() {}

    /**
     * Возвращает HTML элемент.
     * @returns {HTMLElement}
     */
    get element() {}

    /**
     * Возвращает массив вкладок.
     * @returns {Tab[]}
     */
    get tabs() {}

    /**
     * Возвращает активную вкладку.
     * @returns {Tab}
     */
    get activeTab() {}

    /**
     * Возвращает индекс активной вкладки.
     * @returns {number}
     */
    get activeTabIndex() {}

    /**
     * Вызывается при активации вкладки.
     * Делает все вкладки кроме активной неактивными.
     * Вызывает функцию обратно вызова, отправляя туда активную вкладку.
     * @private
     * @param {Tab} activeTab
     */
    handleActivate() {}
}
