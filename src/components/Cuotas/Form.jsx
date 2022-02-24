import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Form = ({
    checkConfig,
    tipo,
    editCuota,
    activarEditCuota,
    establecerCuota,
    cuota,
    setCuota,
    putCuotasAll,
    lapsos,
    lapso,
    setLapso,
    tasa,
    setTasa,
    dolar,
    setDolar,
}) => {

    const calculaCuota = (value) => {
        if(value !== '' || value !== 0){
            setTasa(value);
            let valueCuota = dolar * value;
            setCuota(valueCuota.toFixed(2)); 
        }else{
            setTasa(0);setCuota(0);
        }
    }

    useEffect(() => {
        tipo === '1' ? setDolar(checkConfig().DolarN) : setDolar(checkConfig().DolarI);
    }, [tipo]);
    return (
        <form>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-2 bg-white sm:p-6">
                    <div className="grid grid-cols-8 gap-6">
                        <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="cuota" className="pb-1 block text-sm font-medium text-gray-700">
                                Dolar {tipo == '1' ? 'Nacional' : 'Internacional'}
                            </label>
                            <div className="mt-0 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="dolar"
                                    id="dolar"
                                    value={dolar}
                                    autoFocus
                                    autoComplete="dolar"
                                    onChange={async (event) => setDolar(event.target.value)}
                                    className={`mt-0 block w-full py-2 px-3 border border-gray-300 bg-white-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="cuota" className="pb-1 block text-sm font-medium text-gray-700">
                                Tasa {tipo === '1' ? 'Nacional' : 'Internacional'}
                            </label>
                            <div className="mt-0 flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="tasa"
                                    id="tasa"
                                    value={tasa}
                                    autoFocus
                                    autoComplete="tasa"
                                    onChange={async (event) => calculaCuota(event.target.value)}
                                    className={`mt-0 block w-full py-2 px-3 border border-gray-300 bg-white-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="cuota" className="pb-1 block text-sm font-medium text-gray-700">
                                Cuota {tipo === '1' ? 'Nacional' : 'Internacional'}
                            </label>
                            <div className="mt-0 flex rounded-md shadow-sm">
                                {/* <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    {!editCuota ?
                                        <PencilIcon className="ml-0 mr-1 h-6 w-6 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activarEditCuota(true)} aria-hidden="true" />
                                        :
                                        <CheckCircleIcon className="ml-0 mr-1 h-6 w-6 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => establecerCuota(false)} aria-hidden="true" />
                                    }
                                </span> */}
                                <input
                                    type="text"
                                    name="cuota"
                                    id="cuota"
                                    value={cuota}
                                    autoFocus
                                    autoComplete="cuota"
                                    onChange={async (event) => setCuota(event.target.value)}
                                    className={`mt-0 block w-full py-2 px-3 border border-gray-300 bg-white-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                            </div>
                        </div>
                        <div className="col-span-8 sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Lapso
                            </label>
                            <select
                                id="lapso"
                                name="lapso"
                                className="mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                value={lapso}
                                onChange={async (event) => setLapso(event.target.value)}
                            >
                                <option>Selecciona lapso</option>
                                {Object.keys(lapsos).map((key, item) => (
                                    <option key={key} selected={true} >{lapsos[item].Lapso}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1 pt-5">
                            <button
                                type="button"
                                disabled={tasa !== '' && tasa != '0' && cuota !== '' && cuota != '0' ? false : true}
                                onClick={async () => establecerCuota()}
                                className={`inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${tasa !== '' && tasa != '0' && cuota !== '' && cuota != '0' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-200 hover:bg-indigo-200'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                Guardar
                            </button>
                        </div>
                        <div className="col-span-3 pt-5">
                            <button
                                type="button"
                                disabled={editCuota === true ? true : false}
                                onClick={async () => putCuotasAll()}
                                className={`inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${editCuota === true ? 'bg-indigo-200 hover:bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                Actualizar cuota {tipo == '1' ? 'Nacionales' : 'Internacionales'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
Form.propTypes = {
    checkConfig: PropTypes.func,
    tipo: PropTypes.string,
    editCuota: PropTypes.bool,
    activarEditCuota: PropTypes.func,
    establecerCuota: PropTypes.func,
    putCuotasAll: PropTypes.func,
    cuota: PropTypes.number,
    setCuota: PropTypes.func,
    lapsos: PropTypes.array,
    lapso: PropTypes.string,
    setLapso: PropTypes.func,
    tasa: PropTypes.number,
    setTasa: PropTypes.func,
    dolar: PropTypes.number,
    setDolar: PropTypes.func,
}
export default Form;