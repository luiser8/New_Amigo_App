import { getLapsosClient } from "../clients/lapsosClient";

export const getLapsosService = async (param = 0) => {
    let lapsos = [];
    let puerta = param !== undefined ? param : 0;
    (Promise.all([
        await getLapsosClient(puerta).then((values) => {
            if (values !== null) {
                lapsos = [...lapsos, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return lapsos;
}