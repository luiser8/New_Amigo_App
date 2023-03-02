import React from 'react';
import PropTypes from 'prop-types';
import LapsosSelect from '../../components/selects/LapsosSelect';

const DatosEstudiantes = ({ lapsos, lapso, establecerLapso, setIdentificador, identificador, check }) => {
    return (
        <div className="mt-8 flex lg:mt-0 lg:ml-0">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Datos del estudiante
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        type="text"
                        name="indentificador"
                        id="indentificador"
                        autoFocus
                        className="mt-1 block w-full py-3 pl-2 pr-20 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                        placeholder="Identificador"
                        value={identificador}
                        onChange={async (event) => setIdentificador(event.target.value)}
                        onKeyPress={async (ev) => ev.charCode === 13 ? check() : null}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <LapsosSelect lapsos={lapsos} lapso={lapso} setLapso={establecerLapso} labelStyle={"sr-only"} selectStyle={"mt-0 block w-full py-3 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

DatosEstudiantes.propTypes = {
    setIdentificador: PropTypes.func,
    establecerLapso: PropTypes.func,
    check: PropTypes.func,
    lapsos: PropTypes.array,
    lapso: PropTypes.string,
    identificador: PropTypes.string,
}

export default DatosEstudiantes;