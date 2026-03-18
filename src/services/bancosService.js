import { getBancosClient } from "../clients/bancosClient";

export const getBancosService = async (id_factura) => {
  let bancos = [];
  Promise.all([
    await getBancosClient(id_factura).then((values) => {
      if (values !== null) {
        bancos = [...bancos, ...(values !== undefined ? values : [])];
      }
    }),
  ]).catch((error) => {
    new Error(error);
  });
  return bancos;
};
