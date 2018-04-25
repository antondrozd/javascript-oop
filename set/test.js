const Set = require('./');

describe('Set', () => {
    describe('Set.constructor()', () => {
        test('возвращает объект типа `Set`', () => {
            expect(new Set()).toBeInstanceOf(Set);
        });

        test('принимает элементы для добавления', () => {
            let set = new Set(1, 2, 3);

            expect(set.values).toEqual([1, 2, 3]);
        });

        test('добавляет только уникальные элементы', () => {
            let set = new Set(1, 2, 2);

            expect(set.values).toEqual([1, 2]);
        });
    });

    describe('Set.size', () => {
        test('возвращает количество элементов', () => {
            let set = new Set(1, 2);

            expect(set.size).toBe(2);
        });
    });

    describe('Set.values', () => {
        test('возвращает массив элементов', () => {
            let set = new Set(1, 2);

            expect(set.values).toEqual([1, 2]);
        });
    });

    describe('Set.has()', () => {
        let set;

        beforeEach(() => (set = new Set()));

        test('возвращает `false` если элемента нет', () => {
            expect(set.has(1)).toBe(false);
        });

        test('возвращает `true` если элемент есть', () => {
            set.add(1);

            expect(set.has(1)).toBe(true);
        });
    });

    describe('Set.add()', () => {
        let set;

        beforeEach(() => (set = new Set()));

        test('добавляет элемент', () => {
            set.add(1);

            expect(set.has(1)).toBe(true);
        });

        test('не добавляет элемент, если он уже там есть', () => {
            set.add(1);
            set.add(1);

            expect(set.size).toBe(1);
        });
    });

    describe('Set.remove()', () => {
        let set;

        beforeEach(() => (set = new Set(1, 2)));

        test('удаляет элемент', () => {
            set.remove(2);

            expect(set.size).toBe(1);
        });

        test('возвращает `true` если элемент был удален', () => {
            expect(set.remove(2)).toBe(true);
        });

        test('возвращает `false` если элемент не был удален', () => {
            expect(set.remove(3)).toBe(false);
        });
    });

    describe('Set.clear()', () => {
        test('удаляет все элементы', () => {
            let set = new Set(1, 2);

            set.clear();

            expect(set.size).toBe(0);
        });
    });

    describe('Set.union()', () => {
        test('возращает сет состоящий из элементов двух сетов', () => {
            let set1 = new Set(1, 2, 3);
            let set2 = new Set(4, 5, 6);
            let unionSet = set1.union(set2);

            expect(unionSet.values).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });

    describe('Set.intersection()', () => {
        test('возращает сет состоящий из элементов которые присутствуют в обоих сетах', () => {
            let set1 = new Set(1, 2, 3);
            let set2 = new Set(3, 4, 5);
            let intersectionSet = set1.intersection(set2);

            expect(intersectionSet.values).toEqual([3]);
        });
    });

    describe('Set.difference()', () => {
        test('возращает сет состоящий из элементов присутствующих в первом сете, и отсутствующих во втором', () => {
            let set1 = new Set(1, 2, 3);
            let set2 = new Set(3, 4, 5);
            let differenceSet = set1.difference(set2);

            expect(differenceSet.values).toEqual([1, 2]);
        });
    });

    describe('Set.isSubset()', () => {
        test('возвращает `true` если сет содержит в себе все элементы из друого сета', () => {
            let set1 = new Set(1, 2, 3);
            let set2 = new Set(1, 2, 3, 4, 5);
            let isSubset = set1.isSubset(set2);

            expect(isSubset).toBe(true);
        });

        test('возвращает `false` если сет больше другого сета', () => {
            let set1 = new Set(1, 2, 3, 4, 5);
            let set2 = new Set(1, 2, 3);
            let isSubset = set1.isSubset(set2);

            expect(isSubset).toBe(false);
        });

        test('возвращает `false` если сет не содержит в себе все элементы из друого сета', () => {
            let set1 = new Set(1, 2, 3);
            let set2 = new Set(3, 4, 5, 6, 7);
            let isSubset = set1.isSubset(set2);

            expect(isSubset).toBe(false);
        });
    });
});
