import { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

const DeudasDetalle = ({
  checkuser,
  deudas,
  cuotaVencida,
  activeConfirmacion,
  activeModificacion,
  rolQuitarOpciones,
}) => {
  const getStatusStyles = (pagada, vencida) => {
    if (pagada === 1) return "bg-green-50 border-l-4 border-green-400";
    if (vencida) return "bg-red-50 border-l-4 border-red-400";
    return "bg-yellow-50 border-l-4 border-yellow-400";
  };

  const getBadgeStyles = (pagada) => {
    return pagada === 1
      ? "bg-green-100 text-green-800 border border-green-200"
      : "bg-red-100 text-red-800 border border-red-200";
  };

  return (
    <Fragment>
      {deudas?.length > 0 ? (
        <div className="max-w-7xl mx-auto mt-6">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow-lg overflow-hidden border border-gray-200 sm:rounded-xl">
                  {/* Tabla para desktop */}
                  <table className="min-w-full divide-y divide-gray-200 hidden md:table">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        {[
                          "Arancel",
                          "Estado",
                          "Monto",
                          "Facturas",
                          "Total",
                          "Vencimiento",
                          ...(!rolQuitarOpciones ? ["Opciones"] : []),
                        ].map((header) => (
                          <th
                            key={header}
                            scope="col"
                            className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {deudas.map((deuda, index) => (
                        <tr
                          key={index}
                          className={`${getStatusStyles(
                            deuda.Pagada,
                            deuda.Pagada === 0 && cuotaVencida,
                          )} transition-colors hover:bg-opacity-80`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-semibold text-gray-900">
                                {deuda.Cuota}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeStyles(deuda.Pagada)}`}
                            >
                              {deuda.Pagada === 0 ? "Pendiente" : "Cancelada"}
                              {deuda.Pagada === 0 &&
                                cuotaVencida &&
                                " (Vencida)"}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">
                              Bsf. {Number(deuda.Monto).toLocaleString()}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              Bsf.{" "}
                              {Number(deuda.MontoFacturas).toLocaleString()}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">
                              Bsf. {Number(deuda.Total).toLocaleString()}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-600">
                              <svg
                                className="w-4 h-4 mr-1 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {Moment(deuda.FechaVencimiento).format(
                                "DD/MM/YYYY",
                              )}
                            </div>
                          </td>

                          {!rolQuitarOpciones && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                {deuda.Pagada === 0 && checkuser !== "4" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        activeModificacion(
                                          true,
                                          deuda.Id_Cuenta,
                                          deuda.Cuota,
                                        )
                                      }
                                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                                      title="Modificar monto"
                                    >
                                      <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        activeConfirmacion({
                                          open: true,
                                          pagada: deuda.Pagada,
                                          id_inscripcion: deuda.Id_Inscripcion,
                                          id_arancel: deuda.Id_Arancel,
                                          arancel: deuda.Cuota,
                                        })
                                      }
                                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                                      title="Eliminar cuota"
                                    >
                                      <TrashIcon className="h-5 w-5" />
                                    </button>
                                  </>
                                )}
                                {deuda.Pagada === 1 && (
                                  <button
                                    onClick={() =>
                                      activeConfirmacion({
                                        open: true,
                                        pagada: deuda.Pagada,
                                        id_inscripcion: deuda.Id_Inscripcion,
                                        id_arancel: deuda.Id_Arancel,
                                        arancel: deuda.Cuota,
                                      })
                                    }
                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                                    title="Anular factura"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Vista móvil - Tarjetas */}
                  <div className="md:hidden space-y-4 p-4">
                    {deudas.map((deuda, index) => (
                      <div
                        key={index}
                        className={`${getStatusStyles(
                          deuda.Pagada,
                          deuda.Pagada === 0 && cuotaVencida,
                        )} bg-white rounded-lg shadow p-4 space-y-3`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {deuda.Cuota}
                            </h3>
                            <span
                              className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full ${getBadgeStyles(deuda.Pagada)}`}
                            >
                              {deuda.Pagada === 0 ? "Pendiente" : "Cancelada"}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Total</div>
                            <div className="text-lg font-bold text-gray-900">
                              Bsf. {Number(deuda.Total).toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Monto:</span>
                            <span className="ml-1 font-medium">
                              Bsf. {Number(deuda.Monto).toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Facturas:</span>
                            <span className="ml-1 font-medium">
                              Bsf.{" "}
                              {Number(deuda.MontoFacturas).toLocaleString()}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">Vence:</span>
                            <span className="ml-1 font-medium">
                              {Moment(deuda.FechaVencimiento).format(
                                "DD/MM/YYYY",
                              )}
                            </span>
                          </div>
                        </div>

                        {!rolQuitarOpciones && (
                          <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                            {deuda.Pagada === 0 && checkuser !== "4" && (
                              <>
                                <button
                                  onClick={() =>
                                    activeModificacion(
                                      true,
                                      deuda.Id_Cuenta,
                                      deuda.Cuota,
                                    )
                                  }
                                  className="flex-1 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                >
                                  Modificar
                                </button>
                                <button
                                  onClick={() =>
                                    activeConfirmacion({
                                      open: true,
                                      pagada: deuda.Pagada,
                                      id_inscripcion: deuda.Id_Inscripcion,
                                      id_arancel: deuda.Id_Arancel,
                                      arancel: deuda.Cuota,
                                    })
                                  }
                                  className="flex-1 py-2 px-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                >
                                  Eliminar
                                </button>
                              </>
                            )}
                            {deuda.Pagada === 1 && (
                              <button
                                onClick={() =>
                                  activeConfirmacion({
                                    open: true,
                                    pagada: deuda.Pagada,
                                    id_inscripcion: deuda.Id_Inscripcion,
                                    id_arancel: deuda.Id_Arancel,
                                    arancel: deuda.Cuota,
                                  })
                                }
                                className="w-full py-2 px-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                              >
                                Anular factura
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto mt-6">
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Sin deudas
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No hay cuotas registradas para este estudiante.
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

DeudasDetalle.propTypes = {
  checkuser: PropTypes.string,
  activeConfirmacion: PropTypes.func,
  activeModificacion: PropTypes.func,
  deudas: PropTypes.array,
  cuotaVencida: PropTypes.bool,
  rolQuitarOpciones: PropTypes.bool,
};

export default DeudasDetalle;
