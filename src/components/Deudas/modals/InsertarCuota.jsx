import { Fragment, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import Moment from 'moment';
import { Context } from '../../../context/Context';

const InsertarCuota = ({ openC, confirm, id_inscripcion, aranceles_list }) => {
    const { checkConfig } = useContext(Context);
    const [open, setOpen] = useState(true);
    const [id_arancel, setId_arancel] = useState(0);
    const [monto, setMonto] = useState(checkConfig().Cuota);
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const cancelButtonRef = useRef(null);

    const activeInsertar = (open) => {
        openC(open); setOpen(open);
    }

    const okInsertar = async () => {
        if (id_inscripcion !== '' && id_arancel !== 0 && monto !== '' && fechaVencimiento !== '') {
            confirm({ 'Id_Inscripcion': id_inscripcion, 'Id_Arancel': id_arancel, 'Monto': monto, 'FechaVencimiento': Moment(fechaVencimiento,"YYYY-MM-DD").format("YYYY-MM-DD")});
        }
        setOpen(open);
    }

    const changeArancelFecha = async (value) => {
        let fecha = aranceles_list.find(item => item.Id_Arancel == value);
        value !== 0 ? setId_arancel(value) : setId_arancel(0);
        fecha.FechaVencimiento !== '' ? setFechaVencimiento(fecha.FechaVencimiento) : setFechaVencimiento('');
        /*value.substring(0, 4) !== 0 ? setId_arancel(value.substring(0, 4)) : setId_arancel(0);
        value.slice(5, -1) !== '' ? setFechaVencimiento(value.slice(5, -1)) : setFechaVencimiento('');*/
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

                    {/* This element is to trick the browser into centering the modal contents. */}
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
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Insertar deuda <span style={{ color: 'red' }}>Lapso {checkConfig().Lapso}</span>
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Asegúrate de primero crear la cuota correspondiente y luego realizas la eliminación de dicha cuota.
                                            </p>
                                        </div>
                                        <form className="mt-8 space-y-6">
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Arancel</label>
                                                            <select
                                                                id="arancel"
                                                                name="arancel"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                onChange={async (event) => changeArancelFecha(event.target.value)}
                                                            >
                                                                <option value={0}>Seleciona Arancel</option>
                                                                {Object.keys(aranceles_list).map((key, it) => (
                                                                    <option key={key} value={`${aranceles_list[it].Id_Arancel}`} >{aranceles_list[it].Descripcion} - {Moment(aranceles_list[it].FechaVencimiento,"YYYY-MM-DD").format("YYYY-MM-DD")}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Monto</label>
                                                            <input id="monto" name="monto" value={monto} onChange={async (ev) => setMonto(ev.target.value)} type="text" required className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Monto" />
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
                                    disabled={id_inscripcion !== '' && id_arancel !== 0 && monto !== '' && fechaVencimiento !== '' ? false : true}
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${id_inscripcion !== '' && id_arancel !== 0 && monto !== '' && fechaVencimiento !== '' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-200 hover:bg-green-200'} text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}
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

InsertarCuota.propTypes = {
    openC : PropTypes.func,
    confirm : PropTypes.func,
    id_inscripcion : PropTypes.number,
    aranceles_list : PropTypes.array,
}

export default InsertarCuota;