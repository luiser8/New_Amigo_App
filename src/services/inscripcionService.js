import { put } from '../helpers/Fetch';

export const putInscripcion = async (id_inscripcion, id_tipoIngreso, id_plan) => {
    return await put(`inscripcion/update?id_inscripcion=${id_inscripcion}`, { 'Id_Plan': id_plan, 'Id_TipoIngreso': id_tipoIngreso });
}