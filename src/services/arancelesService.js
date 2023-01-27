import { getArancelesClient, getArancelesSAIAClient } from "../clients/arancelesClient";

export const getArancelesService = async (lapso, tipo) => {
    let aranceles = [];
    (Promise.all([
        await getArancelesClient(lapso, tipo).then((values) => {
            if (values !== null) {
                aranceles = [...aranceles, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return aranceles;
}

export const getArancelesSAIAService = async (lapso, tipo) => {
    let aranceles = [];
    (Promise.all([
        await getArancelesSAIAClient(lapso, tipo).then((values) => {
            if (values !== null) {
                aranceles = [...aranceles, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return aranceles;
}
