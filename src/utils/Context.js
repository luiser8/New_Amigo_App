import React, { useState, createContext } from 'react';
import Storage from './Storage';

export const Context = createContext();

const userInitial = {'UsuarioId' : null,'Nombres' : null,'Apellidos' : null, 'Rol' : null};
const configInitial = {'Lapso' : null,'Cuota' : null};
  
export const ContextProvider = ({ children }) => {
    const { getLocalStorage, setLocalStorage } = Storage();
    const [dataUser, setDataUser] = useState(userInitial);
    const [dataConfig, setDataConfig] = useState(configInitial);

    const checkUser = () => {
        return getLocalStorage('user');
    }
    const checkConfig = () => {
        return getLocalStorage('config');
    }
    const login = (set, user) => {
        setLocalStorage(set, 'user', user); setDataUser(user); 
    }
    const logout = (set) => {
        setLocalStorage(set, 'user', null); setDataUser(null); 
    }
    const setConfig = (set, config) => {
        setLocalStorage(set, 'config', config); setDataConfig(config); 
    }

    return (
        <Context.Provider value={{
            dataUser, setDataUser, 
            dataConfig, setDataConfig, checkConfig, setConfig,
            checkUser, login, logout
        }}>
            {children}
        </Context.Provider>
    )
};