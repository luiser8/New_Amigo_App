import React from 'react';
import PropTypes from 'prop-types';

const ReporteDeudas = ({
    getReporte,
    setLapso,
    lapsos,
    lapso,
    setPagada,
    pagada,
    btnEstablecer
}) => {
    return (
        <div className="max-w-7xl mx-auto py-6">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-0 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden ">
                            <div className="mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="md:col-span-1">
                                        <div className="px-4 sm:px-0">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Reporte de deudas</h3>
                                            <p className="mt-1 text-sm text-gray-600">Generación de reporte de deudas de estudiantes por lapso / cuotas</p>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                        <form onSubmit={async (ev) => getReporte(ev)}>
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-8 gap-6">
                                                        <div className="col-span-10 sm:col-span-3">
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
                                                                    <option key={key} selected={true} >{lapsos[item].Lapso}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-span-10 sm:col-span-3">
                                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                                Tipo
                                                            </label>
                                                            <select
                                                                id="pagada"
                                                                name="pagada"
                                                                className="mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                                                value={pagada}
                                                                onChange={async (event) => setPagada(Number(event.target.value))}
                                                            >
                                                                <option value={0} selected>Deudas sin pagar</option>
                                                                <option value={1}>Deudas pagadas</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-span-8">
                                                            <button
                                                                type="submit"
                                                                disabled={btnEstablecer}
                                                                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${btnEstablecer ? 'bg-indigo-200 hover:bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                            >
                                                                Generar reporte
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
    )
}

ReporteDeudas.propTypes = {
    getReporte: PropTypes.func,
    setLapso: PropTypes.func,
    lapsos: PropTypes.array,
    lapso: PropTypes.string,
    setPagada: PropTypes.func,
    pagada: PropTypes.number,
    btnEstablecer: PropTypes.bool,
}

export default ReporteDeudas;