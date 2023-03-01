import React, { useState, useContext, useEffect } from 'react';
import Moment from 'moment';
import { Toast } from '../../helpers/Toast';
import { Context } from '../../context/Context';
import Loading from '../Layouts/Loading';
import { getLapsosService } from '../../services/lapsosService';
import {
    getReporteMenuCarrerasService,
    getReporteMenuService,
} from '../../services/reporteService';
import ReporteDeudas from './ReporteDeudas';
import ReporteInscripciones from './ReporteInscripciones';
import { getReporteDeudasClient, getReportePagadasClient, getReportePlanesDePagoClient, getReportePorCarrerasClient } from '../../clients/reporteClient';

const Reportes = (props) => {
    const [lapsos, setLapsos] = useState([]);
    const [menus, setMenus] = useState([]);
    const [menusPorCarrera, setMenusPorCarrera] = useState([]);
    const { checkConfig } = useContext(Context);
    const [lapso, setLapso] = useState(checkConfig().Lapso);
    const [idCarrera, setIdCarrera] = useState(0);
    const [idPlan, setIdPlan] = useState(0);
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [pagada, setPagada] = useState(0);
    const [btnEstablecer, setBtnEstablecer] = useState(checkConfig().Lapso ? false : true);
    const [loading, setLoading] = useState(false);

    const getLapsos = async () => {
        setLapsos(await getLapsosService());
    }
    const getPeriodoId = () => {
        return lapsos.filter(x => x.Lapso === lapso)[0].Id_Periodo;
    }

    const getReporte = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true); setLoading(true);
        if(pagada === 0){
            (Promise.all([
                getReporteDeudasClient(lapso, pagada).then((items) => {
                    items !== undefined ? items.blob().then(blob => downloadFile(blob, 'deudas', 1)) : Toast({ show: true, title: 'Advertencia!', msj: `Por alguna razon el Reporte de deudas no ha sido creado!`, color: 'yellow' }); 
                    items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Reporte de deudas ha sido creado!`, color: 'yellow' }) : Toast({ show: false });
                    setBtnEstablecer(false); setLoading(false);
                }),
            ]).catch(error => {
                new Error(error);
            }));
        }else if(pagada === 1){
            (Promise.all([
                getReportePagadasClient(lapso).then((items) => {
                    items !== undefined ? items.blob().then(blob => downloadFile(blob, 'pagadas', 1)) : Toast({ show: true, title: 'Advertencia!', msj: `Por alguna razon el Reporte de deudas no ha sido creado!`, color: 'yellow' }); 
                    items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Reporte deudas pagadas ha sido creado!`, color: 'yellow' }) : Toast({ show: false });
                    setBtnEstablecer(false); setLoading(false);
                }),
            ]).catch(error => {
                new Error(error);
            }));
        }
    }

    const getReporteMenus = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true);
        const reporteMenu = await getReporteMenuService(
            getPeriodoId(),
            desde ? Moment(desde).format('DD-MM-YYYY') : Moment(new Date() - 15 * 24 * 3600 * 1000).format('DD-MM-YYYY'),
            hasta ? Moment(hasta).format('DD-MM-YYYY') : Moment(new Date()).format('DD-MM-YYYY'))
        setMenus(reporteMenu);
        setBtnEstablecer(false);
    }

    const getReporteMenusPorCarrera = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true);
        const reporteMenus = await getReporteMenuCarrerasService(
            getPeriodoId(),
            desde ? Moment(desde).format('DD-MM-YYYY') : Moment(new Date() - 15 * 24 * 3600 * 1000).format('DD-MM-YYYY'),
            hasta ? Moment(hasta).format('DD-MM-YYYY') : Moment(new Date()).format('DD-MM-YYYY'))
        setMenusPorCarrera(reporteMenus);
        setBtnEstablecer(false);
    }

    const getReportePlanDePago = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true); setLoading(true);
        (Promise.all([
            getReportePlanesDePagoClient(getPeriodoId(),
                idPlan ? idPlan : [...menus].shift().IdPlan,
                desde ? Moment(desde).format('DD-MM-YYYY') : Moment(new Date() - 15 * 24 * 3600 * 1000).format('DD-MM-YYYY'),
                hasta ? Moment(hasta).format('DD-MM-YYYY') : Moment(new Date()).format('DD-MM-YYYY'))
            .then((items) => {
                items !== undefined ? items.blob().then(blob => downloadFile(blob, 'por plan de pago', 2)) : Toast({ show: true, title: 'Advertencia!', msj: `Por alguna razon el Reporte de deudas no ha sido creado!`, color: 'yellow' }); 
                items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Reporte de inscritos por planes de pago ha sido creado!`, color: 'yellow' }) : Toast({ show: false });
                setBtnEstablecer(false); setLoading(false);
            }),
        ]).catch(error => {
            new Error(error);
        }));
    }

    const getReporteCarreras = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true); setLoading(true);
        (Promise.all([
            getReportePorCarrerasClient(getPeriodoId(),
                idCarrera ? idCarrera : [...menusPorCarrera].shift().IdCarrera,
                desde ? Moment(desde).format('DD-MM-YYYY') : Moment(new Date() - 15 * 24 * 3600 * 1000).format('DD-MM-YYYY'),
                hasta ? Moment(hasta).format('DD-MM-YYYY') : Moment(new Date()).format('DD-MM-YYYY'))
            .then((items) => {
                items !== undefined ? items.blob().then(blob => downloadFile(blob, 'por carreras', 3)) : Toast({ show: true, title: 'Advertencia!', msj: `Por alguna razon el Reporte de deudas no ha sido creado!`, color: 'yellow' }); 
                items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Reporte de inscritos por carrera ha sido creado!`, color: 'yellow' }) : Toast({ show: false });
                setBtnEstablecer(false); setLoading(false);
            }),
        ]).catch(error => {
            new Error(error);
        }));
    }

    const downloadFile = async (blob, type, source) => {
        //let msj = source === 2 ? 'inscritos por planes de pago' : 'inscritos por carreras';
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `Reporte ${type} ${Moment(new Date()).format('DD-MM-YYYY')}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    useEffect(() => {
        getLapsos();
        return () => {
            setLapsos([]);
            setMenus([]);
            setMenusPorCarrera([]);
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
            {loading ? <Loading /> : ''}
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Reporte de {props.type === 1 ? 'deudas' : 'inscripciones'}</h2>
                </div>
            </div>
            {props.type === 1 ?
                <ReporteDeudas
                    getReporte={getReporte}
                    setLapso={setLapso}
                    lapsos={lapsos}
                    lapso={lapso}
                    setPagada={setPagada}
                    pagada={pagada}
                    btnEstablecer={btnEstablecer}
                />
                :
                <ReporteInscripciones
                    menus={menus}
                    menusPorCarreras={menusPorCarrera}
                    getMenus={getReporteMenus}
                    getMenusPorCarreras={getReporteMenusPorCarrera}
                    getReporte={getReportePlanDePago}
                    getReporteCarreras={getReporteCarreras}
                    setIdPlan={setIdPlan}
                    idPlan={idPlan}
                    setIdCarrera={setIdCarrera}
                    idCarrera={idCarrera}
                    setDesde={setDesde}
                    setHasta={setHasta}
                    setLapso={setLapso}
                    lapsos={lapsos}
                    lapso={lapso}
                    btnEstablecer={btnEstablecer}
                />
            }
        </div>
    )
}

export default Reportes;