import axios from 'axios';

import { fetchStarships } from './starship-services';

describe('fetchStarships()', () => {
    const data = {
        results: [
            {
                name: 'Name 1',
                model: 'Model 1',
                crew: '1,01',
            },
            {
                name: 'Name 1',
                model: 'Model 1',
                crew: 12,
            },
            {
                name: 'Name 1',
                model: 'Model 1',
                crew: '4',
            },
            {
                name: 'Name 1',
                model: 'Model 1',
                crew: '12-12',
            },
        ],
    }

    it('should call http request', async () => {
        const spy = jest.spyOn(axios, 'get')
            .mockResolvedValue({ data });

        await fetchStarships();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return formatted data', async () => {
        jest.spyOn(axios, 'get')
            .mockResolvedValue({ data });

        const result = await fetchStarships();
        expect(JSON.stringify(result)).toBe(JSON.stringify([
            {
                name: 'Name 1',
                model: 'Model 1',
                crew: 1,
            },
            {
                name: 'Name 1',
                model: 'Model 1',
                crew: 12,
            },
            {
                name: 'Name 1',
                model: 'Model 1',
                crew: 4,
            },
            {
                name: 'Name 1',
                model: 'Model 1',
                crew: 0,
            },
        ]));
    });
});
