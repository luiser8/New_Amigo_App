import { get, put, post } from '../helpers/Fetch';

export const getCuotas = async (tipo, estado) => {
    return await get(`cuotas/all?Tipo=${tipo}&Estado=${estado}`);
}
export const getCuotasByLapso = async (lapso, fechaDesde, fechaHasta) => {
    return await get(`cuotas/bylapso?lapso=${lapso}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`);
}
export const postCuotaAll = async (data) => {
    return await post('cuotas/insertAll', data);
} 
export const postCuotaAllSAIA = async (data) => {
    return await post('cuotas/insertAllSAIA', data);
}  
export const postCuotas = async (id, dolar, tasa, tipo, monto, lapso, estado) => {
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
export const putCuotas = async (id, monto) => {
    return await put(`cuotas/update?cuotaId=${id}`, { 'Monto': monto, 'Estado': 1 });
} 
export const putCuotaAll = async (cuota, lapso, tipo) => {
    return await put(`cuotas/updateAll`, { 'Cuota': cuota, 'Abono': 1, 'Lapso': lapso, 'Pagada': 0, 'Tipo': tipo });
} 