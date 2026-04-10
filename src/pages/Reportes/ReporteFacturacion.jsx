import { useEffect } from "react";
import PropTypes from "prop-types";
import BancosSelect from "../../components/selects/BancosSelect";
import { Toast } from "../../helpers/Toast";

const ReporteFacturacion = ({
  bancos,
  getBancos,
  desde,
  hasta,
  setFechaDesde,
  setFechaHasta,
  idBanco,
  setIdBanco,
  getReporteFacturacion,
  btnEstablecer,
  validateBtn,
}) => {
  useEffect(() => {
    getBancos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-0 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="mt-10 sm:mt-0">
                {/* Cabecera principal */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Reportes de facturación
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Generación de reporte por bancos y generales
                    </p>
                  </div>
                </div>

                {/* Contenedor del formulario */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg border-t-4 border-indigo-500">
                  <div className="px-4 py-5 sm:p-6">
                    <form>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha Desde <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={desde}
                            type="date"
                            name="desde"
                            id="desde"
                            onChange={(ev) => setFechaDesde(ev.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha Hasta <span className="text-red-500">*</span>
                          </label>
                          <input
                            value={hasta}
                            type="date"
                            name="hasta"
                            id="hasta"
                            onChange={(ev) => setFechaHasta(ev.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Banco <span className="text-red-500">*</span>
                          </label>
                          <BancosSelect
                            bancos={bancos}
                            idBanco={idBanco}
                            setIdBanco={setIdBanco}
                          />
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={async (ev) => {
                            try {
                              const isValid = await validateBtn("depositos");
                              if (isValid) {
                                await getReporteFacturacion(ev, "depositos");
                              } else {
                                // Opcional: mostrar mensaje de error
                                Toast({
                                  show: true,
                                  title: "Campos incompletos",
                                  msj: "Por favor complete todos los campos requeridos",
                                  color: "yellow",
                                });
                              }
                            } catch (error) {
                              console.error("Error en validación:", error);
                            }
                          }}
                          disabled={btnEstablecer}
                          className={`inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                            btnEstablecer
                              ? "bg-indigo-200 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                          }`}
                        >
                          <svg
                            className="-ml-1 mr-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Generar por banco
                        </button>

                        <button
                          type="button"
                          onClick={async (ev) => {
                            try {
                              const isValid = await validateBtn("cierrecaja");
                              if (isValid) {
                                await getReporteFacturacion(ev, "cierrecaja");
                              } else {
                                // Opcional: mostrar mensaje de error
                                Toast({
                                  show: true,
                                  title: "Campos incompletos",
                                  msj: "Por favor complete todos los campos requeridos",
                                  color: "yellow",
                                });
                              }
                            } catch (error) {
                              console.error("Error en validación:", error);
                            }
                          }}
                          disabled={btnEstablecer}
                          className={`inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                            btnEstablecer
                              ? "bg-indigo-200 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                          }`}
                        >
                          <svg
                            className="-ml-1 mr-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Generar general
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Leyenda informativa */}
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">Reporte por banco:</span>{" "}
                        Genera un reporte filtrado por el banco seleccionado.
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        <span className="font-medium">Reporte general:</span>{" "}
                        Genera un reporte consolidado de todos los bancos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Campos requeridos */}
                <div className="mt-4 text-xs text-gray-500 text-right">
                  <span className="text-red-500">*</span> Campos requeridos
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
  bancos: PropTypes.array,
  getBancos: PropTypes.func,
  desde: PropTypes.string,
  hasta: PropTypes.string,
  setFechaDesde: PropTypes.func,
  setFechaHasta: PropTypes.func,
  idBanco: PropTypes.number,
  setIdBanco: PropTypes.func,
  getReporteFacturacion: PropTypes.func,
  btnEstablecer: PropTypes.bool,
  validateBtn: PropTypes.func,
};

export default ReporteFacturacion;
