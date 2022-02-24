import React, { useState, useEffect, useContext } from 'react';
import { Toast } from '../../helpers/Toast';
import { Context } from '../../context/Context';
import Loading from '../Layouts/Loading';
import { getLapsos } from '../../services/lapsosService';
import { getAranceles, getArancelesSAIA } from '../../services/arancelesService';
import { getPlanes, getPlanesSAIA } from '../../services/planesService';
import { postCuotaAll, postCuotaAllSAIA } from '../../services/cuotasService';
import Cuotas from './Cuotas';
import CuotasSAIA from './CuotasSAIA';

const Insertar = () => {
    const [lapsos, setLapsos] = useState([]);
    const { checkConfig } = useContext(Context);
    const [planes, setPlanes] = useState([]);
    const [aranceles, setAranceles] = useState([]);
    const [arancelesSAIA, setArancelesSAIA] = useState([]);
    const [planesSAIA, setPlanesSAIA] = useState([]);
    const [planesCheck, setPlanesCheck] = useState([]);
    const [lapso, setLapso] = useState(checkConfig().Lapso);
    const [cuota, setCuota] = useState(checkConfig().Cuota);
    const [cuotaSAIA, setCuotaSAIA] = useState(checkConfig().CuotaSAIA);
    const [id_arancel, setId_arancel] = useState(0);
    const [id_arancelSAIA, setId_arancelSAIA] = useState(0);
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [fechaVencimientoSAIA, setFechaVencimientoSAIA] = useState('');
    const [btnEstablecer, setBtnEstablecer] = useState(true);
    const [loading, setLoading] = useState(false);
    const [tipoCuota, setTipoCuota] = useState(0);

    /* Inicio Peticiones*/
    const postCuota = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true); setLoading(true);
        (Promise.all([
            postCuotaAll(lapso, cuota, id_arancel, planesCheck, fechaVencimiento).then((items) => {
                items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Cuota nueva ha sido aplicado a los estudiantes inscritos`, color: 'green' }) : Toast({ show: false });
                setBtnEstablecer(false); setLoading(false);
                Toast({ show: false });
            }),
            getAranceles(checkConfig().Lapso),
            getPlanes(checkConfig().Lapso),
        ]).catch(error => {
            new Error(error);
        }));
    }
    const postCuotaSAIA = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true); setLoading(true);
        (Promise.all([
            postCuotaAllSAIA(lapso, cuotaSAIA, id_arancelSAIA, planesCheck, fechaVencimientoSAIA).then((items) => {
                items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Cuota nueva ha sido aplicado a los estudiantes de SAIA Internacional inscritos`, color: 'green' }) : Toast({ show: false });
                setBtnEstablecer(false); setLoading(false);
                Toast({ show: false });
            }),
            getArancelesSAIA(checkConfig().Lapso),
            getPlanesSAIA(checkConfig().Lapso),
        ]).catch(error => {
            new Error(error);
        }));
    }
    const changeArancelFecha = async (value) => {
        let fecha = aranceles.find(item => item.Id_Arancel === value);
        value !== 0 ? setId_arancel(Number.parseInt(value)) : setId_arancel(0);
        if (value !== 0 && fecha !== undefined) {
            setFechaVencimiento(fecha.FechaVencimiento);
        } else {
            setFechaVencimiento('');
        }
    }
    const changeArancelFechaSAIA = async (value) => {
        let fecha = arancelesSAIA.find(item => item.Id_Arancel === value);
        value !== 0 ? setId_arancelSAIA(Number.parseInt(value)) : setId_arancelSAIA(0);
        if (value !== 0 && fecha !== undefined) {
            setFechaVencimientoSAIA(fecha.FechaVencimiento);
        } else {
            setFechaVencimientoSAIA('');
        }
    }
    const changeMonto = async (checked, value) => {
        let planesSelected = [];
        let find = planes.indexOf(value);
        if (find > -1) {
            planesSelected.splice(find, 1);
        } else {
            planesSelected.push(value);
            setPlanesCheck(planesCheck => [...planesCheck, planesSelected]);
        }
    }
    /* Fin Peticiones*/
    useEffect(() => {
        (Promise.all([
            getLapsos().then((items) => {
                setLapsos(items !== undefined ? items : []);
            }),
            getAranceles(checkConfig().Lapso).then((items) => {
                setAranceles(items !== undefined ? items : []);
            }),
            getArancelesSAIA(checkConfig().Lapso).then((items) => {
                setArancelesSAIA(items !== undefined ? items : []);
            }),
            getPlanes(checkConfig().Lapso).then((items) => {
                setPlanes(items !== undefined ? items : []);
            }),
            getPlanesSAIA(checkConfig().Lapso).then((items) => {
                setPlanesSAIA(items !== undefined ? items : []);
            }),
        ]).catch(error => {
            new Error(error);
        }));
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
                        <div className="py-0 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden ">
                                <div className="mt-10 sm:mt-0">
                                    <div className="md:grid md:grid-cols-2 md:gap-6">
                                    <div className="col-span-0">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Tipo de cuota a insertar
                                                </label>
                                                <select
                                                    id="lapso"
                                                    name="lapso"
                                                    className="mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                                    value={tipoCuota}
                                                    onChange={async (event) => setTipoCuota(Number(event.target.value))}
                                                >
                                                    <option value={0} selected>Selecciona cuota a insertar</option>
                                                    <option value={1}>Cuota Nacional</option>
                                                    <option value={2}>Cuota Internacional</option>
                                                </select>
                                            </div>
                                        {tipoCuota === 0 ? <></>:<></> }
                                        {tipoCuota === 1 ?
                                            <Cuotas
                                                planes={planes}
                                                lapsos={lapsos}
                                                aranceles={aranceles}
                                                postCuota={postCuota}
                                                changeMonto={changeMonto}
                                                setCuota={setCuota}
                                                setLapso={setLapso}
                                                changeArancelFecha={changeArancelFecha}
                                                planesCheck={planesCheck}
                                                cuota={cuota}
                                                lapso={lapso}
                                                id_arancel={id_arancel}
                                            /> : <></>  
                                        }
                                        {tipoCuota === 2 ? 
                                            <CuotasSAIA
                                                planesSAIA={planesSAIA}
                                                lapsos={lapsos}
                                                arancelesSAIA={arancelesSAIA}
                                                postCuotaSAIA={postCuotaSAIA}
                                                changeMonto={changeMonto}
                                                setCuotaSAIA={setCuotaSAIA}
                                                setLapso={setLapso}
                                                changeArancelFechaSAIA={changeArancelFechaSAIA}
                                                planesCheck={planesCheck}
                                                cuotaSAIA={cuotaSAIA}
                                                lapso={lapso}
                                                id_arancelSAIA={id_arancelSAIA}
                                            />:<></> }
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
