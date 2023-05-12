import { get } from '../helpers/Fetch';

export const getPeriodosContablesClient = async (todos, fechaDesde, fechaHasta) => {
    return await get(`periodosContables/all?Todos=${todos}&FechaDesde=${fechaDesde}&FechaHasta=${fechaHasta}`);
}
