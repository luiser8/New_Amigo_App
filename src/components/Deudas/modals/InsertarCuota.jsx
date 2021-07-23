import React from 'react';

const InsertarCuota = ({ aranceles_list, objDeudaForm}) => {
    aranceles_list.filter(item => item.Pagada === 0).map((it) => {
        console.log(it)
    });
    console.log(objDeudaForm)
    return (
        <div>
            
        </div>
    )
}

export default InsertarCuota;
