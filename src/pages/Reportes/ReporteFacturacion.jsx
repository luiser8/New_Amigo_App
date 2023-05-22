import { useEffect } from "react";
import PropTypes from "prop-types";
import BancosSelect from "../../components/selects/BancosSelect";

const ReporteFacturacion = ({
  getBancos,
  setFechaDesde,
  setFechaHasta,
  idBanco,
  setIdBanco,
  tipo,
  setTipo,
  getReporteFacturacion,
  bancos,
  btnEstablecer,
}) => {
  useEffect(() => {
    getBancos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-0 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden ">
              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Reporte de libro de facturación
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Generación de reporte libro de facturación
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={async (ev) => getReporteFacturacion(ev)}>
                      <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-8 gap-6">
                            <div className="col-span-6 sm:col-span-2">
                              <label
                                htmlFor="desde"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Fecha Desde
                              </label>
                              <input
                                type="date"
                                name="desde"
                                id="desde"
                                onChange={(ev) =>
                                  setFechaDesde(ev.target.value)
                                }
                              />
                            </div>
                            <div className="col-span-6 sm:col-span-2">
                              <label
                                htmlFor="hasta"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Fecha Hasta
                              </label>
                              <input
                                type="date"
                                name="hasta"
                                id="hasta"
                                onChange={(ev) =>
                                  setFechaHasta(ev.target.value)
                                }
                              />
                            </div>
                            <div className="col-span-10 sm:col-span-4">
                              <BancosSelect
                                bancos={bancos}
                                idBanco={idBanco}
                                setIdBanco={setIdBanco}
                              />
                            </div>

                            <div className="col-span-10 sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Tipo
                              </label>
                              <select
                                id="tipo"
                                name="tipo"
                                className="mt-0 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                value={tipo}
                                onChange={async (event) =>
                                  setTipo(Number(event.target.value))
                                }
                              >
                                <option value={0}>Todos</option>
                                <option value={1}>Depósitos</option>
                                <option value={2}>Tarjeta de débito</option>
                                <option value={3}>Tarjeta de crédito</option>
                                <option value={4}>
                                  Transferencia electronica
                                </option>
                                <option value={5}>Efectivo</option>
                                <option value={6}>Cheque</option>
                              </select>
                            </div>
                            <div className="col-span-2 pt-5">
                              <button
                                type="submit"
                                disabled={btnEstablecer}
                                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                                  btnEstablecer
                                    ? "bg-indigo-200 hover:bg-indigo-200"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                              >
                                Generar reporte
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
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

ReporteFacturacion.propTypes = {
  getBancos: PropTypes.func,
  setFechaDesde: PropTypes.func,
  setFechaHasta: PropTypes.func,
  idBanco: PropTypes.number,
  setIdBanco: PropTypes.func,
  tipo: PropTypes.number,
  setTipo: PropTypes.func,
  getReporteFacturacion: PropTypes.func,
  bancos: PropTypes.array,
  btnEstablecer: PropTypes.bool,
};

export default ReporteFacturacion;
