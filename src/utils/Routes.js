import React, { useContext } from 'react';
import { Router, Redirect } from '@reach/router';
import { Context } from '../utils/Context';
import Login from '../components/User/Login';
import Error from './Error';
import Deudas from '../components/Deudas/Deudas';
import Config from '../components/Configuraciones/Config';

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
            <Config path="/config" user={checkUser().UsuarioId}></Config>
            :
            <Login path="/" />
        }
        {(checkUser().UsuarioId) !== null ? 
            <Deudas path="/deudas" user={checkUser().UsuarioId}></Deudas>
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
