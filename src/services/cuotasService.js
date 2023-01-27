import { getCuotasByLapsoClient, getCuotasClient, postCuotaAllClient, postCuotasClient, putCuotasAllClient, putCuotasClient } from "../clients/cuotasClient";

export const getCuotasService = async (tipo, estado, setConfig) => {
    return (Promise.all([
        await getCuotasClient(tipo, estado).then((items) => {
            items.forEach((_, item) => {
                setConfig(2, {
                    'Lapso': null,
                    'DolarN': items.filter((tipo) => tipo.Tipo === 2)[item].Dolar,
                    'DolarI': items.filter((tipo) => tipo.Tipo === 1)[item].Dolar,
                    'CuotaId': items.filter((tipo) => tipo.Tipo === 2)[item].CuotaId,
                    'Cuota': items.filter((tipo) => tipo.Tipo === 2)[item].Monto,
                    'CuotaSAIAId': items.filter((tipo) => tipo.Tipo === 1)[item].CuotaId,
                    'CuotaSAIA': items.filter((tipo) => tipo.Tipo === 1)[item].Monto,
                });
            });
        }),
    ]).catch(error => {
        new Error(error);
    }));
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
        await postCuotaAllClient(data).then((values) => {
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

export const putCuotaAllService = async (cuota, lapso, tipo) => {
    let cuotasPutAll = 0;
    (Promise.all([
        await putCuotasAllClient(cuota, lapso, tipo).then((values) => {
            if (values !== null) {
                cuotasPutAll = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return cuotasPutAll;
}
