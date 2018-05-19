export default class App {
    /**
     * @param {HTMLElement} element
     * @param {Quiz} quiz
     */
    constructor(element, quiz) {
        this.element = element;
        this.quiz = quiz;
        this.score = 0;
        this.questionElement;
        this.answersElement;
        this.progressElement;
        this.scoreElement;

        this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);

        this.init();
    }

    /**
     * Инициализирует объект.
     *
     * Получает доступ к DOM-элементам, устанавливает заголовок и подписывается на событие при выборе ответа.
     */
    init() {
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
        let selectedAnswer = event.target.textContent;

        if (this.quiz.checkAnswer(selectedAnswer)) {
            this.score += 1;
        }

        this.quiz.questionIndex += 1;
        this.displayNext();
    }

    /**
     * Отображает следующий вопрос или отображает результат если тест заверешен.
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
        while (this.answersContainer.firstChild) {
            this.answersContainer.removeChild(this.answersContainer.firstChild);
        }

        this.quiz.currentQuestion.answers.forEach(answer => {
            let answerElement = document.createElement('li');

            answerElement.classList.add(
                'list-group-item',
                'list-group-item-action'
            );
            answerElement.textContent = answer;

            this.answersContainer.appendChild(answerElement);
        });
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
        this.scoreElement.textContent = `Правильных ответов: ${this.score}`;
    }
}
