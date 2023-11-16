import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import * as helper from '../helpers/game-deck.helper';
import * as hook from './player.hook';
import { useGameDeck } from './game-deck.hook';

const addCardMock = jest.fn();
const addPointMock = jest.fn();

describe('useGameDeck(cards)', () => {
    describe('getNewCards()', () => {
        it('should return empty array if cards are empty', () => {
            const { result } = renderHook(() => useGameDeck([]));
            let newCards = [];

            act(() => {
                result.current.setRound(1);
                newCards = result.current.getNewCards();
            })

            expect(newCards.length).toBe(0);
        });

        it('should set isDeckEmpty flag if next pair of cards are out of range based on round', () => {
            const cards = [{ crew: 1 }, { crew: 2 }, { crew: 3 }]
            const { result } = renderHook(() => useGameDeck(cards));

            act(() => {
                result.current.setRound(2);
                result.current.getNewCards();
            })

            expect(result.current.isDeckEmpty).toBe(true);
        });

        it('should return next pair of cards based on round', () => {
            const cards = [{ crew: 1 }, { crew: 2 }, { crew: 3 }, { crew: 4 }]
            const { result } = renderHook(() => useGameDeck(cards));
            let newCards: any[] = [];

            act(() => {
                result.current.setRound(1);
            })
            act(() => {
                newCards = result.current.getNewCards();
            })

            expect(JSON.stringify(newCards)).toBe(JSON.stringify([{ crew: 3 }, { crew: 4 }]));
        });
    });

    describe('nextRound()', () => {
        it('should add new cards to players hand', () => {
            jest.spyOn(hook, 'usePlayers').mockReturnValue(({
                players: [],
                addCard: addCardMock,
                addPoint: addPointMock,
            }))

            const cards = [{ crew: 1 }, { crew: 2 }, { crew: 3 }, { crew: 4 }]
            const { result } = renderHook(() => useGameDeck(cards));

            act(() => {
                result.current.setRound(0);
            })
            act(() => {
                result.current.nextRound();
            })

            act(() => {
                result.current.setRound(1);
            })
            act(() => {
                result.current.nextRound();
            })

            expect(addCardMock).toBeCalledTimes(4);
        });
        it('should increment points for player who has biggest crew value if draw all players gain points', () => {
            jest.spyOn(hook, 'usePlayers').mockReturnValue(({
                players: [],
                addCard: addCardMock,
                addPoint: addPointMock,
            }))
            jest.spyOn(helper, 'reduceToWinner').mockReturnValue(([
                [1, { crew: 2 }],
                [2, { crew: 2 }]
            ]))

            const cards = [{ crew: 1 }, { crew: 2 }, { crew: 3 }, { crew: 4 }]
            const { result } = renderHook(() => useGameDeck(cards));

            act(() => {
                result.current.setRound(0);
            })
            act(() => {
                result.current.nextRound();
            })

            expect(addPointMock).toBeCalledTimes(2);
        });
    });
});
