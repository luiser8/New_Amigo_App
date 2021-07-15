import React, { Fragment, useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, SearchIcon, UserIcon, AcademicCapIcon, CalculatorIcon } from '@heroicons/react/solid';
import Moment from 'moment';
import { toast } from 'tailwind-toast';
import { get, post, put, del } from '../../utils/Fetch';
import ConfirmDelete from './modals/ConfirmDelete';
import ModificarMonto from './modals/ModificarMonto';

const Deudas = () => {
    const [lapsos, setLapsos] = useState([]);
    const [deudas, setDeudas] = useState([]);
    const [identificador, setIdentificador] = useState('');
    const [id_inscripcion, setId_inscripcion] = useState('');
    const [lapso, setLapso] = useState('');
    const [monto, setMonto] = useState('');
    const [fullNombre, setFullNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openModificar, setOpenModificar] = useState(false);
    const [id_cuenta, setId_cuenta] = useState('');
    const [pagada, setPagada] = useState('');

    const showToast = async (...values) => {
        if(values[0].show)
            toast()
                .warning(values[0].title, values[0].msj)
                .with({
                    shape: 'square',
                    duration: 3000,
                    speed: 1000,
                    positionX: 'end',
                    positionY: 'top',
                    color: `bg-${values[0].color}-500`,
                    fontColor: `${values[0].color}`,
                    fontTone: 100
                }).show();
    }

    const activeConfirmacion = async (open, id, pagada) => {
        setOpenConfirm(open); 
        if(id !== '' && pagada !== ''){
            setId_cuenta(id); setPagada(pagada);  
         }else{
            setId_cuenta(''); setPagada('');
         }
    }

    const okEliminar = async () => {
        if(id_cuenta !== '' && pagada !== ''){
             await delDeuda(id_cuenta, pagada);
         }        
         setOpenConfirm(false); 
    }

    const activeModificacion = async (open, id) => {
        setOpenModificar(open); 
        if(id !== ''){
            setId_cuenta(id);  
         }else{
            setId_cuenta('');
         }
    }

    const okModificar = async () => {     
         setOpenModificar(false); await putDeuda(id_cuenta, monto); 
    }

    const changeMonto = async (value) => {
        setMonto(value); 
    }

    const getLapsos = async () => {
        await get('lapsos/all').then((items) => {
            items !== undefined ? setLapsos(items) : setLapsos([]);
        });
    }
    const putDeuda = async (id, monto) => {
        await put(`deudas/update?id_cuenta=${id}`, { 'Monto': monto }).then((items) => {
            checkDeuda();
            items !== undefined ? showToast({ show:true, title:'Información!', msj:'Monto nuevo ha sido aplicado.', color:'yellow'}) : showToast(null);
        });
    }
    const checkDeuda = async () => {
        await post('deudas/check', { "Lapso": lapso,"Identificador": identificador}).then((items) => {
            items !== undefined ? setDeudas(items) : setDeudas([]); setFullNombre(''); setCarrera('');
            items.map((item) => {
                setId_inscripcion(item.Id_Inscripcion); setFullNombre(item.Fullnombre); setCarrera(item.Descripcion);
            })
        });
    }
    const delDeuda = async (id, pagada) => {
        await del(`deudas/delete?id_cuenta=${id}&pagada=${pagada}`).then((items) => {
            items !== undefined ? setDeudas(deudas.filter(item => item.Id_Cuenta !== id)) : setDeudas([]);
            items !== undefined ? showToast({ show:true, title:'Advertencia!', msj:'Cuota ha sido eliminada.', color:'red'}) : showToast(null);
        });
    }
    useEffect(() => {
        getLapsos();
    }, []);

    return (
        <Fragment>
            {openConfirm ?
                <ConfirmDelete openC={activeConfirmacion} confirm={okEliminar} />
                :
                <></>
            }
            {openModificar ?
                <ModificarMonto openC={activeModificacion} confirm={okModificar} montoNuevo={changeMonto} />
                :
                <></>
            }
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Deudas</h2>
                        {fullNombre !== '' || carrera !== '' ? 
                            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                {fullNombre}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500"> 
                                <AcademicCapIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                {carrera}
                            </div>
                        </div>
                            :
                            <></>
                        }

                    </div>
                    <div className="mt-8 flex lg:mt-0 lg:ml-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Datos del estudiante
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="indentificador"
                                    id="indentificador"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Identificador"
                                    value={identificador}
                                    onChange={async (event) => setIdentificador(event.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <label htmlFor="lapso" className="sr-only">
                                        Lapso
                                    </label>
                                    <select
                                        id="lapso"
                                        name="lapso"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                        value={lapso}
                                        onChange={async (event) => setLapso(event.target.value)}
                                    >
                                        {Object.keys(lapsos).map((key, item) => (
                                            <option key={key}>{lapsos[item].Lapso}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="mt-5 flex lg:mt-0 lg:ml-4">
                        <span className="hidden sm:block">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={async () => checkDeuda()}
                            >
                                <SearchIcon className="-ml-1 mr-2 h-6 w-6 text-gray-500" aria-hidden="true" />
                                Buscar
                            </button>
                        </span>
                    </div>
                    <div className="mt-5 flex lg:mt-0 lg:ml-4">
                        <span className="hidden sm:block">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusIcon className="-ml-1 mr-2 h-6 w-6 text-gray-500" aria-hidden="true" />
                                Cargar Deuda
                            </button>
                        </span>
                    </div>
                </div>
                {(Object.keys(deudas).length !== 0) ?
                <div className="max-w-7xl mx-auto py-6">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Cuota
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Pagada
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Monto
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Monto Facturas
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Total
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Fecha Vencimiento
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Opciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {Object.keys(deudas).map((key, item) => (
                                                <tr key={key}>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{deudas[item].Cuota}</div>
                                                    </td>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${deudas[item].Pagada === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                            {deudas[item].Pagada === 0 ? 'No': 'Si'}
                                                        </span>
                                                    </td>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bsf. {deudas[item].Monto}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bsf. {deudas[item].MontoFacturas}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bsf. {deudas[item].Total}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{Moment(deudas[item].FechaVencimiento).format('DD-MM-YYYY')}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="mt-2 flex items-center text-sm text-gray-500">
                                                            {deudas[item].Pagada === 0 ?
                                                                <>
                                                                    <TrashIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{cursor:'pointer'}} onClick={async () => activeConfirmacion(true, deudas[item].Id_Cuenta, deudas[item].Pagada)} aria-hidden="true" />
                                                                    <PencilIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{cursor:'pointer'}} onClick={async () => activeModificacion(true, deudas[item].Id_Cuenta)} aria-hidden="true" />
                                                                    {deudas[item].Total <= 0 ?
                                                                        <CalculatorIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{cursor:'pointer'}} onClick={async () => window.alert(deudas[item].Id_Cuenta)} aria-hidden="true" />
                                                                        :
                                                                        <></>
                                                                    }
                                                                </>
                                                                :
                                                                <></>
                                                            }
                                                            {deudas[item].Pagada === 1 ? 
                                                                <>
                                                                    {deudas[item].Monto === 0 && deudas[item].MontoFacturas === 0 && deudas[item].Total === 0 ?
                                                                        <TrashIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{cursor:'pointer'}} onClick={async () => activeConfirmacion(true, deudas[item].Id_Cuenta, deudas[item].Pagada)} aria-hidden="true" />
                                                                        :
                                                                        <></>
                                                                    }
                                                                </>
                                                                :
                                                                <></>
                                                            }
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
                <></>
            }
            </div>

        </Fragment>
    )
}

export default Deudas;
