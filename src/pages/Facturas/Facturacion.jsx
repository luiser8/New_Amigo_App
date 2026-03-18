import { useState, useEffect } from "react";
import {
  getFacturasByIdServices,
  postFacturasSaldoAFavorServices,
  postFacturasDepositosServices,
  putFacturasSaldoAFavorServices,
  putFacturasDepositoServices, // Asegúrate de que este import esté correcto
} from "../../services/facturasServices";
import { getBancosService } from "../../services/bancosService";
import moment from "moment";
import SaldoAFavor from "./modals/SaldoAFavor";
import Depositos from "./modals/Depositos";

const Facturacion = () => {
  const [facturas, setFacturas] = useState([]);
  const [bancos, setBancos] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [numeroFactura, setNumeroFactura] = useState("");
  const [mostrarModalDeposito, setMostrarModalDeposito] = useState(false);
  const [mostrarModalSaldo, setMostrarModalSaldo] = useState(false);
  const [depositos, setDepositos] = useState([]);
  const [saldoAFavor, setSaldoAFavor] = useState(null);
  const [editandoSaldo, setEditandoSaldo] = useState(false);
  const [editandoDeposito, setEditandoDeposito] = useState(false);
  const [depositoSeleccionado, setDepositoSeleccionado] = useState(null);

  const buscarFactura = async () => {
    if (!numeroFactura) return;

    setBuscando(true);
    await getFacturasByIdServices(numeroFactura)
      .then((values) => {
        // Asegurar que values sea un array
        const facturasArray = values;
        console.log("Facturas recibidas:", facturasArray); // Para debugging
        setFacturas(facturasArray);

        if (facturasArray.length > 0) {
          // Extraer depósitos únicos
          const depositosUnicos = facturasArray
            .flatMap((f) => f.DepositosArray || [])
            .filter(
              (dep, index, self) =>
                index ===
                self.findIndex((d) => d.Id_Deposito === dep.Id_Deposito),
            );
          setDepositos(depositosUnicos);

          // Verificar si tiene saldo a favor
          const tieneSaldo = facturasArray.some(
            (f) => f.SaldoAFavorJson && f.SaldoAFavorJson.Saldo !== "0.0000",
          );
          setSaldoAFavor(tieneSaldo ? facturasArray[0].SaldoAFavorJson : null);
        } else {
          // Limpiar datos si no hay resultados
          setDepositos([]);
          setSaldoAFavor(null);
        }
      })
      .catch((error) => {
        console.error("Error al buscar factura:", error);
        setFacturas([]);
      })
      .finally(() => {
        setBuscando(false);
        getBancos(numeroFactura);
      });
  };

  // Calcular totales con validación segura
  const primeraFactura = facturas.length > 0 ? facturas[0] : null;
  const totalFactura = primeraFactura?.Monto || "0,00";

  const totalConceptos = Array.isArray(facturas)
    ? facturas.reduce((sum, f) => {
        if (f && f.MontoConcepto) {
          const monto = parseFloat(f.MontoConcepto.replace(",", ".")) || 0;
          return sum + monto;
        }
        return sum;
      }, 0)
    : 0;

  const getBancos = async (factura) => {
    await getBancosService(factura).then((values) => {
      if (values !== null) {
        setBancos(values !== undefined ? values : []);
      }
    });
  };

  const getTodosLosBancos = async () => {
    await getBancosService(0).then((values) => {
      if (values !== null) {
        setBancos(values !== undefined ? values : []);
      }
    });
  };

  const insertarSaldoAFavor = async (saldoData) => {
    const { monto, idMonto } = saldoData;

    if (idMonto) {
      // Es una actualización
      const data = {
        Id_Monto: idMonto,
        Id_Factura: numeroFactura,
        Monto: monto,
        Cedula: primeraFactura.Identificador,
      };
      const request = await putFacturasSaldoAFavorServices(data);
      if (request !== null) {
        await buscarFactura();
      }
    } else {
      // Es una creación
      const data = {
        Id_Factura: numeroFactura,
        Monto: monto,
        Cedula: primeraFactura.Identificador,
      };
      const request = await postFacturasSaldoAFavorServices(data);
      if (request !== null) {
        await buscarFactura();
      }
    }
  };

  const insertarDeposito = async (depositoData) => {
    const { Id_Deposito, ...restData } = depositoData;

    const request = {
      Id_Factura: numeroFactura,
      Id_Banco: restData.Id_Banco,
      Referencia: restData.Referencia,
      Monto: restData.Monto,
      Fecha: moment.utc(restData.Fecha).format("YYYY-MM-DD"),
      Tipo: restData.Tipo,
    };

    if (Id_Deposito) {
      // Es una actualización
      const response = await putFacturasDepositoServices({
        ...request,
        Id_Deposito: Id_Deposito,
      });
      if (response !== null) {
        await buscarFactura();
      }
    } else {
      // Es una creación
      const response = await postFacturasDepositosServices(request);
      if (response !== null) {
        await buscarFactura();
      }
    }
  };

  const handleSaveSaldo = (nuevoSaldo) => {
    setSaldoAFavor((prevSaldo) => ({
      ...prevSaldo,
      Saldo: nuevoSaldo.monto,
    }));
    setMostrarModalSaldo(false);
    setEditandoSaldo(false);
  };

  const handleSaveDeposito = async (nuevoDeposito) => {
    setMostrarModalDeposito(false);
    setEditandoDeposito(false);
    setDepositoSeleccionado(null);
    await getBancos(numeroFactura);
  };

  const handleModificarDeposito = async (deposito) => {
    setDepositoSeleccionado(deposito);
    setEditandoDeposito(true);
    setMostrarModalDeposito(true);
    await getBancos(numeroFactura);
  };

  // useEffect(() => {
  //   getBancos();
  //   return () => {
  //     setBancos([]);
  //   };
  // }, [facturas]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Facturación</h1>

        {/* Buscador */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Factura
              </label>
              <input
                type="text"
                value={numeroFactura}
                onChange={(e) => setNumeroFactura(e.target.value)}
                placeholder="Ingrese el número de factura"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && buscarFactura()}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={buscarFactura}
                disabled={buscando}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {buscando ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                    Buscando...
                  </span>
                ) : (
                  "Buscar Factura"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {facturas.length > 0 ? (
        <>
          {/* Resumen de Factura */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Número de Factura
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {primeraFactura.Id_Factura}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Identificador
                </h3>
                <p className="text-2xl font-bold text-gray-800">
                  {primeraFactura.Identificador}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Fecha</h3>
                <p className="text-lg text-gray-800">
                  {primeraFactura.FechaFactura}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Factura
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  Bs. {totalFactura}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Conceptos
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  Bs. {totalConceptos.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Período</h3>
                <p className="text-lg text-gray-800">
                  {primeraFactura.Periodo}
                </p>
              </div>
            </div>
          </div>

          {/* Saldo a Favor */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Saldo a Favor</h2>
              {!saldoAFavor ? (
                <button
                  onClick={() => {
                    setEditandoSaldo(false);
                    setMostrarModalSaldo(true);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  + Agregar Saldo
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditandoSaldo(true);
                    setMostrarModalSaldo(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  ✎ Modificar Saldo
                </button>
              )}
            </div>

            {saldoAFavor ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-yellow-700">Saldo disponible</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      Bs. {saldoAFavor.Saldo}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-yellow-700">ID Monto</p>
                    <p className="text-lg font-medium text-yellow-600">
                      {saldoAFavor.Id_Monto}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No hay saldo a favor registrado
              </p>
            )}
          </div>

          {/* Detalle de Conceptos */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Detalle de Conceptos
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Concepto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Arancel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Detalle
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {facturas.map((factura, index) => (
                    <tr
                      key={factura.Id_Detalle || index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {factura.Concepto || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Bs. {factura.MontoConcepto || "0,00"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {factura.Id_Arancel || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {factura.Id_Detalle || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Depósitos Bancarios */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Depósitos Bancarios
              </h2>
              <button
                onClick={() => {
                  setEditandoDeposito(false);
                  setDepositoSeleccionado(null);
                  setMostrarModalDeposito(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                + Agregar Depósito
              </button>
            </div>

            {depositos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {depositos.map((deposito) => (
                  <div
                    key={deposito.Id_Deposito}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleModificarDeposito(deposito)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">Banco</p>
                        <p className="text-lg font-medium text-gray-800">
                          {deposito.Banco}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          deposito.TipoDescripcion === "Debito"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {deposito.TipoDescripcion}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Monto</p>
                        <p className="text-base font-semibold text-green-600">
                          Bs. {parseFloat(deposito.MontoDeposito).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fecha</p>
                        <p className="text-sm text-gray-700">
                          {new Date(
                            deposito.FechaDeposito,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Referencia</p>
                      <p className="text-sm text-gray-600">
                        {deposito.Referencia}
                      </p>
                    </div>

                    <div className="mt-0 text-md text-blue-800 text-right">
                      Click para modificar
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No hay depósitos registrados
              </p>
            )}
          </div>
        </>
      ) : (
        !buscando && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No hay factura seleccionada
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Ingrese un número de factura para comenzar
            </p>
          </div>
        )
      )}

      {/* Modal para agregar/modificar depósito */}
      {mostrarModalDeposito && (
        <Depositos
          bancos={bancos}
          onClose={async () => {
            setMostrarModalDeposito(false);
            setEditandoDeposito(false);
            setDepositoSeleccionado(null);
            await getBancos(numeroFactura);
          }}
          onSave={handleSaveDeposito}
          send={insertarDeposito}
          depositoExistente={editandoDeposito ? depositoSeleccionado : null}
          onGetAllBancos={getTodosLosBancos}
        />
      )}

      {/* Modal para agregar/modificar saldo a favor */}
      {mostrarModalSaldo && (
        <SaldoAFavor
          onClose={() => {
            setMostrarModalSaldo(false);
            setEditandoSaldo(false);
          }}
          onSave={handleSaveSaldo}
          send={insertarSaldoAFavor}
          saldoExistente={editandoSaldo ? saldoAFavor : null}
        />
      )}
    </div>
  );
};

export default Facturacion;
