import { useEffect } from "react";
import PropTypes from "prop-types";
import LapsosSelect from "../../components/selects/LapsosSelect";

const Form = ({
  dolarI,
  dolarN,
  tipo,
  establecerCuota,
  cuota,
  setCuota,
  putCuotasAll,
  lapsos,
  lapso,
  setLapso,
  tasa,
  setTasa,
  dolar,
  setDolar,
  tiposArr,
  todasCuota,
  setTodasCuota,
  aranceles,
  agregarCuotasUpdate,
}) => {

  const calculaDolar = (value) => {
    if (value !== "" || value !== 0) {
      setDolar(value);
      let valueCuota = tasa * value;
      setCuota(valueCuota.toFixed(2));
    } else {
      setDolar(0);
      setCuota(0);
    }
  };

  const calculaCuota = (value) => {
    if (value !== "" || value !== 0) {
      setTasa(value);
      let valueCuota = dolar * value;
      setCuota(valueCuota.toFixed(2));
    } else {
      setTasa(0);
      setCuota(0);
    }
  };

  useEffect(() => {
    tipo === "1" ? setDolar(dolarI) : setDolar(dolarN);
  }, [dolarI, dolarN, setDolar, tipo]);
  return (
    <form>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-2 bg-white sm:p-6">
          <div className="grid grid-cols-8 gap-6">
            <div className="col-span-4 sm:col-span-2">
              <label
                htmlFor="cuota"
                className="pb-1 block text-sm font-medium text-gray-700"
              >
                Dólar {tipo == "1" ? "Internacional" : "Nacional"}
              </label>
              <div className="mt-0 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="dolar"
                  id="dolar"
                  value={dolar}
                  autoFocus
                  autoComplete="dolar"
                  onChange={async (event) => calculaDolar(event.target.value)}
                  className={`mt-0 block w-full py-2 px-3 border border-gray-300 bg-white-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label
                htmlFor="cuota"
                className="pb-1 block text-sm font-medium text-gray-700"
              >
                Tasa {tipo === "1" ? "Internacional" : "Nacional"}
              </label>
              <div className="mt-0 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="tasa"
                  id="tasa"
                  value={tasa}
                  autoFocus
                  autoComplete="tasa"
                  onChange={async (event) => calculaCuota(event.target.value)}
                  className={`mt-0 block w-full py-2 px-3 border border-gray-300 bg-white-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>
            </div>
            <div className="col-span-4 sm:col-span-2">
              <label
                htmlFor="cuota"
                className="pb-1 block text-sm font-medium text-gray-700"
              >
                Cuota {tipo === "1" ? "Internacional" : "Nacional"}
              </label>
              <div className="mt-0 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="cuota"
                  id="cuota"
                  value={cuota}
                  autoFocus
                  autoComplete="cuota"
                  readOnly
                  onChange={async (event) => setCuota(event.target.value)}
                  className={`mt-0 block w-full py-2 px-3 border border-gray-300 bg-white-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>
            </div>
            <div className="col-span-4 sm:col-span-1 pt-6">
              <button
                type="button"
                disabled={
                  tasa !== "" && tasa != "0" && cuota !== "" && cuota != "0"
                    ? false
                    : true
                }
                onClick={async () => establecerCuota(true)}
                className={`inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${tasa !== "" && tasa != "0" && cuota !== "" && cuota != "0"
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-200 hover:bg-indigo-200"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Guardar
              </button>
            </div>
            <div className="col-span-6 sm:col-span-2">
              <span className="pb-1 block text-sm font-medium text-gray-700">Tipo de actualización</span>
              <div className="pt-1" id="filter-section-mobile-1">
                <div className="space-y-1">
                  {tiposArr.map((item, key) => (
                    <div className="flex items-center" key={key}>
                      <input
                        type="radio"
                        value={item.id}
                        checked={todasCuota == item.id}
                        onChange={async (ev) => setTodasCuota(ev.target.value)}
                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <label className="ml-3 min-w-0 flex-1 text-gray-500">{item.tipo}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-2">
              <LapsosSelect lapsos={lapsos} lapso={lapso} setLapso={setLapso} />
            </div>

            <div className="col-span-3 pt-5">
              <button
                type="button"
                onClick={async () => putCuotasAll()}
                className={`inline-flex justify-center py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Actualizar cuota{" "}
                {tipo == "1" ? "Internacionales" : "Nacionales"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-6 pt-2">
          {Number(todasCuota) === 1 ? (
              <div className="col-span-10 pt-1">
                <div className="space-y-1">
                  {aranceles?.map((item, key) => (
                    <div className="flex items-center" key={key}>
                      <input
                        type="checkbox"
                        defaultValue={item.Id_Arancel}
                        defaultChecked={false}
                        onChange={async (ev) => agregarCuotasUpdate(ev.target.checked, item.Id_Arancel)}
                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                      <label className="ml-3 min-w-0 flex-1 text-gray-500">{item.Descripcion}</label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
Form.propTypes = {
  dolarI: PropTypes.string,
  dolarN: PropTypes.string,
  tipo: PropTypes.string,
  activarEditCuota: PropTypes.func,
  establecerCuota: PropTypes.func,
  putCuotasAll: PropTypes.func,
  cuota: PropTypes.number,
  setCuota: PropTypes.func,
  lapsos: PropTypes.array,
  lapso: PropTypes.string,
  setLapso: PropTypes.func,
  tasa: PropTypes.number,
  setTasa: PropTypes.func,
  dolar: PropTypes.number,
  setDolar: PropTypes.func,
  tiposArr: PropTypes.array,
  todasCuota: PropTypes.number,
  setTodasCuota: PropTypes.func,
  aranceles: PropTypes.array,
  agregarCuotasUpdate: PropTypes.func,
};
export default Form;
