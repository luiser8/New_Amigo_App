import { get, post } from "../helpers/Fetch";

export const getFacturasClient = async (identificador, lapso, puerta) => {
  return await get(
    `inscripcion/get?identificador=${identificador}&lapso=${lapso}&puerta=${puerta}`,
  );
};
export const getFacturasClientById = async (id) => {
  return await get(`facturacion/get?Id_factura=${Number(id)}`);
};
export const postSaldoAFavorFacturas = async (factura) => {
  return await post(`facturacion/insert_saldo_favor`, {
    Id_Factura: factura.Id_Factura,
    Monto: Number(factura.Monto),
    Cedula: factura.Cedula,
  });
};
export const postDepositosFacturas = async (factura) => {
  return await post(`facturacion/insert_deposito`, {
    Id_Factura: Number(factura.Id_Factura),
    Id_Banco: Number(factura.Id_Banco),
    Referencia: factura.Referencia,
    Monto: Number(factura.Monto),
    Fecha: factura.Fecha,
    Tipo: Number(factura.Tipo),
  });
};
