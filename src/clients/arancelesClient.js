import { get } from "../helpers/Fetch";

export const getArancelesClient = async (lapso, tipo) => {
  return await get(`arancel/get?lapso=${lapso}&tipoArancel=${tipo}`);
};
export const getArancelesSAIAClient = async (lapso, tipo) => {
  return await get(`arancel/get?lapso=${lapso}&tipoArancel=${tipo}`);
};
export const getArancelesPorLapsoClient = async (lapso) => {
  return await get(`Arancel?Lapso=${lapso}`);
};
