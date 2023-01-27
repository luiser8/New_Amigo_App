import React, { Fragment, useState, useEffect, useContext } from 'react';
import Moment from 'moment';
import ConfirmDelete from './modals/ConfirmDelete';
import ModificarMonto from './modals/ModificarMonto';
import { Toast } from '../../helpers/Toast';
import { Context } from '../../context/Context';
import InsertarCuota from './modals/InsertarCuota';
import Facturas from '../Facturas/Facturas';
import ModificarInscripcion from './modals/ModificarInscripcion';
import ModificarTerceros from './modals/ModificarTerceros';
import { getLapsosService } from '../../services/lapsosService';
import { getArancelesService } from '../../services/arancelesService';
import { getCuotasService } from '../../services/cuotasService';
import { getFacturasServices } from '../../services/facturasServices';
import { delInscripcionService, putInscripcionService } from '../../services/inscripcionService';
import { getAlumnosService, putTercerosService } from '../../services/alumnosService';
import { putDeudaService, postDeudaService, delDeudaService, checkDeudaService } from '../../services/deudasServices';
import Alumnos from '../Alumnos/Alumnos';
import DatosEstudiantes from '../Alumnos/DatosEstudiantes';
import PanelEdicion from './PanelEdicion';
import DeudasDetalle from './DeudasDetalle';

const Deudas = () => {
    const { checkConfig, setConfig, checkUser } = useContext(Context);
    const [lapsos, setLapsos] = useState([]);
    const [deudas, setDeudas] = useState([]);
    const [alumno, setAlumno] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [aranceles, setAranceles] = useState([]);
    const [id_inscripcion, setId_inscripcion] = useState('');
    const [id_plan, setId_plan] = useState(0);
    const [id_tipoIngreso, setId_tipoIngreso] = useState(0);
    const [id_carrera, setId_carrera] = useState('');
    const [id_terceros, setId_terceros] = useState('');
    const [identificador, setIdentificador] = useState('');
    const [telefonos, setTelefonos] = useState('');
    const [emails, setEmails] = useState('');
    const [tipoingreso, setTipoingreso] = useState('');
    const [plandepago, setPlandepago] = useState('');
    const [lapso, setLapso] = useState(checkConfig().Lapso !== '' ? checkConfig().Lapso : '');
    const [monto, setMonto] = useState('');
    const [fullNombre, setFullNombre] = useState('');
    const [sexo, setSexo] = useState(0);
    const [estAca, setEstAca] = useState('');
    const [foto, setFoto] = useState('');
    const [carrera, setCarrera] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openModificar, setOpenModificar] = useState(false);
    const [openModificarInsc, setOpenModificarInsc] = useState(false);
    const [openModificarTerceros, setOpenModificarTerceros] = useState(false);
    const [openInsertar, setOpenInsertar] = useState(false);
    const [cuotaVencida, setCuotaVencida] = useState(false);
    const [id_cuenta, setId_cuenta] = useState('');
    const [id_factura, setId_factura] = useState('');
    const [pagada, setPagada] = useState('');
    const [cuota, setCuota] = useState('');
    const [id_arancel, setId_arancel] = useState('');
    const [arancel, setArancel] = useState('');

    const getAlumnos = async (id) => {
        const alumno = await getAlumnosService(id);
        setAlumno(alumno);
        if (alumno !== undefined) {
            alumno.map((item) => {
                if (item !== []) {
                    setFullNombre(item.Fullnombre); setSexo(item.Sexo); setEstAca(item.EstAca); setFoto(item.Foto); setCarrera(item.codcarrera);
                } else {
                    setFullNombre(''); setSexo(''); setEstAca(''); setFoto(''); setCarrera('');
                }
            });
        } else {
            setFullNombre(''); setSexo(''); setEstAca(''); setFoto(''); setCarrera('');
        }
    }

    const getAranceles = async (lapso, tipo) => {
        setAranceles(await getArancelesService(lapso, tipo));
    }

    const getLapsos = async () => {
        const lapsosArray = await getLapsosService();
        setLapsos(lapsosArray);
        if (lapso === null || lapso === '') {
            establecerLapso(lapsosArray[0].Lapso);
        }
    }

    const getFacturas = async (identificador, lapso) => {
        const facturasData = await getFacturasServices(identificador, lapso);
        setFacturas(facturasData);
        if (facturasData !== undefined) {
            facturasData.forEach((item) => {
                setId_inscripcion(item.Id_Inscripcion);
                setId_carrera(item.Id_Carrera);
                setId_terceros(item.Id_Terceros);
                setTipoingreso(item.TipoIngreso);
                setPlandepago(item.PlanDePago);
                setId_plan(item.Id_Plan);
                setId_tipoIngreso(item.Id_TipoIngreso);
                tipoDeCuota(item.PlanDePago.substring(0, 7), 1);
                setTelefonos(item.Telefonos);
                setEmails(item.Emails);
            });
        }
    }

    const getCuotas = async (tipo, estado) => {
        return await getCuotasService(tipo, estado, setConfig);
    }

    const getDeudasAlumno = async (lapso, identificador) => {
        const deudasAlumnoGet = await checkDeudaService(lapso, identificador);
        setDeudas(deudasAlumnoGet);
        deudasAlumnoGet === undefined ? Toast({ show: true, title: 'Error!', msj: 'Ocurrio un problema con la comunicacion.', color: 'red' }) : Toast({ show: false });
        if (deudasAlumnoGet !== undefined) {
            deudasAlumnoGet.map((item) => {
                setId_inscripcion(item.Id_Inscripcion);
                if (item.Pagada === 0) {
                    setCuotaVencida(Moment(item.FechaVencimiento).isBefore(Date.now()));
                }
            });
            if (deudasAlumnoGet.length === 0) {
                Toast({ show: true, title: 'Advertencia!', msj: 'No se consigueron registros de duedas.', color: 'red' });
            } else {
                Toast({ show: false });
            }
        }
    }

    const activeConfirmacion = async (...params) => {
        setOpenConfirm(params[0].open);
        if (params[0].pagada !== '') {
            setId_factura(params[0].id_factura); setPagada(params[0].pagada); setId_arancel(params[0].id_arancel); setArancel(params[0].arancel);
        } else {
            setId_factura(''); setId_cuenta(''); setPagada(''); setId_arancel(''); setArancel('');
        }
    }

    const okEliminar = async () => {
        getFacturas(identificador, checkConfig().Lapso);
        if (identificador !== '' && id_inscripcion !== '' && id_arancel !== '') {
            const delDeuda = await delDeudaService({ 'pagada': pagada, 'id_factura': id_factura !== undefined ? id_factura : 0, 'id_inscripcion': id_inscripcion, 'id_arancel': id_arancel });
            delDeuda !== undefined ? setDeudas(deudas.filter(item => item.Id_Arancel !== id_arancel)) : setDeudas([]);
            delDeuda !== undefined ? Toast({ show: true, title: 'Advertencia!', msj: `Cuota ${pagada === 0 ? 'no pagada' : 'pagada'} ha sido eliminada.`, color: 'red' }) : Toast({ show: false });
        }
        Toast({ show: false });
        setOpenConfirm(false);
    }

    const activeInsertar = async (open) => {
        setOpenInsertar(open);
    }

    const okInsertar = async (value) => {
        setOpenInsertar(false);
        if (value.Id_Inscripcion !== '') {
            const postDeuda = await postDeudaService(value);
            postDeuda !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Nueva cuota ha sido aplicado.', color: 'green' }) : Toast({ show: false });
        }
        checkDeudaAlumno();
        Toast({ show: false });
    }

    const activeModificacion = async (open, id, arancel) => {
        setOpenModificar(open);
        if (id !== '') {
            setId_cuenta(id); setArancel(arancel);
        } else {
            setId_cuenta(''); setArancel('');
        }
    }

    const activeModificacionInsc = async (open, id, plan) => {
        setOpenModificarInsc(open);
        if (id !== '') {
            setId_tipoIngreso(id); setId_plan(plan);
        }
    }

    const activeModificacionTerceros = async (open) => {
        setOpenModificarTerceros(open);
    }

    const okModificarTerceros = async (value) => {
        if (value) {
            const terceroPut = await putTercerosService(id_terceros, value.Identificador, value.Telefonos, value.Emails);
            terceroPut !== undefined ? setIdentificador(value.Identificador) : setIdentificador(value.Identificador);
            terceroPut !== undefined ? setTelefonos(value.Telefonos) : setTelefonos(value.Telefonos);
            terceroPut !== undefined ? setEmails(value.Emails) : setEmails(value.Emails);
            terceroPut !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Datos del Estudiante han sido modificados.', color: 'yellow' }) : Toast({ show: false });
            setOpenModificarTerceros(false);
        }
    }

    const okModificar = async () => {
        if (id_cuenta !== '' && monto !== '') {
            const putDeuda = await putDeudaService(id_cuenta, monto);
            putDeuda !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Monto nuevo ha sido aplicado.', color: 'yellow' }) : Toast({ show: false });
        }
        checkDeudaAlumno();
        setOpenModificar(false);
    }

    const okModificarInsc = async (value) => {
        const putInscripcion = await putInscripcionService(id_inscripcion, value.Id_TipoIngreso, value.Id_Plan);
        putInscripcion !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Se ha actualizado tipo/plan de inscripción.', color: 'yellow' }) : Toast({ show: false });
        checkDeudaAlumno();
        setOpenModificarInsc(false);
    }

    const okModificarInscDelete = async (value) => {
        const deleteIns = await delInscripcionService(value);
        deleteIns !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Se ha eliminado una inscripción.', color: 'yellow' }) : Toast({ show: false });
        checkDeudaAlumno();
        setOpenModificarInsc(false);
    }

    const changeMonto = async (value) => {
        if (value !== '') {
            setMonto(value);
        } else {
            setMonto('');
        }
    }

    const establecerLapso = async (lapso) => {
        if (lapso !== '') {
            getAranceles(lapso, 1);
            setLapso(lapso);
            setConfig(1, {
                'Lapso': lapso,
                'DolarN': checkConfig().DolarN,
                'DolarI': checkConfig().DolarI,
                'CuotaId': checkConfig().CuotaId,
                'Cuota': checkConfig().Cuota,
                'CuotaSAIAId': checkConfig().CuotaSAIAId,
                'CuotaSAIA':  checkConfig().CuotaSAIA,
            });
        } else {
            if (checkConfig().Lapso !== lapso) {
                getAranceles(lapso, 1);
                setLapso(lapso);
            } else {
                getAranceles(checkConfig().Lapso, 1);
                setLapso(checkConfig().Lapso);
            }
        }
    }

    const checkDeudaAlumno = async () => {
        getAlumnos(identificador);
        getAranceles(checkConfig().Lapso, 1);
        getFacturas(identificador, checkConfig().Lapso);
        getDeudasAlumno(checkConfig().Lapso, identificador);
    }

    const tipoDeCuota = async (tipo, estado) => {
        const newTipo = tipo === 'REGULAR' ? 1 : 2;
        await getCuotas(newTipo, estado).then((items) => {
            if (checkConfig().Cuota !== items[0].Monto) {
                    setCuota(items[0].Monto);
                } else {
                    setCuota(items[0].Monto !== undefined ? items[0].Monto : checkConfig().Cuota);
                }
            });
    }

    useEffect(() => {
        let callCuotas = true;
        getLapsos();
        if (callCuotas) {
            getCuotas(0, 1);
        }
        return () => {
            setLapsos([]);
            callCuotas = false;
        }
    }, []);

    return (
        <Fragment>
            {openConfirm ? <ConfirmDelete pagada={pagada} factura={id_factura} arancel={arancel} openC={activeConfirmacion} confirm={okEliminar} /> : <></>}
            {openModificar ? <ModificarMonto arancel={arancel} openC={activeModificacion} confirm={okModificar} montoNuevo={changeMonto} cuota={cuota} /> : <></>}
            {openModificarInsc ? <ModificarInscripcion openC={activeModificacionInsc} confirm={okModificarInsc} deleteIns={okModificarInscDelete} planDePago={tipoingreso} inscripciones={facturas} /> : <></>}
            {openModificarTerceros ? <ModificarTerceros openC={activeModificacionTerceros} confirm={okModificarTerceros} data={{'identificador': identificador, 'telefonos': telefonos,'emails': emails}} /> : <></>}
            {openInsertar ? <InsertarCuota openC={activeInsertar} id_inscripcion={id_inscripcion} aranceles_list={aranceles} confirm={okInsertar} cuota={cuota} setCuota={setCuota}/> : <></>}

            <div className="max-w-7xl mx-auto pt-1 pb-8 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <Alumnos
                        alumno={alumno}
                        deudas={deudas}
                        foto={foto}
                        sexo={sexo}
                        fullNombre={fullNombre}
                        carrera={carrera}
                        estAca={estAca}
                    />
                    <DatosEstudiantes
                        lapsos={lapsos}
                        lapso={lapso}
                        establecerLapso={establecerLapso}
                        setIdentificador={setIdentificador}
                        identificador={identificador}
                        check={checkDeudaAlumno}
                    />
                    {checkUser().Rol !== '4' ?
                    <PanelEdicion
                        deudas={deudas}
                        facturas={facturas}
                        activeModificacionCedula={activeModificacionTerceros}
                        activeInsertar={activeInsertar}
                        activeModificacionInsc={activeModificacionInsc}
                    /> : <></>}
                </div>
                <DeudasDetalle
                    checkuser={checkUser().Rol}
                    deudas={deudas}
                    cuotaVencida={cuotaVencida}
                    activeConfirmacion={activeConfirmacion}
                    activeModificacion={activeModificacion}
                />
                {checkUser().Rol !== '4' ?
                <Facturas
                    factura_list={facturas}
                    openC={activeConfirmacion}
                /> : <></>}
            </div>
        </Fragment>
    )
}
export default Deudas;