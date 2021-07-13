import React, { useContext } from 'react';
import { Router, Redirect } from '@reach/router';
import { Context } from '../utils/Context';
import Home from '../components/Home/Home';
import Login from '../components/User/Login';
import Error from './Error';
import Deudas from '../components/Deudas/Deudas';

const Routes = () => {
    const { checkUser } = useContext(Context);

    return (
        <Router>
        {(checkUser().UsuarioId) !== null ? 
            <Home path="/" user={checkUser().UsuarioId}>
                {/* <Redirect from="/" to="/login"/> */}
            </Home>
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
