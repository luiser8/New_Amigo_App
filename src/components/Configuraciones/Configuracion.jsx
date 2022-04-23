import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Toast } from '../../helpers/Toast';
import { Context } from '../../context/Context';
import Insertar from './modals/Insertar';
import Eliminar from './modals/Eliminar';
import { getRoles } from '../../services/rolesService';
import { getUsuarios, postUsuarios, delUsuarios, putUsuarios } from '../../services/usuarioService';
import UsuariosDetalle from '../User/UsuariosDetalle';
import CambiarClave from './modals/CambiarClave';
import Editar from './modals/Editar';

const Configuracion = () => {
    const { checkUser } = useContext(Context);
    const [openInsertar, setOpenInsertar] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCambiarClave, setOpenCambiarClave] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [roles, setRoles] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [usuarioId, setUsuarioId] = useState('');

    //Modals Insertar
    const activeInsertar = async (open) => {
        setOpenInsertar(open);
    }
    const okInsertar = async (value) => {
        setOpenInsertar(false);
        if (value)
            (Promise.all([
                postUsuarios(value).then((items) => {
                    items !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Nuevo usuario ha sido creado.', color: 'green' }) : Toast({ show: false });
                    getUsuarios().then((items) => {
                        setUsuarios(items !== undefined ? items : []);
                    });
                    Toast({ show: false });
                }),
            ]).catch(error => {
                new Error(error);
            }));
    }
    //Modals eliminar
    const activeDelete = async (open) => {
        setUsuario(open); setOpenDelete(open);
    }
    const okEliminar = async (value) => {
        if (value.usuarioId !== '') {
            (Promise.all([
                delUsuarios(value.usuarioId).then((items) => {
                    items !== undefined ? setUsuarios(usuarios.filter(item => item.UsuarioId !== value.usuarioId)) : setUsuarios([]);
                    items !== undefined ? Toast({ show: true, title: 'Advertencia!', msj: `Usuario ha sido eliminado.`, color: 'red' }) : Toast({ show: false });
                }),
            ]).catch(error => {
                new Error(error);
            }));
        }
        Toast({ show: false });
        setOpenDelete(false);
    }
    //Modals cambiar clave
    const activeCambiarClave = async (open) => {
        setOpenCambiarClave(open.open); setUsuarioId(open.usuarioId);
    }
    const okCambiarClave = async (values) => {
        if (values.usuarioId !== '') {
            (Promise.all([
                putUsuarios(values).then((items) => {
                    items !== undefined ? Toast({ show: true, title: 'Advertencia!', msj: `El usuario ha sido actualizada la contraseña.`, color: 'red' }) : Toast({ show: false });
                }),
            ]).catch(error => {
                new Error(error);
            }));
        }
        Toast({ show: false });
        setOpenCambiarClave(false);
    }
    //Modals edicion
    const activeEditar = async (open) => {
        setOpenEditar(open.open); setUsuario(open.usuario);
    }
    const okEditar = async (values) => {
        if (values.UsuarioId !== '') {
            (Promise.all([
                putUsuarios(values).then((items) => {
                    items !== undefined ? Toast({ show: true, title: 'Advertencia!', msj: `El usuario ha sido actualizado.`, color: 'red' }) : Toast({ show: false });
                    getUsuarios().then((items) => {
                        setUsuarios(items !== undefined ? items : []);
                    });
                }),
            ]).catch(error => {
                new Error(error);
            }));
        }
        Toast({ show: false });
        setOpenEditar(false);
    }
    // Inicio Peticiones
    useEffect(() => {
        (Promise.all([
            getRoles().then((items) => {
                setRoles(items !== undefined ? items : []);
            }),
            getUsuarios().then((items) => {
                setUsuarios(items !== undefined ? items : []);
            }),
        ]).catch(error => {
            new Error(error);
        }));
    }, []);

    return (
        <Fragment>
            {openInsertar ?
                <Insertar
                    openInsert={activeInsertar}
                    roles={roles}
                    usuarios={usuarios}
                    confirm={okInsertar}
                /> : <></>}
            {openDelete ?
                <Eliminar
                    openC={activeDelete}
                    confirm={okEliminar}
                    usuario={usuario}
                /> : <></>}
            {openCambiarClave ?
                <CambiarClave
                    usuarioId={usuarioId}
                    openC={activeCambiarClave}
                    confirm={okCambiarClave}
                /> : <></>}
            {openEditar ?
                <Editar
                    usuario={usuario}
                    usuarios={usuarios}
                    roles={roles}
                    openEdit={activeEditar}
                    confirm={okEditar}
                /> : <></>}
            <UsuariosDetalle
                usuarios={usuarios.filter((u) => u.UsuarioId !== Number(checkUser().UsuarioId))}
                activeInsertar={activeInsertar}
                activeDelete={activeDelete}
                activeCambiarClave={activeCambiarClave}
                activeEditar={activeEditar}
            />
        </Fragment>
    )
}

export default Configuracion;