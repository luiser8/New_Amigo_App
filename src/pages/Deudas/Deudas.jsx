import { Fragment, useState, useEffect, useContext } from "react";
import Moment from "moment";
import ConfirmDelete from "./modals/ConfirmDelete";
import ModificarMonto from "./modals/ModificarMonto";
import { Toast } from "../../helpers/Toast";
import { Context } from "../../context/Context";
import InsertarCuota from "./modals/InsertarCuota";
import Facturas from "../Facturas/Facturas";
import ModificarInscripcion from "./modals/ModificarInscripcion";
import ModificarTerceros from "./modals/ModificarTerceros";
import { getLapsosService } from "../../services/lapsosService";
import { getArancelesService } from "../../services/arancelesService";
import { getFacturasServices } from "../../services/facturasServices";
import {
  delInscripcionService,
  putInscripcionService,
} from "../../services/inscripcionService";
import {
  getAlumnosService,
  putTercerosService,
} from "../../services/alumnosService";
import {
  putDeudaService,
  postDeudaService,
  delDeudaService,
  checkDeudaService,
} from "../../services/deudasServices";
import Alumnos from "../Alumnos/Alumnos";
import DatosEstudiantes from "../Alumnos/DatosEstudiantes";
import PanelEdicion from "./PanelEdicion";
import DeudasDetalle from "./DeudasDetalle";
import { currentCuotas } from "../../helpers/CurrentCuotas";
import { getNoPasaCheck } from "../../helpers/checkNoPasa";

const Deudas = () => {
  const {
    checkConfigI,
    checkConfigN,
    setConfigCuotaI,
    setConfigCuotaN,
    checkUser,
    checkLapso,
  } = useContext(Context);
  const [lapsos, setLapsos] = useState([]);
  const [deudas, setDeudas] = useState([]);
  const [alumno, setAlumno] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [aranceles, setAranceles] = useState([]);
  const [id_inscripcion, setId_inscripcion] = useState("");
  const [id_terceros, setId_terceros] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [telefonos, setTelefonos] = useState("");
  const [emails, setEmails] = useState("");
  const [tipoingreso, setTipoingreso] = useState("");
  const [lapso, setLapso] = useState(checkLapso() !== "" ? checkLapso() : "");
  const [monto, setMonto] = useState("");
  const [fullNombre, setFullNombre] = useState("");
  const [sexo, setSexo] = useState(0);
  const [estAca, setEstAca] = useState("");
  const [planDePago, setPlanDePago] = useState("");
  const [foto, setFoto] = useState("");
  const [carrera, setCarrera] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);
  const [openModificarInsc, setOpenModificarInsc] = useState(false);
  const [openModificarTerceros, setOpenModificarTerceros] = useState(false);
  const [openInsertar, setOpenInsertar] = useState(false);
  const [cuotaVencida, setCuotaVencida] = useState(false);
  const [id_cuenta, setId_cuenta] = useState("");
  const [id_factura, setId_factura] = useState("");
  const [pagada, setPagada] = useState("");
  const [cuota, setCuota] = useState("");
  const [id_arancel, setId_arancel] = useState("");
  const [arancel, setArancel] = useState("");
  const [noPasa, setNoPasa] = useState(false);
  const [esBecado, setEsBecado] = useState(false);
  const [pagoTodo, setPagoTodo] = useState(false);
  const [esDesertor, setEsDesertor] = useState(false);
  const [existe, setExiste] = useState(false);
  const [sinDocumentos, setSinDocumentos] = useState(false);

  const getAlumnos = async (id) => {
    setAlumno([]);
    const alumno = await getAlumnosService(id);
    if (alumno !== undefined) {
      setAlumno(alumno);
      if (alumno !== undefined) {
        alumno.map((item) => {
          if (Object.keys(item).length !== 0) {
            setFullNombre(item.Fullnombre);
            setSexo(item.Sexo);
            setEstAca(item.EstAca);
            setFoto(item.Foto);
            setCarrera(item.codcarrera);
          } else {
            setFullNombre("");
            setSexo("");
            setEstAca("");
            setFoto("");
            setCarrera("");
          }
        });
      } else {
        setFullNombre("");
        setSexo("");
        setEstAca("");
        setFoto("");
        setCarrera("");
      }
    }
  };

  const getAranceles = async (lapso, tipo) => {
    setAranceles(await getArancelesService(lapso, tipo));
  };

  const getLapsos = async () => {
    const lapsosArray = await getLapsosService();
    setLapsos(lapsosArray);
    if (lapso === null || lapso === "") {
      establecerLapso(lapsosArray[0].Lapso);
    }
  };

  const getFacturas = async (identificador, lapso) => {
    setFacturas([]);
    const facturasData = await getFacturasServices(identificador, lapso);
    if (facturasData !== undefined) {
      setFacturas(facturasData);
      facturasData.forEach((item) => {
        setId_inscripcion(item.Id_Inscripcion);
        setId_terceros(item.Id_Terceros);
        setTipoingreso(item.TipoIngreso);
        setTelefonos(item.Telefonos);
        setEmails(item.Emails);
      });
    }
  };

  const getDeudasAlumno = async (lapso, identificador) => {
    setDeudas([]);
    const deudasAlumnoGet = await checkDeudaService(lapso, identificador);
    deudasAlumnoGet === undefined
      ? Toast({
          show: true,
          title: "Error!",
          msj: "Ocurrió un problema con la comunicación.",
          color: "red",
        })
      : Toast({ show: false });
    if (checkUser().Rol === "4"){
      await getNoPasaCheck(deudasAlumnoGet, setEsBecado, setNoPasa, setPagoTodo, setEsDesertor, setExiste, setSinDocumentos);
    }
    if (deudasAlumnoGet !== undefined || deudasAlumnoGet.Deudas !== undefined) {
      setDeudas(deudasAlumnoGet.Deudas);
      setPlanDePago(deudasAlumnoGet.PlanDePago);
      deudasAlumnoGet.Deudas.map((item) => {
        setId_inscripcion(item.Id_Inscripcion);
        if (item.Pagada === 0) {
          setCuotaVencida(Moment(item.FechaVencimiento).isBefore(Date.now()));
        }
      });
      if (Object.keys(deudasAlumnoGet).length === 0 || deudasAlumnoGet.Deudas.length === 0 && !esBecado) {
        Toast({
          show: true,
          title: "Advertencia!",
          msj: "No se consiguieron registros de deudas.",
          color: "red",
        });
      } else {
        Toast({ show: false });
      }
    }
  };

  const activeConfirmacion = async (...params) => {
    setOpenConfirm(params[0].open);
    if (params[0].pagada !== "") {
      setId_factura(params[0].id_factura);
      setPagada(params[0].pagada);
      setId_arancel(params[0].id_arancel);
      setArancel(params[0].arancel);
    } else {
      setId_factura("");
      setId_cuenta("");
      setPagada("");
      setId_arancel("");
      setArancel("");
    }
  };

  const okEliminar = async () => {
    getFacturas(identificador, checkLapso());
    if (identificador !== "" && id_inscripcion !== "" && id_arancel !== "") {
      const delDeuda = await delDeudaService({
        pagada: pagada,
        id_factura: id_factura !== undefined ? id_factura : 0,
        id_inscripcion: id_inscripcion,
        id_arancel: id_arancel,
      });
      delDeuda !== undefined
        ? setDeudas(deudas.filter((item) => item.Id_Arancel !== id_arancel))
        : setDeudas([]);
      delDeuda !== undefined
        ? Toast({
            show: true,
            title: "Advertencia!",
            msj: `Cuota ${
              pagada === 0 ? "no pagada" : "pagada"
            } ha sido eliminada.`,
            color: "red",
          })
        : Toast({ show: false });
    }
    Toast({ show: false });
    setOpenConfirm(false);
  };

  const activeInsertar = async (open) => {
    setOpenInsertar(open);
  };

  const okInsertar = async (value) => {
    setOpenInsertar(false);
    if (value.Id_Inscripcion !== "") {
      const postDeuda = await postDeudaService(value);
      postDeuda !== undefined
        ? Toast({
            show: true,
            title: "Información!",
            msj: "Nueva cuota ha sido aplicado.",
            color: "green",
          })
        : Toast({ show: false });
    }
    checkDeudaAlumno();
    Toast({ show: false });
  };

  const activeModificacion = async (open, id, arancel) => {
    setOpenModificar(open);
    if (id !== "") {
      setId_cuenta(id);
      setArancel(arancel);
    } else {
      setId_cuenta("");
      setArancel("");
    }
  };

  const activeModificacionInsc = async (open) => {
    setOpenModificarInsc(open);
  };

  const activeModificacionTerceros = async (open) => {
    setOpenModificarTerceros(open);
  };

  const okModificarTerceros = async (value) => {
    if (value) {
      const terceroPut = await putTercerosService(
        id_terceros,
        value.Identificador,
        value.Telefonos,
        value.Emails,
      );
      terceroPut !== undefined
        ? setIdentificador(value.Identificador)
        : setIdentificador(value.Identificador);
      terceroPut !== undefined
        ? setTelefonos(value.Telefonos)
        : setTelefonos(value.Telefonos);
      terceroPut !== undefined
        ? setEmails(value.Emails)
        : setEmails(value.Emails);
      terceroPut !== undefined
        ? Toast({
            show: true,
            title: "Información!",
            msj: "Datos del Estudiante han sido modificados.",
            color: "yellow",
          })
        : Toast({ show: false });
      setOpenModificarTerceros(false);
    }
  };

  const okModificar = async () => {
    if (id_cuenta !== "" && monto !== "") {
      const putDeuda = await putDeudaService(id_cuenta, monto);
      putDeuda !== undefined
        ? Toast({
            show: true,
            title: "Información!",
            msj: "Monto nuevo ha sido aplicado.",
            color: "yellow",
          })
        : Toast({ show: false });
    }
    checkDeudaAlumno();
    setOpenModificar(false);
  };

  const okModificarInsc = async (value) => {
    const putInscripcion = await putInscripcionService(
      id_inscripcion,
      value.Id_TipoIngreso,
      value.Id_Plan,
    );
    putInscripcion !== undefined
      ? Toast({
          show: true,
          title: "Información!",
          msj: "Se ha actualizado tipo/plan de inscripción.",
          color: "yellow",
        })
      : Toast({ show: false });
    checkDeudaAlumno();
    setOpenModificarInsc(false);
  };

  const okModificarInscDelete = async (value) => {
    const deleteIns = await delInscripcionService(value);
    deleteIns !== undefined
      ? Toast({
          show: true,
          title: "Información!",
          msj: "Se ha eliminado una inscripción.",
          color: "yellow",
        })
      : Toast({ show: false });
    checkDeudaAlumno();
    setOpenModificarInsc(false);
  };

  const changeMonto = async (value) => {
    if (value !== "") {
      setMonto(value);
    } else {
      setMonto("");
    }
  };

  const establecerLapso = async (lapso) => {
    if (lapso !== "") {
      getAranceles(lapso, 1);
      setLapso(lapso);
      setConfigCuotaI(1, {
        Lapso: lapso,
        DolarI: checkConfigI().DolarI,
        CuotaSAIAId: checkConfigI().CuotaSAIAId,
        CuotaSAIA: checkConfigI().CuotaSAIA,
      });
      setConfigCuotaN(1, {
        Lapso: lapso,
        DolarN: checkConfigN().DolarN,
        CuotaId: checkConfigN().CuotaId,
        Cuota: checkConfigN().Cuota,
      });
    } else {
      if (checkLapso() !== lapso) {
        getAranceles(lapso, 1);
        setLapso(lapso);
      } else {
        getAranceles(checkLapso(), 1);
        setLapso(checkLapso());
      }
    }
  };

  const checkDeudaAlumno = async () => {
    getAlumnos(identificador);
    getAranceles(checkLapso(), 1);
    getDeudasAlumno(checkLapso(), identificador);
    getFacturas(identificador, checkLapso());
  };

  useEffect(() => {
    let callCuotas = true;
    getLapsos();
    if (callCuotas) {
      currentCuotas(0, 1, setConfigCuotaI, setConfigCuotaN);
    }
    return () => {
      callCuotas = false;
      setLapsos([]);
      setDeudas([]);
      setAranceles([]);
      setAlumno([]);
      setFacturas([]);
      setIdentificador("");
    };
  }, []);

  return (
    <Fragment>
      {openConfirm ? (
        <ConfirmDelete
          pagada={pagada}
          factura={id_factura}
          arancel={arancel}
          openC={activeConfirmacion}
          confirm={okEliminar}
        />
      ) : (
        <></>
      )}
      {openModificar ? (
        <ModificarMonto
          arancel={arancel}
          openC={activeModificacion}
          confirm={okModificar}
          montoNuevo={changeMonto}
          cuota={cuota}
        />
      ) : (
        <></>
      )}
      {openModificarInsc ? (
        <ModificarInscripcion
          openC={activeModificacionInsc}
          confirm={okModificarInsc}
          deleteIns={okModificarInscDelete}
          planDePago={tipoingreso}
          inscripciones={facturas}
        />
      ) : (
        <></>
      )}
      {openModificarTerceros ? (
        <ModificarTerceros
          openC={activeModificacionTerceros}
          confirm={okModificarTerceros}
          data={{
            identificador: identificador,
            telefonos: telefonos,
            emails: emails,
          }}
        />
      ) : (
        <></>
      )}
      {openInsertar ? (
        <InsertarCuota
          openC={activeInsertar}
          id_inscripcion={id_inscripcion}
          aranceles_list={aranceles}
          confirm={okInsertar}
          cuota={cuota}
          setCuota={setCuota}
        />
      ) : (
        <></>
      )}

      <div className="max-w-7xl mx-auto pt-1 pb-8 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <Alumnos
            alumno={alumno}
            deudas={deudas}
            foto={foto}
            sexo={sexo}
            fullNombre={fullNombre}
            carrera={carrera}
            estAca={planDePago === "No encontrado" ? estAca : planDePago}
            noPasa={noPasa}
            esBecado={esBecado}
            esDesertor={esDesertor}
            existe={existe}
            pagoTodo={pagoTodo}
            sinDocumentos={sinDocumentos}
            deuda={Object.keys(deudas).length}
            rolQuitarOpciones={checkUser().Rol === "4"}
          />
          <DatosEstudiantes
            lapsos={lapsos}
            lapso={lapso}
            establecerLapso={establecerLapso}
            setIdentificador={setIdentificador}
            identificador={identificador}
            check={checkDeudaAlumno}
          />
          {checkUser().Rol !== "4" ? (
            <PanelEdicion
              deudas={deudas}
              facturas={facturas}
              activeModificacionCedula={activeModificacionTerceros}
              activeInsertar={activeInsertar}
              activeModificacionInsc={activeModificacionInsc}
            />
          ) : (
            <></>
          )}
        </div>
        <DeudasDetalle
          checkuser={checkUser().Rol}
          deudas={deudas}
          cuotaVencida={cuotaVencida}
          activeConfirmacion={activeConfirmacion}
          activeModificacion={activeModificacion}
          rolQuitarOpciones={checkUser().Rol === "4"}
        />
        {checkUser().Rol !== "4" && facturas.length !== 0 ? (
          <Facturas data={facturas} openC={activeConfirmacion} />
        ) : (
          <></>
        )}
      </div>
    </Fragment>
  );
};
export default Deudas;
