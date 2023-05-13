import React from "react";
import PropTypes from "prop-types";

const BancosSelect = ({
  bancos,
  idBanco,
  setIdBanco,
  labelStyle,
  selectStyle,
}) => {
  return (
    <>
      <label
        htmlFor="bancos"
        className={`${
          labelStyle !== undefined
            ? labelStyle
            : "block text-sm font-medium text-gray-700"
        }`}
      >
        Bancos
      </label>
      <select
        id="banco"
        name="banco"
        className={`${
          selectStyle !== undefined
            ? selectStyle
            : "mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
        }`}
        value={idBanco}
        onChange={async (event) => setIdBanco(event.target.value)}
      >
        <option>Selecciona banco</option>
        {Object.keys(bancos).map((_, item) => (
          <option key={bancos[item].Id_Banco} value={bancos[item].Id_Banco}>
            {bancos[item].NumeroCuenta} - {bancos[item].Descripcion}
          </option>
        ))}
      </select>
    </>
  );
};

export default BancosSelect;

BancosSelect.propTypes = {
  bancos: PropTypes.array,
  idBanco: PropTypes.number,
  setIdBanco: PropTypes.func,
  labelStyle: PropTypes.string,
  selectStyle: PropTypes.string,
};
