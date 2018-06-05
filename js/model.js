export default class Model {
    constructor(todos = []) {
        this._todos = todos;
    }

    addTodo(todo) {
        this._todos.push(todo);
    }

    removeTodo(id) {
        const todo = this._getTodo(id);
        const index = this._todos.indexOf(todo);

        if (index > -1) {
            this._todos.splice(index, 1);
        }
    }

    toggleTodoCompleted(id) {
        const todo = this._getTodo(id);

        todo.isCompleted = !todo.isCompleted;
    }

    updateTodo(id, text) {
        const todo = this._getTodo(id);

        todo.text = text;
    }

    _getTodo(id) {
        return this._todos.find(todo => todo.id == id);
    }
}
