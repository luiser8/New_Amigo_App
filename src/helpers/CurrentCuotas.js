import { getCuotasService } from "../services/cuotasService";

export const currentCuotas = async (tipo, estado, setConfigCuotaI, setConfigCuotaN) => {
    return await getCuotasService(tipo, estado).then(async (x) => {
        await setCurrentCuotas(x, setConfigCuotaI, setConfigCuotaN);
    });
}

export const setCurrentCuotas = async (items, setConfigCuotaI, setConfigCuotaN) => {
    return items?.forEach((item, index) => {
        if (index === 0) {
            setConfigCuotaI(2, {
                Lapso: null,
                DolarI: item.Dolar,
                CuotaSAIAId: item.CuotaId,
                CuotaSAIA: item.Monto,
            });
        } if (index === 1) {
            setConfigCuotaN(2, {
                Lapso: null,
                DolarN: item.Dolar,
                CuotaId: item.CuotaId,
                Cuota: item.Monto,
            });
        }
    });
};
