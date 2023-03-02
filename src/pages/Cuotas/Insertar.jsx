import React, { useState, useEffect, useContext } from "react";
import { Toast } from "../../helpers/Toast";
import { Context } from "../../context/Context";
import Loading from '../../components/Layouts/Loading';
import { getLapsosService } from "../../services/lapsosService";
import {
    getArancelesSAIAService,
    getArancelesService,
} from "../../services/arancelesService";
import { getPlanesSAIAService, getPlanesService } from "../../services/planesService";
import { postCuotaAllSAIAService, postCuotaAllService } from "../../services/cuotasService";
import Cuotas from "./Cuotas";
import CuotasSAIA from "./CuotasSAIA";

const Insertar = () => {
    const [lapsos, setLapsos] = useState([]);
    const { checkConfig } = useContext(Context);
    const [planes, setPlanes] = useState([]);
    const [aranceles, setAranceles] = useState([]);
    const [arancelesSAIA, setArancelesSAIA] = useState([]);
    const [planesSAIA, setPlanesSAIA] = useState([]);
    const [planesCheck, setPlanesCheck] = useState([]);
    const [id_periodo, setId_periodo] = useState(0);
    const [lapso, setLapso] = useState(checkConfig().Lapso);
    const [cuota, setCuota] = useState(checkConfig().Cuota);
    const [cuotaSAIA, setCuotaSAIA] = useState(checkConfig().CuotaSAIA);
    const [id_arancel, setId_arancel] = useState(0);
    const [id_arancelSAIA, setId_arancelSAIA] = useState(0);
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [fechaVencimientoSAIA, setFechaVencimientoSAIA] = useState("");
    const [loading, setLoading] = useState(false);
    const [tipoCuota, setTipoCuota] = useState(0);

    const getLapsos = async () => {
        setLapsos(await getLapsosService());
    }

    const getAranceles = async (opcion, lapso, tipo) => {
        if (opcion === "normal") {
            setAranceles(await getArancelesService(lapso, tipo));
        } else {
            setArancelesSAIA(await getArancelesSAIAService(lapso, tipo));
        }
    }

    const getPlanes = async (opcion, lapso) => {
        if (opcion === "normal") {
            setPlanes(await getPlanesService(lapso));
        } else {
            setPlanesSAIA(await getPlanesSAIAService(lapso));
        }
    }

    /* Inicio Peticiones*/
    const postCuota = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        let data = {
            Id_Periodo: id_periodo === undefined || id_periodo === 0 ? lapsos.filter(x => x.Lapso === lapso)[0].Id_Periodo : id_periodo,
            Lapso: lapso,
            Monto: cuota,
            Id_Arancel: id_arancel,
            FechaVencimiento: fechaVencimiento,
        };

        for (const key of Object.keys(planesCheck)) {
            data[`Plan${key}`] = Number.parseInt(planesCheck[key].toString());
        }
        const postCuotaAll = await postCuotaAllService(data);
        postCuotaAll !== undefined
            ? Toast({
                show: true,
                title: "Información!",
                msj: `Cuota nueva ha sido aplicado a los estudiantes inscritos`,
                color: "green",
            }) : Toast({ show: false });
        setLoading(false);
        Toast({ show: false });
        getAranceles("normal",checkConfig().Lapso, 2);
        getPlanes("normal",checkConfig().Lapso);
    };

    const postCuotaSAIA = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        let data = {
            Lapso: lapso,
            Monto: cuotaSAIA,
            Id_Arancel: id_arancelSAIA,
            FechaVencimiento: fechaVencimientoSAIA,
        };

        for (const key of Object.keys(planesCheck)) {
            data[`Plan${key}`] = Number.parseInt(planesCheck[key].toString());
        }

        const postCuotaAllSAIA = await postCuotaAllSAIAService(data);
        postCuotaAllSAIA !== undefined
            ? Toast({
                show: true,
                title: "Información!",
                msj: `Cuota nueva ha sido aplicado a los estudiantes de SAIA Internacional inscritos`,
                color: "green",
            }) : Toast({ show: false });
        setLoading(false);
        Toast({ show: false });
        getAranceles("saia", checkConfig().Lapso, 3);
        getPlanes("saia", checkConfig().Lapso);
    };

    const changeArancelFecha = async (value) => {
        let fecha = aranceles.find((item) => item.Id_Arancel === value);
        value !== 0 ? setId_arancel(Number.parseInt(value)) : setId_arancel(0);
        if (value !== 0 && fecha !== undefined) {
            setFechaVencimiento(fecha.FechaVencimiento);
        } else {
            setFechaVencimiento("");
        }
    };

    const changeArancelFechaSAIA = async (value) => {
        let fecha = arancelesSAIA.find((item) => item.Id_Arancel === value);
        value !== 0
            ? setId_arancelSAIA(Number.parseInt(value))
            : setId_arancelSAIA(0);
        if (value !== 0 && fecha !== undefined) {
            setFechaVencimientoSAIA(fecha.FechaVencimiento);
        } else {
            setFechaVencimientoSAIA("");
        }
    };

    const changeMonto = async (checked, value) => {
        checked
            ? setPlanesCheck((planesCheck) => [...planesCheck, value])
            : setPlanesCheck([...planesCheck.filter((item) => item !== value)]);
    };

    const changeLapso = (newLapso) => {
        if (newLapso !== 0) {
            const lapsoFilter = lapsos.filter((item) => item.Lapso === newLapso)[0];
            setId_periodo(Number(lapsoFilter.Id_Periodo));
            setLapso(newLapso);
            getAranceles("normal", newLapso, 2);
            getAranceles("saia", newLapso, 3);
            getPlanes("normal", newLapso);
            getPlanes("saia", newLapso);
        }
    }

    useEffect(() => {
        getLapsos();
        getAranceles("normal", checkConfig().Lapso !== null ? checkConfig().Lapso : lapso , 2);
        getAranceles("saia", checkConfig().Lapso !== null ? checkConfig().Lapso : lapso , 3);
        getPlanes("normal", checkConfig().Lapso !== null ? checkConfig().Lapso : lapso );
        getPlanes("saia", checkConfig().Lapso !== null ? checkConfig().Lapso : lapso );
        return () => {
            setLapsos([]);
            setAranceles([]);
            setArancelesSAIA([])
            setPlanes([]);
            setPlanesSAIA([]);
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
            {loading ? (
                <Loading
                    display={"block"}
                    msj={"Aplicando cambios! espera un momento..."}
                />
            ) : (
                ""
            )}
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Insertar cuotas
                    </h2>
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
                                            <label
                                                htmlFor="country"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Tipo de cuota a insertar
                                            </label>
                                            <select
                                                id="lapso"
                                                name="lapso"
                                                className="mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                                value={tipoCuota}
                                                onChange={async (event) =>
                                                    setTipoCuota(Number(event.target.value))
                                                }
                                            >
                                                <option value={0}>
                                                    Selecciona cuota a insertar
                                                </option>
                                                <option value={1}>Cuota Internacional</option>
                                                <option value={2}>Cuota Nacional</option>
                                            </select>
                                        </div>
                                        {tipoCuota === 0 ? <></> : <></>}
                                        {tipoCuota === 1 ? (
                                            <CuotasSAIA
                                                planesSAIA={planesSAIA}
                                                lapsos={lapsos}
                                                arancelesSAIA={arancelesSAIA}
                                                postCuotaSAIA={postCuotaSAIA}
                                                changeMonto={changeMonto}
                                                setCuotaSAIA={setCuotaSAIA}
                                                setLapso={changeLapso}
                                                changeArancelFechaSAIA={changeArancelFechaSAIA}
                                                planesCheck={planesCheck}
                                                cuotaSAIA={cuotaSAIA}
                                                lapso={lapso}
                                                id_arancelSAIA={id_arancelSAIA}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        {tipoCuota === 2 ? (
                                            <Cuotas
                                                planes={planes}
                                                lapsos={lapsos}
                                                aranceles={aranceles}
                                                postCuota={postCuota}
                                                changeMonto={changeMonto}
                                                setCuota={setCuota}
                                                setLapso={changeLapso}
                                                changeArancelFecha={changeArancelFecha}
                                                planesCheck={planesCheck}
                                                cuota={cuota}
                                                lapso={lapso}
                                                id_arancel={id_arancel}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insertar;
