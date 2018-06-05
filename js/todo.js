export default class Todo {
    constructor({
        text = '',
        isCompleted = false,
        id = Math.random()
            .toString(36)
            .substr(2, 9)
    }) {
        this.text = text;
        this.id = id;
        this.isCompleted = isCompleted;
    }
}
