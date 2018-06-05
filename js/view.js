import { createElement } from './helpers.js';

export default class View {
    constructor(model) {
        this.model = model;
        this.controller;

        this.init();
    }

    init() {
        this.todoForm = document.getElementById('todo-form');
        this.addInput = document.getElementById('add-input');
        this.todoList = document.getElementById('todo-list');

        this.todoForm.addEventListener('submit', this.handleAdd.bind(this));
    }

    initController(controller) {
        this.controller = controller;
    }

    handleAdd(event) {
        event.preventDefault();

        const value = this.addInput.value;

        if (value) {
            this.controller.addTodo(value);
        }
    }

    handleRemove(id) {
        this.controller.removeTodo(id);
    }

    handleEdit(id) {
        const todoItem = this._getTodoItem(id);

        if (!todoItem.classList.contains('editing')) {
            this.editTodo(id);
        } else {
            const input = todoItem.querySelector('.textfield');
            const text = input.value;
            this.controller.updateTodo(id, text);
        }
    }

    handleToggle(id) {
        this.controller.toggleTodoCompleted(id);
    }

    addTodoItem(todo) {
        const todoItem = this._createTodo(todo);

        this.todoList.appendChild(todoItem);

        this.addInput.value = '';
    }

    removeTodoItem(id) {
        const todoItem = this._getTodoItem(id);

        todoItem.remove();
    }

    toggleTodoItem(id) {
        const todoItem = this._getTodoItem(id);

        todoItem.classList.toggle('completed');
    }

    editTodo(id) {
        const todoItem = this._getTodoItem(id);
        const label = todoItem.querySelector('.title');
        const text = label.textContent;
        const input = todoItem.querySelector('.textfield');
        const btn = todoItem.querySelector('.edit');

        btn.textContent = 'Сохранить';

        todoItem.classList.add('editing');

        input.value = text;
        input.focus();
    }

    saveEditedTodo(id, text) {
        const todoItem = this._getTodoItem(id);
        const label = todoItem.querySelector('.title');
        const btn = todoItem.querySelector('.edit');

        btn.textContent = 'Изменить';

        label.textContent = text;

        todoItem.classList.remove('editing');
    }

    _createTodo({ id, text }) {
        const checkbox = createElement('input', {
            type: 'checkbox',
            className: 'checkbox'
        });
        const label = createElement('label', { className: 'title' }, text);
        const editInput = createElement('input', {
            type: 'text',
            className: 'textfield'
        });
        const editButton = createElement(
            'button',
            { className: 'edit' },
            'Изменить'
        );
        const deleteButton = createElement(
            'button',
            { className: 'delete' },
            'Удалить'
        );
        const listItem = createElement(
            'li',
            {
                className: 'todo-item',
                'data-id': id
            },
            checkbox,
            label,
            editInput,
            editButton,
            deleteButton
        );

        this._bindTodoEvents(listItem);

        return listItem;
    }

    _bindTodoEvents(todoElement) {
        const checkbox = todoElement.querySelector('.checkbox');
        const editButton = todoElement.querySelector('button.edit');
        const deleteButton = todoElement.querySelector('button.delete');

        const id = todoElement.getAttribute('data-id');

        checkbox.addEventListener('change', () => {
            this.handleToggle(id);
        });
        editButton.addEventListener('click', () => {
            this.handleEdit(id);
        });
        deleteButton.addEventListener('click', () => {
            this.handleRemove(id);
        });
    }

    _getTodoItem(id) {
        return this.todoList.querySelector(`[data-id="${id}"]`);
    }
}
