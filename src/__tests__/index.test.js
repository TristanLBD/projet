const { add, multiply } = require('../index');

describe('Fonctions mathématiques', () => {
    test('add devrait retourner la somme de deux nombres', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
    });

    test('multiply devrait retourner le produit de deux nombres', () => {
        expect(multiply(2, 3)).toBe(6);
        expect(multiply(-2, 3)).toBe(-6);
        expect(multiply(0, 5)).toBe(0);
    });
});

describe('Tests d\'intégration', () => {
    test('add et multiply devraient fonctionner ensemble', () => {
        const result1 = add(2, 3);
        const result2 = multiply(result1, 2);
        expect(result2).toBe(10);
    });
});
