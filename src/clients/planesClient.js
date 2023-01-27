import { get } from '../helpers/Fetch';

export const getPlanesClient = async (lapso) => {
    return await get(`planes/get?lapso=${lapso}&tipo=${1}`);
}
export const getPlanesSAIAClient = async (lapso) => {
    return await get(`planes/get?lapso=${lapso}&tipo=${2}`);
}
