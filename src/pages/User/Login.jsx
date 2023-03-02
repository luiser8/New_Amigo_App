import React, { useState, useContext, Fragment } from 'react';
import { Context } from '../../context/Context';
import { loginUsuarioService } from '../../services/usuarioService';

const Login = () => {
    const { login } = useContext(Context);
    const [usuario, setUsuario] = useState([]);
    const [contrasena, setContrasena] = useState([]);
    const [error, setError] = useState(false);
    const [errorMsjTitle, setErrorMsjTitle] = useState('');
    const [errorMsj, setErrorMsj] = useState('');
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [loadingBtnMsj, setLoadingBtnMsj] = useState('Entrar');

    const handleLogin = async (event) => {
        setLoadingBtn(true); setLoadingBtnMsj('Entrando... Espere un momento.');
        event.preventDefault();
        const loginHandle = await loginUsuarioService(usuario, contrasena);
        if (loginHandle !== undefined || loginHandle.length !== 0) {
            if (loginHandle.length !== 0 && loginHandle[0].Bloqueado === 0) {
                login(0, {
                    'UsuarioId': loginHandle[0].UsuarioId !== undefined ? loginHandle[0].UsuarioId : '',
                    'Nombres': loginHandle[0].Nombres !== undefined ? loginHandle[0].Nombres : '',
                    'Apellidos': loginHandle[0].Apellidos !== undefined ? loginHandle[0].Apellidos : '',
                    'Rol': loginHandle[0].Rol !== undefined ? loginHandle[0].Rol : '',
                    'NombreRol': loginHandle[0].NombreRol !== undefined ? loginHandle[0].NombreRol : ''
                });
            } else if(loginHandle.length === 0) {
                setError(true); setErrorMsjTitle('Error de sesión'); setErrorMsj('Ocurrió un problema intentando iniciar la sesión. Usuario / Contraseña erronea, intenta de nuevo');
            } else if (loginHandle[0].Bloqueado === 1) {
                setError(true); setErrorMsjTitle('Error de sesión'); setErrorMsj('Ocurrió un problema intentando iniciar la sesión. Usuario bloqueado temporalmente');
            }
        } else {
            setError(true); setErrorMsjTitle('Error de red'); setErrorMsj('Ocurrió un error en la comunicación');
        }
        setLoadingBtn(false); setLoadingBtnMsj('Entrar');
    }

    return (
        <Fragment>
            <>
                {error ?
                    <div role="alert">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            {errorMsjTitle}
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p>{errorMsj}</p>
                        </div>
                    </div>
                    :
                    <></>
                }
            </>
            <div className={`${error !== true ? 'min-h-screen' : ''} flex items-center justify-center ${error !== true ? 'py-10' : 'py-72'} px-4 sm:px-6 lg:px-8`}>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
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

                        {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label for="remember-me" className="ml-2 block text-sm text-gray-900">Recuérdame</label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Olvido su contraseña?
                            </a>
                        </div>
                    </div> */}

                        <div>
                            <button type="submit" disabled={loadingBtn} className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loadingBtn ? 'bg-indigo-300 hover:bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                {loadingBtnMsj}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;