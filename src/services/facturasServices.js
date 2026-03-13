import {
  getFacturasClient,
  getFacturasClientById,
  postDepositosFacturas,
  postSaldoAFavorFacturas,
} from "../clients/facturasClient";

export const getFacturasServices = async (identificador, lapso, puerta) => {
  let facturas = [];
  Promise.all([
    await getFacturasClient(identificador, lapso, puerta).then((values) => {
      if (values !== null) {
        facturas = [...facturas, ...(values !== undefined ? values : [])];
      }
    }),
  ]).catch((error) => {
    new Error(error);
  });
  return facturas;
};
export const getFacturasByIdServices = async (id) => {
  let facturas = [];
  Promise.all([
    await getFacturasClientById(id).then((values) => {
      if (values !== null) {
        facturas = [...facturas, ...(values !== undefined ? values : [])];
      }
    }),
  ]).catch((error) => {
    new Error(error);
  });
  return facturas;
};
export const postFacturasSaldoAFavorServices = async (factura) => {
  let request = 0;
  Promise.all([
    await postSaldoAFavorFacturas(factura).then((values) => {
      if (values !== null) {
        request = values;
      }
    }),
  ]).catch((error) => {
    new Error(error);
  });
  return request;
};
export const postFacturasDepositosServices = async (factura) => {
  let request = 0;
  Promise.all([
    await postDepositosFacturas(factura).then((values) => {
      if (values !== null) {
        request = values;
      }
    }),
  ]).catch((error) => {
    new Error(error);
  });
  return request;
};
