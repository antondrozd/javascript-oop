const EventEmitter = require('../event-emitter');

class Element extends EventEmitter {
    /**
     * @param {{ tag: string, id: string, className: string }} args
     */
    constructor({ tag, id, className = '' }) {
        super();

        this.tag = tag;
        this.id = id;
        this._className = className;
    }

    /**
     * Возвращает строку с названиями CSS классов.
     *
     * @returns {string}
     */
    get className() {
        return this._className;
    }

    /**
     * Добавляет CSS класс.
     *
     * @param {string} className
     */
    addClass(className) {
        if (!this.hasClass(className)) {
            if (this._className) {
                this._className += ` ${className}`;
            } else {
                this._className = className;
            }
        }
    }

    /**
     * Удаляет CSS класс.
     *
     * @param {string} className
     */
    removeClass(className) {
        this._className = this._className
            .replace(className, '')
            .replace('  ', ' ')
            .trim();
    }

    /**
     * Возращает `true` или `false` в зависимости от начилия CSS класса.
     *
     * @param {string} className
     * @returns {boolean}
     */
    hasClass(className) {
        return this._className.includes(className);
    }

    /**
     * Добавляет или удаляет CSS класс в зависимости от его наличия.
     *
     * @param {string} className
     */
    toggleClass(className) {
        if (this.hasClass(className)) {
            this.removeClass(className);
        } else {
            this.addClass(className);
        }
    }
}

module.exports = Element;
