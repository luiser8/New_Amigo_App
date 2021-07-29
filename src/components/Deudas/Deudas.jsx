import React, { Fragment, useState, useEffect, useContext } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, SearchIcon, UserIcon, AcademicCapIcon, CalculatorIcon } from '@heroicons/react/solid';
import Moment from 'moment';
import { get, post, put, del } from '../../utils/Fetch';
import ConfirmDelete from './modals/ConfirmDelete';
import ModificarMonto from './modals/ModificarMonto';
import { Toast } from '../../utils/Toast';
import { Context } from '../../utils/Context';
import InsertarCuota from './modals/InsertarCuota';

const Deudas = () => {
    const [lapsos, setLapsos] = useState([]);
    const [deudas, setDeudas] = useState([]);
    const [id_inscripcion, setId_inscripcion] = useState('');
    const [identificador, setIdentificador] = useState('');
    const [lapso, setLapso] = useState('');
    const [monto, setMonto] = useState('');
    const [fullNombre, setFullNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openModificar, setOpenModificar] = useState(false);
    const [openInsertar, setOpenInsertar] = useState(false);
    const [id_cuenta, setId_cuenta] = useState('');
    const [pagada, setPagada] = useState('');
    const [cuota, setCuota] = useState('');
    const [id_arancel, setId_arancel] = useState('');
    const [arancel, setArancel] = useState('');
    const { checkConfig, setConfig } = useContext(Context);

    /* Inicio Modales*/
    const activeConfirmacion = async (...params) => {
        setOpenConfirm(params[0].open);
        if (params[0].idCuenta !== '' && params[0].pagada !== '') {
            setId_cuenta(params[0].idCuenta); setPagada(params[0].pagada); setId_arancel(params[0].idArancel); setArancel(params[0].arancel);
        } else {
            setId_cuenta(''); setPagada(''); setId_arancel(''); setArancel('');
        }
    }

    const okEliminar = async () => {
        if (id_cuenta !== '' && pagada !== '') {
            await delDeuda({'id_cuenta': id_cuenta, 'pagada': pagada, 'id_inscripcion': id_inscripcion, 'id_arancel': id_arancel});
        }
        setOpenConfirm(false);
    }

    const activeInsertar = async (open) => {
        setOpenInsertar(open);
    }
    const okInsertar = async (value) => {
        console.log(value);
        setOpenInsertar(false);
        if (value.Id_Inscripcion !== '')
            await postDeuda(value);
    }

    const activeModificacion = async (open, id, arancel) => {
        setOpenModificar(open);
        if (id !== '') {
            setId_cuenta(id); setArancel(arancel);
        } else {
            setId_cuenta(''); setArancel('');
        }
    }

    const okModificar = async () => {
        setOpenModificar(false);
        if (id_cuenta !== '' && monto !== '')
            await putDeuda(id_cuenta, monto);
    }

    const changeMonto = async (value) => {
        if (value !== '') {
            setMonto(value);
        } else {
            setMonto('');
        }
    }
    /* Fin Modales*/
    /* Inicio Peticiones*/
    const getLapsos = async () => {
        await get('lapsos/all').then((items) => {
            items !== undefined ? setLapsos(items) : setLapsos([]);
            if (items !== undefined)
                items.map((item) => {
                    if(checkConfig().Lapso === null){
                        setLapso(item.Lapso); setConfig(1, { 'Lapso': item.Lapso, 'Cuota': null });
                    }else{
                        if(checkConfig().Lapso !== item.Lapso){
                            setLapso(item.Lapso); setConfig(1, { 'Lapso': item.Lapso, 'Cuota': null });
                        }else{
                            setLapso(checkConfig().Lapso);
                        }
                    }
                });
        });
    }
    const getCuota = async () => {
        await get('cuotas/all').then((items) => {
            if (items !== undefined)
                items.map((item) => {
                    if(checkConfig().Cuota === null){
                        setCuota(item.Monto); setConfig(2, { 'Lapso': null, 'Cuota': item.Monto });
                    }else{
                        if(checkConfig().Cuota !== item.Monto){
                            setCuota(item.Monto); setConfig(2, { 'Lapso': null, 'Cuota': item.Monto });
                        }else{
                            setCuota(checkConfig().Cuota);
                        }
                    }
                });
        });
    }
    const postDeuda = async (data) => {
        await post('deudas/insert', data).then((items) => {
            items !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Nueva cuota ha sido aplicado.', color: 'green' }) : Toast({ show: false });
            //setDeudas([...deudas, data]);
            checkDeuda();
            Toast({ show: false });
        });
    }
    const putDeuda = async (id, monto) => {
        await put(`deudas/update?id_cuenta=${id}`, { 'Monto': monto }).then((items) => {
            checkDeuda();
            items !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Monto nuevo ha sido aplicado.', color: 'yellow' }) : Toast({ show: false });
        });
    }
    const checkDeuda = async () => {
        await post('deudas/check', { "Lapso": lapso !== '' ? lapso : checkConfig().Lapso, "Identificador": identificador }).then((items) => {
            items !== undefined ? setDeudas(items) : setDeudas([]); setFullNombre(''); setCarrera('');
            items === undefined ? Toast({ show: true, title: 'Error!', msj: 'Ocurrio un problema con la comunicacion.', color: 'red' }) : Toast({ show: false });
            if (items !== undefined) {
                items.map((item) => {
                    setId_inscripcion(item.Id_Inscripcion); setFullNombre(item.Fullnombre); setCarrera(item.Descripcion);
                });
                if (items.length === 0) {
                    Toast({ show: true, title: 'Advertencia!', msj: 'No se consigueron registros.', color: 'red' });
                } else {
                    Toast({ show: false });
                }
            }
        });
    }
    const delDeuda = async (...params) => {
        await del(`deudas/delete?id_cuenta=${params[0].id_cuenta}&pagada=${params[0].pagada}&id_inscripcion=${id_inscripcion}&id_arancel=${id_arancel}`).then((items) => {
            items !== undefined ? setDeudas(deudas.filter(item => item.Id_Cuenta !== params[0].id_cuenta)) : setDeudas([]);
            items !== undefined ? Toast({ show: true, title: 'Advertencia!', msj: `Cuota ${params[0].pagada === 0 ? 'no pagada' : 'pagada'} ha sido eliminada.`, color: 'red' }) : Toast({ show: false });
        });
        Toast({ show: false });
    }
    /* Fin Peticiones*/
    useEffect(() => {
        getLapsos(); 
        getCuota();
    }, []);

    return (
        <Fragment>
            {openConfirm ? <ConfirmDelete pagada={pagada} arancel={arancel} openC={activeConfirmacion} confirm={okEliminar} /> : <></>}
            {openModificar ? <ModificarMonto arancel={arancel} openC={activeModificacion} confirm={okModificar} montoNuevo={changeMonto} cuota={checkConfig().Cuota} /> : <></>}
            {openInsertar ? <InsertarCuota openC={activeInsertar} aranceles_list={deudas/*deudas.filter(item => item.Pagada === 0)*/} confirm={okInsertar} /> : <></>}

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
                                    onKeyPress={async (ev) => ev.charCode === 13 ? checkDeuda() : null}
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
                                        {checkConfig().Lapso !== null ?
                                            <option key={1} selected={true} >{checkConfig().Lapso}</option>
                                            :
                                            Object.keys(lapsos).map((key, item) => (
                                                <option key={key} selected={true} >{lapsos[item].Lapso}</option>
                                            ))
                                        }

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
                                disabled={(Object.keys(deudas).length !== 0) ? false : true}
                                className={`inline-flex items-center px-4 py-2 border ${(Object.keys(deudas).length !== 0) ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-200 text-gray-200 hover:bg-gray-20'} rounded-md shadow-sm text-sm font-medium  bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                onClick={async () => activeInsertar(true)}
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
                                                                {deudas[item].Pagada === 0 ? 'No' : 'Si'}
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
                                                                        <TrashIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activeConfirmacion({'open':true, 'idCuenta': deudas[item].Id_Cuenta, 'pagada': deudas[item].Pagada, 'idArancel': deudas[item].Id_Arancel,'arancel': deudas[item].Cuota})} aria-hidden="true" />
                                                                        <PencilIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activeModificacion(true, deudas[item].Id_Cuenta, deudas[item].Cuota)} aria-hidden="true" />
                                                                        {deudas[item].Total <= 0 ?
                                                                            <CalculatorIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => window.alert(deudas[item].Id_Cuenta)} aria-hidden="true" />
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
                                                                            <TrashIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activeConfirmacion({'open':true, 'idCuenta': deudas[item].Id_Cuenta, 'pagada': deudas[item].Pagada, 'idArancel': deudas[item].Id_Arancel,'arancel': deudas[item].Cuota})} aria-hidden="true" />
                                                                            :
                                                                            <></>
                                                                        }
                                                                    </>
                                                                    :
                                                                    <></>
                                                                }
                                                                {deudas[item].Pagada === 1 ?
                                                                    <TrashIcon className="-ml-1 mr-2 h-7 w-7 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activeConfirmacion({'open':true, 'idCuenta': deudas[item].Id_Cuenta, 'pagada': deudas[item].Pagada, 'idArancel': deudas[item].Id_Arancel,'arancel': deudas[item].Cuota})} aria-hidden="true" />
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
                    <div className="max-w-7xl mx-auto py-20">
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
                    </div>
                }
            </div>

        </Fragment>
    )
}

export default Deudas;
