import { Fragment, useRef, useState, useEffect, useContext } from "react";
import Moment from 'moment';
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import {
    ExclamationIcon,
    TrashIcon,
} from "@heroicons/react/outline";
import { Context } from "../../..//context/Context";
import { get } from "../../../helpers/Fetch";

const ModificarInscripcion = ({
    openC,
    confirm,
    deleteIns,
    planDePago,
    inscripciones,
}) => {
    const { checkConfig, checkUser } = useContext(Context);
    const [planes, setPlanes] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [open, setOpen] = useState(true);
    const [id_tipoIngreso, setId_tipoIngreso] = useState(0);
    const [id_plan, setId_plan] = useState(0);
    const cancelButtonRef = useRef(null);

    const getPlanes = async (lapso) => {
        await get(`planes/get?lapso=${lapso}&tipo=${3}`).then((items) => {
            items !== undefined ? setPlanes(items) : setPlanes([]);
        });
    };
    const getTipos = async (lapso) => {
        await get(`tipoingreso/get?lapso=${lapso}`).then((items) => {
            items !== undefined ? setTipos(items) : setTipos([]);
        });
    };

    const activeModificacionInsc = (open) => {
        openC(open);
        setOpen(open);
    };

    const okModificarInsc = async () => {
        confirm({ Id_TipoIngreso: id_tipoIngreso, Id_Plan: id_plan });
        setOpen(open);
    };

    const changeTipoIngreso = async (value) => {
        value !== 0 ? setId_tipoIngreso(value) : setId_tipoIngreso(0);
    };
    const changePlanDePago = async (value) => {
        value !== 0 ? setId_plan(value) : setId_plan(0);
    };

    useEffect(() => {
        getPlanes(checkConfig().Lapso);
        getTipos(checkConfig().Lapso);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={() => activeModificacionInsc(false)}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-2 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon
                                            className="h-6 w-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            Ajustes Inscripción{" "}
                                            <span style={{ color: "red" }}>{planDePago}</span>
                                        </Dialog.Title>
                                        <form className="mt-6 space-y-6">
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="col-span-10 sm:col-span-3">
                                                            <label
                                                                htmlFor="country"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Tipo de Ingreso
                                                            </label>
                                                            <select
                                                                id="arancel"
                                                                name="arancel"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                onChange={async (event) =>
                                                                    changeTipoIngreso(event.target.value)
                                                                }
                                                            >
                                                                <option value={0}>
                                                                    Seleciona Tipo de Ingreso
                                                                </option>
                                                                {Object.keys(tipos).map((key, tipo) => (
                                                                    <option
                                                                        key={key}
                                                                        value={`${tipos[tipo].Id_TipoIngreso}`}
                                                                    >
                                                                        {tipos[tipo].Descripcion}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="col-span-10 sm:col-span-3">
                                                            <label
                                                                htmlFor="country"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Plan de Pago
                                                            </label>
                                                            <select
                                                                id="arancel"
                                                                name="arancel"
                                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                onChange={async (event) =>
                                                                    changePlanDePago(event.target.value)
                                                                }
                                                            >
                                                                <option value={0}>
                                                                    Seleciona Plan de Pago
                                                                </option>
                                                                {Object.keys(planes).map((key, plan) => (
                                                                    <option
                                                                        key={key}
                                                                        value={`${planes[plan].Id_Plan}`}
                                                                    >
                                                                        {planes[plan].Descripcion}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    disabled={
                                        id_plan !== 0 && id_tipoIngreso !== 0 ? false : true
                                    }
                                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${id_plan !== 0 && id_tipoIngreso !== 0
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-green-200 hover:bg-green-200"
                                        } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}
                                    onClick={() => okModificarInsc(true)}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => activeModificacionInsc(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancelar
                                </button>
                            </div>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-0 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-0 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon
                                                className="h-6 w-6 text-green-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-10 font-medium text-gray-900"
                                            >
                                                Inscripciones
                                            </Dialog.Title>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="col-span-10 sm:col-span-3">
                                                    {Object.keys(inscripciones).length !== 0 ? (
                                                        <div className="max-w-7xl mx-auto">
                                                            <div className="flex flex-col">
                                                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                                    <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                                            <table className="min-w-full divide-y divide-gray-200">
                                                                                <thead className="bg-gray-50">
                                                                                    <tr>
                                                                                        <th
                                                                                            scope="col"
                                                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                                        >
                                                                                            Carrera
                                                                                        </th>
                                                                                        <th
                                                                                            scope="col"
                                                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                                        >
                                                                                            Tipo de ingreso
                                                                                        </th>
                                                                                        <th
                                                                                            scope="col"
                                                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                                        >
                                                                                            Fecha
                                                                                        </th>
                                                                                        <th
                                                                                            scope="col"
                                                                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                                        >
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                                    {Object.keys(
                                                                                        inscripciones
                                                                                    ).map((key, item) => (
                                                                                        <tr
                                                                                            key={key}
                                                                                            className="hover:bg-gray-50"
                                                                                        >
                                                                                        <td
                                                                                                className={`px-2 py-4 whitespace-nowrap bg-white-100`}
                                                                                            >
                                                                                                <div className="text-sm font-semibold text-gray-900">
                                                                                                    {
                                                                                                        inscripciones[item]
                                                                                                            .Id_Carrera
                                                                                                    }
                                                                                                </div>
                                                                                            </td>
                                                                                            <td
                                                                                                className={`px-2 py-4 whitespace-nowrap bg-white-100`}
                                                                                            >
                                                                                                <div className="text-sm font-semibold text-gray-900">
                                                                                                    {
                                                                                                        inscripciones[item]
                                                                                                            .TipoIngreso
                                                                                                    }
                                                                                                </div>
                                                                                            </td>
                                                                                            <td
                                                                                                className={`px-2 py-4 whitespace-nowrap bg-white-100`}
                                                                                            >
                                                                                                <div className="text-sm font-semibold text-gray-900">
                                                                                                    {
                                                                                                        Moment(inscripciones[item].Fecha).format('DD-MM-YYYY')
                                                                                                    }
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                                                <div className="flex items-center text-sm text-gray-500">
                                                                                                {checkUser().Rol === '1' || checkUser().Rol === '2' ?
                                                                                                    <TrashIcon
                                                                                                        className="ml-1 mr-1 h-8 w-8 text-gray-500"
                                                                                                        style={{
                                                                                                            cursor: "pointer",
                                                                                                        }}
                                                                                                        onClick={async () =>
                                                                                                            deleteIns(
                                                                                                                inscripciones[
                                                                                                                    item
                                                                                                                ].IdInscripcion
                                                                                                            )
                                                                                                        }
                                                                                                        aria-hidden="true"
                                                                                                    />
                                                                                                    : <></>}
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
ModificarInscripcion.propTypes = {
    openC: PropTypes.func,
    confirm: PropTypes.func,
    deleteIns: PropTypes.func,
    planDePago: PropTypes.string,
    inscripciones: PropTypes.array,
};
export default ModificarInscripcion;
