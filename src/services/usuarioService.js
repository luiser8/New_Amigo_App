import { get, post, put } from '../helpers/Fetch';

export const loginUsuario = async (usuario, contrasena) => {
    return await post('users/login', { "Usuario": usuario, "Contrasena":contrasena });
} 
export const getUsuarios = async () => {
    return await get('users/get');
} 
export const postUsuarios = async (values) => {
    return await post('users/add', values);
} 