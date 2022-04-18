import { Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';

const Insertar = ({ openInsert, roles, usuarios, confirm }) => {
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);
    const [errorCedula, setErrorCedula] = useState('');
    const [errorUsuario, setErrorUsuario] = useState('');
    const [rolId, setRolId] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const activeInsertar = (open) => {
        openInsert(open); setOpen(open);
    }
    const okInsertar = async () => {
        confirm({ 'RolId': rolId, 'Cedula': cedula, 'Nombres': nombres, 'Apellidos': apellidos, 'Usuario': usuario, 'Contrasena': contrasena });
        setOpen(open);
    }
    const checkValid = (type, value) => {
        if (type === 1) {
            let valid = usuarios.filter(u => u.Cedula === Number(value));
            valid.length === 0 ? setErrorCedula('') : setErrorCedula('Cédula existe');
            valid.length === 0 ? setCedula(value) : setCedula('');
        } else if (type === 2) {
            let valid = usuarios.filter(u => u.Usuario === value);
            valid.length === 0 ? setErrorUsuario('') : setErrorUsuario('Usuario existe');
            valid.length === 0 ? setUsuario(value) : setUsuario('');
        }
    }

    const okValid = () => {
        return rolId !== '' 
        && cedula !== 0 
        && nombres !== '' 
        && apellidos !== '' 
        && usuario !== '' 
        && contrasena !== '' 
        && errorCedula === '' 
        && errorUsuario === ''
        ? false : true;
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={() => activeInsertar(false)}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Crear Usuario
                                    </Dialog.Title>

                                    <form className="mt-4 space-y-6">
                                        <div className="shadow overflow-hidden sm:rounded-md">
                                            <div className="px-4 py-2 bg-white ">
                                                <div className="grid grid-cols-10 gap-4">
                                                    <div className="col-span-5">
                                                        <label htmlFor="rol" className="block text-sm font-medium text-gray-700">Rol</label>
                                                        <select
                                                            id="rol"
                                                            name="rol"
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            onChange={async (event) => setRolId(event.target.value)}
                                                        >
                                                            <option value={0}>Seleciona Rol</option>
                                                            {Object.keys(roles).map((key, it) => (
                                                                <option key={key} value={`${roles[it].RolId}`} >{roles[it].Nombre}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-span-5">
                                                        <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">Cédula</label>
                                                        <input id="cedula" name="cedula" onChange={async (ev) => checkValid(1, ev.target.value)/*setCedula(ev.target.value)*/} type="text" required className="mt-1 block w-full py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cédula" />
                                                        {errorCedula !== '' ? <span>{errorCedula}</span> : <></>}
                                                    </div>
                                                    <div className="col-span-5">
                                                        <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">Nombres</label>
                                                        <input id="nombres" name="nombres" onChange={async (ev) => setNombres(ev.target.value)} type="text" required className="mt-1 block w-full py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nombres" />
                                                    </div>
                                                    <div className="col-span-5">
                                                        <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos</label>
                                                        <input id="apellidos" name="apellidos" onChange={async (ev) => setApellidos(ev.target.value)} type="text" required className="mt-1 block w-full py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Apellidos" />
                                                    </div>
                                                    <div className="col-span-5">
                                                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario</label>
                                                        <input id="usuario" name="usuario" onChange={async (ev) => checkValid(2, ev.target.value)/*setUsuario(ev.target.value)*/} type="text" required className="mt-1 block w-full py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Usuario" />
                                                        {errorUsuario !== '' ? <span>{errorUsuario}</span> : <></>}
                                                    </div>
                                                    <div className="col-span-5">
                                                        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
                                                        <input id="contrasena" name="contrasena" onChange={async (ev) => setContrasena(ev.target.value)} type="password" required className="mt-1 block w-full py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Contraseña" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    disabled={okValid()}
                                    className={`${!okValid() ? 'bg-green-600 hover:bg-green-700' : 'bg-green-200 hover:bg-green-200'} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}
                                    onClick={() => okInsertar(true)}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => activeInsertar(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

Insertar.propTypes = {
    openInsert: PropTypes.func,
    confirm: PropTypes.func,
    roles: PropTypes.array,
    usuarios: PropTypes.array,
}

export default Insertar;