import { get, put, post } from '../helpers/Fetch';

export const getCuotas = async (tipo, estado) => {
    return await get(`cuotas/all?Tipo=${tipo}&Estado=${estado}`);
}
export const getCuotasByLapso = async (lapso, fechaDesde, fechaHasta) => {
    return await get(`cuotas/bylapso?lapso=${lapso}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`);
}
export const postCuotaAll = async (lapso, cuota, id_arancel, planesCheck, fechaVencimiento) => {
    return await post('cuotas/insertAll',
        {
            'Lapso': lapso,
            'Monto': cuota,
            'Id_Arancel': id_arancel,
            'Plan1': Number.parseInt(planesCheck[0].toString()),
            'Plan2': Number.parseInt(planesCheck[1].toString()),
            'Plan3': Number.parseInt(planesCheck[2].toString()),
            'Plan4': Number.parseInt(planesCheck[3].toString()),
            'FechaVencimiento': fechaVencimiento
        }
    );
} 
export const postCuotaAllSAIA = async (lapso, cuotaSAIA, id_arancelSAIA, planesCheck, fechaVencimientoSAIA) => {
    return await post('cuotas/insertAllSAIA',
        {
            'Lapso': lapso,
            'Monto': cuotaSAIA,
            'Id_Arancel': id_arancelSAIA,
            'Plan1': Number.parseInt(planesCheck[0].toString()),
            'Plan2': Number.parseInt(planesCheck[1].toString()),
            'FechaVencimiento': fechaVencimientoSAIA
        }
    );
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