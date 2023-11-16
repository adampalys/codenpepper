import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { usePlayers } from './player.hook'

describe('usePlayers(n)', () => {
    it('should generate players array', () => {
        const { result } = renderHook(() => usePlayers(2));
        
        expect(result.current.players.length).toBe(2);
    })
    describe('addCard(playerId, card)', () => {
        it('should push card to player hand', () => {
            const { result } = renderHook(() => usePlayers(2));

            expect(result.current.players[0].hand.length).toBe(0);
            expect(result.current.players[1].hand.length).toBe(0);

            act(() => {
                result.current.addCard(0, {});
                result.current.addCard(0, {});
                result.current.addCard(1, {});
            });

            expect(result.current.players[0].hand.length).toBe(2);
            expect(result.current.players[1].hand.length).toBe(1);
        });
    });

    describe('addPoint(playerId)', () => {
        it('should increase player points', () => {
            const { result } = renderHook(() => usePlayers(2));

            expect(result.current.players[0].hand.length).toBe(0);
            expect(result.current.players[1].hand.length).toBe(0);

            act(() => {
                result.current.addPoint(0);
                result.current.addPoint(0);
                result.current.addPoint(0);
                result.current.addPoint(1);
                result.current.addPoint(1);
            });

            expect(result.current.players[0].points).toBe(3);
            expect(result.current.players[1].points).toBe(2);
        })
    });
});
