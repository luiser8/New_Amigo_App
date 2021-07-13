import React, { useState, useContext, Fragment } from 'react';
import { Context } from '../../utils/Context';
import { post } from '../../utils/Fetch';

const Login = () => {
    const { login } = useContext(Context);
    const [usuario, setUsuario] = useState([]);
    const [contrasena, setContrasena] = useState([]);
    const [error, setError] = useState(false);

    const handleLogin = async (event) => {
        //setOpenBackdrop(true);
        event.preventDefault();
        await post('users/login', { "Usuario": usuario, "Contrasena":contrasena }).then((items) => {
                if (items.length !== 0) {
                    login({
                        'UsuarioId' : items[0].UsuarioId !== undefined ? items[0].UsuarioId : '',
                        'Nombres' : items[0].Nombres !== undefined ? items[0].Nombres : '',
                        'Apellidos' : items[0].Apellidos !== undefined ? items[0].Apellidos : ''
                    });
                }else{
                    setError(true);
                }
        });
        /*await fetch(`${global.config.url.dev}Users/login`, {
            method: 'POST',
            headers: global.config.headers.dev,
            body: JSON.stringify({ 'Email': data.email, 'Password': data.password }),
            json: true
        }).then(response => {
            if (response.status >= 200 && response.status <= 299) {
                return setLogin(response.json())
            }else{
                response.json().then((json) => {
                    const { Message } = json;
                    console.log(Message); setAlerts(true); setSeverity('error'); setMessages(Message);
                });
                return null
            }
        }).catch((e) => {
            console.log(e); setAlerts(true); setSeverity('error'); setMessages('Algo pasó');
        })
        setTimeout(() => {
            setOpenBackdrop(false);
        }, 1000); */
    }

    return (
        <Fragment>
            {error ? 
            <div role="alert">
                <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error de sesión
                </div>
                <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Ocurrio un problema intentando iniciar la sesión. Usuario / Contraseña erronea, intenta de nuevo</p>
                </div>
            </div>
                :
                <></>
            }
        
        <div className={`${error !== true ? 'min-h-screen' : ''} flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Iniciar sesión
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="usuario" className="sr-only">Usuario</label>
                            <input id="usuario" onChange={(event) => setUsuario(event.target.value)} name="usuario" type="text" autocomplete="usuario" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Usuario" />
                        </div>
                        <div>
                            <label for="contrasena" className="sr-only">contrasena</label>
                            <input id="contrasena" onChange={(event) => setContrasena(event.target.value)} name="contrasena" type="password" autocomplete="contrasena" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contraseña" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label for="remember-me" className="ml-2 block text-sm text-gray-900">Recuérdame</label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Olvido su contraseña?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </Fragment>
    )
}

export default Login;