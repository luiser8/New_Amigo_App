import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const ArancelesSelect = ({ aranceles, changeArancelFecha }) => {
    return (
        <>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Arancel</label>
            <select
                id="arancel"
                name="arancel"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={async (event) => changeArancelFecha(Number(event.target.value))}
            >
                <option value={0}>Selecciona Arancel</option>
                {Object.keys(aranceles).map((key, it) => (
                    <option key={key} value={`${aranceles[it].Id_Arancel}`} >{aranceles[it].Descripcion} - {moment(aranceles[it].FechaVencimiento, "YYYY-MM-DD").format("YYYY-MM-DD")}</option>
                ))}
            </select>
        </>
    )
}

export default ArancelesSelect;

ArancelesSelect.propTypes = {
    aranceles: PropTypes.array,
    changeArancelFecha: PropTypes.func,
}
