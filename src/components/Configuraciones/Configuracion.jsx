import React, { Fragment, useState, useEffect } from 'react';
import { Toast } from '../../helpers/Toast';
import Insertar from './modals/Insertar';
import { getRoles } from '../../services/rolesService';
import { getUsuarios, postUsuarios } from '../../services/usuarioService';
import UsuariosDetalle from '../User/UsuariosDetalle';

const Configuracion = () => {
    const [openInsertar, setOpenInsertar] = useState(false);
    const [roles, setRoles] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

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
    /* Inicio Peticiones*/
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
                    confirm={okInsertar} 
                /> : <></>}
            <UsuariosDetalle 
                usuarios={usuarios}
                activeInsertar={activeInsertar}
            />
        </Fragment>
    )
}

export default Configuracion;