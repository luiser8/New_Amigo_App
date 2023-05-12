import { getPeriodosContablesClient } from "../clients/periodosContablesClient";

export const getPeriodosContablesService = async (todos, fechaDesde, fechaHasta) => {
    let data = [];
    (Promise.all([
        await getPeriodosContablesClient(todos, fechaDesde, fechaHasta).then((values) => {
            if (values !== null) {
                data = [...data, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return data;
}