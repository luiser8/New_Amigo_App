import { useState, useEffect } from "react";
import Moment from "moment";
import PropTypes from "prop-types";
// import { TrashIcon, StopIcon } from "@heroicons/react/solid";
// import { Context } from "../../context/Context";

const Facturas = ({ data, openC }) => {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    let call = true;
    if (call && data[0].Factura.length !== 0) {
      setFacturas(data[0].Factura);
    }
    return () => {
      call = false;
      setFacturas([]);
    };
  }, [data]);

  return (
    <div className="pt-10 pb-8">
      {facturas.length !== 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Factura
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Arancel
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Pagada
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Monto
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Fecha de pago
                        </th>
                        {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Opciones
                            </th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {facturas.map((_, item) => (
                        <tr key={item} className="hover:bg-gray-50">
                          <td
                            className={`px-6 py-4 whitespace-nowrap ${
                              facturas[item].Anulada === 1
                                ? "bg-red-200"
                                : "bg-green-200"
                            }`}
                          >
                            <span className="text-xs font-bold text-gray-900">
                              {facturas[item].Anulada === 1 ? "Anulada" : ""}
                            </span>
                            <div className="text-sm font-bold text-gray-900">
                              {facturas[item].Id_Factura}
                            </div>
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap ${
                              facturas[item].Abono === 1
                                ? "bg-yellow-50"
                                : "bg-green-50"
                            }`}
                          >
                            <div className="text-sm font-semibold text-gray-900">
                              {facturas[item].Abono === 1
                                ? `ABONO ${facturas[item].Descripcion}`
                                : facturas[item].Descripcion}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                            >
                              Si
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap`}>
                            <div className="text-sm font-semibold text-gray-900">
                              {facturas[item].Monto}
                            </div>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap`}>
                            <div className="text-sm font-semibold text-gray-900">
                              {Moment(facturas[item].Hora).format(
                                "DD-MM-YYYY hh:mm:ss A",
                              )}
                            </div>
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                            {checkUser().Rol === '1' || checkUser().Rol === '2' ?
                                                                <TrashIcon className="-ml-1 mr-2 h-8 w-8 text-gray-500" style={{ cursor: 'pointer' }} onClick={async () => activeConfirmacion({'open':true, 'pagada': 1, 'id_factura': factura_list[item].Factura[f].Id_Factura, 'id_inscripcion': factura_list[item].Factura[f].Id_Inscripcion,'id_arancel': factura_list[item].Factura[f].Id_Arancel,'arancel': factura_list[item].Factura[f].Descripcion})} aria-hidden="true" />
                                                            :<>
                                                                <StopIcon className="-ml-1 mr-2 h-8 w-8 text-gray-500" aria-hidden="true"/>
                                                            </>}
                                                            </div>
                                                        </td> */}
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
        <></>
      )}
    </div>
  );
};
Facturas.propTypes = {
  data: PropTypes.array,
  openC: PropTypes.func,
};
export default Facturas;
