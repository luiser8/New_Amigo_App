import { getCuotasByLapsoClient, getCuotasClient, postCuotaAllClient, postCuotaAllSAIAClient, postCuotasClient, putCuotasAllClient, putCuotasClient } from "../clients/cuotasClient";

export const getCuotasService = async (tipo, estado) => {
    let cuotas = [];
    (Promise.all([
        await getCuotasClient(tipo, estado).then((values) => {
            if (values !== null) {
                cuotas = [...cuotas, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return cuotas;
}

export const getCuotasByLapsoService = async (lapso, fechaDesde, fechaHasta) => {
    let cuotasByLapso = [];
    (Promise.all([
        await getCuotasByLapsoClient(lapso, fechaDesde, fechaHasta).then((values) => {
            if (values !== null) {
                cuotasByLapso = [...cuotasByLapso, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return cuotasByLapso;
}

export const postCuotaAllService = async (data) => {
    let cuotasAll = [];
    (Promise.all([
        await postCuotaAllClient(data).then((values) => {
            if (values !== null) {
                cuotasAll = [...cuotasAll, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return cuotasAll;
}

export const postCuotaAllSAIAService = async (data) => {
    let cuotasSAIAAll = [];
    (Promise.all([
        await postCuotaAllSAIAClient(data).then((values) => {
            if (values !== null) {
                cuotasSAIAAll = [...cuotasSAIAAll, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return cuotasSAIAAll;
}

export const postCuotasService = async (id, dolar, tasa, tipo, monto, lapso, estado) => {
    let cuotasPost = [];
    (Promise.all([
        await postCuotasClient(id, dolar, tasa, tipo, monto, lapso, estado).then((values) => {
            if (values !== null) {
                cuotasPost = [...cuotasPost, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return cuotasPost;
}

export const putCuotasService = async (id, monto) => {
    let cuotasPut = [];
    (Promise.all([
        await putCuotasClient(id, monto).then((values) => {
            if (values !== null) {
                cuotasPut = [...cuotasPut, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return cuotasPut;
}

export const putCuotaAllService = async (cuota, lapso, tipo, todasCuota, objCuotas) => {
    let cuotasPutAll = 0;
    const cuota1 = objCuotas?.cuota0 ? objCuotas.cuota0 : 0;
    const cuota2 = objCuotas?.cuota1 ? objCuotas.cuota1 : 0;
    const cuota3 = objCuotas?.cuota2 ? objCuotas.cuota2 : 0;
    const cuota4 = objCuotas?.cuota3 ? objCuotas.cuota3 : 0;
    const cuota5 = objCuotas?.cuota4 ? objCuotas.cuota4 : 0;
    (Promise.all([
        await putCuotasAllClient(cuota, lapso, tipo, todasCuota, cuota1, cuota2, cuota3, cuota4, cuota5).then((values) => {
                if (values !== null) {
                    cuotasPutAll = values;
                }
            }),
    ]).catch(error => {
        new Error(error);
    }));
    return cuotasPutAll;
}
