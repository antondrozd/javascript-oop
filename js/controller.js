import Todo from './todo.js';

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    addTodo(text) {
        const todo = new Todo({ text });

        this.model.addTodo(todo);
        this.view.addTodoItem(todo);
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        this.view.removeTodoItem(id);
    }

    updateTodo(id, text) {
        this.model.updateTodo(id, text);
        this.view.saveEditedTodo(id, text);
    }

    toggleTodoCompleted(id) {
        this.model.toggleTodoCompleted(id);
        this.view.toggleTodoItem(id);
    }
}
