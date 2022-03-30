import { get, put } from '../helpers/Fetch';

export const getAlumnos = async (identificador) => {
    return await get(`alumno/get?cedula=${identificador}`);
} 
export const putTerceros = async (id, cedula) => {
    return await put(`terceros/update?id_terceros=${id}&identificador=${cedula}`);
} 