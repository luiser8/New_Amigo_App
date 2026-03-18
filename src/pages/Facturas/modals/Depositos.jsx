import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Modal para agregar/modificar depósito
const Depositos = ({
  bancos,
  onClose,
  onSave,
  send,
  depositoExistente = null,
  onGetAllBancos,
}) => {
  const [formData, setFormData] = useState({
    Id_Banco: "",
    monto: "",
    fecha: new Date().toISOString().split("T")[0],
    tipo: "",
    numeroReferencia: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (depositoExistente) {
      // Si hay depósito existente, estamos en modo edición
      setFormData({
        Id_Banco: depositoExistente.Id_Banco || "",
        monto: depositoExistente.MontoDeposito || "",
        fecha: depositoExistente.FechaDeposito
          ? new Date(depositoExistente.FechaDeposito)
              .toISOString()
              .split("T")[0]
          : new Date().toISOString().split("T")[0],
        tipo: depositoExistente.Tipo || "",
        numeroReferencia: depositoExistente.Referencia || "",
      });
      setIsEditing(true);
    } else {
      // Modo creación
      setFormData({
        Id_Banco: "",
        monto: "",
        fecha: new Date().toISOString().split("T")[0],
        tipo: "",
        numeroReferencia: "",
      });
      setIsEditing(false);
    }
  }, [depositoExistente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const depositoData = {
      Id_Banco: parseInt(formData.Id_Banco),
      Fecha: new Date(formData.fecha).toISOString(),
      Tipo: Number(formData.tipo),
      Monto: formData.monto,
      Referencia: formData.numeroReferencia,
      ...(isEditing && { Id_Deposito: depositoExistente.Id_Deposito }), // Incluimos ID si es edición
    };

    onSave(depositoData);
    send(depositoData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-6 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800">
            {isEditing ? "Modificar Depósito" : "Agregar Depósito"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banco
            </label>
            <select
              value={formData.Id_Banco}
              onChange={(e) =>
                setFormData({ ...formData, Id_Banco: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione un banco</option>
              {bancos.map((banco) => (
                <option key={banco.Id_Banco} value={banco.Id_Banco}>
                  {banco.Descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <button
              type="button"
              onClick={async () => {
                await onGetAllBancos();
              }}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Traer todos los bancos
            </button>
            <span className="text-sm text-gray-600 ml-2">
              ⚠️ Traer todos los bancos puede generar duplicidad en los datos
              bancarios de la factura.
            </span>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto (Bs.)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.monto}
              onChange={(e) =>
                setFormData({ ...formData, monto: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fecha: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de operación
            </label>
            <select
              value={formData.tipo}
              onChange={(e) =>
                setFormData({ ...formData, tipo: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="1">Deposito</option>
              <option value="2">Débito</option>
              <option value="3">Tarjeta de Credito</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Referencia
            </label>
            <input
              type="text"
              value={formData.numeroReferencia}
              onChange={(e) =>
                setFormData({ ...formData, numeroReferencia: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Depositos.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  bancos: PropTypes.array.isRequired,
  depositoExistente: PropTypes.shape({
    Id_Deposito: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Id_Banco: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    MontoDeposito: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    FechaDeposito: PropTypes.string,
    Tipo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Referencia: PropTypes.string,
    Banco: PropTypes.string,
    TipoDescripcion: PropTypes.string,
  }),
  onGetAllBancos: PropTypes.func,
};

export default Depositos;
