import React, { useContext } from 'react';
import Deudas from '../Deudas/Deudas';
import { Context } from '../../context/Context';
import Contabilidad from '../Contabilidad/Contabilidad';

const Home = () => {
    const { checkUser } = useContext(Context);
    return (
        <>
            {checkUser().Rol !== '6' ? (
                <Deudas />
            ) : (
                <Contabilidad user={checkUser().UsuarioId}/>
            ) }
        </>
    )
}

export default Home;