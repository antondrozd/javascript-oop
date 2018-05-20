export default class Quiz {
    /**
     * @param {string} title 
     * @param {Question[]} questions 
     */
    constructor(title = '', questions = []) {
        this.title = title;
        this.questions = questions;
        this._questionIndex = 0;
        this._score = 0;
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
     * Возвращает `true/false` в зависимости от того закончился тест или нет.
     * 
     * @returns {boolean}
     */
    get hasEnded() {
        return this._questionIndex === this.questions.length;
    }

    get score() {
        return this._score;
    }

    get questionIndex() {
        return this._questionIndex;
    }

    /**
     * Проверяет правильность ответа выбранного пользователем.
     * @param {*} answer 
     */
    checkAnswer(answer) {
        return this.currentQuestion.isCorrectAnswer(answer);
    }

    nextQuestion() {
        this._questionIndex += 1;
    }

    incrementScore() {
        this._score += 1;
    }
}