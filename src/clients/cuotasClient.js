import { get, put, post } from '../helpers/Fetch';

export const getCuotasClient = async (tipo, estado) => {
    return await get(`cuotas/all?Tipo=${tipo}&Estado=${estado}`);
}
export const getCuotasByLapsoClient = async (lapso, fechaDesde, fechaHasta) => {
    return await get(`cuotas/bylapso?lapso=${lapso}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`);
}
export const postCuotaAllClient = async (data) => {
    return await post('cuotas/insertAll', data);
}
export const postCuotaAllSAIAClient = async (data) => {
    return await post('cuotas/insertAllSAIA', data);
}
export const postCuotasClient = async (id, dolar, tasa, tipo, monto, lapso, estado) => {
    return await post('cuotas/insert',
        {
            'CuotaId': id,
            'Dolar': dolar,
            'Tasa': tasa,
            'Tipo': tipo,
            'Monto': monto,
            'Lapso': lapso,
            'Estado': estado
        }
    );
}
export const putCuotasClient = async (id, monto) => {
    return await put(`cuotas/update?cuotaId=${id}`, { 'Monto': monto, 'Estado': 1 });
}
export const putCuotasAllClient = async (cuota, lapso, tipo) => {
    return await put(`cuotas/updateAll`, { 'Cuota': cuota, 'Abono': 1, 'Lapso': lapso, 'Pagada': 0, 'Tipo': tipo });
}
