import React, { useState, useContext, useEffect } from 'react';
import Moment from 'moment';
import { Toast } from '../../helpers/Toast';
import { Context } from '../../context/Context';
import Loading from '../Layouts/Loading';
import { getLapsosService } from '../../services/lapsosService';
import { getCuotasByLapsoService, postCuotasService, putCuotaAllService } from '../../services/cuotasService';
import Form from './Form';
import CuotasTasas from './CuotasTasas';

const Actualizar = () => {
    const [lapsos, setLapsos] = useState([]);
    const [cuotas, setCuotas] = useState([]);
    const { checkConfig, setConfig } = useContext(Context);
    const [editCuota, setEditCuota] = useState(false);
    const [lapso, setLapso] = useState(checkConfig().Lapso);
    const [lapsoTasa, setLapsoTasa] = useState(checkConfig().Lapso);
    const [cuota, setCuota] = useState(0);
    const [dolar, setDolar] = useState(0);
    const [tasa, setTasa] = useState(0);
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [btnEstablecer, setBtnEstablecer] = useState(checkConfig().Lapso ? false : true);
    const [loading, setLoading] = useState(false);
    const [tipoCuota, setTipoCuota] = useState(0);
    const [cuotaLength, setCuotaLength] = useState(undefined);

    const getLapsos = async () => {
        setLapsos(await getLapsosService());
    }

    const activarEditCuota = async (value) => {
        value ? setEditCuota(true) : setEditCuota(false);
    }

    const establecerCuota = async (value) => {
        value ? setEditCuota(true) : setEditCuota(false);
        let cuotaId = tipoCuota === '1' ? checkConfig().CuotaSAIAId : checkConfig().CuotaId;
        if (cuotaId !== '') {
            const postCuota = await postCuotasService(cuotaId, dolar, tasa, tipoCuota, cuota, lapso, 0);
            postCuota !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Cuota nueva ha sido aplicada.', color: 'green' }) : Toast({ show: false });
            postCuota !== undefined ? getCuotasByLapsoService(fechaDesde) : getCuotasByLapsoService('');
            postCuota.map((_, item) => {
                if (tipoCuota === '2') {
                    setConfig(2, {
                        'Lapso': null,
                        'DolarN': dolar,
                        'DolarI': checkConfig().DolarI !== null ? checkConfig().DolarI : dolar,
                        'CuotaId': postCuota[item].CuotaId,
                        'Cuota': cuota,
                        'CuotaSAIAId': checkConfig().CuotaSAIAId !== null ? checkConfig().CuotaSAIAId : postCuota[item].CuotaId,
                        'CuotaSAIA': checkConfig().CuotaSAIA !== null ? checkConfig().CuotaSAIA : cuota,
                    });
                } else if (tipoCuota === '1') {
                    setConfig(2, {
                        'Lapso': null,
                        'DolarN': checkConfig().DolarN !== null ? checkConfig().DolarN : dolar,
                        'DolarI': dolar,
                        'CuotaId': checkConfig().CuotaId !== null ? checkConfig().CuotaId : postCuota[item].CuotaId,
                        'Cuota': checkConfig().Cuota !== null ? checkConfig().Cuota : cuota,
                        'CuotaSAIAId': postCuota[item].CuotaId,
                        'CuotaSAIA': cuota,
                    });
                }
            });
            getCuotasByLapsos();
        }
    }

    const putCuotasAll = async () => {
        let cuotaLocal = cuota === 0 ? (tipoCuota === '1' ? checkConfig().CuotaSAIA : checkConfig().Cuota) : cuota;
        setBtnEstablecer(true); setLoading(true);
        if (cuota !== '' && lapso !== '') {
            const putCuotaAll = await putCuotaAllService(cuotaLocal, lapso, tipoCuota);
            console.log(putCuotaAll);
            putCuotaAll !== undefined ? Toast({ show: true, title: 'Información!', msj: `Cuota nueva ha sido aplicado en las ${putCuotaAll} cuotas sin pagar`, color: 'yellow' }) : Toast({ show: false });
        }
        setLoading(false); setBtnEstablecer(false); setCuota(checkConfig().Cuota);
    }

    const changeTasaAndCuota = (value) => {
        if (value !== '' || value !== 0) {
            setTipoCuota(value);
            setTasa(value !== '' ? 0 : 0);
            setCuota(value !== '' ? 0 : 0);
            setCuotaLength(cuotas.filter((c) => c.Estado !== 0 && c.Tipo === Number(value)).length);
        }
    }

    const getCuotasByLapsos = async () => {
        const cuotasLapsos = await getCuotasByLapsoService(
            lapsoTasa ? lapsoTasa : checkConfig().Lapso,
            fechaDesde ? Moment(fechaDesde).format('DD/MM/YYYY') : Moment(new Date() - 15 * 24 * 3600 * 1000).format('DD/MM/YYYY'),
            fechaHasta ? Moment(fechaHasta).format('DD/MM/YYYY') : Moment(new Date()).format('DD/MM/YYYY'));
            setCuotas(cuotasLapsos);
            setCuotaLength(cuotasLapsos.filter((c) => c.Estado !== 0).length);
    }

    useEffect(() => {
        getLapsos();
        getCuotasByLapsos();
        return () => {
            setLapsos([]);
            setCuotas([]);
            setCuotaLength(undefined);
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
            {loading ? <Loading display={'block'} msj={'Aplicando cambios! espera un momento...'} /> : ''}
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Actualización de cuotas</h2>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-6">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-0 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden ">
                                <div className="mt-10 sm:mt-0">
                                    <div className="md:grid md:grid-cols-3 md:gap-6">
                                        <div className="md:col-span-1">
                                            <div className="px-4 sm:px-0">
                                                <h3 className="text-lg font-medium leading-6 text-gray-900">Actualización de cuotas diarias, individuales y masivas</h3>
                                                <p className="mt-1 text-sm text-gray-600">Estas dos maneras de actualización es algo delicado por favor atención al proceso.</p>
                                            </div>
                                        </div>
                                        <div className="mt-5 md:mt-0 md:col-span-2">
                                            <div className="col-span-8 sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Tipo de cuota por actualizar
                                                </label>
                                                <select
                                                    id="lapso"
                                                    name="lapso"
                                                    className="mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                                    value={tipoCuota}
                                                    onChange={async (event) => changeTasaAndCuota(event.target.value)}
                                                >
                                                    <option value={0} selected>Selecciona cuota a actualizar</option>
                                                    <option value={1}>Cuota Internacional</option>
                                                    <option value={2}>Cuota Nacional</option>
                                                </select>
                                            </div>
                                            {tipoCuota != '0' ?
                                                <Form
                                                    checkConfig={checkConfig}
                                                    tipo={tipoCuota}
                                                    editCuota={editCuota}
                                                    activarEditCuota={activarEditCuota}
                                                    establecerCuota={establecerCuota}
                                                    cuota={cuota}
                                                    setCuota={setCuota}
                                                    putCuotasAll={putCuotasAll}
                                                    lapsos={lapsos}
                                                    lapso={lapso}
                                                    setLapso={setLapso}
                                                    tasa={tasa}
                                                    setTasa={setTasa}
                                                    dolar={dolar}
                                                    setDolar={setDolar}
                                                    checkCuotas={cuotaLength}
                                                />
                                                :
                                                <></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-0 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden ">
                                <div className="mt-10 sm:mt-0">
                                    <CuotasTasas
                                        cuotas={cuotas}
                                        setFechaDesde={setFechaDesde}
                                        setFechaHasta={setFechaHasta}
                                        getCuotasByLapsos={getCuotasByLapsos}
                                        lapsos={lapsos}
                                        lapsoTasa={lapsoTasa}
                                        setLapsoTasa={setLapsoTasa}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actualizar;
