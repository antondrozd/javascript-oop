export default class App {
    /**
     * @param {HTMLElement} element
     * @param {Quiz} quiz
     */
    constructor(element, quiz) {
        this.element = element;
        this.quiz = quiz;
        this.questionElement;
        this.progressElement;
        this.scoreElement;

        this.handleConfirmButtonClick = this.handleConfirmButtonClick.bind(
            this
        );

        this.init();
    }

    /**
     * Инициализирует объект.
     *
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие выбора ответа.
     */
    init() {
        this.questionElement = document.querySelector('#question');
        this.answersContainer = document.querySelector('#answers');
        this.progressElement = document.querySelector('#progress');
        this.confirmBtnElement = document.querySelector('#confirm');
        this.scoreElement = document.querySelector('#score');

        document.querySelector('#title').textContent = this.quiz.title;

        this.confirmBtnElement.addEventListener(
            'click',
            this.handleConfirmButtonClick
        );
    }

    /**
     * Обрабатывает событие подтверждения выбранного ответа.
     */
    handleConfirmButtonClick() {
        if (this.quiz.isSomeAnswerSelected) {
            this.quiz.checkAnswer();

            this.displayNext();
        }
    }

    /**
     * Отображает следующий вопрос. Если тест заверешен - отображает результат и отписывается от событий.
     */
    displayNext() {
        if (!this.quiz.hasEnded) {
            this.displayQuestion();
            this.displayAnswers();
            this.displayProgress();
        } else {
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
        this.answersContainer.innerHTML = '';

        let elements = this.quiz.currentQuestion.answersRenderer.render(
            this.quiz.onAnswer
        );

        elements.forEach(element => {
            this.answersContainer.appendChild(element);
        });
    }

    /**
     * Отображает прогресс ('Вопрос 1 из 5').
     */
    displayProgress() {
        this.progressElement.textContent = `Вопрос ${this.quiz.questionIndex +
            1} из ${this.quiz.questionsNumber}`;
    }

    /**
     * Отображает результат теста.
     */
    displayScore() {
        this.scoreElement.textContent = `Правильных ответов: ${
            this.quiz.score
        }`;

        this.questionElement.textContent = '';
        this.answersContainer.innerHTML = `<li class="list-group-item"><h2 class="text-center">Тест завершен!</h2></li>`;
        this.confirmBtnElement.remove();
    }
}
