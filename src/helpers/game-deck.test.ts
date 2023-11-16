import { reduceToWinner } from './game-deck.helper';

describe('#reduceToWinner()', () => {
    it('should return array with one element with object which has higest crew value', () => {
        const result = reduceToWinner(
            [
                [1, { crew: 1 }],
                [2, { crew: 2 }],
                [3, { crew: 3 }],
                [4, { crew: 4 }],
            ]
        );

        expect(JSON.stringify(result)).toBe(JSON.stringify([[4, { crew: 4 }]]))
    });

    it('should return array with many elements if crew has same value', () => {
        const result = reduceToWinner(
            [
                [1, { crew: 1 }],
                [2, { crew: 2 }],
                [3, { crew: 2 }],
                [4, { crew: 2 }],
            ]
        );

        expect(result.length).toBe(3);
    });
});