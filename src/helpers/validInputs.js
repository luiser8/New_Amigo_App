// Función genérica para validar múltiples campos
export const validInputs = async (campos) => {
  // Si no se proporcionan campos, retornar false
  if (!campos || campos.length === 0) return false;

  // Validar cada campo según su tipo y valor
  for (const campo of campos) {
    const { valor, nombre, tipo = "string" } = campo;

    // Validar según el tipo de campo
    switch (tipo) {
      case "number":
        if (
          valor === null ||
          valor === undefined ||
          valor === 0 ||
          valor === ""
        ) {
          return false;
        }
        break;
      case "array":
        if (!Array.isArray(valor) || valor.length === 0) {
          return false;
        }
        break;
      case "object":
        if (!valor || Object.keys(valor).length === 0) {
          return false;
        }
        break;
      default: // string y otros
        if (!valor || valor === "" || valor === null || valor === undefined) {
          return false;
        }
    }
  }

  return true;
};
