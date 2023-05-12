import { get } from '../helpers/Fetch';

export const getConciliacionesClient = async (todos, fechaDesde, fechaHasta) => {
    return await get(`conciliaciones/all?Todos=${todos}&FechaDesde=${fechaDesde}&FechaHasta=${fechaHasta}`);
}
