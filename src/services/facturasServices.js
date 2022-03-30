import { get } from '../helpers/Fetch';

export const getFacturas = async (identificador, lapso) => {
    return await get(`inscripcion/get?identificador=${identificador}&lapso=${lapso}`);
} 