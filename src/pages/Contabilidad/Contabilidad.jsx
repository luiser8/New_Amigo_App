import { useState, useEffect } from "react";
import moment from "moment";
import PeriodosContables from "./tabs/PeriodosContables";
import { getPeriodosContablesService } from "../../services/periodosContablesService";
import { getConciliacionesService } from "../../services/conciliacionesService";
import Conciliaciones from "./tabs/Conciliaciones";

const Contabilidad = () => {
  const [openTab, setOpenTab] = useState(1);
  const [periodosContables, setPeriodosContables] = useState([]);
  const [conciliaciones, setConciliaciones] = useState([]);
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const getPeriodosContables = async (todos) => {
    const data = await getPeriodosContablesService(
      todos,
      fechaDesde
        ? moment(fechaDesde).format("DD/MM/YYYY")
        : moment(new Date() - 15 * 24 * 3600 * 1000).format("DD/MM/YYYY"),
      fechaHasta
        ? moment(fechaHasta).format("DD/MM/YYYY")
        : moment().endOf("year").format("DD/MM/YYYY"),
    );
    setPeriodosContables(data);
    console.log(data);
  };

  const getConciliaciones = async (todos) => {
    const data = await getConciliacionesService(
      todos,
      fechaDesde
        ? moment(fechaDesde).format("DD/MM/YYYY")
        : moment(new Date() - 15 * 24 * 3600 * 1000).format("DD/MM/YYYY"),
      fechaHasta
        ? moment(fechaHasta).format("DD/MM/YYYY")
        : moment().endOf("year").format("DD/MM/YYYY"),
    );
    setConciliaciones(data);
    console.log(data);
  };

  useEffect(() => {
    let callFunction = true;
    if (callFunction) {
      getPeriodosContables(0);
      getConciliaciones(0);
    }

    return () => {
      callFunction = false;
      setPeriodosContables([]);
      setConciliaciones([]);
    };
  }, []);

  useEffect(() => {
    if (fechaDesde !== "" || fechaHasta !== "") {
      getPeriodosContables(1);
      getConciliaciones(1);
    }
  }, [fechaDesde, fechaHasta]);

  return (
    <div className="max-w-7xl mx-auto pt-1 pb-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1 ? "text-gray-600" : "text-black-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Periodos contables
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2 ? "text-gray-600" : "text-black-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Cierre de caja
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3 ? "text-gray-600" : "text-black-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Conciliación bancaria
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 4 ? "text-gray-600" : "text-black-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                Reportes
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <PeriodosContables
                    data={periodosContables}
                    setFechaDesde={setFechaDesde}
                    setFechaHasta={setFechaHasta}
                  />
                </div>
                <div
                  className={openTab === 2 ? "block" : "hidden"}
                  id="link2"
                ></div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <Conciliaciones
                    data={conciliaciones}
                    setFechaDesde={setFechaDesde}
                    setFechaHasta={setFechaHasta}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contabilidad;
