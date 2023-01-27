import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {

    return (
        <div className="p-6 text-center">
            <header className="bg-white">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-9xl font-bold text-gray-400">404</h1>
                </div>
            </header>
            <NavLink to="/" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-light py-4 px-6 rounded-full inline-block uppercase shadow-2xl">Regresar</NavLink>
        </div>
    );
}

export default Error;