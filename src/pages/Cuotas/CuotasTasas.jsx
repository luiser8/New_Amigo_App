import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import LapsosSelect from '../../components/selects/LapsosSelect';

const CuotasTasas = (
    {
        cuotas,
        setFechaDesde,
        setFechaHasta,
        getCuotasByLapsos,
        lapsos,
        lapsoTasa,
        setLapsoTasa,
    }
) => {
    return (
        <div className="pt-10 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="mt-8 sm:mt-0">
                                    <div className="md:grid md:grid-cols-2 md:gap-6">
                                        <div className="mt-4 md:mt-0 md:col-span-2">
                                            <form>
                                                <div className="shadow overflow-hidden sm:rounded-md">
                                                    <div className="px-4 py-1 bg-white sm:p-6">
                                                        <div className="grid grid-cols-8 gap-6">
                                                            <div className="col-span-2 sm:col-span-1">
                                                                <LapsosSelect lapsos={lapsos} lapso={lapsoTasa} setLapso={setLapsoTasa}/>
                                                            </div>
                                                            <div className="col-span-2 sm:col-span-1 pt-4">
                                                                <label htmlFor="desde" className="block text-sm font-medium text-gray-700">
                                                                    Desde
                                                                </label>
                                                                <input type="date" name="desde" id="desde" onChange={(event) => setFechaDesde(event.target.value)} />
                                                            </div>
                                                            <div className="col-span-2 sm:col-span-1 pt-4">
                                                                <label htmlFor="hasta" className="block text-sm font-medium text-gray-700">
                                                                    Hasta
                                                                </label>
                                                                <input type="date" name="hasta" id="hasta" onChange={(event) => setFechaHasta(event.target.value)} />
                                                            </div>
                                                            <div className="col-span-2 sm:col-span-2 mx-4 pt-4">
                                                                <button
                                                                    type="button"
                                                                    onClick={async (ev) => getCuotasByLapsos(ev)}
                                                                    className={`inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                                >
                                                                    Buscar tasas
                                                                </button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {(Object.keys(cuotas).length !== 0) ?
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
                                                    Dólar
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
                                                    Fecha creación
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
                                                    <td className={`px-6 py-4 whitespace-nowrap ${cuotas[item].Tipo === 2 ? 'bg-yellow-50' : 'bg-green-50'}`}>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {cuotas[item].Tipo === 2 ? 'Nacional' : 'Internacional'}
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
                                 :<></>}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
CuotasTasas.propTypes = {
    cuotas: PropTypes.array,
    setFechaDesde: PropTypes.func,
    setFechaHasta: PropTypes.func,
    getCuotasByLapsos: PropTypes.func,
    lapsos: PropTypes.array,
    lapsoTasa: PropTypes.string,
    setLapsoTasa: PropTypes.func,
}
export default CuotasTasas;
