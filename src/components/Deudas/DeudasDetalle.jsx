import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

const DeudasDetalle = ({ checkuser, deudas, cuotaVencida, activeConfirmacion, activeModificacion }) => {
    return (
        <Fragment>
            {(Object.keys(deudas).length !== 0) ?
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
                                                    Arancel
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Pagada
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
                                                    Monto Facturas
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Total
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Fecha Vencimiento
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Opciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {Object.keys(deudas).map((key, item) => (
                                                <tr key={key} className="hover:bg-gray-50">

                                                    <td className={`px-6 py-4 whitespace-nowrap ${deudas[item].Pagada === 0 ? cuotaVencida ? 'bg-red-100' : 'bg-yellow-100' : 'bg-green-100'}`}>
                                                        <div className="text-sm font-semibold text-gray-900">{deudas[item].Cuota}</div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${deudas[item].Pagada === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                            {deudas[item].Pagada === 0 ? 'No' : 'Si'}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bsf. {deudas[item].Monto}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bsf. {deudas[item].MontoFacturas}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bsf. {deudas[item].Total}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{Moment(deudas[item].FechaVencimiento).format('DD-MM-YYYY')}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                                            {deudas[item].Pagada === 0 ?
                                                                <>
                                                                    {checkuser !== '4' ? <>
                                                                    <TrashIcon className="-ml-1 mr-2 h-8 w-8 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activeConfirmacion({ 'open': true, 'pagada': deudas[item].Pagada, 'id_inscripcion': deudas[item].Id_Inscripcion, 'id_arancel': deudas[item].Id_Arancel, 'arancel': deudas[item].Cuota })} aria-hidden="true" />
                                                                    <PencilIcon className="-ml-1 mr-2 h-8 w-8 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activeModificacion(true, deudas[item].Id_Cuenta, deudas[item].Cuota)} aria-hidden="true" />
                                                                    </> : <></>}
                                                                </>
                                                                :
                                                                <></>
                                                            }
                                                            {deudas[item].Pagada === 1 ?
                                                                <TrashIcon className="-ml-1 mr-2 h-8 w-8 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activeConfirmacion({ 'open': true, 'pagada': deudas[item].Pagada, 'id_inscripcion': deudas[item].Id_Inscripcion, 'id_arancel': deudas[item].Id_Arancel, 'arancel': deudas[item].Cuota })} aria-hidden="true" />
                                                                :
                                                                <></>
                                                            }
                                                        </div>
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
        </Fragment>
    )
}

DeudasDetalle.propTypes = {
    checkuser: PropTypes.string,
    activeConfirmacion: PropTypes.func,
    activeModificacion: PropTypes.func,
    deudas: PropTypes.array,
    cuotaVencida: PropTypes.bool,
}

export default DeudasDetalle;