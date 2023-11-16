import React from 'react';

import { reduceToWinner } from '../helpers/game-deck.helper';
import { usePlayers } from './player.hook';

const NUMBER_OF_PLAYERS = 2;

export const useGameDeck = <T extends { crew: number }>(cards: Array<T>) => {
    const [isDeckEmpty, setEmptyDeckFlag] = React.useState(true);
    const [round, setRound] = React.useState(0);
    const { players, addCard, addPoint } = usePlayers<T>(NUMBER_OF_PLAYERS);

    React.useEffect(() => {
        setEmptyDeckFlag(false);
    }, [cards]);

    const getNewCards = () => {
        if (!cards.length) {
            return [];
        }

        const index = round % Math.floor((cards.length / NUMBER_OF_PLAYERS));

        if (NUMBER_OF_PLAYERS * index + NUMBER_OF_PLAYERS + NUMBER_OF_PLAYERS > cards.length) {
            setEmptyDeckFlag(true)
        }

        return cards.slice(index * NUMBER_OF_PLAYERS, NUMBER_OF_PLAYERS * (index + 1))
    }

    const nextRound = () => {
        const playerCardGroup = getNewCards()
            .map((card, index): [number, T] => {
                const player = index % NUMBER_OF_PLAYERS;
                addCard(index % NUMBER_OF_PLAYERS, card);

                return [player, card];
            });

        reduceToWinner(playerCardGroup)
            .forEach(([player]) => {
                addPoint(player);
            });

        setRound(round + 1);
    }

    return {
        isDeckEmpty,
        players,
        round,
        setRound,
        getNewCards,
        nextRound,
    }
}
