import Question from './question.js';

class SingleAnswerQuestion extends Question {
    /**
     * Проверяет правильность ответа
     * 
     * @returns {boolean}
     */
    isCorrectAnswer(answer) {
        return answer == this.correctAnswer;
    }
}

class MultipleAnswersQuestion extends Question {
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

class OpenAnswerQuestion extends Question {
    /**
     * Проверяет правильность ответа
     * 
     * @returns {boolean}
     */
    isCorrectAnswer(answer) {
        return answer === this.correctAnswer;
    }
}

export function createQuestion({ type, text, answers, correctAnswer }) {
    let props = {
        type,
        text,
        answers,
        correctAnswer
    };

    switch (type) {
        case 'single':
            return new SingleAnswerQuestion(props);
        case 'multiple':
            return new MultipleAnswersQuestion(props);
        case 'open':
            return new OpenAnswerQuestion(props);
    }
}