import { get } from '../helpers/Fetch';

export const getLapsos = async () => {
    return await get('lapsos/all');
} 