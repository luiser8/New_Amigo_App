import { get } from '../helpers/Fetch';

export const getAranceles = async (lapso, tipo) => {
    return await get(`arancel/get?lapso=${lapso}&tipoArancel=${tipo}`);
} 
export const getArancelesSAIA = async (lapso, tipo) => {
    return await get(`arancel/get?lapso=${lapso}&tipoArancel=${tipo}`);
} 