import React from "react";
import PropTypes from "prop-types";
import {
  FolderAddIcon,
  KeyIcon,
  PencilIcon,
  TrashIcon,
  UserAddIcon,
} from "@heroicons/react/outline";

const PeriodosContables = ({ data, setFechaDesde, setFechaHasta }) => {
  return (
    <div className="max-w-7xl mx-auto pt-1 pb-8 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-2 bg-white sm:p-6">
                  <div className="grid grid-cols-8 gap-6">
                    <div className="col-span-4 sm:col-span-1">
                      <label
                        htmlFor="desde"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Desde
                      </label>
                      <input
                        type="date"
                        name="desde"
                        id="desde"
                        onChange={(event) => setFechaDesde(event.target.value)}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-1">
                      <label
                        htmlFor="hasta"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hasta
                      </label>
                      <input
                        type="date"
                        name="hasta"
                        id="hasta"
                        onChange={(event) => setFechaHasta(event.target.value)}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-2 mx-4">
                      <button
                        type="button"
                        className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        //onClick={async () => activeInsertar(true)}
                      >
                        <FolderAddIcon
                          className="-ml-1 mr-0 h-6 w-6 text-gray-500"
                          aria-hidden="true"
                        />
                        Crear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {Object.keys(data).length !== 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col">
            <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Id_Periodo
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Inicio
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Fin
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Descripción
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Bloqueado
                        </th>
                        {/* <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Opciones
                        </th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map((item, key) => (
                        <tr key={key}>
                          <td className={`px-6 py-4 whitespace-nowrap `}>
                            <div className="text-sm font-semibold text-gray-900">
                              {item.Id_Periodo}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.Inicio}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.Fin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.Descripcion}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                              item.Bloqueado === 0
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                          >{`${item.Bloqueado === 0 ? "No" : "Si"}`}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* <div className="text-sm text-gray-900">
                              {Moment(item.FechaCreacion).format(
                                "DD-MM-YYYY",
                              )}
                            </div> */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                              {usuarios[item].Rol !== 1 ? (
                                <>
                                  <PencilIcon
                                    onClick={async () =>
                                      activeEditar({
                                        open: true,
                                        usuarioId: usuarios[item].UsuarioId,
                                        usuario: usuarios[item],
                                      })
                                    }
                                    className="-ml-1 mr-2 h-7 w-7 text-gray-500"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                  />
                                  <KeyIcon
                                    onClick={async () =>
                                      activeCambiarClave({
                                        open: true,
                                        usuarioId: usuarios[item].UsuarioId,
                                        usuario: `${usuarios[item].Nombres} ${usuarios[item].Apellidos}`,
                                      })
                                    }
                                    className="-ml-1 mr-2 h-7 w-7 text-gray-500"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                  />
                                  <TrashIcon
                                    onClick={async () =>
                                      activeDelete({
                                        open: true,
                                        usuarioId: usuarios[item].UsuarioId,
                                        usuario: `${usuarios[item].Nombres} ${usuarios[item].Apellidos}`,
                                      })
                                    }
                                    className="-ml-1 mr-2 h-7 w-7 text-gray-500"
                                    style={{ cursor: "pointer" }}
                                    aria-hidden="true"
                                  />
                                </>
                              ) : (
                                <></>
                              )}
                            </div> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto pt-4 pb-10">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div className="border border-blue-300 shadow rounded-md p-8 w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-blue-400 rounded"></div>
                          <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PeriodosContables.propTypes = {
  data: PropTypes.array,
  setFechaDesde: PropTypes.func,
  setFechaHasta: PropTypes.func,
};

export default PeriodosContables;
