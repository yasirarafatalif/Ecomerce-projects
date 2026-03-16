import React from 'react';

const Logo = () => {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
          <div className="flex h-7 w-7">
            <div className="w-1/2 h-full bg-gray-400/60 -skew-x-[20deg]"></div>
            <div className="w-1/2 h-full bg-black -skew-x-[20deg] -ml-1"></div>
          </div>
        </div>
    );
};

export default Logo;