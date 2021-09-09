import React, { useState, useContext } from 'react';
import { Toast } from '../../utils/Toast';
import { Context } from '../../utils/Context';
import { put } from '../../utils/Fetch';
import Loading from '../Layouts/Loading';
import { CheckCircleIcon, PencilIcon } from '@heroicons/react/outline';

const Actualizar = () => {
    const { checkConfig, setConfig } = useContext(Context);
    const [editCuota, setEditCuota] = useState(false);
    const [lapso, setLapso] = useState(checkConfig().Lapso);
    const [cuota, setCuota] = useState(checkConfig().Cuota);
    const [btnEstablecer, setBtnEstablecer] = useState(checkConfig().Lapso ? false : true);
    const [loading, setLoading] = useState(false);

    const activarEditCuota = async (value) => {
        value ? setEditCuota(true) : setEditCuota(false);
    }

    const establecerCuota = async (value) => {
        value ? setEditCuota(true) : setEditCuota(false);
        if (checkConfig.Cuota !== cuota)
            await putCuota(1, cuota);
    }

    const putCuota = async (id, monto) => {
        await put(`cuotas/update?cuotaId=${id}`, { 'Monto': monto, 'Estado': 1 }).then((items) => {
            items !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Cuota nueva ha sido aplicada.', color: 'green' }) : Toast({ show: false });
            setConfig(2, { 'Lapso': null, 'Cuota': monto });
        });
    }

    const putCuotaAll = async () => {
        setBtnEstablecer(true); setLoading(true);
        await put(`cuotas/updateAll`, { 'Cuota': cuota, 'Abono': 1, 'Lapso': lapso, Pagada: 0 }).then((items) => {
            console.log(items);
            items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Cuota nueva ha sido aplicado en las ${items} cuotas sin pagar`, color: 'yellow' }) : Toast({ show: false });
        });
        setBtnEstablecer(false); setCuota(checkConfig().Cuota); setLoading(false);
    }

    return (
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
            {loading ? <Loading display={'block'} msj={'Aplicando cambios! espera un momento...'} /> : ''}
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Actualización de cuotas</h2>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-6">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-0 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden ">
                                <div className="mt-10 sm:mt-0">
                                    <div className="md:grid md:grid-cols-3 md:gap-6">
                                        <div className="md:col-span-1">
                                            <div className="px-4 sm:px-0">
                                                <h3 className="text-lg font-medium leading-6 text-gray-900">Actualización de cuotas diarias, individuales y masivas</h3>
                                                <p className="mt-1 text-sm text-gray-600">Estas dos maneras de actualización es algo delicado por favor atento al proceso.</p>
                                            </div>
                                        </div>
                                        <div className="mt-5 md:mt-0 md:col-span-2">
                                            <form>
                                                <div className="shadow overflow-hidden sm:rounded-md">
                                                    <div className="px-4 py-2 bg-white sm:p-6">
                                                        <div className="grid grid-cols-8 gap-6">
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="cuota" className="pb-1 block text-sm font-medium text-gray-700">
                                                                    Cuota
                                                                </label>
                                                                <div class="mt-0 flex rounded-md shadow-sm">
                                                                    <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                                        {!editCuota ? 
                                                                            <PencilIcon className="ml-0 mr-1 h-6 w-6 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activarEditCuota(true)} aria-hidden="true" />
                                                                        : 
                                                                            <CheckCircleIcon className="ml-0 mr-1 h-6 w-6 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => establecerCuota(false)} aria-hidden="true" />  
                                                                         }
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        name="cuota"
                                                                        id="cuota"
                                                                        readOnly={!editCuota}
                                                                        value={cuota}
                                                                        autoFocus
                                                                        autoComplete="cuota"
                                                                        onChange={async (event) => setCuota(event.target.value)}
                                                                        className={`mt-0 block w-full py-2 px-3 border border-gray-300 ${editCuota ? 'bg-white-100' : 'bg-gray-100'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                                    />
                                                                </div>
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
                                                            <div className="col-span-3">
                                                                <button
                                                                    type="button"
                                                                    disabled={editCuota === true ? true : false}
                                                                    onClick={async () => putCuotaAll()}
                                                                    className={`inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${editCuota === true ? 'bg-indigo-200 hover:bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                                > 
                                                                    Actualizar cuota a todos
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
