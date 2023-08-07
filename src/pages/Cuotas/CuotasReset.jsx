import PropTypes from "prop-types";
import LapsosSelect from "../../components/selects/LapsosSelect";

const CuotasReset = ({
  lapsos,
  aranceles,
  postResetCuota,
  setLapso,
  arancelCheck,
  lapso,
  changeMonto,
}) => {
  return (
    <div className="mt-4 md:mt-0 md:col-span-2">
      <form onSubmit={async (ev) => postResetCuota(ev)}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-2 bg-white sm:p-6">
            <div className="grid grid-cols-10 gap-6">
              <div className="col-span-10 sm:col-span-full">
                {Object.keys(aranceles).length !== 0 ? (
                  <div className="px-4 py-0">
                    <h2 className="-mx-2 mb-2 flow-root">
                      <span className="font-medium text-lg text-gray-900">
                        Reset cuotas
                      </span>
                    </h2>
                    <h3 className="-mx-2 -my-3 flow-root">
                      <span className="font-medium text-gray-900">
                        Aranceles
                      </span>
                    </h3>
                    <div className="pt-6" id="filter-section-mobile-1">
                      <div className="space-y-1">
                        {Object.keys(aranceles).map((_, arancel) => (
                          <div
                            className="flex items-center"
                            key={aranceles[arancel].Id_Arancel}
                          >
                            <input
                              type="checkbox"
                              defaultValue={aranceles[arancel].Id_Arancel}
                              defaultChecked={false}
                              id={`Arancel${aranceles[
                                arancel
                              ].Id_Arancel.toString().slice(-1)}`}
                              onChange={async (ev) =>
                                changeMonto(
                                  ev.target.checked,
                                  aranceles[arancel].Id_Arancel,
                                )
                              }
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 min-w-0 flex-1 text-gray-500">
                              {aranceles[arancel].Descripcion}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
              <div className="col-span-6 sm:col-span-2">
                <LapsosSelect
                  lapsos={lapsos}
                  lapso={lapso}
                  setLapso={setLapso}
                />
              </div>
              <div className="col-span-6 sm:col-span-2 pt-6">
                <button
                  type="submit"
                  disabled={
                    arancelCheck.length !== 0 && lapso !== "" ? false : true
                  }
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    arancelCheck.length !== 0 && lapso !== ""
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-indigo-200 hover:bg-indigo-200"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  Resetear
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

CuotasReset.propTypes = {
  lapsos: PropTypes.array,
  aranceles: PropTypes.array,
  postResetCuota: PropTypes.func,
  setLapso: PropTypes.func,
  arancelCheck: PropTypes.array,
  lapso: PropTypes.string,
  changeMonto: PropTypes.func,
};

export default CuotasReset;
