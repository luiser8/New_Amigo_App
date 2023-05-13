import { getBancosClient } from "../clients/bancosClient";

export const getBancosService = async () => {
    let bancos = [];
    (Promise.all([
        await getBancosClient().then((values) => {
            if (values !== null) {
                bancos = [...bancos, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return bancos;
}
