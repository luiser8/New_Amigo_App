import React from 'react';
import PropTypes from 'prop-types';

const LapsosSelect = ({ lapsos, lapso, setLapso, labelStyle, selectStyle}) => {
    return (
        <>
            <label htmlFor="country" className={`${labelStyle !== undefined ? labelStyle : 'block text-sm font-medium text-gray-700'}`}>
                Lapso
            </label>
            <select
                id="lapso"
                name="lapso"
                className={`${selectStyle !== undefined ? selectStyle : 'mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base'}`}
                value={lapso}
                onChange={async (event) => setLapso(event.target.value)}
            >
                <option>Selecciona lapso</option>
                {Object.keys(lapsos).map((_, item) => (
                    <option key={lapsos[item].Id_Periodo} value={lapsos[item].Lapso}>{lapsos[item].Lapso}</option>
                ))}
            </select>
        </>
    )
}

export default LapsosSelect;

LapsosSelect.propTypes = {
    lapsos: PropTypes.array,
    lapso: PropTypes.string,
    setLapso: PropTypes.func,
    labelStyle: PropTypes.string,
    selectStyle: PropTypes.string,
}
