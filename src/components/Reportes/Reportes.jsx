import React, { useState, useContext, useEffect } from 'react';
import Moment from 'moment';
import { Toast } from '../../helpers/Toast';
import { Context } from '../../context/Context';
import Loading from '../Layouts/Loading';
import { getLapsos } from '../../services/lapsosService';
import { getReporteDeudas } from '../../services/reporteService';
import ReporteDeudas from './ReporteDeudas';

const Reportes = () => {
    const [lapsos, setLapsos] = useState([]);
    const { checkConfig } = useContext(Context);
    const [lapso, setLapso] = useState(checkConfig().Lapso);
    const [pagada, setPagada] = useState(0);
    const [btnEstablecer, setBtnEstablecer] = useState(checkConfig().Lapso ? false : true);
    const [loading, setLoading] = useState(false);

    const getReporte = async (ev) => {
        ev.preventDefault(); setBtnEstablecer(true); setLoading(true);
            (Promise.all([
                getReporteDeudas(lapso, pagada).then((items) => {
                    items !== undefined ? items.blob().then(blob => downloadFile(blob)) : Toast({ show: true, title: 'Advertencia!', msj: `Por alguna razon el Reporte de deudas no ha sido creado!`, color: 'yellow' }); 
                    items !== undefined ? Toast({ show: true, title: 'Información!', msj: `Reporte de deudas ha sido creado!`, color: 'yellow' }) : Toast({ show: false });
                    setBtnEstablecer(false); setLoading(false);
                }),
            ]).catch(error => {
                new Error(error);
            }));
    }
    const downloadFile = async (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `Reporte Cuentas ${Moment(new Date()).format('DD-MM-YYYY')}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

      useEffect(() => {
        (Promise.all([
            getLapsos().then((items) => {
                setLapsos(items !== undefined ? items : []);
            }), 
        ]).catch(error => {
            new Error(error);
        }));
      }, []);

    return (
    <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        {loading ? <Loading display={'block'} msj={'Creando reporte! espera un momento...'} /> : ''}
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Reporte de cuentas</h2>
            </div>
        </div>
        <ReporteDeudas 
            getReporte={getReporte}
            setLapso={setLapso}
            lapsos={lapsos}
            lapso={lapso}
            setPagada={setPagada}
            pagada={pagada}
            btnEstablecer={btnEstablecer}
        />
    </div>
    )
}

export default Reportes;