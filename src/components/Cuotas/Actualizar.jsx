import React, { useState, useContext } from 'react';
import { Toast } from '../../utils/Toast';
import { Context } from '../../utils/Context';
import { put } from '../../utils/Fetch';
import Loading from '../Layouts/Loading';

const Actualizar = () => {
    const { checkConfig } = useContext(Context);
    const [lapso, setLapso] = useState(checkConfig().Lapso);
    const [cuota, setCuota] = useState(checkConfig().Cuota);
    const [btnEstablecer, setBtnEstablecer] = useState(false);
    const [loading, setLoading] = useState(false);

    const putCuota = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true); setLoading(true);
        await put(`cuotas/updateAll`, { 'Cuota': cuota, 'Abono': 1, 'Lapso': lapso, Pagada: 0 }).then((items) => {
            console.log(items);
            items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Cuota nueva ha sido aplicado en los ${items} estudiantes`, color: 'yellow' }) : Toast({ show: false });
        });
        setBtnEstablecer(false); setCuota(checkConfig().Cuota); setLoading(false);
    }

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {loading ? <Loading display={'block'} msj={'Aplicando cambios! espera un momento...'} /> : ''}
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Actualizar cuotas</h2>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-6">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden ">
                                <div className="mt-10 sm:mt-0">
                                    <div className="md:grid md:grid-cols-3 md:gap-6">
                                        <div className="md:col-span-1">
                                            <div className="px-4 sm:px-0">
                                                <h3 className="text-lg font-medium leading-6 text-gray-900">Actualización de cuotas individuales y masivas</h3>
                                                <p className="mt-1 text-sm text-gray-600">Estas dos maneras de actualización es algo delicado por favor atento al proceso.</p>
                                            </div>
                                        </div>
                                        <div className="mt-5 md:mt-0 md:col-span-2">
                                            <form onSubmit={async (ev) => putCuota(ev)}>
                                                <div className="shadow overflow-hidden sm:rounded-md">
                                                    <div className="px-4 py-5 bg-white sm:p-6">
                                                        <div className="grid grid-cols-8 gap-6">
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="cuota" className="block text-sm font-medium text-gray-700">
                                                                    Cuota
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="cuota"
                                                                    id="cuota"
                                                                    readOnly="true"
                                                                    value={cuota}
                                                                    autoComplete="cuota"
                                                                    onChange={async (event) => setCuota(event.target.value)}
                                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>

                                                            <div className="col-span-8 sm:col-span-3">
                                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                                    Lapso
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="lapso"
                                                                    id="lapso"
                                                                    readOnly="true"
                                                                    value={checkConfig().Lapso !== null ? checkConfig().Lapso : lapso}
                                                                    onChange={async (event) => setLapso(event.target.value)}
                                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                            <div className="col-span-8 sm:col-span-3">
                                                                <button
                                                                    type="submit"
                                                                    disabled={btnEstablecer}
                                                                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${btnEstablecer ? 'bg-indigo-200 hover:bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                                >
                                                                    Establecer
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actualizar;
