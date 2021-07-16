import { Fragment, useState, useEffect, useContext } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
    CogIcon,
    MenuIcon,
    LogoutIcon,
    KeyIcon,
    ChartPieIcon,
    CurrencyDollarIcon,
    XIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Link } from "@reach/router";
import { Context } from '../../utils/Context';
import Routes from '../../utils/Routes';

const Layout = () => {
    const { logout, checkUser, checkConfig } = useContext(Context);
    const [menu] = useState([
        {
            id: 1,
            name: 'Reportes',
            description: '',
            href: '/reporte',
            icon: ChartPieIcon,
        },
        {
            id: 2,
            name: 'Cuota',
            description: '',
            href: '#',
            icon: CurrencyDollarIcon,
        },
        {
            id: 3,
            name: 'Cambiar contraseña',
            description: '',
            href: '#',
            icon: KeyIcon,
        },
        {
            id: 4,
            name: 'Cerrar sesion',
            description: '',
            href: '#',
            icon: LogoutIcon,
        }
    ]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <Fragment>
            {(checkUser().UsuarioId) !== null ?
                <Fragment>
                    <Popover className="relative bg-white">
                        {({ open }) => (
                            <>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                                    <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                                        <div className="flex justify-start lg:w-0 lg:flex-1">
                                            <Link to="/">
                                                <img
                                                    className="h-15 w-auto md:w-16 lg:w-22"
                                                    src={`${process.env.PUBLIC_URL}/logopsm.jpg`}
                                                    alt="Logo PSM"
                                                />
                                            </Link>

                                        </div>
                                        <div className="-mr-2 -my-2 md:hidden">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">Open menu</span>
                                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                        <Popover.Group as="nav" className="hidden md:flex space-x-10">
                                            {/* <Link to="/deudas" className="text-base font-medium text-gray-500 hover:text-gray-900">Deudas</Link> */}
                                            {/* <Link to="/reportes" className="text-base font-medium text-gray-500 hover:text-gray-900">Reportes</Link> */}
                                            <Popover className="relative">
                                                {({ open }) => (
                                                    <>
                                                        <Popover.Button
                                                            className={classNames(
                                                                open ? 'text-gray-900' : 'text-gray-500',
                                                                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2'
                                                            )}
                                                        >
                                                            <span>{checkUser().Nombres} {checkUser().Apellidos}</span>
                                                            <ChevronDownIcon
                                                                className={classNames(
                                                                    open ? 'text-gray-600' : 'text-gray-400',
                                                                    'ml-2 h-5 w-5 group-hover:text-gray-500'
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
                                                                className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                                                            >
                                                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                                        {menu.map((item) => (
                                                                            <Link
                                                                                key={item.id}
                                                                                to={item.href}
                                                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                                            >
                                                                                <item.icon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                                                                                <div className="ml-4">
                                                                                    <Link
                                                                                        className="text-base font-medium text-gray-900"
                                                                                        to={item.href}
                                                                                        onClick={async () => item.id === 4 ? logout(0, null) : ''}
                                                                                        // onClick={async () => item.id === 2 && checkConfig().Cuota !== null ? window.alert('Si') : window.alert('No')}
                                                                                    >
                                                                                        {item.id === 2 && checkConfig().Cuota !== null ? `${item.name} -> ${checkConfig().Cuota}` : item.name}
                                                                                    </Link>
                                                                                </div>
                                                                            </Link>
                                                                        ))}
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

                            </>
                        )}
                    </Popover>
                </Fragment>
                :
                <Fragment></Fragment>
            }
            <Routes />
        </Fragment>
    )
}

export default Layout;