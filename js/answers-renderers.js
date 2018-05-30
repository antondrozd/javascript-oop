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

class SingleAnswerRenderer {
    /**
     * @param {string[]} answers Варианты ответов
     */
    constructor(answers) {
        this.answers = answers;
        this.answersContainer = document.querySelector('#answers');
    }

    /**
     * Создает DOM-елементы вариантов ответов. Подписывается на событие выбора ответа и обрабатывает его. Возвращает массив с DOM-элементом.
     * 
     * @param {Function} onAnswerSelect 
     */
    render(onAnswerSelect) {
        const elements = this.answers.map((answer, index) => {
            let li = document.createElement('li');

            li.classList.add('list-group-item', 'list-group-item-action');
            li.textContent = answer;

            li.addEventListener('click', ({ target }) => {
                this.answersContainer.childNodes.forEach(
                    element => element.classList.remove('active')
                );

                onAnswerSelect(index);

                target.classList.add('active');
            });

            return li;
        });

        return elements;
    }
}

class MultipleAnswersRenderer {
    /**
     * @param {string[]} answers Варианты ответов
     */
    constructor(answers) {
        this.answers = answers;
    }

    /**
     * Создает DOM-елементы вариантов ответов. Подписывается на событие выбора ответа и обрабатывает его. Возвращает массив DOM-элементов.
     * 
     * @param {Function} onAnswerSelect 
     */
    render(onAnswerSelect) {
        const elements = this.answers.map((answer, index) => {
            let li = document.createElement('li');

            li.classList.add('list-group-item', 'list-group-item-action');
            li.textContent = answer;

            li.addEventListener('click', ({ target }) => {
                onAnswerSelect(index);

                target.classList.toggle('active');
            });

            return li;
        });

        return elements;
    }
}

class OpenAnswerRenderer {
    /**
     * Создает DOM-елемент поля для ответа. Подписывается на событие ввода ответа и обрабатывает его. Возвращает массив с DOM-элементом.
     * 
     * @param {Function} onAnswerSelect 
     */
    render(onAnswerChange) {
        let li = document.createElement('li');

        li.classList.add('list-group-item');

        let input = document.createElement('input');

        input.id = 'open-answer';
        input.type = 'text';
        input.classList.add('form-control');

        input.addEventListener('input', () => {
            onAnswerChange(input.value);
        });

        li.appendChild(input);

        return [li];
    }
}
