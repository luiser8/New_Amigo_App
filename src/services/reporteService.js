import { get, blob } from '../helpers/Fetch';

export const getReporteDeudas = async (lapso, pagada) => {
    return await blob(`reporte/deudas?lapso=${lapso}&pagada=${pagada}`);
}
export const getReporteMenu = async (idPeriodo, desde, hasta) => {
    return await get(`reporte/menu?idperiodo=${idPeriodo}&desde=${desde}&hasta=${hasta}`);
}
export const getReportePLanesDePago = async (idPeriodo, idPlan, desde, hasta) => {
    return await blob(`reporte/planesDePago?idperiodo=${idPeriodo}&idplan=${idPlan}&desde=${desde}&hasta=${hasta}`);
}