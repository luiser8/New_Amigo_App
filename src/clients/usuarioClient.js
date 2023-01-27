import { get, post, put, del } from '../helpers/Fetch';

export const loginUsuarioClient = async (usuario, contrasena) => {
    return await post('users/login', { "Usuario": usuario, "Contrasena":contrasena });
}
export const getUsuariosClient = async () => {
    return await get('users/get');
}
export const postUsuariosClient = async (values) => {
    return await post('users/add', values);
}
export const putUsuariosClient = async (values) => {
    return await put(`users/update?usuarioid=${values.UsuarioId}`, values);
}
export const delUsuariosClient = async (values) => {
    return await del(`users/delete?usuarioId=${values}`);
}

