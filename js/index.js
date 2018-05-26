import App from './app.js';
import Quiz from './quiz.js';
import {
    SingleAnswerQuestion,
    MultipleAnswerQuestion,
    OpenAnswerQuestion
} from './questions.js';

const questions = [
    {
        type: 'multiple',
        text: 'Какие способы создают объект?',
        answers: [
            'new { x = 1, y = 2 }',
            '{ x: 1, y: 2 }',
            '{ x = 1, y = 2 }',
            'Object({ x: 1 })',
            'new { x: 1, y: 2 }',
            'Object.create(null)'
        ],
        correctAnswer: [1, 3, 5]
    },
    {
        type: 'single',
        text: 'Какой из способов создает копию массива?',
        answers: [
            'let newArray = oldArray;',
            'let newArray = oldArray.slice();',
            'let newArray = [oldArray];',
            'let newArray = new Array(oldArray);',
            'let newArray = oldArray.copy();'
        ],
        correctAnswer: 1
    },
    {
        type: 'single',
        text: 'Что отобразится в консоле?<br><br>console.log(typeof [1,2])',
        answers: ['string', 'array', 'object', 'number', 'undefined'],
        correctAnswer: 2
    },
    {
        type: 'single',
        text:
            'Что будет результатом выражения?<br><br>new Boolean(new Boolean(false)).valueOf()',
        answers: ['true', 'false', '"true"', '"false"', 'undefined'],
        correctAnswer: 0
    },
    {
        type: 'open',
        text:
            'Как называется совокупность функции и лексичесокй среды в который функция была объявлена?',
        correctAnswer: 'Замыкание'
    }
];

const root = document.querySelector('#app');

const quiz = new Quiz(
    'JS Quiz',
    questions.map(({ type, text, answers, correctAnswer }) => {
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
                return new MultipleAnswerQuestion(props);
            case 'open':
                return new OpenAnswerQuestion(props);
        }
    })
);

const app = new App(root, quiz);

app.displayNext();
