import { useContext, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Context } from "../../context/Context";
import BannerPuerta from "./BannerPuerta";

const Alumnos = ({
  alumno,
  deudas,
  foto,
  sexo,
  fullNombre,
  carrera,
  estAca,
  noPasa,
  esBecado,
  esDesertor,
  existe,
  pagoTodo,
  sinDocumentos,
  deuda,
  rolQuitarOpciones,
}) => {
  const { checkUser } = useContext(Context);
  const [rolPuerta,] = useState(Number(checkUser().Rol));

  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
        {rolQuitarOpciones ? 'Verificación de puerta' : 'Alumnos / deudas'}
      </h2>
      <BannerPuerta
        noPasa={noPasa}
        esBecado={esBecado}
        esDesertor={esDesertor}
        existe={existe}
        pagoTodo={pagoTodo}
        sinDocumentos={sinDocumentos}
        deuda={deuda}
        rolPuerta={rolPuerta} />
      {Object.keys(alumno).length !== 0 ? (
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-2">
          <div className="flex items-center text-gray-600 mb-2">
            {foto !== "AAAAAA==" ? (
              <img
                className={`${rolPuerta === 4 ? 'w-48 h-48' : 'w-20 h-20'} mb-4 mt-1 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100`}
                src={`data:image/png;base64,${foto}`}
                alt="Foto"
              />
            ) : (
              <img
                className="w-20 h-20 mb-4 mt-1 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                src={`${process.env.PUBLIC_URL}/${sexo === 1 ? `boy.png` : `girl.png`
                  }`}
                alt="Foto"
              />
            )}
          </div>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>
            {fullNombre}
          </p>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>
            {carrera}
          </p>
          <p className="flex items-center text-gray-600 mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>
            {estAca}
          </p>
        </div>
      ) : (
        <Fragment>
          {Object.keys(deudas).length !== 0 ? (
            <div className="max-w-7xl mx-auto py-2">
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <h2 className="text-md font-medium leading-6 text-gray-900">
                    Parece que este alumno no esta inscrito Académicamente para
                    mostrar sus datos.
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            <Fragment>
              {Object.keys(alumno).length === 0 &&
                Object.keys(deudas).length !== 0 ? (
                <p className="text-md font-medium leading-6 text-gray-900">
                  Alumno no inscrito académicamente
                </p>
              ) : (
                <></>
              )}
              {Object.keys(alumno).length === 0 && Object.keys(deudas).length === 0 &&
                pagoTodo ? (
                <p className="text-md font-medium leading-6 text-gray-900">
                  Alumno no inscrito académicamente
                </p>
              ) : (
                <></>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

Alumnos.propTypes = {
  foto: PropTypes.string,
  sexo: PropTypes.number,
  fullNombre: PropTypes.string,
  carrera: PropTypes.number,
  estAca: PropTypes.string,
  alumno: PropTypes.array,
  deudas: PropTypes.array,
  noPasa: PropTypes.bool,
  esBecado: PropTypes.bool,
  esDesertor: PropTypes.bool,
  existe: PropTypes.bool,
  pagoTodo: PropTypes.bool,
  sinDocumentos: PropTypes.bool,
  deuda: PropTypes.number,
  rolQuitarOpciones: PropTypes.bool,
};

export default Alumnos;
