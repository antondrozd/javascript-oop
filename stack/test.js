const Stack = require('./');

describe('Stack', () => {
    describe('Stack.constructor()', () => {
        test('возвращает объект типа `Stack`', () => {
            expect(new Stack()).toBeInstanceOf(Stack);
        });

        test('принимает элементы для добавления в стопку', () => {
            let stack = new Stack(1, 2, 3);

            expect(stack.size).toBe(3);
        });
    });

    describe('Stack.size', () => {
        test('возвращает количество элементов в стопке', () => {
            let stack = new Stack(1, 2, 3);

            expect(stack.size).toBe(3);
        });
    });

    describe('Stack.isEmpty', () => {
        test('возвращает `true` если стопка пустая', () => {
            let stack = new Stack();

            expect(stack.isEmpty).toBe(true);
        });

        test('возвращает `false` если стопка не пустая', () => {
            let stack = new Stack(1, 2, 3);

            expect(stack.isEmpty).toBe(false);
        });
    });

    describe('Stack.push()', () => {
        test('добавляет элемент в конец стопки', () => {
            let stack = new Stack();

            stack.push(1);
            stack.push(2);
            stack.push(3);

            expect(stack.size).toBe(3);
        });
    });

    describe('Stack.pop()', () => {
        test('удаляет последний элемент из стопки', () => {
            let stack = new Stack();

            stack.push(1);
            stack.push(2);
            stack.push(3);

            stack.pop();

            expect(stack.size).toBe(2);
        });

        test('возвращает последний элемент в стопке', () => {
            let stack = new Stack();

            stack.push(1);
            stack.push(2);
            stack.push(3);

            let item = stack.pop();

            expect(item).toBe(3);
        });
    });

    describe('Stack.push()', () => {
        test('возвращает последний элемент в стопке не удаляя его', () => {
            let stack = new Stack();

            stack.push(1);
            stack.push(2);
            stack.push(3);

            let item = stack.peek();

            expect(stack.size).toBe(3);
            expect(item).toBe(3);
        });
    });
});
