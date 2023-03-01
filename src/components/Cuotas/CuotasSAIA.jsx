import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

const CuotasSAIA = ({
    planesSAIA,
    lapsos,
    arancelesSAIA,
    postCuotaSAIA,
    changeMonto,
    setCuotaSAIA,
    setLapso,
    changeArancelFechaSAIA,
    planesCheck,
    cuotaSAIA,
    lapso,
    id_arancelSAIA
}) => {
    return (
        <div className="mt-4 md:mt-0 md:col-span-2">
            <form onSubmit={async (ev) => postCuotaSAIA(ev)}>
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-4 bg-white sm:p-6">
                        <div className="grid grid-cols-10 gap-6">
                            <div className="col-span-10 sm:col-span-8">
                                {(Object.keys(planesSAIA).length !== 0) ?
                                    <div className="px-4 py-0">
                                        <h2 className="-mx-2 mb-2 flow-root">
                                            <span className="font-medium text-lg text-gray-900">
                                                Insertar cuotas a SAIA Internacional
                                            </span>
                                        </h2>
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <span className="font-medium text-gray-900">
                                                Planes de pago SAIA Internacional
                                            </span>
                                        </h3>
                                        <div className="pt-6" id="filter-section-mobile-1">
                                            <div className="space-y-1">
                                                {Object.keys(planesSAIA).map((key, plan) => (
                                                    <div className="flex items-center" key={planesSAIA[plan].Id_Plan}>
                                                        <input
                                                            type="checkbox"
                                                            defaultValue={planesSAIA[plan].Id_Plan}
                                                            defaultChecked={false}
                                                            id={`Plan${planesSAIA[plan].Id_Plan.toString().slice(-1)}`}
                                                            onChange={async (ev) => changeMonto(ev.target.checked, planesSAIA[plan].Id_Plan)}
                                                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                        <label className="ml-3 min-w-0 flex-1 text-gray-500">{planesSAIA[plan].Descripcion}</label>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex flex-col">
                                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                    <div className="border border-blue-300 shadow rounded-md p-8 w-full mx-auto">
                                                        <div className="animate-pulse flex space-x-4">
                                                            <div className="flex-1 space-y-4 py-1">
                                                                <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                                                                <div className="space-y-2">
                                                                    <div className="h-4 bg-blue-400 rounded"></div>
                                                                    <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="col-span-8 sm:col-span-3">
                                <label htmlFor="cuotaSAIA" className="block text-sm font-medium text-gray-700">
                                    Cuota SAIA Internacional
                                </label>
                                <input
                                    type="text"
                                    name="cuotaSAIA"
                                    id="cuotaSAIA"
                                    value={cuotaSAIA}
                                    readOnly="true"
                                    autoComplete="cuotaSAIA"
                                    onChange={async (event) => setCuotaSAIA(event.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-8 sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Lapso
                                </label>
                                <select
                                    id="lapso"
                                    name="lapso"
                                    className="mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                    value={lapso}
                                    onChange={async (event) => setLapso(event.target.value)}
                                >
                                    <option>Selecciona lapso</option>
                                    {Object.keys(lapsos).map((key, item) => (
                                        <option key={key}>{lapsos[item].Lapso}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Arancel</label>
                                <select
                                    id="arancel"
                                    name="arancel"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={async (event) => changeArancelFechaSAIA(Number(event.target.value))}
                                >
                                    <option value={0}>Seleciona Arancel</option>
                                    {Object.keys(arancelesSAIA).map((key, it) => (
                                        <option key={key} value={`${arancelesSAIA[it].Id_Arancel}`} >{arancelesSAIA[it].Descripcion} - {Moment(arancelesSAIA[it].FechaVencimiento, "YYYY-MM-DD").format("YYYY-MM-DD")}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-8 sm:col-span-3">
                                <button
                                    type="submit"
                                    disabled={planesCheck.length !== 0 && id_arancelSAIA !== 0 ? false : true}
                                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${planesCheck.length !== 0 && id_arancelSAIA !== 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-200 hover:bg-indigo-200'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    Insertar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

CuotasSAIA.propTypes = {
    planesSAIA: PropTypes.array,
    lapsos: PropTypes.array,
    arancelesSAIA: PropTypes.array,
    postCuotaSAIA: PropTypes.func,
    changeMonto: PropTypes.func,
    setCuotaSAIA: PropTypes.func,
    setLapso: PropTypes.func,
    changeArancelFechaSAIA: PropTypes.func,
    planesCheck: PropTypes.array,
    cuotaSAIA: PropTypes.string,
    lapso: PropTypes.string,
    id_arancelSAIA: PropTypes.number,
}

export default CuotasSAIA;