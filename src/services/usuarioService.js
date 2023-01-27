import { delUsuariosClient, getUsuariosClient, loginUsuarioClient, postUsuariosClient, putUsuariosClient } from "../clients/usuarioClient";

export const loginUsuarioService = async (usuario, contrasena) => {
    let loginUsuario = [];
    (Promise.all([
        await loginUsuarioClient(usuario, contrasena).then((values) => {
            if (values !== null) {
                loginUsuario = [...loginUsuario, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return loginUsuario;
}

export const getUsuariosService = async () => {
    let usuarios = [];
    (Promise.all([
        await getUsuariosClient().then((values) => {
            if (values !== null) {
                usuarios = [...usuarios, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return usuarios;
}

export const postUsuariosService = async (values) => {
    let usuario = {};
    (Promise.all([
        await postUsuariosClient(values).then((values) => {
            if (values !== null) {
                usuario = {...usuario, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return usuario;
}

export const putUsuariosService = async (values) => {
    let usuario = {};
    (Promise.all([
        await putUsuariosClient(values).then((values) => {
            if (values !== null) {
                usuario = {...usuario, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return usuario;
}

export const delUsuariosService = async (values) => {
    let usuario = {};
    (Promise.all([
        await delUsuariosClient(values).then((values) => {
            if (values !== null) {
                usuario = {...usuario, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return usuario;
}
