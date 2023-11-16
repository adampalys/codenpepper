import React from 'react';

import { type Starship, fetchStarships } from '../services/starship-services';

export const useStarships = () => {
    const [data, setData] = React.useState<Starship[]>([]);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const getStarships = React.useCallback(async () => {
        setError(false);
        setLoading(true);

        try {
            const starships = await fetchStarships();
            setData(starships);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [])

    return { data, error, loading, getStarships }
}
