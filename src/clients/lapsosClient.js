import { get } from '../helpers/Fetch';

export const getLapsosClient = async (puerta) => {
    return await get(`lapsos/all?puerta=${puerta}`);
}
