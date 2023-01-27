import { getFacturasClient } from '../clients/facturasClient';

export const getFacturasServices = async (identificador, lapso) => {
    let facturas = [];
    (Promise.all([
        await getFacturasClient(identificador, lapso).then((values) => {
            if (values !== null) {
                facturas = [...facturas, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return facturas;
}
