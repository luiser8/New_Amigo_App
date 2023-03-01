const Storage = () => {

    const getLocalStorage = (value) => {
        let data;
        if(value === 'user'){
            data = {
                'UsuarioId' : window.localStorage.getItem('UsuarioId'),
                'Nombres' : window.localStorage.getItem('Nombres'),
                'Apellidos' : window.localStorage.getItem('Apellidos'),
                'Rol' : window.localStorage.getItem('Rol'),
                'NombreRol' : window.localStorage.getItem('NombreRol')
            };
        }else if(value === 'config'){
            data = {
                'Lapso' : window.localStorage.getItem('Lapso'),
                'DolarN' : window.localStorage.getItem('DolarN'),
                'DolarI' : window.localStorage.getItem('DolarI'),
                'CuotaId' : window.localStorage.getItem('CuotaId'),
                'Cuota' : window.localStorage.getItem('Cuota'),
                'CuotaSAIAId' : window.localStorage.getItem('CuotaSAIAId'),
                'CuotaSAIA' : window.localStorage.getItem('CuotaSAIA')
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
                window.localStorage.setItem('NombreRol', data.NombreRol);
            } else {
                window.localStorage.removeItem('UsuarioId');
                window.localStorage.removeItem('Nombres');
                window.localStorage.removeItem('Apellidos');
                window.localStorage.removeItem('Rol');
                window.localStorage.removeItem('NombreRol');
            }
        }else if(value === 'config'){
            if (data !== null) {
                set === 1 ? window.localStorage.setItem('Lapso', data.Lapso) : window.localStorage.setItem('Cuota', data.Cuota);
                set === 1 ? window.localStorage.setItem('DolarN', data.DolarN) : window.localStorage.setItem('DolarN', data.DolarN);
                set === 1 ? window.localStorage.setItem('DolarI', data.DolarI) : window.localStorage.setItem('DolarI', data.DolarI);
                set === 1 ? window.localStorage.setItem('CuotaId', data.CuotaId) : window.localStorage.setItem('CuotaId', data.CuotaId);
                set === 1 ? window.localStorage.setItem('CuotaSAIAId', data.CuotaSAIAId) : window.localStorage.setItem('CuotaSAIAId', data.CuotaSAIAId);
                set === 1 ? window.localStorage.setItem('CuotaSAIA', data.CuotaSAIA) : window.localStorage.setItem('CuotaSAIA', data.CuotaSAIA);
            } else {
                set === 1 ? window.localStorage.removeItem('Lapso') : window.localStorage.removeItem('Cuota');
                set === 1 ? window.localStorage.removeItem('DolarN') : window.localStorage.removeItem('DolarN');
                set === 1 ? window.localStorage.removeItem('DolarI') : window.localStorage.removeItem('DolarI');
                set === 1 ? window.localStorage.removeItem('CuotaId') : window.localStorage.removeItem('CuotaId');
                set === 1 ? window.localStorage.removeItem('CuotaSAIAId') : window.localStorage.removeItem('CuotaSAIAId');
                set === 1 ? window.localStorage.removeItem('CuotaSAIA') : window.localStorage.removeItem('CuotaSAIA');
            }
        }
    }

    return {
        getLocalStorage, setLocalStorage,
    }
}

export default Storage;