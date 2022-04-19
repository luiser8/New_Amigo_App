import React from 'react';
import PropTypes from 'prop-types';
import { RefreshIcon } from '@heroicons/react/solid';

const ReporteInscripciones = ({ 
    menus,
    menusPorCarreras,
    getMenus,
    getMenusPorCarreras,
    getReporte, 
    getReporteCarreras,
    setIdPeriodo,
    setIdPlan,
    idPlan,
    setIdCarrera,
    idCarrera,
    setDesde,
    setHasta,
    lapsos, 
    lapso,
    btnEstablecer 
}) => {
    const querys = async (ev) => {
        await getMenus(ev);
        await getMenusPorCarreras(ev);
    }
    const handleReporte = async (ev) => {
        // eslint-disable-next-line no-unused-expressions
        await idPlan !== 0 ? getReporte(ev) : null;
        // eslint-disable-next-line no-unused-expressions
        await idCarrera !== 0 ? getReporteCarreras(ev) : null;
    }
    return (
        <div className="max-w-7xl mx-auto py-6">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-0 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden ">
                            <div className="mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-3 gap-6">
                                    <div className="md:col-span-1">
                                        <div className="px-4 sm:px-0">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Reporte de inscripciones</h3>
                                            <p className="mt-1 text-sm text-gray-600">Generación de reporte de inscripciones de estudiantes por lapso, tipo de inscripciòn y carreras</p>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                        <form>
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-8 gap-6">
                                                        <div className="col-span-10 sm:col-span-3">
                                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                                Período / Lapso
                                                            </label>
                                                            <select
                                                                id="lapso"
                                                                name="lapso"
                                                                className="mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                                                defaultValue={lapso}
                                                                onChange={async (event) => setIdPeriodo(event.target.value.substring(0, 2))}
                                                            >
                                                                <option>Selecciona lapso</option>
                                                                {Object.keys(lapsos).map((key, item) => (
                                                                    <option key={key} selected={true}>{lapsos[item].Id_Periodo} - {lapsos[item].Lapso}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="col-span-10 sm:col-span-2">
                                                            <label htmlFor="desde" className="block text-sm font-medium text-gray-700">
                                                                Desde
                                                            </label>
                                                            <input type="date" name="desde" id="desde" onChange={(ev) => setDesde(ev.target.value)} />
                                                        </div>
                                                        <div className="col-span-10 sm:col-span-2">
                                                            <label htmlFor="hasta" className="block text-sm font-medium text-gray-700">
                                                                Hasta
                                                            </label>
                                                            <input type="date" name="hasta" id="hasta" onChange={(ev) => setHasta(ev.target.value)}/>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <button
                                                                type="button"
                                                                onClick={async (ev) => querys(ev)}
                                                                disabled={btnEstablecer}
                                                                className={`inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${btnEstablecer ? 'bg-indigo-200 hover:bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                            >
                                                                Buscar inscripciones
                                                            </button>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <button
                                                                type="button"
                                                                onClick={(ev) => handleReporte(ev)}
                                                                disabled={(Object.keys(menus).length !== 0) ? false : true || (Object.keys(menusPorCarreras).length !== 0) ? false : true}
                                                                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${(Object.keys(menus).length === 0 || Object.keys(menusPorCarreras).length === 0) ? 'bg-indigo-200 hover:bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                            >
                                                                Generar reporte
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-2 bg-white sm:p-6">
                                        {(Object.keys(menus).length !== 0) ?
                                            <div className="px-4 py-0">
                                                <RefreshIcon className="float-right -ml-1 -mr-6 h-8 w-8 text-gray-500" onClick={async () => setIdPlan(0)} style={{ cursor: 'pointer' }}  aria-hidden="true" />
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <span className="font-medium text-gray-900">
                                                        Por planes de pago
                                                        
                                                    </span>
                                                </h3>
                                                <div className="pt-6" id="filter-section-mobile-1">
                                                    <div className="space-y-1">
                                                        {Object.keys(menus).map((_, menu) => (
                                                            <div className="flex items-center" key={menus[menu].IdPlan}>
                                                                <input
                                                                    type="radio"
                                                                    value={menus[menu].IdPlan}
                                                                    checked={idPlan == menus[menu].IdPlan}
                                                                    onChange={async (ev) => setIdPlan(ev.target.value)}
                                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" 
                                                                />
                                                                <label className="ml-3 min-w-0 flex-1 text-gray-500">{menus[menu].PlanPago} - <strong> Inscritos: {menus[menu].Inscritos}</strong></label>
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
                                        </div>
                                    </div>
                                <div className="mt-5 md:mt-0 md:col-span-1">
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-2 bg-white sm:p-6">
                                        {(Object.keys(menusPorCarreras).length !== 0) ?
                                            <div className="px-0 py-0">
                                                <RefreshIcon className="float-right -ml-1 -mr-2 h-8 w-8 text-gray-500" onClick={async () => setIdCarrera(0)} style={{ cursor: 'pointer' }}  aria-hidden="true" />
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <span className="font-medium text-gray-900">
                                                        Por Carreras
                                                    </span>
                                                </h3>
                                                <div className="pt-6" id="filter-section-mobile-1">
                                                    <div className="space-y-1">
                                                        {Object.keys(menusPorCarreras).map((_, menu) => (
                                                            <div className="flex items-center" key={menusPorCarreras[menu].IdCarrera}>
                                                                <input
                                                                    type="radio"
                                                                    value={menusPorCarreras[menu].IdCarrera}
                                                                    checked={idCarrera == menusPorCarreras[menu].IdCarrera}
                                                                    onChange={async (ev) => setIdCarrera(ev.target.value)}
                                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" 
                                                                />
                                                                <label className="ml-3 min-w-0 flex-1 text-gray-500">{menusPorCarreras[menu].Carrera} - <strong> Inscritos: {menusPorCarreras[menu].Inscritos}</strong></label>
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

ReporteInscripciones.propTypes = {
    menus: PropTypes.array,
    menusPorCarreras: PropTypes.array,
    getMenus: PropTypes.func,
    getReporte: PropTypes.func,
    getMenusPorCarreras: PropTypes.func,
    getReporteCarreras: PropTypes.func,
    setIdPeriodo: PropTypes.func,
    setIdPlan: PropTypes.func,
    idPlan: PropTypes.number,
    setIdCarrera: PropTypes.func,
    idCarrera: PropTypes.number,
    setDesde: PropTypes.func,
    setHasta: PropTypes.func,
    setLapso: PropTypes.func,
    lapsos: PropTypes.array,
    lapso: PropTypes.string,
    btnEstablecer: PropTypes.bool,
}

export default ReporteInscripciones;