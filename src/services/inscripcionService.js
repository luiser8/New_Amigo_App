import { delInscripcionClient, putInscripcionClient } from '../clients/inscripcionClient';

export const putInscripcionService = async (id_inscripcion, id_tipoIngreso, id_plan) => {
    let putInscripcion = [];
    (Promise.all([
        await putInscripcionClient(id_inscripcion, id_tipoIngreso, id_plan).then((values) => {
            if (values !== null) {
                putInscripcion = [...putInscripcion, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return putInscripcion;
}

export const delInscripcionService = async (id_inscripcion) => {
    let putInscripcion = [];
    (Promise.all([
        await delInscripcionClient(id_inscripcion).then((values) => {
            if (values !== null) {
                putInscripcion = [...putInscripcion, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return putInscripcion;
}
