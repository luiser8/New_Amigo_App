import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { TrashIcon } from '@heroicons/react/solid';

const Facturas = ({ factura_list, openC }) => {

    const activeConfirmacion = (open) => {
        openC(open);
    }

    return (
        <div className="pt-10 pb-8">
            {(Object.keys(factura_list).length !== 0) ?
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Factura
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Arancel
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
                                                    Fecha de pago
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Opciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {factura_list.map((key, item) => (
                                                factura_list[item].Factura.map((key, f) => (
                                                    <tr key={key} className="hover:bg-gray-50">
                                                        <td className={`px-6 py-4 whitespace-nowrap ${factura_list[item].Factura[f].Anulada === 1 ? 'bg-red-200' : 'bg-green-200'}`}>
                                                            <span className="text-xs font-bold text-gray-900">{factura_list[item].Factura[f].Anulada === 1 ? 'Anulada' : ''}</span>
                                                            <div className="text-sm font-bold text-gray-900">{factura_list[item].Factura[f].Id_Factura}</div>
                                                        </td>
                                                        <td className={`px-6 py-4 whitespace-nowrap ${factura_list[item].Factura[f].Abono === 1 ? 'bg-yellow-50' : 'bg-green-50'}`}>
                                                            <div className="text-sm font-semibold text-gray-900">
                                                                {factura_list[item].Factura[f].Abono === 1 ? `ABONO ${factura_list[item].Factura[f].Descripcion}` : factura_list[item].Factura[f].Descripcion}
                                                            </div>
                                                        </td>
                                                        <td className={`px-6 py-4 whitespace-nowrap`}>
                                                            <div className="text-sm font-semibold text-gray-900">{factura_list[item].Factura[f].Monto}</div>
                                                        </td>
                                                        <td className={`px-6 py-4 whitespace-nowrap`}>
                                                            <div className="text-sm font-semibold text-gray-900">{Moment(factura_list[item].Factura[f].Hora).format('DD-MM-YYYY hh:mm:ss A')}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                                <TrashIcon className="-ml-1 mr-2 h-8 w-8 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activeConfirmacion({'open':true, 'pagada': 1, 'id_inscripcion': factura_list[item].Factura[f].Id_Inscripcion,'id_arancel': factura_list[item].Factura[f].Id_Arancel,'arancel': factura_list[item].Factura[f].Descripcion})} aria-hidden="true" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="max-w-7xl mx-auto pt-4 pb-10">
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
                </div>
            }
        </div>
    )
}
Facturas.propTypes = {
    factura_list: PropTypes.object,
}
export default Facturas;
