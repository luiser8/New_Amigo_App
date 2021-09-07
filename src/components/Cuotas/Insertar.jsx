import React, { useState, useEffect, useContext } from 'react';
import Moment from 'moment';
import { Toast } from '../../utils/Toast';
import { Context } from '../../utils/Context';
import { get, post } from '../../utils/Fetch';
import Loading from '../Layouts/Loading';

const Insertar = () => {
    const { checkConfig } = useContext(Context);
    const [planes, setPlanes] = useState([]);
    const [aranceles, setAranceles] = useState([]);
    const [planesCheck, setPlanesCheck] = useState([]);
    const [lapso, setLapso] = useState(checkConfig().Lapso);
    const [cuota, setCuota] = useState(checkConfig().Cuota);
    const [id_arancel, setId_arancel] = useState(0);
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [btnEstablecer, setBtnEstablecer] = useState(checkConfig().Lapso ? false : true);
    const [loading, setLoading] = useState(false);

    /* Inicio Peticiones*/
    const getAranceles = async (lapso) => {
        await get(`arancel/get?lapso=${lapso}`).then((items) => {
            items !== undefined ? setAranceles(items) : setAranceles([]);
        });
    }
    const getPlanes = async (lapso) => {
        await get(`planes/get?lapso=${lapso}`).then((items) => {
            items !== undefined ? setPlanes(items) : setPlanes([]);
        });
    }

    const postCuota = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true); setLoading(true);
            await post('cuotas/insertAll', 
                    {
                        'Lapso': lapso, 
                        'Monto': cuota, 
                        'Id_Arancel': id_arancel, 
                        'Plan1': Number.parseInt(planesCheck[0].toString()),
                        'Plan2': Number.parseInt(planesCheck[1].toString()),
                        'Plan3': Number.parseInt(planesCheck[2].toString()),
                        'Plan4': Number.parseInt(planesCheck[3].toString()),
                        'FechaVencimiento': fechaVencimiento 
                    }
                ).then((items) => {
                    items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Cuota nueva ha sido aplicado en los ${items.length} estudiantes`, color: 'green' }) : Toast({ show: false });
                    Toast({ show: false });
            });
        setBtnEstablecer(false); setLoading(false);
    }
    const changeArancelFecha = async (value) => {
        let fecha = aranceles.find(item => item.Id_Arancel == value);
        value !== 0 ? setId_arancel(value) : setId_arancel(0);
        fecha.FechaVencimiento !== '' ? setFechaVencimiento(fecha.FechaVencimiento) : setFechaVencimiento('');
    }
    const changeMonto = async (value) => {
        let planesSelected = [];
        let find = planes.indexOf(value);
        if(find > -1) {
            planesSelected.splice(find, 1);
          } else {
            planesSelected.push(value);
          }
          setPlanesCheck(planesCheck => [...planesCheck, planesSelected]);
          console.log(planesSelected);
    }
    /* Fin Peticiones*/
    useEffect(() => {
        getAranceles(checkConfig().Lapso);
        getPlanes(checkConfig().Lapso);
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
            {loading ? <Loading display={'block'} msj={'Aplicando cambios! espera un momento...'} /> : ''}
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Insertar cuotas</h2>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-6">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden ">
                                <div className="mt-10 sm:mt-0">
                                    <div className="md:grid md:grid-cols-3 md:gap-6">
                                        <div className="md:col-span-1">
                                            <div className="px-4 sm:px-0">
                                                <h3 className="text-lg font-medium leading-6 text-gray-900">Insertar de cuotas individuales y masivas</h3>
                                                <p className="mt-1 text-sm text-gray-600">Estas dos maneras de insertar es algo delicado por favor atento al proceso.</p>
                                            </div>
                                        </div>
                                        <div className="mt-5 md:mt-0 md:col-span-2">
                                            <form onSubmit={async (ev) => postCuota(ev)}>
                                                <div className="shadow overflow-hidden sm:rounded-md">
                                                    <div className="px-4 py-5 bg-white sm:p-6">
                                                        <div className="grid grid-cols-10 gap-6">
                                                            <div className="col-span-8 sm:col-span-4">
                                                                <div className="px-4 py-2">
                                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                                        <span className="font-medium text-gray-900">
                                                                            Planes de pago
                                                                        </span>
                                                                    </h3>
                                                                    <div className="pt-6" id="filter-section-mobile-1">
                                                                        <div className="space-y-1">
                                                                            {Object.keys(planes).map((key, plan) => (
                                                                                <div className="flex items-center">
                                                                                    <input   
                                                                                        type="checkbox" 
                                                                                        defaultValue={planes[plan].Id_Plan}
                                                                                        defaultChecked={false}
                                                                                        id={`Plan${planes[plan].Id_Plan.toString().slice(-1)}`}
                                                                                        onChange={async (ev) => changeMonto(planes[plan].Id_Plan)}
                                                                                        
                                                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                                                    <label className="ml-3 min-w-0 flex-1 text-gray-500">{planes[plan].Descripcion}</label>
                                                                                </div>
                                                                            ))}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-8 sm:col-span-3">
                                                                <label htmlFor="cuota" className="block text-sm font-medium text-gray-700">
                                                                    Cuota
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="cuota"
                                                                    id="cuota"
                                                                    readOnly="true"
                                                                    value={cuota}
                                                                    autoComplete="cuota"
                                                                    onChange={async (event) => setCuota(event.target.value)}
                                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>

                                                            <div className="col-span-8 sm:col-span-3">
                                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                                    Lapso
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="lapso"
                                                                    id="lapso"
                                                                    readOnly="true"
                                                                    value={checkConfig().Lapso !== null ? checkConfig().Lapso : lapso}
                                                                    onChange={async (event) => setLapso(event.target.value)}
                                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Arancel</label>
                                                                <select
                                                                    id="arancel"
                                                                    name="arancel"
                                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    onChange={async (event) => changeArancelFecha(event.target.value)}
                                                                >
                                                                    <option value={0}>Seleciona Arancel</option>
                                                                    {Object.keys(aranceles).map((key, it) => (
                                                                        <option key={key} value={`${aranceles[it].Id_Arancel}`} >{aranceles[it].Descripcion} - {Moment(aranceles[it].FechaVencimiento, "YYYY-MM-DD").format("YYYY-MM-DD")}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-span-8 sm:col-span-3">
                                                                <button
                                                                    type="submit"
                                                                    disabled={btnEstablecer}
                                                                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${btnEstablecer ? 'bg-indigo-200 hover:bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                                >
                                                                    Establecer
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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

export default Insertar;
