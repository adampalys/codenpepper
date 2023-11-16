import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import * as service from '../services/starship-services';
import { useStarships } from './starship-hook';

describe('useStarships()', () => {
    describe('getStarships()', () => {
        it('should fetch and store starship data', async () => {
            const data = [{ crew: 1, model: 'Model', name: 'Name' }];
            jest.spyOn(service, 'fetchStarships')
                .mockResolvedValue(data);

            const { result } = renderHook(() => useStarships());

            await act(async () => {
                await result.current.getStarships();
            });

            expect(result.current.data).toBe(data);
        });
        it('should set error flag after throw exception', async() => {
            jest.spyOn(service, 'fetchStarships')
                .mockRejectedValue(new Error());

            const { result } = renderHook(() => useStarships());

            await act(async () => {
                await result.current.getStarships();
            });

            expect(result.current.error).toBe(true);
        });
    });
});
