import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="backdrop-dad">
            <div className="backdrop-child">
                <div className="loader"></div>
            </div>
        </div>
    )
}

export default Loading;
