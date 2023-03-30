import { getReporteMenuCarrerasClient, getReporteMenuClient } from "../clients/reporteClient";

export const getReporteMenuService = async (idPeriodo, desde, hasta) => {
    let reporteMenu = [];
    (Promise.all([
        await getReporteMenuClient(idPeriodo, desde, hasta).then((values) => {
            if (values !== null) {
                reporteMenu = [...reporteMenu, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return reporteMenu;
}

export const getReporteMenuCarrerasService = async (idPeriodo, desde, hasta) => {
    let reporteMenuCarreras = [{IdCarrera: 0, Carrera: 'TODAS', Inscritos: 0}];
    (Promise.all([
        await getReporteMenuCarrerasClient(idPeriodo, desde, hasta).then((values) => {
            if (values !== null) {
                reporteMenuCarreras = [...reporteMenuCarreras, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return reporteMenuCarreras;
}
