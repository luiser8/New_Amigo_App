/* eslint-disable no-mixed-operators */
import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Context } from '../context/Context';
import Login from '../pages/User/Login';
import Error from '../components/Layouts/Error';
import Reportes from '../pages/Reportes/Reportes';
import Actualizar from '../pages/Cuotas/Actualizar';
import Insertar from '../pages/Cuotas/Insertar';
import Configuracion from '../pages/Configuraciones/Configuracion';
import Deudas from '../pages/Deudas/Deudas';
import Reset from '../pages/Cuotas/Reset';

export default function Routes() {
    const { checkUser } = useContext(Context);
    return useRoutes([
        {
            path: '/', element: checkUser().UsuarioId !== null ? <Deudas user={checkUser().UsuarioId} /> : <Login />,
        },
        {
            path: '/actualizar', element: checkUser().UsuarioId !== null && checkUser().Rol !== '6' ? <Actualizar user={checkUser().UsuarioId} /> : <Login />,
        },
        {
            path: '/reportes/deudas', element: checkUser().UsuarioId !== null && checkUser().Rol !== '6' ? <Reportes user={checkUser().UsuarioId} type={1} /> : <Login />,
        },
        {
            path: '/reportes/inscripciones', element: checkUser().UsuarioId !== null && checkUser().Rol !== '6' ? <Reportes user={checkUser().UsuarioId} type={2} /> : <Login />,
        },
        {
            path: '/reportes/facturacion', element: checkUser().UsuarioId !== null && checkUser().Rol !== '6' ? <Reportes user={checkUser().UsuarioId} type={3} /> : <Login />,
        },
        {
            path: '/insertar', element: checkUser().UsuarioId !== null && checkUser().Rol !== '6' ? <Insertar user={checkUser().UsuarioId} /> : <Login />,
        },
        {
            path: '/configuracion', element: checkUser().UsuarioId !== null && checkUser().Rol !== '6' ? <Configuracion user={checkUser().UsuarioId} /> : <Login />,
        },
        {
            path: '/deudas/reset', element: checkUser().UsuarioId !== null && checkUser().Rol !== '6' ? <Reset user={checkUser().UsuarioId} /> : <Login />,
        },
        {
            path: '/404', element: <Error />,
        },
        {
            path: '*', element: <Navigate to="/404" replace />
        },
    ]);
}
