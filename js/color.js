export default class Color {
    constructor(r, g, b) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }

    toString() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
}
