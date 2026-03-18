import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Modal para agregar/modificar saldo a favor
const SaldoAFavor = ({ onClose, onSave, send, saldoExistente = null }) => {
  const [monto, setMonto] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (saldoExistente) {
      // Si hay saldo existente, estamos en modo edición
      setMonto(saldoExistente.Saldo || "");
      setIsEditing(true);
    } else {
      // Modo creación
      setMonto("");
      setIsEditing(false);
    }
  }, [saldoExistente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preparamos los datos para enviar
    const saldoData = {
      monto: monto,
      ...(isEditing && { idMonto: saldoExistente.Id_Monto }), // Incluimos ID si es edición
    };

    onSave(saldoData);
    send(saldoData);
    console.log("desde el modal", isEditing ? "editando" : "creando", monto);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {isEditing ? "Modificar Saldo a Favor" : "Agregar Saldo a Favor"}
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto del Saldo (Bs.)
            </label>
            <input
              type="number"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {isEditing
                ? "Modifique el monto del saldo a favor"
                : "Solo se permite un saldo a favor por factura"}
            </p>
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

SaldoAFavor.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  saldoExistente: PropTypes.shape({
    Id_Monto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Saldo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default SaldoAFavor;
