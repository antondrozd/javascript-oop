import { EventEmitter } from './helpers.js';

export function createAnswersRenderer(type, answers) {
    switch (type) {
        case 'single':
            return new SingleAnswerRenderer(answers);
        case 'multiple':
            return new MultipleAnswersRenderer(answers);
        case 'open':
            return new OpenAnswerRenderer();
    }
}

class SingleAnswerRenderer extends EventEmitter {
    /**
     * @param {string[]} answers Варианты ответов
     */
    constructor(answers) {
        super();
        
        this.answers = answers;
        this.answersContainer = document.querySelector('#answers');
    }

    /**
     * Создает DOM-елементы вариантов ответов. Подписывается на событие выбора ответа и обрабатывает его. Возвращает массив с DOM-элементом.
     *
     * @param {Function} onAnswerSelect
     */
    render() {
        const elements = this.answers.map((answer, index) => {
            let li = document.createElement('li');

            li.classList.add('list-group-item', 'list-group-item-action');
            li.textContent = answer;

            li.addEventListener('click', ({ target }) => {
                this.answersContainer.childNodes.forEach(element =>
                    element.classList.remove('active')
                );

                this.emit('setAnswer', index);

                target.classList.add('active');
            });

            return li;
        });

        return elements;
    }
}

class MultipleAnswersRenderer extends EventEmitter {
    /**
     * @param {string[]} answers Варианты ответов
     */
    constructor(answers) {
        super();
        
        this.answers = answers;
    }

    /**
     * Создает DOM-елементы вариантов ответов. Подписывается на событие выбора ответа и обрабатывает его. Возвращает массив DOM-элементов.
     *
     * @param {Function} onAnswerSelect
     */
    render() {
        const elements = this.answers.map((answer, index) => {
            let li = document.createElement('li');

            li.classList.add('list-group-item', 'list-group-item-action');
            li.textContent = answer;

            li.addEventListener('click', ({ target }) => {
                this.emit('setAnswer', index);

                target.classList.toggle('active');
            });

            return li;
        });

        return elements;
    }
}

class OpenAnswerRenderer extends EventEmitter {
    /**
     * Создает DOM-елемент поля для ответа. Подписывается на событие ввода ответа и обрабатывает его. Возвращает массив с DOM-элементом.
     *
     * @param {Function} onAnswerSelect
     */
    render() {
        let li = document.createElement('li');

        li.classList.add('list-group-item');

        let input = document.createElement('input');

        input.id = 'open-answer';
        input.type = 'text';
        input.classList.add('form-control');

        input.addEventListener('input', () => {
            this.emit('setAnswer', input.value);
        });

        li.appendChild(input);

        return [li];
    }
}
