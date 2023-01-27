import { getLapsosClient } from "../clients/lapsosClient";

export const getLapsosService = async () => {
    let lapsos = [];
    (Promise.all([
        await getLapsosClient().then((values) => {
            if (values !== null) {
                lapsos = [...lapsos, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return lapsos;
}