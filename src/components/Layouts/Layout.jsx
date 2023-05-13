import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  LogoutIcon,
  ChartPieIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  CogIcon,
  CalculatorIcon,
  RefreshIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { Context } from "../../context/Context";
import Routes from "../../utils/Routes";

const Layout = () => {
  const { logout, checkUser, checkLapso, checkConfigI, checkConfigN } =
    useContext(Context);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Fragment>
      {checkUser().UsuarioId !== null ? (
        <Fragment>
          <Popover className="relative bg-white">
            {({ _ }) => (
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-2 md:justify-start md:space-x-10">
                  <div className="flex justify-start lg:w-0 lg:flex-1">
                    <NavLink
                      to={`${checkUser().Rol === "6" ? "/contabilidad" : "/"}`}
                      className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
                    >
                      <img
                        className="h-10 w-8 md:w-12 lg:w-16"
                        src={`${process.env.PUBLIC_URL}/logopsm.jpg`}
                        alt="Logo PSM"
                      />
                      {/* <span class="ml-3 text-xl">Instituto Universitario Politécnico "Santiago Mariño"</span> */}
                    </NavLink>
                  </div>
                  <div className="-mr-1 -my-2 md:hidden">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                  <Popover.Group as="nav" className="hidden md:flex space-x-10">
                    <span className="font-semibold">
                      Lapso: {checkLapso() ? checkLapso() : "Lapso ?"}
                      <span className="pl-3">
                        Cuota Nacional:{" "}
                        {checkConfigN().DolarN
                          ? `$${checkConfigN().DolarN}`
                          : "Dolar ?"}{" "}
                        {checkConfigN().Cuota
                          ? `Bs.${checkConfigN().Cuota}`
                          : "Cuota ?"}
                      </span>
                      <span className="pl-3">
                        Cuota Internacional:{" "}
                        {checkConfigI().DolarI
                          ? `$${checkConfigI().DolarI}`
                          : "Dolar ?"}{" "}
                        {checkConfigI().CuotaSAIA
                          ? `Bs.${checkConfigI().CuotaSAIA}`
                          : "Cuota Internacional ?"}
                      </span>
                    </span>
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={classNames(
                              open ? "text-gray-900" : "text-gray-500",
                              "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2",
                            )}
                          >
                            <span>
                              {checkUser().Nombres} {checkUser().Apellidos}
                            </span>
                            <ChevronDownIcon
                              className={classNames(
                                open ? "text-gray-600" : "text-gray-400",
                                "ml-2 h-5 w-5 group-hover:text-gray-500",
                              )}
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel
                              static
                              className="absolute z-10 -ml-4 mt-3 transform px-2 w-60 max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-2/3"
                            >
                              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative grid gap-4 bg-white px-4 py-2 sm:gap-8 sm:p-6">
                                  <span className="-mt-4 -mb-3 -ml-3 font-semibold">
                                    Rol: {checkUser().NombreRol}
                                  </span>
                                  {checkUser().Rol === "1" ||
                                  checkUser().Rol === "2" ? (
                                    <NavLink
                                      to={`/reportes/deudas`}
                                      className="-m-4 p-2 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                      <CurrencyDollarIcon
                                        className="flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                      />
                                      <p className="pl-2 text-base font-semibold">
                                        Reporte deudas
                                      </p>
                                    </NavLink>
                                  ) : (
                                    <></>
                                  )}
                                  {checkUser().Rol === "1" ||
                                  checkUser().Rol === "2" ? (
                                    <NavLink
                                      to={`/reportes/inscripciones`}
                                      className="-m-4 p-2 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                      <AcademicCapIcon
                                        className="flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                      />
                                      <p className="pl-2 text-base font-semibold">
                                        Reporte inscripciones
                                      </p>
                                    </NavLink>
                                  ) : (
                                    <></>
                                  )}
                                  {checkUser().Rol === "1" ||
                                  checkUser().Rol === "2" ? (
                                    <NavLink
                                      to={`/reportes/facturacion`}
                                      className="-m-4 p-2 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                      <ChartPieIcon
                                        className="flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                      />
                                      <p className="pl-2 text-base font-semibold">
                                        Reporte facturación
                                      </p>
                                    </NavLink>
                                  ) : (
                                    <></>
                                  )}
                                  {checkUser().Rol === "1" ||
                                  checkUser().Rol === "2" ||
                                  checkUser().Rol === "3" ? (
                                    <NavLink
                                      to={`/actualizar`}
                                      className="-m-4 p-2 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                      <RefreshIcon
                                        className="flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                      />
                                      <p className="pl-2 text-base font-semibold">
                                        Actualización cuotas
                                      </p>
                                    </NavLink>
                                  ) : (
                                    <></>
                                  )}

                                  {checkUser().Rol === "1" ||
                                  checkUser().Rol === "2" ||
                                  checkUser().Rol === "3" ? (
                                    <NavLink
                                      to={`/insertar`}
                                      className="-m-4 p-2 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                      <ViewGridAddIcon
                                        className="flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                      />
                                      <p className="pl-2 text-base font-semibold">
                                        Inserción cuotas
                                      </p>
                                    </NavLink>
                                  ) : (
                                    <></>
                                  )}
                                  {checkUser().Rol === "6" ? (
                                    <NavLink
                                      to={`/contabilidad`}
                                      className="-m-4 p-2 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                      <CalculatorIcon
                                        className="flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                      />
                                      <p className="pl-2 text-base font-semibold">
                                        Contabilidad
                                      </p>
                                    </NavLink>
                                  ) : (
                                    <></>
                                  )}
                                  {checkUser().Rol === "1" ||
                                  checkUser().Rol === "2" ? (
                                    <NavLink
                                      to={`/configuracion`}
                                      className="-m-4 p-2 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                      <CogIcon
                                        className="flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                      />
                                      <p className="pl-2 text-base font-semibold">
                                        Configuraciones
                                      </p>
                                    </NavLink>
                                  ) : (
                                    <></>
                                  )}

                                  <NavLink
                                    to={``}
                                    className="-m-4 p-2 flex items-start rounded-lg hover:bg-gray-50"
                                    onClick={async () => logout(0, null)}
                                  >
                                    <LogoutIcon
                                      className="flex-shrink-0 h-6 w-6"
                                      aria-hidden="true"
                                    />
                                    <p className="pl-2 text-base font-semibold">
                                      Cerrar sesión
                                    </p>
                                  </NavLink>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </Popover.Group>
                </div>
              </div>
            )}
          </Popover>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      <Routes />
    </Fragment>
  );
};

export default Layout;
