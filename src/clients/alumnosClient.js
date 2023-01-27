import { get, put } from '../helpers/Fetch';

export const getAlumnosClient = async (identificador) => {
    return await get(`alumno/get?cedula=${identificador}`);
}
export const putTercerosClient = async (id, identificador, telefonos, emails) => {
    return await put(`terceros/update?id_terceros=${id}&identificador=${identificador}&telefonos=${telefonos}&emails=${emails}`);
}
