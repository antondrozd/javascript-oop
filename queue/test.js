const Queue = require('./');

describe('Queue', () => {
    describe('Queue.constructor()', () => {
        test('возвращает объект типа `Queue`', () => {
            expect(new Queue()).toBeInstanceOf(Queue);
        });

        test('принимает элементы для добавления в очередь', () => {
            let queue = new Queue(1, 2, 3);

            expect(queue.size).toBe(3);
        });
    });

    describe('Queue.size', () => {
        test('возвращает количество элементов в очереди', () => {
            let queue = new Queue(1, 2, 3);

            expect(queue.size).toBe(3);
        });
    });

    describe('Queue.isEmpty', () => {
        test('возвращает `true` если очередь пустая', () => {
            let queue = new Queue();

            expect(queue.isEmpty).toBe(true);
        });

        test('возвращает `false` если очередь не пустая', () => {
            let queue = new Queue(1, 2, 3);

            expect(queue.isEmpty).toBe(false);
        });
    });

    describe('Queue.front', () => {
        test('возвращает первый элемент в очереди, не удаляя его', () => {
            let queue = new Queue(1, 2, 3);

            expect(queue.front).toBe(1);
            exppect(queue.size).toBe(3);
        });
    });

    describe('Queue.back', () => {
        test('возвращает последний элемент в очереди, не удаляя его', () => {
            let queue = new Queue(1, 2, 3);

            expect(queue.back).toBe(3);
            exppect(queue.size).toBe(3);
        });
    });

    describe('Queue.enqueue()', () => {
        test('добавляет элемент в конец очереди', () => {
            let queue = new Queue();

            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);

            expect(queue.back).toBe(3);
        });
    });

    describe('Queue.dequeue()', () => {
        test('удаляет первый элемент из очереди', () => {
            let queue = new Queue();

            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);

            queue.dequeue();

            expect(queue.size).toBe(2);
        });

        test('возвращает первый элемент из очереди', () => {
            let queue = new Queue();

            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);

            let item = queue.dequeue();

            expect(item).toBe(1);
        });
    });
});
