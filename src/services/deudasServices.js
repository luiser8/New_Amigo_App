import { post, put, del } from '../helpers/Fetch';

export const checkDeuda = async (lapso, identificador) => {
    return await post('deudas/check', { "Lapso": lapso, "Identificador": identificador });
} 
export const postDeuda = async (data) => {
    return await post('deudas/insert', data);
} 
export const putDeuda = async (id, monto) => {
    return await put(`deudas/update?id_cuenta=${id}`, { 'Monto': monto })
}
export const delDeuda = async (...params) => {
    return await del(`deudas/delete?pagada=${params[0].pagada}&id_factura=${params[0].id_factura}&id_inscripcion=${params[0].id_inscripcion}&id_arancel=${params[0].id_arancel}`)
}  