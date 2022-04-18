import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AdjustmentsIcon, PencilIcon, PlusCircleIcon } from '@heroicons/react/solid';

const PanelEdicion = ({ deudas, facturas, activeModificacionCedula, activeInsertar, activeModificacionInsc }) => {
    return (
        <Fragment>
            <div className="mt-6 flex">
                <span className="hidden sm:block">
                    <button
                        type="button"
                        title="Editar datos Estudiantes"
                        disabled={(Object.keys(deudas).length !== 0) || (Object.keys(facturas).length !== 0) ? false : true}
                        className={`inline-flex items-center px-2 py-2 border rounded-md shadow-sm text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50 bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        onClick={async () => activeModificacionCedula(true)}
                    >
                        <PencilIcon className={`mr-0 h-8 w-8 ${(Object.keys(deudas).length !== 0) || (Object.keys(facturas).length !== 0) ? 'text-gray-500 cursor-pointer' : 'text-gray-100 cursor-no-drop'}`} aria-hidden="true" />
                    </button>
                </span>
            </div>
            <div className="mt-6 flex">
                <span className="hidden sm:block">
                    <button
                        type="button"
                        title="Cargar aranceles"
                        disabled={(Object.keys(deudas).length !== 0) || (Object.keys(facturas).length !== 0) ? false : true}
                        className={`inline-flex items-center px-2 py-2 border rounded-md shadow-sm text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50 bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        onClick={async () => activeInsertar(true)}
                    >
                        <PlusCircleIcon className={`mr-0 h-8 w-8 ${(Object.keys(deudas).length !== 0) || (Object.keys(facturas).length !== 0) ? 'text-gray-500 cursor-pointer' : 'text-gray-100 cursor-no-drop'}`} aria-hidden="true" />
                    </button>
                </span>
            </div>
            <div className="mt-6 flex">
                <span className="hidden sm:block">
                    <button
                        type="button"
                        title="Ajustes de Inscripción"
                        disabled={(Object.keys(deudas).length !== 0) || (Object.keys(facturas).length !== 0) ? false : true}
                        className={`inline-flex items-center px-2 py-2 border rounded-md shadow-sm text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50 bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        onClick={async () => activeModificacionInsc(true)}
                    >
                        <AdjustmentsIcon className={`mr-0 h-8 w-8 ${(Object.keys(deudas).length !== 0) || (Object.keys(facturas).length !== 0) ? 'text-gray-500 cursor-pointer' : 'text-gray-100 cursor-no-drop'}`} aria-hidden="true" />
                    </button>
                </span>
            </div>
        </Fragment>
    )
}

PanelEdicion.propTypes = {
    activeModificacionCedula: PropTypes.func,
    activeInsertar: PropTypes.func,
    activeModificacionInsc: PropTypes.func,
    deudas: PropTypes.array,
    facturas: PropTypes.array,
}

export default PanelEdicion;