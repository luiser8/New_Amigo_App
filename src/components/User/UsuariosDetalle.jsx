import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { KeyIcon, PencilIcon, RefreshIcon, UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline';

const UsuariosDetalle = ({ usuarios, activeInsertar }) => {
    return (
        <div className="max-w-7xl mx-auto pt-1 pb-8 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between mb-6">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Cuentas de usuario</h2>
                    <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-2">

                    </div>
                </div>
                <div className="mt-5 flex">
                    <span className="hidden sm:block">
                        <button
                            type="button"
                            className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={async () => activeInsertar(true)}
                        >
                            <UserAddIcon className="-ml-1 mr-0 h-6 w-6 text-gray-500" aria-hidden="true" />
                            Crear
                        </button>
                    </span>
                </div>
            </div>
            {(Object.keys(usuarios).length !== 0) ?
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
                                                    Rol
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Cédula
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Nombres
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Apellidos
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Usuario
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Fecha Creación
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Opciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {Object.keys(usuarios).map((key, item) => (
                                                <tr key={key} className="hover:bg-gray-50">

                                                    <td className={`px-6 py-4 whitespace-nowrap `}>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {usuarios[item].Rol} - {usuarios[item].Rol === 2 ? 'Administrador' : 'Operador'}
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuarios[item].Cedula}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuarios[item].Nombres}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuarios[item].Apellidos}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{usuarios[item].Usuario}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{Moment(usuarios[item].FechaCreacion).format('DD-MM-YYYY')}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                                            <UserRemoveIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{ cursor: 'pointer' }} aria-hidden="true" />
                                                            <RefreshIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{ cursor: 'pointer' }} aria-hidden="true" />
                                                            <PencilIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{ cursor: 'pointer' }} aria-hidden="true" />
                                                            <KeyIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{ cursor: 'pointer' }} aria-hidden="true" />
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

UsuariosDetalle.propTypes = {
    activeInsertar: PropTypes.func,
    usuarios: PropTypes.array,
}

export default UsuariosDetalle;