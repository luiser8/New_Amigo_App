import { get } from '../helpers/Fetch';

export const getLapsosClient = async () => {
    return await get('lapsos/all');
}
