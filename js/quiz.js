export default class Quiz {
    /**
     * @param {string} title 
     * @param {Question[]} questions 
     */
    constructor(title = '', questions = []) {
        this.title = title;
        this.questions = questions;
        this.questionIndex = 0;
    }

    /**
     * Возвращает текущий вопрос.
     * 
     * @returns {Question}
     */
    get currentQuestion() {
        return this.questions[this.questionIndex];
    }

    /**
     * Возвращает `true/false` в зависимости от того закончился тест или нет.
     * 
     * @returns {boolean}
     */
    get hasEnded() {
        return this.questionIndex === this.questions.length;
    }

    /**
     * Проверяет правильность ответа выбранного пользователем.
     * @param {*} answer 
     */
    checkAnswer(answer) {
        return this.currentQuestion.isCorrectAnswer(answer);
    }
}