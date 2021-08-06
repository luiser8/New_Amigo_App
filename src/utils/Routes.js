import React, { useContext } from 'react';
import { Router, Redirect } from '@reach/router';
import { Context } from '../utils/Context';
import Login from '../components/User/Login';
import Error from './Error';
import Deudas from '../components/Deudas/Deudas';
import Reporte from '../components/Deudas/Reporte';
import Actualizar from '../components/Cuotas/Actualizar';
import Insertar from '../components/Cuotas/Insertar';

const Routes = () => {
    const { checkUser } = useContext(Context);

    return (
        <Router>
        {(checkUser().UsuarioId) !== null ? 
            <Deudas path="/" user={checkUser().UsuarioId}>
                {/* <Redirect from="/" to="/login"/> */}
            </Deudas>
            :
            <Login path="/" />
        }
        {(checkUser().UsuarioId) !== null ? 
            <Actualizar path="/actualizar" user={checkUser().UsuarioId}></Actualizar>
            :
            <Login path="/" />
        }
        {(checkUser().UsuarioId) !== null ? 
            <Reporte path="/reporte" user={checkUser().UsuarioId}></Reporte>
            :
            <Login path="/" />
        }
        {(checkUser().UsuarioId) !== null ? 
            <Insertar path="/insertar" user={checkUser().UsuarioId}></Insertar>
            :
            <Login path="/" />
        }
            {/* <Signin path="/signin">
                {(checkUser().IdUser) ? 
                    <Redirect from="/signin" to="/" />
                    :
                    <Redirect from="/signin" to="/" />
                } 
            </Signin> */}
            <Error default/>
    </Router>
    );
};

export default Routes;
