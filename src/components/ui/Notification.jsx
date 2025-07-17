import React from 'react';
import { InfoIcon } from '../icons.jsx';

export const Notification = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed bottom-5 right-5 bg-slate-700 text-white py-2 px-4 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-fade-in-out">
            <InfoIcon className="w-5 h-5 text-cyan-400" />
            <span>{message}</span>
        </div>
    );
};
