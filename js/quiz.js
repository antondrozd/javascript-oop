export default class Quiz {
    /**
     * @param {string} title
     * @param {Question[]} questions
     */
    constructor(title = '', questions = []) {
        this.title = title;
        this.questions = questions;
        this._selectedAnswers = [];
        this._questionIndex = 0;
        this._score = 0;

        this.onAnswer = this.onAnswer.bind(this);
    }

    /**
     * Возвращает общее количество вопросов.
     * 
     * @returns {number}
     */
    get questionsNumber() {
        return this.questions.length;
    }

    /**
     * Возвращает текущий вопрос.
     *
     * @returns {Question}
     */
    get currentQuestion() {
        return this.questions[this._questionIndex];
    }

    /**
     * Возвращает тип текущего вопроса.
     *
     * @returns {string}
     */
    get currentQuestionType() {
        return this.currentQuestion.type;
    }

    /**
     * Возвращает true/false в зависимости от того, закончился тест или нет.
     *
     * @returns {boolean}
     */
    get hasEnded() {
        return this._questionIndex === this.questions.length;
    }

    /**
     * Возвращает результат теста.
     *
     * @returns {number}
     */
    get score() {
        return this._score;
    }

    /**
     * Возвращает индекс текущего вопроса.
     *
     * @returns {number}
     */
    get questionIndex() {
        return this._questionIndex;
    }

    /**
     * Возвращает выбранный ответ
     *
     * @returns {*}
     */
    get selectedAnswers() {
        return this._selectedAnswers;
    }

    /**
     * Возвращает true/false в зависимости от того, выбран ли ответ.
     * 
     * @returns {boolean}
     */
    get isSomeAnswerSelected() {
        return Boolean(this.selectedAnswers.length);
    }

    /**
     * Проверяет правильность ответа, выбранного пользователем.
     */
    checkAnswer() {
        if (this.currentQuestion.isCorrectAnswer(this.selectedAnswers)) {
            this.incrementScore();
        }

        this.toNextQuestion();
    }

    /**
     * Переходит к следующему вопросу.
     */
    toNextQuestion() {
        this._questionIndex += 1;
        this._selectedAnswers = [];
    }

    /**
     * Увеличивает значение результата теста.
     */
    incrementScore() {
        this._score += 1;
    }

    /**
     * Обрабатывает выбор ответа.
     * 
     * @param {*} answer 
     */
    onAnswer(answer) {
        switch (this.currentQuestionType) {
            case 'single':
                this.selectSingleAnswer(answer);
                break;
            case 'multiple':
                if (!this.isAnswerSelected(answer)) {
                    this.selectAnswer(answer);
                } else {
                    this.deselectAnswer(answer);
                }
                break;
            case 'open':
                this.changeOpenAnswer(answer);
                break;
        }
    }

    /**
     * Добавляет ответ в массив выбранных ответов.
     *
     * @param {*} answer
     */
    selectAnswer(answer) {
        this._selectedAnswers.push(answer);
    }

    /**
     * Удаляет ответ из массива выбранных ответов.
     *
     * @param {*} answer
     */
    deselectAnswer(answer) {
        let answerIndex = this._selectedAnswers.indexOf(answer);

        this._selectedAnswers.splice(answerIndex, 1);
    }

    /**
     * Очищает массив выбранных ответов и добавляет текущий выбранный ответ.
     *
     * @param {*} answer
     */
    selectSingleAnswer(answer) {
        this._selectedAnswers = [answer];
    }

    /**
     * Очищает массив выбранных ответов и добавляет текущий введенный ответ.
     *
     * @param {string} answer
     */
    changeOpenAnswer(answer) {
        this._selectedAnswers = [answer];
    }

    /**
     * Проверяет, выбран ли уже переданный ответ.
     *
     * @param {*} answer
     * @returns {boolean}
     */
    isAnswerSelected(answer) {
        if (this._selectedAnswers.indexOf(answer) === -1) {
            return false;
        }

        return true;
    }
}
