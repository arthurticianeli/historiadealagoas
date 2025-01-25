import React from 'react';


const Loading: React.FC = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="loader" />
        </div>
    );
};

export default Loading;