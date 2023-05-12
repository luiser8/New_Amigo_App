/* eslint-disable react/prop-types */
import { useState, createContext } from 'react';
import Storage from '../helpers/Storage';

export const Context = createContext();

const userInitial = { 'UsuarioId': null, 'Nombres': null, 'Apellidos': null, 'Rol': null, 'NombreRol': null };
const _cuotaIConfigInitial = { 'Tipo': null, 'Lapso': null, 'CuotaId': null, 'Dolar': null, 'Cuota': null };
const _cuotaNConfigInitial = { 'Tipo': null, 'Lapso': null, 'CuotaId': null, 'Dolar': null, 'Cuota': null };

export const ContextProvider = ({ children }) => {
    const { getLocalStorage, setLocalStorage } = Storage();
    const [dataUser, setDataUser] = useState(userInitial);
    const [dataConfigI, setDataConfigI] = useState(_cuotaIConfigInitial);
    const [dataConfigN, setDataConfigN] = useState(_cuotaNConfigInitial);

    const checkUser = () => {
        return getLocalStorage('user');
    }
    const checkLapso = () => {
        return getLocalStorage('lapso');
    }
    const checkConfigI = () => {
        return getLocalStorage('configI');
    }
    const checkConfigN = () => {
        return getLocalStorage('configN');
    }
    const login = (set, user) => {
        setLocalStorage(set, 'user', user); setDataUser(user);
    }
    const logout = (set) => {
        setLocalStorage(set, 'user', null); setDataUser(null);
    }
    const setConfigCuotaI = (set, config) => {
        setLocalStorage(set, 'configI', config); setDataConfigI(config);
    }
    const setConfigCuotaN = (set, config) => {
        setLocalStorage(set, 'configN', config); setDataConfigN(config);
    }
    return (
        <Context.Provider value={{
            dataUser, setDataUser,
            dataConfigI, setDataConfigI, checkConfigI, setConfigCuotaI,
            dataConfigN, setDataConfigN, checkConfigN, setConfigCuotaN,
            checkUser, checkLapso, login, logout
        }}>
            {children}
        </Context.Provider>
    )
};
