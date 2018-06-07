import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

const model = new Model({
    gridSize: 36
});
const view = new View(model);
const controller = new Controller(model, view);

view.initController(controller);

model.init();