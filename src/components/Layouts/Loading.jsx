import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ display, msj }) => {
    return (
            <div 
                style={{
                        position: 'fixed', 
                        display: `${display}`, 
                        width:'100%', 
                        height:'100%',
                        top:0, right:0, bottom:0, left:0,
                        backgroundColor:'rgba(0,0,0,0.5)',
                        zIndex:2,
                        cursor:'wait'
                    }}
            ><div
                style={{
                    position: 'absolute',
                    top:'50%', left:'50%',
                    fontSize:'30px',
                    color:'white',
                    transform: 'translate(-50%, -50%)'
                }}
                >{msj}</div></div>
    )
}

Loading.propTypes = {
    display : PropTypes.string,
    msj : PropTypes.string
}

export default Loading;
