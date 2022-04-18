import { get, post, put, del } from '../helpers/Fetch';

export const loginUsuario = async (usuario, contrasena) => {
    return await post('users/login', { "Usuario": usuario, "Contrasena":contrasena });
} 
export const getUsuarios = async () => {
    return await get('users/get');
} 
export const postUsuarios = async (values) => {
    return await post('users/add', values);
} 
export const putUsuarios = async (values) => {
    return await put('users/update', values);
}
export const delUsuarios = async (values) => {
    return await del(`users/delete?usuarioId=${values}`);
} 
