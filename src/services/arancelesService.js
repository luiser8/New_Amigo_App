import { get } from '../helpers/Fetch';

export const getAranceles = async (lapso) => {
    return await get(`arancel/get?lapso=${lapso}&tipoArancel=${1}`);
} 
export const getArancelesSAIA = async (lapso) => {
    return await get(`arancel/get?lapso=${lapso}&tipoArancel=${3}`);
} 