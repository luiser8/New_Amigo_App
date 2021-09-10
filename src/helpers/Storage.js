const Storage = () => {

    const getLocalStorage = (value) => {
        let data;
        if(value === 'user'){
            data = {
                'UsuarioId' : window.localStorage.getItem('UsuarioId'),
                'Nombres' : window.localStorage.getItem('Nombres'),
                'Apellidos' : window.localStorage.getItem('Apellidos'),
                'Rol' : window.localStorage.getItem('Rol')
            };
        }else if(value === 'config'){
            data = {
                'Lapso' : window.localStorage.getItem('Lapso'),
                'Cuota' : window.localStorage.getItem('Cuota')
            };
        }
        return data;
    }

    const setLocalStorage = (set, value, data) => {
        if(value === 'user'){
            if (data !== null) {
                window.localStorage.setItem('UsuarioId', data.UsuarioId);
                window.localStorage.setItem('Nombres', data.Nombres);
                window.localStorage.setItem('Apellidos', data.Apellidos);
                window.localStorage.setItem('Rol', data.Rol);
            } else {
                window.localStorage.removeItem('UsuarioId');
                window.localStorage.removeItem('Nombres');
                window.localStorage.removeItem('Apellidos');
                window.localStorage.removeItem('Rol');
            }
        }else if(value === 'config'){
            if (data !== null) {
                set === 1 ? window.localStorage.setItem('Lapso', data.Lapso) : window.localStorage.setItem('Cuota', data.Cuota);
            } else {
                set === 1 ? window.localStorage.removeItem('Lapso') : window.localStorage.removeItem('Cuota');
            }
        }
    }

    return {
        getLocalStorage, setLocalStorage
    }
}

export default Storage;