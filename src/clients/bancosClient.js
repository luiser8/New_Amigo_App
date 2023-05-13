import { get } from '../helpers/Fetch';

export const getBancosClient = async () => {
    return await get(`bancos/all`);
}
