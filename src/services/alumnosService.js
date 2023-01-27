import { getAlumnosClient, putTercerosClient } from "../clients/alumnosClient";

export const getAlumnosService = async (identificador) => {
    let alumnos = [];
    (Promise.all([
        await getAlumnosClient(identificador).then((values) => {
            if (values !== null) {
                alumnos = [...alumnos, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return alumnos;
}

export const putTercerosService = async (id, identificador, telefonos, emails) => {
    let alumno = {};
    (Promise.all([
        await putTercerosClient(id, identificador, telefonos, emails).then((values) => {
            if (values !== null) {
                alumno = {...alumno, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return alumno;
}
