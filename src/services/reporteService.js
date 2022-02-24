import { blob } from '../helpers/Fetch';

export const getReporteDeudas = async (lapso, pagada) => {
    return await blob(`reporte/get?lapso=${lapso}&pagada=${pagada}`);
}