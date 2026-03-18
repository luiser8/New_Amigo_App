import { get } from "../helpers/Fetch";

export const getBancosClient = async (id_factura) => {
  return await get(`bancos/by_factura?id_factura=${id_factura}`);
};
