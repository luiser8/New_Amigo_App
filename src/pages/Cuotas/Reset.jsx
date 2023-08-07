import { useState, useEffect, useContext } from "react";
import { Toast } from "../../helpers/Toast";
import { Context } from "../../context/Context";
import Loading from "../../components/Layouts/Loading";
import { getLapsosService } from "../../services/lapsosService";
import { getArancelesService } from "../../services/arancelesService";
import CuotasReset from "./CuotasReset";
import { postDeudaResetService } from "../../services/deudasServices";

const Reset = () => {
  const [lapsos, setLapsos] = useState([]);
  const { checkLapso } = useContext(Context);
  const [aranceles, setAranceles] = useState([]);
  const [arancelCheck, setArancelCheck] = useState([]);
  const [lapso, setLapso] = useState(checkLapso());
  const [loading, setLoading] = useState(false);

  const getLapsos = async () => {
    setLapsos(await getLapsosService());
  };

  const getAranceles = async (lapso, tipo) => {
    setAranceles(await getArancelesService(lapso, tipo));
  };

  /* Inicio Peticiones*/
  const postResetCuota = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    let data = {
      Lapso: lapso,
      Pagada: 0,
    };

    for (const key of Object.keys(arancelCheck)) {
      data[`Arancel${key}`] = Number.parseInt(arancelCheck[key].toString());
    }
    const postResetAll = await postDeudaResetService(data);
    postResetAll !== undefined
      ? Toast({
          show: true,
          title: "Información!",
          msj: `Cuotas han sido reseteadas`,
          color: "green",
        })
      : Toast({ show: false });
    setLoading(false);
    Toast({ show: false });
    getAranceles(checkLapso(), 4);
  };

  const changeLapso = (newLapso) => {
    if (newLapso !== 0) {
      setLapso(newLapso);
      getAranceles(newLapso, 4);
    }
  };

  const changeMonto = async (checked, value) => {
    checked
      ? setArancelCheck((arancelCheck) => [...arancelCheck, value])
      : setArancelCheck([...arancelCheck.filter((item) => item !== value)]);
  };

  useEffect(() => {
    getLapsos();
    getAranceles(checkLapso() !== null ? checkLapso() : lapso, 4);
    return () => {
      setLapsos([]);
      setAranceles([]);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
      {loading ? (
        <Loading
          display={"block"}
          msj={"Aplicando cambios! espera un momento..."}
        />
      ) : (
        ""
      )}
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Reset cuotas
          </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-0 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden ">
                <div className="mt-10 sm:mt-0">
                  <div className="md:grid md:grid-cols-2 md:gap-6">
                    <CuotasReset
                      lapsos={lapsos}
                      aranceles={aranceles}
                      postResetCuota={postResetCuota}
                      setLapso={changeLapso}
                      arancelCheck={arancelCheck}
                      lapso={lapso}
                      changeMonto={changeMonto}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
