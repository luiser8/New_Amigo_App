import { get, blob } from '../helpers/Fetch';

export const getReporteDeudas = async (lapso, pagada) => {
    return await blob(`reporte/deudas?lapso=${lapso}&pagada=${pagada}`);
}
export const getReporteMenu = async (idPeriodo, desde, hasta) => {
    return await get(`reporte/menu?idperiodo=${idPeriodo}&desde=${desde}&hasta=${hasta}`);
}
export const getReporteMenuCarreras = async (idPeriodo, desde, hasta) => {
    return await get(`reporte/menucarreras?idperiodo=${idPeriodo}&desde=${desde}&hasta=${hasta}`);
}
export const getReportePlanesDePago = async (idPeriodo, idPlan, desde, hasta) => {
    return await blob(`reporte/planesDePago?idperiodo=${idPeriodo}&idplan=${idPlan}&desde=${desde}&hasta=${hasta}`);
}
export const getReportePorCarreras = async (idPeriodo, idCarrera, desde, hasta) => {
    return await blob(`reporte/porcarreras?idperiodo=${idPeriodo}&idcarrera=${idCarrera}&desde=${desde}&hasta=${hasta}`);
}