import { getConciliacionesClient } from "../clients/conciliacionesClient";

export const getConciliacionesService = async (todos, fechaDesde, fechaHasta) => {
    let data = [];
    (Promise.all([
        await getConciliacionesClient(todos, fechaDesde, fechaHasta).then((values) => {
            if (values !== null) {
                data = [...data, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return data;
}
