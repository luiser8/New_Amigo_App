import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';

const CuotasTasas = ({ cuotas, fechaDesde, setFechaDesde, fechaHasta, setFechaHasta, getCuotasByLapsos }) => {
    return (
        <div className="pt-10 pb-8">
            {(Object.keys(cuotas).length !== 0) ?
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                {/* <div class="mt-10 sm:mt-0">
                                    <div class="md:grid md:grid-cols-4 md:gap-6">
                                        <div class="mt-5 md:mt-0 md:col-span-2">
                                            <form>
                                                <div class="shadow overflow-hidden sm:rounded-md">
                                                    <div class="px-4 py-5 bg-white sm:p-6">
                                                        <div class="grid grid-cols-6 gap-6">
                                                            <div class="col-span-6 sm:col-span-3">
                                                                <label for="fechaDesde" class="block text-sm font-medium text-gray-700">Fecha desde</label>
                                                                <input type="date" value={fechaDesde} onChange={(event) => setFechaDesde(event.target.value)} name="fechaDesde" id="fechaDesde" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                            </div>
                                                            <div class="col-span-6 sm:col-span-3">
                                                                <label for="fechaHasta" class="block text-sm font-medium text-gray-700">Fecha hasta</label>
                                                                <input type="date" value={fechaHasta} onChange={(event) => getCuotasByLapsos(event.target.value)} name="fechaHasta" id="fechaHasta" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Lapso
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Tipo
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Dolar
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Tasa
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Monto
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Fecha creacion
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Estado
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {cuotas.map((_, item) => (
                                                <tr key={cuotas[item].CuotaId} className={`${cuotas[item].Estado === 1 ? 'bg-green-100' : ''}`}>
                                                    <td className={`px-6 py-4 whitespace-nowrap`}>
                                                        <div className="text-sm font-semibold text-gray-900">{cuotas[item].Lapso}</div>
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap ${cuotas[item].Tipo === 1 ? 'bg-yellow-50' : 'bg-green-50'}`}>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {cuotas[item].Tipo === 1 ? 'Nacional' : 'Internacional'}
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap`}>
                                                        <div className="text-sm font-semibold text-gray-900">${cuotas[item].Dolar}</div>
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap`}>
                                                        <div className="text-sm font-semibold text-gray-900">Bs.{cuotas[item].Tasa}</div>
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap`}>
                                                        <div className="text-sm font-semibold text-gray-900">Bs.{cuotas[item].Monto}</div>
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap`}>
                                                        <div className="text-sm font-semibold text-gray-900">{Moment(cuotas[item].FechaCreacion).format('DD-MM-YYYY hh:mm:ss A')}</div>
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap`}>
                                                        <div className="text-sm font-semibold text-gray-900">{cuotas[item].Estado === 1 ? 'Actual' : 'Pasada'}</div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    )
}
CuotasTasas.propTypes = {
    cuotas: PropTypes.array,
    fechaDesde: PropTypes.string,
    setFechaDesde: PropTypes.func,
    fechaHasta: PropTypes.string,
    setFechaHasta: PropTypes.func,
    getCuotasByLapsos: PropTypes.func,
}
export default CuotasTasas;
