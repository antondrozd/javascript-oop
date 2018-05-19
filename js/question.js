export default class Question {
    /**
     * @param {string} text Текст вопроса
     * @param {string[]} answers Варианты ответов
     * @param {number} correctAnswer Индекс правильного ответа
     */
    constructor(text = '', answers = [], correctAnswer) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    /**
     * Проверяет правильность ответа.
     * 
     * @param {number} answer
     * @returns {boolean}
     */
    isCorrectAnswer(answer) {
        return answer === this.answers[this.correctAnswer];
    }
}