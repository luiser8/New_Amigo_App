import { Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import {
    ExclamationIcon,
} from "@heroicons/react/outline";

const CambiarClave = ({
    openC,
    confirm,
    usuarioId,
}) => {
    const [open, setOpen] = useState(true);
    const [nuevaClave, setNuevaClave] = useState('');
    const cancelButtonRef = useRef(null);

    const activeCambiarClave = (open) => {
        openC(open); setOpen(open);
    };

    const okCambiarClave = async (open) => {
        setOpen(open); confirm({ 'UsuarioId': usuarioId, 'Contrasena': nuevaClave });
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={() => activeCambiarClave(false)}
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

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
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
                            <div className="bg-white px-4 pt-5 pb-2 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon
                                            className="h-6 w-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            Cambiar contraseña
                                        </Dialog.Title>
                                        <form className="mt-6 space-y-6">
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="col-span-10 sm:col-span-3">
                                                            <label htmlFor="nuevaclave" className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
                                                            <input type="password" id="nuevaclave" name="nuevaclave" onChange={async (ev) => setNuevaClave(ev.target.value)} required className="mt-1 block w-full py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Nueva contraseña" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    disabled={
                                        nuevaClave !== '' ? false : true
                                    }
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${nuevaClave !== ''
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-green-200 hover:bg-green-200"
                                        } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}
                                    onClick={() => okCambiarClave(true)}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => activeCambiarClave(false)}
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
    );
};
CambiarClave.propTypes = {
    openC: PropTypes.func,
    confirm: PropTypes.func,
    usuarioId: PropTypes.string,
};
export default CambiarClave;
