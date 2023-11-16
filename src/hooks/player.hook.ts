import React, { useCallback } from 'react';

type Action = {
    type: 'ADD_CARD' | 'ADD_POINTS';
    payload: any;
}

export type Player<T> = {
    hand: Array<T>;
    id: number;
    points: number;
}

const reducer = <T>(state: Array<Player<T>>, action: Action) => {
    switch (action.type) {
        case 'ADD_CARD': {
            return state.map((player: any) => (
                player.id === action.payload.playerId ?
                    ({ ...player, hand: [...player.hand, action.payload.card] }) :
                    player
            ));
        }
        case 'ADD_POINTS': {
            return state.map((player: any) => (
                player.id === action.payload.playerId ?
                    ({ ...player, points: player.points + 1 }) :
                    player
            ));
        }
        default:
            return [];
    }
}

export const usePlayers = <T>(n: number) => {
    const [players, dispatch] = React.useReducer(
        reducer<T>,
        Array.from({ length: n }, (_, idx) => ({
            hand: [],
            id: idx,
            points: 0,
        })),
    );

    const addCard = useCallback((playerId: number, card: T) => {
        dispatch({
            type: 'ADD_CARD',
            payload: {
                playerId,
                card,
            },
        });
    }, [dispatch])

    const addPoint = useCallback((playerId: number) => {
        dispatch({
            type: 'ADD_POINTS',
            payload: {
                playerId,
            },
        });
    }, [dispatch])

    return {
        players: players as Array<Player<T>>,
        addCard,
        addPoint,
    }
}
