import React from 'react';

const CircularLoader = () => {
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="h-6 w-6 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="h-6 w-6 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-6 w-6 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div >
    );
};

export default CircularLoader;
