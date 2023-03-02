import React, { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Context } from '../context/Context';
import Login from '../pages/User/Login';
import Error from '../components/Layouts/Error';
import Reportes from '../pages/Reportes/Reportes';
import Actualizar from '../pages/Cuotas/Actualizar';
import Insertar from '../pages/Cuotas/Insertar';
import Configuracion from '../pages/Configuraciones/Configuracion';
import Home from '../pages/Home/Home';

export default function Routes() {
    const { checkUser } = useContext(Context);
    return useRoutes([
        {
            path: '/', element: checkUser().UsuarioId !== null ? <Home user={checkUser().UsuarioId}/> : <Login />,
        },
        {
            path: '/actualizar', element: checkUser().UsuarioId !== null ? <Actualizar user={checkUser().UsuarioId}/> : <Login />,
        },
        {
            path: '/reportes/deudas', element: checkUser().UsuarioId !== null ? <Reportes user={checkUser().UsuarioId } type={1}/> : <Login />,
        },
        {
            path: '/reportes/inscripciones', element: checkUser().UsuarioId !== null ? <Reportes user={checkUser().UsuarioId } type={2}/> : <Login />,
        },
        {
            path: '/insertar', element: checkUser().UsuarioId !== null ? <Insertar user={checkUser().UsuarioId }/> : <Login />,
        },
        {
            path: '/configuracion', element: checkUser().UsuarioId !== null ? <Configuracion user={checkUser().UsuarioId }/> : <Login />,
        },
        {
            path: '/404', element: <Error />,
        },
        {
            path: '*', element: <Navigate to="/404" replace />
        },
    ]);
}
