import { get, blob } from '../helpers/Fetch';

export const getReporteDeudasClient = async (lapso, pagada) => {
    return await blob(`reporte/deudas?lapso=${lapso}&pagada=${pagada}`);
}
export const getReportePagadasClient = async (lapso) => {
    return await blob(`reporte/pagadas?lapso=${lapso}`);
}
export const getReporteMenuClient = async (idPeriodo, desde, hasta) => {
    return await get(`reporte/menu?idperiodo=${idPeriodo}&desde=${desde}&hasta=${hasta}`);
}
export const getReporteMenuCarrerasClient = async (idPeriodo, desde, hasta) => {
    return await get(`reporte/menucarreras?idperiodo=${idPeriodo}&desde=${desde}&hasta=${hasta}`);
}
export const getReportePlanesDePagoClient = async (idPeriodo, idPlan, desde, hasta) => {
    return await blob(`reporte/planesDePago?idperiodo=${idPeriodo}&idplan=${idPlan}&desde=${desde}&hasta=${hasta}`);
}
export const getReportePorCarrerasClient = async (idPeriodo, idCarrera, desde, hasta) => {
    return await blob(`reporte/porcarreras?idperiodo=${idPeriodo}&idcarrera=${idCarrera}&desde=${desde}&hasta=${hasta}`);
}
