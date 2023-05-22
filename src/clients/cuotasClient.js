import { get, put, post } from "../helpers/Fetch";

export const getCuotasClient = async (tipo, estado) => {
  return await get(`cuotas/all?Tipo=${tipo}&Estado=${estado}`);
};
export const getCuotasByLapsoClient = async (lapso, fechaDesde, fechaHasta) => {
  return await get(
    `cuotas/bylapso?lapso=${lapso}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`,
  );
};
export const postCuotaAllClient = async (data) => {
  return await post("cuotas/insertAll", data);
};
export const postCuotaAllSAIAClient = async (data) => {
  return await post("cuotas/insertAllSAIA", data);
};
export const postCuotasClient = async (
  id,
  dolar,
  tasa,
  tipo,
  monto,
  lapso,
  estado,
) => {
  return await post("cuotas/insert", {
    CuotaId: id,
    Dolar: dolar,
    Tasa: tasa,
    Tipo: tipo,
    Monto: monto,
    Lapso: lapso,
    Estado: estado,
  });
};
export const putCuotasClient = async (id, monto) => {
  return await put(`cuotas/update?cuotaId=${id}`, { Monto: monto, Estado: 1 });
};
export const putCuotasAllClient = async (
  cuota,
  lapso,
  tipo,
  todasCuota,
  cuota1,
  cuota2,
  cuota3,
  cuota4,
  cuota5,
) => {
  return await put(`cuotas/updateAll`, {
    Cuota: cuota,
    Abono: 1,
    Lapso: lapso,
    Pagada: 0,
    Tipo: tipo,
    TodasCuota: todasCuota,
    Cuota1: cuota1,
    Cuota2: cuota2,
    Cuota3: cuota3,
    Cuota4: cuota4,
    Cuota5: cuota5,
  });
};
