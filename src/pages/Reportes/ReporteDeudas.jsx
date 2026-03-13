import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LapsosSelect from "../../components/selects/LapsosSelect";
import ArancelesSelect from "../../components/selects/ArancelesSelect";

const ReporteDeudas = ({
  getReporte,
  setLapso,
  lapsos,
  lapso,
  setPagada,
  pagada,
  setConcepto,
  concepto,
  conceptos,
  btnEstablecer,
}) => {
  // Estado local para controlar qué reporte se está generando
  const [reporteEnProceso, setReporteEnProceso] = useState(null);
  // Estado para controlar la carga de conceptos
  const [cargandoConceptos, setCargandoConceptos] = useState(false);

  const handleGenerarReporte = async (ev, tipoReporte) => {
    console.log(concepto, lapso, tipoReporte, pagada);
    ev.preventDefault();
    setReporteEnProceso(tipoReporte);
    await getReporte(ev, tipoReporte);
    setReporteEnProceso(null);
  };

  const handleRefrescarConceptos = async () => {
    if (lapso && fetchConceptosPorLapso) {
      setCargandoConceptos(true);
      try {
        await fetchConceptosPorLapso(lapso);
      } catch (error) {
        console.error("Error al refrescar conceptos:", error);
      } finally {
        setCargandoConceptos(false);
      }
    }
  };

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
                      Generador de Reportes
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Selecciona el lapso y luego el tipo de reporte que deseas
                      generar
                    </p>
                  </div>
                </div>

                {/* Selector de Lapso Compartido */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8 border-2 border-indigo-100">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="md:flex md:items-end md:justify-between">
                      <div className="md:w-2/3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lapso académico{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <LapsosSelect
                          lapsos={lapsos}
                          lapso={lapso}
                          setLapso={setLapso}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Este lapso se aplicará a ambos reportes
                        </p>
                      </div>
                      <div className="mt-3 md:mt-0 md:ml-4">
                        <div className="flex items-center text-sm text-indigo-600 bg-indigo-50 px-3 py-2 rounded-md">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Lapso seleccionado:{" "}
                          <span className="font-semibold ml-1">
                            {lapso || "Ninguno"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenedor de los dos reportes */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Reporte de Deudas - Solo lapso (ya compartido) */}
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg border-t-4 border-indigo-500">
                    <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-50 to-blue-50">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                              <path
                                fillRule="evenodd"
                                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Reporte general de deudas
                          </h3>
                          <p className="text-sm text-gray-600">
                            Genera un reporte completo de todas las deudas del
                            lapso seleccionado
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <form
                        onSubmit={(ev) => handleGenerarReporte(ev, "deudas")}
                      >
                        <div className="space-y-6">
                          {/* Información del lapso seleccionado (solo lectura) */}
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center text-sm">
                              <span className="font-medium text-gray-700">
                                Lapso a utilizar:
                              </span>
                              <span className="ml-2 text-indigo-600 font-semibold">
                                {lapso || "No seleccionado"}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              type="submit"
                              disabled={btnEstablecer || !lapso}
                              className={`w-full inline-flex justify-center items-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                                btnEstablecer || !lapso
                                  ? "bg-indigo-200 cursor-not-allowed"
                                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                              }`}
                            >
                              {reporteEnProceso === "deudas" ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Generando reporte...
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="-ml-1 mr-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Generar reporte general
                                </>
                              )}
                            </button>
                            {!lapso && (
                              <p className="mt-2 text-xs text-amber-600">
                                ⚠️ Selecciona un lapso primero
                              </p>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Reporte por Conceptos - Con filtros adicionales */}
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg border-t-4 border-emerald-500">
                    <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-emerald-50 to-teal-50">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-600">
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                              <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Reporte por conceptos
                          </h3>
                          <p className="text-sm text-gray-600">
                            Reporte detallado filtrando por concepto y estado de
                            pago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <form
                        onSubmit={(ev) => handleGenerarReporte(ev, "conceptos")}
                      >
                        <div className="space-y-4">
                          {/* Información del lapso seleccionado (solo lectura) */}
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center text-sm">
                              <span className="font-medium text-gray-700">
                                Lapso:
                              </span>
                              <span className="ml-2 text-emerald-600 font-semibold">
                                {lapso || "No seleccionado"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Concepto de pago{" "}
                                <span className="text-red-500">*</span>
                              </label>
                            </div>
                            <div className="relative">
                              <ArancelesSelect
                                aranceles={conceptos}
                                arancel={concepto}
                                setArancel={setConcepto}
                                type={0}
                              />
                              {cargandoConceptos && (
                                <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-md">
                                  <div className="flex items-center text-emerald-600">
                                    <svg
                                      className="animate-spin h-4 w-4 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    <span className="text-xs">
                                      Cargando conceptos...
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                            {lapso &&
                              conceptos?.length === 0 &&
                              !cargandoConceptos && (
                                <p className="mt-1 text-xs text-amber-600">
                                  ⚠️ No hay conceptos disponibles para este
                                  lapso
                                </p>
                              )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Estado de pago
                            </label>
                            <select
                              id="pagadaConcepto"
                              name="pagadaConcepto"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-base"
                              value={pagada}
                              onChange={async (event) =>
                                setPagada(Number(event.target.value))
                              }
                            >
                              <option value={1}>Deudas sin pagar</option>
                              <option value={0}>Deudas pagadas</option>
                            </select>
                            <p className="mt-1 text-xs text-gray-500">
                              Filtra por estado de pago (opcional)
                            </p>
                          </div>

                          <div className="pt-2">
                            <button
                              type="submit"
                              disabled={
                                btnEstablecer || !lapso || cargandoConceptos
                              }
                              className={`w-full inline-flex justify-center items-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                                btnEstablecer || !lapso || cargandoConceptos
                                  ? "bg-indigo-200 cursor-not-allowed"
                                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                              }`}
                            >
                              <>
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
                                Generar reporte por concepto
                              </>
                            </button>
                            {!lapso && (
                              <p className="mt-2 text-xs text-amber-600">
                                ⚠️ Selecciona un lapso primero
                              </p>
                            )}
                            {lapso && !concepto && !cargandoConceptos && (
                              <p className="mt-2 text-xs text-amber-600">
                                ⚠️ Selecciona un concepto
                              </p>
                            )}
                            {lapso &&
                              conceptos?.length === 0 &&
                              !cargandoConceptos && (
                                <p className="mt-2 text-xs text-amber-600">
                                  ⚠️ No hay conceptos disponibles para este
                                  lapso
                                </p>
                              )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Leyenda informativa actualizada */}
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
                        <span className="font-medium">Lapso compartido:</span>{" "}
                        El lapso seleccionado arriba se aplica automáticamente a
                        ambos reportes.
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        <span className="font-medium">
                          Actualización automática:
                        </span>{" "}
                        Los conceptos se cargan automáticamente al cambiar el
                        lapso.
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        <span className="font-medium">Botón Actualizar:</span>{" "}
                        Puedes refrescar manualmente la lista de conceptos si es
                        necesario.
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

ReporteDeudas.propTypes = {
  getReporte: PropTypes.func,
  setLapso: PropTypes.func,
  lapsos: PropTypes.array,
  lapso: PropTypes.string,
  setPagada: PropTypes.func,
  pagada: PropTypes.number,
  setConcepto: PropTypes.func,
  concepto: PropTypes.string,
  conceptos: PropTypes.array,
  btnEstablecer: PropTypes.bool,
};

export default ReporteDeudas;
