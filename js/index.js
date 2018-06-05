import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';
import Todo from './todo.js';

const model = new Model([
    new Todo({ text: 'Задача 1', isCompleted: true }),
    new Todo({ text: 'Задача 2', isCompleted: true }),
    new Todo({ text: 'Задача 3' })
]);
const view = new View(model);
const controller = new Controller(model, view);

view.initController(controller);
