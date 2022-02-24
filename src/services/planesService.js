import { get } from '../helpers/Fetch';

export const getPlanes = async (lapso) => {
    return await get(`planes/get?lapso=${lapso}&tipo=${1}`);
} 
export const getPlanesSAIA = async (lapso) => {
    return await get(`planes/get?lapso=${lapso}&tipo=${2}`);
} 