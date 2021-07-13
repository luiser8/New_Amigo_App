const Storage = () => {

    const getLocalStorage = () => {
        const userStorage = {
            'UsuarioId' : window.localStorage.getItem('UsuarioId'),
            'Nombres' : window.localStorage.getItem('Nombres'),
            'Apellidos' : window.localStorage.getItem('Apellidos')
          };
        return userStorage;
    }

    const setLocalStorage = (user) => {
        if(user !== null){
            window.localStorage.setItem('UsuarioId', user.UsuarioId);
            window.localStorage.setItem('Nombres', user.Nombres);
            window.localStorage.setItem('Apellidos', user.Apellidos);
        }else{
            window.localStorage.removeItem('UsuarioId');
            window.localStorage.removeItem('Nombres');
            window.localStorage.removeItem('Apellidos');
        }
    }

    return {
        getLocalStorage, setLocalStorage
    }
}

export default Storage;