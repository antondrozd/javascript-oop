import App from './app.js';
import Quiz from './quiz.js';
import Question from './question.js';

const questions = [
    {
        text: 'Какой способ создает объект?',
        answers: [
            'new { x = 1, y = 2 }',
            '{ x: 1, y: 2 }',
            '{ x = 1, y = 2 }',
            'new { x: 1, y: 2 }'
        ],
        correctAnswer: 1
    },
    {
        text: 'Какой из способов создает копию массива?',
        answers: [
            'let newArray = oldArray;',
            'let newArray = oldArray.slice(0);',
            'let newArray = [oldArray];',
            'let newArray = new Array(oldArray);'
        ],
        correctAnswer: 1
    },
    {
        text: 'Что отобразится в консоле?<br><br>console.log(typeof [1,2])',
        answers: ['string', 'array', 'object', 'number'],
        correctAnswer: 2
    },
    {
        text:
            'Что будет результатом выражения?<br><br>new Boolean(new Boolean(false)).valueOf()',
        answers: ['true', 'false', 'undefined'],
        correctAnswer: 0
    },
    {
        text: 'Что такое замыкание?',
        answers: [
            'Совокупность объекта, функции и переменной в локальной области видимости.',
            'Совокупность объекта, функции и переменной в глобальной области видимости.',
            'Способ определения длительности жизни переменной',
            'Совокупность функции и лексичесокй среды в который функция была объявлена.',
            'ХЗ 0_o'
        ],
        correctAnswer: 3
    }
];

const root = document.querySelector('#app');

const quiz = new Quiz(
    'JS Quiz',
    questions.map(q => new Question(q.text, q.answers, q.correctAnswer))
);

const app = new App(root, quiz);

app.displayNext();
