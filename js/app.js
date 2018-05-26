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
        this.handleAnswerOptionClick = this.handleAnswerOptionClick.bind(this);
        this.handleConfirmButtonClick = this.handleConfirmButtonClick.bind(this);

        this.questionElement = document.querySelector('#question');
        this.answersContainer = document.querySelector('#answers');
        this.progressElement = document.querySelector('#progress');
        this.confirmBtnElement = document.querySelector('#confirm');
        this.scoreElement = document.querySelector('#score');

        document.querySelector('#title').textContent = this.quiz.title;

        this.answersContainer.addEventListener(
            'click',
            this.handleAnswerOptionClick
        );
        this.confirmBtnElement.addEventListener(
            'click',
            this.handleConfirmButtonClick
        );
    }

    /**
     * Обрабатывает событие при выборе ответа.
     *
     * @param {Event} event
     */
    handleAnswerOptionClick(event) {
        let answer = event.target.id;

        if (!this.quiz.isAnswerSelected(answer)) {
            this.quiz.selectAnswer(answer);
        } else {
            this.quiz.deselectAnswer(answer);
        }
    }

    /**
     * Обрабатывает событие подтверждения выбранного ответа.
     */
    handleConfirmButtonClick() {
        this.quiz.checkAnswer();

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
                this.handleAnswerOptionClick
            );

            this.confirmBtnElement.removeEventListener(
                'click',
                this.handleConfirmButtonClick
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
        let html = this.quiz.currentQuestion.answersRenderer.getHTML();

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
