/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import Moment from "moment";
import { Toast } from "../../helpers/Toast";
import { Context } from "../../context/Context";
import Loading from "../../components/Layouts/Loading";
import { getLapsosService } from "../../services/lapsosService";
import {
  getReporteMenuCarrerasService,
  getReporteMenuService,
} from "../../services/reporteService";
import ReporteDeudas from "./ReporteDeudas";
import ReporteInscripciones from "./ReporteInscripciones";
import {
  getReporteDeudasClient,
  getReportePagadasClient,
  getReportePlanesDePagoClient,
  getReportePorCarrerasClient,
  getReporteAllCarrerasClient,
  getReporteFacturacionClient,
} from "../../clients/reporteClient";
import ReporteFacturacion from "./ReporteFacturacion";
import { getBancosService } from "../../services/bancosService";

const Reportes = (props) => {
  const [lapsos, setLapsos] = useState([]);
  const [bancos, setBancos] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menusPorCarrera, setMenusPorCarrera] = useState([]);
  const { checkLapso } = useContext(Context);
  const [lapso, setLapso] = useState(checkLapso());
  const [idCarrera, setIdCarrera] = useState(0);
  const [idPlan, setIdPlan] = useState(0);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [pagada, setPagada] = useState(0);
  const [idBanco, setIdBanco] = useState(0);
  const [tipo, setTipo] = useState(0);
  const [btnEstablecer, setBtnEstablecer] = useState(
    checkLapso() ? false : true,
  );
  const [loading, setLoading] = useState(false);

  const getLapsos = async () => {
    setLapsos(await getLapsosService());
  };
  const getBancos = async () => {
    setBancos(await getBancosService());
  };
  const getPeriodoId = () => {
    return lapsos.filter((x) => x.Lapso === lapso)[0].Id_Periodo;
  };

  const getReporte = async (ev) => {
    ev.preventDefault();
    setBtnEstablecer(true);
    setLoading(true);
    if (pagada === 0) {
      Promise.all([
        getReporteDeudasClient(lapso, pagada).then((items) => {
          items !== undefined
            ? items.blob().then((blob) => downloadFile(blob, "deudas", 1))
            : Toast({
                show: true,
                title: "Advertencia!",
                msj: `Por alguna razon el Reporte de deudas no ha sido creado!`,
                color: "yellow",
              });
          items !== undefined
            ? Toast({
                show: true,
                title: "Información!",
                msj: `Reporte de deudas ha sido creado!`,
                color: "yellow",
              })
            : Toast({ show: false });
          setBtnEstablecer(false);
          setLoading(false);
        }),
      ]).catch((error) => {
        new Error(error);
      });
    } else if (pagada === 1) {
      Promise.all([
        getReportePagadasClient(lapso).then((items) => {
          items !== undefined
            ? items.blob().then((blob) => downloadFile(blob, "pagadas", 1))
            : Toast({
                show: true,
                title: "Advertencia!",
                msj: `Por alguna razon el Reporte de deudas no ha sido creado!`,
                color: "yellow",
              });
          items !== undefined
            ? Toast({
                show: true,
                title: "Información!",
                msj: `Reporte deudas pagadas ha sido creado!`,
                color: "yellow",
              })
            : Toast({ show: false });
          setBtnEstablecer(false);
          setLoading(false);
        }),
      ]).catch((error) => {
        new Error(error);
      });
    }
  };

  const getReporteMenus = async (ev) => {
    ev.preventDefault();
    setBtnEstablecer(true);
    const reporteMenu = await getReporteMenuService(
      getPeriodoId(),
      desde
        ? Moment(desde).format("DD-MM-YYYY")
        : Moment(new Date() - 15 * 24 * 3600 * 1000).format("DD-MM-YYYY"),
      hasta
        ? Moment(hasta).format("DD-MM-YYYY")
        : Moment(new Date()).format("DD-MM-YYYY"),
    );
    setMenus(reporteMenu);
    setBtnEstablecer(false);
  };

  const getReporteMenusPorCarrera = async (ev) => {
    ev.preventDefault();
    setBtnEstablecer(true);
    const reporteMenus = await getReporteMenuCarrerasService(
      getPeriodoId(),
      desde
        ? Moment(desde).format("DD-MM-YYYY")
        : Moment(new Date() - 15 * 24 * 3600 * 1000).format("DD-MM-YYYY"),
      hasta
        ? Moment(hasta).format("DD-MM-YYYY")
        : Moment(new Date()).format("DD-MM-YYYY"),
    );
    setMenusPorCarrera(reporteMenus);
    setBtnEstablecer(false);
    console.log(reporteMenus);
  };

  const getReportePlanDePago = async (ev) => {
    ev.preventDefault();
    setBtnEstablecer(true);
    setLoading(true);
    Promise.all([
      getReportePlanesDePagoClient(
        getPeriodoId(),
        idPlan ? idPlan : [...menus].shift().IdPlan,
        desde
          ? Moment(desde).format("DD-MM-YYYY")
          : Moment(new Date() - 15 * 24 * 3600 * 1000).format("DD-MM-YYYY"),
        hasta
          ? Moment(hasta).format("DD-MM-YYYY")
          : Moment(new Date()).format("DD-MM-YYYY"),
      ).then((items) => {
        items !== undefined
          ? items
              .blob()
              .then((blob) => downloadFile(blob, "por plan de pago", 2))
          : Toast({
              show: true,
              title: "Advertencia!",
              msj: `Por alguna razon el Reporte de deudas no ha sido creado!`,
              color: "yellow",
            });
        items !== undefined
          ? Toast({
              show: true,
              title: "Información!",
              msj: `Reporte de inscritos por planes de pago ha sido creado!`,
              color: "yellow",
            })
          : Toast({ show: false });
        setBtnEstablecer(false);
        setLoading(false);
      }),
    ]).catch((error) => {
      new Error(error);
    });
  };

  const getReporteCarreras = async (ev) => {
    ev.preventDefault();
    setBtnEstablecer(true);
    setLoading(true);
    Promise.all([
      getReportePorCarrerasClient(
        getPeriodoId(),
        idCarrera ? idCarrera : [...menusPorCarrera].shift().IdCarrera,
        desde
          ? Moment(desde).format("DD-MM-YYYY")
          : Moment(new Date() - 15 * 24 * 3600 * 1000).format("DD-MM-YYYY"),
        hasta
          ? Moment(hasta).format("DD-MM-YYYY")
          : Moment(new Date()).format("DD-MM-YYYY"),
      ).then((items) => {
        items !== undefined
          ? items.blob().then((blob) => downloadFile(blob, "por carreras", 3))
          : Toast({
              show: true,
              title: "Advertencia!",
              msj: `Por alguna razón el Reporte de deudas no ha sido creado!`,
              color: "yellow",
            });
        items !== undefined
          ? Toast({
              show: true,
              title: "Información!",
              msj: `Reporte de inscritos por carrera ha sido creado!`,
              color: "yellow",
            })
          : Toast({ show: false });
        setBtnEstablecer(false);
        setLoading(false);
      }),
    ]).catch((error) => {
      new Error(error);
    });
  };

  const getReporteAllCarreras = async (ev) => {
    ev.preventDefault();
    setBtnEstablecer(true);
    setLoading(true);
    Promise.all([
      getReporteAllCarrerasClient(
        getPeriodoId(),
        desde
          ? Moment(desde).format("DD-MM-YYYY")
          : Moment(new Date() - 15 * 24 * 3600 * 1000).format("DD-MM-YYYY"),
        hasta
          ? Moment(hasta).format("DD-MM-YYYY")
          : Moment(new Date()).format("DD-MM-YYYY"),
      ).then((items) => {
        items !== undefined
          ? items.blob().then((blob) => downloadFile(blob, "por carreras", 3))
          : Toast({
              show: true,
              title: "Advertencia!",
              msj: `Por alguna razón el Reporte de deudas no ha sido creado!`,
              color: "yellow",
            });
        items !== undefined
          ? Toast({
              show: true,
              title: "Información!",
              msj: `Reporte de inscritos todas las carreras ha sido creado!`,
              color: "yellow",
            })
          : Toast({ show: false });
        setBtnEstablecer(false);
        setLoading(false);
      }),
    ]).catch((error) => {
      new Error(error);
    });
  };

  const getReporteFacturacion = async (ev) => {
    ev.preventDefault();
    setBtnEstablecer(true);
    setLoading(true);
    console.log(idBanco);
    Promise.all([
      getReporteFacturacionClient(
        desde
          ? Moment(desde).format("DD-MM-YYYY")
          : Moment(new Date() - 30 * 24 * 3600 * 1000).format("DD-MM-YYYY"),
        hasta
          ? Moment(hasta).format("DD-MM-YYYY")
          : Moment(new Date()).format("DD-MM-YYYY"),
        idBanco !== "Selecciona banco" ? idBanco : 0,
        tipo,
      ).then((items) => {
        items !== undefined
          ? items.blob().then((blob) => downloadFile(blob, "facturación", 3))
          : Toast({
              show: true,
              title: "Advertencia!",
              msj: `Por alguna razón el Reporte de facturación no ha sido creado!`,
              color: "yellow",
            });
        items !== undefined
          ? Toast({
              show: true,
              title: "Información!",
              msj: `Reporte de facturación ha sido creado!`,
              color: "yellow",
            })
          : Toast({ show: false });
        setBtnEstablecer(false);
        setLoading(false);
      }),
    ]).catch((error) => {
      new Error(error);
    });
  };

  const downloadFile = async (blob, type, source) => {
    //let msj = source === 2 ? 'inscritos por planes de pago' : 'inscritos por carreras';
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `Reporte ${type} ${Moment(new Date()).format("DD-MM-YYYY")}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    getLapsos();
    return () => {
      setLapsos([]);
      setMenus([]);
      setMenusPorCarrera([]);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
      {loading ? <Loading /> : ""}
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {props.type === 1 ? "Reporte de deudas" : ""}
            {props.type === 2 ? "Reporte de inscripciones" : ""}
            {props.type === 3 ? "Reporte de facturación" : ""}
          </h2>
        </div>
      </div>
      {props.type === 1 ? (
        <ReporteDeudas
          getReporte={getReporte}
          setLapso={setLapso}
          lapsos={lapsos}
          lapso={lapso}
          setPagada={setPagada}
          pagada={pagada}
          btnEstablecer={btnEstablecer}
        />
      ) : (
        <></>
      )}
      {props.type === 2 ? (
        <ReporteInscripciones
          menus={menus}
          menusPorCarreras={menusPorCarrera}
          getMenus={getReporteMenus}
          getMenusPorCarreras={getReporteMenusPorCarrera}
          getReporte={getReportePlanDePago}
          getReporteCarreras={getReporteCarreras}
          getReporteAllCarreras={getReporteAllCarreras}
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
      ) : (
        <></>
      )}
      {props.type === 3 ? (
        <ReporteFacturacion
          getBancos={getBancos}
          bancos={bancos}
          getReporteFacturacion={getReporteFacturacion}
          setFechaDesde={setDesde}
          setFechaHasta={setHasta}
          setIdBanco={setIdBanco}
          setTipo={setTipo}
          tipo={tipo}
          btnEstablecer={btnEstablecer}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Reportes;
