import React from 'react';

import { Button, CircularProgress } from '@mui/material';
import Card from './Card';

import { useGameDeck } from '../hooks/game-deck.hook';
import { useStarships } from '../hooks/starship-hook';

const NUMBER_OF_IMAGES = 9;

const App = () => {
    const {
        data: starships,
        getStarships,
        loading,
    } = useStarships();
    const { round, isDeckEmpty, players, nextRound } = useGameDeck(starships);

    React.useEffect(() => {
        if (isDeckEmpty) {
            getStarships();
        }
    }, [isDeckEmpty, getStarships]);

    return (
        <>
            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-evenly',
            }}>
                {players.map((player) => (
                    <React.Fragment key={player.id}>
                        <Card
                            title={player.hand[round - 1]?.name}
                            description={player.hand[round - 1]?.model}
                            points={player.points}
                            power={player.hand[round - 1]?.crew}
                            img={Math.floor((player.id + round) % NUMBER_OF_IMAGES)}
                        />
                    </React.Fragment>
                ))}
            </div>
            <Button
                sx={{ width: 200, height: 80, background: 'peru' }}
                onClick={() => nextRound()}
                component="label"
                variant="contained"
                disabled={loading}
            >
                {loading ? <CircularProgress sx={{ color: 'white' }} /> : 'Next round'}
            </Button>
        </>
    )
}

export default App;
