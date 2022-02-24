import React, { useContext } from 'react';
import { Router, Redirect } from '@reach/router';
import { Context } from '../context/Context';
import Login from '../components/User/Login';
import Error from '../components/Layouts/Error';
import Reportes from '../components/Reportes/Reportes';
import Actualizar from '../components/Cuotas/Actualizar';
import Insertar from '../components/Cuotas/Insertar';
import Configuracion from '../components/Configuraciones/Configuracion';
import Home from '../components/Home/Home';

const Routes = () => {
    const { checkUser } = useContext(Context);

    return (
        <Router>
        {(checkUser().UsuarioId) !== null ? 
            <Home path="/" user={checkUser().UsuarioId}></Home>
            :
            <Login path="/" />
        }
        {(checkUser().UsuarioId) !== null && (checkUser().Rol) === '1' || (checkUser().Rol) === '2' ? 
            <Actualizar path="/actualizar" user={checkUser().UsuarioId}></Actualizar>
            :
            <Redirect from="/actualizar" to="/"/>
        }
        {(checkUser().UsuarioId) !== null ? 
            <Reportes path="/reportes" user={checkUser().UsuarioId}></Reportes>
            :
            <Redirect from="/reportes" to="/"/>
        }
        {(checkUser().UsuarioId) !== null && (checkUser().Rol) === '1' || (checkUser().Rol) === '2' ? 
            <Insertar path="/insertar" user={checkUser().UsuarioId}></Insertar>
            :
            <Redirect from="/insertar" to="/"/>
        }
        {(checkUser().UsuarioId) !== null && (checkUser().Rol) === '1' ? 
            <Configuracion path="/configuracion" user={checkUser().UsuarioId}></Configuracion>
            :
            <Redirect from="/configuracion" to="/"/>
        }
            <Error default/>
    </Router>
    );
};

export default Routes;
