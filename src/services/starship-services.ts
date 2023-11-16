import axios from 'axios';

export type Starship = {
    crew: number;
    model: string;
    name: string;
}

const STARSHIPS_ENDPOINT = 'https://swapi.dev/api/starships';
let next: string | null = null;

export const fetchStarships = async (): Promise<Starship[]> => {
    const { data } = await axios.get(next || STARSHIPS_ENDPOINT);

    next = data.next || null;

    return data.results.map(
        (starship: Record<string, unknown>) => ({
            name: starship.name,
            model: starship.model,
            crew: Math.floor(Number(`${starship.crew}`.replace(',', '.'))) || 0,
        })
    );
}
