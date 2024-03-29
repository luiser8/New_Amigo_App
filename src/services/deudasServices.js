import { checkDeudaClient, delDeudaClient, postDeudaClient, postDeudaResetClient, putDeudaClient } from "../clients/deudasClient";

export const checkDeudaService = async (lapso, identificador) => {
    let data = {};
    (Promise.all([
        await checkDeudaClient(lapso, identificador).then((values) => {
            if (values !== null) {
                data = {...data, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return data;
}

export const postDeudaService = async (data) => {
    let postDeudas = [];
    (Promise.all([
        await postDeudaClient(data).then((values) => {
            if (values !== null) {
                postDeudas = [...postDeudas, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return postDeudas;
}

export const postDeudaResetService = async (data) => {
    let postDeudas = [];
    (Promise.all([
        await postDeudaResetClient(data).then((values) => {
            if (values !== null) {
                postDeudas = [...postDeudas, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return postDeudas;
}

export const putDeudaService = async (id, monto) => {
    let putDeudas = [];
    (Promise.all([
        await putDeudaClient(id, monto).then((values) => {
            if (values !== null) {
                putDeudas = [...putDeudas, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return putDeudas;
}

export const delDeudaService = async (...params) => {
    let delDeudas = [];
    (Promise.all([
        await delDeudaClient(params).then((values) => {
            if (values !== null) {
                delDeudas = [...delDeudas, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return delDeudas;
}
