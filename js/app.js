export default class App {
    /**
     * @param {HTMLElement} element
     * @param {Quiz} quiz
     */
    constructor(element, quiz) {
        this.element = element;
        this.quiz = quiz;
        this.questionElement;
        this.answersElement;
        this.progressElement;
        this.scoreElement;

        this.init();
    }

    /**
     * Инициализирует объект.
     *
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на события.
     */
    init() {
        this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);

        this.questionElement = document.querySelector('#question');
        this.answersContainer = document.querySelector('#answers');
        this.progressElement = document.querySelector('#progress');
        this.scoreElement = document.querySelector('#score');

        document.querySelector('#title').textContent = this.quiz.title;

        this.answersContainer.addEventListener(
            'click',
            this.handleAnswerButtonClick
        );
    }

    /**
     * Обрабатывает событие при выборе ответа.
     *
     * @param {Event} event
     */
    handleAnswerButtonClick(event) {
        let selectedAnswer = event.target.id;

        this.quiz.checkAnswer(selectedAnswer);

        this.displayNext();
    }

    /**
     * Отображает следующий вопрос или результат, если тест заверешен.
     */
    displayNext() {
        if (!this.quiz.hasEnded) {
            this.displayQuestion();
            this.displayAnswers();
            this.displayProgress();
        } else {
            this.answersContainer.removeEventListener(
                'click',
                this.handleAnswerButtonClick
            );
            this.displayScore();
        }
    }

    /**
     * Отображает вопрос.
     */
    displayQuestion() {
        this.questionElement.innerHTML = this.quiz.currentQuestion.text;
    }

    /**
     * Отображает ответы.
     */
    displayAnswers() {
        let answers = this.quiz.currentQuestion.answers;
        let html = '';

        answers.forEach((answer, index) => {
            html += `<li id="${index}" class="list-group-item list-group-item-action">${answer}</li>`;
        });

        this.answersContainer.innerHTML = html;
    }

    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    displayProgress() {
        this.progressElement.textContent = `Вопрос ${this.quiz.questionIndex +
            1} из ${this.quiz.questions.length}`;
    }

    /**
     * Отображает результат теста.
     */
    displayScore() {
        this.scoreElement.textContent = `Правильных ответов: ${
            this.quiz.score
        }`;

        this.questionElement.textContent = '';
        this.answersContainer.innerHTML = `<h2 class="text-center">Тест завершен!</h2>`;
    }
}
