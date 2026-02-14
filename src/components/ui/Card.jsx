import React from 'react';

export const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-white/20 overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = "" }) => {
    return (
        <div className={`px-6 py-5 border-b border-gray-100/50 ${className}`}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className = "" }) => {
    return (
        <h3 className="text-lg font-semibold text-gray-900">
            {children}
        </h3>
    );
};

export const CardContent = ({ children, className = "" }) => {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
};

export const CardFooter = ({ children, className = "" }) => {
    return (
        <div className={`px-6 py-4 bg-gray-50/50 border-t border-gray-100/50 flex items-center ${className}`}>
            {children}
        </div>
    );
};
