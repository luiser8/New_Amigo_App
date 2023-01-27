import { getPlanesClient, getPlanesSAIAClient } from "../clients/planesClient";

export const getPlanesService = async (lapso) => {
    let planes = [];
    (Promise.all([
        await getPlanesClient(lapso).then((values) => {
            if (values !== null) {
                planes = [...planes, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return planes;
}

export const getPlanesSAIAService = async (lapso) => {
    let planesSAIA = [];
    (Promise.all([
        await getPlanesSAIAClient(lapso).then((values) => {
            if (values !== null) {
                planesSAIA = [...planesSAIA, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return planesSAIA;
}
