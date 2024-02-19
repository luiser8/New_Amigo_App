import React from 'react';
import PropTypes from "prop-types";

const BannerPuerta = ({
    noPasa,
    esBecado,
    esDesertor,
    existe,
    pagoTodo,
    sinDocumentos,
    esEgresado,
    deuda,
    rolPuerta
}) => {
    console.log(    noPasa,
        esBecado,
        esDesertor,
        existe,
        pagoTodo,
        sinDocumentos,
        esEgresado,
        deuda,
        rolPuerta)
    return (
        <>
        {esBecado && !noPasa ? (
            <p className={`flex items-center text-${noPasa ? 'red' : 'green'}-600 font-bold mb-2 text-7xl`}>
                SI PUEDE PASAR
            </p>
        ) : (
            <></>
        )}
            {deuda !== 0 && rolPuerta === 4 ? (
                <p className={`flex items-center text-${noPasa ? 'red' : `${sinDocumentos ? 'yellow' : 'green'}`}-${sinDocumentos ? '400' : '600'} font-bold mb-2 text-7xl`}>
                    {noPasa ? 'NO PUEDE PASAR' : 'SI PUEDE PASAR'}
                </p>
            ) : (
                <></>
            )}
            {!esBecado && !noPasa && pagoTodo ? (
                <p className={`flex items-center text-${noPasa ? 'red' : 'green'}-600 font-bold mb-2 text-7xl`}>
                    SI PUEDE PASAR
                </p>
            ) : (
                <></>
            )}
            {esDesertor && noPasa ? (
                <p className={`flex items-center text-${noPasa ? 'red' : 'green'}-600 font-bold mb-2 text-5xl`}>
                    DESERTOR, DEBE PASAR POR CAJA
                </p>
            ) : (
                <></>
            )}
            {!existe && noPasa && !esEgresado? (
                <p className={`flex items-center text-${noPasa ? 'red' : 'green'}-600 font-bold mb-2 text-5xl`}>
                    NO EXISTE, NO PUEDE PASAR
                </p>
            ) : (
                <></>
            )}
            {existe && sinDocumentos ? (
                <p className={`flex items-center text-${noPasa ? 'red' : 'yellow'}-${sinDocumentos ? '400' : '600'} font-bold mb-2 text-3xl`}>
                    CON DOCUMENTOS POR CONSIGNAR
                </p>
            ) : (
                <></>
            )}
            {esEgresado ? (
                <p className={`flex items-center text-green-${esEgresado ? '600' : '400'} font-bold mb-2 text-5xl`}>
                    EGRESADO, PUEDE PASAR
                </p>
            ) : (
                <></>
            )}
        </>
    )
}

BannerPuerta.propTypes = {
    noPasa: PropTypes.bool,
    esBecado: PropTypes.bool,
    esDesertor: PropTypes.bool,
    existe: PropTypes.bool,
    pagoTodo: PropTypes.bool,
    sinDocumentos: PropTypes.bool,
    esEgresado: PropTypes.bool,
    deuda: PropTypes.number,
    rolPuerta: PropTypes.number
  };

export default BannerPuerta;