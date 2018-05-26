import Question from './question.js';

export class SingleAnswerQuestion extends Question {
    /**
     * Проверяет правильность ответа
     * 
     * @returns {boolean}
     */
    isCorrectAnswer(answer) {
        return answer == this.correctAnswer;
    }
}

export class MultipleAnswersQuestion extends Question {
    /**
     * Проверяет правильность ответа
     * 
     * @returns {boolean}
     */
    isCorrectAnswer(answer) {
        if (answer.length !== this.correctAnswer.length) return false;

        for (let i = 0; i < answer.length; i++) {
            if (this.correctAnswer.indexOf(+answer[i]) === -1) return false;
        }

        return true;
    }
}

export class OpenAnswerQuestion extends Question {
    /**
     * Проверяет правильность ответа
     * 
     * @returns {boolean}
     */
    isCorrectAnswer(answer) {
        return answer === this.correctAnswer;
    }
}
