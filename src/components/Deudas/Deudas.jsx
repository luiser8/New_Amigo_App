import React, { Fragment, useState, useEffect, useContext } from 'react';
import Moment from 'moment';
import ConfirmDelete from './modals/ConfirmDelete';
import ModificarMonto from './modals/ModificarMonto';
import { Toast } from '../../helpers/Toast';
import { Context } from '../../context/Context';
import InsertarCuota from './modals/InsertarCuota';
import Facturas from '../Facturas/Facturas';
import ModificarInscripcion from './modals/ModificarInscripcion';
import ModificarCedula from './modals/ModificarCedula';
import { getLapsos } from '../../services/lapsosService';
import { getAranceles } from '../../services/arancelesService';
import { getCuotas } from '../../services/cuotasService';
import { getFacturas } from '../../services/facturasServices';
import { putInscripcion } from '../../services/inscripcionService';
import { getAlumnos, putTerceros } from '../../services/alumnosService';
import { checkDeuda, postDeuda, putDeuda, delDeuda } from '../../services/deudasServices';
import Alumnos from '../Alumnos/Alumnos';
import DatosEstudiantes from '../Alumnos/DatosEstudiantes';
import PanelEdicion from './PanelEdicion';
import DeudasDetalle from './DeudasDetalle';

const Deudas = () => {
    const { checkConfig, setConfig } = useContext(Context);
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
    const [tipoingreso, setTipoingreso] = useState('');
    const [plandepago, setPlandepago] = useState('');
    const [lapso, setLapso] = useState(checkConfig().Lapso ? checkConfig().Lapso : '');
    const [monto, setMonto] = useState('');
    const [fullNombre, setFullNombre] = useState('');
    const [sexo, setSexo] = useState('');
    const [estAca, setEstAca] = useState('');
    const [foto, setFoto] = useState('');
    const [carrera, setCarrera] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openModificar, setOpenModificar] = useState(false);
    const [openModificarInsc, setOpenModificarInsc] = useState(false);
    const [openModificarCedula, setOpenModificarCedula] = useState(false);
    const [openInsertar, setOpenInsertar] = useState(false);
    const [cuotaVencida, setCuotaVencida] = useState(false);
    const [id_cuenta, setId_cuenta] = useState('');
    const [id_factura, setId_factura] = useState('');
    const [pagada, setPagada] = useState('');
    const [cuota, setCuota] = useState('');
    const [id_arancel, setId_arancel] = useState('');
    const [arancel, setArancel] = useState('');

    /* Inicio Modales*/
    const activeConfirmacion = async (...params) => {
        setOpenConfirm(params[0].open);
        if (params[0].pagada !== '') {
            setId_factura(params[0].id_factura); setPagada(params[0].pagada); setId_arancel(params[0].id_arancel); setArancel(params[0].arancel);
        } else {
            setId_factura(''); setId_cuenta(''); setPagada(''); setId_arancel(''); setArancel('');
        }
    }

    const okEliminar = async () => {
        if (identificador !== '' && id_inscripcion !== '' && id_arancel !== '') {
            (Promise.all([
                delDeuda({ 'pagada': pagada, 'id_factura': id_factura !== undefined ? id_factura : 0, 'id_inscripcion': id_inscripcion, 'id_arancel': id_arancel }).then((items) => {
                    items !== undefined ? setDeudas(deudas.filter(item => item.Id_Arancel !== id_arancel)) : setDeudas([]);
                    items !== undefined ? Toast({ show: true, title: 'Advertencia!', msj: `Cuota ${pagada === 0 ? 'no pagada' : 'pagada'} ha sido eliminada.`, color: 'red' }) : Toast({ show: false });
                }),
                getFacturas(identificador, checkConfig().Lapso).then((items) => {
                    setFacturas(items !== undefined ? items : []);
                }),
            ]).catch(error => {
                new Error(error);
            }));
        }
        Toast({ show: false });
        setOpenConfirm(false);
    }

    const activeInsertar = async (open) => {
        setOpenInsertar(open);
    }
    const okInsertar = async (value) => {
        setOpenInsertar(false);
        if (value.Id_Inscripcion !== '')
            (Promise.all([
                postDeuda(value).then((items) => {
                    items !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Nueva cuota ha sido aplicado.', color: 'green' }) : Toast({ show: false });
                    check();
                    Toast({ show: false });
                }),
            ]).catch(error => {
                new Error(error);
            }));
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
    const activeModificacionCedula = async (open) => {
        setOpenModificarCedula(open);
    }
    const okModificarCedula = async (value) => {
        (Promise.all([
            putTerceros(id_terceros, value.Cedula).then((items) => {
                items !== undefined ? setIdentificador(value.Cedula) : setIdentificador(value.Cedula);
                items !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Cédula ha sido modificada.', color: 'yellow' }) : Toast({ show: false });
            }),
        ]).catch(error => {
            new Error(error);
        }));
        setOpenModificarCedula(false);
    }

    const okModificar = async () => {
        if (id_cuenta !== '' && monto !== '')
            (Promise.all([
                putDeuda(id_cuenta, monto).then((items) => {
                    check();
                    items !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Monto nuevo ha sido aplicado.', color: 'yellow' }) : Toast({ show: false });
                }),
            ]).catch(error => {
                new Error(error);
            }));
        setOpenModificar(false);
    }
    const okModificarInsc = async (value) => {
        (Promise.all([
            putInscripcion(id_inscripcion, value.Id_TipoIngreso, value.Id_Plan).then((items) => {
                check();
                items !== undefined ? Toast({ show: true, title: 'Información!', msj: 'Se ha actualizado tipo/plan de inscripción.', color: 'yellow' }) : Toast({ show: false });
            }),
        ]).catch(error => {
            new Error(error);
        }));
        setOpenModificarInsc(false);
        check();
    }

    const changeMonto = async (value) => {
        if (value !== '') {
            setMonto(value);
        } else {
            setMonto('');
        }
    }
    /* Fin Modales*/
    const establecerLapso = async (lapso) => {
        if (lapso !== '') {
            getAranceles(lapso).then((items) => {
                setAranceles(items !== undefined ? items : []);
            });
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
                getAranceles(lapso).then((items) => {
                    setAranceles(items !== undefined ? items : []);
                });
                setLapso(lapso);
            } else {
                getAranceles(checkConfig().Lapso).then((items) => {
                    setAranceles(items !== undefined ? items : []);
                });
                setLapso(checkConfig().Lapso);
            }
        }
    }
    const check = async () => {
        (Promise.all([
            checkDeuda(checkConfig().Lapso, identificador).then((items) => {
                setDeudas(items !== undefined ? items : []);
                items === undefined ? Toast({ show: true, title: 'Error!', msj: 'Ocurrio un problema con la comunicacion.', color: 'red' }) : Toast({ show: false });
                if (items !== undefined) {
                    items.map((item) => {
                        setId_inscripcion(item.Id_Inscripcion);
                        if (item.Pagada === 0) {
                            setCuotaVencida(Moment(item.FechaVencimiento).isBefore(Date.now()));
                        }
                    });
                    if (items.length === 0) {
                        Toast({ show: true, title: 'Advertencia!', msj: 'No se consigueron registros de duedas.', color: 'red' });
                    } else {
                        Toast({ show: false });
                    }
                }
            }),
            getAranceles(checkConfig().Lapso).then((items) => {
                setAranceles(items !== undefined ? items : []);
            }),
            getFacturas(identificador, checkConfig().Lapso).then((items) => {
                setFacturas(items !== undefined ? items : []);
                if (items !== undefined) {
                    items.map((item) => {
                        setId_inscripcion(item.Id_Inscripcion);
                        setId_carrera(item.Id_Carrera);
                        setId_terceros(item.Id_Terceros);
                        setTipoingreso(item.TipoIngreso);
                        setPlandepago(item.PlanDePago);
                        setId_plan(item.Id_Plan);
                        setId_tipoIngreso(item.Id_TipoIngreso);
                        tipoDeCuota(item.PlanDePago.substring(0, 7), 1);
                    });
                }
            }),
            getAlumnos(identificador).then((items) => {
                setAlumno(items !== undefined ? items : []);
                if (items !== undefined) {
                    items.map((item) => {
                        if (item !== []) {
                            setFullNombre(item.Fullnombre); setSexo(item.Sexo); setEstAca(item.EstAca); setFoto(item.Foto); setCarrera(item.codcarrera);
                        } else {
                            setFullNombre(''); setSexo(''); setEstAca(''); setFoto(''); setCarrera('');
                        }
                    });
                } else {
                    setFullNombre(''); setSexo(''); setEstAca(''); setFoto(''); setCarrera('');
                }
            }),
        ]).catch(error => {
            new Error(error);
        }));
    }
    const tipoDeCuota = async (tipo, estado) => {
        getCuotas(tipo === 'REGULAR' ? 1 : 2, estado).then((items) => {
            if (checkConfig().Cuota !== items[0].Monto) {
                setCuota(items[0].Monto);
            } else {
                setCuota(items[0].Monto !== undefined ? items[0].Monto : checkConfig().Cuota);
            }
        });
    }
    /* Fin Peticiones*/
    useEffect(() => {
        (Promise.all([
            getLapsos().then((items) => {
                setLapsos(items !== undefined ? items : []);
            }),
            getCuotas(0, 1).then((items) => {
                if (items !== undefined) {
                    items.map((_, item) => {
                        setConfig(2, {
                            'Lapso': null,
                            'DolarN': items.filter((tipo) => tipo.Tipo === 1)[item].Dolar,
                            'DolarI': items.filter((tipo) => tipo.Tipo === 2)[item].Dolar,
                            'CuotaId': items.filter((tipo) => tipo.Tipo === 1)[item].CuotaId,
                            'Cuota': items.filter((tipo) => tipo.Tipo === 1)[item].Monto,
                            'CuotaSAIAId': items.filter((tipo) => tipo.Tipo === 2)[item].CuotaId,
                            'CuotaSAIA': items.filter((tipo) => tipo.Tipo === 2)[item].Monto,
                        });
                    });
                }
            })
        ]).catch(error => {
            new Error(error);
        }));
    }, []);

    return (
        <Fragment>
            {openConfirm ? <ConfirmDelete pagada={pagada} factura={id_factura} arancel={arancel} openC={activeConfirmacion} confirm={okEliminar} /> : <></>}
            {openModificar ? <ModificarMonto arancel={arancel} openC={activeModificacion} confirm={okModificar} montoNuevo={changeMonto} cuota={cuota} /> : <></>}
            {openModificarInsc ? <ModificarInscripcion openC={activeModificacionInsc} confirm={okModificarInsc} planDePago={tipoingreso} /> : <></>}
            {openModificarCedula ? <ModificarCedula openC={activeModificacionCedula} confirm={okModificarCedula} CedulaOld={identificador} /> : <></>}
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
                        check={check}
                    />
                    <PanelEdicion
                        deudas={deudas}
                        facturas={facturas}
                        activeModificacionCedula={activeModificacionCedula}
                        activeInsertar={activeInsertar}
                        activeModificacionInsc={activeModificacionInsc}
                    />
                </div>
                <DeudasDetalle
                    deudas={deudas}
                    cuotaVencida={cuotaVencida}
                    activeConfirmacion={activeConfirmacion}
                    activeModificacion={activeModificacion}
                />
                <Facturas
                    factura_list={facturas}
                    openC={activeConfirmacion}
                />
            </div>
        </Fragment>
    )
}
export default Deudas;