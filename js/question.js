import { createAnswersRenderer } from './answers-renderer.js';

export default class Question {
    /**
     * @param {string} type Тип вопроса
     * @param {string} text Текст вопроса
     * @param {string[]} answers Варианты ответов
     * @param {*} correctAnswer Правильный ответ
     */
    constructor({ type, text = '', answers = [], correctAnswer }) {
        this.type = type;
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.answersRenderer = createAnswersRenderer(type, this.answers);
    }
}
